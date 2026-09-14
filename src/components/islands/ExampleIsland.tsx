import { useState } from 'react';

export interface ExampleIslandProps {
  initialCount?: number;
}

/**
 * Ejemplo canónico de Isla Interactiva con React 19 para Astro 7.
 * Siguiendo las directrices modernas de React 19:
 * - Sin uso del obsoleto React.FC (tipado directo en argumentos)
 * - Accesibilidad WCAG 2.2 AAA con regiones aria-live
 * - Soporte nativo para hidratación bajo demanda de Astro (`client:visible`, `client:idle`)
 */
export default function ExampleIsland({ initialCount = 0 }: ExampleIslandProps) {
  const [count, setCount] = useState(initialCount);

  return (
    <div className="example-island" role="region" aria-label="Contador interactivo">
      <p aria-live="polite">
        Estado interactivo en React 19: <strong>{count}</strong>
      </p>
      <div className="example-actions">
        <button
          type="button"
          onClick={() => setCount((c) => c + 1)}
          className="copy-btn"
          aria-label="Incrementar contador en 1"
        >
          Incrementar +1
        </button>
        <button
          type="button"
          onClick={() => setCount(0)}
          className="copy-btn"
          aria-label="Reiniciar contador a 0"
        >
          Reiniciar
        </button>
      </div>
    </div>
  );
}
export { ExampleIsland };
