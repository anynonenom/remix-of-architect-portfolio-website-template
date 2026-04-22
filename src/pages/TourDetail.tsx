import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Users, Calendar, Check, X, ArrowUpRight } from "lucide-react";
import Layout from "@/components/Layout";
import { Seo } from "@/components/Seo";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { findTour, tours } from "@/data/tours";

const TourDetail = () => {
  const { slug } = useParams();
  const tour = findTour(slug || "");

  if (!tour) return <Navigate to="/tours" replace />;

  const related = tours.filter((t) => t.slug !== tour.slug).slice(0, 3);

  return (
    <Layout>
      <Seo
        title={`${tour.title} — Bo Voyages`}
        description={tour.tagline}
        path={`/tours/${tour.slug}`}
      />

      {/* Cinematic hero */}
      <section className="relative h-[92vh] min-h-[640px] flex items-end overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <img src={tour.hero} alt={tour.title} className="h-full w-full object-cover" />
        </motion.div>
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 grain" />
        <div className="container-edge relative z-10 pb-20 md:pb-28 text-white">
          <Reveal>
            <Link to="/tours" className="inline-flex items-center gap-2 font-mono-accent text-[11px] text-white/70 hover:text-accent mb-8 transition-colors">
              <ArrowLeft className="h-3 w-3" /> All journeys
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="font-mono-accent text-[11px] text-accent mb-5">◆ {tour.region}</div>
          </Reveal>
          <Reveal delay={0.2} as="h1">
            <h1 className="font-display text-5xl md:text-7xl lg:text-[7rem] text-architectural max-w-5xl text-balance">
              {tour.title}
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="font-serif text-xl md:text-2xl text-white/85 max-w-2xl mt-6 leading-relaxed">{tour.tagline}</p>
          </Reveal>
        </div>
      </section>

      {/* Quick facts strip */}
      <section className="bg-primary-deep text-white">
        <div className="container-edge grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
          {[
            { icon: Clock, label: "Duration", value: `${tour.days} days` },
            { icon: Users, label: "Group size", value: tour.groupSize },
            { icon: Calendar, label: "Best season", value: tour.bestSeason },
            { icon: ArrowUpRight, label: "From", value: `€${tour.price}` },
          ].map((f) => (
            <div key={f.label} className="px-6 py-8 flex items-start gap-4">
              <f.icon className="h-5 w-5 text-accent shrink-0 mt-1" />
              <div>
                <div className="font-mono-accent text-[10px] text-white/60">{f.label}</div>
                <div className="font-display text-xl md:text-2xl mt-1">{f.value}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Highlights + Booking sticky */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container-edge grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <Reveal>
              <div className="font-mono-accent text-[11px] text-accent mb-4">◆ Highlights</div>
            </Reveal>
            <Reveal delay={0.1} as="h2">
              <h2 className="font-display text-4xl md:text-5xl text-architectural mb-12">Moments you will remember.</h2>
            </Reveal>
            <Stagger className="grid sm:grid-cols-2 gap-6">
              {tour.highlights.map((h) => (
                <StaggerItem key={h}>
                  <div className="flex gap-4 p-6 bg-secondary border-l-2 border-accent">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-1" />
                    <p className="font-serif text-lg leading-relaxed">{h}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <div className="bg-card border border-border p-8 shadow-elegant">
              <div className="font-mono-accent text-[10px] text-muted-foreground">From</div>
              <div className="font-display text-5xl text-primary-deep mb-1">€{tour.price}</div>
              <div className="font-mono-accent text-[10px] text-muted-foreground mb-6">per person · {tour.days} days</div>
              <div className="space-y-3 mb-8 pb-8 border-b border-border">
                <Detail label="Group" value={tour.groupSize} />
                <Detail label="Level" value={tour.level} />
                <Detail label="Season" value={tour.bestSeason} />
              </div>
              <Link to="/contact" className="btn-gold w-full justify-center">Reserve this journey</Link>
              <Link to="/custom" className="block text-center font-mono-accent text-[11px] mt-4 link-underline mx-auto w-fit">Customise it instead</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Itinerary */}
      <section className="py-24 md:py-32 bg-secondary">
        <div className="container-edge max-w-4xl">
          <Reveal>
            <div className="font-mono-accent text-[11px] text-accent mb-4">◆ Day by day</div>
          </Reveal>
          <Reveal delay={0.1} as="h2">
            <h2 className="font-display text-5xl md:text-6xl text-architectural mb-16">Your itinerary, unhurried.</h2>
          </Reveal>
          <div className="space-y-px bg-border">
            {tour.itinerary.map((d, i) => (
              <Reveal key={d.day} delay={i * 0.05}>
                <div className="bg-background p-8 md:p-10 grid md:grid-cols-[120px_1fr] gap-6">
                  <div>
                    <div className="font-mono-accent text-[10px] text-accent">Day {d.day.toString().padStart(2, "0")}</div>
                    <div className="font-display text-5xl text-primary-deep mt-2">{d.day}</div>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl mb-3">{d.title}</h3>
                    <p className="font-serif text-lg text-muted-foreground leading-relaxed">{d.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container-edge">
          <Reveal>
            <div className="font-mono-accent text-[11px] text-accent mb-4">◆ Glimpses</div>
          </Reveal>
          <Reveal delay={0.1} as="h2">
            <h2 className="font-display text-5xl md:text-6xl text-architectural mb-12">Scenes from the road.</h2>
          </Reveal>
          <Stagger className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {tour.gallery.map((g, i) => (
              <StaggerItem key={i} className={i === 0 ? "md:col-span-2 md:row-span-2" : ""}>
                <div className={`relative overflow-hidden bg-secondary group ${i === 0 ? "aspect-[4/3]" : "aspect-square"}`}>
                  <img src={g} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-[1400ms] ease-smooth group-hover:scale-110" />
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Includes / Excludes */}
      <section className="py-24 md:py-32 bg-secondary">
        <div className="container-edge grid md:grid-cols-2 gap-12">
          <Reveal>
            <div className="font-mono-accent text-[11px] text-accent mb-4">◆ Included</div>
            <h3 className="font-display text-4xl mb-8">What's in your hands.</h3>
            <ul className="space-y-4">
              {tour.includes.map((i) => (
                <li key={i} className="flex gap-3 font-serif text-lg">
                  <Check className="h-5 w-5 text-accent shrink-0 mt-1" />
                  {i}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="font-mono-accent text-[11px] text-muted-foreground mb-4">◆ Not included</div>
            <h3 className="font-display text-4xl mb-8">What's left to you.</h3>
            <ul className="space-y-4">
              {tour.excludes.map((i) => (
                <li key={i} className="flex gap-3 font-serif text-lg text-muted-foreground">
                  <X className="h-5 w-5 shrink-0 mt-1" />
                  {i}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Related */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container-edge">
          <Reveal>
            <div className="font-mono-accent text-[11px] text-accent mb-4">◆ You might also love</div>
          </Reveal>
          <Reveal delay={0.1} as="h2">
            <h2 className="font-display text-5xl md:text-6xl text-architectural mb-12">More journeys.</h2>
          </Reveal>
          <Stagger className="grid md:grid-cols-3 gap-6">
            {related.map((r) => (
              <StaggerItem key={r.slug}>
                <Link to={`/tours/${r.slug}`} className="group block relative overflow-hidden bg-primary-deep">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img src={r.hero} alt={r.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1400ms] ease-smooth group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/90 via-transparent to-transparent" />
                    <div className="absolute inset-x-6 bottom-6 text-white">
                      <div className="font-mono-accent text-[10px] text-accent mb-2">{r.region} · {r.days}d</div>
                      <h3 className="font-display text-2xl">{r.title}</h3>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </Layout>
  );
};

const Detail = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between gap-4 text-sm">
    <span className="font-mono-accent text-[10px] text-muted-foreground">{label}</span>
    <span className="font-serif text-right">{value}</span>
  </div>
);

export default TourDetail;
