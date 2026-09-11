import React, { useState } from 'react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '3000-4500',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Por favor completa tu nombre y correo electrónico.');
      return;
    }

    const randomTicket = 'CLK-' + Math.floor(100000 + Math.random() * 900000);
    setTicketId(randomTicket);
    setIsSubmitted(true);
  };

  return (
    <section id="contacto" className="container" style={{ paddingTop: '36px', paddingBottom: '48px' }}>
      <div className="os-window" style={{ boxShadow: '8px 8px 0px #121212' }}>
        {/* Titlebar */}
        <div className="window-titlebar">
          <div className="window-title-text">
            <span style={{ backgroundColor: '#FFDE00', color: '#121212', padding: '1px 6px', fontWeight: 'bold', fontSize: '11px' }}>
              PROPOSAL_DISPATCH.EXE
            </span>
            <span>Solicitud de Cotización & Contacto B2B Directo</span>
          </div>
          <div className="window-controls">
            <button className="win-btn">_</button>
            <button className="win-btn">□</button>
            <button className="win-btn">✕</button>
          </div>
        </div>

        <div className="window-body" style={{ padding: '32px' }}>
          {!isSubmitted ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
              {/* Left Column info */}
              <div>
                <span className="badge-chip badge-yellow" style={{ marginBottom: '12px' }}>
                  ⚡ RESPUESTA EN MENOS DE 2 HORAS
                </span>
                <h2 style={{ fontSize: '2rem', marginTop: '8px', marginBottom: '12px' }}>
                  Comienza tu Proyecto de $3,000 USD
                </h2>
                <p style={{ color: '#2c2b28', fontSize: '1rem', lineHeight: '1.6', marginBottom: '20px' }}>
                  Completa el formulario para agendar una sesión técnica de 20 minutos con nuestros ingenieros de software. Evaluaremos tus objetivos y te enviaremos una propuesta formal en PDF.
                </p>

                <div className="sunken-panel" style={{ background: '#FCFAF6', marginBottom: '20px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '13px', marginBottom: '8px', color: '#008080' }}>
                    GARANTÍAS DIRECTAS CLICK SOFTWARE STUDIO:
                  </div>
                  <ul style={{ listStyle: 'none', fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '6px', fontWeight: 600 }}>
                    <li>✓ Código 100% propio entregado con licencias abiertas</li>
                    <li>✓ Garantía de velocidad Lighthouse 100/100 por contrato</li>
                    <li>✓ Mantenimiento y parches de ciberseguridad incluidos</li>
                    <li>✓ Soporte técnico directo sin intermediarios</li>
                  </ul>
                </div>

                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: '#52525b' }}>
                  📍 Email Directo: <span style={{ color: '#121212', fontWeight: 'bold' }}>contacto@click.digitalandia.com</span>
                </div>
              </div>

              {/* Right Column Form */}
              <div>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '4px' }}>
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ej. Ana Martínez"
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '2px solid #121212',
                        boxShadow: 'inset 2px 2px 0px rgba(0,0,0,0.1)',
                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                        fontSize: '14px'
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '4px' }}>
                        Correo Corporativo *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="ana@tuempresa.com"
                        style={{
                          width: '100%',
                          padding: '10px',
                          border: '2px solid #121212',
                          boxShadow: 'inset 2px 2px 0px rgba(0,0,0,0.1)',
                          fontFamily: 'Plus Jakarta Sans, sans-serif',
                          fontSize: '14px'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '4px' }}>
                        Empresa / Marca
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Nombre de empresa"
                        style={{
                          width: '100%',
                          padding: '10px',
                          border: '2px solid #121212',
                          boxShadow: 'inset 2px 2px 0px rgba(0,0,0,0.1)',
                          fontFamily: 'Plus Jakarta Sans, sans-serif',
                          fontSize: '14px'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '4px' }}>
                      Presupuesto Estimado
                    </label>
                    <select
                      id="contact-budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '2px solid #121212',
                        backgroundColor: '#FFFFFF',
                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                        fontSize: '14px',
                        fontWeight: 'bold'
                      }}
                    >
                      <option value="1500-2500">$1,500 - $2,500 USD (Web Corporativa Standard)</option>
                      <option value="3000-4500">$3,000 - $4,500 USD (Web Corporativa Premium - Recomendado)</option>
                      <option value="5000+">$5,000+ USD (Plataforma Custom / SaaS MVP)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '4px' }}>
                      Detalles del Proyecto
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe los objetivos de tu proyecto, características requeridas o pega la estimación del cotizador..."
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '2px solid #121212',
                        boxShadow: 'inset 2px 2px 0px rgba(0,0,0,0.1)',
                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                        fontSize: '13px'
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    style={{ width: '100%', marginTop: '8px' }}
                  >
                    ENVIAR SOLICITUD DE COTIZACIÓN →
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '32px 16px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🎉</div>
              <span className="badge-chip badge-green" style={{ fontSize: '12px', padding: '4px 12px' }}>
                TICKET RECIBIDO CON ÉXITO
              </span>
              <h2 style={{ fontSize: '2rem', marginTop: '16px', marginBottom: '8px' }}>
                ¡Gracias, {formData.name}!
              </h2>
              <p style={{ color: '#52525b', fontSize: '1rem', maxWidth: '500px', margin: '0 auto 20px auto' }}>
                Hemos registrado tu solicitud con el ticket <strong style={{ color: '#1B3BFF', fontFamily: 'JetBrains Mono' }}>{ticketId}</strong>. Nuestro equipo técnico revisará tus requerimientos y te contactará a <strong style={{ color: '#121212' }}>{formData.email}</strong> en breve.
              </p>

              <button
                onClick={() => setIsSubmitted(false)}
                className="btn btn-secondary"
              >
                ← ENVIAR OTRA CONSULTA
              </button>
            </div>
          )}
        </div>

        <div className="window-statusbar">
          <span>CONTACT DISPATCHER: ACTIVE</span>
          <span>CLICK SOFTWARE STUDIO • B2B SUPPORT</span>
        </div>
      </div>
    </section>
  );
};
