import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import ptUI        from './locales/pt.json'
import enUI        from './locales/en.json'
import ptPortfolio from './locales/pt-portfolio.json'
import enPortfolio from './locales/en-portfolio.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'pt',
    ns: ['ui', 'portfolio'],
    defaultNS: 'portfolio',
    resources: {
      pt: { ui: ptUI, portfolio: ptPortfolio },
      en: { ui: enUI, portfolio: enPortfolio },
    },
    interpolation: { escapeValue: false },
  })

export default i18n