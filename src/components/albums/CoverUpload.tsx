import { useState, useRef } from "react";
import { Camera, Loader2, X, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CoverUploadProps {
  currentImage?: string;
  onUpload: (file: File) => void;
  onClear?: () => void;
  className?: string;
}

const CoverUpload = ({
  currentImage,
  onUpload,
  onClear,
  className,
}: CoverUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Local Preview
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);

    onUpload(file);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    onClear?.();
  };

  const displayImage = preview || currentImage;

  return (
    <div
      className={cn(
        "relative w-full aspect-video rounded-3xl overflow-hidden bg-surface-alt border-2 border-dashed border-border flex flex-col items-center justify-center transition-all cursor-pointer hover:bg-primary/5 hover:border-primary/30",
        displayImage && "border-solid",
        className,
      )}
      onClick={() => fileInputRef.current?.click()}
    >
      {displayImage ? (
        <>
          <img
            src={displayImage}
            className="w-full h-full object-cover"
            alt="Cover preview"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all" />

          <button
            onClick={handleClear}
            className="absolute top-4 right-4 h-10 w-10 bg-black/60 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-black/80 hover:scale-110 transition-all z-20"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <div className="bg-white/90 text-black px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-xl">
              Changer l'image
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-4 text-muted-foreground">
          <div className="w-16 h-16 bg-surface rounded-2xl flex items-center justify-center shadow-inner">
            <ImageIcon className="w-8 h-8 opacity-50" />
          </div>
          <div className="text-center">
            <p className="text-sm font-bold">
              Cliquez pour ajouter une couverture
            </p>
            <p className="text-xs opacity-60 mt-1">
              PNG, JPG ou WEBP (Max. 5MB)
            </p>
          </div>
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
    </div>
  );
};

export default CoverUpload;
