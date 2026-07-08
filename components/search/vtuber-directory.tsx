'use client';

import type { ChangeEvent } from 'react';
import type { Vtuber } from '../../lib/types/vtuber';
import { SearchBar } from './search-bar';
import { VtuberCard } from '../cards/vtuber-card';
import { useVtuberSearch } from '../../hooks/useVtuberSearch';

interface VtuberDirectoryProps {
  streamers: Vtuber[];
}

const statusOptions = [
  { value: 'all', label: 'Todos' },
  { value: 'live', label: 'En directo' },
  { value: 'offline', label: 'Desconectados' },
  { value: 'featured', label: 'Destacados' },
] as const;

const sortOptions = [
  { value: 'featured', label: 'Destacados' },
  { value: 'twitch', label: 'Seguidores Twitch' },
  { value: 'youtube', label: 'Suscriptores YouTube' },
  { value: 'name', label: 'Nombre' },
] as const;

export function VtuberDirectory({ streamers }: VtuberDirectoryProps) {
 const {
  query,
  setQuery,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
  filteredVtubers,
} = useVtuberSearch(streamers);

  function handleStatusChange(value: string) {
    setStatusFilter(value as typeof statusFilter);
  }

  function handleSortChange(event: ChangeEvent<HTMLSelectElement>) {
    setSortBy(event.target.value as typeof sortBy);
  }

  return (
    <section className="mt-12">

      <div className="mb-8 rounded-[30px] border border-red-900/30 bg-black/50 p-6 backdrop-blur-xl">

        <div className="mb-6">

          <h2 className="text-3xl font-black text-white">
            Directorio de Streamers
          </h2>

          <p className="mt-2 text-slate-400">
            Descubre los creadores de contenido de War Thunder en español.
          </p>

        </div>

        <SearchBar
          value={query}
          onChange={setQuery}
        />

        <div className="mt-6 rounded-2xl border border-white/10 bg-neutral-950/70 p-4">

          <div className="flex flex-wrap gap-3">

            {statusOptions.map((option) => {

              const isActive = statusFilter === option.value;

              return (

                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleStatusChange(option.value)}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? 'bg-red-700 text-white shadow-lg'
                      : 'border border-white/10 bg-neutral-900 text-slate-300 hover:border-red-700 hover:text-white'
                  }`}
                >
                  {option.label}
                </button>

              );

            })}

          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">

            <label
              htmlFor="vtuber-sort"
              className="text-sm font-medium uppercase tracking-wider text-slate-400"
            >
              Ordenar por
            </label>

            <select
              id="vtuber-sort"
              value={sortBy}
              onChange={handleSortChange}
              className="rounded-xl border border-white/10 bg-black px-4 py-2 text-sm text-white outline-none transition focus:border-red-600"
            >

              {sortOptions.map((option) => (

                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>

              ))}

            </select>

          </div>

        </div>

      </div>

      <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">

        {filteredVtubers.map((vtuber) => (

          <VtuberCard
            key={vtuber.id}
            vtuber={vtuber}
          />

        ))}

      </div>

    </section>
  );
}