import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ArrowUpRight } from "lucide-react";
import tea from "@/assets/feature-tea.jpg";
import stars from "@/assets/feature-stars.jpg";
import map from "@/assets/feature-map.jpg";

const posts = [
  {
    category: "Guide",
    date: "March 2026",
    title: "How to spend 48 perfect hours in Marrakech",
    excerpt: "A slow, spice-filled itinerary for first-timers — from rooftop breakfasts to hidden tanneries.",
    img: tea,
  },
  {
    category: "Story",
    date: "February 2026",
    title: "A night under Saharan stars, told by a nomad",
    excerpt: "Our guide Hassan shares what the desert sounds like when the last camp fire dies down.",
    img: stars,
  },
  {
    category: "Tips",
    date: "January 2026",
    title: "Best time to visit Morocco, month by month",
    excerpt: "From snow-dusted Atlas passes to summer on the Atlantic — a traveller's calendar.",
    img: map,
  },
];

const TravelJournal = () => {
  return (
    <section className="relative py-28 md:py-36 bg-background">
      <div className="container-edge">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Reveal>
            <div className="font-mono-accent text-[11px] text-accent mb-4">◆ Travel journal</div>
          </Reveal>
          <Reveal delay={0.1} as="h2">
            <h2 className="font-display text-5xl md:text-7xl text-architectural text-primary-deep">
              <span className="font-script text-accent italic text-6xl md:text-8xl">Stories</span> from the road
            </h2>
          </Reveal>
        </div>

        <Stagger className="grid md:grid-cols-3 gap-8 md:gap-10">
          {posts.map((p) => (
            <StaggerItem key={p.title}>
              <article className="group cursor-pointer">
                <div className="relative aspect-[4/3] overflow-hidden mb-6">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-smooth group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-background text-foreground font-mono-accent text-[10px] px-3 py-1.5">
                    {p.category}
                  </div>
                </div>
                <div className="font-mono-accent text-[10px] text-muted-foreground mb-3">
                  {p.date}
                </div>
                <h3 className="font-display text-2xl md:text-3xl text-primary-deep leading-tight mb-3 group-hover:text-accent transition-colors duration-500">
                  {p.title}
                </h3>
                <p className="font-serif text-base text-muted-foreground leading-relaxed mb-5">
                  {p.excerpt}
                </p>
                <div className="inline-flex items-center gap-2 font-mono-accent text-[10px] text-primary-deep">
                  Read the story
                  <ArrowUpRight className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
};

export default TravelJournal;
