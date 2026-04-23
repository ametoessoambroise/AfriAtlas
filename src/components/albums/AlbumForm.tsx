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
  FormDescription
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Loader2, Save } from "lucide-react";
import CoverUpload from "./CoverUpload";
import { useState } from "react";
import type { AlbumCreate, AlbumUpdate } from "@/lib/types/album";

const albumSchema = z.object({
  title: z.string().min(3, "Le titre doit faire au moins 3 caractères"),
  description: z.string().max(500, "La description ne doit pas dépasser 500 caractères").optional(),
  is_public: z.boolean().default(false),
});

type AlbumFormValues = z.infer<typeof albumSchema>;

interface AlbumFormProps {
  initialValues?: Partial<AlbumFormValues>;
  coverImageUrl?: string;
  onSubmit: (data: AlbumFormValues, coverFile?: File) => void;
  isLoading?: boolean;
}

const AlbumForm = ({ initialValues, coverImageUrl, onSubmit, isLoading }: AlbumFormProps) => {
  const [coverFile, setCoverFile] = useState<File | undefined>();

  const form = useForm<AlbumFormValues>({
    resolver: zodResolver(albumSchema),
    defaultValues: {
      title: initialValues?.title || "",
      description: initialValues?.description || "",
      is_public: initialValues?.is_public ?? false,
    },
  });

  const handleSubmit = (values: AlbumFormValues) => {
    onSubmit(values, coverFile);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-black uppercase tracking-widest">Titre de l'Album</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Mon voyage à Kpalimé..." 
                      className="h-14 text-lg font-medium rounded-2xl border-2 focus:border-primary/50 transition-all"
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
                  <FormLabel className="text-base font-black uppercase tracking-widest">Description (Optionnelle)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Racontez brièvement l'histoire de cet album..." 
                      className="min-h-[150px] text-base rounded-2xl border-2 resize-none focus:border-primary/50 transition-all"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="is_public"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-3xl border border-border bg-surface-alt p-6 p-y-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-sm font-black uppercase tracking-widest">Visibilité Publique</FormLabel>
                    <FormDescription className="text-xs">
                      Permettre à d'autres voyageurs de découvrir vos aventures.
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

          {/* Sidebar - Cover Image */}
          <div className="space-y-6">
            <div className="space-y-2">
              <FormLabel className="text-base font-black uppercase tracking-widest">Couverture</FormLabel>
              <CoverUpload 
                currentImage={coverImageUrl} 
                onUpload={setCoverFile}
                onClear={() => setCoverFile(undefined)}
              />
              <p className="text-[10px] text-muted-foreground mt-2 px-2 italic">
                Cette image sera utilisée comme aperçu pour votre album.
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary h-14 rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center gap-3 text-sm font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              {initialValues ? "Mettre à jour" : "Créer l'Album"}
            </button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default AlbumForm;
