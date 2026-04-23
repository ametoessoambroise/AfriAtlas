import { Heart } from 'lucide-react';
import FavoritesGrid from '@/components/favorites/FavoritesGrid';

const FavoritesPage = () => {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container-custom">
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Heart className="h-5 w-5 text-primary fill-primary" />
            </div>
            <h1 className="text-4xl font-black text-foreground">Mes Favoris</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Retrouvez ici toutes vos destinations coups de cœur au Togo.
          </p>
        </header>

        <FavoritesGrid />
      </div>
    </div>
  );
};

export default FavoritesPage;
