import { useState, useEffect, type SyntheticEvent } from "react";

export interface ServiceOption {
  key: string;
  title: string;
}

const FIELDS = [
  { name: "fullName", label: "Nombre completo", type: "text", placeholder: "Ej. Sofía Morales" },
  { name: "email", label: "Correo electrónico", type: "email", placeholder: "nombre@empresa.com" },
  { name: "companyName", label: "Empresa / Giro comercial", type: "text", placeholder: "Ej. Acme Corp" },
];

interface Props {
  services: ServiceOption[];
  contactEmail: string;
}

export default function ContactForm({ services, contactEmail }: Props) {
  const [service, setService] = useState("general");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  useEffect(() => {
    const s = new URL(window.location.href).searchParams.get("servicio");
    if (s && services.some((item) => item.key === s)) setService(s);
  }, [services]);

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) || "").trim();

    const fullName = get("fullName");
    const email = get("email");
    const companyName = get("companyName");
    const requirement = get("requirement");

    const errs: Record<string, string> = {};
    if (!fullName) errs.fullName = "Este campo es obligatorio.";
    if (!email) errs.email = "Este campo es obligatorio.";
    else if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email)) errs.email = "Correo electrónico no válido";
    if (!companyName) errs.companyName = "Este campo es obligatorio.";
    if (!requirement) errs.requirement = "Este campo es obligatorio.";

    setErrors(errs);
    if (Object.keys(errs).length) return;

    // Antes: aquí solo se mostraba el mensaje de éxito sin mandar nada a ningún lado.
    // Ahora: armamos un mailto: con todos los datos capturados y lo abrimos,
    // para que el cliente de correo del usuario quede listo para enviarlo a Click.
    const serviceTitle = services.find((s) => s.key === service)?.title ?? "General";
    const subject = encodeURIComponent(`Solicitud de cotización — ${fullName}`);
    const body = encodeURIComponent(
      `Nombre: ${fullName}\nCorreo: ${email}\nEmpresa: ${companyName}\nServicio de interés: ${serviceTitle}\n\nRequerimiento:\n${requirement}`
    );
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;

    e.currentTarget.reset();
    setService("general");
    setDone(true);
  };

  const clearErr = (k: string) => errors[k] && setErrors((prev) => ({ ...prev, [k]: "" }));
  const cls = (k: string) => `retro-input ${errors[k] ? "retro-input-error" : ""}`;

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      {FIELDS.map((f) => (
        <div key={f.name} className="flex flex-col gap-1">
          <label htmlFor={f.name} className="font-mono text-xs font-bold uppercase tracking-wider text-text">
            {f.label} <span className="text-red-500">*</span>
          </label>
          <input
            id={f.name}
            name={f.name}
            type={f.type}
            placeholder={f.placeholder}
            onChange={() => clearErr(f.name)}
            className={cls(f.name)}
          />
          {errors[f.name] && <span className="font-mono text-xs text-red-600 font-bold">{errors[f.name]}</span>}
        </div>
      ))}

      <div className="flex flex-col gap-1">
        <label htmlFor="service" className="font-mono text-xs font-bold uppercase tracking-wider text-text">
          Servicio de Interés
        </label>
        <select
          id="service"
          name="service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="retro-input"
        >
          <option value="general">Selecciona un servicio (Opcional)</option>
          {services.map((s) => (
            <option key={s.key} value={s.key}>
              {s.title}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="requirement" className="font-mono text-xs font-bold uppercase tracking-wider text-text">
          Descripción del requerimiento <span className="text-red-500">*</span>
        </label>
        <textarea
          id="requirement"
          name="requirement"
          rows={3}
          placeholder="Cuéntanos brevemente qué necesitas construir..."
          onChange={() => clearErr("requirement")}
          className={`${cls("requirement")} resize-y`}
        />
        {errors.requirement && (
          <span className="font-mono text-xs text-red-600 font-bold">{errors.requirement}</span>
        )}
      </div>

      <div className="pt-2 flex justify-end">
        <button type="submit" className="btn-primary w-full sm:w-auto px-7 py-2.5 text-sm cursor-pointer">
          Enviar solicitud
        </button>
      </div>

      {done && (
        <div
          role="alert"
          className="p-3 border font-mono text-xs text-center font-bold border-brand bg-brand/10 text-text"
        >
          ¡Listo! Abrimos tu cliente de correo con el mensaje ya redactado — solo confírmalo para enviarlo a
          Click.
        </div>
      )}
    </form>
  );
}
