import { useEffect, useState } from "react";
import {
  Info,
  CloudSun,
  PersonStanding,
  Utensils,
  Image as ImageIcon,
  MessageSquare,
  ShoppingBag,
} from "lucide-react";
import type { Destination } from "@/lib/models/ui";
import { useNavigate } from "react-router-dom";

interface PlaceSubNavProps {
  destination: Destination;
  sessionId: string;
  showCatalog?: boolean;
}

export default function PlaceSubNav({
  destination,
  sessionId,
  showCatalog,
}: PlaceSubNavProps) {
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("aperçu");

  const navItems = [
    { id: "aperçu", label: "Aperçu", icon: Info },
    { id: "climat", label: "Climat", icon: CloudSun },
    { id: "activités", label: "Activités", icon: PersonStanding },
  ];

  if (destination.type === "restaurant") {
    navItems.push({ id: "gastronomie", label: "Gastronomie", icon: Utensils });
  }

  navItems.push(
    { id: "galerie", label: "Galerie", icon: ImageIcon },
    { id: "avis", label: "Avis", icon: MessageSquare },
  );

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;

          if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
          ) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full bg-background/80 backdrop-blur-xl border-b border-border shadow-sm">
      <div className="container mx-auto max-w-7xl px-4 overflow-x-auto no-scrollbar">
        <nav className="flex items-center justify-between gap-1 py-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all relative whitespace-nowrap ${
                activeSection === item.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <item.icon
                className={`h-4 w-4 ${activeSection === item.id ? "text-primary" : "text-muted-foreground"}`}
              />
              {item.label}
              {activeSection === item.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          ))}

          {showCatalog && (
            <div className="ml-auto pl-4 border-l border-border hidden md:block">
              <button
                onClick={() => scrollTo("gastronomie")}
                className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold hover:bg-primary/20 transition-colors"
              >
                <ShoppingBag className="h-3.5 w-3.5" />
                Catalogue Direct
              </button>
            </div>
          )}
          <div className="ml-auto pl-4 border-l border-border hidden md:block">
            <button
              onClick={() => {
                if (!sessionId || sessionId === "00000000-0000-0000-0000-000000000000") {
                  navigate("/vr-sessions");
                } else {
                  navigate(`/vr-sessions/${destination.slug}/${sessionId}/book`);
                }
              }}
              className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-primary/80 transition-colors"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              Réserver une session VR
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
