import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Always hydrate the counter live with fresh DB values — zero caching delays.
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({ count: 3400 }, { status: 200 }); // Graceful fallback
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    // Count every single row inside the Waitlist table accurately.
    const { count, error } = await supabase
      .from('Waitlist')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('Supabase Count Error:', error);
      return NextResponse.json({ count: 3400 }, { status: 200 }); // Graceful fallback
    }

    const finalCount = (count || 0) + 3400;
    return NextResponse.json({ count: finalCount }, { status: 200 });
  } catch (error) {
    console.error('Count API Error:', error);
    return NextResponse.json({ count: 3400 }, { status: 200 });
  }
}
