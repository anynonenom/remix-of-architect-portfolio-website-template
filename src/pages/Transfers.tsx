import { useMemo, useState } from "react";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import { Seo } from "@/components/Seo";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Plane, MapPin, Users, Car, ChevronLeft, ChevronRight, ShieldCheck, Clock4, BadgeCheck } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import heroImg from "@/assets/hero-transfers.jpg";

const types = [
  { icon: Plane, title: "Airport transfers", body: "Door-to-door from Casablanca, Marrakech, Fes and Rabat airports." },
  { icon: MapPin, title: "Inter-city transfers", body: "Comfortable rides between Morocco's cities and oases." },
  { icon: Users, title: "Group shuttles", body: "Vans up to 16 seats for families, weddings and small groups." },
  { icon: Car, title: "Private drivers", body: "Multi-day private chauffeurs who double as local hosts." },
];

const fleet = [
  { name: "Mercedes E-Class", seats: 3, luggage: 3, image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=900&q=80" },
  { name: "Mercedes V-Class", seats: 6, luggage: 6, image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=900&q=80" },
  { name: "Toyota Land Cruiser", seats: 4, luggage: 4, image: "https://images.unsplash.com/photo-1519440232151-3a76dadcdf09?w=900&q=80" },
  { name: "Mini-Bus 16 seats", seats: 16, luggage: 16, image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=900&q=80" },
];

const cities = ["Marrakech", "Casablanca", "Fes", "Rabat", "Essaouira", "Chefchaouen", "Merzouga", "Ouarzazate"];

const schema = z.object({
  from: z.string().trim().min(2).max(80),
  to: z.string().trim().min(2).max(80),
  date: z.string().min(1),
  pax: z.number().min(1).max(16),
  vehicle: z.string(),
});

const Transfers = () => {
  const [from, setFrom] = useState("Marrakech Airport (RAK)");
  const [to, setTo] = useState("Marrakech Medina");
  const [date, setDate] = useState("");
  const [pax, setPax] = useState(2);
  const [vehicle, setVehicle] = useState("Mercedes E-Class");
  const [fleetIndex, setFleetIndex] = useState(0);

  const price = useMemo(() => {
    const base: Record<string, number> = {
      "Mercedes E-Class": 45,
      "Mercedes V-Class": 75,
      "Toyota Land Cruiser": 90,
      "Mini-Bus 16 seats": 140,
    };
    return base[vehicle] + Math.max(0, pax - 1) * 8;
  }, [vehicle, pax]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse({ from, to, date, pax, vehicle });
    if (!r.success) {
      toast({ title: "Please complete the form", description: r.error.issues[0].message, variant: "destructive" });
      return;
    }
    toast({ title: "Transfer requested ✦", description: `${from} → ${to} on ${date} for ${pax} pax. We'll confirm within an hour.` });
  };

  return (
    <Layout>
      <Seo
        title="Private Transfers across Morocco — Bo Voyages"
        description="Airport pickups, inter-city rides and multi-day private drivers. Premium fleet, English-speaking drivers, instant quotes."
        path="/transfers"
      />
      <PageHero
        image={heroImg}
        eyebrow="◆ Private transfers"
        title={<>Glide between worlds, <em className="text-accent not-italic">in comfort</em>.</>}
        subtitle="Premium vehicles, English-speaking drivers, and the kind of punctuality that lets you stop watching the clock."
      />

      <section className="py-24 bg-background">
        <div className="container-edge">
          <Reveal>
            <div className="font-mono-accent text-[11px] text-accent mb-4">◆ How we move you</div>
          </Reveal>
          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {types.map((t) => (
              <StaggerItem key={t.title}>
                <div className="p-8 bg-card border border-border h-full hover:border-accent transition-colors duration-500 group">
                  <div className="h-12 w-12 grid place-items-center bg-accent/10 text-accent mb-6 group-hover:bg-accent group-hover:text-primary-deep transition-colors duration-500">
                    <t.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-2xl mb-3">{t.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{t.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Booking engine */}
      <section className="py-24 md:py-32 bg-secondary">
        <div className="container-edge grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="font-mono-accent text-[11px] text-accent mb-4">◆ Instant quote</div>
            </Reveal>
            <Reveal delay={0.1} as="h2">
              <h2 className="font-display text-5xl md:text-6xl text-architectural mb-6">Tell us where, we tell you when.</h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-serif text-lg text-muted-foreground leading-relaxed">
                Choose your route, pax and vehicle — see your price live and lock the booking in under a minute.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="lg:col-span-7">
            <form onSubmit={submit} className="bg-background p-8 md:p-10 shadow-architectural border border-border space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <Field label="From">
                  <select value={from} onChange={(e) => setFrom(e.target.value)} className="input">
                    {cities.concat(["Marrakech Airport (RAK)", "Casablanca Airport (CMN)"]).map((c) => <option key={c}>{c}</option>)}
                  </select>
                </Field>
                <Field label="To">
                  <select value={to} onChange={(e) => setTo(e.target.value)} className="input">
                    {cities.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </Field>
                <Field label="Date & time">
                  <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} className="input" required />
                </Field>
                <Field label="Passengers">
                  <input type="number" min={1} max={16} value={pax} onChange={(e) => setPax(parseInt(e.target.value || "1"))} className="input" />
                </Field>
              </div>
              <Field label="Vehicle">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {fleet.map((v) => (
                    <button
                      type="button"
                      key={v.name}
                      onClick={() => setVehicle(v.name)}
                      className={`text-left p-3 border transition-all ${
                        vehicle === v.name ? "border-accent bg-accent/10" : "border-border hover:border-foreground"
                      }`}
                    >
                      <div className="font-mono-accent text-[10px] text-muted-foreground mb-1">{v.seats} seats</div>
                      <div className="font-display text-base leading-tight">{v.name}</div>
                    </button>
                  ))}
                </div>
              </Field>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border">
                <div>
                  <div className="font-mono-accent text-[10px] text-muted-foreground">Estimated price</div>
                  <div className="font-display text-4xl text-primary-deep">€{price}</div>
                </div>
                <button type="submit" className="btn-gold w-full sm:w-auto">Request transfer</button>
              </div>
            </form>
          </Reveal>
        </div>
      </section>

      {/* Fleet carousel */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container-edge">
          <div className="flex items-end justify-between gap-6 mb-12">
            <Reveal>
              <div>
                <div className="font-mono-accent text-[11px] text-accent mb-4">◆ The fleet</div>
                <h2 className="font-display text-5xl md:text-6xl text-architectural">Quietly capable.</h2>
              </div>
            </Reveal>
            <div className="flex gap-3">
              <button onClick={() => setFleetIndex((i) => (i - 1 + fleet.length) % fleet.length)} aria-label="Previous" className="h-11 w-11 grid place-items-center border border-border hover:bg-primary-deep hover:text-white transition-colors"><ChevronLeft className="h-4 w-4" /></button>
              <button onClick={() => setFleetIndex((i) => (i + 1) % fleet.length)} aria-label="Next" className="h-11 w-11 grid place-items-center border border-border hover:bg-primary-deep hover:text-white transition-colors"><ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>
          <Reveal>
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="aspect-[4/3] overflow-hidden bg-secondary">
                <img key={fleet[fleetIndex].image} src={fleet[fleetIndex].image} alt={fleet[fleetIndex].name} loading="lazy" className="h-full w-full object-cover animate-scale-in" />
              </div>
              <div>
                <div className="font-mono-accent text-[10px] text-accent mb-3">0{fleetIndex + 1} / 0{fleet.length}</div>
                <h3 className="font-display text-5xl mb-4">{fleet[fleetIndex].name}</h3>
                <p className="font-serif text-lg text-muted-foreground leading-relaxed mb-8">
                  Air-conditioned, professionally maintained, with bottled water, charging cables and Wi-Fi as standard.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <Stat label="Seats" value={fleet[fleetIndex].seats.toString()} />
                  <Stat label="Luggage" value={fleet[fleetIndex].luggage.toString()} />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 bg-secondary">
        <div className="container-edge grid md:grid-cols-3 gap-8">
          {[
            { icon: ShieldCheck, t: "Vetted drivers", b: "Background-checked, English-speaking, locally beloved." },
            { icon: Clock4, t: "On-time, every time", b: "Live flight tracking and 24/7 dispatch." },
            { icon: BadgeCheck, t: "Fixed prices", b: "No surge, no hidden fees — what you see is what you pay." },
          ].map((p) => (
            <Reveal key={p.t}>
              <div className="p-8">
                <p.icon className="h-8 w-8 text-accent mb-5" />
                <h3 className="font-display text-2xl mb-2">{p.t}</h3>
                <p className="text-muted-foreground leading-relaxed">{p.b}</p>
              </div>
            </Reveal>
          ))}
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

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="border-l border-accent pl-4">
    <div className="font-mono-accent text-[10px] text-muted-foreground">{label}</div>
    <div className="font-display text-3xl">{value}</div>
  </div>
);

export default Transfers;
