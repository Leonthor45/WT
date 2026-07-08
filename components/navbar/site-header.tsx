import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className="sticky top-4 z-50 mb-10 rounded-[28px] border border-red-900/30 bg-black/65 backdrop-blur-xl shadow-2xl">
      <div className="h-1 w-full rounded-t-[28px] bg-gradient-to-r from-red-700 via-red-600 to-red-800" />

      <div className="flex flex-col gap-8 p-7 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 rounded-full border border-red-700/30 bg-red-900/20 px-4 py-2 text-sm font-medium uppercase tracking-wider text-red-300">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-500" />
            Comunidad War Thunder España
          </div>

          <div>
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
              War Thunder Español
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              El directorio de streamers y creadores de contenido de
              <span className="font-semibold text-white"> War Thunder </span>
              en español. Descubre nuevos canales, consulta sus redes oficiales
              y encuentra quién está en directo.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-red-700 bg-red-700 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-all duration-300 hover:bg-red-600 hover:shadow-lg hover:shadow-red-700/30"
          >
            Explorar Streamers
          </Link>
        </div>
      </div>
    </header>
  );
}
