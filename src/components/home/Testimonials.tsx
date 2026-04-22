import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const testimonials = [
  {
    quote:
      "Bo Voyages didn't sell us a tour — they handed us Morocco. Our guide felt like an old friend by day three, and the riads were extraordinary.",
    name: "Amélie & Theo",
    place: "Paris, France",
  },
  {
    quote:
      "From the airport pickup in Marrakech to the last sunset over the dunes, every detail was anticipated. The most thoughtful trip we have ever taken.",
    name: "Samuel Okafor",
    place: "London, UK",
  },
  {
    quote:
      "We travelled with our two children and three generations. Bo Voyages made it feel effortless and magical — even the seven-year-old keeps asking when we go back.",
    name: "The Hartman Family",
    place: "Brooklyn, NY",
  },
];

const Testimonials = () => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative py-28 md:py-36 bg-primary-deep text-white overflow-hidden">
      <div className="absolute inset-0 gold-overlay" aria-hidden />
      <div className="container-edge relative">
        <Reveal>
          <div className="font-mono-accent text-[11px] text-accent mb-4 text-center">◆ Words from travellers</div>
        </Reveal>
        <Reveal delay={0.1} as="h2">
          <h2 className="font-display text-5xl md:text-6xl text-center text-architectural mb-16 max-w-3xl mx-auto">
            Stories that made the journey<span className="italic text-accent">.</span>
          </h2>
        </Reveal>

        <div className="relative max-w-4xl mx-auto min-h-[280px]">
          <Quote className="absolute -top-6 -left-2 h-16 w-16 text-accent/30" />
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <div className="flex justify-center gap-1 mb-8">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="font-serif text-2xl md:text-4xl leading-snug text-balance text-white/95">
                "{testimonials[i].quote}"
              </p>
              <div className="mt-10 font-mono-accent text-[11px] text-white/60">
                {testimonials[i].name} · {testimonials[i].place}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              onClick={() => setI((p) => (p - 1 + testimonials.length) % testimonials.length)}
              aria-label="Previous"
              className="h-11 w-11 grid place-items-center border border-white/20 rounded-full hover:bg-accent hover:text-primary-deep hover:border-accent transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  aria-label={`Show testimonial ${idx + 1}`}
                  className={`h-1.5 transition-all duration-500 ${idx === i ? "w-10 bg-accent" : "w-4 bg-white/30"}`}
                />
              ))}
            </div>
            <button
              onClick={() => setI((p) => (p + 1) % testimonials.length)}
              aria-label="Next"
              className="h-11 w-11 grid place-items-center border border-white/20 rounded-full hover:bg-accent hover:text-primary-deep hover:border-accent transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
