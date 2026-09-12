import type { MockOutlet } from '@/lib/mock-online-queue';

export type MockTicket = {
  ticketCode: string;
  queueNumber: string;
  serviceSlug: string;
  serviceName: string;
  agencyName: string;
  outletName: string;
  outletAddress: string;
  visitDate: string;
  registeredAt: string;
};

function hashText(value: string) {
  let hash = 2166136261;
  for (const character of value) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function createMockTicket(input: {
  service: { slug: string; name: string; agency: string; code: string };
  outlet: MockOutlet;
  visitDate: string;
  now: Date;
}): MockTicket {
  const seed = hashText(
    `${input.service.slug}:${input.outlet.id}:${input.visitDate}`,
  );
  const suffix = seed.toString(36).toUpperCase().padStart(5, '0').slice(-5);
  const sequence = (seed % 89) + 1;

  return {
    ticketCode: `D${suffix}`,
    queueNumber: `${input.service.code}.${sequence}`,
    serviceSlug: input.service.slug,
    serviceName: input.service.name,
    agencyName: input.service.agency,
    outletName: input.outlet.name,
    outletAddress: input.outlet.address,
    visitDate: input.visitDate,
    registeredAt: input.now.toISOString(),
  };
}

export function getTicketQrPayload(ticket: MockTicket) {
  return JSON.stringify({
    demo: true,
    ticketCode: ticket.ticketCode,
    queueNumber: ticket.queueNumber,
    serviceSlug: ticket.serviceSlug,
    outlet: ticket.outletName,
    visitDate: ticket.visitDate,
  });
}
