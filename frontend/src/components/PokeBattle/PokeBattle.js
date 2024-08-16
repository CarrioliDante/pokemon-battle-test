import React, { useState } from 'react';
import { Box, Button, Typography, Modal, List, ListItem, ListItemText } from '@mui/material';
import PokeCard from '../Card/PokeCard';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const PokeBattle = ({ selectedPokemon, pokemons }) => {
  const [opponentPokemon, setOpponentPokemon] = useState(null);
  const [battleResult, setBattleResult] = useState(null);
  const [showWinner, setShowWinner] = useState(false);
  const [history, setHistory] = useState([]);
  const [openHistory, setOpenHistory] = useState(false);

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

        const response = await axios.post(`${API_BASE_URL}/pokemon/battle`, battleDto);
        setBattleResult(response.data);
        setShowWinner(true); // Mostrar la vista del ganador

        // Fetch and update history after the battle
        fetchHistory();

      } catch (error) {
        console.error('Error during battle:', error);
        setBattleResult(null);
      }
    } else {
      console.error('Selected Pokémon or opponent Pokémon is missing');
      setBattleResult(null);
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/pokemon/battle/history`);
      setHistory(response.data.slice(0, 5)); // Obtener los últimos 5 ganadores
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  const handleOpenHistory = () => {
    fetchHistory();
    setOpenHistory(true);
  };

  const handleCloseHistory = () => {
    setOpenHistory(false);
  };

  const handleCloseWinner = () => {
    setShowWinner(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
      {/* Mostrar la vista del ganador si se ha decidido */}
      {showWinner && battleResult && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            zIndex: 1000,
          }}
          onClick={handleCloseWinner}
        >
          <Typography variant="h4">
            {battleResult.winnerName} es el ganador!
          </Typography>
          <PokeCard pokemon={battleResult.winner} />
        </Box>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '800px', marginBottom: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '40%' }}>
          <PokeCard pokemon={selectedPokemon} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '20%' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleRandomOpponent}
            disabled={!selectedPokemon}
            sx={{ marginBottom: 2 }}
          >
            Oponente Aleatorio
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={handleBattleStart}
            disabled={!selectedPokemon || !opponentPokemon}
          >
            Iniciar Batalla
          </Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={handleOpenHistory}
            sx={{ marginTop: 2 }}
          >
            Historial
          </Button>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '40%' }}>
          <PokeCard pokemon={opponentPokemon} />
        </Box>
      </Box>

      {/* Modal para mostrar el historial de ganadores */}
      <Modal open={openHistory} onClose={handleCloseHistory}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>
            Historial de Ganadores
          </Typography>
          <List>
            {history.map((battle, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`Ganador: ${battle.winnerName}`}
                  secondary={`Vs ${battle.loserName}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Modal>
    </Box>
  );
};

export default PokeBattle;
