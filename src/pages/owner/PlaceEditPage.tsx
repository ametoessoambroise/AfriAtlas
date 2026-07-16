import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Save, Trash2, Upload, X, ImagePlus, GripVertical, Clock,
  Tag, Phone, Globe, Mail, MapPin, ChevronLeft, Loader2,
  AlertTriangle, CheckCircle2, DollarSign,
} from "lucide-react";
import { useOwnerClaim, useUpdateClaim } from "@/hooks/queries/useOwnerDashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { PlaceClaimUpdate } from "@/lib/types";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const CATEGORIES = [
  "Restaurant", "Hôtel", "Site Touristique", "Plage", "Musée",
  "Bar & Lounge", "Marché", "Parc & Nature", "Transport", "Autre",
];

const BUDGET_OPTIONS = [
  { value: "€", label: "€ — Économique" },
  { value: "€€", label: "€€ — Abordable" },
  { value: "€€€", label: "€€€ — Intermédiaire" },
  { value: "€€€€", label: "€€€€ — Premium" },
];

const DAYS_FR = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-zinc-900/60 border border-white/8 rounded-md p-6 space-y-4">
      <h2 className="font-black text-white flex items-center gap-2 text-xs uppercase tracking-widest">
        <span className="text-amber-500/80">{icon}</span>
        {title}
      </h2>
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] block mb-2 px-1">{children}</label>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label>{label}</Label>
      {children}
    </div>
  );
}

const inputCls = "bg-white/5 border-white/10 text-white placeholder:text-white/25 focus:ring-amber-500/20 rounded-md h-12 font-bold";

// ─── HoursEditor ─────────────────────────────────────────────────────────────
interface DayHours { open: boolean; from: string; to: string; }
type WeekHours = Record<string, DayHours>;

function HoursEditor({ value, onChange }: { value: WeekHours; onChange: (v: WeekHours) => void }) {
  const toggle = (day: string) =>
    onChange({ ...value, [day]: { ...value[day], open: !value[day]?.open } });
  const setTime = (day: string, field: "from" | "to", t: string) =>
    onChange({ ...value, [day]: { ...value[day], [field]: t } });

  return (
    <div className="flex flex-col gap-2">
      {DAYS_FR.map((day) => {
        const h = value[day] ?? { open: false, from: "08:00", to: "18:00" };
        return (
          <div key={day} className="flex items-center gap-3 bg-white/4 rounded-md px-4 py-3 border border-white/5">
            <button
              type="button"
              onClick={() => toggle(day)}
              className={`w-10 h-5 rounded-full transition-colors flex-shrink-0 relative ${h.open ? "bg-amber-500" : "bg-white/15"}`}
            >
              <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${h.open ? "left-5" : "left-0.5"}`} />
            </button>
            <span className="text-sm text-white/70 w-20 font-bold">{day}</span>
            {h.open ? (
              <div className="flex items-center gap-2 ml-auto">
                <Input
                  type="time"
                  value={h.from}
                  onChange={(e) => setTime(day, "from", e.target.value)}
                  className="bg-white/8 border border-white/10 text-white text-xs rounded-lg h-9 px-3 w-28 font-bold focus:ring-amber-500/20"
                />
                <span className="text-white/30 text-xs font-bold">→</span>
                <Input
                  type="time"
                  value={h.to}
                  onChange={(e) => setTime(day, "to", e.target.value)}
                  className="bg-white/8 border border-white/10 text-white text-xs rounded-lg h-9 px-3 w-28 font-bold focus:ring-amber-500/20"
                />
              </div>
            ) : (
              <span className="ml-auto text-[10px] text-white/25 font-black uppercase tracking-widest">Fermé</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── BudgetSelector ───────────────────────────────────────────────────────────
function BudgetSelector({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {BUDGET_OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`px-4 py-2.5 rounded-md border text-[10px] font-black uppercase tracking-widest transition-all ${
            value === opt.value
              ? "bg-amber-500/20 border-amber-500/50 text-amber-300 shadow-lg shadow-amber-500/10"
              : "bg-white/4 border-white/10 text-white/50 hover:border-white/20 hover:text-white/70"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// ─── TagsEditor ───────────────────────────────────────────────────────────────
function TagsEditor({ tags, onChange }: { tags: string[]; onChange: (v: string[]) => void }) {
  const [input, setInput] = useState("");

  const addTag = () => {
    const t = input.trim();
    if (t && !tags.includes(t)) onChange([...tags, t]);
    setInput("");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 min-h-[2.5rem]">
        {tags.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1.5 bg-indigo-500/15 border border-indigo-500/25 text-indigo-300 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg"
          >
            {tag}
            <button onClick={() => onChange(tags.filter((t) => t !== tag))} className="text-indigo-400/60 hover:text-indigo-300 transition-colors">
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        {tags.length === 0 && <span className="text-[10px] text-white/25 font-black uppercase tracking-widest mt-2 px-1">Aucun tag ajouté</span>}
      </div>
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
          placeholder="Nouveau tag..."
          className="flex-1 bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/25 rounded-md h-11 px-4 focus:ring-amber-500/20 font-bold"
        />
        <Button type="button" onClick={addTag} variant="outline" className="border-white/15 text-white/60 hover:text-white hover:bg-white/5 h-11 rounded-md font-black uppercase tracking-widest text-[10px] px-5">
          <Tag className="h-3.5 w-3.5 mr-2" /> Ajouter
        </Button>
      </div>
    </div>
  );
}

// ─── ImageGalleryManager ──────────────────────────────────────────────────────
function ImageGalleryManager({
  images,
  onChange,
}: {
  images: string[];
  onChange: (imgs: string[]) => void;
}) {
  const removeImg = (i: number) => onChange(images.filter((_, idx) => idx !== i));

  if (!images.length) {
    return <p className="text-[10px] font-black uppercase tracking-widest text-white/25 py-3 px-1">Aucune image existante.</p>;
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
      {images.map((url, i) => (
        <div key={url + i} className="relative group rounded-md overflow-hidden aspect-square bg-white/5 border border-white/5">
          <img src={url} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              onClick={() => removeImg(i)}
              className="w-9 h-9 rounded-full bg-red-500/80 hover:bg-red-500 flex items-center justify-center text-white transition-colors"
              title="Supprimer"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <div className="absolute top-1.5 left-1.5 cursor-grab opacity-0 group-hover:opacity-100 transition-opacity text-white/70">
            <GripVertical className="h-4 w-4" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── ImageUploadZone ──────────────────────────────────────────────────────────
function ImageUploadZone({ onAdd }: { onAdd: (urls: string[]) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);

  const processFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    const urls: string[] = [];
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) return;
      const url = URL.createObjectURL(file);
      urls.push(url);
    });
    setPreviews((p) => [...p, ...urls]);
    onAdd(urls);
  }, [onAdd]);

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => { e.preventDefault(); setDragging(false); processFiles(e.dataTransfer.files); }}
      className={`border-2 border-dashed rounded-md p-8 flex flex-col items-center justify-center gap-4 transition-all cursor-pointer ${
        dragging ? "border-amber-500/60 bg-amber-500/5" : "border-white/10 hover:border-white/20 bg-white/[0.02]"
      }`}
      onClick={() => inputRef.current?.click()}
    >
      <div className="w-14 h-14 rounded-md bg-white/5 flex items-center justify-center shadow-inner">
        <ImagePlus className="h-6 w-6 text-white/30" />
      </div>
      <div className="text-center">
        <p className="text-sm font-black uppercase tracking-tight text-white/70">Glissez des images ici</p>
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/20 mt-1">ou cliquez pour sélectionner (PNG, JPG, WEBP)</p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => processFiles(e.target.files)}
      />
      {previews.length > 0 && (
        <div className="flex gap-2 flex-wrap justify-center mt-4">
          {previews.slice(0, 6).map((url, i) => (
            <img key={i} src={url} alt="" className="w-14 h-14 rounded-lg object-cover border border-white/10 shadow-lg" />
          ))}
          {previews.length > 6 && (
            <div className="w-14 h-14 rounded-lg bg-white/8 flex items-center justify-center text-[10px] font-black text-white/40 uppercase">
              +{previews.length - 6}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── DeletePlaceButton ────────────────────────────────────────────────────────
function DeletePlaceButton({ placeName, onConfirm }: { placeName: string; onConfirm: () => void }) {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [typed, setTyped] = useState("");

  return (
    <>
      <button
        type="button"
        onClick={() => setStep(1)}
        className="text-[10px] font-black uppercase tracking-widest text-red-400/60 hover:text-red-400 underline underline-offset-4 transition-colors flex items-center gap-1.5"
      >
        <Trash2 className="h-3.5 w-3.5" />
        Supprimer ce lieu
      </button>

      {/* Step 1 — première confirmation */}
      <Dialog open={step === 1} onOpenChange={() => setStep(0)}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-md rounded-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-400 font-black uppercase tracking-tight text-xl">
              <AlertTriangle className="h-6 w-6" />
              Supprimer ?
            </DialogTitle>
            <DialogDescription className="text-zinc-400 font-medium mt-2">
              Cette action est irréversible. Toutes les données (photos, avis, statistiques) associées seront définitivement supprimées.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-3 mt-6">
            <Button variant="outline" onClick={() => setStep(0)} className="border-zinc-700 text-zinc-300 rounded-md h-11 px-6 font-black uppercase tracking-widest text-[10px]">Annuler</Button>
            <Button variant="destructive" onClick={() => setStep(2)} className="rounded-md h-11 px-8 font-black uppercase tracking-widest text-[10px]">Continuer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Step 2 — double confirmation avec saisie du nom */}
      <Dialog open={step === 2} onOpenChange={() => { setStep(0); setTyped(""); }}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-md rounded-md">
          <DialogHeader>
            <DialogTitle className="text-red-400 font-black uppercase tracking-tight text-xl">Confirmation finale</DialogTitle>
            <DialogDescription className="text-zinc-400 font-medium mt-2">
              Tapez <span className="font-black text-white uppercase">{placeName}</span> pour confirmer la suppression définitive.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <Input
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              placeholder={placeName}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/20 h-12 rounded-md font-bold text-center"
            />
          </div>
          <DialogFooter className="gap-3 mt-6">
            <Button variant="outline" onClick={() => { setStep(0); setTyped(""); }} className="border-zinc-700 text-zinc-300 rounded-md h-11 px-6 font-black uppercase tracking-widest text-[10px]">Annuler</Button>
            <Button
              variant="destructive"
              disabled={typed !== placeName}
              onClick={() => { onConfirm(); setStep(0); setTyped(""); }}
              className="rounded-md h-11 px-8 font-black uppercase tracking-widest text-[10px]"
            >
              Supprimer définitivement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

// ─── PlaceEditPage ────────────────────────────────────────────────────────────
const PlaceEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: claim, isLoading, isError } = useOwnerClaim(id ?? "");
  const { mutate: update, isPending: isSaving } = useUpdateClaim(id ?? "");

  // ── Form state ──────────────────────────────────────────────────────────────
  const [form, setForm] = useState<PlaceClaimUpdate>({});
  const [hours, setHours] = useState<WeekHours>({});
  const [budget, setBudget] = useState("€€");
  const [tags, setTags] = useState<string[]>([]);
  const [extraPhotos, setExtraPhotos] = useState<string[]>([]);
  const [dirty, setDirty] = useState(false);

  // Pre-fill when data arrives
  useEffect(() => {
    if (!claim) return;
    setForm({
      place_name: claim.place_name,
      category: claim.category,
      short_description: claim.short_description ?? "",
      custom_description: claim.custom_description ?? "",
      phone: claim.phone ?? "",
      website: claim.website ?? "",
      email_contact: claim.email_contact ?? "",
      cover_image_url: claim.cover_image_url ?? "",
      promotion_active: claim.promotion_active,
      promotion_text: claim.promotion_text ?? "",
    });
    // Parse tags from specialties
    if (claim.specialties) {
      setTags(claim.specialties.split(",").map((t) => t.trim()).filter(Boolean));
    }
    // Parse extra photos (JSON array stored as string)
    try {
      const parsed = JSON.parse(claim.extra_photos ?? "[]");
      if (Array.isArray(parsed)) setExtraPhotos(parsed);
    } catch {
      setExtraPhotos([]);
    }
    // Parse hours from opening_hours
    try {
      const parsed = JSON.parse(claim.opening_hours ?? "{}");
      setHours(parsed);
    } catch {
      setHours({});
    }
  }, [claim]);

  const set = (key: keyof PlaceClaimUpdate, val: unknown) => {
    setForm((f) => ({ ...f, [key]: val }));
    setDirty(true);
  };

  const handleSave = () => {
    update({
      ...form,
      specialties: tags.join(", "),
      opening_hours: JSON.stringify(hours),
      extra_photos: JSON.stringify(extraPhotos),
    });
    setDirty(false);
  };

  // ── Loading ──────────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <Skeleton className="h-8 w-48 bg-white/5 rounded-md" />
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-48 w-full bg-white/5 rounded-md" />
        ))}
      </div>
    );
  }

  if (isError || !claim) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-white/50 gap-4 animate-in fade-in duration-500">
        <div className="w-20 h-20 bg-destructive/10 rounded-md flex items-center justify-center">
            <AlertTriangle className="h-10 w-10 text-red-400" />
        </div>
        <div className="text-center space-y-1">
          <p className="text-lg font-black uppercase tracking-tight text-white">Accès refusé</p>
          <p className="text-xs font-bold uppercase tracking-widest text-white/30">Lieu introuvable ou vous n'êtes pas le propriétaire.</p>
        </div>
        <Button asChild variant="outline" className="mt-4 rounded-md h-12 px-8 font-black uppercase tracking-widest text-xs border-white/10 hover:bg-white/5">
          <Link to="/owner/dashboard">
            ← Retour au dashboard
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-32 animate-in fade-in duration-700">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            to="/owner/dashboard"
            className="text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-white/60 flex items-center gap-1.5 mb-3 transition-colors"
          >
            <ChevronLeft className="h-3.5 w-3.5" /> Retour au dashboard
          </Link>
          <h1 className="text-3xl font-black text-white uppercase tracking-tight">Modifier <span className="text-amber-500">le lieu</span></h1>
          <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.2em] mt-1">{claim.place_name}</p>
        </div>

        {/* Save button */}
        <Button
          onClick={handleSave}
          disabled={!dirty || isSaving}
          className="bg-amber-500 hover:bg-amber-400 text-zinc-900 font-black uppercase tracking-widest text-xs h-12 px-8 rounded-md shadow-lg shadow-amber-500/20 transition-all active:scale-[0.98] disabled:opacity-30"
        >
          {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
          Enregistrer
        </Button>
      </div>

      {/* 1. Infos générales */}
      <Section title="Informations générales" icon={<MapPin className="h-4 w-4" />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Nom du lieu">
            <Input value={form.place_name ?? ""} onChange={(e) => set("place_name", e.target.value)} className={inputCls} />
          </Field>
          <Field label="Catégorie">
            <Select
              value={form.category ?? ""}
              onValueChange={(val) => set("category", val)}
            >
              <SelectTrigger className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-md h-12 font-bold focus:ring-amber-500/20">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-950 border-white/10 text-white">
                {CATEGORIES.map((c) => <SelectItem key={c} value={c} className="focus:bg-white/10 focus:text-white">{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </Field>
        </div>
        <Field label="Description courte">
          <textarea
            value={form.short_description ?? ""}
            onChange={(e) => set("short_description", e.target.value)}
            rows={2}
            placeholder="Accroche visible dans les résultats de recherche..."
            className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-amber-500/20 placeholder:text-white/20 resize-none font-medium leading-relaxed"
          />
        </Field>
        <Field label="Description complète">
          <textarea
            value={form.custom_description ?? ""}
            onChange={(e) => set("custom_description", e.target.value)}
            rows={5}
            placeholder="Description détaillée affichée sur la page du lieu..."
            className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-amber-500/20 placeholder:text-white/20 resize-none font-medium leading-relaxed"
          />
        </Field>
        <div className="pt-2">
            <Label>Budget moyen estimé</Label>
            <BudgetSelector value={budget} onChange={(v) => { setBudget(v); setDirty(true); }} />
        </div>
      </Section>

      {/* 2. Horaires */}
      <Section title="Horaires d'ouverture" icon={<Clock className="h-4 w-4" />}>
        <HoursEditor value={hours} onChange={(v) => { setHours(v); setDirty(true); }} />
      </Section>

      {/* 3. Tags */}
      <Section title="Tags & Spécialités" icon={<Tag className="h-4 w-4" />}>
        <TagsEditor tags={tags} onChange={(t) => { setTags(t); setDirty(true); }} />
      </Section>

      {/* 4. Contact */}
      <Section title="Coordonnées de contact" icon={<Phone className="h-4 w-4" />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Téléphone">
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 pointer-events-none" />
              <Input value={form.phone ?? ""} onChange={(e) => set("phone", e.target.value)} placeholder="+228 90 00 00 00" className={`${inputCls} pl-11`} />
            </div>
          </Field>
          <Field label="Site web">
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 pointer-events-none" />
              <Input value={form.website ?? ""} onChange={(e) => set("website", e.target.value)} placeholder="https://..." className={`${inputCls} pl-11`} />
            </div>
          </Field>
          <Field label="Email de contact">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 pointer-events-none" />
              <Input value={form.email_contact ?? ""} onChange={(e) => set("email_contact", e.target.value)} placeholder="contact@..." className={`${inputCls} pl-11`} />
            </div>
          </Field>
          <Field label="Image de couverture (URL)">
            <Input value={form.cover_image_url ?? ""} onChange={(e) => set("cover_image_url", e.target.value)} placeholder="https://..." className={inputCls} />
          </Field>
        </div>
      </Section>

      {/* 5. Images */}
      <Section title="Galerie d'images" icon={<ImagePlus className="h-4 w-4" />}>
        <div className="space-y-6">
            <div className="space-y-3">
                <Label>Images existantes</Label>
                <ImageGalleryManager
                  images={extraPhotos}
                  onChange={(imgs) => { setExtraPhotos(imgs); setDirty(true); }}
                />
            </div>
            <div className="space-y-3">
                <Label>Ajouter des images</Label>
                <ImageUploadZone onAdd={(urls) => { setExtraPhotos((p) => [...p, ...urls]); setDirty(true); }} />
            </div>
        </div>
      </Section>

      {/* 6. Promotion */}
      <Section title="Promotion" icon={<DollarSign className="h-4 w-4" />}>
        <div className="flex items-center gap-4 mb-4 bg-amber-500/5 p-4 rounded-md border border-amber-500/10">
          <button
            type="button"
            onClick={() => set("promotion_active", !form.promotion_active)}
            className={`w-11 h-6 rounded-full transition-all relative flex-shrink-0 ${form.promotion_active ? "bg-amber-500 shadow-lg shadow-amber-500/20" : "bg-white/10"}`}
          >
            <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${form.promotion_active ? "left-6" : "left-1"}`} />
          </button>
          <span className="text-xs font-black uppercase tracking-widest text-amber-500/90">Activer une promotion sur ce lieu</span>
        </div>
        {form.promotion_active && (
          <div className="animate-in slide-in-from-top-2 duration-300">
              <Label>Message promotionnel</Label>
              <textarea
                value={form.promotion_text ?? ""}
                onChange={(e) => set("promotion_text", e.target.value)}
                rows={2}
                placeholder="Exemple: -20% sur la carte ce weekend ! ✨"
                className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-amber-500/20 placeholder:text-white/20 resize-none font-bold italic"
              />
          </div>
        )}
      </Section>

      {/* 7. Save bottom bar */}
      <div className="sticky bottom-6 z-30 px-4">
        <div className="bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-md p-4 flex items-center justify-between shadow-2xl max-w-2xl mx-auto ring-1 ring-white/5">
          <div className="flex items-center gap-3 px-2">
            {dirty ? (
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">Modifications en cours...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                 <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Lieu synchronisé</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            <DeletePlaceButton
              placeName={claim.place_name}
              onConfirm={() => navigate("/owner/dashboard")}
            />
            <Button
              onClick={handleSave}
              disabled={!dirty || isSaving}
              className="bg-amber-500 hover:bg-amber-400 text-zinc-900 font-black uppercase tracking-widest text-[10px] px-8 h-11 rounded-md shadow-lg shadow-amber-500/20 disabled:opacity-30 transition-all"
            >
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
              Enregistrer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceEditPage;
