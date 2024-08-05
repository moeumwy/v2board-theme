import React from "react";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

// material-ui
import { Box, ButtonBase, Chip, Dialog, DialogContent, DialogTitle, Typography, useMediaQuery } from "@mui/material";
import Carousel from "react-material-ui-carousel";

// project imports
import { useGetNoticesQuery } from "@/store/services/api";
import { makeStyles } from "@/themes/hooks";

// assets
import defaultBackgroundImage from "@/assets/images/announcement_background.svg";
import Notice from "@/model/notice";
import MuiMarkdown from "mui-markdown";
import { useTheme } from "@mui/material/styles";
import ReactGA from "react-ga4";

const useStyles = makeStyles()((theme) => ({
  carousel: {
    borderRadius: theme.shape.borderRadius
  },
  item: {
    height: theme.spacing(24),
    width: "100%",
    boxShadow: "0 1px 3px rgb(219 226 239 / 50%), 0 1px 2px rgb(219 226 239 / 50%)",
    textAlign: "left"
  },
  mask: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)",
    opacity: 0.5
  },
  chip: {
    position: "absolute",
    top: theme.spacing(2),
    left: theme.spacing(2)
  },
  textArea: {
    position: "absolute",
    bottom: theme.spacing(1),
    left: theme.spacing(2),
    maxWidth: "80%",
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(1, 1, 1, 0.5)
  }
}));

const NoticeBlock: React.FC<{
  notice: Notice;
}> = ({ notice }) => {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();

  const { classes } = useStyles();

  return (
    <>
      <Box
        component={ButtonBase}
        key={notice.id}
        className={classes.item}
        sx={{
          backgroundImage: `url(${notice.img_url || defaultBackgroundImage})`
        }}
        onClick={() => {
          setOpen(true);

          ReactGA.event("click", {
            category: "notice",
            label: "notice_open",
            id: notice.id,
            title: notice.title
          });
        }}
      >
        <Box className={classes.mask} />
        <Chip className={classes.chip} label={t("dashboard.announcement.chip")} color="secondary" />
        <Box className={classes.textArea}>
          <Typography variant={"h4"} mb={0.5}>
            {notice.title}
          </Typography>
          <Typography variant={"body1"}>{dayjs.unix(notice.created_at).format("YYYY-MM-DD")}</Typography>
        </Box>
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>{notice.title}</DialogTitle>
        <DialogContent
          sx={{
            minHeight: 160
          }}
        >
          <MuiMarkdown>{notice.content}</MuiMarkdown>
        </DialogContent>
      </Dialog>
    </>
  );
};

const NoticeCarousel: React.FC = () => {
  const { data: notices } = useGetNoticesQuery();

  const { classes } = useStyles();

  const theme = useTheme();
  const isMobileSize = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Carousel
      autoPlay
      swipe={isMobileSize}
      stopAutoPlayOnHover
      interval={5000}
      animation={"slide"}
      duration={500}
      fullHeightHover={false}
      navButtonsAlwaysInvisible={isMobileSize}
      className={classes.carousel}
    >
      {notices?.map((notice) => (
        <NoticeBlock notice={notice} key={notice.id} />
      ))}
    </Carousel>
  );
};

export default NoticeCarousel;
