import { useState } from "react";
import { z } from "zod";
import { Reveal } from "@/components/motion/Reveal";
import { toast } from "@/hooks/use-toast";

const schema = z.object({
  email: z.string().trim().email("Please enter a valid email").max(255),
});

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse({ email });
    if (!r.success) {
      toast({ title: "Invalid email", description: r.error.issues[0].message, variant: "destructive" });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      toast({ title: "Welcome aboard ✦", description: "We'll send you stories from the road, never spam." });
      setEmail("");
      setLoading(false);
    }, 600);
  };

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container-edge max-w-3xl text-center">
        <Reveal>
          <div className="font-mono-accent text-[11px] text-accent mb-4">◆ Field notes</div>
        </Reveal>
        <Reveal delay={0.1} as="h2">
          <h2 className="font-display text-4xl md:text-5xl text-architectural mb-5">
            Postcards from Morocco, in your inbox.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="font-serif text-lg text-muted-foreground mb-10 leading-relaxed">
            One slow letter a month — hidden riads, off-season weather, recipes from the souk.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={255}
              placeholder="your@email.com"
              required
              aria-label="Email address"
              className="flex-1 bg-transparent border-b border-foreground/30 px-2 py-3 focus:outline-none focus:border-accent transition-colors text-lg"
            />
            <button type="submit" disabled={loading} className="btn-gold disabled:opacity-50">
              {loading ? "Sending…" : "Subscribe"}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
};

export default Newsletter;
