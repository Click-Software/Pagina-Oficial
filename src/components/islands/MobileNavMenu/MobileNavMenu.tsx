import { useState, useEffect } from "react";

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
    <div className="md:hidden flex items-center">
      {/* Botón hamburguesa con micro-interacción */}
      <button
        type="button"
        className="w-10 h-10 flex flex-col justify-center items-center gap-1.25 bg-transparent border-[1.5px] border-border shadow-[2px_2px_0px_var(--color-border)] cursor-pointer active:translate-x-px active:translate-y-px active:shadow-[1px_1px_0px_var(--color-border)] transition-transform"
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span
          className={`w-5 h-0.5 bg-text transition-transform duration-200 ${
            isOpen ? "translate-y-[3.5px] rotate-45" : ""
          }`}
        />
        <span
          className={`w-5 h-0.5 bg-text transition-transform duration-200 ${
            isOpen ? "translate-y-[-3.5px] -rotate-45" : ""
          }`}
        />
      </button>

      {/* Menú desplegable */}
      <div
        className={`absolute top-16 left-0 right-0 overflow-hidden bg-bg border-b border-black/10 transition-all duration-300 ease-out ${
          isOpen
            ? "max-h-125 opacity-100 shadow-2xl pointer-events-auto"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="container-stage">
          <nav className="flex flex-col py-6 pb-12 gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-base font-bold tracking-tight text-text py-2.5 border-b border-black/5 hover:text-brand transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

