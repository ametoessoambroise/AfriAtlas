import React, { useState } from "react";
import {
  Key,
  ShieldCheck,
  LogOut,
  Moon,
  Sun,
  Bell,
  Eye,
  Database,
  Loader2,
  Lock,
  Globe
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { usersApi, authenticationApi } from "@/lib/api";
import { toast } from "sonner";
import { DangerZone } from "./DangerZone";

/**
 * SECTION : SÉCURITÉ
 */
export function SecurityPanel() {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isLoggingOutAll, setIsLoggingOutAll] = useState(false);

  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.new_password !== passwordData.confirm_password) {
      return toast.error("Les nouveaux mots de passe ne correspondent pas");
    }

    setIsChangingPassword(true);
    try {
      await usersApi.changePassword(passwordData);
      toast.success("Mot de passe mis à jour !");
      setPasswordData({ current_password: "", new_password: "", confirm_password: "" });
    } catch (err) {
      toast.error("Échec du changement de mot de passe");
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleLogoutAll = async () => {
    setIsLoggingOutAll(true);
    try {
      await authenticationApi.logoutAll();
      toast.success("Déconnecté de tous les autres appareils");
    } catch (err) {
      toast.error("Erreur lors de la déconnexion globale");
    } finally {
      setIsLoggingOutAll(false);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Mot de passe */}
      <section className="bg-card border border-border p-8 rounded-[40px] space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-primary/10 text-primary rounded-2xl">
            <Key className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black">Sécurité du compte</h3>
            <p className="text-xs text-muted-foreground">Gérez votre mot de passe et vos accès</p>
          </div>
        </div>

        <form onSubmit={handleChangePassword} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1 md:col-span-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Mot de passe actuel</Label>
              <input
                type="password"
                required
                value={passwordData.current_password}
                onChange={e => setPasswordData({ ...passwordData, current_password: e.target.value })}
                className="w-full bg-background border border-border rounded-2xl px-4 py-3 focus:border-primary outline-none transition-all"
              />
            </div>
            <div>
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Nouveau mot de passe</Label>
              <input
                type="password"
                required
                value={passwordData.new_password}
                onChange={e => setPasswordData({ ...passwordData, new_password: e.target.value })}
                className="w-full bg-background border border-border rounded-2xl px-4 py-3 focus:border-primary outline-none transition-all"
              />
            </div>
            <div>
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Confirmer nouveau</Label>
              <input
                type="password"
                required
                value={passwordData.confirm_password}
                onChange={e => setPasswordData({ ...passwordData, confirm_password: e.target.value })}
                className="w-full bg-background border border-border rounded-2xl px-4 py-3 focus:border-primary outline-none transition-all"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isChangingPassword}
            className="btn-primary px-8 py-3.5 flex items-center gap-2"
          >
            {isChangingPassword ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
            Mettre à jour le mot de passe
          </button>
        </form>
      </section>

      {/* Sessions actives */}
      <section className="bg-card border border-border p-8 rounded-[40px] space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/10 text-blue-500 rounded-2xl">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black">Sessions actives</h3>
            <p className="text-xs text-muted-foreground">Déconnectez-vous de tous vos autres appareils en un clic</p>
          </div>
        </div>

        <div className="bg-surface-alt p-6 rounded-3xl border border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm font-bold">Sécurité renforcée</p>
            <p className="text-xs text-muted-foreground">Cette action révoquera tous les tokens sauf celui-ci.</p>
          </div>
          <button
            disabled={isLoggingOutAll}
            onClick={handleLogoutAll}
            className="w-full md:w-auto px-6 py-3 border border-border rounded-2xl text-xs font-black uppercase tracking-wider hover:bg-background transition-colors flex items-center justify-center gap-2"
          >
            {isLoggingOutAll ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />}
            Déconnecter tout le monde
          </button>
        </div>
      </section>

      <DangerZone />
    </div>
  );
}

/**
 * SECTION : PRÉFÉRENCES
 */
export function PreferencesPanel() {
  const [theme, setTheme] = useState(document.documentElement.classList.contains("dark") ? "dark" : "light");
  const [notifs, setNotifs] = useState({
    email: true,
    push: false,
    offers: true
  });

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", newTheme);
    toast.success(`Mode ${newTheme} activé`);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Apparence & Langue */}
      <section className="bg-card border border-border p-8 rounded-[40px] space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-yellow-500/10 text-yellow-500 rounded-2xl">
            {theme === "dark" ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
          </div>
          <div>
            <h3 className="text-xl font-black">Apparence & Langue</h3>
            <p className="text-xs text-muted-foreground">Personnalisez votre interface Atlas</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-6 bg-surface-alt rounded-3xl border border-border/50">
            <div className="space-y-1">
              <Label className="text-sm font-bold block">Mode Sombre</Label>
              <p className="text-[10px] text-muted-foreground">Interface nocturne</p>
            </div>
            <Switch
              checked={theme === "dark"}
              onCheckedChange={toggleTheme}
            />
          </div>

          <div className="flex items-center justify-between p-6 bg-surface-alt rounded-3xl border border-border/50">
            <div className="space-y-1">
              <Label className="text-sm font-bold block">Langue</Label>
              <p className="text-[10px] text-muted-foreground">Langue de l'application</p>
            </div>
            <select className="bg-background border border-border rounded-xl px-3 py-1.5 text-xs font-bold outline-none focus:border-primary transition-all">
              <option value="fr">Français</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="bg-card border border-border p-8 rounded-[40px] space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-green-500/10 text-green-500 rounded-2xl">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black">Notifications</h3>
            <p className="text-xs text-muted-foreground">Choisissez comment vous voulez être informé</p>
          </div>
        </div>

        <div className="space-y-3">
          {[
            { id: "email", label: "Emails de voyage", desc: "Conseils, guides et récapitulatifs", icon: <Globe className="w-4 h-4" /> },
            { id: "push", label: "Alertes Push", desc: "Notifications instantanées sur l'application", icon: <Bell className="w-4 h-4" /> },
            { id: "offers", label: "Offres Flash", desc: "Promotions exclusives Atlas Voyages", icon: <ShieldCheck className="w-4 h-4" /> },
          ].map((item) => (
            <div key={item.id} className="flex items-center justify-between p-6 bg-surface-alt rounded-3xl border border-border/50">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-background rounded-xl text-muted-foreground">
                  {item.icon}
                </div>
                <div className="space-y-0.5">
                  <Label className="text-sm font-bold block">{item.label}</Label>
                  <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                </div>
              </div>
              <Switch
                checked={notifs[item.id as keyof typeof notifs]}
                onCheckedChange={() => setNotifs({ ...notifs, [item.id]: !notifs[item.id as keyof typeof notifs] })}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/**
 * SECTION : CONFIDENTIALITÉ
 */
export function PrivacyPanel() {
  const [privacy, setPrivacy] = useState({
    public: true,
    share: true,
    analytics: false
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <section className="bg-card border border-border p-8 rounded-[40px] space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/10 text-indigo-500 rounded-2xl">
            <Eye className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black">Confidentialité</h3>
            <p className="text-xs text-muted-foreground">Gérez vos données et votre visibilité</p>
          </div>
        </div>

        <div className="space-y-3">
          {[
            { id: "public", label: "Profil Public", desc: "Vos avis sont visibles par les autres membres", icon: <Globe className="w-4 h-4" /> },
            { id: "share", label: "Partage de données", desc: "Partager l'historique avec les partenaires", icon: <Database className="w-4 h-4" /> },
            { id: "analytics", label: "Analyses anonymes", desc: "Aidez-nous à améliorer Atlas Voyages", icon: <ShieldCheck className="w-4 h-4" /> },
          ].map((item) => (
            <div key={item.id} className="flex items-center justify-between p-6 bg-surface-alt rounded-3xl border border-border/50">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-background rounded-xl text-muted-foreground">
                  {item.icon}
                </div>
                <div className="space-y-0.5">
                  <Label className="text-sm font-bold block">{item.label}</Label>
                  <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                </div>
              </div>
              <Switch
                checked={privacy[item.id as keyof typeof privacy]}
                onCheckedChange={() => setPrivacy({ ...privacy, [item.id]: !privacy[item.id as keyof typeof privacy] })}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
