import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Users, UserPlus, Crown, Shield, Clock, Loader2, AlertTriangle,
  Trash2, Mail, Plus, LogOut, ChevronRight, Home,
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
import { useAuth } from "@/hooks/useAuth";
import {
  useFamilyGroup,
  useCreateFamilyGroup,
  useInviteFamilyMember,
  useRemoveFamilyMember,
} from "@/hooks/queries/useSubscription";
import type { FamilyGroupMemberResponse } from "@/lib/types";

// ─── Avatar ──────────────────────────────────────────────────────────────────
function MemberAvatar({ member }: { member: FamilyGroupMemberResponse }) {
  if (member.avatar_url) {
    return (
      <img
        src={member.avatar_url}
        alt={member.fullname}
        className="w-10 h-10 rounded-full object-cover ring-2 ring-white/10"
      />
    );
  }
  const initials = member.fullname
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-sm font-bold ring-2 ring-white/10">
      {initials}
    </div>
  );
}

// ─── FamilyMemberList ─────────────────────────────────────────────────────────
function FamilyMemberList({
  members,
  ownerId,
  currentUserId,
}: {
  members: FamilyGroupMemberResponse[];
  ownerId: string;
  currentUserId: string;
}) {
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const { mutate: remove, isPending } = useRemoveFamilyMember();

  const roleInfo = (member: FamilyGroupMemberResponse) => {
    if (member.id === ownerId) return { label: "Propriétaire", icon: <Crown className="h-3 w-3 text-amber-400" />, color: "text-amber-300 bg-amber-500/10 border-amber-500/30" };
    return { label: "Membre", icon: <Shield className="h-3 w-3 text-indigo-400" />, color: "text-indigo-300 bg-indigo-500/10 border-indigo-500/30" };
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        {members.map((m) => {
          const role = roleInfo(m);
          const canRemove = currentUserId === ownerId && m.id !== ownerId;
          return (
            <div
              key={m.id}
              className="flex items-center gap-4 bg-white/5 hover:bg-white/8 border border-white/8 rounded-2xl p-4 transition-colors"
            >
              <MemberAvatar member={m} />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white truncate">{m.fullname}</p>
                <p className="text-xs text-white/40 truncate">{m.email}</p>
                {m.joined_at && (
                  <p className="text-xs text-white/30 flex items-center gap-1 mt-0.5">
                    <Clock className="h-3 w-3" />
                    Rejoint le {new Date(m.joined_at).toLocaleDateString("fr-FR")}
                  </p>
                )}
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border flex items-center gap-1.5 ${role.color}`}>
                {role.icon} {role.label}
              </span>
              {canRemove && (
                <button
                  onClick={() => setConfirmId(m.id)}
                  className="ml-2 w-8 h-8 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 flex items-center justify-center transition-colors"
                  title="Retirer du groupe"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Confirm remove dialog */}
      <Dialog open={!!confirmId} onOpenChange={() => setConfirmId(null)}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-sm">
          <DialogHeader>
            <DialogTitle>Retirer ce membre ?</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Ce membre n'aura plus accès aux avantages du groupe familial.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setConfirmId(null)} className="border-zinc-700 text-zinc-300">
              Annuler
            </Button>
            <Button
              variant="destructive"
              disabled={isPending}
              onClick={() => { if (confirmId) { remove(confirmId); setConfirmId(null); } }}
            >
              {isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              Retirer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

// ─── InviteMemberForm ─────────────────────────────────────────────────────────
function InviteMemberForm({ maxMembers, currentCount }: { maxMembers: number; currentCount: number }) {
  const [email, setEmail] = useState("");
  const { mutate, isPending } = useInviteFamilyMember();
  const isFull = currentCount >= maxMembers;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    mutate({ email: email.trim() }, { onSuccess: () => setEmail("") });
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-white flex items-center gap-2">
          <UserPlus className="h-5 w-5 text-indigo-400" />
          Inviter un membre
        </h3>
        <span className="text-xs text-white/40">
          {currentCount} / {maxMembers} membres
        </span>
      </div>
      {isFull ? (
        <p className="text-sm text-amber-300/80 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3">
          Groupe complet. Upgradez votre plan pour ajouter plus de membres.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-3">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 pointer-events-none" />
            <Input
              type="email"
              placeholder="adresse@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-indigo-500/50"
            />
          </div>
          <Button
            type="submit"
            disabled={isPending || !email.trim()}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-5"
          >
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            Inviter
          </Button>
        </form>
      )}
    </div>
  );
}

// ─── FamilyCreateForm ─────────────────────────────────────────────────────────
function FamilyCreateForm() {
  const [name, setName] = useState("");
  const { mutate, isPending } = useCreateFamilyGroup();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    mutate({ name: name.trim() });
  };

  return (
    <div className="max-w-md mx-auto text-center">
      <div className="w-20 h-20 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-6">
        <Users className="h-9 w-9 text-indigo-400" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">Créer votre groupe familial</h2>
      <p className="text-white/40 text-sm mb-8 leading-relaxed">
        Donnez un nom à votre groupe et commencez à inviter vos proches à partager l'aventure.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          type="text"
          placeholder="Nom du groupe (ex: Famille Dupont)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-indigo-500/50 text-center"
        />
        <Button
          type="submit"
          disabled={isPending || !name.trim()}
          className="bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white py-5 font-semibold"
        >
          {isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
          <Plus className="h-4 w-4 mr-2" />
          Créer le groupe
        </Button>
      </form>
    </div>
  );
}

// ─── FamilyPage ───────────────────────────────────────────────────────────────
const FamilyPage = () => {
  const { user } = useAuth();
  const { data: group, isLoading, isError, error } = useFamilyGroup();

  const currentUserId = (user as any)?.id ?? "";
  const userPlanType = (user as any)?.subscription_plan_type ?? (user as any)?.plan_type ?? "free";
  const hasFamilyPlan = userPlanType === "family";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 pt-28 pb-20 px-6">
        <div className="max-w-2xl mx-auto space-y-4">
          <Skeleton className="h-12 w-2/3 bg-white/5 rounded-xl" />
          <Skeleton className="h-48 w-full bg-white/5 rounded-2xl" />
          <Skeleton className="h-24 w-full bg-white/5 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-zinc-950 pt-28 pb-32 overflow-hidden">
      {/* Bg deco */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-indigo-800/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-violet-800/8 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-2xl mx-auto px-6">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-white/30 text-sm mb-10">
          <Link to="/subscription" className="hover:text-white/60 transition-colors flex items-center gap-1">
            <Home className="h-3.5 w-3.5" /> Abonnement
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-white/60">Groupe Famille</span>
        </div>

        {/* No family plan gating */}
        {!hasFamilyPlan ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-6">
              <Users className="h-9 w-9 text-indigo-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Plan Famille requis</h2>
            <p className="text-white/40 text-sm mb-8 max-w-sm mx-auto leading-relaxed">
              Le groupe familial est disponible uniquement avec le plan Famille. Upgradez pour inviter jusqu'à 5 membres.
            </p>
            <Link to="/subscription">
              <Button className="bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white px-8 py-5 font-semibold">
                Voir les plans <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        ) : /* API error other than 404 */ isError && (error as any)?.status !== 404 ? (
          <div className="text-center py-16 text-white/50 flex flex-col items-center gap-3">
            <AlertTriangle className="h-10 w-10 text-red-400" />
            <p>Erreur lors du chargement du groupe. Réessayez.</p>
          </div>
        ) : /* No group yet → create form */ !group ? (
          <FamilyCreateForm />
        ) : (
          /* Group exists */
          <>
            {/* Group header */}
            <div className="bg-gradient-to-br from-indigo-900/40 to-violet-950/60 border border-indigo-700/30 rounded-2xl p-6 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                  <Users className="h-6 w-6 text-indigo-400" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">{group.name}</h1>
                  <p className="text-sm text-white/40">
                    {group.member_count} membres · Créé le {new Date(group.created_at).toLocaleDateString("fr-FR")}
                  </p>
                </div>
              </div>
              <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/40 text-xs">
                {group.is_active ? "Actif" : "Inactif"}
              </Badge>
            </div>

            {/* Invite form */}
            <InviteMemberForm
              maxMembers={(group.subscription_plan as any)?.max_family_members ?? 5}
              currentCount={group.member_count}
            />

            {/* Members list */}
            <div className="mt-6">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Users className="h-4 w-4 text-white/40" />
                Membres du groupe
              </h3>
              <FamilyMemberList
                members={group.members}
                ownerId={(group.owner as any)?.id ?? ""}
                currentUserId={currentUserId}
              />
            </div>

            {/* Leave group */}
            <div className="mt-10 border-t border-white/5 pt-8 text-center">
              <button className="text-sm text-red-400/60 hover:text-red-400 underline underline-offset-2 transition-colors flex items-center gap-2 mx-auto">
                <LogOut className="h-4 w-4" />
                Quitter le groupe familial
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FamilyPage;
