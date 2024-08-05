import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const useHtmlLangSelector = () => {
  const { i18n } = useTranslation();
  useEffect(() => {
    window.document.documentElement.lang = String(i18n.language).toLowerCase();
  }, [i18n.language]);

  return window.document.documentElement.lang;
};

export default useHtmlLangSelector;
