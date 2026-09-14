import { useState, useEffect } from "react";
import styles from "./MobileNavMenu.module.css";

export interface NavLink {
  label: string;
  href: string;
}

export interface MobileNavMenuProps {
  navLinks: NavLink[];
}

export default function MobileNavMenu({ navLinks }: MobileNavMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className={styles.mobileNavRoot}>
      <button
        type="button"
        className={`${styles.menuToggle} ${isOpen ? styles.menuToggleActive : ""}`}
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </button>

      <div
        className={`${styles.mobileMenu} ${isOpen ? styles.mobileMenuOpen : ""}`}
        aria-hidden={!isOpen}
      >
        <nav className={styles.mobileNavLinks}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.mobileNavItem}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            className={`btn-primary ${styles.mobileCta}`}
            onClick={() => setIsOpen(false)}
          >
            Cotizar
          </a>
        </nav>
      </div>
    </div>
  );
}
