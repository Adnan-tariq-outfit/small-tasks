"use client";
import React from "react";
import { Box, Paper, Typography, Stack, Chip } from "@mui/material";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Sample data - replace with your actual data
const data = [
  { month: "Jan", totalLeads: 850, approved: 450, rejected: 280 },
  { month: "Feb", totalLeads: 920, approved: 520, rejected: 310 },
  { month: "Mar", totalLeads: 1050, approved: 680, rejected: 350 },
  { month: "Apr", totalLeads: 980, approved: 720, rejected: 340 },
  { month: "May", totalLeads: 890, approved: 580, rejected: 320 },
  { month: "Jun", totalLeads: 920, approved: 620, rejected: 380 },
  { month: "Jul", totalLeads: 850, approved: 480, rejected: 350 },
  { month: "Aug", totalLeads: 1020, approved: 650, rejected: 360 },
  { month: "Sep", totalLeads: 1080, approved: 720, rejected: 380 },
  { month: "Oct", totalLeads: 950, approved: 580, rejected: 340 },
  { month: "Nov", totalLeads: 880, approved: 520, rejected: 320 },
  { month: "Dec", totalLeads: 920, approved: 580, rejected: 350 },
];

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

      <Box sx={{ width: "100%", height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorTotalLeads" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="colorApproved" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="colorRejected" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f87171" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f87171" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f0f0f0"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              stroke="#9ca3af"
              tick={{ fill: "#6b7280", fontSize: 12 }}
              axisLine={{ stroke: "#e5e7eb" }}
            />
            <YAxis
              stroke="#9ca3af"
              tick={{ fill: "#6b7280", fontSize: 12 }}
              axisLine={{ stroke: "#e5e7eb" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Area
              type="monotone"
              dataKey="totalLeads"
              stroke="#8b5cf6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorTotalLeads)"
            />
            <Area
              type="monotone"
              dataKey="approved"
              stroke="#10b981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorApproved)"
            />
            <Area
              type="monotone"
              dataKey="rejected"
              stroke="#f87171"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorRejected)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default ActivityChart;
