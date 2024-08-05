import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import i18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import resources from "./resources";

const i18n = i18next.createInstance({
  lng: 'zh-CN',
  fallbackLng: "zh-CN",
  resources,
  fallbackNS: "common",
  nsSeparator: "::",
  interpolation: {
    escapeValue: false
  },
  debug: import.meta.env.DEV
});

i18n.use(initReactI18next);
i18n.use(i18nextBrowserLanguageDetector);

i18n.init().then(
  () => {
    console.log("i18n initialized");
  },
  (err) => {
    console.error("i18n initialization failed", err);
  }
);

export default i18n;
