import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Always fresh — no caching
export const dynamic = 'force-dynamic';

const BASE_COUNT = 3617;

export async function GET() {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({ count: BASE_COUNT }, { status: 200 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { count, error } = await supabase
      .from('NotifySubscribers')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('[Notify Count] Supabase error:', error);
      return NextResponse.json({ count: BASE_COUNT }, { status: 200 });
    }

    return NextResponse.json({ count: (count ?? 0) + BASE_COUNT }, { status: 200 });
  } catch (err) {
    console.error('[Notify Count] Error:', err);
    return NextResponse.json({ count: BASE_COUNT }, { status: 200 });
  }
}
