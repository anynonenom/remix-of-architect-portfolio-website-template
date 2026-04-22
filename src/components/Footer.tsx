import { Link } from "react-router-dom";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/bo-voyages-logo.png";

const Footer = () => {
  return (
    <footer className="relative bg-primary-deep text-white overflow-hidden">
      <div className="absolute inset-0 gold-overlay opacity-60" aria-hidden />
      <div className="container-edge relative py-20 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 bg-white/95 rounded-full grid place-items-center">
              <img src={logo} alt="Bo Voyages" className="h-11 w-11" width={44} height={44} />
            </div>
            <div>
              <div className="font-display text-3xl">Bo Voyages</div>
              <div className="font-mono-accent text-[10px] text-white/60">Morocco · Curated Journeys</div>
            </div>
          </div>
          <p className="font-serif text-xl text-white/80 leading-relaxed max-w-md">
            Cinematic journeys, slow mornings in old medinas and starlit nights in the Sahara — handcrafted across Morocco.
          </p>
          <div className="flex items-center gap-3 pt-2">
            {[Instagram, Facebook].map((Icon, i) => (
              <a key={i} href="#" aria-label="Social" className="h-10 w-10 grid place-items-center border border-white/20 rounded-full hover:bg-accent hover:text-primary-deep hover:border-accent transition-colors duration-500">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="font-mono-accent text-[10px] text-accent mb-5">Explore</div>
          <ul className="space-y-3 font-serif text-lg">
            <li><Link to="/tours" className="link-underline">Signature tours</Link></li>
            <li><Link to="/excursions" className="link-underline">Day excursions</Link></li>
            <li><Link to="/transfers" className="link-underline">Private transfers</Link></li>
            <li><Link to="/custom" className="link-underline">Custom journeys</Link></li>
            <li><Link to="/about" className="link-underline">Our story</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-4">
          <div className="font-mono-accent text-[10px] text-accent mb-5">Get in touch</div>
          <ul className="space-y-4 text-white/80">
            <li className="flex items-start gap-3"><MapPin className="h-4 w-4 mt-1 text-accent" /> <span>Marrakech Medina, Morocco</span></li>
            <li className="flex items-start gap-3"><Mail className="h-4 w-4 mt-1 text-accent" /> <a href="mailto:hello@bovoyages.com" className="link-underline">hello@bovoyages.com</a></li>
            <li className="flex items-start gap-3"><Phone className="h-4 w-4 mt-1 text-accent" /> <a href="tel:+212500000000" className="link-underline">+212 5 00 00 00 00</a></li>
          </ul>
        </div>
      </div>
      <div className="container-edge relative border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="font-mono-accent text-[10px] text-white/50">© {new Date().getFullYear()} Bo Voyages — All journeys reserved.</div>
        <div className="font-mono-accent text-[10px] text-white/50">Crafted with mint tea in Morocco</div>
      </div>
    </footer>
  );
};

export default Footer;
