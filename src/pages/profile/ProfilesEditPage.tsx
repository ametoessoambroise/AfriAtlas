// ---------------------------------------------------------------------------

// src/pages/profile/ProfileEditPage.tsx
import { useAuth } from "@/hooks/useAuth";
import { ProfileForm } from "@/components/profile/ProfileForms";
import { AvatarUpload } from "@/components/profile/AvatarUpload";
import { SecurityPanel, PreferencesPanel, PrivacyPanel } from "@/components/profile/SettingsSections";
import { Loader2, ArrowLeft, User, Shield, Sliders, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export function ProfileEditPage() {
    const { user, isLoading } = useAuth();
    const queryClient = useQueryClient();

    if (isLoading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
        );
    }

    const handleUpdateSuccess = (updatedUser: any) => {
        queryClient.setQueryData(['auth', 'me'], updatedUser);
    };

    return (
        <DashboardLayout>
            <div className="p-6 lg:p-8 space-y-6 animate-in fade-in duration-700">
                {/* ── PAGE HEADER ─────────────────────────────────────────────────── */}
                <div className="flex items-center justify-between mb-2">
                    <div>
                        <h1 className="text-2xl font-black text-foreground tracking-tight uppercase">
                            Mon <span className="text-primary">Espace</span> Atlas
                        </h1>
                        <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest mt-1 opacity-70">
                            Gérez vos informations, votre sécurité et vos préférences.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center text-primary shadow-sm">
                            <Settings className="w-5 h-5" />
                        </div>
                    </div>
                </div>

                <Tabs defaultValue="profile" className="w-full space-y-8 animate-in slide-in-from-bottom-4 duration-500 delay-100">
                    <div className="flex justify-start overflow-x-auto pb-2 scrollbar-hide">
                        <TabsList className="bg-surface-alt p-1.5 rounded-md border border-border h-auto">
                            <TabsTrigger
                                value="profile"
                                className="rounded-lg px-6 py-2.5 text-xs font-black uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all flex items-center gap-2"
                            >
                                <User className="w-4 h-4" />
                                Informations
                            </TabsTrigger>
                            <TabsTrigger
                                value="security"
                                className="rounded-lg px-6 py-2.5 text-xs font-black uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all flex items-center gap-2"
                            >
                                <Shield className="w-4 h-4" />
                                Sécurité
                            </TabsTrigger>
                            <TabsTrigger
                                value="preferences"
                                className="rounded-lg px-6 py-2.5 text-xs font-black uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all flex items-center gap-2"
                            >
                                <Sliders className="w-4 h-4" />
                                Préférences
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="profile" className="space-y-8 mt-0 focus-visible:ring-0">
                        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8">
                            <div className="bg-card border border-border p-10 rounded-md flex justify-center shadow-sm">
                                <AvatarUpload
                                    currentAvatar={user.avatar_url}
                                    onUploadSuccess={(url) => handleUpdateSuccess({ ...user, avatar_url: url })}
                                />
                            </div>

                            <div className="bg-card border border-border p-8 rounded-md shadow-sm">
                                <ProfileForm
                                    user={user}
                                    onSuccess={handleUpdateSuccess}
                                />
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="security" className="mt-0 focus-visible:ring-0">
                        <div className="bg-card border border-border p-8 rounded-md shadow-sm">
                            <SecurityPanel />
                        </div>
                    </TabsContent>

                    <TabsContent value="preferences" className="space-y-8 mt-0 focus-visible:ring-0">
                        <div className="bg-card border border-border p-8 rounded-md shadow-sm space-y-8">
                            <PreferencesPanel />
                            <PrivacyPanel />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    );
}

export default ProfileEditPage;
