import React, { useState } from 'react';

interface DevVizzProps {
  title?: string;
  codeSnippet: string;
  astData?: Record<string, unknown>;
  metrics?: {
    renderTimeMs: number;
    bundleKb: number;
    lighthouseScore: number;
    tbtMs: number;
  };
  children: React.ReactNode;
}

export const DevVizzInspector: React.FC<DevVizzProps> = ({
  title = "COMPONENT_INSPECTOR",
  codeSnippet,
  astData = {
    framework: "Astro v5 + React 19",
    renderingMode: "Static Generation (SSG) + Zero-JS Hydration",
    lighthouseScore: "100/100",
    securityPolicy: "CSP + HSTS Strict Enabled",
    cdnEdge: "Cloudflare Edge Network"
  },
  metrics = {
    renderTimeMs: 0.12,
    bundleKb: 4.2,
    lighthouseScore: 100,
    tbtMs: 0
  },
  children
}) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'ast'>('preview');

  return (
    <div className="os-window devvizz-container" style={{ margin: '16px 0' }}>
      {/* Window Header */}
      <div className="window-titlebar">
        <div className="window-title-text">
          <span style={{ background: '#FFDE00', color: '#121212', padding: '1px 4px', fontSize: '10px' }}>
            DEV-VIZZ [{`</>`}]
          </span>
          <span>{title}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#00E065' }}>
            FPS: 60 | TBT: {metrics.tbtMs}ms | LATENCY: {metrics.renderTimeMs}ms
          </span>
          <div className="window-controls">
            <button className="win-btn" title="Minimize">_</button>
            <button className="win-btn" title="Maximize">□</button>
            <button className="win-btn" title="Close">✕</button>
          </div>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="tabs-nav">
        <button
          className={`tab-item ${activeTab === 'preview' ? 'active' : ''}`}
          onClick={() => setActiveTab('preview')}
        >
          🖥️ VISTA INTERFAZ (CLIENT)
        </button>
        <button
          className={`tab-item ${activeTab === 'code' ? 'active' : ''}`}
          onClick={() => setActiveTab('code')}
        >
          💻 CODIGO FUENTE (DEV-VIZZ)
        </button>
        <button
          className={`tab-item ${activeTab === 'ast' ? 'active' : ''}`}
          onClick={() => setActiveTab('ast')}
        >
          ⚙️ TELEMETRIA & AST
        </button>
      </div>

      {/* Main Tab Panel */}
      {activeTab === 'preview' && (
        <div className="window-body">
          {children}
        </div>
      )}

      {activeTab === 'code' && (
        <div className="terminal-panel" style={{ minHeight: '260px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px solid #333', paddingBottom: '6px' }}>
            <span style={{ color: '#FFDE00' }}>// CLICK INSTANT DEV-VIZZ: SOURCE CODE ENGINE</span>
            <span style={{ color: '#808080' }}>LANGUAGE: TYPESCRIPT / JSX</span>
          </div>
          <pre style={{ overflowX: 'auto', fontSize: '12px', lineHeight: '1.6', margin: 0 }}>
            <code>{codeSnippet}</code>
          </pre>
        </div>
      )}

      {activeTab === 'ast' && (
        <div className="terminal-panel" style={{ minHeight: '260px', color: '#76d6d5' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px solid #333', paddingBottom: '6px' }}>
            <span style={{ color: '#FF2B44' }}>[SYSTEM ARCHITECTURE & TELEMETRY SPECS]</span>
            <span style={{ color: '#00E065' }}>STATUS: OPTIMAL</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '16px' }}>
            <div style={{ border: '1px solid #008080', padding: '8px', background: '#181818' }}>
              <div style={{ fontSize: '10px', color: '#808080' }}>LIGHTHOUSE SCORE</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#00E065' }}>{metrics.lighthouseScore}/100</div>
            </div>
            <div style={{ border: '1px solid #008080', padding: '8px', background: '#181818' }}>
              <div style={{ fontSize: '10px', color: '#808080' }}>TOTAL BLOCKING TIME</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#FFDE00' }}>{metrics.tbtMs} ms</div>
            </div>
            <div style={{ border: '1px solid #008080', padding: '8px', background: '#181818' }}>
              <div style={{ fontSize: '10px', color: '#808080' }}>BUNDLE SIZE</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1B3BFF' }}>{metrics.bundleKb} KB</div>
            </div>
          </div>
          <pre style={{ overflowX: 'auto', fontSize: '12px', color: '#e3fffe', margin: 0 }}>
            <code>{JSON.stringify(astData, null, 2)}</code>
          </pre>
        </div>
      )}

      {/* Footer Statusbar */}
      <div className="window-statusbar">
        <span style={{ color: '#008080' }}>MODE: {activeTab.toUpperCase()} ACTIVE</span>
        <span style={{ color: '#52525b' }}>CLICK CORP ENGINE • LIGHTHOUSE 100/100 GUARANTEE</span>
      </div>
    </div>
  );
};
