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
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

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
    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-black ring-2 ring-white/10">
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
    if (member.id === ownerId) return { label: "Propriétaire", icon: <Crown className="h-3 w-3 text-amber-500" />, color: "text-amber-500 bg-amber-500/10 border-amber-500/20" };
    return { label: "Membre", icon: <Shield className="h-3 w-3 text-primary" />, color: "text-primary bg-primary/10 border-primary/20" };
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
              className="flex items-center gap-4 bg-card hover:bg-muted/10 border border-border rounded-md p-4 transition-all duration-300"
            >
              <MemberAvatar member={m} />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-foreground truncate uppercase tracking-tight">{m.fullname}</p>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest truncate">{m.email}</p>
                {m.joined_at && (
                  <p className="text-[10px] text-muted-foreground/60 flex items-center gap-1 mt-1 font-bold uppercase tracking-widest">
                    <Clock className="h-3 w-3" />
                    Rejoint le {new Date(m.joined_at).toLocaleDateString("fr-FR")}
                  </p>
                )}
              </div>
              <span className={`text-[10px] font-black px-3 py-1 rounded-lg border flex items-center gap-1.5 uppercase tracking-widest ${role.color}`}>
                {role.icon} {role.label}
              </span>
              {canRemove && (
                <button
                  onClick={() => setConfirmId(m.id)}
                  className="ml-2 w-9 h-9 rounded-md bg-destructive/5 hover:bg-destructive hover:text-white border border-destructive/10 text-destructive flex items-center justify-center transition-all"
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
        <DialogContent className="rounded-md border-border bg-card shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-black uppercase tracking-tight">Retirer ce membre ?</DialogTitle>
            <DialogDescription className="font-medium text-muted-foreground">
              Ce membre n'aura plus accès aux avantages du groupe familial.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-3 mt-4">
            <Button variant="outline" onClick={() => setConfirmId(null)} className="rounded-md h-12 font-black uppercase tracking-widest text-xs">
              Annuler
            </Button>
            <Button
              variant="destructive"
              disabled={isPending}
              onClick={() => { if (confirmId) { remove(confirmId); setConfirmId(null); } }}
              className="rounded-md h-12 font-black uppercase tracking-widest text-xs"
            >
              {isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              Retirer le membre
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
    <div className="bg-card border border-border rounded-md p-8 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-black uppercase tracking-widest text-foreground flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <UserPlus className="h-4 w-4" />
          </div>
          Inviter un membre
        </h3>
        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground bg-muted/30 px-3 py-1 rounded-full">
          {currentCount} / {maxMembers} membres
        </span>
      </div>
      {isFull ? (
        <p className="text-[11px] font-bold text-amber-600 bg-amber-500/5 border border-amber-500/10 rounded-md px-5 py-4 uppercase tracking-widest">
          Groupe complet. Upgradez votre plan pour ajouter plus de membres.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              type="email"
              placeholder="adresse@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-12 h-12 rounded-md bg-muted/10 border-border focus:ring-primary/20 font-bold text-sm"
            />
          </div>
          <Button
            type="submit"
            disabled={isPending || !email.trim()}
            className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-8 rounded-md font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/20 transition-all"
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
    <div className="max-w-md mx-auto text-center py-12">
      <div className="w-20 h-20 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-8 shadow-sm">
        <Users className="h-10 w-10 text-primary" />
      </div>
      <h2 className="text-3xl font-black text-foreground tracking-tight uppercase mb-3">Groupe <span className="text-primary">Familial</span></h2>
      <p className="text-muted-foreground font-medium mb-10 leading-relaxed">
        Donnez un nom à votre groupe et commencez à inviter vos proches à partager l'aventure.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          type="text"
          placeholder="Nom du groupe (ex: Famille Dupont)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="h-14 rounded-md bg-card border-border text-center font-bold text-lg focus:ring-primary/20 shadow-sm"
        />
        <Button
          type="submit"
          disabled={isPending || !name.trim()}
          className="bg-primary hover:bg-primary/90 text-primary-foreground h-14 rounded-md font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20 transition-all"
        >
          {isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
          <Plus className="h-5 w-5 mr-2" />
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
      <DashboardLayout>
        <div className="p-6 lg:p-8 space-y-6">
          <Skeleton className="h-10 w-48 rounded-md" />
          <Skeleton className="h-48 w-full rounded-md" />
          <Skeleton className="h-64 w-full rounded-md" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6 animate-in fade-in duration-700">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-2">
          <div className="flex items-center gap-2 text-muted-foreground text-[10px] font-black uppercase tracking-widest">
            <Link to="/pricing" className="hover:text-primary transition-colors flex items-center gap-1">
               Abonnement
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">Groupe Famille</span>
          </div>

          <h1 className="text-2xl font-black text-foreground tracking-tight uppercase">
            Groupe <span className="text-primary">Famille</span>
          </h1>
        </div>

        <div className="animate-in slide-in-from-bottom-4 duration-500 delay-100 max-w-4xl">
            {/* No family plan gating */}
            {!hasFamilyPlan ? (
              <div className="text-center py-20 bg-card border border-border rounded-md shadow-sm px-6">
                <div className="w-20 h-20 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-8 shadow-sm">
                  <Users className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tight mb-4">Plan Famille requis</h2>
                <p className="text-muted-foreground font-medium mb-10 max-w-sm mx-auto leading-relaxed">
                  Le groupe familial est disponible uniquement avec le plan Famille. Upgradez pour inviter jusqu'à 5 membres.
                </p>
                <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground h-14 rounded-md font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20 transition-all px-10">
                  <Link to="/pricing">
                    Voir les plans <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            ) : isError && (error as any)?.status !== 404 ? (
              <div className="text-center py-20 bg-destructive/5 border border-destructive/10 rounded-md flex flex-col items-center gap-4">
                <AlertTriangle className="h-12 w-12 text-destructive" />
                <p className="font-black uppercase tracking-widest text-xs text-destructive">Erreur lors du chargement du groupe. Réessayez.</p>
              </div>
            ) : !group ? (
              <FamilyCreateForm />
            ) : (
              /* Group exists */
              <div className="space-y-6">
                {/* Group header card */}
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-md p-8 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-md bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/20">
                      <Users className="h-7 w-7" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-black uppercase tracking-tight text-foreground">{group.name}</h1>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-1 opacity-70">
                        {group.member_count} membres · Créé le {new Date(group.created_at).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-primary text-primary-foreground border-none rounded-lg px-3 py-1.5 text-[10px] font-black uppercase tracking-widest">
                    {group.is_active ? "Actif" : "Inactif"}
                  </Badge>
                </div>

                {/* Invite form */}
                <InviteMemberForm
                  maxMembers={(group.subscription_plan as any)?.max_family_members ?? 5}
                  currentCount={group.member_count}
                />

                {/* Members list */}
                <div className="bg-card border border-border rounded-md p-8 shadow-sm">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-6 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Membres du groupe
                  </h3>
                  <FamilyMemberList
                    members={group.members}
                    ownerId={(group.owner as any)?.id ?? ""}
                    currentUserId={currentUserId}
                  />
                </div>

                {/* Leave group */}
                <div className="pt-6 text-center">
                  <button className="text-[10px] font-black uppercase tracking-widest text-destructive/60 hover:text-destructive underline underline-offset-4 transition-all flex items-center gap-2 mx-auto">
                    <LogOut className="h-3.5 w-3.5" />
                    Quitter le groupe familial
                  </button>
                </div>
              </div>
            )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FamilyPage;
