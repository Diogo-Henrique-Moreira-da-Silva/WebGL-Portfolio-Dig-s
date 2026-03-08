import { useTranslation } from 'react-i18next';
import { HiOutlineMailOpen } from "react-icons/hi";
import { LiaGithub } from "react-icons/lia";
import { FaLinkedin } from "react-icons/fa";

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
    height: "52%",
    borderRadius: "28px 28px 60% 60% / 28px 28px 40px 40px",
    background: "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.0) 100%)",
  },
  photo: {
    width: "110px", height: "110px", borderRadius: "50%",
    border: "3px solid rgba(255,255,255,0.8)",
    boxShadow: "0 4px 20px rgba(80,160,255,0.30), 0 0 0 5px rgba(130,200,255,0.25)",
    objectFit: "cover",
  },
  photoRing: {
    inset: "-7px",
    borderRadius: "50%",
    border: "2px solid rgba(120,200,255,0.45)",
  },
  link: {
    background: "rgba(255,255,255,0.55)",
    border: "1px solid rgba(100,190,255,0.45)",
    backdropFilter: "blur(8px)",
    boxShadow: "0 2px 8px rgba(80,170,255,0.12), inset 0 1px 0 rgba(255,255,255,0.7)",
    borderRadius: "20px",
  },
  bubble: {
    width: "260px", height: "260px", borderRadius: "50%",
    background: "radial-gradient(circle, rgba(120,210,255,0.22) 0%, transparent 70%)",
  },
};

export function About() {
  const { t } = useTranslation('portfolio');
  const about = t('about', { returnObjects: true });

  const handleLinkEnter = e => {
    e.currentTarget.style.transform = "translateY(-2px)";
    e.currentTarget.style.boxShadow = "0 6px 18px rgba(80,170,255,0.22), inset 0 1px 0 rgba(255,255,255,0.7)";
  };
  const handleLinkLeave = e => {
    e.currentTarget.style.transform = "";
    e.currentTarget.style.boxShadow = aero.link.boxShadow;
  };

  return (
    <section className="w-100 h-100 overflow-hidden position-relative box-sizing-border" style={aero.section}>

      {/* Gloss layer */}
      <div className="position-absolute top-0 start-0 end-0 pe-none" style={aero.gloss} />

      {/* Bolha decorativa */}
      <div className="position-absolute pe-none" style={{ ...aero.bubble, right: "-60px", bottom: "-80px" }} />

      <div className="d-flex align-items-center gap-4 h-100 px-4 position-relative" style={{ zIndex: 1 }}>

        {/* Foto */}
        <div className="flex-shrink-0 text-center position-relative d-inline-block">
          <img src={about.photo} alt={about.name} style={aero.photo} />
          <div className="position-absolute pe-none" style={aero.photoRing} />
        </div>

        {/* Conteúdo */}
        <div className="d-flex flex-column gap-2 flex-grow-1">
          <span className="fw-500" style={{ fontSize: "12px", color: "#2980b9" }}>📍 {about.location}</span>

          <h1 className="m-0 fw-bold" style={{ color: "#0a3d6b", fontSize: "26px", textShadow: "0 1px 2px rgba(255,255,255,0.6)" }}>
            {about.name}
          </h1>

          <h2 className="m-0 fw-medium" style={{ color: "#1a6fa8", fontSize: "14px" }}>
            {about.role}
          </h2>

          <p className="m-0" style={{ fontSize: "13px", color: "#1c4f7a", lineHeight: 1.65, marginTop: "10px" }}>
            {about.bio}
          </p>

          <div className="d-flex flex-wrap gap-2 mt-2">
            {[
              { href: `mailto:${about.email}`, icon: HiOutlineMailOpen, label: about.email },
              { href: about.linkedin,          icon: FaLinkedin,        label: "LinkedIn" },
              { href: about.github,            icon: LiaGithub,         label: "GitHub" },
            ].map(({ href, icon: Icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer"
                className="d-inline-flex align-items-center gap-2 text-decoration-none fw-semibold"
                style={{ ...aero.link, padding: "7px 14px", fontSize: "12px", color: "#0d5c96", transition: "transform 0.15s, box-shadow 0.15s" }}
                onMouseEnter={handleLinkEnter}
                onMouseLeave={handleLinkLeave}
              >
                <Icon /> {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}