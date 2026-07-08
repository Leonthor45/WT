export function SiteFooter() {
  return (
    <footer className="mt-20 overflow-hidden rounded-[30px] border border-red-900/30 bg-black/70 backdrop-blur-xl">

      {/* Línea superior */}
      <div className="h-1 w-full bg-gradient-to-r from-red-800 via-red-600 to-red-800" />

      <div className="px-8 py-10">

        <div className="flex flex-col items-center gap-5 text-center">

          <h3 className="text-2xl font-black tracking-wide text-white">
            War Thunder Español
          </h3>

          <p className="max-w-3xl text-sm leading-7 text-slate-300">
            War Thunder Español es un proyecto creado por la comunidad para reunir a
            los streamers y creadores de contenido de War Thunder en español en
            un único lugar.
          </p>

          <div className="flex flex-wrap justify-center gap-3 text-xs uppercase tracking-[0.25em] text-slate-500">

            <span>Twitch</span>

            <span>•</span>

            <span>YouTube</span>

            <span>•</span>

            <span>War Thunder</span>

            <span>•</span>

            <span>Comunidad</span>

          </div>

          <div className="mt-4 h-px w-full max-w-2xl bg-white/10" />

          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} War Thunder Español · Proyecto independiente
            creado por la comunidad.
          </p>

        </div>

      </div>

    </footer>
  );
}