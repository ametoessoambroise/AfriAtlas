// src/components/profile/ProfileForm.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { UserResponse, UserUpdate } from "@/lib/types/user";
import { usersApi } from "@/lib/api";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2, Save } from "lucide-react";

const profileSchema = z.object({
  fullname: z.string().min(2, "Nom trop court"),
  email: z.string().email("Email invalide"),
  country: z.string().optional().nullable(),
  preferred_language: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  user: UserResponse;
  onSuccess: (updated: UserResponse) => void;
}

export function ProfileForm({ user, onSuccess }: ProfileFormProps) {
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullname: user.fullname,
      email: user.email,
      country: user.country || "Togo",
      preferred_language: user.preferred_language || "fr",
    },
  });

  const onSubmit = async (values: ProfileFormValues) => {
    setIsSaving(true);
    try {
      const updated = await usersApi.updateUserProfile(values as UserUpdate);
      onSuccess(updated);
      toast.success("Profil mis à jour !");
    } catch (err) {
      toast.error("Erreur lors de la mise à jour.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-card border border-border p-8 rounded-[40px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2 block">Nom complet</label>
          <input
            {...form.register("fullname")}
            className="w-full bg-background border border-border rounded-2xl px-4 py-3 focus:border-primary outline-none transition-colors"
          />
          {form.formState.errors.fullname && (
            <p className="text-red-500 text-[10px] mt-1 font-bold">{form.formState.errors.fullname.message}</p>
          )}
        </div>
        <div>
          <label className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2 block">Email</label>
          <input
            {...form.register("email")}
            disabled
            className="w-full bg-surface-alt border border-border rounded-2xl px-4 py-3 text-muted-foreground cursor-not-allowed"
          />
        </div>
        <div>
          <label className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2 block">Pays</label>
          <input
            {...form.register("country")}
            className="w-full bg-background border border-border rounded-2xl px-4 py-3 focus:border-primary outline-none"
          />
        </div>
        <div>
          <label className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2 block">Langue préférée</label>
          <select
            {...form.register("preferred_language")}
            className="w-full bg-background border border-border rounded-2xl px-4 py-3 focus:border-primary outline-none"
          >
            <option value="fr">Français</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSaving || !form.formState.isDirty}
        className="btn-primary w-full md:w-auto px-10 py-4 flex items-center justify-center gap-2 disabled:bg-muted"
      >
        {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
        Sauvegarder les modifications
      </button>
    </form>
  );
}