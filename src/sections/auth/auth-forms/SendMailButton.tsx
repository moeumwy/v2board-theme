import React, { useState, useEffect } from "react";
import lo from "lodash-es";

// material-ui
import { Dialog, DialogContent, DialogTitle, InputAdornment } from "@mui/material";
import { useSnackbar } from "notistack";

// third party
// import ReCaptcha from "react-google-recaptcha";
import  Turnstile  from 'react-turnstile';
import { Trans, useTranslation } from "react-i18next";

// project import
import IconButton from "@/components/@extended/IconButton";
import { useGetGuestConfigQuery, useSendEmailVerifyMutation } from "@/store/services/api";

// assets
import { SendOutlined } from "@ant-design/icons";
import ReactGA from "react-ga4";

// ============================|| AUTH - SEND EMAIL VERIFY ||============================ //

export interface SendMailButtonProps {
  email: string;
}

export const SendMailWithCaptchaButton: React.FC<SendMailButtonProps> = ({ email }) => {
  const { data: guestConfig } = useGetGuestConfigQuery();
  const [sendEmailVerify, { isLoading }] = useSendEmailVerifyMutation();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const [open, setOpen] = React.useState(false);
  const [cooldown, setCooldown] = useState(0);
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const emailSuffix = email.split("@")[1];
  const handleVerify = (token: string) => {
    if (guestConfig?.email_whitelist_suffix && 
      Array.isArray(guestConfig.email_whitelist_suffix) && 
      !guestConfig.email_whitelist_suffix.includes(emailSuffix)) {
      enqueueSnackbar(t("auth.captcha.white_email"), { variant: "error" });
      return;
    }
    sendEmailVerify({ email, recaptcha_data: token })
      .unwrap()
      .then(() => {
        enqueueSnackbar(t("auth.captcha.success"), { variant: "success" });
        ReactGA.event("send_email_verify", {
          category: "auth",
          label: "send_email_verify",
          email: email,
          success: true,
        });
        setCooldown(60); // 开启 60 秒冷却时间
      })
      .catch((err: any) => {
        console.error(err);
        enqueueSnackbar(t("auth.captcha.error"), { variant: "error" });
        ReactGA.event("send_email_verify", {
          category: "auth",
          label: "send_email_verify",
          email: email,
          success: false,
          error: err,
        });
      })
      .finally(() => {
        setOpen(false);
      });
  };

  return (
    <>
      <InputAdornment position="end">
        <IconButton
          aria-label="send email code"
          onClick={() => setOpen(true)}
          edge="end"
          color="secondary"
          disabled={isLoading || cooldown > 0}
          sx={{
            backgroundColor: 'rgba(51, 102, 255, 0.9)',
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(51, 102, 255, 1)',
            },
            padding: 1.5,
          }}
        >
          {cooldown > 0 ? `${cooldown}s` : <SendOutlined />}
        </IconButton>
      </InputAdornment>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          <Trans i18nKey={"auth.captcha.title"}>Captcha</Trans>
        </DialogTitle>
        <DialogContent>
          <Turnstile
            sitekey={guestConfig?.recaptcha_site_key!}
            onVerify={(token) => {
              sendEmailVerify({ email, recaptcha_data: token })
                .unwrap()
                .then(() => {
                  enqueueSnackbar(t("auth.captcha.success"), { variant: "success" });
                  ReactGA.event("send_email_verify", {
                    category: "auth",
                    label: "send_email_verify",
                    email: email,
                    success: true
                  });
                })
                .catch((err: any) => {
                  console.error(err);
                  enqueueSnackbar(t("auth.captcha.error"), { variant: "error" });
                  ReactGA.event("send_email_verify", {
                    category: "auth",
                    label: "send_email_verify",
                    email: email,
                    success: false,
                    error: err
                  });
                })
                .finally(() => {
                  setOpen(false);
                });
            }}
            onError={() => {
              enqueueSnackbar(t("auth.captcha.error"), { variant: "error" });
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

const SendMailButton: React.FC<SendMailButtonProps> = ({ email }) => {
  const [sendMail, { isLoading }] = useSendEmailVerifyMutation();
  const { data: siteConfig } = useGetGuestConfigQuery();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const { data: guestConfig } = useGetGuestConfigQuery();
  const emailSuffix = email.split("@")[1];
  const handleSendEmailCode = () => {
    if (guestConfig?.email_whitelist_suffix && 
      Array.isArray(guestConfig.email_whitelist_suffix) && 
      !guestConfig.email_whitelist_suffix.includes(emailSuffix)) {
      enqueueSnackbar(t("auth.captcha.white_email"), { variant: "error" });
      return;
    }
    console.log("send email code");
    sendMail({ email })
      .unwrap()
      .then(() => {
        enqueueSnackbar(t("auth.captcha.success"), { variant: "success" });
        setCooldown(60);
      })
      .catch((err) => {
        console.error(err);
        enqueueSnackbar(t("auth.captcha.error"), { variant: "error" });
      });
  };

  if (siteConfig?.is_recaptcha === 1) {
    return <SendMailWithCaptchaButton email={email} />;
  } else {
    return (
      <InputAdornment position="end">
        <IconButton
          aria-label="send email code"
          onClick={handleSendEmailCode}
          edge="end"
          color="secondary"
          disabled={isLoading || cooldown > 0}
          sx={{
            backgroundColor: 'primary.main',
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(51, 102, 255, 0.9)',
            },
            padding: 1.5,
          }}
        >
          {cooldown > 0 ? `${cooldown}s` : <SendOutlined />}
        </IconButton>
      </InputAdornment>
    );
  }
};

export default SendMailButton;
