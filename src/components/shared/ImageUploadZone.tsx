import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, FileImage, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ImageUploadZoneProps {
  onFilesSelected: (files: File[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
  className?: string;
  isPending?: boolean;
}

interface FilePreview extends File {
  preview: string;
}

export function ImageUploadZone({
  onFilesSelected,
  maxFiles = 5,
  maxSizeMB = 5,
  className,
  isPending = false,
}: ImageUploadZoneProps) {
  const [previews, setPreviews] = useState<FilePreview[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newPreviews = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setPreviews((prev) => {
        const total = [...prev, ...newPreviews].slice(0, maxFiles);
        onFilesSelected(total);
        return total;
      });
    },
    [maxFiles, onFilesSelected]
  );

  const removeFile = (index: number) => {
    setPreviews((prev) => {
      const filtered = prev.filter((_, i) => i !== index);
      // Clean up URL to avoid memory leaks
      URL.revokeObjectURL(prev[index].preview);
      onFilesSelected(filtered);
      return filtered;
    });
  };

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxSize: maxSizeMB * 1024 * 1024,
    maxFiles,
    disabled: isPending,
  });

  return (
    <div className={cn("space-y-4", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "relative border-2 border-dashed rounded-2xl p-8 transition-all cursor-pointer flex flex-col items-center justify-center text-center outline-none",
          isDragActive
            ? "border-primary bg-primary/5 scale-[0.99]"
            : "border-white/10 bg-white/[0.02] hover:bg-white/5 hover:border-white/20",
          isPending && "opacity-50 cursor-not-allowed"
        )}
      >
        <input {...getInputProps()} />
        
        <div className="p-4 rounded-full bg-zinc-900 border border-white/5 mb-4 group-hover:scale-110 transition-transform">
          {isPending ? (
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          ) : (
            <Upload className={cn("h-8 w-8 text-white/40", isDragActive && "text-primary")} />
          )}
        </div>

        <div className="space-y-1">
          <p className="text-sm font-bold text-white">
            {isDragActive ? "Déposez vos images ici" : "Cliquez ou glissez vos images"}
          </p>
          <p className="text-xs text-white/30">
            JPG, PNG, WebP (Max {maxSizeMB}MB · {maxFiles} images)
          </p>
        </div>

        {fileRejections.length > 0 && (
          <div className="mt-4 flex items-center gap-2 text-xs text-red-400 bg-red-400/10 p-2 rounded-lg">
            <AlertCircle className="h-3 w-3" />
            <span>Certains fichiers dépassent la taille autorisée ou le type est incorrect.</span>
          </div>
        )}
      </div>

      {previews.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {previews.map((file, idx) => (
            <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-white/10 group">
              <img
                src={file.preview}
                alt={`Preview ${idx}`}
                className="w-full h-full object-cover"
                onLoad={() => {
                  URL.revokeObjectURL(file.preview);
                }}
              />
              <button
                type="button"
                onClick={() => removeFile(idx)}
                className="absolute top-1 right-1 h-6 w-6 bg-red-500 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
