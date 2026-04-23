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
    return <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-red-500/15 text-red-300 border border-red-500/25">Rupture</span>;
  if (stock <= 5)
    return <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/25">Faible ({stock})</span>;
  return <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/25">En stock ({stock})</span>;
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
      className="border-2 border-dashed border-white/15 hover:border-white/30 rounded-xl p-5 flex flex-col items-center gap-2 cursor-pointer transition-colors"
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

  const inputCls = "bg-white/5 border-white/10 text-white placeholder:text-white/25 focus:border-amber-500/40 rounded-xl";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-amber-400" />
            {isEdit ? `Modifier "${initial?.name}"` : "Nouveau produit"}
          </DialogTitle>
          <DialogDescription className="text-zinc-500 text-sm">
            {isEdit ? "Modifiez les informations du produit." : "Ajoutez un produit à votre boutique."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-1">
          {/* Name + Category */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-white/40 uppercase tracking-widest block mb-1.5">Nom *</label>
              <Input value={form.name} onChange={(e) => set("name", e.target.value)} required placeholder="Nom du produit" className={inputCls} />
            </div>
            <div>
              <label className="text-xs text-white/40 uppercase tracking-widest block mb-1.5">Catégorie</label>
              <select
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-500/40"
              >
                <option value="" className="bg-zinc-900">— Choisir —</option>
                {CATEGORIES_PRODUCT.map((c) => <option key={c} value={c} className="bg-zinc-900">{c}</option>)}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs text-white/40 uppercase tracking-widest block mb-1.5">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={3}
              placeholder="Décrivez le produit..."
              className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-500/40 placeholder:text-white/25 resize-none"
            />
          </div>

          {/* Price + Promo */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-white/40 uppercase tracking-widest block mb-1.5">Prix (FCFA) *</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/25 pointer-events-none" />
                <Input value={form.price} onChange={(e) => set("price", e.target.value)} required placeholder="5000" className={`${inputCls} pl-9`} />
              </div>
            </div>
            <div>
              <label className="text-xs text-white/40 uppercase tracking-widest block mb-1.5">Prix promo (optionnel)</label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/25 pointer-events-none" />
                <Input value={form.promo_price} onChange={(e) => set("promo_price", e.target.value)} placeholder="4500" className={`${inputCls} pl-9`} />
              </div>
            </div>
          </div>

          {/* Stock + Availability */}
          <div className="grid grid-cols-2 gap-3 items-end">
            <div>
              <label className="text-xs text-white/40 uppercase tracking-widest block mb-1.5">Stock</label>
              <div className="relative">
                <Boxes className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/25 pointer-events-none" />
                <Input
                  type="number" min={0} value={form.stock}
                  onChange={(e) => set("stock", parseInt(e.target.value) || 0)}
                  className={`${inputCls} pl-9`}
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-white/40 uppercase tracking-widest block mb-1.5">Disponibilité</label>
              <button
                type="button"
                onClick={() => set("is_available", !form.is_available)}
                className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                  form.is_available
                    ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
                    : "bg-white/5 border-white/10 text-white/40"
                }`}
              >
                {form.is_available ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                {form.is_available ? "Visible" : "Masqué"}
              </button>
            </div>
          </div>

          {/* Image upload (edit mode only) */}
          {isEdit && initial && (
            <div>
              <label className="text-xs text-white/40 uppercase tracking-widest block mb-1.5">Images</label>
              {initial.primary_image && (
                <div className="flex gap-2 mb-2">
                  <img src={initial.primary_image.url} alt="" className="w-16 h-16 rounded-xl object-cover border border-white/10" />
                </div>
              )}
              <ProductImageUpload productId={String(initial.id)} slug={slug} onDone={onClose} />
            </div>
          )}

          <DialogFooter className="gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={isPending || !form.name || !form.price}
              className="bg-amber-500 hover:bg-amber-400 text-zinc-900 font-bold"
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
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Boxes className="h-5 w-5 text-indigo-400" />
            Mise à jour du stock
          </DialogTitle>
          <DialogDescription className="text-zinc-500">{product?.name}</DialogDescription>
        </DialogHeader>
        <div className="space-y-3 mt-2">
          <label className="text-xs text-white/40 uppercase tracking-widest block">Quantité en stock</label>
          <div className="flex items-center gap-3">
            <button onClick={() => setStock((s) => Math.max(0, s - 1))} className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-white/10 transition-colors text-lg">−</button>
            <input
              type="number" min={0} value={stock}
              onChange={(e) => setStock(parseInt(e.target.value) || 0)}
              className="flex-1 text-center bg-white/5 border border-white/10 text-white text-xl font-bold rounded-xl py-2.5 focus:outline-none focus:border-amber-500/40"
            />
            <button onClick={() => setStock((s) => s + 1)} className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-white/10 transition-colors text-lg">+</button>
          </div>
          {stock <= 5 && <p className="text-xs text-amber-300 flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> Seuil d'alerte stock faible activé</p>}
        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} className="border-zinc-700 text-zinc-300">Annuler</Button>
          <Button
            disabled={isPending}
            onClick={() => mutate({ id: product!.id, data: { stock } }, { onSuccess: onClose })}
            className="bg-indigo-600 hover:bg-indigo-500 text-white"
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
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-400"><AlertTriangle className="h-5 w-5" />Supprimer "{product?.name}"</DialogTitle>
          <DialogDescription className="text-zinc-400">Cette action est irréversible. Le produit sera retiré de votre boutique.</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} className="border-zinc-700 text-zinc-300">Annuler</Button>
          <Button variant="destructive" disabled={isPending} onClick={() => mutate(product!.id, { onSuccess: onClose })}>
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
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-white/5 border border-white/8 flex-shrink-0">
            {product.primary_image ? (
              <img src={product.primary_image.url} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package className="h-4 w-4 text-white/20" />
              </div>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-white truncate max-w-[160px]">{product.name}</p>
            {product.category && <p className="text-xs text-white/35 truncate">{product.category}</p>}
          </div>
        </div>
      </td>

      {/* Price */}
      <td className="px-4 py-3 text-sm font-semibold text-white whitespace-nowrap">{fmtPrice(product.price)}</td>

      {/* Stock */}
      <td className="px-4 py-3">
        <button onClick={onStock} className="hover:opacity-80 transition-opacity">
          <StockBadge stock={product.stock} />
        </button>
      </td>

      {/* Status toggle */}
      <td className="px-4 py-3">
        <button
          onClick={toggleAvail}
          disabled={isPending}
          className={`flex items-center gap-1.5 text-xs font-medium transition-colors rounded-full px-2.5 py-1 border ${
            product.is_available
              ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/25 hover:bg-emerald-500/20"
              : "bg-white/5 text-white/35 border-white/10 hover:bg-white/8"
          }`}
        >
          {isPending ? <Loader2 className="h-3 w-3 animate-spin" /> : product.is_available ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
          {product.is_available ? "Visible" : "Masqué"}
        </button>
      </td>

      {/* Actions */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onEdit}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/8 flex items-center justify-center text-white/50 hover:text-white transition-colors"
            title="Modifier"
          >
            <Edit2 className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={onDelete}
            className="w-8 h-8 rounded-lg bg-red-500/8 hover:bg-red-500/20 border border-red-500/15 flex items-center justify-center text-red-400/60 hover:text-red-400 transition-colors"
            title="Supprimer"
          >
            <Trash2 className="h-3.5 w-3.5" />
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
  const [filterCat, setFilterCat] = useState<string>("");

  // Modal state
  const [createOpen, setCreateOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<ProductListResponse | null>(null);
  const [stockTarget, setStockTarget] = useState<ProductListResponse | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ProductListResponse | null>(null);

  const filtered = (products ?? []).filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat ? p.category === filterCat : true;
    return matchSearch && matchCat;
  });

  const categories = [...new Set((products ?? []).map((p) => p.category).filter(Boolean))] as string[];

  if (!slug) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center gap-4">
        <AlertTriangle className="h-10 w-10 text-amber-400" />
        <p className="text-white/40 text-sm">Aucun lieu actif trouvé. Enregistrez d'abord un lieu.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Produits & Boutique</h1>
          <p className="text-white/40 text-sm mt-1">
            {products?.length ?? 0} produit{products?.length !== 1 ? "s" : ""}
            {slug && <span> · <span className="text-amber-400/70">{slug}</span></span>}
          </p>
        </div>
        <Button
          onClick={() => setCreateOpen(true)}
          className="bg-amber-500 hover:bg-amber-400 text-zinc-900 font-bold px-5"
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un produit
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/25 pointer-events-none" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un produit..."
            className="w-full bg-zinc-900 border border-white/10 text-white text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-amber-500/40 placeholder:text-white/25"
          />
        </div>
        <select
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value)}
          className="bg-zinc-900 border border-white/10 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-amber-500/40 min-w-[160px]"
        >
          <option value="" className="bg-zinc-900">Toutes les catégories</option>
          {categories.map((c) => <option key={c} value={c} className="bg-zinc-900">{c}</option>)}
        </select>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-14 w-full bg-white/5 rounded-xl" />)}
        </div>
      ) : isError ? (
        <div className="text-center py-16 text-white/40 flex flex-col items-center gap-3">
          <AlertTriangle className="h-8 w-8 text-red-400" />
          <p className="text-sm">Erreur lors du chargement des produits.</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 flex flex-col items-center gap-4">
          <Package className="h-12 w-12 text-white/15" />
          <p className="text-white/40 text-sm">
            {search || filterCat ? "Aucun produit ne correspond à vos filtres." : "Aucun produit enregistré. Ajoutez votre premier produit !"}
          </p>
          {!search && !filterCat && (
            <Button onClick={() => setCreateOpen(true)} variant="outline" className="border-white/15 text-white/60 hover:text-white hover:bg-white/5">
              <Plus className="h-4 w-4 mr-2" /> Ajouter un produit
            </Button>
          )}
        </div>
      ) : (
        <div className="bg-zinc-900/60 border border-white/8 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/8 bg-white/3">
                <th className="text-left px-4 py-3 text-xs font-semibold text-white/40 uppercase tracking-widest">Produit</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-white/40 uppercase tracking-widest">Prix</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-white/40 uppercase tracking-widest">Stock</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-white/40 uppercase tracking-widest">Statut</th>
                <th className="px-4 py-3" />
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
