import { Gallery6, GalleryItem } from "@/components/ui/gallery6";

const categories: GalleryItem[] = [
  {
    id: "museum",
    title: "Culture & Patrimoine",
    summary: "Plongez dans l'histoire, les musées et le riche patrimoine du Togo.",
    url: "/destinations?category=museum",
    image: "https://media.istockphoto.com/id/89898374/fr/photo/b%C3%A2timent-embl%C3%A9matique-au-koutammakou.jpg?s=612x612&w=0&k=20&c=JraTbjKTbmwqCmewITWfzg8XEdQKcju898PObUM9ReY=",
  },
  {
    id: "hotel",
    title: "Hébergements",
    summary: "Hôtels de luxe, éco-lodges et maisons d'hôtes de charme sélectionnées.",
    url: "/destinations?category=hotel",
    image: "https://i.pinimg.com/736x/d5/58/e8/d558e80fb3c27fe6f97a1633cf32e0d8.jpg",
  },
  {
    id: "activity",
    title: "Loisirs & Aventures",
    summary: "Randonnées, parcs, expériences VR et activités en plein air.",
    url: "/destinations?category=activity",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "restaurant",
    title: "Gastronomie",
    summary: "Découvrez les meilleures saveurs locales et restaurants raffinés.",
    url: "/destinations?category=restaurant",
    image: "https://i.pinimg.com/1200x/43/2b/ad/432bad1bbe51a064f80720e323d926e8.jpg",
  },
];

export default function CategoryFilter() {
  return (
    <Gallery6 
      heading="Une plateforme, toutes vos expériences"
      demoUrl="/destinations"
      items={categories}
    />
  );
}

