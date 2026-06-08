import { useState, useEffect, useRef } from "react";
import { HiBars3, HiXMark } from "react-icons/hi2";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Certificates", href: "#certificates" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Analytics", href: "#analytics" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState(navLinks[0].href);
  const linksRef = useRef({});
  const indicatorRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update indicator position to match active link
  const updateIndicator = (href) => {
    const container = containerRef.current;
    const indicator = indicatorRef.current;
    const linkEl = linksRef.current[href];
    if (!container || !indicator || !linkEl) return;

    const containerRect = container.getBoundingClientRect();
    const linkRect = linkEl.getBoundingClientRect();

    const left = linkRect.left - containerRect.left + linkEl.offsetLeft * 0;
    const width = linkRect.width;

    indicator.style.transform = `translateX(${left}px)`;
    indicator.style.width = `${width}px`;
    indicator.style.opacity = '1';
  };

  useEffect(() => {
    // IntersectionObserver to track which section is active
    const observers = [];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = `#${entry.target.id}`;
            setActiveHref(id);
          }
        });
      },
      { root: null, rootMargin: '0px 0px -40% 0px', threshold: 0.2 }
    );

    navLinks.forEach((link) => {
      const id = link.href.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        io.observe(el);
        observers.push(el);
      }
    });

    return () => {
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    // move indicator whenever activeHref changes or on resize
    updateIndicator(activeHref);
    const onResize = () => updateIndicator(activeHref);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [activeHref]);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    const targetId = href.replace("#", "");
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="navbar-container" ref={containerRef}>
          <a href="#home" className="navbar-logo" onClick={(e) => handleLinkClick(e, "#home")}>
            MOIN
          </a>

          <div className="nav-indicator" ref={indicatorRef} aria-hidden="true" />

          <ul className="navbar-links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  ref={(el) => (linksRef.current[link.href] = el)}
                  className={activeHref === link.href ? 'active' : ''}
                  onClick={(e) => handleLinkClick(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            className="navbar-mobile-toggle"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <HiXMark /> : <HiBars3 />}
          </button>
        </div>
      </nav>

      {/* Full-screen mobile menu overlay */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? "open" : ""}`}>
        <ul className="mobile-menu-links">
          {navLinks.map((link, index) => (
            <li
              key={link.href}
              style={{ animationDelay: `${index * 0.07}s` }}
            >
              <a
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
