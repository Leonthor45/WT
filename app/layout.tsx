import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'STREAMERS WAR THUNDER ESP| Directorio de Streamers de War Thunder',
  description:
    'Descubre los streamers y creadores de contenido de War Thunder en español. Encuentra quién está en directo, consulta sus redes oficiales y explora la comunidad.',
  keywords: [
    'War Thunder',
    'WT Hub',
    'War Thunder España',
    'Streamers War Thunder',
    'YouTube War Thunder',
    'Twitch War Thunder',
    'Comunidad War Thunder',
    'Creadores War Thunder',
  ],
  authors: [
    {
      name: 'War Thunder Español',
    },
  ],
  creator: 'War Thunder Español',

  openGraph: {
    title: 'War Thunder Español',
    description:
      'El directorio de streamers y creadores de contenido de War Thunder en español.',
    type: 'website',
    locale: 'es_ES',
    siteName: 'War Thunder Español',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'War Thunder Español',
    description:
      'Descubre la comunidad hispanohablante de War Thunder.',
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="bg-[#0b0b0b] text-white antialiased">
        <div className="mx-auto min-h-screen max-w-[1700px] px-4 py-6 sm:px-6 lg:px-10">
          {children}
        </div>
      </body>
    </html>
  );
}