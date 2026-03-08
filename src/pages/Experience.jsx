import { useTranslation } from 'react-i18next';
import { MdWork, MdSchool } from "react-icons/md";

/* CSS-in-JS apenas para o que Bootstrap não cobre */
const css = `
  .exp-section {
    background: linear-gradient(
      145deg,
      rgba(180,225,255,0.82) 0%,
      rgba(210,240,255,0.75) 50%,
      rgba(160,215,255,0.80) 100%
    );
    backdrop-filter: blur(18px) saturate(1.6);
    -webkit-backdrop-filter: blur(18px) saturate(1.6);
    border: 1.5px solid rgba(255,255,255,0.65);
    box-shadow: 0 8px 40px rgba(80,180,255,0.18), inset 0 1.5px 0 rgba(255,255,255,0.7);
    border-radius: 28px;
    overflow: hidden;
    position: relative;
  }

  .exp-gloss {
    position: absolute;
    inset: 0;
    pointer-events: none;
    height: 48%;
    border-radius: 28px 28px 60% 60% / 28px 28px 36px 36px;
    background: linear-gradient(180deg, rgba(255,255,255,0.52) 0%, rgba(255,255,255,0) 100%);
  }

  .exp-bubble {
    position: absolute;
    width: 220px;
    height: 220px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(120,210,255,0.18) 0%, transparent 70%);
    right: -60px;
    top: -60px;
    pointer-events: none;
  }

  .exp-divider {
    width: 1.5px;
    background: linear-gradient(
      180deg,
      transparent,
      rgba(100,190,255,0.35) 30%,
      rgba(100,190,255,0.35) 70%,
      transparent
    );
    flex-shrink: 0;
  }

  /* Divisor horizontal em mobile */
  .exp-divider-h {
    height: 1.5px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(100,190,255,0.35) 30%,
      rgba(100,190,255,0.35) 70%,
      transparent
    );
  }

  .exp-icon-circle {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    backdrop-filter: blur(6px);
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .exp-icon-col {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .exp-connector {
    width: 1.5px;
    background: rgba(100,180,255,0.20);
    flex-grow: 1;
    margin-top: 4px;
  }

  .exp-badge {
    background: rgba(255,255,255,0.50);
    border: 1px solid rgba(100,190,255,0.35);
    backdrop-filter: blur(6px);
    border-radius: 4px;
    font-size: 10px;
    white-space: nowrap;
    padding: 2px 7px;
  }

  .exp-col-header-label {
    font-size: 11px;
    letter-spacing: 3px;
    font-weight: 700;
    text-transform: uppercase;
  }

  .exp-item-title {
    font-size: 13px;
    font-weight: 700;
    color: #0a3d6b;
  }

  .exp-item-subtitle {
    font-size: 11px;
    font-weight: 600;
    margin-top: 1px;
  }

  .exp-item-desc {
    font-size: 12px;
    color: #2c6a9a;
    line-height: 1.6;
  }

  /* Scroll suave nas colunas em desktop */
  .exp-scroll {
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: thin;
    scrollbar-color: rgba(100,190,255,0.3) transparent;
  }

  .exp-scroll::-webkit-scrollbar { width: 4px; }
  .exp-scroll::-webkit-scrollbar-track { background: transparent; }
  .exp-scroll::-webkit-scrollbar-thumb { background: rgba(100,190,255,0.3); border-radius: 2px; }

  @media (max-width: 767.98px) {
    .exp-section { border-radius: 20px; }
    .exp-gloss   { border-radius: 20px 20px 60% 60% / 20px 20px 28px 28px; }
    .exp-icon-circle { width: 28px; height: 28px; }
  }
`;

/*  Helpers de estilo*/
function iconCircleStyle(accent) {
  return { background: `${accent}22`, border: `1.5px solid ${accent}55`, boxShadow: `0 2px 10px ${accent}25` };
}
function colIconCircleStyle(accent) {
  return { background: `${accent}20`, border: `1.5px solid ${accent}50` };
}

/*  Sub-componentes */
function ColHeader({ icon, label, accent }) {
  return (
    <div className="d-flex align-items-center gap-2 mb-3">
      <div className="exp-icon-col" style={colIconCircleStyle(accent)}>
        {icon}
      </div>
      <span className="exp-col-header-label" style={{ color: accent }}>
        {label}
      </span>
    </div>
  );
}

function TimelineItem({ icon: Icon, accent, title, subtitle, period, description, isLast }) {
  return (
    <div className="d-flex gap-3">
      {/* Ícone + linha vertical */}
      <div className="d-flex flex-column align-items-center flex-shrink-0">
        <div className="exp-icon-circle" style={iconCircleStyle(accent)}>
          <Icon size={14} color={accent} />
        </div>
        {!isLast && <div className="exp-connector" />}
      </div>

      {/* Conteúdo */}
      <div className={`flex-grow-1 ${isLast ? 'pb-0' : 'pb-3'}`}>
        <div className="d-flex justify-content-between align-items-start gap-2 flex-wrap">
          <div className="flex-grow-1" style={{ minWidth: 0 }}>
            <p className="mb-0 exp-item-title text-truncate">{title}</p>
            <p className="mb-0 exp-item-subtitle" style={{ color: accent }}>{subtitle}</p>
          </div>
          <span className="exp-badge flex-shrink-0" style={{ color: "#1a6fa8" }}>
            {period}
          </span>
        </div>
        <p className="mt-2 mb-0 exp-item-desc">{description}</p>
      </div>
    </div>
  );
}

/* Componente principal */
export function Experience() {
  const { t } = useTranslation('portfolio');
  const experience = t('experience', { returnObjects: true }) || {};
  const jobs      = Array.isArray(experience.jobs)      ? experience.jobs      : [];
  const education = Array.isArray(experience.education) ? experience.education : [];

  if (!jobs.length && !education.length) {
    return (
      <section className="exp-section w-100 h-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border" style={{ color: "#38bdf8", width: "28px", height: "28px" }} role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </section>
    );
  }

  return (
    <>
      <style>{css}</style>

      <section className="exp-section w-100 h-100">
        <div className="exp-gloss" />
        <div className="exp-bubble" />

        {/* Layout interno: row Bootstrap, empilha em mobile */}
        <div className="position-relative h-100 p-3 p-md-4" style={{ zIndex: 1 }}>
          <div className="row g-0 h-100">

            {/* Coluna Experiência */}
            <div className="col-12 col-md d-flex flex-column">
              <ColHeader
                icon={<MdWork size={13} color="#e8a020" />}
                label={t('experience.jobsLabel', 'Experiência')}
                accent="#c07820"
              />
              <div className="exp-scroll flex-grow-1">
                {jobs.map((job, i) => (
                  <TimelineItem
                    key={i}
                    icon={MdWork}
                    accent="#d08820"
                    title={job.role}
                    subtitle={job.company}
                    period={job.period}
                    description={job.description}
                    isLast={i === jobs.length - 1}
                  />
                ))}
              </div>
            </div>

            <div className="d-none d-md-block exp-divider mx-3 mx-lg-4 align-self-stretch" />
            <div className="d-block d-md-none exp-divider-h my-3" />

            {/*  Coluna Educação  */}
            <div className="col-12 col-md d-flex flex-column">
              <ColHeader
                icon={<MdSchool size={13} color="#8b5cf6" />}
                label={t('experience.educationLabel', 'Educação')}
                accent="#7c3aed"
              />
              <div className="exp-scroll flex-grow-1">
                {education.map((edu, i) => (
                  <TimelineItem
                    key={i}
                    icon={MdSchool}
                    accent="#7c3aed"
                    title={edu.degree}
                    subtitle={edu.institution}
                    period={edu.period}
                    description={edu.description}
                    isLast={i === education.length - 1}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}