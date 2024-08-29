import React, { useState, useEffect } from "react";
import { Grid, Dialog, DialogContent, Box, DialogTitle as MuiDialogTitle } from "@mui/material";

// project imports
import NoticeCarousel from "@/sections/dashboard/noticeCarousel";
import SubscriptionCard from "@/sections/dashboard/subscriptionCard";
import ShortcutCard from "@/sections/dashboard/shortcutCard";
import OrderPendingAlert from "@/sections/dashboard/alerts/orderPendingAlert";
import MuiMarkdown from "mui-markdown";
import { makeStyles } from "@/themes/hooks";
import Notice from "@/model/notice";
import defaultBackgroundImage from "@/assets/images/announcement_background.svg";

const useStyles = makeStyles()((theme) => ({
  dialogImage: {
    width: '100%',
    height: 'auto',
    marginBottom: theme.spacing(2),
  },
  dialogTitle: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
  }
}));

const Dashboard: React.FC = () => {
  const [latestNotice, setLatestNotice] = useState<Notice | null>(null);
  const { classes } = useStyles();

  useEffect(() => {
    // 检查 localStorage 中是否存在弹框关闭的标记
    const hasClosedNotice = localStorage.getItem('hasClosedNotice');
    if (hasClosedNotice) {
      setLatestNotice(null);
    }
  }, []);

  const handleCloseDialog = () => {
    setLatestNotice(null);
    // 弹框关闭后设置标记
    localStorage.setItem('hasClosedNotice', 'true');
  };

  const handleLatestNotice = (notice: Notice | null) => {
    const hasClosedNotice = localStorage.getItem('hasClosedNotice');
    if (!hasClosedNotice) {
      setLatestNotice(notice);
    }
  };

  return (
    <Grid
      container
      rowSpacing={2}
      columnSpacing={{
        xs: 1,
        md: 2
      }}
    >
      <Grid item xs={12}>
        <OrderPendingAlert />
      </Grid>
      <Grid item xs={12}>
        <NoticeCarousel onLatestNotice={handleLatestNotice} />
      </Grid>
      <Grid item xs={12}>
        <SubscriptionCard />
      </Grid>
      <Grid item xs={12}>
        <ShortcutCard />
      </Grid>

      {/* 弹出最近的公告 */}
      {latestNotice && (
        <Dialog open={Boolean(latestNotice)} onClose={handleCloseDialog} fullWidth>
          <Box
            component="img"
            src={latestNotice.img_url || defaultBackgroundImage}
            alt={latestNotice.title}
            className={classes.dialogImage}
          />
          <MuiDialogTitle className={classes.dialogTitle}>{latestNotice.title}</MuiDialogTitle>
          <DialogContent sx={{ minHeight: 160 }}>
            <MuiMarkdown>{latestNotice.content}</MuiMarkdown>
          </DialogContent>
        </Dialog>
      )}
    </Grid>
  );
};

export default Dashboard;
