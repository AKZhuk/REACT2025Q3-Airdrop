'use client';

import React from 'react';
import CardList from '../../components/cardList/CardList';
import Search from '../../components/search/Search';
import Pagination from '../../components/pagination/Pagination';
import { useRouter } from '../../i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { useAppDispatch } from '../../store/hooks';
import { pokemonApi, useGetPokemonListQuery } from '../../api/pokemonApi';
import { useTranslations } from 'next-intl';
import './MainPage.css';

const MainPage: React.FC = () => {
  const t = useTranslations('MainPage');
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const searchTerm = searchParams?.get('q') ?? '';
  const page = Number(searchParams?.get('page') ?? '1') || 1;

  const { data, isLoading, isError, error } =
    useGetPokemonListQuery({ searchTerm, page });

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams?.toString() ?? '');
    params.set('q', term);
    params.set('page', '1');
    router.push(`/?${params.toString()}`);
  };

  const handleRefresh = () => {
    dispatch(pokemonApi.util.invalidateTags([{ type: 'PokemonList', id: 'LIST' }]));
  };

  return (
    <div className="main-page">
      <Search onSearch={handleSearch} />
      <button onClick={handleRefresh} className="main__refresh-button">
        {t('refresh')}
      </button>

      {isLoading && <p className="main-loading">{t('loading')}</p>}
      {isError && (
        <p className="main-error">
          {t('error')}
        </p>
      )}
      {!isLoading && !isError && data && (
        <>
          <CardList pokemons={data.results} />
          <Pagination />
        </>
      )}
    </div>
  );
};

export default MainPage;
