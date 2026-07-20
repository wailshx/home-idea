import HeroSection from "@/components/hi/home/HeroSection";
import MarqueeStrip from "@/components/hi/home/MarqueeStrip";
import CategoriesGrid from "@/components/hi/home/CategoriesGrid";
import FeaturedProducts from "@/components/hi/home/FeaturedProducts";
import AmenagementCTA from "@/components/hi/home/AmenagementCTA";
import TestimonialsSection from "@/components/hi/home/TestimonialsSection";
import NewsletterSection from "@/components/hi/home/NewsletterSection";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <MarqueeStrip />
      <CategoriesGrid />
      <FeaturedProducts />
      <AmenagementCTA />
      <TestimonialsSection />
      <NewsletterSection />
    </div>
  );
};

export default Home;
