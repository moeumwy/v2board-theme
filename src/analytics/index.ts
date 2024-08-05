import ReactGA from "react-ga4";
import reportWebVitals from "@/analytics/reportWebVitals";
import config from "@/config";

if (config.googleAnalytics) {
  ReactGA.initialize(
    [
      {
        trackingId: config.googleAnalytics.measurementId
      }
    ],
    {
      testMode: import.meta.env.DEV,
      legacyDimensionMetric: false,
      gaOptions: {
        siteSpeedSampleRate: 100
      }
    }
  );

  reportWebVitals(({ name, delta, id }) => {
    ReactGA.ga("send", "event", {
      eventCategory: "Web Vitals",
      eventAction: name,
      eventLabel: id,
      eventValue: Math.round(name === "CLS" ? delta * 1000 : delta),
      nonInteraction: true,
      transport: "beacon"
    });
  });
}

export default ReactGA;
