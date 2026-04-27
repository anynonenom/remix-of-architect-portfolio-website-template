import Layout from "@/components/Layout";
import { Seo } from "@/components/Seo";
import Hero from "@/components/Hero";
import FeaturedExperiences from "@/components/home/FeaturedExperiences";
import ToursShowcase from "@/components/home/ToursShowcase";
import Destinations from "@/components/home/Destinations";
import WhyChoose from "@/components/home/WhyChoose";
import Testimonials from "@/components/home/Testimonials";
import TravelJournal from "@/components/home/TravelJournal";
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
      <ToursShowcase />
      <Destinations />
      <WhyChoose />
      <Testimonials />
      <TravelJournal />
      <CtaBanner />
      <Newsletter />
    </Layout>
  );
};

export default Index;

