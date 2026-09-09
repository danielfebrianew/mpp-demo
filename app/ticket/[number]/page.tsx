import { TicketView } from '@/components/ticket-view';

export function generateStaticParams() {
  return [{ number: 'A-023' }];
}

export default async function TicketPage({ params, searchParams }: { params: Promise<{ number: string }>; searchParams: Promise<{ scenario?: string | string[] }> }) {
  const { number } = await params;
  const query = await searchParams;
  return <TicketView number={number} scenarioId={query.scenario} />;
}
