import Link from 'next/link';
import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  Building2,
  CalendarRange,
  ChevronDown,
  CircleGauge,
  Download,
  Home,
  Landmark,
  LayoutDashboard,
  Monitor,
  MonitorSmartphone,
  MoreHorizontal,
  ScanLine,
  Search,
  ShieldCheck,
  Ticket,
  UserRoundCog,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { AdminVolumeChart } from '@/components/admin-volume-chart';
import { Avatar, AvatarFallback, AvatarGroup } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress, ProgressLabel, ProgressValue } from '@/components/ui/progress';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { agencies, getScenarioCounters, getScenarioData, scenarioHref, type ScenarioSnapshot } from '@/lib/mpp-data';

const operationsNavigation = [
  { label: 'Dashboard admin', href: '/admin', icon: LayoutDashboard, active: true },
  { label: 'Operator loket', href: '/operator', icon: UserRoundCog },
  { label: 'Supervisor', href: '/supervisor', icon: CircleGauge },
  { label: 'Display antrean', href: '/display', icon: Monitor },
];

const citizenNavigation = [
  { label: 'Portal warga', href: '/', icon: Home },
  { label: 'Kiosk antrean', href: '/kiosk', icon: ScanLine },
  { label: 'Tiket warga', href: '/ticket/A-023', icon: Ticket },
];

type AdminMetric = { label: string; value: string; detail: string; trend: string; icon: LucideIcon; positive: boolean };

function KpiCard({ metric }: { metric: AdminMetric }) {
  const Icon = metric.icon;
  const TrendIcon = metric.positive ? ArrowUpRight : ArrowDownRight;

  return (
    <Card className="gap-0 rounded-2xl py-0 shadow-none">
      <CardHeader className="border-b px-5 py-4">
        <CardTitle className="text-sm font-semibold">{metric.label}</CardTitle>
        <CardAction><Icon className="size-5 text-muted-foreground" strokeWidth={1.7} /></CardAction>
      </CardHeader>
      <CardContent className="px-5 py-5">
        <p className="text-4xl font-semibold tracking-[-0.045em] text-zinc-950">{metric.value}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
          <Badge variant="outline" className={metric.positive ? 'border-emerald-300 bg-emerald-50 text-emerald-700' : 'border-red-200 bg-red-50 text-red-600'}>
            <TrendIcon data-icon="inline-start" /> {metric.trend}
          </Badge>
          <span className="text-muted-foreground">{metric.detail}</span>
        </div>
      </CardContent>
    </Card>
  );
}

function AdminSidebar({ scenario }: { scenario: ScenarioSnapshot }) {
  return (
    <Sidebar collapsible="icon" className="border-r bg-[#f7f7f8]">
      <SidebarHeader className="gap-4 border-b p-4">
        <Link href={scenarioHref('/admin', scenario.id)} className="flex h-10 items-center gap-3 px-1 group-data-[collapsible=icon]:justify-center">
          <span className="grid size-9 place-items-center rounded-lg bg-zinc-950 text-white"><Landmark className="size-4.5" /></span>
          <span className="min-w-0 group-data-[collapsible=icon]:hidden"><span className="block text-sm font-semibold text-zinc-950">MPP Wakanda</span><span className="block text-xs text-zinc-500">Pusat administrasi</span></span>
        </Link>
        <div className="relative group-data-[collapsible=icon]:hidden">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
          <Input aria-label="Cari menu admin" readOnly placeholder="Cari menu..." className="h-10 bg-white pl-9 shadow-none" />
        </div>
      </SidebarHeader>

      <SidebarContent className="py-3">
        <SidebarGroup>
          <SidebarGroupLabel>Mode operasional</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {operationsNavigation.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton render={<Link href={scenarioHref(item.href, scenario.id)} />} isActive={item.active} tooltip={item.label} className="h-10 px-3">
                      <Icon /><span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Layanan warga</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {citizenNavigation.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton render={<Link href={scenarioHref(item.href, scenario.id)} />} tooltip={item.label} className="h-10 px-3">
                      <Icon /><span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 group-data-[collapsible=icon]:p-2">
        <Card className="gap-3 rounded-xl py-4 shadow-none group-data-[collapsible=icon]:hidden">
          <CardHeader className="px-4"><CardTitle className="text-sm">{scenario.label}</CardTitle><CardDescription>{scenario.description}</CardDescription></CardHeader>
          <CardContent className="px-4"><Badge variant="secondary">Snapshot aktif</Badge></CardContent>
        </Card>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

function OverviewContent({ scenario, metrics, counters }: { scenario: ScenarioSnapshot; metrics: AdminMetric[]; counters: ReturnType<typeof getScenarioCounters> }) {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => <KpiCard key={metric.label} metric={metric} />)}
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
        <Card className="gap-0 rounded-2xl py-0 shadow-none">
          <CardHeader className="border-b px-5 py-5 sm:px-6">
            <CardTitle>Arus pelayanan</CardTitle>
            <CardDescription>Perbandingan check-in dan layanan selesai hari ini.</CardDescription>
            <CardAction>
              <Button variant="outline" size="sm" className="h-9 px-3">Hari ini <ChevronDown data-icon="inline-end" /></Button>
            </CardAction>
          </CardHeader>
          <CardContent className="px-3 pb-2 pt-4 sm:px-5">
            <div className="mb-2 flex items-center gap-5 px-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-2"><span className="size-2 rounded-full bg-zinc-900" /> Check-in</span>
              <span className="flex items-center gap-2"><span className="size-2 rounded-full bg-orange-500" /> Selesai</span>
            </div>
            <AdminVolumeChart data={scenario.volumeData} />
          </CardContent>
        </Card>

        <Card className="gap-0 rounded-2xl py-0 shadow-none">
          <CardHeader className="border-b px-5 py-5">
            <CardTitle>Kinerja hari ini</CardTitle>
            <CardDescription>Ringkasan seluruh zona layanan.</CardDescription>
          </CardHeader>
          <CardContent className="p-5">
            <div className="flex items-end justify-between"><div><p className="text-4xl font-semibold tracking-[-0.04em]">{scenario.totals.sla}%</p><p className="mt-1 text-sm text-muted-foreground">SLA terpenuhi</p></div><Badge className={scenario.totals.sla >= 90 ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-50' : 'bg-red-50 text-red-700 hover:bg-red-50'}>{scenario.totals.sla >= 90 ? 'Sesuai target' : 'Di bawah target'}</Badge></div>
            <Progress value={scenario.totals.sla} className="mt-6"><ProgressLabel>Target harian</ProgressLabel><ProgressValue /></Progress>

            <div className="mt-7 space-y-4 border-t pt-5">
              <div className="flex items-center justify-between text-sm"><span className="text-muted-foreground">Waktu tunggu rata-rata</span><strong>{scenario.totals.averageWait} menit</strong></div>
              <div className="flex items-center justify-between text-sm"><span className="text-muted-foreground">Loket aktif</span><strong>{scenario.totals.activeCounters} dari {scenario.totals.totalCounters}</strong></div>
              <div className="flex items-center justify-between text-sm"><span className="text-muted-foreground">Selesai hari ini</span><strong>{scenario.totals.completed} warga</strong></div>
            </div>

            <div className="mt-7 border-t pt-5">
              <p className="text-sm font-semibold">Petugas aktif</p>
              <div className="mt-3 flex items-center justify-between">
                <AvatarGroup>
                  {['MP', 'SR', 'RA', 'DL'].map((initials, index) => <Avatar key={initials}><AvatarFallback className={index === 0 ? 'bg-zinc-900 text-white' : 'bg-zinc-200 text-zinc-700'}>{initials}</AvatarFallback></Avatar>)}
                </AvatarGroup>
                <span className="text-xs text-muted-foreground">{scenario.totals.staffOnDuty} petugas</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section id="loket">
        <Card className="gap-0 rounded-2xl py-0 shadow-none">
          <CardHeader className="border-b px-5 py-5 sm:px-6">
            <CardTitle>Status loket</CardTitle>
            <CardDescription>Snapshot enam loket di tiga zona pelayanan.</CardDescription>
            <CardAction><Button variant="outline" size="icon" aria-label="Menu status loket"><MoreHorizontal /></Button></CardAction>
          </CardHeader>
          <CardContent className="px-0">
            <Table>
              <TableHeader><TableRow className="hover:bg-transparent"><TableHead className="pl-5 sm:pl-6">Loket</TableHead><TableHead>Layanan</TableHead><TableHead>Operator</TableHead><TableHead>Nomor</TableHead><TableHead>Waktu tunggu</TableHead><TableHead className="pr-5 text-right sm:pr-6">Status</TableHead></TableRow></TableHeader>
              <TableBody>
                {counters.map((counter) => (
                  <TableRow key={counter.id}>
                    <TableCell className="pl-5 font-medium sm:pl-6">{counter.label}<span className="ml-2 text-xs text-muted-foreground">{counter.zone}</span></TableCell>
                    <TableCell>{counter.service}</TableCell>
                    <TableCell className="text-muted-foreground">{counter.operator}</TableCell>
                    <TableCell className="font-medium">{counter.ticket}</TableCell>
                    <TableCell>{counter.wait} menit</TableCell>
                    <TableCell className="pr-5 text-right sm:pr-6"><Badge variant="outline" className={counter.status === 'Gangguan' ? 'border-red-200 bg-red-50 text-red-700' : counter.status === 'Istirahat' || counter.status === 'Pendampingan' ? 'border-amber-200 bg-amber-50 text-amber-700' : 'border-emerald-200 bg-emerald-50 text-emerald-700'}>{counter.status}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ scenario?: string | string[] }> }) {
  const query = await searchParams;
  const scenario = getScenarioData(query.scenario);
  const counters = getScenarioCounters(scenario.id);
  const metrics: AdminMetric[] = [
    { label: 'Instansi aktif', value: scenario.id === 'disruption' ? '5' : '6', detail: scenario.id === 'disruption' ? '1 layanan mengalami gangguan' : 'seluruhnya operasional', trend: scenario.id === 'disruption' ? '-1 layanan' : 'stabil hari ini', icon: Building2, positive: scenario.id !== 'disruption' },
    { label: 'Layanan tersedia', value: scenario.id === 'disruption' ? '21' : '22', detail: '4 layanan prioritas', trend: scenario.system.label, icon: ShieldCheck, positive: scenario.system.tone !== 'danger' },
    { label: 'Petugas bertugas', value: String(scenario.totals.staffOnDuty), detail: `dari ${scenario.totals.staffTotal} petugas`, trend: `${Math.round((scenario.totals.staffOnDuty / scenario.totals.staffTotal) * 100)}% hadir`, icon: Users, positive: scenario.totals.staffOnDuty >= 18 },
    { label: 'Perangkat online', value: String(scenario.totals.devicesOnline), detail: `${scenario.totals.devicesTotal - scenario.totals.devicesOnline} perlu diperiksa`, trend: `${scenario.totals.devicesOnline}/${scenario.totals.devicesTotal} terhubung`, icon: MonitorSmartphone, positive: scenario.totals.devicesOnline >= 9 },
  ];

  return (
    <div className="admin-dashboard min-h-dvh bg-white text-zinc-950">
      <SidebarProvider style={{ '--sidebar-width': '17rem' } as React.CSSProperties}>
        <AdminSidebar scenario={scenario} />
        <SidebarInset id="main-content" className="min-w-0 bg-white">
          <header className="flex h-16 items-center justify-between border-b px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="size-9" />
              <span className="h-5 w-px bg-border" />
              <Button variant="ghost" className="hidden gap-2 px-2 sm:inline-flex"><span className="size-2.5 rounded-full bg-orange-500" /> MPP Wakanda <ChevronDown data-icon="inline-end" /></Button>
              <span className="text-sm font-semibold sm:hidden">MPP Admin</span>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" aria-label="Cari"><Search /></Button>
              <Button variant="ghost" size="icon" aria-label="Notifikasi" className="relative"><Bell /><span className="absolute right-2 top-1.5 size-1.5 rounded-full bg-red-500" /></Button>
              <div className="ml-2 border-l pl-3"><Avatar><AvatarFallback className="bg-zinc-900 text-xs text-white">NP</AvatarFallback></Avatar></div>
            </div>
          </header>

          <div className="p-4 pb-32 sm:p-6 sm:pb-32 lg:p-8 lg:pb-32">
            <div className="mx-auto max-w-400">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div><p className="text-sm text-muted-foreground">Selasa, 8 September 2026 · {scenario.updatedAt}</p><h1 className="mt-1 text-3xl font-semibold tracking-[-0.035em]">Dashboard pelayanan</h1><p className="mt-2 text-sm text-muted-foreground">{scenario.description}</p></div>
                <div className="flex flex-wrap items-center gap-2">
                  <Button variant="outline" className="h-10 px-3"><CalendarRange data-icon="inline-start" /> 8 Sep 2026</Button>
                  <Button variant="outline" className="h-10 px-3"><Download data-icon="inline-start" /> Ekspor</Button>
                </div>
              </div>

              <Tabs defaultValue="ringkasan" className="mt-7">
                <TabsList>
                  <TabsTrigger value="ringkasan">Ringkasan</TabsTrigger>
                  <TabsTrigger value="instansi">Instansi</TabsTrigger>
                  <TabsTrigger value="aktivitas">Aktivitas</TabsTrigger>
                </TabsList>

                <TabsContent value="ringkasan" className="mt-7"><OverviewContent scenario={scenario} metrics={metrics} counters={counters} /></TabsContent>

                <TabsContent value="instansi" className="mt-7" id="instansi">
                  <Card className="gap-0 rounded-2xl py-0 shadow-none">
                    <CardHeader className="border-b px-5 py-5"><CardTitle>Instansi pelayanan</CardTitle><CardDescription>Daftar instansi dan jumlah layanan yang tampil pada portal warga.</CardDescription></CardHeader>
                    <CardContent className="grid gap-3 p-5 sm:grid-cols-2 xl:grid-cols-3">{agencies.map((agency) => <Card key={agency.id} size="sm" className="shadow-none"><CardHeader><CardTitle>{agency.name}</CardTitle><CardDescription>{agency.description}</CardDescription></CardHeader><CardContent className="flex items-center justify-between"><Badge variant="secondary">{agency.serviceCount} layanan</Badge><Button variant="ghost" size="icon-sm" aria-label={`Detail ${agency.name}`}><ArrowUpRight /></Button></CardContent></Card>)}</CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="aktivitas" className="mt-7" id="aktivitas">
                  <Card className="gap-0 rounded-2xl py-0 shadow-none">
                    <CardHeader className="border-b px-5 py-5"><CardTitle>Aktivitas terbaru</CardTitle><CardDescription>Perubahan konfigurasi yang tercatat pada snapshot demo.</CardDescription></CardHeader>
                    <CardContent className="px-0">{scenario.adminActivity.map((item) => <div key={`${item.time}-${item.title}`} className="grid gap-2 border-b px-5 py-4 sm:grid-cols-[5rem_1fr_auto] sm:items-center"><span className="text-sm text-muted-foreground">{item.time}</span><div><p className="font-medium">{item.title}</p><p className="mt-1 text-xs text-muted-foreground">{item.actor}</p></div><Badge variant="secondary">{item.context}</Badge></div>)}</CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
