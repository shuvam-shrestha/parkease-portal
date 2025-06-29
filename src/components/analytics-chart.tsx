
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface AnalyticsChartProps {
  data: any[]
  chartConfig: ChartConfig
  dataKeys: { key: string; color: string }[]
}

export function AnalyticsChart({ data, chartConfig, dataKeys }: AnalyticsChartProps) {
  return (
    <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => Array.isArray(value) ? value.join('-') : String(value).slice(0, 3)}
        />
        <YAxis />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        {dataKeys.map((dk) => (
            <Bar key={dk.key} dataKey={dk.key} fill={`var(--color-${dk.color})`} radius={4} />
        ))}
      </BarChart>
    </ChartContainer>
  )
}
