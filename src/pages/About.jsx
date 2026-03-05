import { useTranslation } from 'react-i18next';
import { HiOutlineMailOpen } from "react-icons/hi";
import { LiaGithub } from "react-icons/lia";
import { FaLinkedin } from "react-icons/fa";

export function About() {
  const { t } = useTranslation('portfolio');
  const about = t('about', { returnObjects: true });

  return (
    <section className="about-section">
      <div className="about-photo-wrapper">
        <img src={about.photo} alt={about.name} className="about-photo" />
        <div className="about-photo-ring" />
      </div>

      <div className="about-content">
        <span className="about-location">📍 {about.location}</span>
        <h1 className="about-name">{about.name}</h1>
        <h2 className="about-role">{about.role}</h2>
        <p className="about-bio">{about.bio}</p>

        <div className="about-links">
          <a href={`mailto:${about.email}`} className="about-link">
            <HiOutlineMailOpen /> {about.email}
          </a>
          <a href={about.linkedin} target="_blank" rel="noreferrer" className="about-link">
            <FaLinkedin /> LinkedIn
          </a>
          <a href={about.github} target="_blank" rel="noreferrer" className="about-link">
            <LiaGithub /> GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
