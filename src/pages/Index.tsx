import PageWrapper from "@/components/layout/PageWrapper";
import HeroSection from "@/components/home/HeroSection";
import LiveStats from "@/components/home/LiveStats";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import CategoryFilter from "@/components/home/CategoryFilter";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CtaBanner from "@/components/home/CtaBanner";
import { usePublicAds } from "@/hooks/queries/useAds";
import AdPremiumSpotlight from "@/components/ads/AdPremiumSpotlight";
import AdPromoCard from "@/components/ads/AdPromoCard";

const Index = () => {
  const ads = usePublicAds({ per_page: 1 });
  const spotlightAd = ads.data?.items?.[0];
  const promoAd = ads.data?.items?.[1];

  return (
    <PageWrapper>
      <div className="relative max-w-full mx-auto ">
        <HeroSection />
        <LiveStats />
      </div>

      {spotlightAd && <AdPremiumSpotlight ad={spotlightAd} />}

      <FeaturedDestinations />
      <CategoryFilter />

      {promoAd && (
        <section className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl my-24">
          <AdPromoCard ad={promoAd} layout="horizontal" />
        </section>
      )}

      <TestimonialsSection />
      <CtaBanner />
    </PageWrapper>
  );
};

export default Index;
