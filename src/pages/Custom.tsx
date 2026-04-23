import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import { Seo } from "@/components/Seo";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ChevronDown, Check, Map, Calendar, Heart, Mail, ArrowRight, Compass, Mountain, Building2, Waves, Camera, Sparkles } from "lucide-react";
import ResultDialog, { initialResult, type ResultDialogState } from "@/components/ResultDialog";
import heroImg from "@/assets/hero-custom.jpg";

const interests = [
  { icon: Compass, label: "Desert adventure" },
  { icon: Mountain, label: "Mountain trekking" },
  { icon: Building2, label: "Imperial cities" },
  { icon: Waves, label: "Coast & relax" },
  { icon: Camera, label: "Photography" },
  { icon: Sparkles, label: "Wellness & hammams" },
];

const steps = [
  { n: "01", icon: Map, title: "Tell us your dream", body: "A few quick choices — duration, dates, group, the kind of mornings you love." },
  { n: "02", icon: Calendar, title: "We design your journey", body: "Within 48 hours we send a fully crafted itinerary with riads, drivers and rates." },
  { n: "03", icon: Heart, title: "Refine, then go", body: "Tweak together, lock it in, then arrive in Morocco to find every detail handled." },
];

const faqs = [
  { q: "How far in advance should we book?", a: "Three months is ideal, but we routinely build journeys in three weeks. For peak weeks (Easter, Christmas, October) book early." },
  { q: "What is included in a custom itinerary?", a: "Accommodation, private vehicle and driver, all confirmed activities, English-speaking local guides, airport transfers and 24/7 concierge." },
  { q: "Do you cater to families with young children?", a: "Absolutely. Roughly a third of our travellers come with children. We adapt pace, riads and activities accordingly." },
  { q: "How do we pay?", a: "A 30% deposit secures your dates; the balance is due 30 days before arrival. Bank transfer, card or wise — your choice." },
];

const fullSchema = z.object({
  duration: z.string().min(1),
  date: z.string().min(1),
  group: z.coerce.number().min(1).max(40),
  budget: z.string().min(1),
  interests: z.array(z.string()),
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(255),
  notes: z.string().trim().max(1000).optional(),
});

const Custom = () => {
  const [step, setStep] = useState(0);
  const [open, setOpen] = useState<number | null>(0);
  const [result, setResult] = useState<ResultDialogState>(initialResult);
  const [data, setData] = useState({
    duration: "7-10 days",
    date: "",
    group: 2,
    budget: "Premium",
    interests: ["Desert adventure"] as string[],
    name: "",
    email: "",
    notes: "",
  });

  const toggleInterest = (i: string) => {
    setData((d) => ({ ...d, interests: d.interests.includes(i) ? d.interests.filter((x) => x !== i) : [...d.interests, i] }));
  };

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = () => {
    const r = fullSchema.safeParse(data);
    if (!r.success) {
      setResult({
        open: true,
        status: "error",
        title: "Please complete all fields",
        description: r.error.issues[0].message || "Some details are missing — please review and try again.",
      });
      return;
    }
    setResult({
      open: true,
      status: "success",
      title: "Your dream is in good hands ✦",
      description: "Thank you — we'll send a fully crafted itinerary to your inbox within 48 hours.",
    });
    setStep(0);
    setData({ duration: "7-10 days", date: "", group: 2, budget: "Premium", interests: [], name: "", email: "", notes: "" });
  };

  return (
    <Layout>
      <Seo
        title="Custom Morocco Journeys — Bo Voyages"
        description="Build your perfect Morocco trip. Tell us your dates, pace and dreams — we design a fully bespoke private itinerary in 48 hours."
        path="/custom"
      />
      <PageHero
        image={heroImg}
        eyebrow="◆ Custom journeys"
        title={<>Build the journey <em className="text-accent not-italic">only you would take</em>.</>}
        subtitle="Private itineraries, hand-crafted in 48 hours. Tell us your shape of perfect — we draw the route."
      />

      {/* How it works */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container-edge">
          <Reveal>
            <div className="font-mono-accent text-[11px] text-accent mb-4">◆ How it works</div>
          </Reveal>
          <Reveal delay={0.1} as="h2">
            <h2 className="font-display text-5xl md:text-6xl text-architectural mb-16 max-w-2xl">From dream to departure in three steps.</h2>
          </Reveal>
          <Stagger className="grid md:grid-cols-3 gap-8 relative">
            {steps.map((s, i) => (
              <StaggerItem key={s.n}>
                <div className="relative p-8 bg-secondary h-full">
                  <div className="font-display text-7xl text-accent/30 absolute top-4 right-6">{s.n}</div>
                  <s.icon className="h-10 w-10 text-accent mb-6 relative" />
                  <h3 className="font-display text-3xl mb-3">{s.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{s.body}</p>
                  {i < steps.length - 1 && (
                    <ArrowRight className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/2 h-8 w-8 text-accent" />
                  )}
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Form */}
      <section className="py-24 md:py-32 bg-secondary">
        <div className="container-edge max-w-4xl">
          <Reveal>
            <div className="font-mono-accent text-[11px] text-accent mb-4 text-center">◆ Begin your journey</div>
          </Reveal>
          <Reveal delay={0.1} as="h2">
            <h2 className="font-display text-5xl md:text-6xl text-architectural text-center mb-12">Four little questions.</h2>
          </Reveal>

          {/* Progress */}
          <div className="flex items-center gap-3 mb-10">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex-1 h-1 bg-border overflow-hidden">
                <motion.div initial={false} animate={{ width: step >= i ? "100%" : "0%" }} transition={{ duration: 0.6 }} className="h-full bg-accent" />
              </div>
            ))}
          </div>

          <div className="bg-background p-8 md:p-12 shadow-elegant min-h-[420px]">
            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.4 }}>
                {step === 0 && (
                  <div className="space-y-8">
                    <h3 className="font-display text-3xl">Trip basics</h3>
                    <div className="grid sm:grid-cols-3 gap-4">
                      {["3-5 days", "7-10 days", "11+ days"].map((d) => (
                        <Choice key={d} active={data.duration === d} onClick={() => setData({ ...data, duration: d })}>{d}</Choice>
                      ))}
                    </div>
                    <Field label="Approximate start date">
                      <input type="date" value={data.date} onChange={(e) => setData({ ...data, date: e.target.value })} className="input" />
                    </Field>
                    <Field label="Group size">
                      <input type="number" min={1} max={40} value={data.group} onChange={(e) => setData({ ...data, group: parseInt(e.target.value || "1") })} className="input" />
                    </Field>
                  </div>
                )}
                {step === 1 && (
                  <div className="space-y-6">
                    <h3 className="font-display text-3xl">What lights you up?</h3>
                    <p className="text-muted-foreground">Pick as many as you like.</p>
                    <div className="grid sm:grid-cols-3 gap-3">
                      {interests.map((i) => {
                        const on = data.interests.includes(i.label);
                        return (
                          <button key={i.label} type="button" onClick={() => toggleInterest(i.label)} className={`p-5 border text-left transition-all ${on ? "bg-primary-deep text-white border-primary-deep" : "border-border hover:border-foreground"}`}>
                            <i.icon className={`h-6 w-6 mb-3 ${on ? "text-accent" : "text-accent"}`} />
                            <div className="font-display text-lg leading-tight">{i.label}</div>
                            {on && <Check className="h-4 w-4 text-accent mt-2" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
                {step === 2 && (
                  <div className="space-y-8">
                    <h3 className="font-display text-3xl">Budget & style</h3>
                    <div className="grid sm:grid-cols-3 gap-4">
                      {["Comfort", "Premium", "Luxury"].map((b) => (
                        <Choice key={b} active={data.budget === b} onClick={() => setData({ ...data, budget: b })}>
                          <div className="font-display text-2xl">{b}</div>
                          <div className="font-mono-accent text-[10px] text-muted-foreground mt-1">
                            {b === "Comfort" ? "€120/day" : b === "Premium" ? "€280/day" : "€600/day"}
                          </div>
                        </Choice>
                      ))}
                    </div>
                    <Field label="Anything else we should know?">
                      <textarea rows={4} maxLength={1000} value={data.notes} onChange={(e) => setData({ ...data, notes: e.target.value })} className="input resize-none" placeholder="Special occasions, dietary needs, dream moments…" />
                    </Field>
                  </div>
                )}
                {step === 3 && (
                  <div className="space-y-8">
                    <h3 className="font-display text-3xl">Where shall we send your itinerary?</h3>
                    <Field label="Your name">
                      <input value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} className="input" maxLength={80} required />
                    </Field>
                    <Field label="Email">
                      <input type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} className="input" maxLength={255} required />
                    </Field>
                    <p className="font-serif text-muted-foreground">We never share your details. Promise.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between gap-4 mt-12 pt-8 border-t border-border">
              <button onClick={back} disabled={step === 0} className="font-mono-accent text-[11px] text-muted-foreground disabled:opacity-30 hover:text-foreground transition-colors">← Back</button>
              {step < 3 ? (
                <button onClick={next} className="btn-gold">Next step</button>
              ) : (
                <button onClick={submit} className="btn-gold"><Mail className="h-4 w-4" /> Send my dream</button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container-edge max-w-3xl">
          <Reveal>
            <div className="font-mono-accent text-[11px] text-accent mb-4">◆ Common questions</div>
          </Reveal>
          <Reveal delay={0.1} as="h2">
            <h2 className="font-display text-5xl md:text-6xl text-architectural mb-12">Things travellers often ask.</h2>
          </Reveal>
          <div className="divide-y divide-border border-t border-b border-border">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q}>
                  <button onClick={() => setOpen(isOpen ? null : i)} className="w-full flex items-center justify-between text-left py-6 group">
                    <span className="font-display text-2xl pr-6">{f.q}</span>
                    <ChevronDown className={`h-5 w-5 shrink-0 transition-transform duration-500 ${isOpen ? "rotate-180 text-accent" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4 }} className="overflow-hidden">
                        <p className="font-serif text-lg text-muted-foreground leading-relaxed pb-6 pr-12">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block">
    <span className="font-mono-accent text-[10px] text-muted-foreground block mb-2">{label}</span>
    {children}
  </label>
);

const Choice = ({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) => (
  <button type="button" onClick={onClick} className={`p-5 border text-center transition-all ${active ? "bg-primary-deep text-white border-primary-deep" : "border-border hover:border-foreground"}`}>
    {children}
  </button>
);

export default Custom;
