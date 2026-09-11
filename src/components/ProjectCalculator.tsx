import React, { useState } from 'react';

interface AddonOption {
  id: string;
  label: string;
  description: string;
  price: number;
}

const ADDONS: AddonOption[] = [
  {
    id: 'admin',
    label: 'Panel de Control / CMS Headless',
    description: 'Administración de contenidos en tiempo real sin tocar código',
    price: 500
  },
  {
    id: 'payments',
    label: 'Pasarela de Pagos / Stripe API',
    description: 'Cobros automatizados B2B / B2C con certificación PCI-DSS',
    price: 400
  },
  {
    id: 'performance',
    label: 'Garantía Zero-Lag SLA 100/100',
    description: 'Optimización de assets para tiempo de respuesta menor a 0.2s',
    price: 300
  },
  {
    id: 'design',
    label: 'Sistema de Diseño Neobrutalista Y2K Custom',
    description: 'Librería de componentes UI/UX exclusiva para tu marca',
    price: 400
  },
  {
    id: 'support',
    label: 'Mantenimiento & Soporte Anual SLA',
    description: 'Monitoreo 24/7, parches de seguridad y respaldos continuos',
    price: 600
  }
];

export const ProjectCalculator: React.FC = () => {
  const [baseTier, setBaseTier] = useState<number>(3000);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['performance', 'design']);
  const [deliveryWeeks, setDeliveryWeeks] = useState<number>(3);

  const toggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter(item => item !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const addonsTotal = selectedAddons.reduce((acc, currId) => {
    const addon = ADDONS.find(a => a.id === currId);
    return acc + (addon ? addon.price : 0);
  }, 0);

  const totalEstimate = baseTier + addonsTotal;

  const handleApplyToForm = () => {
    const tierName = baseTier === 1500 ? 'Web Corporativa Express' : baseTier === 3000 ? 'Web Corporativa Premium ($3,000)' : 'Plataforma / SaaS Custom';
    const selectedLabels = selectedAddons.map(id => ADDONS.find(a => a.id === id)?.label).filter(Boolean);
    const summaryText = `[COTIZADOR DE PROYECTO CLIENTE]\n- Plan Base: ${tierName}\n- Inversión Estimada: $${totalEstimate} USD\n- Adicionales: ${selectedLabels.join(', ') || 'Ninguno'}\n- Tiempo Estimado: ${deliveryWeeks} Semanas.`;

    const messageInput = document.getElementById('contact-message') as HTMLTextAreaElement;
    const budgetInput = document.getElementById('contact-budget') as HTMLSelectElement;

    if (messageInput) {
      messageInput.value = summaryText;
    }
    if (budgetInput) {
      if (totalEstimate <= 2500) budgetInput.value = '1500-2500';
      else if (totalEstimate <= 4500) budgetInput.value = '3000-4500';
      else budgetInput.value = '5000+';
    }

    const contactSection = document.getElementById('contacto');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="calculadora" className="os-window" style={{ margin: '36px 0', boxShadow: '8px 8px 0px #121212' }}>
      {/* Title bar */}
      <div className="window-titlebar">
        <div className="window-title-text">
          <span style={{ backgroundColor: '#FFDE00', color: '#121212', padding: '1px 6px', fontWeight: 'bold', fontSize: '11px' }}>
            PROJECT_ESTIMATOR_v3.EXE
          </span>
          <span>Calculadora Interactiva de Proyectos ($3,000 USD Value Engine)</span>
        </div>
        <div className="window-controls">
          <button className="win-btn">_</button>
          <button className="win-btn">□</button>
          <button className="win-btn">✕</button>
        </div>
      </div>

      <div className="window-body" style={{ padding: '28px' }}>
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>
            🧮 Simula el Costo de tu Proyecto Web
          </h2>
          <p style={{ color: '#52525b', fontSize: '0.95rem' }}>
            Selecciona el alcance de tu solución. Transparencia total sin costos ocultos.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {/* Column 1: Base Tier Selection */}
          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '12px', borderBottom: '2px solid #121212', paddingBottom: '4px' }}>
              1. Selecciona el Tipo de Solución
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div
                onClick={() => { setBaseTier(1500); setDeliveryWeeks(2); }}
                style={{
                  border: '2px solid #121212',
                  padding: '12px',
                  backgroundColor: baseTier === 1500 ? '#FFE600' : '#FFFFFF',
                  cursor: 'pointer',
                  boxShadow: baseTier === 1500 ? '4px 4px 0px #121212' : '2px 2px 0px #121212',
                  transition: 'all 0.1s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                  <span>WEB CORPORATIVA ESSENTIAL</span>
                  <span>$1,500 USD</span>
                </div>
                <div style={{ fontSize: '12px', color: '#2c2b28', marginTop: '4px' }}>
                  Ideal para pymes que requieren presencia digital rápida, responsive y optimizada en 14 días.
                </div>
              </div>

              <div
                onClick={() => { setBaseTier(3000); setDeliveryWeeks(3); }}
                style={{
                  border: '3px solid #121212',
                  padding: '14px',
                  backgroundColor: baseTier === 3000 ? '#008080' : '#FFFFFF',
                  color: baseTier === 3000 ? '#FFFFFF' : '#121212',
                  cursor: 'pointer',
                  boxShadow: '4px 4px 0px #121212',
                  position: 'relative'
                }}
              >
                <span style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '10px',
                  backgroundColor: '#FFDE00',
                  color: '#121212',
                  border: '1px solid #121212',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  padding: '1px 6px'
                }}>
                  ⭐ MÁS POPULAR ($3K VALUE)
                </span>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                  <span>WEB CORPORATIVA & DESIGN SYSTEM</span>
                  <span>$3,000 USD</span>
                </div>
                <div style={{ fontSize: '12px', opacity: 0.9, marginTop: '4px' }}>
                  Sitio web completo de alto nivel B2B, arquitectura Neobrutalista custom, Instant Dev-Vizz e integración CRM.
                </div>
              </div>

              <div
                onClick={() => { setBaseTier(4500); setDeliveryWeeks(4); }}
                style={{
                  border: '2px solid #121212',
                  padding: '12px',
                  backgroundColor: baseTier === 4500 ? '#1B3BFF' : '#FFFFFF',
                  color: baseTier === 4500 ? '#FFFFFF' : '#121212',
                  cursor: 'pointer',
                  boxShadow: baseTier === 4500 ? '4px 4px 0px #121212' : '2px 2px 0px #121212',
                  transition: 'all 0.1s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                  <span>PLATAFORMA WEB & MVP CUSTOM</span>
                  <span>$4,500 USD</span>
                </div>
                <div style={{ fontSize: '12px', opacity: 0.9, marginTop: '4px' }}>
                  Software web a la medida con autenticación de usuarios, bases de datos y workflows complejos.
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Addons */}
          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '12px', borderBottom: '2px solid #121212', paddingBottom: '4px' }}>
              2. Módulos & Capacidades Adicionales
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {ADDONS.map(addon => {
                const isSelected = selectedAddons.includes(addon.id);
                return (
                  <label
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      padding: '8px 10px',
                      border: '2px solid #121212',
                      backgroundColor: isSelected ? '#FCFAF6' : '#FFFFFF',
                      cursor: 'pointer',
                      boxShadow: isSelected ? '2px 2px 0px #121212' : 'none'
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}}
                      style={{ marginTop: '3px', cursor: 'pointer' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 'bold' }}>
                        <span>{addon.label}</span>
                        <span style={{ color: '#008080' }}>+${addon.price} USD</span>
                      </div>
                      <div style={{ fontSize: '11px', color: '#52525b' }}>{addon.description}</div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dynamic Total Box */}
        <div style={{
          marginTop: '28px',
          padding: '20px',
          backgroundColor: '#D4D0C8',
          border: '3px solid #121212',
          boxShadow: '4px 4px 0px #121212',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          <div>
            <div style={{ fontSize: '12px', fontFamily: 'JetBrains Mono, monospace', fontWeight: 'bold', color: '#008080' }}>
              RESUMEN DE ESTIMACIÓN TÉCNICA
            </div>
            <div style={{ fontSize: '2.2rem', fontFamily: 'JetBrains Mono, monospace', fontWeight: '800' }}>
              ${totalEstimate} <span style={{ fontSize: '1rem', fontWeight: 'normal', color: '#52525b' }}>USD</span>
            </div>
            <div style={{ fontSize: '12px', fontWeight: 'bold' }}>
              ⏱️ Tiempo estimado de entrega: <span style={{ color: '#1B3BFF' }}>{deliveryWeeks} - {deliveryWeeks + 1} Semanas</span>
            </div>
          </div>

          <button
            onClick={handleApplyToForm}
            className="btn btn-primary btn-lg"
          >
            SOLICITAR ESTA PROPUESTA →
          </button>
        </div>
      </div>

      <div className="window-statusbar">
        <span>PRESUPUESTO ESTIMADO CLIENTE • VALOR GARANTIZADO CLICK SOFTWARE</span>
        <span>TRANSPARENCIA TOTAL B2B</span>
      </div>
    </div>
  );
};
