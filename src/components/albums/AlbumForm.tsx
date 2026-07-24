import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Loader2, Save, ImageIcon, Globe, Lock } from "lucide-react";
import CoverUpload from "./CoverUpload";
import { useState } from "react";
import type { AlbumCreate, AlbumUpdate } from "@/lib/types/album";

const albumSchema = z.object({
  title: z.string().min(3, "Le titre doit faire au moins 3 caractères"),
  description: z
    .string()
    .max(500, "La description ne doit pas dépasser 500 caractères")
    .optional()
    .nullable(),
  is_public: z.boolean().optional(),
});

type AlbumFormValues = z.infer<typeof albumSchema>;

interface AlbumFormProps {
  initialValues?: AlbumUpdate;
  coverImageUrl?: string;
  onSubmit: (data: AlbumCreate | AlbumUpdate, coverFile?: File) => void;
  isLoading?: boolean;
}

const AlbumForm = ({
  initialValues,
  coverImageUrl,
  onSubmit,
  isLoading,
}: AlbumFormProps) => {
  const [coverFile, setCoverFile] = useState<File | undefined>();

  const form = useForm<AlbumFormValues>({
    resolver: zodResolver(albumSchema),
    defaultValues: {
      title: initialValues?.title || "",
      description: initialValues?.description || null,
      is_public: initialValues?.is_public ?? false,
    },
  });

  const handleSubmit = (values: AlbumFormValues) => {
    const cleanedData: AlbumCreate | AlbumUpdate = {
      title: values.title,
      description: values.description || null,
      is_public: values.is_public ?? false,
    };
    onSubmit(cleanedData, coverFile);
  };

  const isPublic = form.watch("is_public");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-0">
        {/* ── Section 1 : Informations de l'album ── */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 py-8">
          <div>
            <h2 className="font-semibold text-foreground">
              Informations de l'album
            </h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Donnez un nom et une description à votre album pour retrouver vos
              souvenirs facilement.
            </p>
          </div>

          <div className="sm:max-w-3xl md:col-span-2 space-y-5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">
                    Titre de l'album
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Mon voyage à Kpalimé..."
                      className="mt-2 h-10"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">
                    Description{" "}
                    <span className="text-muted-foreground font-normal">
                      (optionnelle)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Racontez brièvement l'histoire de cet album..."
                      className="mt-2 resize-none"
                      rows={4}
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Maximum 500 caractères. Cette description ne sera visible
                    que par vous.
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator />

        {/* ── Section 2 : Image de couverture ── */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 py-8">
          <div>
            <h2 className="font-semibold text-foreground">
              Image de couverture
            </h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Cette image sera utilisée comme aperçu de votre album dans la
              galerie.
            </p>
          </div>

          <div className="sm:max-w-3xl md:col-span-2 space-y-3">
            <FormLabel className="text-sm font-medium text-foreground flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-muted-foreground" />
              Couverture
            </FormLabel>
            <CoverUpload
              currentImage={coverImageUrl}
              onUpload={setCoverFile}
              onClear={() => setCoverFile(undefined)}
            />
            <p className="text-xs text-muted-foreground px-0.5 italic">
              Formats acceptés : JPG, PNG, WEBP — 5 Mo maximum.
            </p>
          </div>
        </div>

        <Separator />

        {/* ── Section 3 : Visibilité ── */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 py-8">
          <div>
            <h2 className="font-semibold text-foreground">Visibilité</h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Choisissez si d'autres voyageurs peuvent découvrir et consulter
              cet album.
            </p>
          </div>

          <div className="sm:max-w-3xl md:col-span-2">
            <FormField
              control={form.control}
              name="is_public"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border bg-muted/40 px-5 py-4 gap-4">
                  <div className="space-y-0.5 flex-1">
                    <FormLabel className="text-sm font-medium text-foreground flex items-center gap-2">
                      {isPublic ? (
                        <Globe className="w-4 h-4 text-primary" />
                      ) : (
                        <Lock className="w-4 h-4 text-muted-foreground" />
                      )}
                      {isPublic ? "Album public" : "Album privé"}
                    </FormLabel>
                    <FormDescription className="text-xs text-muted-foreground">
                      {isPublic
                        ? "D'autres voyageurs peuvent découvrir vos aventures."
                        : "Seul vous pouvez voir cet album."}
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator />

        {/* ── Actions ── */}
        <div className="flex items-center justify-end gap-4 pt-6 pb-2">
          <Button
            type="button"
            variant="outline"
            className="whitespace-nowrap"
            onClick={() => form.reset()}
            disabled={isLoading}
          >
            Annuler
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="whitespace-nowrap bg-background text-foreground border border-border hover:bg-muted transition-colors"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            {initialValues ? "Mettre à jour" : "Créer l'album"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AlbumForm;
