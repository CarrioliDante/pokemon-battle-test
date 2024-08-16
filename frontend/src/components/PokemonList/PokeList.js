import React from 'react';
import { Grid } from '@mui/material';
import PokeCard from '../Card/PokeCard';

const PokeList = ({ pokemons, setSelectedPokemon }) => {
  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  return (
    <Grid container spacing={3} justifyContent="center">
      {pokemons.map(pokemon => (
        <Grid item key={pokemon.id}>
          <PokeCard pokemon={pokemon} onClick={() => handlePokemonClick(pokemon)} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PokeList;
