import PageWrapper from "@/components/layout/PageWrapper";
import HeroSection from "@/components/home/HeroSection";
import LiveStats from "@/components/home/LiveStats";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import CategoryFilter from "@/components/home/CategoryFilter";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CtaBanner from "@/components/home/CtaBanner";
import { usePublicAds } from "@/hooks/queries/useAds";
import AdPremiumSpotlight from "@/components/ads/AdPremiumSpotlight";

const Index = () => {
  const ads = usePublicAds({ per_page: 1 });
  const spotlightAd = ads.data?.items?.[0];

  return (
    <PageWrapper>
      <div className="relative max-w-full mx-auto ">
        <HeroSection />
        <LiveStats />
      </div>
      
      {spotlightAd && (
        <AdPremiumSpotlight ad={spotlightAd} />
      )}

      <FeaturedDestinations />
      <CategoryFilter />
      <TestimonialsSection />
      <CtaBanner />
    </PageWrapper>
  );
};

export default Index;
