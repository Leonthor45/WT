import { getSupabaseAdmin } from '../../supabase-admin';
import { getTwitchChannels } from '../twitch';
import type { Database } from '../../types/supabase';
import type { Vtuber } from '../../types/vtuber';

type SupabaseListResult<T> = {
  data: T[] | null;
  error: any | null;
};

type TwitchUpdatePayload =
  Database['public']['Tables']['streamers']['Update'];

export async function updateTwitch() {
  console.log('\n========== TWITCH ==========\n');

  const supabaseAdmin = getSupabaseAdmin();

  const limite = new Date(Date.now() - 5 * 60 * 1000).toISOString();

  const res = (await supabaseAdmin
    .from('streamers')
    .select('*')
    .or(`twitch_updated_at.is.null,twitch_updated_at.lt.${limite}`)) as unknown as SupabaseListResult<Vtuber>;

  if (res.error) {
    throw res.error;
  }

  const streamers = res.data ?? [];

  if (!streamers.length) {
    console.log('No hay streamers para actualizar.');
    return;
  }

  const usernames = streamers
    .filter((v) => v.twitch_username)
    .map((v) => v.twitch_username);

  console.log(`Consultando ${usernames.length} canales en una sola petición...`);

  const channels = await getTwitchChannels(usernames);

  const updates = streamers.map(async (vtuber) => {
    if (!vtuber.twitch_username) return;

    const twitch = channels.get(vtuber.twitch_username.toLowerCase());

    if (!twitch) {
      console.log(`No encontrado: ${vtuber.name}`);
      return;
    }

    const payload: TwitchUpdatePayload = {
      avatar: twitch.avatar,
      banner: twitch.banner || vtuber.banner || twitch.avatar,
      is_live: twitch.isLive,
      twitch_viewers: twitch.viewers,
      twitch_followers: twitch.followers,
      current_game: twitch.game,
      stream_title: twitch.title,
      twitch_updated_at: new Date().toISOString(),
    };

    const { error: updateError } = await (supabaseAdmin
      .from('streamers') as any)
      .update(payload)
      .eq('id', vtuber.id);

    if (updateError) {
      console.error(updateError);
      return;
    }

    console.log(
      `✓ ${vtuber.name} | ${twitch.isLive ? '🔴 LIVE' : '⚫ Offline'} | ${twitch.viewers} viewers | ${twitch.followers} followers`
    );
  });

  await Promise.all(updates);

  console.log('\nTwitch actualizado.\n');
}
