import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export default function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParam = searchParams.get("search") || "";
  const [localValue, setLocalValue] = useState(searchParam);

  // Sync initial param from URL
  useEffect(() => {
    setLocalValue(searchParam);
  }, [searchParam]);

  // Debounce : n’écrit l’URL que si la recherche change vraiment (sinon on écrase page, tri, etc.)
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchParams((prev) => {
        const trimmed = localValue.trim();
        const current = (prev.get("search") || "").trim();
        if (trimmed === current) {
          return prev;
        }
        const next = new URLSearchParams(prev);
        if (trimmed) {
          next.set("search", trimmed);
        } else {
          next.delete("search");
        }
        next.set("page", "1");
        return next;
      });
    }, 300);

    return () => clearTimeout(handler);
  }, [localValue, setSearchParams]);

  return (
    <div className="relative w-full flex-1">
      <Search
        className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
        aria-hidden
      />
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder="Rechercher une destination, ville, hôtel..."
        className="w-full bg-transparent py-3 pl-12 pr-4 text-sm focus:outline-none text-foreground placeholder:text-muted-foreground/60"
        aria-label="Rechercher une destination"
      />
    </div>
  );
}
