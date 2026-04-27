import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import PageCta from "@/components/PageCta";
import { Seo } from "@/components/Seo";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import {
  Plane,
  MapPin,
  Users,
  Car,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Clock4,
  BadgeCheck,
  Briefcase,
  Wifi,
  Snowflake,
  Music2,
  Crown,
  Mountain,
  Bus,
  Bike,
  Sparkles,
} from "lucide-react";
import { z } from "zod";
import ResultDialog, { initialResult, type ResultDialogState } from "@/components/ResultDialog";
import sedanImg from "@/assets/fleet-sedan.jpg";
import vanImg from "@/assets/fleet-van.jpg";
import suvImg from "@/assets/fleet-suv.jpg";
import fourByFourImg from "@/assets/fleet-4x4.jpg";
import minibusImg from "@/assets/fleet-minibus.jpg";
import coachImg from "@/assets/fleet-coach.jpg";
import limoImg from "@/assets/fleet-limo.jpg";
import convertibleImg from "@/assets/fleet-convertible.jpg";
import bikeImg from "@/assets/fleet-bike.jpg";
import heroImg from "@/assets/hero-transfers.jpg";

const types = [
  { icon: Plane, title: "Airport transfers", body: "Door-to-door from Casablanca, Marrakech, Fes and Rabat airports." },
  { icon: MapPin, title: "Inter-city transfers", body: "Comfortable rides between Morocco's cities and oases." },
  { icon: Users, title: "Group shuttles", body: "Vans up to 50 seats for families, weddings and corporate groups." },
  { icon: Car, title: "Private drivers", body: "Multi-day private chauffeurs who double as local hosts." },
];

type Vehicle = {
  name: string;
  category: string;
  seats: number;
  luggage: number;
  basePrice: number;
  image: string;
  description: string;
  features: string[];
  icon: typeof Car;
  badge?: string;
};

const fleet: Vehicle[] = [
  {
    name: "Mercedes E-Class",
    category: "Executive Sedan",
    seats: 3,
    luggage: 3,
    basePrice: 45,
    image: sedanImg,
    description: "Refined city sedan for couples and business travellers — quiet, leather-clad, perfectly air-conditioned.",
    features: ["Leather interior", "Bottled water", "Wi-Fi", "Phone chargers"],
    icon: Car,
  },
  {
    name: "Mercedes S-Class",
    category: "Luxury Limousine",
    seats: 3,
    luggage: 3,
    basePrice: 95,
    image: limoImg,
    description: "Top-tier executive comfort for VIP arrivals, weddings and special evenings out.",
    features: ["Massage seats", "Champagne service", "Privacy glass", "Red carpet welcome"],
    icon: Crown,
    badge: "VIP",
  },
  {
    name: "Mercedes V-Class",
    category: "Premium Van",
    seats: 6,
    luggage: 6,
    basePrice: 75,
    image: vanImg,
    description: "Spacious cabin with captain seats — ideal for families and small groups touring the imperial cities.",
    features: ["Captain seats", "Panoramic roof", "USB ports", "Climate zones"],
    icon: Users,
  },
  {
    name: "Mercedes G-Class",
    category: "Luxury SUV",
    seats: 4,
    luggage: 4,
    basePrice: 110,
    image: suvImg,
    description: "Iconic statement SUV combining off-road capability with luxury — perfect for Atlas day trips in style.",
    features: ["All-wheel drive", "Heated seats", "Premium sound", "Off-road ready"],
    icon: Mountain,
    badge: "Premium",
  },
  {
    name: "Toyota Land Cruiser",
    category: "4x4 Adventure",
    seats: 4,
    luggage: 4,
    basePrice: 90,
    image: fourByFourImg,
    description: "Battle-tested desert workhorse — the right vehicle for Sahara dunes, Atlas passes and remote tracks.",
    features: ["4x4 capable", "Roof rack", "Cool box", "Sand recovery kit"],
    icon: Mountain,
  },
  {
    name: "Mercedes Sprinter",
    category: "Mini-Bus 16 seats",
    seats: 16,
    luggage: 16,
    basePrice: 140,
    image: minibusImg,
    description: "High-roof minibus with plush reclining seats for medium groups, weddings and incentive travel.",
    features: ["Reclining seats", "Onboard fridge", "PA system", "Tinted windows"],
    icon: Users,
  },
  {
    name: "Luxury Coach",
    category: "50-seat Touring Bus",
    seats: 50,
    luggage: 50,
    basePrice: 320,
    image: coachImg,
    description: "Full-size touring coach for conferences, large groups and multi-city itineraries across Morocco.",
    features: ["Toilet onboard", "Reclining seats", "TV screens", "Wi-Fi & USB"],
    icon: Bus,
  },
  {
    name: "Classic Cabriolet",
    category: "Vintage Convertible",
    seats: 2,
    luggage: 2,
    basePrice: 180,
    image: convertibleImg,
    description: "A romantic convertible for coastal drives between Essaouira and Agadir — top down, wind in your hair.",
    features: ["Convertible top", "Picnic basket", "Photo stops", "Driver guide"],
    icon: Sparkles,
    badge: "Iconic",
  },
  {
    name: "BMW GS 1250",
    category: "Adventure Motorbike",
    seats: 1,
    luggage: 1,
    basePrice: 130,
    image: bikeImg,
    description: "For solo riders craving the open desert. Comes with helmet, panniers, support vehicle and route notes.",
    features: ["Full kit included", "Support van", "Insurance", "GPS routes"],
    icon: Bike,
  },
];

const cities = ["Marrakech", "Casablanca", "Fes", "Rabat", "Essaouira", "Chefchaouen", "Merzouga", "Ouarzazate"];

const schema = z.object({
  from: z.string().trim().min(2).max(80),
  to: z.string().trim().min(2).max(80),
  date: z.string().min(1, "Please pick a date and time"),
  pax: z.number().min(1).max(50),
  vehicle: z.string(),
});

const Transfers = () => {
  const [from, setFrom] = useState("Marrakech Airport (RAK)");
  const [to, setTo] = useState("Marrakech Medina");
  const [date, setDate] = useState("");
  const [pax, setPax] = useState(2);
  const [vehicle, setVehicle] = useState(fleet[0].name);
  const [fleetIndex, setFleetIndex] = useState(0);
  const [result, setResult] = useState<ResultDialogState>(initialResult);

  const price = useMemo(() => {
    const v = fleet.find((f) => f.name === vehicle) ?? fleet[0];
    return v.basePrice + Math.max(0, pax - 1) * 8;
  }, [vehicle, pax]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse({ from, to, date, pax, vehicle });
    if (!r.success) {
      setResult({
        open: true,
        status: "error",
        title: "We couldn't send your request",
        description: r.error.issues[0].message || "Please review the form and try again.",
      });
      return;
    }
    setResult({
      open: true,
      status: "success",
      title: "Transfer requested ✦",
      description: `${from} → ${to} on ${new Date(date).toLocaleString()} for ${pax} passenger(s) in a ${vehicle}. Our concierge will confirm within the hour.`,
    });
  };

  return (
    <Layout>
      <Seo
        title="Private Transfers across Morocco — Bo Voyages"
        description="Airport pickups, inter-city rides and multi-day private drivers. Premium fleet from sedans to coaches, English-speaking drivers, instant quotes."
        path="/transfers"
      />
      <PageHero
        image={heroImg}
        eyebrow="◆ Private transfers"
        title={<>Glide between worlds, <em className="text-accent not-italic">in comfort</em>.</>}
        subtitle="Premium vehicles, English-speaking drivers, and the kind of punctuality that lets you stop watching the clock."
      />

      {/* 1. Service types — orient: what can we do for you? */}
      <section className="py-20 md:py-24 bg-background">
        <div className="container-edge">
          <div className="max-w-2xl mb-12">
            <Reveal>
              <div className="font-mono-accent text-[11px] text-accent mb-4">◆ How we move you</div>
            </Reveal>
            <Reveal delay={0.1} as="h2">
              <h2 className="font-display text-4xl md:text-6xl text-architectural">
                Four ways to <span className="font-script text-accent text-5xl md:text-7xl">travel</span> with us.
              </h2>
            </Reveal>
          </div>
          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* 2. Full fleet — browse before booking */}
      <section id="fleet" className="py-24 md:py-32 bg-secondary">
        <div className="container-edge">
          <Reveal>
            <div className="font-mono-accent text-[11px] text-accent mb-4">◆ The full fleet</div>
          </Reveal>
          <Reveal delay={0.1} as="h2">
            <h2 className="font-display text-5xl md:text-6xl text-architectural mb-4 max-w-3xl">Every vehicle, every journey.</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="font-serif text-lg text-muted-foreground max-w-2xl mb-16">
              From quiet executive sedans to 50-seat luxury coaches and adventure motorbikes — pick the wheels that fit the story you're writing.
            </p>
          </Reveal>

          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fleet.map((v) => (
              <StaggerItem key={v.name}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="group bg-card border border-border overflow-hidden h-full flex flex-col"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                    <img
                      src={v.image}
                      alt={v.name}
                      loading="lazy"
                      width={1024}
                      height={768}
                      className="h-full w-full object-cover transition-transform duration-[1400ms] ease-smooth group-hover:scale-110"
                    />
                    {v.badge && (
                      <div className="absolute top-4 left-4 bg-accent text-accent-foreground font-mono-accent text-[10px] px-3 py-1.5 tracking-wider">
                        {v.badge}
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm font-mono-accent text-[10px] px-3 py-1.5 text-foreground">
                      from €{v.basePrice}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 font-mono-accent text-[10px] text-accent mb-3 tracking-wider">
                      <v.icon className="h-3.5 w-3.5" />
                      {v.category}
                    </div>
                    <h3 className="font-display text-2xl mb-2 leading-tight">{v.name}</h3>
                    <p className="font-serif text-base text-muted-foreground leading-relaxed mb-5 flex-1">
                      {v.description}
                    </p>
                    <div className="flex items-center gap-4 pb-4 border-b border-border mb-4 text-xs">
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <Users className="h-3.5 w-3.5 text-accent" /> {v.seats} pax
                      </span>
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <Briefcase className="h-3.5 w-3.5 text-accent" /> {v.luggage} bags
                      </span>
                    </div>
                    <ul className="space-y-1.5 mb-5">
                      {v.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="h-1 w-1 rounded-full bg-accent" /> {f}
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={() => {
                        setVehicle(v.name);
                        document.getElementById("booking")?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                      className="font-mono-accent text-[11px] tracking-wider text-foreground hover:text-accent transition-colors text-left link-underline w-fit"
                    >
                      Select & quote →
                    </button>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* 3. Featured spotlight — editorial look at one vehicle */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container-edge">
          <div className="flex items-end justify-between gap-6 mb-12">
            <Reveal>
              <div>
                <div className="font-mono-accent text-[11px] text-accent mb-4">◆ Spotlight</div>
                <h2 className="font-display text-5xl md:text-6xl text-architectural">Quietly capable.</h2>
              </div>
            </Reveal>
            <div className="flex gap-3">
              <button onClick={() => setFleetIndex((i) => (i - 1 + fleet.length) % fleet.length)} aria-label="Previous" className="h-11 w-11 grid place-items-center border border-border bg-background hover:bg-primary-deep hover:text-white transition-colors"><ChevronLeft className="h-4 w-4" /></button>
              <button onClick={() => setFleetIndex((i) => (i + 1) % fleet.length)} aria-label="Next" className="h-11 w-11 grid place-items-center border border-border bg-background hover:bg-primary-deep hover:text-white transition-colors"><ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>
          <Reveal>
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="aspect-[4/3] overflow-hidden bg-background">
                <img key={fleet[fleetIndex].image} src={fleet[fleetIndex].image} alt={fleet[fleetIndex].name} loading="lazy" width={1024} height={768} className="h-full w-full object-cover animate-scale-in" />
              </div>
              <div>
                <div className="font-mono-accent text-[10px] text-accent mb-3">{(fleetIndex + 1).toString().padStart(2, "0")} / {fleet.length.toString().padStart(2, "0")} · {fleet[fleetIndex].category}</div>
                <h3 className="font-display text-5xl mb-4">{fleet[fleetIndex].name}</h3>
                <p className="font-serif text-lg text-muted-foreground leading-relaxed mb-8">
                  {fleet[fleetIndex].description}
                </p>
                <div className="grid grid-cols-3 gap-6">
                  <Stat label="Seats" value={fleet[fleetIndex].seats.toString()} />
                  <Stat label="Luggage" value={fleet[fleetIndex].luggage.toString()} />
                  <Stat label="From" value={`€${fleet[fleetIndex].basePrice}`} />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setVehicle(fleet[fleetIndex].name);
                    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="btn-gold mt-10"
                >
                  Quote this vehicle
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4. Booking engine — now that they've seen the fleet */}
      <section id="booking" className="py-24 md:py-32 bg-secondary scroll-mt-24">
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
                Choose your route, passengers and vehicle — see your price live and lock the booking in under a minute.
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
                  <input type="number" min={1} max={50} value={pax} onChange={(e) => setPax(parseInt(e.target.value || "1"))} className="input" />
                </Field>
              </div>
              <Field label="Vehicle">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 max-h-[280px] overflow-y-auto pr-1">
                  {fleet.map((v) => (
                    <button
                      type="button"
                      key={v.name}
                      onClick={() => setVehicle(v.name)}
                      className={`text-left p-3 border transition-all ${
                        vehicle === v.name ? "border-accent bg-accent/10" : "border-border hover:border-foreground"
                      }`}
                    >
                      <div className="font-mono-accent text-[10px] text-muted-foreground mb-1">{v.seats} seats · €{v.basePrice}</div>
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

      {/* 5. Onboard amenities */}
      <section className="py-24 bg-background">
        <div className="container-edge">
          <Reveal>
            <div className="font-mono-accent text-[11px] text-accent mb-4 text-center">◆ Onboard, always</div>
          </Reveal>
          <Reveal delay={0.1} as="h2">
            <h2 className="font-display text-4xl md:text-5xl text-architectural text-center mb-16">Standard in every vehicle.</h2>
          </Reveal>
          <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Snowflake, label: "Climate control" },
              { icon: Wifi, label: "Onboard Wi-Fi" },
              { icon: Music2, label: "Curated playlists" },
              { icon: Briefcase, label: "Bottled water" },
            ].map((a) => (
              <StaggerItem key={a.label}>
                <div className="p-8 bg-secondary text-center hover:bg-primary-deep hover:text-white transition-colors duration-500 group">
                  <a.icon className="h-7 w-7 mx-auto mb-4 text-accent group-hover:text-accent" />
                  <div className="font-display text-lg">{a.label}</div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* 6. Trust strip */}
      <section className="py-24 bg-secondary">
        <div className="container-edge grid md:grid-cols-3 gap-8">
          {[
            { icon: ShieldCheck, t: "Vetted drivers", b: "Background-checked, English-speaking, locally beloved." },
            { icon: Clock4, t: "On-time, every time", b: "Live flight tracking and 24/7 dispatch." },
            { icon: BadgeCheck, t: "Fixed prices", b: "No surge, no hidden fees — what you see is what you pay." },
          ].map((p) => (
            <Reveal key={p.t}>
              <div className="p-8 bg-background border border-border h-full">
                <p.icon className="h-8 w-8 text-accent mb-5" />
                <h3 className="font-display text-2xl mb-2">{p.t}</h3>
                <p className="text-muted-foreground leading-relaxed">{p.b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 7. Closing CTA */}
      <PageCta
        image={heroImg}
        eyebrow="◆ Need more than a ride?"
        title={<>Pair your transfer with a <em className="text-accent">full journey</em>.</>}
        subtitle="Our drivers become guides, our rides become stories. Let's weave transport and tour into one seamless itinerary."
        ctaLabel="Build a custom journey"
        ctaTo="/custom"
        secondaryLabel="Browse signature tours"
        secondaryTo="/tours"
      />

      <ResultDialog
        state={result}
        onOpenChange={(open) => setResult((s) => ({ ...s, open }))}
        ctaLabel={result.status === "success" ? "Wonderful" : "Try again"}
      />
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
