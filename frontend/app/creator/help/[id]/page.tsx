import { TicketThreadView } from '@/components/support/TicketThreadView';

export default async function CreatorHelpThreadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <TicketThreadView id={id} basePath="/creator/help" />;
}
