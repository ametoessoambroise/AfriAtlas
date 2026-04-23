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
    <div className="bg-zinc-900/60 border border-white/8 rounded-2xl p-6 space-y-4">
      <h2 className="font-semibold text-white flex items-center gap-2 text-sm">
        <span className="text-white/40">{icon}</span>
        {title}
      </h2>
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="text-xs font-medium text-white/50 uppercase tracking-widest block mb-1.5">{children}</label>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label>{label}</Label>
      {children}
    </div>
  );
}

const inputCls = "bg-white/5 border-white/10 text-white placeholder:text-white/25 focus:border-amber-500/40 focus:ring-0 rounded-xl";

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
          <div key={day} className="flex items-center gap-3 bg-white/4 rounded-xl px-4 py-2.5">
            <button
              type="button"
              onClick={() => toggle(day)}
              className={`w-10 h-5 rounded-full transition-colors flex-shrink-0 relative ${h.open ? "bg-amber-500" : "bg-white/15"}`}
            >
              <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${h.open ? "left-5" : "left-0.5"}`} />
            </button>
            <span className="text-sm text-white/70 w-20 font-medium">{day}</span>
            {h.open ? (
              <div className="flex items-center gap-2 ml-auto">
                <input
                  type="time"
                  value={h.from}
                  onChange={(e) => setTime(day, "from", e.target.value)}
                  className="bg-white/8 border border-white/10 text-white text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-amber-500/40"
                />
                <span className="text-white/30 text-xs">→</span>
                <input
                  type="time"
                  value={h.to}
                  onChange={(e) => setTime(day, "to", e.target.value)}
                  className="bg-white/8 border border-white/10 text-white text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-amber-500/40"
                />
              </div>
            ) : (
              <span className="ml-auto text-xs text-white/25">Fermé</span>
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
          className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
            value === opt.value
              ? "bg-amber-500/20 border-amber-500/50 text-amber-300"
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
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2 min-h-[2rem]">
        {tags.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1.5 bg-indigo-500/15 border border-indigo-500/25 text-indigo-300 text-xs font-medium px-3 py-1.5 rounded-full"
          >
            {tag}
            <button onClick={() => onChange(tags.filter((t) => t !== tag))} className="text-indigo-400/60 hover:text-indigo-300 transition-colors">
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        {tags.length === 0 && <span className="text-xs text-white/25">Aucun tag ajouté</span>}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
          placeholder="Nouveau tag..."
          className="flex-1 bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/25 rounded-xl px-3 py-2 focus:outline-none focus:border-amber-500/40"
        />
        <Button type="button" onClick={addTag} variant="outline" className="border-white/15 text-white/60 hover:text-white hover:bg-white/5 text-xs px-3">
          <Tag className="h-3.5 w-3.5 mr-1" /> Ajouter
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
    return <p className="text-xs text-white/25 py-2">Aucune image existante.</p>;
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
      {images.map((url, i) => (
        <div key={url + i} className="relative group rounded-xl overflow-hidden aspect-square bg-white/5">
          <img src={url} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              onClick={() => removeImg(i)}
              className="w-8 h-8 rounded-full bg-red-500/80 hover:bg-red-500 flex items-center justify-center text-white transition-colors"
              title="Supprimer"
            >
              <Trash2 className="h-3.5 w-3.5" />
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
      className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-3 transition-colors cursor-pointer ${
        dragging ? "border-amber-500/60 bg-amber-500/5" : "border-white/15 hover:border-white/25 bg-white/3"
      }`}
      onClick={() => inputRef.current?.click()}
    >
      <div className="w-12 h-12 rounded-full bg-white/8 flex items-center justify-center">
        <ImagePlus className="h-5 w-5 text-white/40" />
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-white/60">Glissez des images ici</p>
        <p className="text-xs text-white/30 mt-1">ou cliquez pour sélectionner (PNG, JPG, WEBP)</p>
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
        <div className="flex gap-2 flex-wrap justify-center mt-2">
          {previews.slice(0, 6).map((url, i) => (
            <img key={i} src={url} alt="" className="w-14 h-14 rounded-lg object-cover border border-white/10" />
          ))}
          {previews.length > 6 && (
            <div className="w-14 h-14 rounded-lg bg-white/8 flex items-center justify-center text-xs text-white/40">
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
        className="text-xs text-red-400/60 hover:text-red-400 underline underline-offset-2 transition-colors flex items-center gap-1.5"
      >
        <Trash2 className="h-3.5 w-3.5" />
        Supprimer ce lieu
      </button>

      {/* Step 1 — première confirmation */}
      <Dialog open={step === 1} onOpenChange={() => setStep(0)}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-400">
              <AlertTriangle className="h-5 w-5" />
              Supprimer "{placeName}" ?
            </DialogTitle>
            <DialogDescription className="text-zinc-400">
              Cette action est irréversible. Toutes les données (photos, avis, statistiques) associées seront définitivement supprimées.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setStep(0)} className="border-zinc-700 text-zinc-300">Annuler</Button>
            <Button variant="destructive" onClick={() => setStep(2)}>Continuer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Step 2 — double confirmation avec saisie du nom */}
      <Dialog open={step === 2} onOpenChange={() => { setStep(0); setTyped(""); }}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-400">Confirmation finale</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Tapez <span className="font-semibold text-white">{placeName}</span> pour confirmer la suppression.
            </DialogDescription>
          </DialogHeader>
          <Input
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            placeholder={placeName}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/25 mt-2"
          />
          <DialogFooter className="gap-2 mt-2">
            <Button variant="outline" onClick={() => { setStep(0); setTyped(""); }} className="border-zinc-700 text-zinc-300">Annuler</Button>
            <Button
              variant="destructive"
              disabled={typed !== placeName}
              onClick={() => { onConfirm(); setStep(0); setTyped(""); }}
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
        <Skeleton className="h-8 w-48 bg-white/5 rounded-xl" />
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-40 w-full bg-white/5 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (isError || !claim) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-white/50 gap-3">
        <AlertTriangle className="h-10 w-10 text-red-400" />
        <p>Lieu introuvable ou accès refusé.</p>
        <Link to="/owner/dashboard" className="text-sm text-amber-400 hover:text-amber-300 underline">
          ← Retour au dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            to="/owner/dashboard"
            className="text-xs text-white/30 hover:text-white/60 flex items-center gap-1 mb-3 transition-colors"
          >
            <ChevronLeft className="h-3.5 w-3.5" /> Retour au dashboard
          </Link>
          <h1 className="text-2xl font-bold text-white">Modifier le lieu</h1>
          <p className="text-white/40 text-sm mt-1">{claim.place_name}</p>
        </div>

        {/* Save button */}
        <Button
          onClick={handleSave}
          disabled={!dirty || isSaving}
          className="bg-amber-500 hover:bg-amber-400 text-zinc-900 font-bold px-5 py-2.5 rounded-xl disabled:opacity-40 transition-all"
        >
          {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
          Enregistrer
        </Button>
      </div>

      {/* 1. Infos générales */}
      <Section title="Informations générales" icon={<MapPin className="h-4 w-4" />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Nom du lieu">
            <Input value={form.place_name ?? ""} onChange={(e) => set("place_name", e.target.value)} className={inputCls} />
          </Field>
          <Field label="Catégorie">
            <select
              value={form.category ?? ""}
              onChange={(e) => set("category", e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-500/40"
            >
              {CATEGORIES.map((c) => <option key={c} value={c} className="bg-zinc-900">{c}</option>)}
            </select>
          </Field>
        </div>
        <Field label="Description courte">
          <textarea
            value={form.short_description ?? ""}
            onChange={(e) => set("short_description", e.target.value)}
            rows={2}
            placeholder="Accroche visible dans les résultats de recherche..."
            className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-500/40 placeholder:text-white/25 resize-none"
          />
        </Field>
        <Field label="Description complète">
          <textarea
            value={form.custom_description ?? ""}
            onChange={(e) => set("custom_description", e.target.value)}
            rows={4}
            placeholder="Description détaillée affichée sur la page du lieu..."
            className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-500/40 placeholder:text-white/25 resize-none"
          />
        </Field>
        <Field label="Budget moyen">
          <BudgetSelector value={budget} onChange={(v) => { setBudget(v); setDirty(true); }} />
        </Field>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Téléphone">
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/25 pointer-events-none" />
              <Input value={form.phone ?? ""} onChange={(e) => set("phone", e.target.value)} placeholder="+228 90 00 00 00" className={`${inputCls} pl-9`} />
            </div>
          </Field>
          <Field label="Site web">
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/25 pointer-events-none" />
              <Input value={form.website ?? ""} onChange={(e) => set("website", e.target.value)} placeholder="https://..." className={`${inputCls} pl-9`} />
            </div>
          </Field>
          <Field label="Email de contact">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/25 pointer-events-none" />
              <Input value={form.email_contact ?? ""} onChange={(e) => set("email_contact", e.target.value)} placeholder="contact@..." className={`${inputCls} pl-9`} />
            </div>
          </Field>
          <Field label="Image de couverture (URL)">
            <Input value={form.cover_image_url ?? ""} onChange={(e) => set("cover_image_url", e.target.value)} placeholder="https://..." className={inputCls} />
          </Field>
        </div>
      </Section>

      {/* 5. Images */}
      <Section title="Galerie d'images" icon={<ImagePlus className="h-4 w-4" />}>
        <Label>Images existantes</Label>
        <ImageGalleryManager
          images={extraPhotos}
          onChange={(imgs) => { setExtraPhotos(imgs); setDirty(true); }}
        />
        <Label>Ajouter des images</Label>
        <ImageUploadZone onAdd={(urls) => { setExtraPhotos((p) => [...p, ...urls]); setDirty(true); }} />
      </Section>

      {/* 6. Promotion */}
      <Section title="Promotion" icon={<DollarSign className="h-4 w-4" />}>
        <div className="flex items-center gap-3 mb-3">
          <button
            type="button"
            onClick={() => set("promotion_active", !form.promotion_active)}
            className={`w-10 h-5 rounded-full transition-colors relative flex-shrink-0 ${form.promotion_active ? "bg-amber-500" : "bg-white/15"}`}
          >
            <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${form.promotion_active ? "left-5" : "left-0.5"}`} />
          </button>
          <span className="text-sm text-white/70">Activer une promotion</span>
        </div>
        {form.promotion_active && (
          <textarea
            value={form.promotion_text ?? ""}
            onChange={(e) => set("promotion_text", e.target.value)}
            rows={2}
            placeholder="Texte de la promotion (ex: -20% ce weekend !)"
            className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-500/40 placeholder:text-white/25 resize-none"
          />
        )}
      </Section>

      {/* 7. Save bottom bar */}
      <div className="sticky bottom-4 z-20">
        <div className="bg-zinc-900/95 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center justify-between shadow-2xl">
          <div className="flex items-center gap-2 text-sm">
            {dirty ? (
              <><AlertTriangle className="h-4 w-4 text-amber-400" /><span className="text-amber-300">Modifications non sauvegardées</span></>
            ) : (
              <><CheckCircle2 className="h-4 w-4 text-emerald-400" /><span className="text-white/40">Tout est sauvegardé</span></>
            )}
          </div>
          <div className="flex items-center gap-3">
            <DeletePlaceButton
              placeName={claim.place_name}
              onConfirm={() => navigate("/owner/dashboard")}
            />
            <Button
              onClick={handleSave}
              disabled={!dirty || isSaving}
              className="bg-amber-500 hover:bg-amber-400 text-zinc-900 font-bold px-6 py-2.5 rounded-xl disabled:opacity-40"
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
