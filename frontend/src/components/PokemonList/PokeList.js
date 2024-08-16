import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import axios from 'axios';
import PokeCard from '../Card/PokeCard';
import PokeBattle from '../PokeBattle/PokeBattle';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';

const PokeList = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/pokemon`)
      .then(response => setPokemons(response.data))
      .catch(error => console.error('Error fetching Pokémon:', error));
  },
   []);

  const handlePokemonClick = (pokemon) => {
    console.log('Pokemon clicked:', pokemon);
    // Aquí puedes manejar el clic en un Pokémon
  };

  return (
    <div>
      <PokeBattle pokemons={pokemons} />
      <Grid container spacing={3} justifyContent="center">
        {pokemons.map(pokemon => (
          <Grid item key={pokemon.id}>
            <PokeCard pokemon={pokemon} onClick={handlePokemonClick} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PokeList;
