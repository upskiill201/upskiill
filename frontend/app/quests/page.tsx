import { redirect } from 'next/navigation';

// The quests experience lives inside the dashboard shell — keep legacy
// /quests links alive by forwarding there.
export default function QuestsRedirectPage() {
  redirect('/dashboard/quests');
}
