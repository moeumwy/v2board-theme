import React from "react";

import ProfileSection from "@/sections/profile";
import useTitle from "@/hooks/useTitle";

const Profile: React.FC = () => {
  useTitle("profile");

  return <ProfileSection />;
};

export default Profile;
