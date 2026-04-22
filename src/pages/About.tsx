import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import { Seo } from "@/components/Seo";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import heroImg from "@/assets/hero-about.jpg";
import storyImg from "@/assets/about-story.jpg";
import missionImg from "@/assets/about-mission.jpg";
import valuesImg from "@/assets/feature-medina.jpg";
import commitmentImg from "@/assets/feature-coast.jpg";

const team = [
  { name: "Khalid B.", role: "Founder & Chief Storyteller", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80" },
  { name: "Yasmine A.", role: "Head of Experiences", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80" },
  { name: "Hassan M.", role: "Lead Sahara Guide", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80" },
  { name: "Leila R.", role: "Concierge Director", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80" },
];

const stories = [
  { eyebrow: "Our beginning", title: "Born under a Saharan sky.", body: "Bo Voyages began in 2014 with a single Land Cruiser, a battered notebook of riad owners' phone numbers, and a stubborn belief that travel could be slower, kinder and far more beautiful. A decade later, the notebook is still here.", img: storyImg, reverse: false },
  { eyebrow: "Our mission", title: "Travel that travels back.", body: "We design journeys that leave more than they take — supporting Berber cooperatives, family-run riads and women-led ateliers in every region we visit. Every guest fee returns something to the place that hosted them.", img: missionImg, reverse: true },
  { eyebrow: "Our values", title: "Curated, never crowded.", body: "We cap our groups, we never resell — every tour is run by Bo Voyages, by people we have trained and travelled with for years. Our promise is intimacy: of place, of pace, of the people you meet.", img: valuesImg, reverse: false },
];

const About = () => {
  return (
    <Layout>
      <Seo title="Our Story — Bo Voyages" description="A decade of crafting cinematic Morocco journeys. Meet the team, our mission and the values that guide every Bo Voyages experience." path="/about" />
      <PageHero image={heroImg} eyebrow="◆ Our story" title={<>A decade of <em className="text-accent not-italic">slow magic</em>.</>} subtitle="Ten years, four hundred journeys, one country we are still learning by heart." />

      {stories.map((s, i) => (
        <section key={s.title} className={`py-24 md:py-32 ${i % 2 ? "bg-secondary" : "bg-background"}`}>
          <div className={`container-edge grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${s.reverse ? "lg:[direction:rtl]" : ""}`}>
            <div className="lg:[direction:ltr]">
              <Reveal>
                <div className="aspect-[4/5] overflow-hidden">
                  <img src={s.img} alt={s.title} loading="lazy" className="h-full w-full object-cover animate-ken-burns" />
                </div>
              </Reveal>
            </div>
            <div className="lg:[direction:ltr]">
              <Reveal><div className="font-mono-accent text-[11px] text-accent mb-4">◆ {s.eyebrow}</div></Reveal>
              <Reveal delay={0.1} as="h2"><h2 className="font-display text-5xl md:text-6xl text-architectural mb-8">{s.title}</h2></Reveal>
              <Reveal delay={0.2}><p className="font-serif text-xl text-muted-foreground leading-relaxed">{s.body}</p></Reveal>
            </div>
          </div>
        </section>
      ))}

      <section className="py-24 md:py-32 bg-primary-deep text-white relative overflow-hidden">
        <div className="absolute inset-0 gold-overlay" />
        <div className="container-edge relative">
          <Reveal><div className="font-mono-accent text-[11px] text-accent mb-4 text-center">◆ By the numbers</div></Reveal>
          <Reveal delay={0.1} as="h2"><h2 className="font-display text-4xl md:text-5xl text-architectural mb-16 text-center max-w-2xl mx-auto">Ten years, written in moments.</h2></Reveal>
          <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { v: 11, s: "+", l: "Years on the road" },
              { v: 4800, s: "+", l: "Travellers welcomed" },
              { v: 38, s: "", l: "Destinations curated" },
              { v: 96, s: "%", l: "Would travel with us again" },
            ].map((s) => (
              <StaggerItem key={s.l}>
                <div className="text-center">
                  <div className="font-display text-6xl md:text-7xl text-accent"><Counter end={s.v} suffix={s.s} /></div>
                  <div className="font-mono-accent text-[10px] text-white/70 mt-3">{s.l}</div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-background">
        <div className="container-edge">
          <Reveal><div className="font-mono-accent text-[11px] text-accent mb-4">◆ The hands behind the journeys</div></Reveal>
          <Reveal delay={0.1} as="h2"><h2 className="font-display text-5xl md:text-6xl text-architectural mb-16 max-w-2xl">Meet the people who'll plan, guide and pour your tea.</h2></Reveal>
          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((m) => (
              <StaggerItem key={m.name}>
                <div className="group relative overflow-hidden bg-secondary aspect-[3/4]">
                  <img src={m.img} alt={m.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1400ms] ease-smooth group-hover:scale-110 grayscale group-hover:grayscale-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/95 via-primary-deep/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-x-6 bottom-6 text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="font-mono-accent text-[10px] text-accent mb-2">{m.role}</div>
                    <div className="font-display text-3xl">{m.name}</div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="relative py-32 md:py-44 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${commitmentImg})` }} aria-hidden />
        <div className="absolute inset-0 bg-primary-deep/85" aria-hidden />
        <div className="container-edge relative text-center text-white">
          <Reveal><div className="font-mono-accent text-[11px] text-accent mb-6">◆ Our commitment</div></Reveal>
          <Reveal delay={0.1} as="h2"><h2 className="font-display text-5xl md:text-7xl text-architectural max-w-4xl mx-auto text-balance">We don't just travel through Morocco — <em className="text-accent">we travel for it</em>.</h2></Reveal>
          <Reveal delay={0.3}><p className="font-serif text-xl text-white/85 max-w-2xl mx-auto mt-8 leading-relaxed">A portion of every booking funds Berber school programmes in the Atlas mountains. Slow tourism, made meaningful.</p></Reveal>
        </div>
      </section>
    </Layout>
  );
};

export default About;
