import { redirect } from 'next/navigation';

/** The old course builder entry: new courses start in the wizard. */
export default function OldBuilderEntry() {
  redirect('/creator/create');
}
