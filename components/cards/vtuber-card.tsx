// components/VtuberCardCombined.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Vtuber } from '../../lib/types/vtuber';
/* ----------------------------- Types ----------------------------- */


export type SocialPlatform =
  | 'twitch'
  | 'youtube'
  | 'tiktok'
  | 'instagram'
  | 'twitter';

  
/* ----------------------------- Utils ----------------------------- */

export function formatCount(value: number | null | undefined): string {
  if (value == null || Number.isNaN(Number(value))) return '0';

  const n = Number(value);

  if (n < 1000) return String(n);
  if (n < 1_000_000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K`;
  if (n < 1_000_000_000)
    return `${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`;

  return `${(n / 1_000_000_000).toFixed(n % 1_000_000_000 === 0 ? 0 : 1)}B`;
}

export function getSocialUrl(platform: SocialPlatform | string, username?: string | null): string | null {
  if (!username) return null;

  const clean = username.trim();

  switch (platform) {
    case 'twitch':
      return clean.startsWith('http') ? clean : `https://twitch.tv/${clean.replace(/^@/, '')}`;
    case 'instagram':
      return clean.startsWith('http') ? clean : `https://instagram.com/${clean.replace(/^@/, '')}`;
    case 'twitter':
      return clean.startsWith('http') ? clean : `https://twitter.com/${clean.replace(/^@/, '')}`;
    case 'tiktok':
      return clean.startsWith('http') ? clean : `https://www.tiktok.com/@${clean.replace(/^@/, '')}`;
    default:
      return null;
  }
}

export function getYoutubeUrl(channelId?: string | null): string | null {
  if (!channelId) return null;
  const id = channelId.trim();
  if (!id) return null;

  if (id.startsWith('http')) return id;
  if (id.startsWith('UC')) {
    return `https://www.youtube.com/channel/${id}`;
  }
  if (id.startsWith('@')) {
    return `https://www.youtube.com/${id}`;
  }
  return `https://www.youtube.com/channel/${id}`;
}

/* --------------------------- LinkButton -------------------------- */

interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function LinkButton({
  href,
  children,
  className = '',
  target,
  rel,
  ...rest
}: LinkButtonProps) {
  const baseStyles =
    'inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-semibold text-white transition hover:bg-white/10';

  const combined = `${baseStyles} ${className}`.trim();

  const isExternal = /^https?:\/\//i.test(href);

  if (isExternal) {
    return (
      <a
        href={href}
        className={combined}
        target={target || '_blank'}
        rel={rel || 'noopener noreferrer'}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={combined} {...(rest as any)}>
      {children}
    </Link>
  );
}

/* --------------------------- VtuberCard -------------------------- */

interface VtuberCardProps {
  vtuber: Vtuber;
}

export function VtuberCard({ vtuber }: VtuberCardProps) {
  const isLive = vtuber.is_live;

  const twitchUrl = getSocialUrl('twitch', vtuber.twitch_username);
  const youtubeUrl = getYoutubeUrl(vtuber.youtube_channel_id);
  const tiktokUrl = getSocialUrl('tiktok', vtuber.tiktok);
  const instagramUrl = getSocialUrl('instagram', vtuber.instagram);
  const twitterUrl = getSocialUrl('twitter', vtuber.twitter);

  return (
    <article
      className={`glass-card group overflow-hidden rounded-[28px] p-6 transition-all duration-300 hover:-translate-y-2 ${
        isLive
          ? 'border border-red-700/50 shadow-[0_0_25px_rgba(198,40,40,.20)]'
          : 'border border-white/10'
      }`}
    >
      {/* BANNER */}
      <Image
        src={vtuber.banner || vtuber.avatar}
        alt={`${vtuber.name} banner`}
        width={1200}
        height={320}
        unoptimized
        className="h-44 w-full object-cover"
      />

      {/* CABECERA */}
      <div className="mb-6 mt-5 flex items-center gap-4">
        <Image
          src={vtuber.avatar}
          alt={`${vtuber.name} avatar`}
          width={88}
          height={88}
          unoptimized
          className="rounded-2xl border border-white/20 object-cover transition duration-300 group-hover:scale-105 group-hover:border-red-600"
        />

        <div className="flex-1">
          <Link
            href={`/vtuber/${vtuber.slug}`}
            className="text-2xl font-extrabold tracking-tight text-white transition hover:text-red-400"
          >
            {vtuber.name}
          </Link>

          <p className="mt-1 text-sm text-slate-400">
            @{vtuber.twitch_username}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            🌍 {vtuber.country}
          </p>
        </div>
      </div>

      {/* ESTADO DEL STREAM */}
      <div className="mb-6 flex items-center justify-between">
        <div
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] ${
            isLive ? 'bg-red-700 text-white' : 'bg-neutral-700 text-neutral-300'
          }`}
        >
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              isLive ? 'bg-white animate-pulse' : 'bg-neutral-400'
            }`}
          />

          {isLive ? 'EN DIRECTO' : 'DESCONECTADO'}
        </div>

        {vtuber.featured && (
          <span className="rounded-full border border-red-700/40 bg-red-900/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-300">
            Destacado
          </span>
        )}
      </div>

      {/* ESTADÍSTICAS */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Twitch */}
        <div className="rounded-2xl border border-white/5 bg-black/30 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
            Twitch
          </p>

          <p className="mt-3 text-3xl font-black text-white">
            {formatCount(vtuber.twitch_followers)}
          </p>

          <p className="mt-1 text-xs text-slate-400">Seguidores</p>
        </div>

        {/* YouTube */}
        <div className="rounded-2xl border border-white/5 bg-black/30 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
            YouTube
          </p>

          <p className="mt-3 text-3xl font-black text-white">
            {formatCount(vtuber.youtube_subscribers)}
          </p>

          <p className="mt-1 text-xs text-slate-400">Suscriptores</p>
        </div>
      </div>

      {/* REDES SOCIALES */}
      <div className="mt-6 flex flex-wrap gap-2">
        {twitterUrl && (
          <LinkButton href={twitterUrl} target="_blank" rel="noreferrer">
            X
          </LinkButton>
        )}

        {instagramUrl && (
          <LinkButton href={instagramUrl} target="_blank" rel="noreferrer">
            Instagram
          </LinkButton>
        )}

        {tiktokUrl && (
          <LinkButton href={tiktokUrl} target="_blank" rel="noreferrer">
            TikTok
          </LinkButton>
        )}

        {youtubeUrl && (
          <LinkButton href={youtubeUrl} target="_blank" rel="noreferrer">
            YouTube
          </LinkButton>
        )}

        {twitchUrl && (
          <LinkButton href={twitchUrl} target="_blank" rel="noreferrer">
            Twitch
          </LinkButton>
        )}
      </div>
    </article>
  );
}
