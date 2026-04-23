import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MapPin, CalendarDays, Users, Search } from "lucide-react";
import { tours } from "@/data/tours";
import ResultDialog, { initialResult, type ResultDialogState } from "@/components/ResultDialog";

const destinations = ["Sahara", "Imperial cities", "Atlas", "Coast", "Culture", "Marrakech"];

const HeroBooking = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("Sahara");
  const [date, setDate] = useState("");
  const [travellers, setTravellers] = useState(2);
  const [result, setResult] = useState<ResultDialogState>(initialResult);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!date) {
      setResult({
        open: true,
        status: "error",
        title: "Pick a date first",
        description: "Please choose when you'd like to travel so we can match you with the right journeys.",
      });
      return;
    }

    const match = tours.find((t) => t.region === destination);
    setResult({
      open: true,
      status: "success",
      title: "Journey ready to explore ✦",
      description: match
        ? `We found a perfect match in ${destination} for ${travellers} traveller(s) on ${new Date(date).toLocaleDateString()}. Opening the itinerary now…`
        : `We'll show you all available journeys for ${travellers} traveller(s) on ${new Date(date).toLocaleDateString()}.`,
    });

    setTimeout(() => {
      if (match) {
        navigate(`/tours/${match.slug}?date=${encodeURIComponent(date)}&pax=${travellers}`);
      } else {
        navigate(`/tours`);
      }
    }, 1400);
  };

  return (
    <>
      <motion.form
        onSubmit={onSearch}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="mt-12 max-w-4xl bg-background/95 backdrop-blur-md shadow-architectural border border-white/20"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border">
          <Field icon={<MapPin className="h-4 w-4" />} label="Destination">
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-transparent font-display text-lg text-foreground focus:outline-none cursor-pointer"
            >
              {destinations.map((d) => <option key={d}>{d}</option>)}
            </select>
          </Field>
          <Field icon={<CalendarDays className="h-4 w-4" />} label="When">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-transparent font-display text-lg text-foreground focus:outline-none"
            />
          </Field>
          <Field icon={<Users className="h-4 w-4" />} label="Travellers">
            <input
              type="number"
              min={1}
              max={20}
              value={travellers}
              onChange={(e) => setTravellers(parseInt(e.target.value || "1"))}
              className="w-full bg-transparent font-display text-lg text-foreground focus:outline-none"
            />
          </Field>
          <button
            type="submit"
            className="bg-accent text-accent-foreground flex items-center justify-center gap-3 font-mono-accent text-xs px-6 py-6 hover:bg-primary-deep hover:text-white transition-colors duration-500 group"
          >
            <Search className="h-4 w-4 transition-transform duration-500 group-hover:rotate-90" />
            Search journeys
          </button>
        </div>
      </motion.form>

      <ResultDialog
        state={result}
        onOpenChange={(open) => setResult((s) => ({ ...s, open }))}
        ctaLabel={result.status === "success" ? "Take me there" : "Try again"}
      />
    </>
  );
};

const Field = ({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) => (
  <label className="block px-6 py-5 hover:bg-accent/5 transition-colors duration-300 cursor-pointer">
    <div className="flex items-center gap-2 font-mono-accent text-[10px] text-accent mb-2">
      {icon}
      {label}
    </div>
    {children}
  </label>
);

export default HeroBooking;
