import React from 'react';
import type { PokemonItem } from '@/types';
import MainPage from '@/pages/MainPage/MainPage';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export const revalidate = 60;

export default async function AboutPage() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0', {
    cache: 'force-cache'
  });

  const data = await res.json();
  const initialPokemons = (data.results ?? []) as PokemonItem[];

  const t = await getTranslations('About');

  return (
    <div className="about-page">
      <h2 className="about-title">{t('title')}</h2>
      <p className="about-author">{t('author')}</p>
      <Link href="https://rs.school/" className="about-link" target="_blank" rel="noopener noreferrer">
        {t('courseLink')}
      </Link>

      <div style={{ marginTop: '1rem' }}>
        <strong>{t('sampleLoaded')}:</strong>
        <ul>
          {initialPokemons.slice(0, 3).map(p => (
            <li key={p.name}>{p.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
