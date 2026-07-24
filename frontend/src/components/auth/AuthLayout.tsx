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
    <div className="min-h-screen w-full bg-background">
      <div className="grid min-h-screen lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative hidden bg-neutral-900 lg:flex">
          <img
            src={backgroundImageUrl}
            alt="Atlas Voyages Destination"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,59,149,0.55),rgba(0,0,0,0.78))]" />

          <div className="relative z-10 flex max-w-xl flex-col justify-end p-12 text-white">
            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-white/80 transition-opacity hover:opacity-80"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour au site
            </Link>

            <div className="mb-4 inline-flex rounded-lg bg-primary px-4 py-2 text-xs font-extrabold uppercase tracking-[0.24em] text-primary-foreground">
              Afriatlas Travel
            </div>

            <h2 className="text-4xl font-black leading-tight text-white drop-shadow-lg">
              Découvrez le monde avec élégance.
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/80">
              Rejoignez des milliers d’explorateurs et réservez des expériences exclusives en quelques clics.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center bg-[linear-gradient(180deg,rgba(0,59,149,0.03),transparent)] p-6 md:p-12">
          <Link
            to="/"
            className="absolute left-6 top-6 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground lg:hidden"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Link>

          <div className="w-full max-w-md rounded-[28px] border border-border bg-card p-6 shadow-sm md:p-8">
            <div className="mb-8 text-center lg:text-left">
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground">{heading}</h1>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{subheading}</p>
            </div>

            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
