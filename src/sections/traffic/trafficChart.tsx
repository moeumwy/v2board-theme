import React, { useMemo, useState } from "react";

// third-party
import ReactApexChart from "react-apexcharts";
import dayjs from "dayjs";
import lodash from "lodash-es";
import { filesize } from "filesize";
import { useTranslation } from "react-i18next";

// material-ui
import { useTheme } from "@mui/material/styles";

// project imports
import MainCard from "@/components/MainCard";
import { useGetTrafficLogsQuery } from "@/store/services/api";

const TrafficChart: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { secondary } = theme.palette.text;
  const [tick, setTick] = useState(7);

  const { data: trafficLogs } = useGetTrafficLogsQuery();
  const dataMap = useMemo(
    () =>
      lodash.take(
        Array.from(
          (trafficLogs ?? [])
            .reduce(
              (acc, cur) =>
                acc.set(cur.record_at, {
                  u:
                    cur.u / (isNaN(parseInt(cur.server_rate)) ? 1 : parseInt(cur.server_rate)) +
                    (acc.get(cur.record_at)?.u ?? 0),
                  d:
                    cur.d / (isNaN(parseInt(cur.server_rate)) ? 1 : parseInt(cur.server_rate)) +
                    (acc.get(cur.record_at)?.d ?? 0),
                  total: (cur.u + cur.d) / parseInt(cur.server_rate) + (acc.get(cur.record_at)?.total ?? 0)
                }),
              new Map<
                number,
                {
                  u: number;
                  d: number;
                  total: number;
                }
              >()
            )
            .values()
        ).reverse(),
        tick
      ),
    [trafficLogs, tick]
  );

  const series = useMemo<ApexAxisChartSeries>(
    () => [
      {
        name: t("traffic.chart.upload", { context: "name" }).toString(),
        data: dataMap.map((d) => d.u) || Array(tick).fill(0),
        color: theme.palette.warning.main
      },
      {
        name: t("traffic.chart.download", { context: "name" }).toString(),
        data: dataMap.map((d) => d.d) || Array(tick).fill(0),
        color: theme.palette.success.main
      },
      {
        name: t("traffic.chart.total", { context: "name" }).toString(),
        data: dataMap.map((d) => d.total) || Array(tick).fill(0),
        color: theme.palette.primary.light
      }
    ],
    [trafficLogs, tick, theme.palette, t]
  );

  const options = useMemo<ApexCharts.ApexOptions>(() => {
    return {
      chart: {
        height: 280,
        type: "area",
        toolbar: {
          show: false
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          type: "vertical",
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth",
        width: 2
      },
      grid: {
        show: true,
        strokeDashArray: 0,
        position: "back",
        borderColor: theme.palette.divider,
        xaxis: {
          lines: {
            show: true
          }
        },
        yaxis: {
          lines: {
            show: true
          }
        }
      },
      xaxis: {
        categories: Array.from(new Array(tick))
          .map((_, i) => dayjs().subtract(i, "day").toISOString())
          .reverse(),
        labels: {
          formatter: (value: string) => dayjs(value).format("MM.DD"),
          style: {
            colors: Array.from(new Array(tick)).map(() => secondary)
          }
        },
        axisBorder: {
          show: false,
          color: theme.palette.divider
        },
        tickAmount: tick,
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        labels: {
          formatter: (val: number) =>
            String(
              filesize(val, {
                base: 2,
                standard: "jedec",
                round: 2,
                roundingMethod: "floor"
              })
            ),
          style: {
            colors: Array.from(new Array(tick)).map(() => secondary)
          }
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      tooltip: {
        theme: theme.palette.mode,
        x: {
          formatter: (val) =>
            dayjs()
              .subtract(tick - val, "day")
              .format("YYYY-MM-DD")
        },
        y: {
          formatter: (value) =>
            String(filesize(value, { base: 2, standard: "jedec", round: 2, roundingMethod: "floor" }))
        }
      },
      legend: {
        show: false
      }
    };
  }, [tick, theme.palette, t]);

  return (
    <MainCard title={t("traffic.chart.title").toString()} divider={false}>
      <ReactApexChart options={options} series={series} type="area" height={280} />
    </MainCard>
  );
};

export default TrafficChart;
