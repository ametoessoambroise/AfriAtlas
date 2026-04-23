import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
  heading: string;
  subheading: string;
  backgroundImageUrl?: string; // Optionnel pour varier l'image par page
}

export default function AuthLayout({
  children,
  heading,
  subheading,
  backgroundImageUrl = "https://images.unsplash.com/photo-1547471080-7fc2caa6f17f?auto=format&fit=crop&q=80",
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full flex bg-background">
      {/* Panneau Gauche (Image Immersive - Masqué sur mobile) */}
      <div className="hidden lg:flex w-1/2 relative bg-neutral-900">
        <img
          src={backgroundImageUrl}
          alt="Atlas Voyages Destination"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Branding Overlay */}
        <div className="absolute bottom-12 left-12 text-white max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-5 h-5 text-white/70" />
            <span className="text-sm font-bold tracking-wider uppercase text-white/70">Retour au site</span>
          </Link>
          <div className="flex items-center gap-2 mb-4">
             <div className="bg-primary px-3 py-1 text-sm font-extrabold uppercase tracking-widest rounded-sm text-primary-foreground">
               WorldAtlas Travel
             </div>
          </div>
          <h2 className="text-4xl font-black leading-tight text-white drop-shadow-lg">
            Découvrez le monde avec élégance.
          </h2>
          <p className="mt-4 text-white/80 font-medium">
            Rejoignez des milliers d'explorateurs et réservez des expériences exclusives en quelques clics.
          </p>
        </div>
      </div>

      {/* Panneau Droit (Formulaire) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 relative">
         {/* Bouton retour site pour mobile */}
         <Link 
            to="/" 
            className="absolute top-6 left-6 lg:hidden flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
         >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-xs font-bold uppercase">Retour</span>
         </Link>

         <div className="w-full max-w-md space-y-8">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl font-extrabold tracking-tight">{heading}</h1>
              <p className="mt-2 text-muted-foreground font-medium">{subheading}</p>
            </div>

            {children}
         </div>
      </div>
    </div>
  );
}
