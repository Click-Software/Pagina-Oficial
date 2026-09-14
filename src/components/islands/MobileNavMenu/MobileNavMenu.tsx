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
        className="w-10 h-10 flex flex-col justify-center items-center gap-[5px] bg-transparent border-[1.5px] border-[#121212] shadow-[2px_2px_0px_#121212] cursor-pointer active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#121212] transition-transform"
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span
          className={`w-5 h-[2px] bg-[#121212] transition-transform duration-200 ${
            isOpen ? "translate-y-[3.5px] rotate-45" : ""
          }`}
        />
        <span
          className={`w-5 h-[2px] bg-[#121212] transition-transform duration-200 ${
            isOpen ? "-translate-y-[3.5px] -rotate-45" : ""
          }`}
        />
      </button>

      {/* Menú desplegable */}
      <div
        className={`absolute top-16 left-0 right-0 overflow-hidden bg-[#fdf9f0] border-b border-black/10 transition-all duration-300 ease-out ${
          isOpen
            ? "max-h-96 opacity-100 shadow-xl pointer-events-auto"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isOpen}
      >
        <nav className="flex flex-col px-6 py-4 pb-8 gap-3.5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-base font-semibold text-[#121212] py-1.5 border-b border-black/5 hover:text-[var(--color-brand)] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            className="btn-primary w-full text-center mt-3"
            onClick={() => setIsOpen(false)}
          >
            Cotizar
          </a>
        </nav>
      </div>
    </div>
  );
}

