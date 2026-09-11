import React, { useState, useRef, useEffect } from 'react';

interface HistoryItem {
  type: 'input' | 'output';
  text: string;
}

export const InteractiveTerminal: React.FC = () => {
  const [inputVal, setInputVal] = useState<string>('');
  const [history, setHistory] = useState<HistoryItem[]>([
    { type: 'output', text: 'CLICK_OS Terminal v1.0.0 [Ready]' },
    { type: 'output', text: 'Escribe "help" o "cotizar" para iniciar la consola interactiva.' }
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    const newHistory: HistoryItem[] = [...history, { type: 'input', text: `$ ${cmdStr}` }];

    switch (trimmed) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `Comandos disponibles:
  - quote / cotizar : Simular proyecto de $3,000 USD
  - services        : Ver catálogo de servicios web
  - stack           : Inspeccionar arquitectura técnica
  - clear           : Limpiar consola terminal
  - contact         : Ir al formulario de contacto directo`
        });
        break;

      case 'quote':
      case 'cotizar':
        newHistory.push({
          type: 'output',
          text: `[ESTIMACIÓN EN TIEMPO REAL]
  Web Corporativa Premium ($3,000 USD)
  - Incluye: Astro 5 + React 19 + TypeScript + Dev-Vizz Engine
  - Entrega: 3 Semanas con garantía SLA 100/100
  Navegando a la calculadora de proyectos...`
        });
        setTimeout(() => {
          document.getElementById('calculadora')?.scrollIntoView({ behavior: 'smooth' });
        }, 600);
        break;

      case 'services':
        newHistory.push({
          type: 'output',
          text: `CATÁLOGO DE SERVICIOS CLICK:
  1. Web Corporativa Custom ($1,500 - $3,000 USD)
  2. Software a la Medida & MVP ($3,000 - $6,000 USD)
  3. Auditoría Extreme Zero-Lag ($800 - $2,000 USD)
  4. Design Systems Neobrutalistas ($1,200 - $2,500 USD)`
        });
        break;

      case 'stack':
        newHistory.push({
          type: 'output',
          text: `TECNOLOGÍA EN PRODUCCIÓN:
  [Runtime] Bun v1.3+
  [Framework] Astro v5 (Static Site Generation / Islands)
  [UI Engine] React 19 + Strict TypeScript
  [CDN Edge] Cloudflare Workers (300+ Ciudades)
  [Lighthouse] 100/100 Benchmark Verified`
        });
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'contact':
        newHistory.push({ type: 'output', text: 'Navegando al formulario de contacto...' });
        setTimeout(() => {
          document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
        }, 500);
        break;

      default:
        newHistory.push({
          type: 'output',
          text: `Comando no reconocido: "${trimmed}". Escribe "help" para ver la lista de comandos.`
        });
        break;
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(inputVal);
  };

  return (
    <div id="terminal" className="os-window" style={{ margin: '36px 0', boxShadow: '6px 6px 0px #121212' }}>
      <div className="window-titlebar">
        <div className="window-title-text">
          <span style={{ backgroundColor: '#00E065', color: '#121212', padding: '1px 6px', fontWeight: 'bold', fontSize: '11px' }}>
            CLICK_CLI.SH
          </span>
          <span>Consola Interactiva para Desarrolladores & Clientes</span>
        </div>
        <div className="window-controls">
          <button className="win-btn">_</button>
          <button className="win-btn">□</button>
          <button className="win-btn">✕</button>
        </div>
      </div>

      <div className="terminal-panel" style={{ minHeight: '280px', maxHeight: '400px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid #333' }}>
          <span style={{ color: '#808080', fontSize: '11px' }}>ACCESOS DIRECTOS CLI:</span>
          <button onClick={() => handleCommand('help')} style={{ background: '#181818', color: '#FFDE00', border: '1px solid #FFDE00', padding: '2px 6px', fontSize: '10px', cursor: 'pointer', fontFamily: 'JetBrains Mono' }}>
            &gt; help
          </button>
          <button onClick={() => handleCommand('quote')} style={{ background: '#181818', color: '#00E065', border: '1px solid #00E065', padding: '2px 6px', fontSize: '10px', cursor: 'pointer', fontFamily: 'JetBrains Mono' }}>
            &gt; quote $3k
          </button>
          <button onClick={() => handleCommand('services')} style={{ background: '#181818', color: '#76d6d5', border: '1px solid #76d6d5', padding: '2px 6px', fontSize: '10px', cursor: 'pointer', fontFamily: 'JetBrains Mono' }}>
            &gt; services
          </button>
          <button onClick={() => handleCommand('stack')} style={{ background: '#181818', color: '#1B3BFF', border: '1px solid #1B3BFF', padding: '2px 6px', fontSize: '10px', cursor: 'pointer', fontFamily: 'JetBrains Mono' }}>
            &gt; stack
          </button>
          <button onClick={() => handleCommand('clear')} style={{ background: '#181818', color: '#FF2B44', border: '1px solid #FF2B44', padding: '2px 6px', fontSize: '10px', cursor: 'pointer', fontFamily: 'JetBrains Mono' }}>
            &gt; clear
          </button>
        </div>

        {history.map((item, index) => (
          <div key={index} style={{ margin: '4px 0', whiteSpace: 'pre-wrap', lineHeight: '1.5', fontSize: '12px' }}>
            {item.type === 'input' ? (
              <span style={{ color: '#FFDE00', fontWeight: 'bold' }}>{item.text}</span>
            ) : (
              <span style={{ color: '#00E065' }}>{item.text}</span>
            )}
          </div>
        ))}

        <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', marginTop: '12px' }}>
          <span style={{ color: '#FFDE00', marginRight: '8px', fontWeight: 'bold' }}>click@client:~#</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Escribe un comando (ej. quote, services, help)..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#00E065',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '13px'
            }}
          />
        </form>
        <div ref={terminalEndRef} />
      </div>

      <div className="window-statusbar">
        <span>CLI STATUS: LISTENING FOR INPUT</span>
        <span>CLICK SOFTWARE ENGINE</span>
      </div>
    </div>
  );
};
