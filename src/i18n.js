import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpBackend from 'i18next-http-backend'

import ptUI from './locales/pt.json'
import enUI from './locales/en.json'

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'pt',

    ns: ['ui', 'portfolio'],
    defaultNS: 'portfolio',

    resources: {
      pt: { ui: ptUI },
      en: { ui: enUI }
    },

    backend: {
      loadPath: '/locales/{{lng}}-{{ns}}.json'
    },

    interpolation: {
      escapeValue: false
    }
  })

export default i18n