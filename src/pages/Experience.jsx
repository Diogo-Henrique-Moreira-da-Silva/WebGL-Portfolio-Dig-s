import { useTranslation } from 'react-i18next';
import { MdWork, MdSchool } from "react-icons/md";

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
  divider: {
    width: "1.5px",
    background: "linear-gradient(180deg, transparent, rgba(100,190,255,0.35) 30%, rgba(100,190,255,0.35) 70%, transparent)",
  },
  bubble: {
    width: "240px", height: "240px", borderRadius: "50%",
    background: "radial-gradient(circle, rgba(120,210,255,0.18) 0%, transparent 70%)",
  },
  badge: {
    background: "rgba(255,255,255,0.50)",
    border: "1px solid rgba(100,190,255,0.35)",
    backdropFilter: "blur(6px)",
    borderRadius: "4px",
  },
};

function iconCircle(accent) {
  return {
    width: "32px", height: "32px", borderRadius: "50%",
    background: `${accent}22`,
    border: `1.5px solid ${accent}55`,
    backdropFilter: "blur(6px)",
    boxShadow: `0 2px 10px ${accent}25`,
  };
}

function colIconCircle(accent) {
  return {
    width: "26px", height: "26px", borderRadius: "50%",
    background: `${accent}20`,
    border: `1.5px solid ${accent}50`,
  };
}

function TimelineItem({ icon: Icon, accent, title, subtitle, period, description }) {
  return (
    <div className="d-flex gap-3 position-relative">
      {/* Ícone + linha vertical */}
      <div className="d-flex flex-column align-items-center flex-shrink-0">
        <div className="d-flex align-items-center justify-content-center" style={iconCircle(accent)}>
          <Icon size={14} color={accent} />
        </div>
        <div className="flex-grow-1 mt-1" style={{ width: "1.5px", background: "rgba(100,180,255,0.20)" }} />
      </div>

      {/* Texto */}
      <div className="pb-3 flex-grow-1">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <p className="mb-0 fw-bold" style={{ fontSize: "13px", color: "#0a3d6b" }}>{title}</p>
            <p className="mb-0 fw-semibold" style={{ fontSize: "11px", color: accent, marginTop: "1px" }}>{subtitle}</p>
          </div>
          <span className="badge ms-2 fw-medium" style={{ ...aero.badge, color: "#1a6fa8", fontSize: "10px" }}>
            {period}
          </span>
        </div>
        <p className="mt-2 mb-0" style={{ fontSize: "12px", color: "#2c6a9a", lineHeight: 1.6 }}>
          {description}
        </p>
      </div>
    </div>
  );
}

function ColHeader({ icon, label, accent }) {
  return (
    <div className="d-flex align-items-center gap-2 mb-3">
      <div className="d-flex align-items-center justify-content-center" style={colIconCircle(accent)}>
        {icon}
      </div>
      <span className="fw-bold text-uppercase" style={{ fontSize: "11px", letterSpacing: "3px", color: accent }}>
        {label}
      </span>
    </div>
  );
}

export function Experience() {
  const { t } = useTranslation('portfolio');
  const experience = t('experience', { returnObjects: true }) || {};
  const jobs      = Array.isArray(experience.jobs)      ? experience.jobs      : [];
  const education = Array.isArray(experience.education) ? experience.education : [];

  if (!jobs.length && !education.length) return (
    <section className="w-100 h-100 d-flex align-items-center justify-content-center" style={aero.section}>
      <div className="spinner-border" style={{ color: "#38bdf8", width: "28px", height: "28px" }} />
    </section>
  );

  return (
    <section className="w-100 h-100 overflow-hidden position-relative" style={aero.section}>
      {/* Gloss */}
      <div className="position-absolute top-0 start-0 end-0 pe-none" style={aero.gloss} />

      {/* Bolha decorativa */}
      <div className="position-absolute pe-none" style={{ ...aero.bubble, right: "-70px", top: "-70px" }} />

      <div className="d-flex gap-0 h-100 p-4 position-relative" style={{ zIndex: 1 }}>

        {/* Coluna Experiência */}
        <div className="flex-grow-1 d-flex flex-column overflow-hidden">
          <ColHeader icon={<MdWork size={13} color="#e8a020" />} label="Experiência" accent="#c07820" />
          <div className="overflow-auto flex-grow-1">
            {jobs.map((job, i) => (
              <TimelineItem key={i} icon={MdWork} accent="#d08820"
                title={job.role} subtitle={job.company}
                period={job.period} description={job.description} />
            ))}
          </div>
        </div>

        {/* Divisor aero */}
        <div className="align-self-stretch mx-4" style={aero.divider} />

        {/* Coluna Educação */}
        <div className="flex-grow-1 d-flex flex-column overflow-hidden">
          <ColHeader icon={<MdSchool size={13} color="#8b5cf6" />} label="Educação" accent="#7c3aed" />
          <div className="overflow-auto flex-grow-1">
            {education.map((edu, i) => (
              <TimelineItem key={i} icon={MdSchool} accent="#7c3aed"
                title={edu.degree} subtitle={edu.institution}
                period={edu.period} description={edu.description} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}