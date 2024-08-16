import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import PokeLoader from './components/PokeLoader/PokeLoader';
import PokeList from './components/PokemonList/PokeList';
import PokeBattle from './components/PokeBattle/PokeBattle';
import axios from 'axios';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const App = () => {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const handleLoadingComplete = () => {
    setLoadingComplete(true);
  };

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/pokemon`);
        setPokemons(response.data);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      }
    };

    fetchPokemons();
  }, []);

  return (
    <>
      {!loadingComplete && <PokeLoader onLoadingComplete={handleLoadingComplete} />}
      {loadingComplete && (
        <Container>
          <Typography variant="h2" align="center" gutterBottom>
            Welcome to Pokémon Battle App
          </Typography>
          <PokeList pokemons={pokemons} setSelectedPokemon={setSelectedPokemon} />
          <PokeBattle selectedPokemon={selectedPokemon} pokemons={pokemons} setSelectedPokemon={setSelectedPokemon} />
        </Container>
      )}
    </>
  );
};

export default App;
