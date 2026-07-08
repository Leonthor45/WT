import { getSupabase } from '../supabase';
import type { Vtuber } from '../types/vtuber';

type SupabaseSingleResult<T> = {
  data: T | null;
  error: any | null;
};

export async function getVtuberBySlug(
  slug: string
): Promise<Vtuber | null> {
  const supabase = getSupabase();

  const streamersQuery = supabase.from('streamers') as any;

  const res = (await streamersQuery
    .select('*')
    .eq('slug', slug)
    .single()) as SupabaseSingleResult<Vtuber>;

  if (res.error || !res.data) return null;

  return res.data;
}

export { getVtuberBySlug as getVtuber };