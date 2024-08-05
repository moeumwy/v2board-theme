import React, { useMemo, useState } from "react";

// third party
import EmojiPicker, { EmojiClickData, EmojiStyle, Theme } from "emoji-picker-react";

// material-ui
import { IconButton, Popover } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// project imports
import MainCard from "@/components/MainCard";
import { useTicketContext } from "../context";
import config from "@/config";
import { makeStyles } from "@/themes/hooks";

// assets
import { SmileOutlined } from "@ant-design/icons";

const useStyles = makeStyles()((theme) => ({
  iconButton: {
    opacity: 0.5
  },
  card: {
    borderRadius: theme.spacing(1)
  }
}));

const EmojiChoose: React.FC = () => {
  const { setMessageInput } = useTicketContext();
  const theme = useTheme();

  const [anchorElEmoji, setAnchorElEmoji] = useState<any>(null);
  /** No single type can cater for all elements */

  const handleOnEmojiButtonClick = (event: React.MouseEvent<HTMLButtonElement> | undefined) => {
    setAnchorElEmoji(anchorElEmoji ? null : event?.currentTarget);
  };

  // handle emoji
  const onEmojiClick = (emojiData: EmojiClickData) => {
    setMessageInput((prev) => prev + emojiData.emoji);
    handleCloseEmoji();
  };

  const emojiOpen = useMemo(() => Boolean(anchorElEmoji), [anchorElEmoji]);

  const handleCloseEmoji = () => {
    setAnchorElEmoji(null);
  };

  const { classes } = useStyles();

  return (
    <>
      <IconButton
        ref={anchorElEmoji}
        aria-describedby={"emoji-selector"}
        onClick={handleOnEmojiButtonClick}
        className={classes.iconButton}
        size="medium"
        color="secondary"
      >
        <SmileOutlined />
      </IconButton>
      <Popover
        id={"emoji-selector"}
        open={emojiOpen}
        anchorEl={anchorElEmoji}
        disablePortal
        anchorOrigin={{
          vertical: "center",
          horizontal: "right"
        }}
        onClose={() => handleCloseEmoji()}
      >
        <MainCard elevation={8} content={false} className={classes.card}>
          <EmojiPicker
            onEmojiClick={onEmojiClick}
            lazyLoadEmojis
            autoFocusSearch
            theme={theme.palette.mode === "dark" ? Theme.DARK : Theme.LIGHT}
            emojiStyle={EmojiStyle.APPLE}
            getEmojiUrl={(code) =>
              (
                config.emojiEndpoint ?? "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/{{code}}.png"
              ).replace("{{code}}", code)
            }
          />
        </MainCard>
      </Popover>
    </>
  );
};

export default EmojiChoose;
