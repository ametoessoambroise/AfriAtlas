import { Heart, Plus } from 'lucide-react';
import FavoritesGrid from '@/components/favorites/FavoritesGrid';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { useNavigate } from 'react-router-dom';

const FavoritesPage = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6 animate-in fade-in duration-700">
        {/* ── PAGE HEADER ─────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-black text-foreground tracking-tight uppercase">
              Mes <span className="text-primary">Favoris</span>
            </h1>
            <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest mt-1 opacity-70">
              Retrouvez ici toutes vos destinations coups de cœur au Togo.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate("/destinations")}
              className="flex items-center hover:bg-primary/90 transition-all gap-2 px-4 py-2.5 rounded-md border border-border bg-primary text-primary-foreground text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/10"
            >
              <Plus className="w-4 h-4" /> Explorer
            </button>
          </div>
        </div>

        <div className="animate-in slide-in-from-bottom-4 duration-500 delay-100">
          <FavoritesGrid />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FavoritesPage;
