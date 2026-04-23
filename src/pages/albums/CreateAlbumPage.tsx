import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, Camera } from "lucide-react";
import AlbumForm from "@/components/albums/AlbumForm";
import { useAlbumMutations } from "@/hooks/queries/useAlbums";
import { toast } from "sonner";

const CreateAlbumPage = () => {
  const navigate = useNavigate();
  const { createAlbum, uploadAlbumCover } = useAlbumMutations();

  const handleBack = () => navigate("/albums");

  const handleSubmit = async (values: any, coverFile?: File) => {
    try {
      // 1. Create the album
      const album = await createAlbum.mutateAsync(values);
      
      // 2. If there's a cover file, upload it
      if (coverFile) {
        try {
          await uploadAlbumCover.mutateAsync({ albumId: album.id, file: coverFile });
          toast.success("Album créé avec succès !");
        } catch (uploadError) {
          console.error("Cover upload failed:", uploadError);
          toast.error("Album créé, mais l'image de couverture n'a pas pu être envoyée.");
        }
      } else {
        toast.success("Album créé avec succès !");
      }

      // 3. Navigate to the new album (or list)
      // For now, let's go back to the list
      navigate("/albums");
    } catch (error) {
      console.error("Album creation failed:", error);
      toast.error("Erreur lors de la création de l'album.");
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="mb-10">
          <button 
            onClick={handleBack}
            className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 font-bold text-xs uppercase tracking-widest"
          >
            <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:border-primary/50 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </div>
            Retour aux Albums
          </button>
          
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Camera className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-black tracking-tight uppercase">Nouvelle Aventure</h1>
          </div>
          <p className="text-muted-foreground">Créez un espace dédié pour vos souvenirs les plus précieux au Togo.</p>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-neutral-900 rounded-[2.5rem] border border-border shadow-2xl p-8 md:p-12"
        >
          <AlbumForm 
            onSubmit={handleSubmit} 
            isLoading={createAlbum.isPending}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default CreateAlbumPage;
