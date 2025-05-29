"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartData = [
  { date: "2024-04-01", revenue: 222, view: 150 },
  { date: "2024-04-02", revenue: 97, view: 180 },
  { date: "2024-04-03", revenue: 167, view: 120 },
  { date: "2024-04-04", revenue: 242, view: 260 },
  { date: "2024-04-05", revenue: 373, view: 290 },
  { date: "2024-04-06", revenue: 301, view: 340 },
  { date: "2024-04-07", revenue: 245, view: 180 },
  { date: "2024-04-08", revenue: 409, view: 320 },
  { date: "2024-04-09", revenue: 59, view: 110 },
  { date: "2024-04-10", revenue: 261, view: 190 },
  { date: "2024-04-11", revenue: 327, view: 350 },
  { date: "2024-04-12", revenue: 292, view: 210 },
  { date: "2024-04-13", revenue: 342, view: 380 },
  { date: "2024-04-14", revenue: 137, view: 220 },
  { date: "2024-04-15", revenue: 120, view: 170 },
  { date: "2024-04-16", revenue: 138, view: 190 },
  { date: "2024-04-17", revenue: 446, view: 360 },
  { date: "2024-04-18", revenue: 364, view: 410 },
  { date: "2024-04-19", revenue: 243, view: 180 },
  { date: "2024-04-20", revenue: 89, view: 150 },
  { date: "2024-04-21", revenue: 137, view: 200 },
  { date: "2024-04-22", revenue: 224, view: 170 },
  { date: "2024-04-23", revenue: 138, view: 230 },
  { date: "2024-04-24", revenue: 387, view: 290 },
  { date: "2024-04-25", revenue: 215, view: 250 },
  { date: "2024-04-26", revenue: 75, view: 130 },
  { date: "2024-04-27", revenue: 383, view: 420 },
  { date: "2024-04-28", revenue: 122, view: 180 },
  { date: "2024-04-29", revenue: 315, view: 240 },
  { date: "2024-04-30", revenue: 454, view: 380 },
  { date: "2024-05-01", revenue: 165, view: 220 },
  { date: "2024-05-02", revenue: 293, view: 310 },
  { date: "2024-05-03", revenue: 247, view: 190 },
  { date: "2024-05-04", revenue: 385, view: 420 },
  { date: "2024-05-05", revenue: 481, view: 390 },
  { date: "2024-05-06", revenue: 498, view: 520 },
  { date: "2024-05-07", revenue: 388, view: 300 },
  { date: "2024-05-08", revenue: 149, view: 210 },
  { date: "2024-05-09", revenue: 227, view: 180 },
  { date: "2024-05-10", revenue: 293, view: 330 },
  { date: "2024-05-11", revenue: 335, view: 270 },
  { date: "2024-05-12", revenue: 197, view: 240 },
  { date: "2024-05-13", revenue: 197, view: 160 },
  { date: "2024-05-14", revenue: 448, view: 490 },
  { date: "2024-05-15", revenue: 473, view: 380 },
  { date: "2024-05-16", revenue: 338, view: 400 },
  { date: "2024-05-17", revenue: 499, view: 420 },
  { date: "2024-05-18", revenue: 315, view: 350 },
  { date: "2024-05-19", revenue: 235, view: 180 },
  { date: "2024-05-20", revenue: 177, view: 230 },
  { date: "2024-05-21", revenue: 82, view: 140 },
  { date: "2024-05-22", revenue: 81, view: 120 },
  { date: "2024-05-23", revenue: 252, view: 290 },
  { date: "2024-05-24", revenue: 294, view: 220 },
  { date: "2024-05-25", revenue: 201, view: 250 },
  { date: "2024-05-26", revenue: 213, view: 170 },
  { date: "2024-05-27", revenue: 420, view: 460 },
  { date: "2024-05-28", revenue: 233, view: 190 },
  { date: "2024-05-29", revenue: 78, view: 130 },
  { date: "2024-05-30", revenue: 340, view: 280 },
  { date: "2024-05-31", revenue: 178, view: 230 },
  { date: "2024-06-01", revenue: 178, view: 200 },
  { date: "2024-06-02", revenue: 470, view: 410 },
  { date: "2024-06-03", revenue: 103, view: 160 },
  { date: "2024-06-04", revenue: 439, view: 380 },
  { date: "2024-06-05", revenue: 88, view: 140 },
  { date: "2024-06-06", revenue: 294, view: 250 },
  { date: "2024-06-07", revenue: 323, view: 370 },
  { date: "2024-06-08", revenue: 385, view: 320 },
  { date: "2024-06-09", revenue: 438, view: 480 },
  { date: "2024-06-10", revenue: 155, view: 200 },
  { date: "2024-06-11", revenue: 92, view: 150 },
  { date: "2024-06-12", revenue: 492, view: 420 },
  { date: "2024-06-13", revenue: 81, view: 130 },
  { date: "2024-06-14", revenue: 426, view: 380 },
  { date: "2024-06-15", revenue: 307, view: 350 },
  { date: "2024-06-16", revenue: 371, view: 310 },
  { date: "2024-06-17", revenue: 475, view: 520 },
  { date: "2024-06-18", revenue: 107, view: 170 },
  { date: "2024-06-19", revenue: 341, view: 290 },
  { date: "2024-06-20", revenue: 408, view: 450 },
  { date: "2024-06-21", revenue: 169, view: 210 },
  { date: "2024-06-22", revenue: 317, view: 270 },
  { date: "2024-06-23", revenue: 480, view: 530 },
  { date: "2024-06-24", revenue: 132, view: 180 },
  { date: "2024-06-25", revenue: 141, view: 190 },
  { date: "2024-06-26", revenue: 434, view: 380 },
  { date: "2024-06-27", revenue: 448, view: 490 },
  { date: "2024-06-28", revenue: 149, view: 200 },
  { date: "2024-06-29", revenue: 103, view: 160 },
  { date: "2024-06-30", revenue: 446, view: 400 },
];

const chartConfig = {
  views: {
    label: "Page Views",
  },
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
  view: {
    label: "View",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const MarketplaceProfileSummarySection = () => {
  const [activeChart, setActiveChart] =
    useState<keyof typeof chartConfig>("revenue");

  const total = useMemo(
    () => ({
      revenue: chartData.reduce((acc, curr) => acc + curr.revenue, 0),
      view: chartData.reduce((acc, curr) => acc + curr.view, 0),
    }),
    []
  );

  return (
    <section id="profile-summary">
      <Card>
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
            <CardTitle>Summary</CardTitle>
            <CardDescription>Summary of the last 3 months</CardDescription>
          </div>
          <div className="flex">
            {["revenue", "view"].map((key) => {
              const chart = key as keyof typeof chartConfig;
              return (
                <button
                  key={chart}
                  data-active={activeChart === chart}
                  className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                  onClick={() => setActiveChart(chart)}
                >
                  <span className="text-xs text-muted-foreground">
                    {chartConfig[chart].label}
                  </span>
                  <span className="text-lg font-bold leading-none sm:text-3xl">
                    {total[key as keyof typeof total].toLocaleString()}
                  </span>
                </button>
              );
            })}
          </div>
        </CardHeader>
        <CardContent className="px-2 sm:p-6">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey={activeChart}
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      });
                    }}
                  />
                }
              />
              <Bar
                dataKey={activeChart}
                fill="var(--color-chart-1)"
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </section>
  );
};

export default MarketplaceProfileSummarySection;
