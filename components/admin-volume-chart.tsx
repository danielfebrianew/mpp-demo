'use client';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

const defaultVolumeData = [
  { time: '07.00', checkin: 18, selesai: 12 },
  { time: '08.00', checkin: 36, selesai: 24 },
  { time: '09.00', checkin: 63, selesai: 42 },
  { time: '10.00', checkin: 51, selesai: 47 },
  { time: '11.00', checkin: 44, selesai: 40 },
  { time: '12.00', checkin: 29, selesai: 34 },
  { time: '13.00', checkin: 48, selesai: 39 },
  { time: '14.00', checkin: 40, selesai: 36 },
  { time: '15.00', checkin: 21, selesai: 27 },
] as const;

const chartConfig = {
  checkin: { label: 'Check-in', color: '#18181b' },
  selesai: { label: 'Selesai', color: '#f97316' },
} satisfies ChartConfig;

export function AdminVolumeChart({ data = defaultVolumeData }: { data?: readonly { time: string; checkin: number; selesai: number }[] }) {
  return (
    <ChartContainer config={chartConfig} className="h-72.5 w-full sm:h-85">
      <AreaChart data={data} margin={{ left: -20, right: 8, top: 14 }}>
        <defs>
          <linearGradient id="checkin-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-checkin)" stopOpacity={0.18} />
            <stop offset="100%" stopColor="var(--color-checkin)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={12} />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
        <Area dataKey="selesai" type="monotone" fill="transparent" stroke="var(--color-selesai)" strokeWidth={2} dot={false} />
        <Area dataKey="checkin" type="monotone" fill="url(#checkin-fill)" stroke="var(--color-checkin)" strokeWidth={2.25} dot={false} />
      </AreaChart>
    </ChartContainer>
  );
}
