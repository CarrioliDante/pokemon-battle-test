import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import PokeList from './components/PokemonList/PokeList';
import PokeLoader from './components/PokeLoader/PokeLoader';
import PokeBattle from './components/PokeBattle/PokeBattle';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [loadingComplete, setLoadingComplete] = useState(false);

  const handleLoadingComplete = () => {
    setLoadingComplete(true);
  };

  return (
    <>
      {!loadingComplete && <PokeLoader onLoadingComplete={handleLoadingComplete} />}
      {loadingComplete && (
        <Container>
        <ToastContainer />
          <Typography variant="h2" align="center" gutterBottom>
            Welcome to Pokémon Battle App
          </Typography>
          <PokeList/>
          <PokeBattle/>
        </Container>
      )}
    </>
  );
};

export default App;