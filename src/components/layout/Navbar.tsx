import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { XIcon, Search } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 80;
const NAVBAR_BACKGROUND = "rgba(255,255,255,0.96)";

const getNavLinks = (user: any) => {
  const baseLinks = [
    { label: "Destinations", href: "/destinations" },
    { label: "Explorer", href: "/carte" },
    { label: "Albums", href: "/albums" },
    { label: "Voyager", href: "/tripplanification" },
    { label: "Abonnements", href: "/pricing" },
  ];

  if (user) {
    baseLinks.push({ label: "Dashboard", href: "/dashboard" });
  } else {
    baseLinks.push({ label: "Connexion", href: "/login" });
  }

  return baseLinks;
};

// ─── Hamburger Icon ───────────────────────────────────────────────────────────
const HamburgerIcon = ({ open }: { open: boolean }) => (
  <div className="flex flex-col justify-center items-center w-5 h-5 gap-[5px]">
    <motion.span
      className="block h-[1.5px] w-5 bg-white/80 rounded-full origin-center"
      animate={open ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    />
    <motion.span
      className="block h-[1.5px] w-5 bg-white/80 rounded-full"
      animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.2 }}
    />
    <motion.span
      className="block h-[1.5px] w-5 bg-white/80 rounded-full origin-center"
      animate={open ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    />
  </div>
);

// ─── Mobile Menu ─────────────────────────────────────────────────────────────
const MobileMenu = ({
  open,
  onClose,
  navLinks,
}: {
  open: boolean;
  onClose: () => void;
  navLinks: { label: string; href: string }[];
}) => (
  <AnimatePresence>
    {open && (
      <>
        {/* Backdrop */}
        <motion.div
          aria-hidden
          className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        />

        {/* Drawer */}
        <motion.div
          id="menu-mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navigation"
          className="fixed top-0 right-0 z-[9999] flex h-full w-64 flex-col px-6 pb-8 pt-20"
          style={{
            background: "rgba(5,5,10,0.92)",
            borderLeft: "1px solid rgba(255,255,255,0.08)",
          }}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer le menu"
            className="absolute right-5 top-5 flex h-11 w-11 min-h-11 min-w-11 items-center justify-center rounded-full border border-white/10 text-white/50 transition-colors hover:border-white/30 hover:text-white touch-manipulation"
          >
            <XIcon className="h-4 w-4" aria-hidden />
          </button>

          {/* Logo dans le drawer */}
          <div className="mb-10 flex items-center gap-3">
            <Link
              to="/"
              onClick={onClose}
              className="flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 touch-manipulation"
              aria-label="AfriAtlas Travel, accueil"
            >
              <img
                src="/favicon.ico"
                alt=""
                width={32}
                height={32}
                className="h-12 bg-white w-12 rounded-full object-cover"
              />
              <span className="text-sm font-semibold uppercase tracking-widest text-white/90">
                AfriAtlas
              </span>
            </Link>
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-1" aria-label="Liens principaux">
            {navLinks.map(({ label, href }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.05 + i * 0.06,
                  duration: 0.35,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                <Link
                  to={href}
                  onClick={onClose}
                  className="block py-3 px-4 text-sm uppercase tracking-widest font-medium text-white/60 hover:text-white hover:bg-primary/5 rounded-lg transition-all"
                >
                  {label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Divider + footer */}
          <div className="mt-auto border-t border-white/8 pt-6">
            <p className="text-white/20 text-xs tracking-widest uppercase">
              AfriAtlas Travel
            </p>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

// ─── NavSearch ───────────────────────────────────────────────────────────────
const NavSearch = ({ onClose }: { onClose: () => void }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParam = searchParams.get("search") || "";
  const [localValue, setLocalValue] = useState(searchParam);

  // Sync initial param from URL
  useEffect(() => {
    setLocalValue(searchParam);
  }, [searchParam]);

  // Debounce : ne pas réinitialiser la pagination si la valeur de recherche n’a pas changé
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchParams((prev) => {
        const trimmed = localValue.trim();
        const current = (prev.get("search") || "").trim();
        if (trimmed === current) {
          return prev;
        }
        const next = new URLSearchParams(prev);
        if (trimmed) {
          next.set("search", trimmed);
        } else {
          next.delete("search");
        }
        next.set("page", "1");
        return next;
      });
    }, 300);

    return () => clearTimeout(handler);
  }, [localValue, setSearchParams]);

  return (
    <motion.div
      initial={{ opacity: 0, width: 0 }}
      animate={{ opacity: 1, width: "100%" }}
      exit={{ opacity: 0, width: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="flex flex-1 items-center gap-2 ml-4 relative overflow-hidden"
    >
      <label htmlFor="nav-destination-search" className="sr-only">
        Rechercher une destination
      </label>
      <Search
        className="pointer-events-none absolute left-3 h-4 w-4 text-white/50"
        aria-hidden
      />
      <input
        id="nav-destination-search"
        type="search"
        name="destination-search"
        autoComplete="off"
        placeholder="Rechercher une destination…"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="w-full min-h-11 rounded-full border border-border bg-white py-2 pl-10 pr-11 text-base text-foreground placeholder-muted-foreground transition-colors focus:border-primary/50 focus:outline-none sm:text-sm"
        autoFocus
      />
      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer la recherche"
        className="absolute right-1.5 flex h-11 w-11 min-h-11 min-w-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground touch-manipulation"
      >
        <XIcon className="h-4 w-4" aria-hidden />
      </button>
    </motion.div>
  );
};

// ─── NavBar ───────────────────────────────────────────────────────────────────
function NavBar() {
  const { user } = useAuth();
  const navLinks = getNavLinks(user);

  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 });
  const tabsRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const { scrollY } = useScroll();
  const scrolledMV = useMotionValue(0);

  const borderRadius = useTransform(scrollY, [0, SCROLL_THRESHOLD], [0, 9999]);
  const bgOpacity = useTransform(scrollY, [0, SCROLL_THRESHOLD], [0.3, 0.75]);
  const paddingY = useTransform(scrollY, [0, SCROLL_THRESHOLD], [12, 6]);
  const paddingX = useTransform(scrollY, [0, SCROLL_THRESHOLD], [24, 8]);
  const bgStyle = useTransform(bgOpacity, (v) => `rgba(255,255,255,${Math.min(0.96, 0.9 + v * 0.06)})`);

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => {
      scrolledMV.set(v);
      setIsScrolled(v > SCROLL_THRESHOLD);
    });
    return unsub;
  }, [scrollY, scrolledMV]);

  // Ferme le menu si on resize vers desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <div
        className={cn(
          "fixed top-2 z-[9999] w-full flex items-center justify-center px-2 sm:px-4 lg:px-8 transition-all duration-300",
          isScrolled && "top-0 sm:top-2",
        )}
      >
        <motion.div
          className="relative w-full flex items-center border border-border/80 bg-white/95 dark:bg-black/95 shadow-sm backdrop-blur-md overflow-hidden mx-auto"
          animate={isScrolled ? "shrunk" : "expanded"}
          variants={{
            expanded: { 
              width: "100%",
              transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
            },
            shrunk: {
              width: "fit-content",
              transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
            },
          }}
          style={{
            borderRadius,
            paddingTop: paddingY,
            paddingBottom: paddingY,
            paddingLeft: paddingX,
            paddingRight: paddingX,
            background: bgStyle,
            justifyContent: "space-between",
            display: "flex",
          }}
        >
          {/* ── Logo (toujours visible) ── */}
          <motion.div
            className="flex flex-shrink-0 items-center gap-2"
            animate={isScrolled ? "shrunk" : "expanded"}
            variants={{
              expanded: { marginRight: 16, transition: { duration: 0.4 } },
              shrunk: { marginRight: 8, transition: { duration: 0.4 } },
            }}
          >
            <Link
              to="/"
              className="flex items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent touch-manipulation"
              aria-label="AfriAtlas Travel, accueil"
            >
              <motion.img
                src="/favicon.ico"
                alt="Logo"
                className="rounded-full w-20 object-cover flex-shrink-0"
                animate={isScrolled ? "shrunk" : "expanded"}
                variants={{
                  expanded: {
                    width: 36,
                    height: 36,
                    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                  },
                  shrunk: {
                    width: 28,
                    height: 28,
                    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                  },
                }}
              />
              <motion.span
                className="text-primary font-semibold tracking-widest uppercase whitespace-nowrap overflow-hidden"
                animate={isScrolled ? "shrunk" : "expanded"}
                variants={{
                  expanded: {
                    opacity: 1,
                    maxWidth: 200,
                    fontSize: "13px",
                    transition: { duration: 0.35 },
                  },
                  shrunk: {
                    opacity: 0,
                    maxWidth: 0,
                    fontSize: "13px",
                    transition: { duration: 0.3 },
                  },
                }}
              >
                AfriAtlas
              </motion.span>
            </Link>
          </motion.div>

          {/* ── Conteneur dynamique (Liens ou Barre de recherche) ── */}
          <AnimatePresence mode="wait">
            {isSearchActive ? (
              <NavSearch
                key="search"
                onClose={() => setIsSearchActive(false)}
              />
            ) : (
              <motion.div
                key="links"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2 md:gap-4 ml-auto"
              >
                {/* ── Desktop tabs (md+) ── */}
                <div
                  ref={tabsRef}
                  className="relative hidden md:flex items-center"
                  onMouseLeave={() =>
                    setPosition((pv) => ({ ...pv, opacity: 0 }))
                  }
                >
                  <Cursor position={position} />
                  {navLinks.map(({ label, href }) => (
                    <Tab
                      key={label}
                      href={href}
                      setPosition={setPosition}
                      containerRef={tabsRef}
                      scrolled={isScrolled}
                    >
                      {label}
                    </Tab>
                  ))}
                </div>

                {/* ── Theme Toggle ── */}
                <ThemeToggle />

                {/* ── Search Toggle Button ── */}
                <button
                  type="button"
                  onClick={() => setIsSearchActive(true)}
                  className="flex h-11 w-11 min-h-11 min-w-11 flex-shrink-0 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white touch-manipulation"
                  aria-label="Ouvrir la recherche de destinations"
                >
                  <Search className="h-4 w-4" aria-hidden />
                </button>

                {/* ── Mobile hamburger (< md) ── */}
                <button
                  type="button"
                  onClick={() => setMenuOpen((v) => !v)}
                  className="flex h-11 w-11 min-h-11 min-w-11 flex-shrink-0 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-white/30 md:hidden touch-manipulation"
                  aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                  aria-expanded={menuOpen}
                  aria-controls="menu-mobile-drawer"
                >
                  <HamburgerIcon open={menuOpen} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── Mobile drawer ── */}
      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        navLinks={navLinks}
      />
    </>
  );
}

// ─── Tab ─────────────────────────────────────────────────────────────────────
const Tab = ({
  children,
  href,
  setPosition,
  containerRef,
  scrolled,
}: {
  children: React.ReactNode;
  href: string;
  setPosition: React.Dispatch<
    React.SetStateAction<{ left: number; width: number; opacity: number }>
  >;
  containerRef: React.RefObject<HTMLDivElement>;
  scrolled: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current || !containerRef.current) return;
        const containerLeft = containerRef.current.getBoundingClientRect().left;
        const { left, width } = ref.current.getBoundingClientRect();
        setPosition({ left: left - containerLeft, width, opacity: 1 });
      }}
      animate={scrolled ? "shrunk" : "expanded"}
      variants={{
        expanded: {
          paddingLeft: "18px",
          paddingRight: "18px",
          paddingTop: "10px",
          paddingBottom: "10px",
        },
        shrunk: {
          paddingLeft: "12px",
          paddingRight: "12px",
          paddingTop: "8px",
          paddingBottom: "8px",
        },
      }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="relative z-10"
    >
      <Link
        to={href}
        className="uppercase text-foreground/75 hover:text-primary tracking-widest font-medium whitespace-nowrap transition-colors block text-xs"
      >
        {children}
      </Link>
    </motion.div>
  );
};

// ─── Cursor ───────────────────────────────────────────────────────────────────
const Cursor = ({
  position,
}: {
  position: { left: number; width: number; opacity: number };
}) => (
  <motion.div
    animate={position}
    transition={{ type: "spring", stiffness: 400, damping: 35 }}
    className="absolute z-0 h-8 rounded-full bg-primary/10 pointer-events-none"
    style={{ top: "50%", translateY: "-50%" }}
  />
);

export default NavBar;
