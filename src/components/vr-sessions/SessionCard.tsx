import React from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { VRSessionListResponse } from "@/lib/types";

interface SessionCardProps {
  session: VRSessionListResponse;
}

export function SessionCard({ session }: SessionCardProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-card border border-border rounded-3xl shadow-sm hover:shadow-md transition-all group">
      <div className="h-48 md:h-full md:w-64 rounded-2xl bg-muted overflow-hidden relative shrink-0">
        <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
          <Calendar className="h-10 w-10 text-primary/40" />
        </div>
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="text-xl font-bold truncate group-hover:text-primary transition-colors">
              {session.title}
            </h3>
            <div className="flex items-center gap-2 mt-2 text-muted-foreground text-sm">
              <MapPin className="h-4 w-4" />
              <span>Session Virtuelle</span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <span className="text-2xl font-black text-primary flex items-center gap-1">
              {session.price} {session.currency}
            </span>
            <span className="text-xs text-muted-foreground">par personne</span>
          </div>
        </div>

        {session.description && (
          <p className="mt-4 text-sm text-muted-foreground line-clamp-2">
            {session.description}
          </p>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm font-medium">
          <div className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-xl">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{session.duration_minutes} min</span>
          </div>
          <div className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-xl">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>Max {session.max_participants} pers.</span>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border flex justify-end">
          <Button
            asChild
            className="rounded-xl px-8 w-full md:w-auto gap-2 group-hover:bg-primary/90"
          >
            <Link to={`/vr-sessions/${session.id}/book`}>
              Réserver cette session
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
