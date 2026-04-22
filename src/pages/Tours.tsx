import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import { Seo } from "@/components/Seo";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import heroImg from "@/assets/hero-tours.jpg";
import { tours } from "@/data/tours";

const filters = ["All", "Sahara", "Atlas", "Coast", "Imperial cities", "Culture", "Marrakech"];

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

      <section className="py-24 md:py-32 bg-background">
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
    </Layout>
  );
};

export default Tours;
