// src/components/dashboard/QuickActions.tsx
import { Map, PlusSquare, HelpCircle, UserCircle } from "lucide-react";
import { Link } from "react-router-dom";

export function QuickActions() {
  const actions = [
    { icon: <Map />, label: "Explorer", to: "/explore", color: "bg-blue-500" },
    { icon: <PlusSquare />, label: "Nouvel Album", to: "/albums/new", color: "bg-green-500" },
    { icon: <UserCircle />, label: "Profil", to: "/profile", color: "bg-purple-500" },
    { icon: <HelpCircle />, label: "Aide", to: "/support", color: "bg-orange-500" },
  ];

  return (
    <div className="space-y-4">
       <h3 className="text-lg font-black">Actions Rapides</h3>
       <div className="grid grid-cols-2 gap-3">
          {actions.map((act, i) => (
            <Link key={i} to={act.to} className="flex flex-col items-center gap-2 p-4 bg-card border border-border rounded-3xl hover:border-primary transition-all group">
               <div className={`p-3 rounded-2xl text-white ${act.color} shadow-lg group-hover:scale-110 transition-transform`}>
                  {act.icon}
               </div>
               <span className="text-xs font-bold">{act.label}</span>
            </Link>
          ))}
       </div>
    </div>
  );
}
