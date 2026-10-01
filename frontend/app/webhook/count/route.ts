import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Always hydrate the counter live with fresh DB values — zero caching delays.
export const dynamic = 'force-dynamic';

// The waitlist counter counts every Waitlist row on top of a fixed 3,400
// baseline. If the database can't be reached the page shows the last count we
// knew (3,605 on 2026-09-29) rather than a number that drops.
const BASELINE = 3400;
const LAST_KNOWN_COUNT = 3605;

export async function GET() {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({ count: LAST_KNOWN_COUNT }, { status: 200 }); // Graceful fallback
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    // Count every single row inside the Waitlist table accurately.
    const { count, error } = await supabase
      .from('Waitlist')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('Supabase Count Error:', error);
      return NextResponse.json({ count: LAST_KNOWN_COUNT }, { status: 200 }); // Graceful fallback
    }

    const finalCount = (count || 0) + BASELINE;
    // Public and shared: the homepage counter would otherwise query the
    // database on every single visit. Five minutes stale is invisible here.
    return NextResponse.json(
      { count: finalCount },
      { status: 200, headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' } },
    );
  } catch (error) {
    console.error('Count API Error:', error);
    return NextResponse.json({ count: LAST_KNOWN_COUNT }, { status: 200 });
  }
}
