import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, Camera } from "lucide-react";
import AlbumForm from "@/components/albums/AlbumForm";
import { useAlbumMutations } from "@/hooks/queries/useAlbums";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils/errorHandler";
import type { AlbumCreate } from "@/lib/types/album";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

const CreateAlbumPage = () => {
  const navigate = useNavigate();
  const { createAlbum, uploadAlbumCover } = useAlbumMutations();

  const handleBack = () => navigate("/albums");

  const handleSubmit = async (values: AlbumCreate, coverFile?: File) => {
    try {
      // 1. Create the album
      const album = await createAlbum.mutateAsync(values);

      // 2. If there's a cover file, upload it
      if (coverFile) {
        try {
          await uploadAlbumCover.mutateAsync({
            albumId: album.id,
            file: coverFile,
          });
          toast.success("Album créé avec succès !");
        } catch (uploadError) {
          console.error("Cover upload failed:", uploadError);
          toast.error(
            "Album créé, mais l'image de couverture n'a pas pu être envoyée.",
          );
        }
      } else {
        toast.success("Album créé avec succès !");
      }

      // 3. Navigate to the new album
      navigate(`/albums/${album.id}`);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6 animate-in fade-in duration-700">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-2">
          <button
            onClick={handleBack}
            className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-bold text-xs uppercase tracking-widest w-fit"
          >
            <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:border-primary/50 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </div>
            Retour aux albums
          </button>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center shadow-sm">
              <Camera className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-foreground tracking-tight uppercase">
                Nouvelle <span className="text-primary">Aventure</span>
              </h1>
              <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest mt-1 opacity-70">
                Créez un espace dédié pour vos souvenirs les plus précieux au Togo.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-md border border-border shadow-sm p-8 md:p-12 animate-in slide-in-from-bottom-4 duration-500 delay-100"
        >
          <AlbumForm
            onSubmit={handleSubmit}
            isLoading={createAlbum.isPending}
          />
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default CreateAlbumPage;
