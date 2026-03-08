import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';

// Configuração EmailJS
const EMAILJS_SERVICE_ID  = "service_4vpy0th";   
const EMAILJS_TEMPLATE_ID = "template_w0qe1m1";  
const EMAILJS_PUBLIC_KEY  = "WWW5wDL545Iupiq_A";   


const aero = {
  section: {
    background: "linear-gradient(145deg, rgba(180,225,255,0.82) 0%, rgba(210,240,255,0.75) 50%, rgba(160,215,255,0.80) 100%)",
    backdropFilter: "blur(18px) saturate(1.6)",
    WebkitBackdropFilter: "blur(18px) saturate(1.6)",
    border: "1.5px solid rgba(255,255,255,0.65)",
    boxShadow: "0 8px 40px rgba(80,180,255,0.18), inset 0 1.5px 0 rgba(255,255,255,0.7)",
    borderRadius: "28px",
  },
  gloss: {
    height: "48%",
    borderRadius: "28px 28px 60% 60% / 28px 28px 36px 36px",
    background: "linear-gradient(180deg, rgba(255,255,255,0.52) 0%, rgba(255,255,255,0) 100%)",
  },
  input: {
    background: "rgba(255,255,255,0.55)",
    border: "1.5px solid rgba(100,190,255,0.40)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7)",
    borderRadius: "12px",
    color: "#0a3d6b",
    outline: "none",
    transition: "border-color 0.15s, box-shadow 0.15s",
    width: "100%",
    fontSize: "13px",
    padding: "10px 14px",
  },
  inputFocus: {
    border: "1.5px solid rgba(56,189,248,0.70)",
    boxShadow: "0 0 0 3px rgba(56,189,248,0.15), inset 0 1px 0 rgba(255,255,255,0.7)",
  },
  submitBtn: {
    background: "linear-gradient(135deg, rgba(56,189,248,0.80) 0%, rgba(14,165,233,0.90) 100%)",
    border: "1.5px solid rgba(255,255,255,0.60)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    boxShadow: "0 4px 14px rgba(14,165,233,0.30), inset 0 1px 0 rgba(255,255,255,0.40)",
    borderRadius: "12px",
    color: "#fff",
    fontWeight: 700,
    fontSize: "13px",
    padding: "11px 28px",
    cursor: "pointer",
    transition: "transform 0.15s, box-shadow 0.15s, opacity 0.15s",
  },
  label: {
    fontSize: "11px",
    fontWeight: 600,
    color: "#1a6fa8",
    letterSpacing: "0.5px",
    marginBottom: "5px",
    display: "block",
  },
  bubbleLg: {
    width: "280px", height: "280px", borderRadius: "50%",
    background: "radial-gradient(circle, rgba(120,210,255,0.22) 0%, transparent 70%)",
  },
  bubbleSm: {
    width: "160px", height: "160px", borderRadius: "50%",
    background: "radial-gradient(circle, rgba(180,230,255,0.18) 0%, transparent 70%)",
  },
  dot: {
    width: "8px", height: "8px", borderRadius: "50%",
    background: "#22c55e", boxShadow: "0 0 8px #22c55e",
    display: "inline-block", animation: "aeroPulse 2s infinite",
    flexShrink: 0,
  },
};

const INITIAL = { name: "", email: "", subject: "", message: "" };

export function Contact() {
  const { t } = useTranslation('portfolio');
  const contact = t('contact', { returnObjects: true }) || {};

  const [form,    setForm]    = useState(INITIAL);
  const [focused, setFocused] = useState(null);
  const [status,  setStatus]  = useState("idle"); // idle | sending | success | error

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  form.name,
          from_email: form.email,
          subject:    form.subject,
          message:    form.message,
          to_email:   contact.email,
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setForm(INITIAL);
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = name => ({
    ...aero.input,
    ...(focused === name ? aero.inputFocus : {}),
  });

  const isDisabled = status === "sending" || !form.name || !form.email || !form.message;

  return (
    <section className="w-100 h-100 overflow-hidden position-relative" style={aero.section}>
      {/* Gloss */}
      <div className="position-absolute top-0 start-0 end-0 pe-none" style={aero.gloss} />

      {/* Bolhas decorativas */}
      <div className="position-absolute pe-none" style={{ ...aero.bubbleLg, right: "-80px", bottom: "-80px" }} />
      <div className="position-absolute pe-none" style={{ ...aero.bubbleSm, left: "-40px", top: "-40px" }} />

      <div className="d-flex flex-column h-100 px-4 py-4 position-relative" style={{ zIndex: 1 }}>

        {/* Cabeçalho */}
        <div className="mb-3">
          <span className="d-block fw-bold text-uppercase mb-1" style={{ fontSize: "11px", letterSpacing: "4px", color: "#1a80c4" }}>
            Contato
          </span>
          <h2 className="m-0 fw-bold" style={{ fontSize: "22px", color: "#0a3d6b", textShadow: "0 1px 3px rgba(255,255,255,0.7)", lineHeight: 1.2 }}>
            Vamos conversar?
          </h2>
          {contact.message && (
            <p className="mb-0 mt-1" style={{ fontSize: "12px", color: "#2c6a9a", lineHeight: 1.6 }}>
              {contact.message}
            </p>
          )}
        </div>

        {/* Campos */}
        <div className="d-flex flex-column gap-2 flex-grow-1">

          {/* Nome + Email lado a lado */}
          <div className="row g-2">
            <div className="col-6">
              <label style={aero.label}>Nome</label>
              <input
                name="name" value={form.name} placeholder="Seu nome"
                onChange={handleChange}
                onFocus={() => setFocused("name")}
                onBlur={() => setFocused(null)}
                style={inputStyle("name")}
              />
            </div>
            <div className="col-6">
              <label style={aero.label}>Email</label>
              <input
                name="email" type="email" value={form.email} placeholder="seu@email.com"
                onChange={handleChange}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
                style={inputStyle("email")}
              />
            </div>
          </div>

          {/* Assunto */}
          <div>
            <label style={aero.label}>Assunto</label>
            <input
              name="subject" value={form.subject} placeholder="Sobre o que você quer falar?"
              onChange={handleChange}
              onFocus={() => setFocused("subject")}
              onBlur={() => setFocused(null)}
              style={inputStyle("subject")}
            />
          </div>

          {/* Mensagem */}
          <div className="d-flex flex-column flex-grow-1">
            <label style={aero.label}>Mensagem</label>
            <textarea
              name="message" value={form.message} placeholder="Escreva sua mensagem..."
              onChange={handleChange}
              onFocus={() => setFocused("message")}
              onBlur={() => setFocused(null)}
              style={{ ...inputStyle("message"), resize: "none", flex: 1, minHeight: "80px" }}
            />
          </div>

          {/* Rodapé: badge + botão */}
          <div className="d-flex align-items-center gap-3 mt-1">

            {/* Badge de status */}
            <div className="flex-grow-1">
              {status === "idle" && (
                <div className="d-inline-flex align-items-center gap-2 px-3 py-2" style={{
                  background: "rgba(255,255,255,0.50)",
                  border: "1.5px solid rgba(100,220,140,0.40)",
                  borderRadius: "999px",
                  backdropFilter: "blur(8px)",
                  boxShadow: "0 2px 10px rgba(80,200,120,0.10), inset 0 1px 0 rgba(255,255,255,0.6)",
                }}>
                  <span style={aero.dot} />
                  <span className="fw-semibold" style={{ fontSize: "11px", color: "#166534" }}>
                    Disponível para oportunidades
                  </span>
                </div>
              )}
              {status === "sending" && (
                <div className="d-inline-flex align-items-center gap-2">
                  <div className="spinner-border spinner-border-sm" style={{ color: "#38bdf8", width: "14px", height: "14px", borderWidth: "2px" }} />
                  <span className="fw-semibold" style={{ fontSize: "12px", color: "#1a6fa8" }}>Enviando…</span>
                </div>
              )}
              {status === "success" && (
                <div className="d-inline-flex align-items-center gap-2 px-3 py-2" style={{
                  background: "rgba(220,255,230,0.60)",
                  border: "1.5px solid rgba(100,220,140,0.50)",
                  borderRadius: "999px",
                  backdropFilter: "blur(8px)",
                }}>
                  <span>✅</span>
                  <span className="fw-semibold" style={{ fontSize: "11px", color: "#166534" }}>
                    Mensagem enviada com sucesso!
                  </span>
                </div>
              )}
              {status === "error" && (
                <div className="d-inline-flex align-items-center gap-2 px-3 py-2" style={{
                  background: "rgba(255,220,220,0.60)",
                  border: "1.5px solid rgba(220,100,100,0.50)",
                  borderRadius: "999px",
                  backdropFilter: "blur(8px)",
                }}>
                  <span>⚠️</span>
                  <span className="fw-semibold" style={{ fontSize: "11px", color: "#7f1d1d" }}>
                    Erro ao enviar. Tente novamente.
                  </span>
                </div>
              )}
            </div>

            {/* Botão enviar */}
            <button
              onClick={handleSubmit}
              disabled={isDisabled}
              style={{ ...aero.submitBtn, opacity: isDisabled ? 0.6 : 1 }}
              onMouseEnter={e => {
                if (isDisabled) return;
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 22px rgba(14,165,233,0.40), inset 0 1px 0 rgba(255,255,255,0.40)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = aero.submitBtn.boxShadow;
              }}
            >
              Enviar mensagem
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes aeroPulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px #22c55e; }
          50%       { opacity: 0.45; box-shadow: 0 0 3px #22c55e; }
        }
        ::placeholder { color: rgba(26,111,168,0.45); }
      `}</style>
    </section>
  );
}