import { TicketThreadView } from '@/components/support/TicketThreadView';

export default async function LearnerHelpThreadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <TicketThreadView id={id} basePath="/dashboard/help" />;
}
