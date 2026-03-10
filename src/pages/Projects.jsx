import { useTranslation } from 'react-i18next';
import { LiaGithub } from "react-icons/lia";
import { FiExternalLink } from "react-icons/fi";

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
  card: {
    background: "rgba(255,255,255,0.42)",
    border: "1.5px solid rgba(255,255,255,0.65)",
    backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
    boxShadow: "0 4px 16px rgba(80,170,255,0.10), inset 0 1px 0 rgba(255,255,255,0.6)",
    borderRadius: "18px",
  },
  cardHoverShadow: "0 10px 28px rgba(80,170,255,0.22), inset 0 1px 0 rgba(255,255,255,0.6)",
  bubble: {
    width: "220px", height: "220px", borderRadius: "50%",
    background: "radial-gradient(circle, rgba(120,210,255,0.20) 0%, transparent 70%)",
  },
  dot: {
    width: "6px", height: "6px", borderRadius: "50%",
    background: "#38bdf8", boxShadow: "0 0 8px #38bdf8",
  },
  tag: {
    background: "rgba(100,190,255,0.22)",
    border: "1px solid rgba(100,190,255,0.40)",
    borderRadius: "4px",
  },
};

export function Projects() {
  const { t } = useTranslation('portfolio');
  const raw = t('projects', { returnObjects: true });
  const projects = Array.isArray(raw) ? raw : [];

  return (
    <section className="w-100 h-100 overflow-hidden position-relative" style={aero.section}>
      <div className="position-absolute top-0 start-0 end-0 pe-none" style={aero.gloss} />
      <div className="position-absolute pe-none" style={{ ...aero.bubble, left: "-60px", bottom: "-60px" }} />

      <div className="d-flex flex-column gap-3 h-100 p-4 position-relative" style={{ zIndex: 1 }}>

        {/* Cabeçalho */}
        <div className="d-flex align-items-center gap-2">
          <div style={aero.dot} />
          <span className="fw-bold text-uppercase" style={{ fontSize: "11px", letterSpacing: "3px", color: "#1a80c4" }}>
            Projetos
          </span>
        </div>

        {/* Cards */}
        <div className="row g-3 flex-grow-1">
          {projects.map((project, i) => (
            <div key={i} className="col-4 d-flex">
              <button
                type="button"
                className="d-flex flex-column gap-2 p-3 w-100 h-100"
                style={{ ...aero.card, transition: "transform 0.15s, box-shadow 0.15s" }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = aero.cardHoverShadow;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow = aero.card.boxShadow;
                }}
              >
              <span className="fw-bold" style={{ fontSize: "10px", letterSpacing: "2px", color: "#1a80c4" }}>
                {String(i + 1).padStart(2, "0")}
              </span>

              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: "100%",
                    height: "110px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    border: "1px solid rgba(255,255,255,0.6)"
                  }}
                />
              )}

                <h3 className="m-0 fw-bold" style={{ fontSize: "14px", color: "#0a3d6b", lineHeight: 1.3 }}>
                  {project.title}
                </h3>

                <p className="m-0 flex-grow-1" style={{ fontSize: "12px", color: "#2c6a9a", lineHeight: 1.6 }}>
                  {project.description}
                </p>

                <div className="d-flex flex-wrap gap-1">
                  {project.tags.map(tag => (
                    <span key={tag} className="badge fw-semibold" style={{ ...aero.tag, color: "#0d5c96", fontSize: "10px" }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <a href={project.link} target="_blank" rel="noreferrer"
                  className="d-inline-flex align-items-center gap-1 mt-auto text-decoration-none fw-bold"
                  style={{ fontSize: "11px", color: "#0d5c96" }}>
                  <LiaGithub size={14} /> Ver repositório <FiExternalLink size={10} />
                </a>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}