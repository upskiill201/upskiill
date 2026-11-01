import { redirect } from 'next/navigation';

/** Old certificate links (the pre-launch demo) now live at /c/:code. */
export default async function LegacyCertificatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  redirect(`/c/${encodeURIComponent(id)}`);
}
