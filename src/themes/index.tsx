import { ReactNode, useMemo } from "react";
import dayjs from "dayjs";

// material-ui
import { CssBaseline, PaletteMode, StyledEngineProvider, useMediaQuery } from "@mui/material";
import { createTheme, ThemeOptions, ThemeProvider, Theme, TypographyVariantsOptions } from "@mui/material/styles";
import "@mui/x-data-grid/themeAugmentation";

// project import
import useConfig from "@/hooks/useConfig";
import Palette from "./palette";
import Typography from "./typography";
import CustomShadows from "./shadows";
import componentsOverride from "./overrides";
import { useSelector } from "@/store";

// types
import { CustomShadowProps } from "@/types/theme";

// types
type ThemeCustomizationProps = {
  children: ReactNode;
};

// ==============================|| DEFAULT THEME - MAIN  ||============================== //

export default function ThemeCustomization({ children }: ThemeCustomizationProps) {
  const { themeDirection, fontFamily } = useConfig();
  const modeSelect = useSelector((state) => state.view.theme.mode);
  const isSystemDark = useMediaQuery("(prefers-color-scheme: dark)");
  const mode = useMemo<PaletteMode>(() => {
    switch (modeSelect) {
      case "system":
      default:
        return isSystemDark ? "dark" : "light";
      case "dark":
        return "dark";
      case "light":
        return "light";
      case "time":
        return dayjs().isAfter(dayjs().hour(18)) || dayjs().isBefore(dayjs().hour(6)) ? "dark" : "light";
    }
  }, [modeSelect, isSystemDark, dayjs]);

  const theme: Theme = useMemo<Theme>(() => Palette(mode), [mode]);

  const themeTypography: TypographyVariantsOptions = useMemo<TypographyVariantsOptions>(
    () => Typography(mode, fontFamily, theme),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mode, fontFamily]
  );
  const themeCustomShadows: CustomShadowProps = useMemo<CustomShadowProps>(() => CustomShadows(theme), [theme]);

  const themeOptions: ThemeOptions = useMemo(
    () => ({
      breakpoints: {
        values: {
          xs: 0,
          sm: 768,
          md: 1024,
          lg: 1266,
          xl: 1440
        }
      },
      direction: themeDirection,
      mixins: {
        toolbar: {
          minHeight: 60,
          paddingTop: 8,
          paddingBottom: 8
        }
      },
      palette: theme.palette,
      customShadows: themeCustomShadows,
      typography: themeTypography
    }),
    [themeDirection, theme, themeTypography, themeCustomShadows]
  );

  const themes: Theme = createTheme(themeOptions);
  themes.components = componentsOverride(themes);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
