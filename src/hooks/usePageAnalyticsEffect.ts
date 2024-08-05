import { useEffect } from "react";

// third-party
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

// project imports
import { useSelector } from "@/store";
import { useGetUserInfoQuery } from "@/store/services/api";

const usePageAnalyticsEffect = () => {
  const location = useLocation();
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.search
    });
    console.log("PageviewStat:", location.pathname + location.search);
  }, [location]);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { data: userData } = useGetUserInfoQuery(undefined, {
    skip: !isLoggedIn
  });
  useEffect(() => {
    ReactGA.set({
      userEmail: userData?.email
    });
  }, [userData]);
};

export default usePageAnalyticsEffect;
