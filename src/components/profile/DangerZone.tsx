// ---------------------------------------------------------------------------

// src/components/profile/DangerZone.tsx
import { useState } from "react";
import { ShieldAlert, Key, Trash2, Loader2, AlertTriangle } from "lucide-react";
import { usersApi } from "@/lib/api";
import { toast } from "sonner";

export function DangerZone() {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [password, setPassword] = useState("");

  const handleDelete = async () => {
    if (!password) return toast.error("Entrez votre mot de passe");
    setIsDeleting(true);
    try {
      await usersApi.deleteAccount({ password, confirm_delete: true });
      toast.success("Compte supprimé. Au revoir.");
      window.location.href = "/";
    } catch (err) {
      toast.error("Mot de passe incorrect ou erreur serveur.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-black text-red-500 flex items-center gap-2 mt-12">
        <ShieldAlert className="w-6 h-6" />
        Zone Sensible
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Change Password Placeholder UI */}
        <div className="bg-card border-red-100 border p-6 rounded-[32px] space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-50 text-red-500 rounded-xl">
              <Key className="w-5 h-5" />
            </div>
            <p className="font-black text-sm">Changer de mot de passe</p>
          </div>
          <p className="text-xs text-muted-foreground">Une confirmation par email sera requise pour valider le nouveau mot de passe.</p>
          <button className="text-xs font-black text-primary hover:underline">Accéder au changement →</button>
        </div>

        {/* Delete Account */}
        <div className="bg-red-50/50 border-red-200 border p-6 rounded-[32px] space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 text-red-600 rounded-xl">
              <Trash2 className="w-5 h-5" />
            </div>
            <p className="font-black text-sm text-red-600">Supprimer mon compte</p>
          </div>

          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="btn-outline-danger text-xs px-4 py-2 border-red-300 text-red-500"
            >
              Supprimer définitivement
            </button>
          ) : (
            <div className="space-y-3 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center gap-2 text-red-700 bg-red-100 p-2 rounded-xl text-[10px] font-bold">
                <AlertTriangle className="w-3.5 h-3.5" />
                Action irréversible. Confirmez avec votre mot de passe.
              </div>
              <input
                type="password"
                placeholder="Mot de passe actuel"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-red-200 rounded-xl px-4 py-2 text-sm outline-none"
              />
              <div className="flex gap-2">
                <button
                  disabled={isDeleting}
                  onClick={handleDelete}
                  className="flex-1 bg-red-600 text-white rounded-xl py-2 text-xs font-bold hover:bg-red-700 transition-colors"
                >
                  {isDeleting ? "Suppression..." : "Confirmer"}
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 text-xs font-bold border border-red-200 rounded-xl"
                >
                  Annuler
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
