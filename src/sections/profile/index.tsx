import React from "react";

// material-ui
import { Masonry } from "@mui/lab";

// project imports
import AccountInfoCard from "./accountInfoCard";
import WalletCard from "./walletCard";
import ChangePasswordCard from "./changePasswordCard";
import NotificationCard from "./notificationCard";
import TelegramCard from "./telegramCard";
import ResetSubscriptionCard from "./resetSubscriptionCard";

const Profile: React.FC = () => (
  <Masonry
    spacing={2}
    columns={{
      xs: 1,
      md: 2,
      xl: 3
    }}
  >
    <AccountInfoCard />
    <WalletCard />
    <ChangePasswordCard />
    <NotificationCard />
    <TelegramCard />
    <ResetSubscriptionCard />
  </Masonry>
);

export default Profile;
