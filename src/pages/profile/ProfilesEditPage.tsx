// ---------------------------------------------------------------------------

// src/pages/profile/ProfileEditPage.tsx
import { useAuth } from "@/hooks/useAuth";
import { ProfileForm } from "@/components/profile/ProfileForms";
import { AvatarUpload } from "@/components/profile/AvatarUpload";
import { SecurityPanel, PreferencesPanel, PrivacyPanel } from "@/components/profile/SettingsSections";
import { Loader2, ArrowLeft, User, Shield, Sliders } from "lucide-react";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
        <div className="min-h-screen bg-background pb-24 pt-6">
            <div className="container mx-auto px-4 max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-4">
                    <Link to="/profile" className="p-2 hover:bg-surface-alt rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h2 className="text-2xl font-black">Mon Espace Atlas</h2>
                </div>

                <Tabs defaultValue="profile" className="w-full space-y-8">
                    <div className="flex justify-start overflow-x-auto pb-2 scrollbar-hide">
                        <TabsList className="bg-surface-alt p-1.5 rounded-2xl border border-border h-auto">
                            <TabsTrigger
                                value="profile"
                                className="rounded-xl px-6 py-2.5 text-xs font-black uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all flex items-center gap-2"
                            >
                                <User className="w-4 h-4" />
                                Informations
                            </TabsTrigger>
                            <TabsTrigger
                                value="security"
                                className="rounded-xl px-6 py-2.5 text-xs font-black uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all flex items-center gap-2"
                            >
                                <Shield className="w-4 h-4" />
                                Sécurité
                            </TabsTrigger>
                            <TabsTrigger
                                value="preferences"
                                className="rounded-xl px-6 py-2.5 text-xs font-black uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all flex items-center gap-2"
                            >
                                <Sliders className="w-4 h-4" />
                                Préférences
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="profile" className="space-y-8 mt-0 focus-visible:ring-0">
                        <div className="grid grid-cols-1 gap-8">
                            <div className="bg-card border border-border p-10 rounded-[40px] flex justify-center shadow-sm">
                                <AvatarUpload
                                    currentAvatar={user.avatar_url}
                                    onUploadSuccess={(url) => handleUpdateSuccess({ ...user, avatar_url: url })}
                                />
                            </div>

                            <ProfileForm
                                user={user}
                                onSuccess={handleUpdateSuccess}
                            />
                        </div>
                    </TabsContent>

                    <TabsContent value="security" className="mt-0 focus-visible:ring-0">
                        <SecurityPanel />
                    </TabsContent>

                    <TabsContent value="preferences" className="space-y-8 mt-0 focus-visible:ring-0">
                        <PreferencesPanel />
                        <PrivacyPanel />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

export default ProfileEditPage;