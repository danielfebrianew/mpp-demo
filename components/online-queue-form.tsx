'use client';

import { useMemo, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';
import {
  CalendarDays,
  CheckCircle2,
  Download,
  MapPin,
  MessageCircle,
  RotateCcw,
  Store,
  TicketCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar, CalendarDayButton } from '@/components/ui/calendar';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  getCompatibleOutlets,
  getMockAvailability,
  isValidWhatsApp,
} from '@/lib/mock-online-queue';
import { createMockTicket, type MockTicket } from '@/lib/mock-ticket';
import type { Scenario } from '@/lib/mpp-data';

type ServiceSummary = {
  slug: string;
  name: string;
  agency: string;
  agencyId: string;
  code: string;
};

function displayDate(value: string) {
  return format(parseISO(value), 'EEEE, d MMMM yyyy', { locale: id });
}

function displayRegisteredAt(value: string) {
  return format(new Date(value), "d MMMM yyyy, HH.mm 'WIB'", { locale: id });
}

export function OnlineQueueForm({
  service,
  scenario,
}: {
  service: ServiceSummary;
  scenario: Scenario;
}) {
  const outlets = useMemo(
    () => getCompatibleOutlets(service.agencyId),
    [service.agencyId],
  );
  const [outletId, setOutletId] = useState<string | null>(null);
  const [visitDate, setVisitDate] = useState<string | null>(null);
  const [whatsApp, setWhatsApp] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [ticket, setTicket] = useState<MockTicket | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState('');

  const selectedOutlet =
    outlets.find((outlet) => outlet.id === outletId) ?? null;
  const availability = useMemo(
    () =>
      outletId ? getMockAvailability(outletId, service.slug, scenario) : [],
    [outletId, scenario, service.slug],
  );
  const availabilityByDate = useMemo(
    () => new Map(availability.map((item) => [item.date, item])),
    [availability],
  );
  const scenarioUnavailable =
    scenario === 'disruption' && service.slug === 'perekaman-ktp';

  const datesByStatus = (status: 'available' | 'limited' | 'full' | 'closed') =>
    availability
      .filter((item) => item.status === status)
      .map((item) => parseISO(item.date));

  function resetForm() {
    setOutletId(null);
    setVisitDate(null);
    setWhatsApp('');
    setTicket(null);
    setErrors({});
  }

  function validate() {
    const nextErrors: Record<string, string> = {};
    if (!selectedOutlet)
      nextErrors.outlet = 'Pilih gerai pelayanan terlebih dahulu.';
    if (!visitDate) nextErrors.date = 'Pilih tanggal kunjungan yang tersedia.';
    if (!isValidWhatsApp(whatsApp)) {
      nextErrors.whatsApp =
        'Masukkan nomor Indonesia yang valid, misalnya 0812 3456 7890.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate() || !selectedOutlet || !visitDate) return;
    setSubmitting(true);
    await new Promise((resolve) => window.setTimeout(resolve, 450));
    const nextTicket = createMockTicket({
      service,
      outlet: selectedOutlet,
      visitDate,
      now: new Date(),
    });
    setTicket(nextTicket);
    setSubmitting(false);
    setDialogOpen(true);
  }

  async function downloadTicket() {
    if (!ticket) return;
    setDownloading(true);
    setDownloadError('');
    try {
      const { generateMockTicketPdf } = await import('@/lib/mock-ticket-pdf');
      const { bytes, filename } = await generateMockTicketPdf(ticket);
      const blob = new Blob([bytes.slice().buffer], {
        type: 'application/pdf',
      });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = filename;
      anchor.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch {
      setDownloadError('File tiket belum dapat dibuat. Coba unduh lagi.');
    } finally {
      setDownloading(false);
    }
  }

  return (
    <section
      id="antrean-online"
      className="scroll-mt-5 border-t border-zinc-200 bg-zinc-50 px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
    >
      <div className="mx-auto max-w-310">
        <div className="grid overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-[0_22px_65px_rgba(24,24,27,0.08)] lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="p-5 sm:p-8 lg:p-10">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                <TicketCheck className="size-3.5" /> Simulasi antrean
              </span>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
                Formulir antrean online
              </h2>
              <p className="mt-3 text-sm leading-6 text-zinc-500">
                Pilih gerai dan jadwal kunjungan untuk membuat tiket demo. Data
                tidak dikirim atau disimpan.
              </p>
            </div>

            {ticket ? (
              <div
                className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6"
                aria-live="polite"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="flex items-center gap-2 text-sm font-semibold text-emerald-800">
                      <CheckCircle2 className="size-4" /> Tiket demo berhasil
                      dibuat
                    </p>
                    <p className="tabular mt-2 text-3xl font-semibold tracking-tight text-zinc-950">
                      {ticket.queueNumber}
                    </p>
                    <p className="mt-1 text-sm text-zinc-600">
                      {displayDate(ticket.visitDate)} · {ticket.outletName}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      onClick={downloadTicket}
                      disabled={downloading}
                      className="min-h-11 px-4"
                    >
                      <Download /> {downloading ? 'Menyiapkan…' : 'Unduh lagi'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={resetForm}
                      className="min-h-11 px-4"
                    >
                      <RotateCcw /> Buat antrean lain
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <form
                className="mt-8 grid gap-5 sm:grid-cols-2"
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="space-y-2">
                  <Label htmlFor="queue-service">Layanan</Label>
                  <div
                    id="queue-service"
                    className="flex min-h-13 items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50 px-4 text-sm text-zinc-700"
                  >
                    <TicketCheck className="size-4 shrink-0 text-emerald-700" />
                    <span className="truncate font-medium">{service.name}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="queue-outlet">Gerai</Label>
                  <Select
                    value={outletId}
                    onValueChange={(value) => {
                      setOutletId(value ? String(value) : null);
                      setVisitDate(null);
                      setErrors((current) => ({
                        ...current,
                        outlet: '',
                        date: '',
                      }));
                    }}
                  >
                    <SelectTrigger
                      id="queue-outlet"
                      aria-invalid={Boolean(errors.outlet)}
                      aria-describedby={
                        errors.outlet ? 'queue-outlet-error' : undefined
                      }
                      className="min-h-13 w-full rounded-xl px-4 text-sm"
                    >
                      <Store className="size-4 text-emerald-700" />
                      <SelectValue>
                        {selectedOutlet?.name ?? 'Pilih gerai'}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent align="start" className="rounded-xl">
                      {outlets.map((outlet) => (
                        <SelectItem
                          key={outlet.id}
                          value={outlet.id}
                          className="py-3"
                        >
                          <span className="flex flex-col items-start">
                            <strong>{outlet.name}</strong>
                            <small className="text-zinc-500">
                              {outlet.note}
                            </small>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.outlet ? (
                    <p id="queue-outlet-error" className="text-xs text-red-600">
                      {errors.outlet}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="queue-date">Tanggal kunjungan</Label>
                  <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                    <PopoverTrigger
                      render={
                        <Button
                          id="queue-date"
                          type="button"
                          variant="outline"
                          disabled={!selectedOutlet || scenarioUnavailable}
                          aria-invalid={Boolean(errors.date)}
                          aria-describedby={
                            errors.date ? 'queue-date-error' : undefined
                          }
                          className="min-h-13 w-full justify-start rounded-xl px-4 text-sm font-normal"
                        />
                      }
                    >
                      <CalendarDays className="text-emerald-700" />
                      {visitDate
                        ? displayDate(visitDate)
                        : selectedOutlet
                          ? 'Pilih tanggal'
                          : 'Pilih gerai dahulu'}
                    </PopoverTrigger>
                    <PopoverContent
                      align="start"
                      className="w-auto rounded-2xl p-3"
                    >
                      <Calendar
                        mode="single"
                        locale={id}
                        month={new Date(2026, 8, 1)}
                        startMonth={new Date(2026, 8, 1)}
                        endMonth={new Date(2026, 8, 30)}
                        selected={visitDate ? parseISO(visitDate) : undefined}
                        onSelect={(date) => {
                          if (!date) return;
                          const key = format(date, 'yyyy-MM-dd');
                          const slot = availabilityByDate.get(key);
                          if (
                            slot?.status !== 'available' &&
                            slot?.status !== 'limited'
                          )
                            return;
                          setVisitDate(key);
                          setErrors((current) => ({ ...current, date: '' }));
                          setCalendarOpen(false);
                        }}
                        disabled={(date) => {
                          const slot = availabilityByDate.get(
                            format(date, 'yyyy-MM-dd'),
                          );
                          return (
                            slot?.status !== 'available' &&
                            slot?.status !== 'limited'
                          );
                        }}
                        modifiers={{
                          available: datesByStatus('available'),
                          limited: datesByStatus('limited'),
                          full: datesByStatus('full'),
                          closed: datesByStatus('closed'),
                        }}
                        modifiersClassNames={{
                          available: 'queue-date-available',
                          limited: 'queue-date-limited',
                          full: 'queue-date-full',
                          closed: 'queue-date-closed',
                        }}
                        components={{
                          DayButton: (props) => {
                            const key = format(props.day.date, 'yyyy-MM-dd');
                            const slot = availabilityByDate.get(key);
                            const availabilityLabel = !slot
                              ? 'Tidak tersedia'
                              : slot.status === 'available'
                                ? `Tersedia, ${slot.remaining} slot`
                                : slot.status === 'limited'
                                  ? `Terbatas, ${slot.remaining} slot tersisa`
                                  : slot.status === 'full'
                                    ? 'Penuh'
                                    : 'Gerai tutup';
                            return (
                              <CalendarDayButton
                                {...props}
                                locale={id}
                                aria-label={`${format(props.day.date, 'EEEE, d MMMM yyyy', { locale: id })}. ${availabilityLabel}`}
                              />
                            );
                          },
                        }}
                      />
                      <div
                        className="grid grid-cols-2 gap-2 border-t border-zinc-200 pt-3 text-[11px] text-zinc-600"
                        aria-label="Legenda ketersediaan tanggal"
                      >
                        <span className="flex items-center gap-2">
                          <i className="size-2.5 rounded-full bg-emerald-500" />{' '}
                          Tersedia
                        </span>
                        <span className="flex items-center gap-2">
                          <i className="size-2.5 rounded-full bg-amber-400" />{' '}
                          Terbatas
                        </span>
                        <span className="flex items-center gap-2">
                          <i className="size-2.5 rounded-full bg-red-300" />{' '}
                          Penuh
                        </span>
                        <span className="flex items-center gap-2">
                          <i className="size-2.5 rounded-full bg-zinc-300" />{' '}
                          Tutup
                        </span>
                      </div>
                    </PopoverContent>
                  </Popover>
                  {scenarioUnavailable ? (
                    <p className="text-xs leading-5 text-red-600">
                      Pendaftaran online sementara ditutup karena gangguan
                      layanan pada skenario ini.
                    </p>
                  ) : null}
                  {visitDate &&
                  availabilityByDate.get(visitDate)?.status === 'limited' ? (
                    <p className="text-xs text-amber-700">
                      Kapasitas terbatas: tersisa{' '}
                      {availabilityByDate.get(visitDate)?.remaining} slot demo.
                    </p>
                  ) : null}
                  {errors.date ? (
                    <p id="queue-date-error" className="text-xs text-red-600">
                      {errors.date}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="queue-whatsapp">Nomor WhatsApp</Label>
                  <div className="relative">
                    <MessageCircle className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-emerald-700" />
                    <Input
                      id="queue-whatsapp"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={whatsApp}
                      onChange={(event) => {
                        setWhatsApp(event.target.value);
                        setErrors((current) => ({ ...current, whatsApp: '' }));
                      }}
                      aria-invalid={Boolean(errors.whatsApp)}
                      aria-describedby={
                        errors.whatsApp
                          ? 'queue-whatsapp-error'
                          : 'queue-whatsapp-help'
                      }
                      placeholder="0812 3456 7890"
                      className="min-h-13 rounded-xl pl-11 text-sm"
                    />
                  </div>
                  {errors.whatsApp ? (
                    <p
                      id="queue-whatsapp-error"
                      className="text-xs text-red-600"
                    >
                      {errors.whatsApp}
                    </p>
                  ) : (
                    <p
                      id="queue-whatsapp-help"
                      className="text-xs text-zinc-500"
                    >
                      Hanya untuk simulasi validasi; tidak masuk ke tiket.
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={submitting || scenarioUnavailable}
                  className="min-h-13 rounded-xl text-sm sm:col-span-2"
                >
                  <TicketCheck />{' '}
                  {submitting ? 'Membuat tiket demo…' : 'Ambil antrean online'}
                </Button>
              </form>
            )}
            {downloadError ? (
              <p role="alert" className="mt-4 text-sm text-red-600">
                {downloadError}
              </p>
            ) : null}
          </div>

          <aside className="flex flex-col justify-between bg-zinc-950 p-6 text-white sm:p-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                Cara kerja demo
              </span>
              <ol className="mt-6 space-y-5">
                {[
                  'Pilih gerai yang melayani instansi ini.',
                  'Pilih tanggal berstatus tersedia atau terbatas.',
                  'Unduh tiket PDF dan bawa saat simulasi check-in.',
                ].map((step, index) => (
                  <li
                    key={step}
                    className="flex gap-3 text-sm leading-6 text-zinc-300"
                  >
                    <span className="tabular grid size-7 shrink-0 place-items-center rounded-lg bg-white/10 text-xs text-white">
                      0{index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            {selectedOutlet ? (
              <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="flex items-center gap-2 text-sm font-semibold">
                  <MapPin className="size-4 text-emerald-300" />{' '}
                  {selectedOutlet.name}
                </p>
                <p className="mt-2 text-xs leading-5 text-zinc-400">
                  {selectedOutlet.address}
                </p>
              </div>
            ) : null}
          </aside>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className="max-h-[calc(100dvh-2rem)] overflow-y-auto p-0 sm:max-w-2xl"
          showCloseButton={false}
        >
          {ticket ? (
            <>
              <DialogHeader className="bg-zinc-950 p-6 text-white sm:p-8">
                <span className="w-fit rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                  TIKET DEMO
                </span>
                <DialogTitle className="tabular mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
                  {ticket.queueNumber}
                </DialogTitle>
                <DialogDescription className="text-zinc-400">
                  Tiket berhasil dibuat. Tidak terhubung ke antrean resmi.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-5 p-6 sm:grid-cols-2 sm:p-8">
                {[
                  ['Kode tiket', ticket.ticketCode],
                  ['Layanan', ticket.serviceName],
                  ['Gerai', ticket.outletName],
                  ['Tanggal kunjungan', displayDate(ticket.visitDate)],
                  [
                    'Waktu registrasi',
                    displayRegisteredAt(ticket.registeredAt),
                  ],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className={
                      label === 'Layanan' || label === 'Gerai'
                        ? 'sm:col-span-2'
                        : ''
                    }
                  >
                    <p className="text-xs text-zinc-500">{label}</p>
                    <p className="mt-1 text-sm font-semibold leading-6 text-zinc-900">
                      {value}
                    </p>
                  </div>
                ))}
                <div className="sm:col-span-2 rounded-xl bg-emerald-50 p-4 text-sm leading-6 text-emerald-900">
                  Datang 15 menit lebih awal dan pindai QR pada tiket di kiosk
                  untuk check-in.
                </div>
              </div>
              <DialogFooter className="m-0 border-zinc-200 bg-zinc-50 p-4 sm:p-5">
                <DialogClose
                  render={
                    <Button
                      type="button"
                      variant="outline"
                      className="min-h-11 px-5"
                    />
                  }
                >
                  Tutup
                </DialogClose>
                <Button
                  type="button"
                  onClick={downloadTicket}
                  disabled={downloading}
                  className="min-h-11 px-5"
                >
                  <Download /> {downloading ? 'Menyiapkan PDF…' : 'Unduh tiket'}
                </Button>
              </DialogFooter>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}
