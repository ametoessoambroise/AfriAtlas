import React, { memo } from "react";
import {
  Plus,
  Compass,
  HelpCircle,
  UserCircle,
  ChevronRight,
  Globe,
  Camera,
} from "lucide-react";
import { Link } from "react-router-dom";

export const QuickActions = memo(() => {
  const actions = [
    {
      icon: <Globe className="w-4 h-4" />,
      label: "Explorer",
      sub: "Trouver un lieu",
      to: "/explore",
    },
    {
      icon: <Camera className="w-4 h-4" />,
      label: "Nouvel Album",
      sub: "Capturer vos souvenirs",
      to: "/albums/new",
    },
    {
      icon: <UserCircle className="w-4 h-4" />,
      label: "Mon Profil",
      sub: "Gérer vos infos",
      to: "/profile/edit",
    },
    {
      icon: <HelpCircle className="w-4 h-4" />,
      label: "Support Client",
      sub: "Assistance 24/7",
      to: "/support",
    },
  ];

  return (
    <div className="bg-card rounded-[32px] p-6 border border-border h-full shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-6">
        <p className="font-black text-foreground">Services Rapides</p>
        <button className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-110 transition-transform">
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        {actions.map((act, i) => (
          <Link
            key={i}
            to={act.to}
            className="flex items-center justify-between group focus:outline-none"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-muted border border-border flex items-center justify-center text-muted-foreground group-hover:bg-primary/5 group-hover:text-primary transition-all">
                {act.icon}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-black text-foreground truncate group-hover:text-primary transition-colors">
                  {act.label}
                </p>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                  {act.sub}
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted group-hover:text-primary transition-colors translate-x-0 group-hover:translate-x-1 transition-transform" />
          </Link>
        ))}
      </div>

      <div className="mt-8 p-4 bg-muted rounded-2xl border border-border">
        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 text-center">
          Besoin d'un itinéraire ?
        </p>
        <button className="w-full py-2 bg-primary text-primary-foreground rounded-xl text-xs font-black shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
          Générer un trajet
        </button>
      </div>
    </div>
  );
});
