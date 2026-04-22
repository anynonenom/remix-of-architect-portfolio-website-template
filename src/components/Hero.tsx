import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowDown } from "lucide-react";
import heroImage from "@/assets/hero-sahara.jpg";
import HeroBooking from "@/components/HeroBooking";

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section ref={ref} className="relative h-[100vh] min-h-[680px] flex items-end overflow-hidden">
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 bg-cover bg-center"
        aria-hidden
      >
        <img src={heroImage} alt="Sahara desert at sunset with caravan of camels" className="h-full w-full object-cover animate-ken-burns" width={1920} height={1080} />
      </motion.div>
      <div className="absolute inset-0 hero-overlay" aria-hidden />
      <div className="absolute inset-0 grain" aria-hidden />

      {/* Floating gold sun */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-[28%] right-[12%] hidden md:block float-y"
        aria-hidden
      >
        <div className="h-32 w-32 rounded-full bg-gradient-gold blur-2xl opacity-60" />
        <div className="absolute inset-0 h-32 w-32 rounded-full border border-accent/30" />
      </motion.div>

      {/* Vertical eyebrow */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 hidden md:block z-10"
      >
        <div className="vertical-rl font-mono-accent text-[10px] text-white/60 tracking-[0.4em]">
          Morocco · Est. 2014
        </div>
      </motion.div>

      <motion.div style={{ opacity }} className="container-edge relative z-10 pb-20 md:pb-28 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-mono-accent text-[11px] text-accent mb-6"
        >
          ◆ Curated Morocco Journeys
        </motion.div>
        <h1 className="font-display text-architectural text-balance">
          <motion.span
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="block text-6xl md:text-8xl lg:text-[10rem]"
          >
            Wander
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="block text-6xl md:text-8xl lg:text-[10rem] italic text-accent"
          >
            beyond maps.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="font-serif text-xl md:text-2xl text-white/85 max-w-xl mt-8 leading-relaxed"
        >
          From candlelit riads in Marrakech to silent dunes under a Saharan sky — Bo Voyages crafts journeys that linger long after the suitcase is unpacked.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-wrap gap-4 mt-10"
        >
          <Link to="/tours" className="btn-gold group">
            Explore tours
            <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
          </Link>
          <Link to="/custom" className="btn-ghost-light">
            Build a custom journey
          </Link>
        </motion.div>

        <HeroBooking />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/70 z-10"
      >
        <span className="font-mono-accent text-[10px]">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
