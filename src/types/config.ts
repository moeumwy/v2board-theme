export type ThemeDirection = "ltr" | "rtl";
export type FontFamily =
  | `'Inter', sans-serif`
  | `'Poppins', sans-serif`
  | `'Roboto', sans-serif`
  | `'Public Sans', sans-serif`;

// ==============================|| CONFIG TYPES  ||============================== //

export type CustomizationActionProps = {
  type: string;
  payload?: CustomizationProps;
};

export type DefaultConfigProps = {
  defaultPath: string;
  fontFamily: FontFamily;
  miniDrawer: boolean;
  container: boolean;
  themeDirection: ThemeDirection;
  title: string;
  title_split: string;
  background_url: string;
  description: string;
  logo: string | null;
  api: string;
  languages: string[];
  googleAnalytics?: {
    measurementId: string;
  };
  emojiEndpoint?: string;
  startYear?: number;
};

export type CustomizationProps = {
  defaultPath: string;
  fontFamily: FontFamily;
  miniDrawer: boolean;
  container: boolean;
  themeDirection: ThemeDirection;
  onChangeContainer: VoidFunction;
  onChangeDirection: (direction: ThemeDirection) => void;
  onChangeMiniDrawer: (miniDrawer: boolean) => void;
  onChangeFontFamily: (fontFamily: FontFamily) => void;
};
