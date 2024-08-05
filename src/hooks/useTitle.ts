import React, { useEffect } from "react";
import lo from "lodash-es";
import { useTranslation } from "react-i18next";

// project imports
import config from "@/config";

export interface useTitleFn {
  (title: string | null, deps?: React.DependencyList): void;
}

const useTitle: useTitleFn = (title, deps = []) => {
  const { t } = useTranslation();
  useEffect(() => {
    window.document.title = lo.isNull(title)
      ? `${config.title}`
      : `${t(title, { ns: "title" })}${config.title_split}${config.title}`;
  }, [t, title, ...deps]);
};

export default useTitle;
