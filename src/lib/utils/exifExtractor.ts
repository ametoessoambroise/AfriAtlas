import exifr from "exifr";
import { toast } from "sonner";

export interface ExifData {
  dateTime?: string; // ISO 8601 format
  latitude?: number;
  longitude?: number;
  cameraMake?: string;
  cameraModel?: string;
}

/**
 * Convertit la date EXIF en format ISO 8601
 */
function convertExifDateToISO(date: Date | string): string | undefined {
  if (!date) return undefined;

  try {
    const dateObj = date instanceof Date ? date : new Date(date);
    if (isNaN(dateObj.getTime())) return undefined;

    return dateObj.toISOString();
  } catch (error) {
      console.error("Error converting EXIF date:", error);
      toast.error("Erreur lors de la conversion de la date de votre image");
    return undefined;
  }
}

/**
 * Extrait les métadonnées EXIF d'un fichier image
 * @param file - Fichier image à analyser
 * @returns Promise avec les données EXIF extraites
 */
export async function extractExifData(file: File): Promise<ExifData> {
  const result: ExifData = {};

  // Vérifier que c'est bien une image
  if (!file.type.startsWith("image/")) {
      console.warn("File is not an image, skipping EXIF extraction");
      toast.error("Le fichier sélectionné n'est pas une image");
    return result;
  }

  try {
    // Extraire toutes les données EXIF avec exifr
    // Utiliser true pour activer toutes les options
    const exifData = await exifr.parse(file, true);

    if (!exifData) {
        console.log("📸 No EXIF data found in image");
        toast.error("Les métadonnéss n'on pas pu être été extraite")
      return result;
    }

    // 📅 Date de prise de la photo
    // Essayer plusieurs champs possibles
    const dateOriginal =
      exifData.DateTimeOriginal ||
      exifData.CreateDate ||
      exifData.DateTime ||
      exifData.DateCreated;

    if (dateOriginal) {
      result.dateTime = convertExifDateToISO(dateOriginal);
        console.log("📅 EXIF Date extracted:", result.dateTime);
        toast.success("Date de la photo extraite avec succès");
    }

    // 📍 Coordonnées GPS
    if (exifData.latitude !== undefined && exifData.longitude !== undefined) {
      result.latitude = exifData.latitude;
      result.longitude = exifData.longitude;
      console.log(
        `📍 EXIF GPS extracted: ${result.latitude}, ${result.longitude}`,
      );
    }

    // 📷 Informations caméra
    if (exifData.Make) {
      result.cameraMake = exifData.Make;
    }
    if (exifData.Model) {
      result.cameraModel = exifData.Model;
    }

    if (result.cameraMake || result.cameraModel) {
      console.log(
        `📷 Camera: ${result.cameraMake || ""} ${result.cameraModel || ""}`.trim(),
      );
    }

    return result;
  } catch (error) {
    // Erreur silencieuse - certaines images n'ont pas d'EXIF
    console.log("No EXIF data or error reading EXIF:", error);
    return result;
  }
}

/**
 * Extrait les métadonnées EXIF de plusieurs fichiers
 * @param files - Liste de fichiers à analyser
 * @returns Promise avec un tableau de données EXIF
 */
export async function extractExifDataBatch(files: File[]): Promise<ExifData[]> {
  const promises = files.map((file) => extractExifData(file));
  return Promise.all(promises);
}

/**
 * Vérifie si un fichier contient des données EXIF
 * @param file - Fichier à vérifier
 * @returns Promise<boolean>
 */
export async function hasExifData(file: File): Promise<boolean> {
  const data = await extractExifData(file);
  return !!(data.dateTime || data.latitude || data.longitude);
}
