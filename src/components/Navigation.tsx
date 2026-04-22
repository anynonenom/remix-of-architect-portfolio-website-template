import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "@/assets/bo-voyages-logo.png";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";

const links = [
  { to: "/", label: "Home" },
  { to: "/tours", label: "Tours" },
  { to: "/excursions", label: "Excursions" },
  { to: "/transfers", label: "Transfers" },
  { to: "/custom", label: "Custom" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const onHero = pathname === "/" && !scrolled;

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter,box-shadow] duration-500",
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-elegant" : "bg-transparent",
      )}
    >
      <div className="container-edge flex items-center justify-between py-4 md:py-5">
        <Link to="/" className="flex items-center gap-3 group">
          <div className={cn(
            "relative h-11 w-11 grid place-items-center rounded-full transition-colors duration-500",
            onHero ? "bg-white/95" : "bg-primary-deep",
          )}>
            <img src={logo} alt="Bo Voyages" className="h-9 w-9 object-contain" width={36} height={36} />
          </div>
          <div className="hidden sm:block">
            <div className={cn(
              "font-display text-2xl leading-none transition-colors duration-500",
              onHero ? "text-white" : "text-primary-deep",
            )}>Bo Voyages</div>
            <div className={cn(
              "font-mono-accent text-[10px] mt-1 transition-colors duration-500",
              onHero ? "text-white/70" : "text-muted-foreground",
            )}>Morocco · Curated Journeys</div>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-9">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) => cn(
                "font-mono-accent text-[11px] link-underline transition-colors duration-500",
                onHero ? "text-white/85 hover:text-white" : "text-foreground/70 hover:text-foreground",
                isActive && (onHero ? "text-white" : "text-foreground"),
              )}
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle variant={onHero ? "ghost-light" : "default"} className="hidden sm:grid" />
          <Link
            to="/contact"
            className={cn(
              "hidden lg:inline-flex font-mono-accent text-[11px] px-5 py-3 transition-all duration-500",
              "bg-accent text-accent-foreground hover:shadow-gold hover:-translate-y-0.5",
            )}
          >
            Plan a journey
          </Link>

          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className={cn(
              "lg:hidden h-10 w-10 grid place-items-center rounded-full transition-colors",
              onHero ? "text-white" : "text-foreground",
            )}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-primary-deep/60 backdrop-blur-sm z-50"
            />
            <motion.aside
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 w-[88%] max-w-md bg-background z-50 flex flex-col p-8"
            >
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-3">
                  <img src={logo} alt="" className="h-10 w-10" />
                  <span className="font-display text-2xl">Bo Voyages</span>
                </div>
                <button onClick={() => setOpen(false)} aria-label="Close" className="h-10 w-10 grid place-items-center">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 flex flex-col gap-1">
                {links.map((l, i) => (
                  <motion.div
                    key={l.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
                  >
                    <NavLink
                      to={l.to}
                      end={l.to === "/"}
                      className={({ isActive }) => cn(
                        "block font-display text-4xl py-3 transition-colors",
                        isActive ? "text-accent" : "text-foreground hover:text-accent",
                      )}
                    >
                      {l.label}
                    </NavLink>
                  </motion.div>
                ))}
              </div>
              <Link to="/contact" className="btn-gold mt-8">Plan a journey</Link>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
