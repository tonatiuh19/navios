import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

// Import translations
import en from "./locales/en.json";
import es from "./locales/es.json";

const resources = {
  en: { translation: en },
  es: { translation: es },
};

i18n
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    resources,
    lng: Localization.locale.split("-")[0], // Detect device language (e.g., "en" or "es")
    fallbackLng: "en", // Fallback language if the device language is not available
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
