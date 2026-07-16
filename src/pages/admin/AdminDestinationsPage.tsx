import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle2, 
  XCircle, 
  Star, 
  Trash2, 
  Edit, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle
} from "lucide-react";
import { usePlaces } from "@/hooks/queries/usePlaces";
import { useAdminUpdatePlace } from "@/hooks/queries/useAdmin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AdminDestinationsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data, isLoading, error } = usePlaces({ 
    page, 
    page_size: 15,
  });

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center min-h-[500px] gap-4">
      <Loader2 className="h-10 w-10 animate-spin text-amber-500" />
      <p className="text-white/40 animate-pulse text-sm">Chargement du catalogue Atlas...</p>
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-[500px] gap-4">
      <AlertCircle className="h-12 w-12 text-red-500" />
      <p className="text-white font-bold">Instabilité du Catalogue</p>
      <p className="text-white/40 text-xs">Impossible de charger les actifs touristiques pour le moment.</p>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tighter uppercase italic">Destinations & POIs</h1>
          <p className="text-white/40 mt-1.5 flex items-center gap-2 text-sm font-medium">
            <Filter className="h-4 w-4 text-amber-500" />
            Supervision stratégique des points d'intérêt Atlas
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <BulkActions />
          <Button className="bg-white text-black hover:bg-white/90 font-bold rounded-md px-6">
            Nouvelle Destination
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 bg-white/5 p-4 rounded-md border border-white/5 backdrop-blur-md">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
          <Input 
            placeholder="Recherche dynamique (nom, ville)..." 
            className="bg-black/20 border-white/5 pl-12 h-12 text-white text-sm focus-visible:ring-amber-500/20 rounded-md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
            <Button variant="outline" className="border-white/5 bg-white/5 text-white/60 hover:text-white h-12 px-6 rounded-md">
                Toutes catégories
            </Button>
        </div>
      </div>

      <div className="bg-zinc-900/40 border border-white/5 rounded-md overflow-hidden backdrop-blur-xl shadow-2xl">
        <Table>
          <TableHeader className="bg-white/[0.02] border-b border-white/5">
            <TableRow className="hover:bg-transparent h-16">
              <TableHead className="w-[60px] pl-6"><Checkbox className="border-white/20 data-[state=checked]:bg-amber-500" /></TableHead>
              <TableHead className="text-white/40 font-bold uppercase tracking-widest text-[9px]">Établissement</TableHead>
              <TableHead className="text-white/40 font-bold uppercase tracking-widest text-[9px]">Identité</TableHead>
              <TableHead className="text-white/40 font-bold uppercase tracking-widest text-[9px]">Gérant / Owner</TableHead>
              <TableHead className="text-white/40 font-bold uppercase tracking-widest text-[9px]">Vérifiée</TableHead>
              <TableHead className="text-white/40 font-bold uppercase tracking-widest text-[9px]">En Avant</TableHead>
              <TableHead className="text-white/40 font-bold uppercase tracking-widest text-[9px]">Statut</TableHead>
              <TableHead className="text-right pr-6 text-white/40 font-bold uppercase tracking-widest text-[9px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.items.map((item) => (
              <TableRow key={item.id} className="border-white/5 hover:bg-white/[0.02] transition-colors group h-20">
                <TableCell className="pl-6"><Checkbox className="border-white/20 data-[state=checked]:bg-amber-500" /></TableCell>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-md bg-white/5 border border-white/5 flex-shrink-0 overflow-hidden">
                      {item.primary_image ? (
                        <img src={item.primary_image.url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/10 italic text-[9px]">Image N/A</div>
                      )}
                    </div>
                    <div>
                      <p className="font-black text-white text-sm tracking-tight">{item.name}</p>
                      <p className="text-[10px] text-white/30 font-mono italic">{item.slug}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-blue-500/5 text-blue-400 border-blue-500/10 text-[9px] font-black uppercase px-2 py-0.5">
                    {item.category}
                  </Badge>
                  <p className="text-[10px] text-white/30 mt-1 font-medium">{item.city || "Lieu inconnu"}</p>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 border border-white/10" />
                    <p className="text-xs text-white/60 font-medium truncate max-w-[120px]">
                      {item.id.startsWith('vr') ? 'Atlas Official' : 'Partenaire'}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <VerifiedToggle currentStatus={item.status} slug={item.slug} />
                </TableCell>
                <TableCell>
                  <FeaturedToggle isFeatured={item.is_featured} slug={item.slug} />
                </TableCell>
                <TableCell>
                   <Badge className={
                     item.status === 'published' 
                     ? "bg-emerald-500/10 text-emerald-400 border-none px-3 font-bold" 
                     : "bg-amber-500/10 text-amber-400 border-none px-3 font-bold"
                   }>
                     {item.status === 'published' ? 'ACTIF' : 'BROUILLON'}
                   </Badge>
                </TableCell>
                <TableCell className="text-right pr-6">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-10 w-10 rounded-md p-0 text-white/40 hover:text-white hover:bg-white/5">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-zinc-900 border-white/10 text-white p-2 rounded-md w-44 shadow-2xl">
                      <DropdownMenuItem className="flex items-center gap-3 cursor-pointer py-2.5 rounded-md hover:bg-white/5">
                        <Edit className="h-4 w-4 text-blue-400" /> <span className="font-bold text-xs uppercase tracking-tighter">Édition</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-3 cursor-pointer py-2.5 rounded-md hover:bg-white/5">
                        <ExternalLink className="h-4 w-4 text-emerald-400" /> <span className="font-bold text-xs uppercase tracking-tighter">Aperçu</span>
                      </DropdownMenuItem>
                      <div className="h-px bg-white/5 my-1" />
                      <DropdownMenuItem className="flex items-center gap-3 cursor-pointer py-2.5 text-red-400 rounded-md hover:bg-red-400/10 hover:text-red-400">
                        <Trash2 className="h-4 w-4" /> <span className="font-bold text-xs uppercase tracking-tighter">Supprimer</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="p-8 bg-white/[0.01] border-t border-white/5 flex items-center justify-between">
          <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">
            Atlas Catalog Data <span className="mx-2 text-white/5">/</span> {data?.total || 0} Entrées
          </p>
          <div className="flex items-center gap-3">
            <Button 
                variant="outline" size="icon" 
                className="border-white/5 bg-white/5 text-white disabled:opacity-20 rounded-md h-10 w-10"
                onClick={() => setPage(prev => Math.max(1, prev - 1))}
                disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="bg-amber-500 h-10 min-w-[40px] px-4 flex items-center justify-center rounded-md text-zinc-950 font-black text-xs">
              {page}
            </div>
            <Button 
                variant="outline" size="icon" 
                className="border-white/5 bg-white/5 text-white disabled:opacity-20 rounded-md h-10 w-10"
                onClick={() => setPage(prev => prev + 1)}
                disabled={data && page >= data.total_pages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeaturedToggle({ isFeatured, slug }: { isFeatured: boolean; slug: string }) {
  const { mutate, isPending } = useAdminUpdatePlace();
  
  return (
    <button 
      disabled={isPending}
      onClick={() => mutate({ slug, body: { is_featured: !isFeatured } as any })}
      className={`p-2 rounded-md transition-all ${isFeatured ? 'bg-amber-500/20 text-amber-500' : 'bg-white/5 text-white/20 hover:text-white/40'} disabled:opacity-50`}
    >
      <Star className={`h-4 w-4 ${isFeatured ? 'fill-amber-500' : ''}`} />
    </button>
  );
}

function VerifiedToggle({ currentStatus, slug }: { currentStatus: string; slug: string }) {
  const { mutate, isPending } = useAdminUpdatePlace();
  const isVerified = currentStatus === 'published';

  return (
    <button 
      disabled={isPending}
      onClick={() => mutate({ slug, body: { status: isVerified ? 'draft' : 'published' } as any })}
      className={`p-2 rounded-md transition-all ${isVerified ? 'bg-emerald-500/20 text-emerald-500' : 'bg-white/5 text-white/20 hover:text-white/40'} disabled:opacity-50`}
    >
      {isVerified ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
    </button>
  );
}

function BulkActions() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-white/5 bg-white/5 text-white/60 hover:text-white rounded-md gap-3 h-11 px-5 border border-white/5">
                    <span className="text-xs font-bold uppercase tracking-tighter">Actions Groupées</span>
                    <ChevronRight className="h-3.5 w-3.5 rotate-90 text-white/20" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-zinc-900 border-white/10 text-white w-56 p-2 rounded-md shadow-2xl">
                <DropdownMenuItem className="gap-3 cursor-pointer py-3 rounded-md focus:bg-white/5 font-bold text-xs uppercase tracking-tighter">
                   <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Vérifier la sélection
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-3 cursor-pointer py-3 rounded-md focus:bg-white/5 font-bold text-xs uppercase tracking-tighter">
                   <Star className="h-4 w-4 text-amber-400" /> Mettre en avant
                </DropdownMenuItem>
                <div className="h-px bg-white/5 my-1" />
                <DropdownMenuItem className="gap-3 cursor-pointer py-3 text-red-500 focus:bg-red-500/10 focus:text-red-500 rounded-md font-bold text-xs uppercase tracking-tighter">
                   <Trash2 className="h-4 w-4" /> Supprimer définitivement
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
