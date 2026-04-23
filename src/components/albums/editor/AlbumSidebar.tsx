import React from "react";
import { Link, MapPin, Share2, Download, Video, Globe2 } from "lucide-react";
import type { AlbumDetailResponse, PlaceListResponse } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import AssociatedPlaces from "../AssociatedPlaces";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface AlbumSidebarProps {
  album: AlbumDetailResponse;
  places: PlaceListResponse[];
}

const THEMES = [
  { id: "nature", label: "Nature", icon: "🌅" },
  { id: "urbain", label: "Urbain", icon: "🏙️" },
  { id: "plage", label: "Plage", icon: "🏝️" },
  { id: "luxe", label: "Luxe", icon: "✨" },
];

const COLORS = [
  "bg-blue-600",
  "bg-indigo-500",
  "bg-emerald-500",
  "bg-orange-500",
  "bg-rose-500",
  "bg-gradient-to-tr from-purple-500 to-orange-500",
];

const FONTS = [
  { id: "inter", label: "Inter", class: "font-sans" },
  { id: "playfair", label: "Playfair", class: "font-serif" },
  { id: "poppins", label: "Poppins", class: "font-sans" },
];

export default function AlbumSidebar({ album, places }: AlbumSidebarProps) {
  const [activeTheme, setActiveTheme] = React.useState("nature");
  const [activeColor, setActiveColor] = React.useState(0);
  const [activeFont, setActiveFont] = React.useState("inter");

  // Options state
  const [opts, setOpts] = React.useState({
    map: true,
    captions: true,
    music: false,
  });

  const handleExport = (type: string) => {
    // TODO : implement export logic
    toast.success(`Export ${type} lancé. Vous recevrez une notification.`);
  };

  return (
    <div className="space-y-6">
      {/* 1. Personnalisation */}
      <div className="bg-white rounded-[2rem] border border-border shadow-sm p-6 space-y-8">
        <h3 className="font-black text-xl">Personnalise ton album</h3>

        {/* Thème */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-muted-foreground">
            Thème
          </label>
          <div className="grid grid-cols-2 gap-2">
            {THEMES.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setActiveTheme(theme.id)}
                className={`flex items-center gap-2 p-2.5 rounded-xl border transition-all text-sm font-bold ${
                  activeTheme === theme.id
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border hover:border-primary/40 text-muted-foreground"
                }`}
              >
                <span>{theme.icon}</span> {theme.label}
              </button>
            ))}
          </div>
        </div>

        {/* Couleur Principale */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-muted-foreground">
            Couleur principale
          </label>
          <div className="flex flex-wrap gap-3">
            {COLORS.map((color, i) => (
              <button
                key={i}
                onClick={() => setActiveColor(i)}
                className={`w-8 h-8 rounded-full ${color} flex items-center justify-center transition-transform ${
                  activeColor === i
                    ? "ring-2 ring-offset-2 ring-primary scale-110"
                    : "hover:scale-110"
                }`}
              >
                {activeColor === i && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Style de couverture */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-muted-foreground">
            Style de couverture
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              "https://images.unsplash.com/photo-1682687982501-1e58f813f22b?q=80&w=200&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=200&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=200&auto=format&fit=crop",
            ].map((img, i) => (
              <div
                key={i}
                className={`aspect-[3/4] rounded-lg overflow-hidden border-2 cursor-pointer ${i === 0 ? "border-primary" : "border-transparent"}`}
              >
                <img
                  src={img}
                  className="w-full h-full object-cover"
                  alt={`Cover ${i}`}
                />
              </div>
            ))}
          </div>
          <Button
            variant="outline"
            className="w-full rounded-xl mt-2 text-xs font-bold border-border/50"
          >
            Voir plus
          </Button>
        </div>

        {/* Police */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-muted-foreground">
            Police d'écriture
          </label>
          <div className="flex gap-2">
            {FONTS.map((font) => (
              <button
                key={font.id}
                onClick={() => setActiveFont(font.id)}
                className={`flex-1 py-2 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeFont === font.id
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border hover:border-primary/40 text-muted-foreground"
                }`}
              >
                <span className="text-muted-foreground opacity-50 font-serif italic text-sm">
                  Aa
                </span>{" "}
                {font.label}
              </button>
            ))}
          </div>
        </div>

        {/* Options avancées */}
        <div className="space-y-4 pt-2 border-t border-border/50">
          <label className="text-sm font-bold text-muted-foreground">
            Options avancées
          </label>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              Inclure la carte de voyage
            </span>
            <Switch
              checked={opts.map}
              onCheckedChange={(v) => setOpts({ ...opts, map: v })}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Ajouter des légendes IA</span>
            <Switch
              checked={opts.captions}
              onCheckedChange={(v) => setOpts({ ...opts, captions: v })}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Musique d'ambiance</span>
            <Switch
              checked={opts.music}
              onCheckedChange={(v) => setOpts({ ...opts, music: v })}
            />
          </div>
        </div>
      </div>

      {/* 2. Lieux Associés (Preserving existing logic) */}
      <div className="bg-white rounded-[2rem] border border-border shadow-sm p-6">
        {/* We use the existing AssociatedPlaces component here to preserve its functionality exactly */}
        <AssociatedPlaces albumId={album.id} places={places} />
      </div>

      {/* 3. Export & Share */}
      <div className="bg-white rounded-[2rem] border border-border shadow-sm p-6 space-y-4">
        <h3 className="font-black text-xl mb-2">Partage & exporte</h3>

        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={() => handleExport("lien")}
            className="rounded-xl justify-start gap-2 h-12 border-border/50 hover:bg-muted/50 font-bold text-xs"
          >
            <Share2 className="w-4 h-4 text-muted-foreground" /> Partager le
            lien
          </Button>
          <Button
            variant="outline"
            onClick={() => handleExport("pdf")}
            className="rounded-xl justify-start gap-2 h-12 border-border/50 hover:bg-muted/50 font-bold text-xs"
          >
            <Download className="w-4 h-4 text-muted-foreground" /> Télécharger
            PDF
          </Button>
          <Button
            variant="outline"
            onClick={() => handleExport("video")}
            className="rounded-xl justify-start gap-2 h-12 border-border/50 hover:bg-muted/50 font-bold text-xs"
          >
            <Video className="w-4 h-4 text-muted-foreground" /> Exporter en
            vidéo
          </Button>
          <Button
            variant="outline"
            onClick={() => handleExport("worldatlas")}
            className="rounded-xl justify-start gap-2 h-12 border-border/50 hover:bg-muted/50 font-bold text-xs"
          >
            <Globe2 className="w-4 h-4 text-muted-foreground" /> Publier sur
            site
          </Button>
        </div>
      </div>
    </div>
  );
}
