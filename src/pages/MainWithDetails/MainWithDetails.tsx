'use client';

import React from 'react';
import MainPage from '../MainPage/MainPage';
import PokemonDetail from '../../components/pokemonDetail/PokemonDetail';
import SelectedFlyout from '../../components/selectedFlyout/SelectedFlyout';
import { useSearchParams } from 'next/navigation';
import './MainWithDetails.css';

const MainWithDetails: React.FC = () => {
  const searchParams = useSearchParams();
  const showDetails = searchParams.has('details');

  return (
    <div className="main-with-details">
      <div className="main-section">
        <MainPage />
      </div>
      {showDetails && (
        <aside className="details-section">
          <PokemonDetail />
        </aside>
      )}
      <SelectedFlyout />
    </div>
  );
};

export default MainWithDetails;
