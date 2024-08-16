import React, { useState } from 'react';
import { Grid, Box, Button, Typography } from '@mui/material';
import PokeCard from '../Card/PokeCard';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const PokeBattle = ({ pokemons = [] }) => {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [opponentPokemon, setOpponentPokemon] = useState(null);
  const [battleResult, setBattleResult] = useState(null);

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleRandomOpponent = () => {
    if (pokemons.length > 1) {
      const availablePokemons = pokemons.filter(pokemon => pokemon.id !== selectedPokemon.id);
      const randomOpponent = availablePokemons[Math.floor(Math.random() * availablePokemons.length)];
      setOpponentPokemon(randomOpponent);
    } else {
      console.error('Not enough Pokémon to choose a random opponent');
    }
  };

  const handleBattleStart = async () => {
    if (selectedPokemon && opponentPokemon) {
      try {
        const battleDto = {
          pokemon1Id: selectedPokemon.id,
          pokemon2Id: opponentPokemon.id,
        };

        console.log('Sending battle request to:', `${API_BASE_URL}/pokemon/battle`);
        console.log('Battle DTO:', battleDto);

        const response = await axios.post(`${API_BASE_URL}/pokemon/battle`, battleDto);
        setBattleResult(response.data);

      } catch (error) {
        console.error('Error during battle:', error);
        setBattleResult(null);
      }
    } else {
      console.error('Selected Pokémon or opponent Pokémon is missing');
      setBattleResult(null);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: 2,
      }}
    >
      {/* Mostrar el resultado de la batalla si existe */}
      {battleResult && (
        <Box sx={{ marginBottom: 4, textAlign: 'center' }}>
          <Typography variant="h4" color="text.primary">
            {battleResult.winnerName} es el ganador!
          </Typography>
          <PokeCard pokemon={battleResult.winner} />
        </Box>
      )}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          marginTop: 2,
        }}
      >
        {/* Mostrar las cartas vacías para el Pokémon seleccionado y el oponente */}
        <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
          <PokeCard pokemon={selectedPokemon} onClick={() => {}} /> {/* Carta para el Pokémon seleccionado */}
          <PokeCard pokemon={opponentPokemon} onClick={() => {}} /> {/* Carta para el Pokémon contrincante */}
        </Box>

        {/* Mostrar la lista de Pokémon */}
        <Grid container spacing={2} justifyContent="center">
          {pokemons.map((pokemon) => (
            <Grid item key={pokemon.id}>
              <PokeCard pokemon={pokemon} onClick={() => handlePokemonClick(pokemon)} />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ marginTop: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleRandomOpponent}
            disabled={!selectedPokemon} // Desactivar el botón si no hay Pokémon seleccionado
            sx={{ marginRight: 2 }}
          >
            Oponente Aleatorio
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={handleBattleStart}
            disabled={!selectedPokemon || !opponentPokemon} // Desactivar el botón si no hay Pokémon seleccionado u oponente
          >
            Iniciar Batalla
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PokeBattle;
