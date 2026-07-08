
import { SiteFooter } from '../components/footer/site-footer';
import { SiteHeader } from '../components/navbar/site-header';
import { VtuberDirectory } from '../components/search/vtuber-directory';
import { PageShell } from '../components/layout/page-shell';
import { getStreamers } from '../lib/services/vtubers';

export const revalidate = 60;

export default async function HomePage() {
  const streamers = await getStreamers();

  const featuredCount = streamers.filter((vtuber) => vtuber.featured).length;
  const liveCount = streamers.filter((vtuber) => vtuber.is_live).length;

  const platforms = ['Twitch', 'YouTube'];

  return (
    <PageShell>
      <main className="space-y-10">
        <SiteHeader />

        <section className="grid gap-6 lg:grid-cols-[1.8fr_1fr]">
          {/* HERO */}
          <div className="glass-card rounded-[32px] p-8">
            <div className="mb-7 space-y-4">
              <p className="inline-flex items-center gap-2 rounded-full bg-red-600/15 px-4 py-2 text-sm text-red-300">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />
                Directorio de Streamers y Creadores de War Thunder
              </p>

              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                WT
              </h2>

              <p className="max-w-2xl text-lg text-slate-300">
                Descubre los streamers y creadores de contenido de War Thunder en
                español. Consulta sus redes oficiales y encuentra quién está en
                directo.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
                  Streamers
                </p>

                <p className="mt-4 text-3xl font-bold text-white">
                  {streamers.length}
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
                  Destacados
                </p>

                <p className="mt-4 text-3xl font-bold text-white">
                  {featuredCount}
                </p>
              </div>

              <div className="rounded-3xl border border-red-500/30 bg-black/30 p-5">
                <p className="text-sm uppercase tracking-[0.25em] text-red-400">
                  En Directo
                </p>

                <p className="mt-4 text-3xl font-bold text-red-500">
                  {liveCount}
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
                  Plataformas
                </p>

                <p className="mt-4 text-3xl font-bold text-white">
                  {platforms.length}
                </p>

                <div className="mt-4 flex gap-2">
                  {platforms.map((platform) => (
                    <span
                      key={platform}
                      className="rounded-full bg-red-600/20 px-3 py-1 text-sm text-red-300"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* PANEL DERECHO */}
          <div className="glass-card rounded-[32px] p-8">
            <h3 className="text-xl font-semibold text-white">
              ¿Qué encontrarás en WT?
            </h3>

            <p className="mt-3 text-slate-300">
              Un directorio creado para descubrir fácilmente a los streamers y
              creadores de contenido de War Thunder en español.
            </p>

            <div className="mt-6 space-y-4 text-sm text-slate-400">
              <p>• Perfiles completos de cada creador.</p>
              <p>• Enlaces oficiales a Twitch y YouTube.</p>
              <p>• Estado "EN DIRECTO" en tiempo real.</p>
              <p>• Seguidores y suscriptores actualizados.</p>
            </div>
          </div>
        </section>

        <VtuberDirectory streamers={streamers} />

        <SiteFooter />
      </main>
    </PageShell>
  );
}