// ---------------------------------------------------------------------------

// src/components/profile/AvatarUpload.tsx
import { useState, useRef } from "react";
import { Camera, Loader2, Trash2 } from "lucide-react";
import { usersApi } from "@/lib/api";
import { toast } from "sonner";

export function AvatarUpload({ currentAvatar, onUploadSuccess }: { currentAvatar?: string | null, onUploadSuccess: (url: string) => void }) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);

    setIsUploading(true);
    try {
      const updatedUser = await usersApi.uploadAvatarFile(file);
      onUploadSuccess(updatedUser.avatar_url!);
      toast.success("Avatar mis à jour !");
      setPreview(null);
    } catch (err) {
      toast.error("Échec de l'upload.");
      setPreview(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteAvatar = async () => {
    try {
      await usersApi.deleteAvatar();
      onUploadSuccess("");
      toast.success("Avatar supprimé");
    } catch (err) {
      toast.error("Erreur de suppression");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative group">
        <div className="w-32 h-32 rounded-full border-2 border-border overflow-hidden bg-surface-alt flex items-center justify-center">
          {preview || currentAvatar ? (
             <img src={preview || currentAvatar!} className="w-full h-full object-cover" />
          ) : (
             <Camera className="w-10 h-10 text-muted-foreground" />
          )}
          {isUploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full">
              <Loader2 className="w-8 h-8 animate-spin text-white" />
            </div>
          )}
        </div>
        
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          <Camera className="w-4 h-4" />
        </button>
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept="image/*" 
      />

      {currentAvatar && !isUploading && (
        <button 
          onClick={handleDeleteAvatar}
          className="text-red-500 text-xs font-bold flex items-center gap-1 hover:underline"
        >
          <Trash2 className="w-3 h-3" />
          Supprimer
        </button>
      )}
    </div>
  );
}
