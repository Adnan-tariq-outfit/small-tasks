"use client"; // Remove this line if using pages router

import React, { useEffect, useRef } from "react";
import { Box, Paper, Typography, Stack } from "@mui/material";
import { ApexOptions } from "apexcharts";

interface LegendItemProps {
  color: string;
  label: string;
}

const LegendItem: React.FC<LegendItemProps> = ({ color, label }) => (
  <Stack direction="row" alignItems="center" spacing={1}>
    <Box
      sx={{
        width: 12,
        height: 12,
        borderRadius: "50%",
        backgroundColor: color,
      }}
    />
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>
  </Stack>
);

const ActivityChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Dynamically import ApexCharts only on client side
    import("apexcharts").then((module) => {
      const ApexCharts = module.default;

      const options: ApexOptions = {
        chart: {
          type: "area",
          height: 300,
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
          fontFamily: "inherit",
        },
        series: [
          {
            name: "Total Leads",
            data: [
              850, 920, 1050, 980, 890, 920, 850, 1020, 1080, 950, 880, 920,
            ],
          },
          {
            name: "Approved",
            data: [450, 520, 680, 720, 580, 620, 480, 650, 720, 580, 520, 580],
          },
          {
            name: "Rejected",
            data: [280, 310, 350, 340, 320, 380, 350, 360, 380, 340, 320, 350],
          },
        ],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
          width: 2,
        },
        colors: ["#8b5cf6", "#10b981", "#f87171"],
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.3,
            opacityTo: 0.05,
            stops: [0, 100],
          },
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          labels: {
            style: {
              colors: "#6b7280",
              fontSize: "12px",
            },
          },
          axisBorder: {
            color: "#e5e7eb",
          },
          axisTicks: {
            color: "#e5e7eb",
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: "#6b7280",
              fontSize: "12px",
            },
          },
        },
        grid: {
          borderColor: "#f0f0f0",
          strokeDashArray: 3,
          xaxis: {
            lines: {
              show: false,
            },
          },
        },
        legend: {
          show: false,
        },
        tooltip: {
          theme: "dark",
          style: {
            fontSize: "12px",
          },
          x: {
            show: true,
          },
          y: {
            formatter: function (value: number) {
              return value.toString();
            },
          },
          marker: {
            show: true,
          },
        },
      };

      if (chartRef.current) {
        chartInstanceRef.current = new ApexCharts(chartRef.current, options);
        chartInstanceRef.current.render();
      }
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h6" fontWeight={600}>
          Activity
        </Typography>
        <Stack direction="row" spacing={3}>
          <LegendItem color="#8b5cf6" label="Total Leads" />
          <LegendItem color="#10b981" label="Approved" />
          <LegendItem color="#f87171" label="Rejected" />
        </Stack>
      </Stack>

      <Box ref={chartRef} sx={{ width: "100%", height: 300 }} />
    </Paper>
  );
};

export default ActivityChart;
