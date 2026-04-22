import Layout from "@/components/Layout";
import { Seo } from "@/components/Seo";
import Hero from "@/components/Hero";
import FeaturedExperiences from "@/components/home/FeaturedExperiences";
import WhyChoose from "@/components/home/WhyChoose";
import Testimonials from "@/components/home/Testimonials";
import CtaBanner from "@/components/home/CtaBanner";
import Newsletter from "@/components/home/Newsletter";

const Index = () => {
  return (
    <Layout>
      <Seo
        title="Bo Voyages — Curated Morocco Journeys & Premium Travel"
        description="Cinematic Morocco journeys, private transfers and bespoke experiences crafted by local experts. Begin your next adventure with Bo Voyages."
        path="/"
      />
      <Hero />
      <FeaturedExperiences />
      <WhyChoose />
      <Testimonials />
      <CtaBanner />
      <Newsletter />
    </Layout>
  );
};

export default Index;
