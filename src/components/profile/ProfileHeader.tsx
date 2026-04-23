// src/components/profile/ProfileHeader.tsx
import { UserResponse } from "@/lib/types/user";
import { Badge } from "@/components/ui/badge";
import { Edit3, Calendar, Mail, Shield } from "lucide-react";
import { Link } from "react-router-dom";

export function ProfileHeader({ user }: { user: UserResponse }) {
  return (
    <div className="bg-card border border-border p-8 rounded-[40px] shadow-sm flex flex-col items-center text-center">
      <div className="relative group mb-6">
        <div className="w-32 h-32 rounded-full border-4 border-background shadow-2xl overflow-hidden bg-surface-alt">
          {user.avatar_url ? (
            <img src={user.avatar_url} alt={user.fullname} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl font-black text-primary/20 bg-primary/5">
              {user.fullname.charAt(0)}
            </div>
          )}
        </div>
        <Link 
          to="/profile/edit" 
          className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          <Edit3 className="w-4 h-4" />
        </Link>
      </div>

      <h1 className="text-3xl font-black mb-2">{user.fullname}</h1>
      
      <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
           <Mail className="w-4 h-4" />
           {user.email}
        </div>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
           <Calendar className="w-4 h-4" />
           Inscrit le {new Date(user.created_at).toLocaleDateString()}
        </div>
      </div>

      <div className="flex gap-2">
        <Badge className="rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-widest">
           {user.role}
        </Badge>
        <Badge variant="outline" className="rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-widest border-primary text-primary">
           <Shield className="w-3 h-3 mr-1" />
           {user.subscription_status}
        </Badge>
      </div>
    </div>
  );
}

