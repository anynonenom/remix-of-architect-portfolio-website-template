import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Compass, Sparkles, ShieldCheck, HeartHandshake } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import storyImg from "@/assets/about-story.jpg";

const points = [
  { icon: Compass, title: "Local-led, always", body: "Every itinerary is guided by Moroccans who know the country by heart — not just by map." },
  { icon: Sparkles, title: "Slow, deliberate craft", body: "Fewer destinations, deeper experiences. We build journeys to be felt, not ticked off." },
  { icon: ShieldCheck, title: "Effortless logistics", body: "Private drivers, hand-picked riads, and 24/7 concierge so you never carry a worry." },
  { icon: HeartHandshake, title: "Conscious travel", body: "We work with cooperatives and family-run riads — your trip supports the people who make it possible." },
];

const WhyChoose = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} className="relative py-28 md:py-36 bg-secondary overflow-hidden">
      <div className="container-edge grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden">
            <motion.img
              src={storyImg}
              alt="Local guide pouring traditional Moroccan mint tea"
              loading="lazy"
              style={{ y }}
              className="absolute inset-0 h-[120%] w-full object-cover"
            />
          </div>
          {/* Floating stat */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="absolute -bottom-8 -right-4 md:-right-12 bg-background p-8 shadow-architectural max-w-[260px]"
          >
            <div className="font-display text-6xl text-primary-deep">
              <Counter end={4800} suffix="+" />
            </div>
            <div className="font-mono-accent text-[10px] text-muted-foreground mt-2">
              Travellers welcomed across Morocco
            </div>
          </motion.div>
        </div>

        <div>
          <Reveal>
            <div className="font-mono-accent text-[11px] text-accent mb-4">◆ Why Bo Voyages</div>
          </Reveal>
          <Reveal delay={0.1} as="h2">
            <h2 className="font-display text-5xl md:text-6xl text-architectural mb-8">
              We design journeys, <span className="italic text-accent">not itineraries</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="font-serif text-xl text-muted-foreground leading-relaxed mb-12 max-w-lg">
              For a decade, we have been quietly building the kind of Morocco trip our friends ask us to plan for them — intimate, grounded in place, and gently luxurious.
            </p>
          </Reveal>

          <Stagger className="grid sm:grid-cols-2 gap-x-8 gap-y-10">
            {points.map((p) => (
              <StaggerItem key={p.title}>
                <div className="h-12 w-12 grid place-items-center bg-accent/10 text-accent mb-5">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-2xl mb-2 text-foreground">{p.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{p.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
