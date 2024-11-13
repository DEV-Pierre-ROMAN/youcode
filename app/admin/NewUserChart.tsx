"use client";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

export type NewUserChartProps = {
  dataChart: {
    newUser: number;
    cancelUser: number;
    date: Date;
  }[];
};

export const NewUserChart = ({ dataChart }: NewUserChartProps) => {
  const chartConfig = {
    user: {
      label: "utilisateurs",
    },
    newUser: {
      label: "nouveaux utilisateurs",
      color: "hsl(var(--primary))",
    },
    cancelUser: {
      label: "utilisateurs bloqués",
      color: "hsl(var(--secondary))",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="h-40 w-full">
      <BarChart accessibilityLayer data={dataChart}>
        <CartesianGrid vertical={false} />
        <ChartTooltip content={<ChartTooltipContent labelKey="user" />} />
        <XAxis
          dataKey="date"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) =>
            String(value.getDate()) + "/" + String(value.getMonth() + 1)
          }
        />
        <Bar dataKey="newUser" fill={chartConfig.newUser.color} radius={4} />
        <Bar
          dataKey="cancelUser"
          fill={chartConfig.cancelUser.color}
          radius={4}
        />
      </BarChart>
    </ChartContainer>
  );
};
