import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import PageCta from "@/components/PageCta";
import { Seo } from "@/components/Seo";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ArrowUpRight, Clock, MapPin, Compass, Users, Leaf, Heart } from "lucide-react";
import heroImg from "@/assets/hero-tours.jpg";
import ctaBg from "@/assets/tour-merzouga.jpg";
import { tours } from "@/data/tours";

const filters = ["All", "Sahara", "Atlas", "Coast", "Imperial cities", "Culture", "Marrakech"];

const promises = [
  { icon: Compass, title: "Hand-drawn routes", body: "Every itinerary built by local experts — no off-the-shelf catalogues." },
  { icon: Users, title: "Small groups", body: "Maximum 12 travellers so each morning feels intimate, each meal shared." },
  { icon: Leaf, title: "Slow & sustainable", body: "We stay in family riads and hire Berber guides — your money stays where it matters." },
  { icon: Heart, title: "Concierge 24/7", body: "From the first email to your flight home, a real human is one message away." },
];

const Tours = () => {
  const [active, setActive] = useState("All");
  const list = active === "All" ? tours : tours.filter((t) => t.region === active);

  return (
    <Layout>
      <Seo
        title="Signature Tours in Morocco — Bo Voyages"
        description="Curated multi-day journeys across Morocco — Sahara, Atlas mountains, imperial cities and Atlantic coast. Hand-built by local experts."
        path="/tours"
      />
      <PageHero
        image={heroImg}
        eyebrow="◆ Signature tours"
        title={<>Multi-day journeys, <em className="text-accent not-italic">slow and luminous</em>.</>}
        subtitle="A library of routes we have shaped over a decade — from desert nights to mountain dawns."
      />

      {/* 1. Intro strip — orient the visitor */}
      <section className="py-20 md:py-24 bg-background border-b border-border">
        <div className="container-edge grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="font-mono-accent text-[11px] text-accent mb-4">◆ Where to begin</div>
            </Reveal>
            <Reveal delay={0.1} as="h2">
              <h2 className="font-display text-4xl md:text-6xl text-architectural">
                <span className="font-script text-accent text-5xl md:text-7xl">{tours.length}</span> signature journeys, one unforgettable country.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="lg:col-span-5">
            <p className="font-serif text-lg text-muted-foreground leading-relaxed">
              Filter by region below, open any journey to see day-by-day itineraries, or let us shape one just for you. Each tour runs privately for your group — dates and pace, yours to set.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 2. Filters + grid */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container-edge">
          <Reveal>
            <div className="flex flex-wrap gap-2 mb-12">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className={`font-mono-accent text-[10px] px-5 py-2.5 border transition-all duration-500 ${
                    active === f
                      ? "bg-primary-deep text-white border-primary-deep"
                      : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </Reveal>

          <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((t) => (
              <StaggerItem key={t.slug}>
                <Link to={`/tours/${t.slug}`} className="group relative overflow-hidden bg-card block">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={t.hero}
                      alt={t.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1400ms] ease-smooth group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/70 via-transparent to-transparent" />
                    <div className="absolute top-5 left-5 font-mono-accent text-[10px] text-white bg-white/10 backdrop-blur-md px-3 py-1.5 border border-white/20">
                      {t.region}
                    </div>
                  </div>
                  <div className="p-6 md:p-8 border-t border-border">
                    <div className="flex items-center gap-4 font-mono-accent text-[10px] text-muted-foreground mb-3">
                      <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" />{t.days} days</span>
                      <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3" />{t.level}</span>
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl text-foreground mb-6 group-hover:text-accent transition-colors duration-500">{t.title}</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-mono-accent text-[10px] text-muted-foreground">From</div>
                        <div className="font-display text-3xl text-primary-deep">€{t.price}</div>
                      </div>
                      <span className="h-12 w-12 rounded-full bg-accent text-primary-deep grid place-items-center transition-transform duration-500 group-hover:rotate-45">
                        <ArrowUpRight className="h-5 w-5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* 3. Why travel with us — reassurance after browsing */}
      <section className="py-24 md:py-32 bg-secondary">
        <div className="container-edge">
          <div className="max-w-2xl mb-16">
            <Reveal>
              <div className="font-mono-accent text-[11px] text-accent mb-4">◆ The Bo Voyages promise</div>
            </Reveal>
            <Reveal delay={0.1} as="h2">
              <h2 className="font-display text-4xl md:text-6xl text-architectural">
                Why travellers come back — and bring their friends.
              </h2>
            </Reveal>
          </div>
          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {promises.map((p) => (
              <StaggerItem key={p.title}>
                <div className="p-8 bg-background border border-border h-full hover:border-accent transition-colors duration-500 group">
                  <div className="h-12 w-12 grid place-items-center bg-accent/10 text-accent mb-6 group-hover:bg-accent group-hover:text-primary-deep transition-colors duration-500">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-2xl mb-3">{p.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{p.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* 4. Closing CTA — bridge to custom or contact */}
      <PageCta
        image={ctaBg}
        eyebrow="◆ Not quite the right fit?"
        title={<>Let us shape a journey <em className="text-accent">around you</em>.</>}
        subtitle="Tell us your dates, pace and dreams — we return a bespoke itinerary within 48 hours."
        ctaLabel="Build a custom journey"
        ctaTo="/custom"
        secondaryLabel="Talk to a concierge"
        secondaryTo="/contact"
      />
    </Layout>
  );
};

export default Tours;

