import { forwardRef, CSSProperties, ReactNode, Ref } from "react";
import lo from "lodash-es";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  CardProps,
  CardHeaderProps,
  CardContentProps
} from "@mui/material";

// project import
import { makeStyles } from "@/themes/hooks";

// types
import { KeyedObject } from "@/types/root";

// ==============================|| CUSTOM - MAIN CARD ||============================== //

export interface MainCardProps extends KeyedObject {
  border?: boolean;
  boxShadow?: boolean;
  children: ReactNode | string;
  subheader?: ReactNode | string;
  style?: CSSProperties;
  content?: boolean;
  contentSX?: CardContentProps["sx"];
  darkTitle?: boolean;
  divider?: boolean;
  sx?: CardProps["sx"];
  secondary?: CardHeaderProps["action"];
  shadow?: string;
  elevation?: number;
  title?: ReactNode | string;
  modal?: boolean;
}

const useStyles = makeStyles<MainCardProps>({
  name: "MainCard"
})((theme, { border = true, shadow, boxShadow, modal = false }) => ({
  card: {
    position: "relative",
    border: border ? "1px solid" : "none",
    borderRadius: 1,
    borderColor: theme.palette.mode === "dark" ? theme.palette.divider : theme.palette.grey.A800,
    boxShadow:
      (theme.palette.mode === "dark" ? boxShadow || true : boxShadow) && (!border || theme.palette.mode === "dark")
        ? lo.isEmpty(shadow)
          ? theme.customShadows.z1
          : shadow
        : "inherit",
    ":hover": {
      boxShadow: boxShadow ? shadow || theme.customShadows.z1 : "inherit"
    },
    ...(modal && {
      position: "absolute" as "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: `calc(100% - 50px)`,
      [theme.breakpoints.up("sm")]: {
        width: "auto"
      },
      "& .MuiCardContent-root": {
        overflowY: "auto",
        minHeight: "auto",
        maxHeight: `calc(100vh - 200px)`
      }
    })
  },
  header: {
    p: 2.5,
    "& .MuiCardHeader-action": { m: "0px auto", alignSelf: "center" }
  }
}));

const MainCard = forwardRef<HTMLDivElement, MainCardProps>((props, ref) => {
  const theme = useTheme();

  const {
    border = true,
    boxShadow: _boxShadow,
    children,
    className,
    subheader,
    content = true,
    contentSX = {},
    darkTitle,
    divider = true,
    elevation,
    secondary,
    shadow,
    sx = {},
    title,
    modal = false,
    ...others
  } = props;

  const { classes, cx } = useStyles(props);

  return (
    <Card className={cx(classes.card, className)} elevation={elevation || 0} ref={ref} {...others} sx={sx}>
      {/* card header and action */}
      {!darkTitle && title && (
        <CardHeader
          className={classes.header}
          titleTypographyProps={{ variant: "subtitle1" }}
          title={title}
          action={secondary}
          subheader={subheader}
        />
      )}
      {darkTitle && title && (
        <CardHeader
          className={classes.header}
          title={<Typography variant="h4">{title}</Typography>}
          action={secondary}
        />
      )}

      {/* content & header divider */}
      {title && divider && <Divider />}

      {/* card content */}
      {content && <CardContent sx={contentSX}>{children}</CardContent>}
      {!content && children}
    </Card>
  );
});

export default MainCard;
