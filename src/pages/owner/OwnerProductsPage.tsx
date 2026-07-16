import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  Plus, Search, Filter, Package, AlertTriangle, Loader2,
  Edit2, Trash2, Eye, EyeOff, ImagePlus, X, ChevronDown,
  Tag, DollarSign, Boxes, ToggleLeft, ToggleRight, CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useProducts,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
  useUploadProductImage,
} from "@/hooks/queries/useProducts";
import { useOwnerClaims } from "@/hooks/queries/useOwnerDashboard";
import type { ProductListResponse, ProductCreate, ProductUpdate } from "@/lib/types";

// ─── TODO: Helpers ──────────────────────────────────────────────────────────────────
const CATEGORIES_PRODUCT = [
  "Artisanat", "Vêtements", "Accessoires", "Bijoux", "Alimentaire",
  "Boissons", "Épices", "Art", "Décoration", "Autre",
];

function fmtPrice(p: string) {
  const n = parseFloat(p);
  return isNaN(n) ? p : `${n.toLocaleString("fr-FR")} FCFA`;
}

// ─── StockBadge ───────────────────────────────────────────────────────────────
function StockBadge({ stock }: { stock: number }) {
  if (stock <= 0)
    return <span className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-red-500/15 text-red-300 border border-red-500/25 uppercase tracking-widest">Rupture</span>;
  if (stock <= 5)
    return <span className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-300 border border-amber-500/25 uppercase tracking-widest">Faible ({stock})</span>;
  return <span className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/25 uppercase tracking-widest">En stock ({stock})</span>;
}

// ─── ProductImageUpload ───────────────────────────────────────────────────────
function ProductImageUpload({ productId, slug, onDone }: { productId: string; slug: string; onDone: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate, isPending } = useUploadProductImage(slug);

  const handle = (files: FileList | null) => {
    if (!files?.length) return;
    mutate({ productId, file: files[0] }, { onSuccess: onDone });
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      className="border-2 border-dashed border-white/15 hover:border-white/30 rounded-md p-5 flex flex-col items-center gap-2 cursor-pointer transition-colors"
    >
      {isPending ? (
        <Loader2 className="h-5 w-5 animate-spin text-white/40" />
      ) : (
        <ImagePlus className="h-5 w-5 text-white/30" />
      )}
      <p className="text-xs text-white/40">Cliquer pour ajouter une image</p>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handle(e.target.files)} />
    </div>
  );
}

// ─── ProductFormModal ─────────────────────────────────────────────────────────
interface ProductFormModalProps {
  open: boolean;
  onClose: () => void;
  slug: string;
  initial?: ProductListResponse | null;   // null = create mode
}

function ProductFormModal({ open, onClose, slug, initial }: ProductFormModalProps) {
  const isEdit = !!initial;
  const { mutate: create, isPending: isCreating } = useCreateProduct(slug);
  const { mutate: update, isPending: isUpdating } = useUpdateProduct(slug);
  const isPending = isCreating || isUpdating;

  const [form, setForm] = useState<{
    name: string; description: string; price: string; stock: number;
    category: string; is_available: boolean; promo_price: string;
  }>({ name: "", description: "", price: "", stock: 0, category: "", is_available: true, promo_price: "" });

  // Prefill in edit mode
  useEffect(() => {
    if (initial) {
      setForm({
        name: initial.name,
        description: initial.description ?? "",
        price: initial.price,
        stock: initial.stock,
        category: initial.category ?? "",
        is_available: initial.is_available,
        promo_price: "",
      });
    } else {
      setForm({ name: "", description: "", price: "", stock: 0, category: "", is_available: true, promo_price: "" });
    }
  }, [initial, open]);

  const set = (k: keyof typeof form, v: string | number | boolean) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit) {
      const data: ProductUpdate = { name: form.name, description: form.description || null, price: form.price, stock: form.stock, category: form.category || null, is_available: form.is_available };
      update({ id: String(initial!.id), data }, { onSuccess: onClose });
    } else {
      const data: ProductCreate = { name: form.name, description: form.description || null, price: form.price, stock: form.stock, is_available: form.is_available };
      create(data, { onSuccess: onClose });
    }
  };

  const inputCls = "bg-white/5 border-white/10 text-white placeholder:text-white/25 focus:ring-amber-500/20 rounded-md h-11 font-bold text-sm";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-lg rounded-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-black uppercase tracking-tight">
            <Package className="h-5 w-5 text-amber-400" />
            {isEdit ? "Modifier le produit" : "Nouveau produit"}
          </DialogTitle>
          <DialogDescription className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
            {isEdit ? `Modification de ${initial?.name}` : "Ajoutez un produit à votre boutique."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          {/* Name + Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] text-white/40 uppercase font-black tracking-widest block px-1">Nom *</label>
              <Input value={form.name} onChange={(e) => set("name", e.target.value)} required placeholder="Nom du produit" className={inputCls} />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] text-white/40 uppercase font-black tracking-widest block px-1">Catégorie</label>
              <Select value={form.category} onValueChange={(val) => set("category", val)}>
                <SelectTrigger className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-md h-11 focus:ring-amber-500/20">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-white/10 text-white">
                  {CATEGORIES_PRODUCT.map((c) => <SelectItem key={c} value={c} className="focus:bg-white/10 focus:text-white">{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-[10px] text-white/40 uppercase font-black tracking-widest block px-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={3}
              placeholder="Décrivez le produit..."
              className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-md px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-amber-500/20 placeholder:text-white/25 resize-none font-medium"
            />
          </div>

          {/* Price + Promo */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] text-white/40 uppercase font-black tracking-widest block px-1">Prix (FCFA) *</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/25 pointer-events-none" />
                <Input value={form.price} onChange={(e) => set("price", e.target.value)} required placeholder="5000" className={`${inputCls} pl-9`} />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] text-white/40 uppercase font-black tracking-widest block px-1">Prix promo (optionnel)</label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/25 pointer-events-none" />
                <Input value={form.promo_price} onChange={(e) => set("promo_price", e.target.value)} placeholder="4500" className={`${inputCls} pl-9`} />
              </div>
            </div>
          </div>

          {/* Stock + Availability */}
          <div className="grid grid-cols-2 gap-4 items-end">
            <div className="space-y-1.5">
              <label className="text-[10px] text-white/40 uppercase font-black tracking-widest block px-1">Stock</label>
              <div className="relative">
                <Boxes className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/25 pointer-events-none" />
                <Input
                  type="number" min={0} value={form.stock}
                  onChange={(e) => set("stock", parseInt(e.target.value) || 0)}
                  className={`${inputCls} pl-9`}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] text-white/40 uppercase font-black tracking-widest block px-1">Disponibilité</label>
              <button
                type="button"
                onClick={() => set("is_available", !form.is_available)}
                className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-md border text-[10px] font-black uppercase tracking-widest transition-all ${
                  form.is_available
                    ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
                    : "bg-white/5 border-white/10 text-white/40"
                }`}
              >
                {form.is_available ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                {form.is_available ? "Visible" : "Masqué"}
              </button>
            </div>
          </div>

          {/* Image upload (edit mode only) */}
          {isEdit && initial && (
            <div className="space-y-1.5">
              <label className="text-[10px] text-white/40 uppercase font-black tracking-widest block px-1">Images</label>
              {initial.primary_image && (
                <div className="flex gap-2 mb-2">
                  <img src={initial.primary_image.url} alt="" className="w-16 h-16 rounded-lg object-cover border border-white/10" />
                </div>
              )}
              <ProductImageUpload productId={String(initial.id)} slug={slug} onDone={onClose} />
            </div>
          )}

          <DialogFooter className="gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 rounded-md h-12 font-black uppercase tracking-widest text-xs px-6">
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={isPending || !form.name || !form.price}
              className="bg-amber-500 hover:bg-amber-400 text-zinc-900 font-black uppercase tracking-widest text-xs h-12 px-8 rounded-md shadow-lg shadow-amber-500/20"
            >
              {isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              {isEdit ? "Enregistrer" : "Créer le produit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── QuickStockModal ──────────────────────────────────────────────────────────
function QuickStockModal({ product, slug, open, onClose }: { product: ProductListResponse | null; slug: string; open: boolean; onClose: () => void }) {
  const [stock, setStock] = useState(product?.stock ?? 0);
  const { mutate, isPending } = useUpdateProduct(slug);

  useEffect(() => { setStock(product?.stock ?? 0); }, [product]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-sm rounded-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-black uppercase tracking-tight">
            <Boxes className="h-5 w-5 text-indigo-400" />
            Stock
          </DialogTitle>
          <DialogDescription className="text-zinc-500 text-xs font-bold uppercase tracking-widest">{product?.name}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <label className="text-[10px] text-white/40 uppercase font-black tracking-widest block text-center">Quantité en stock</label>
          <div className="flex items-center gap-4">
            <button onClick={() => setStock((s) => Math.max(0, s - 1))} className="w-12 h-12 rounded-md bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-white/10 transition-colors text-2xl font-bold">−</button>
            <Input
              type="number" min={0} value={stock}
              onChange={(e) => setStock(parseInt(e.target.value) || 0)}
              className="flex-1 text-center bg-white/5 border border-white/10 text-white text-2xl font-black rounded-md h-14 focus:ring-amber-500/20"
            />
            <button onClick={() => setStock((s) => s + 1)} className="w-12 h-12 rounded-md bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-white/10 transition-colors text-2xl font-bold">+</button>
          </div>
          {stock <= 5 && <p className="text-[10px] text-amber-300 font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 bg-amber-500/5 py-2 rounded-lg border border-amber-500/10"><AlertTriangle className="h-3.5 w-3.5" /> Seuil d'alerte stock faible</p>}
        </div>
        <DialogFooter className="gap-3 mt-6">
          <Button variant="outline" onClick={onClose} className="border-zinc-700 text-zinc-300 rounded-md h-12 font-black uppercase tracking-widest text-[10px]">Annuler</Button>
          <Button
            disabled={isPending}
            onClick={() => mutate({ id: product!.id, data: { stock } }, { onSuccess: onClose })}
            className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-md h-12 font-black uppercase tracking-widest text-[10px] px-6 shadow-lg shadow-indigo-600/20"
          >
            {isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            Confirmer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── DeleteProductModal ───────────────────────────────────────────────────────
function DeleteProductModal({ product, slug, open, onClose }: { product: ProductListResponse | null; slug: string; open: boolean; onClose: () => void }) {
  const { mutate, isPending } = useDeleteProduct(slug);
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-sm rounded-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-400 font-black uppercase tracking-tight text-lg"><AlertTriangle className="h-5 w-5" />Supprimer le produit</DialogTitle>
          <DialogDescription className="text-zinc-400 font-medium text-sm">Cette action est irréversible. Le produit sera retiré de votre boutique.</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-3 mt-4">
          <Button variant="outline" onClick={onClose} className="border-zinc-700 text-zinc-300 rounded-md h-12 font-black uppercase tracking-widest text-[10px]">Annuler</Button>
          <Button variant="destructive" disabled={isPending} onClick={() => mutate(product!.id, { onSuccess: onClose })} className="rounded-md h-12 font-black uppercase tracking-widest text-[10px] px-6">
            {isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            Supprimer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── ProductRow ───────────────────────────────────────────────────────────────
function ProductRow({
  product, slug,
  onEdit, onStock, onDelete,
}: {
  product: ProductListResponse; slug: string;
  onEdit: () => void; onStock: () => void; onDelete: () => void;
}) {
  const { mutate: update, isPending } = useUpdateProduct(slug);
  const toggleAvail = () => update({ id: product.id, data: { is_available: !product.is_available } });

  return (
    <tr className="border-b border-white/5 hover:bg-white/3 transition-colors group">
      {/* Image + Name */}
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/5 border border-white/8 flex-shrink-0">
            {product.primary_image ? (
              <img src={product.primary_image.url} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package className="h-5 w-5 text-white/20" />
              </div>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-black text-white truncate max-w-[160px] uppercase tracking-tight">{product.name}</p>
            {product.category && <p className="text-[10px] text-white/35 truncate uppercase font-bold tracking-widest">{product.category}</p>}
          </div>
        </div>
      </td>

      {/* Price */}
      <td className="px-4 py-4 text-sm font-black text-white whitespace-nowrap">{fmtPrice(product.price)}</td>

      {/* Stock */}
      <td className="px-4 py-4">
        <button onClick={onStock} className="hover:opacity-80 transition-opacity">
          <StockBadge stock={product.stock} />
        </button>
      </td>

      {/* Status toggle */}
      <td className="px-4 py-4">
        <button
          onClick={toggleAvail}
          disabled={isPending}
          className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest transition-colors rounded-lg px-2.5 py-1 border ${
            product.is_available
              ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/25 hover:bg-emerald-500/20"
              : "bg-white/5 text-white/35 border-white/10 hover:bg-white/8"
          }`}
        >
          {isPending ? <Loader2 className="h-3 w-3 animate-spin" /> : product.is_available ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
          {product.is_available ? "Visible" : "Masqué"}
        </button>
      </td>

      {/* Actions */}
      <td className="px-4 py-4">
        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onEdit}
            className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 border border-white/8 flex items-center justify-center text-white/50 hover:text-white transition-colors"
            title="Modifier"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={onDelete}
            className="w-9 h-9 rounded-lg bg-red-500/8 hover:bg-red-500/20 border border-red-500/15 flex items-center justify-center text-red-400/60 hover:text-red-400 transition-colors"
            title="Supprimer"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}

// ─── OwnerProductsPage ────────────────────────────────────────────────────────
const OwnerProductsPage = () => {
  const { data: claims } = useOwnerClaims();

  // Pick first approved claim slug — in production this could be driven by a PlaceSwitcher
  const slug = (claims?.find((c) => c.status === "approved") ?? claims?.[0])?.place_name
    ?.toLowerCase().replace(/\s+/g, "-") ?? null;

  const { data: products, isLoading, isError } = useProducts(slug);

  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState<string>("all");

  // Modal state
  const [createOpen, setCreateOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<ProductListResponse | null>(null);
  const [stockTarget, setStockTarget] = useState<ProductListResponse | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ProductListResponse | null>(null);

  const filtered = (products ?? []).filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === "all" ? true : p.category === filterCat;
    return matchSearch && matchCat;
  });

  const categories = [...new Set((products ?? []).map((p) => p.category).filter(Boolean))] as string[];

  if (!slug) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center gap-4">
        <AlertTriangle className="h-10 w-10 text-amber-400" />
        <p className="text-white/40 text-sm font-bold uppercase tracking-widest">Aucun lieu actif trouvé. Enregistrez d'abord un lieu.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-700">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">Produits & <span className="text-amber-500">Boutique</span></h1>
          <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mt-1 opacity-70">
            {products?.length ?? 0} produit{products?.length !== 1 ? "s" : ""}
            {slug && <span> · <span className="text-amber-400/70">{slug}</span></span>}
          </p>
        </div>
        <Button
          onClick={() => setCreateOpen(true)}
          className="bg-amber-500 hover:bg-amber-400 text-zinc-900 font-black uppercase tracking-widest text-xs h-12 px-8 rounded-md shadow-lg shadow-amber-500/20 transition-all active:scale-[0.98]"
        >
          <Plus className="h-5 w-5 mr-2" />
          Ajouter un produit
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 animate-in slide-in-from-bottom-4 duration-500 delay-100">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/25 pointer-events-none" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un produit..."
            className="w-full bg-zinc-900 border border-white/10 text-white text-xs font-bold uppercase tracking-widest pl-12 h-12 rounded-md focus:ring-amber-500/20"
          />
        </div>
        <Select value={filterCat} onValueChange={setFilterCat}>
          <SelectTrigger className="bg-zinc-900 border border-white/10 text-white text-xs font-bold uppercase tracking-widest h-12 rounded-md px-4 min-w-[200px] focus:ring-amber-500/20">
             <SelectValue placeholder="Catégorie" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-950 border-white/10 text-white">
            <SelectItem value="all" className="focus:bg-white/10 focus:text-white">Toutes les catégories</SelectItem>
            {categories.map((c) => <SelectItem key={c} value={c} className="focus:bg-white/10 focus:text-white">{c}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="animate-in slide-in-from-bottom-4 duration-500 delay-200">
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-16 w-full bg-white/5 rounded-md" />)}
          </div>
        ) : isError ? (
          <div className="text-center py-20 bg-destructive/5 border border-destructive/10 rounded-md flex flex-col items-center gap-4">
            <AlertTriangle className="h-10 w-10 text-red-400" />
            <p className="text-xs font-black uppercase tracking-widest text-red-400">Erreur lors du chargement des produits.</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 bg-white/3 border-2 border-dashed border-white/10 rounded-md flex flex-col items-center gap-6">
            <div className="w-20 h-20 bg-white/5 rounded-md flex items-center justify-center">
              <Package className="h-10 w-10 text-white/15" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-black uppercase tracking-tight text-white/80">Aucun produit</h3>
              <p className="text-white/40 text-xs font-medium max-w-xs mx-auto">
                {search || filterCat !== "all" ? "Aucun produit ne correspond à vos filtres." : "Ajoutez votre premier produit pour commencer à vendre."}
              </p>
            </div>
            {!search && filterCat === "all" && (
              <Button onClick={() => setCreateOpen(true)} className="bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/8 rounded-md h-11 px-8 font-black uppercase tracking-widest text-xs transition-all">
                <Plus className="h-4 w-4 mr-2" /> Créer mon premier produit
              </Button>
            )}
          </div>
        ) : (
          <div className="bg-zinc-900/60 border border-white/8 rounded-md overflow-hidden shadow-2xl">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/8 bg-white/3">
                  <th className="text-left px-6 py-4 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Produit</th>
                  <th className="text-left px-6 py-4 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Prix</th>
                  <th className="text-left px-6 py-4 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Stock</th>
                  <th className="text-left px-6 py-4 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Statut</th>
                  <th className="px-6 py-4" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <ProductRow
                    key={p.id}
                    product={p}
                    slug={slug}
                    onEdit={() => setEditTarget(p)}
                    onStock={() => setStockTarget(p)}
                    onDelete={() => setDeleteTarget(p)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Modals ──────────────────────────────────────────────────────────── */}
      {/* Create */}
      <ProductFormModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        slug={slug}
        initial={null}
      />

      {/* Edit */}
      <ProductFormModal
        open={!!editTarget}
        onClose={() => setEditTarget(null)}
        slug={slug}
        initial={editTarget}
      />

      {/* Quick stock edit */}
      <QuickStockModal
        open={!!stockTarget}
        onClose={() => setStockTarget(null)}
        product={stockTarget}
        slug={slug}
      />

      {/* Delete confirm */}
      <DeleteProductModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        product={deleteTarget}
        slug={slug}
      />
    </div>
  );
};

export default OwnerProductsPage;
