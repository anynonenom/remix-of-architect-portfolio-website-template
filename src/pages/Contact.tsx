import { useState } from "react";
import { z } from "zod";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import { Seo } from "@/components/Seo";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Mail, Phone, MapPin, Send, Clock4, Instagram, Facebook } from "lucide-react";
import ResultDialog, { initialResult, type ResultDialogState } from "@/components/ResultDialog";
import heroImg from "@/assets/hero-contact.jpg";

const schema = z.object({
  name: z.string().trim().min(2, "Please tell us your name").max(80),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  subject: z.string().trim().min(2, "Please add a subject").max(120),
  message: z.string().trim().min(10, "A few more words please").max(1000),
});

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResultDialogState>(initialResult);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      setResult({
        open: true,
        status: "error",
        title: "We couldn't send your message",
        description: r.error.issues[0].message || "Please review the form and try again.",
      });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setResult({
        open: true,
        status: "success",
        title: "Message received ✦",
        description: "Thank you. Our concierge will reply within 24 hours — usually a lot sooner.",
      });
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      setLoading(false);
    }, 700);
  };

  return (
    <Layout>
      <Seo title="Contact — Bo Voyages" description="Get in touch with the Bo Voyages concierge team. Email, call or send us a message — we respond within 24 hours." path="/contact" />
      <PageHero image={heroImg} eyebrow="◆ Get in touch" title={<>Hello, <em className="text-accent not-italic">marhaba</em>.</>} subtitle="Tell us about the journey forming in your head. We'll write back with mint tea in hand." />

      <section className="py-24 bg-background">
        <div className="container-edge">
          <Stagger className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: Mail, label: "Email", value: "hello@bovoyages.com", href: "mailto:hello@bovoyages.com" },
              { icon: Phone, label: "Phone", value: "+212 5 00 00 00 00", href: "tel:+212500000000" },
              { icon: MapPin, label: "Studio", value: "Marrakech Medina, Morocco", href: "#" },
            ].map((c) => (
              <StaggerItem key={c.label}>
                <a href={c.href} className="group block p-8 bg-secondary border border-border hover:border-accent transition-colors duration-500">
                  <c.icon className="h-7 w-7 text-accent mb-5" />
                  <div className="font-mono-accent text-[10px] text-muted-foreground mb-1">{c.label}</div>
                  <div className="font-display text-2xl">{c.value}</div>
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-secondary">
        <div className="container-edge grid lg:grid-cols-2 gap-12 lg:gap-20">
          <Reveal>
            <form onSubmit={submit} className="space-y-6">
              <div className="font-mono-accent text-[11px] text-accent mb-4">◆ Send a message</div>
              <h2 className="font-display text-5xl md:text-6xl text-architectural mb-8">Write to us.</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <Field label="Name"><input className="input" maxLength={80} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></Field>
                <Field label="Email"><input type="email" className="input" maxLength={255} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></Field>
                <Field label="Phone (optional)"><input className="input" maxLength={40} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></Field>
                <Field label="Subject"><input className="input" maxLength={120} value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required /></Field>
              </div>
              <Field label="Message"><textarea rows={6} className="input resize-none" maxLength={1000} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required /></Field>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
                <div className="font-mono-accent text-[10px] text-muted-foreground flex items-center gap-2"><Clock4 className="h-3 w-3" /> We respond within 24 hours</div>
                <button type="submit" disabled={loading} className="btn-gold disabled:opacity-50">
                  <Send className="h-4 w-4" /> {loading ? "Sending…" : "Send message"}
                </button>
              </div>
            </form>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="space-y-8">
              <div className="aspect-[4/3] overflow-hidden">
                <iframe title="Bo Voyages location, Marrakech" src="https://www.openstreetmap.org/export/embed.html?bbox=-8.0247%2C31.6260%2C-7.9747%2C31.6510&layer=mapnik" className="w-full h-full" loading="lazy" />
              </div>
              <div className="bg-background p-8 border border-border">
                <div className="font-mono-accent text-[11px] text-accent mb-4">◆ Office hours</div>
                <ul className="font-serif text-lg space-y-2 text-foreground">
                  <li className="flex justify-between"><span>Monday — Friday</span><span className="text-muted-foreground">9:00 — 19:00</span></li>
                  <li className="flex justify-between"><span>Saturday</span><span className="text-muted-foreground">10:00 — 16:00</span></li>
                  <li className="flex justify-between"><span>Sunday</span><span className="text-muted-foreground">By appointment</span></li>
                </ul>
                <div className="flex items-center gap-3 mt-8 pt-8 border-t border-border">
                  <span className="font-mono-accent text-[10px] text-muted-foreground">Follow along</span>
                  <a href="#" aria-label="Instagram" className="h-10 w-10 grid place-items-center border border-border rounded-full hover:bg-accent hover:border-accent hover:text-primary-deep transition-colors"><Instagram className="h-4 w-4" /></a>
                  <a href="#" aria-label="Facebook" className="h-10 w-10 grid place-items-center border border-border rounded-full hover:bg-accent hover:border-accent hover:text-primary-deep transition-colors"><Facebook className="h-4 w-4" /></a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

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

export default Contact;
