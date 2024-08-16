import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Box, LinearProgress } from '@mui/material';
import './PokeCard.css';

const PokeCard = ({ pokemon, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const [audio, setAudio] = useState(null);

  React.useEffect(() => {
    if (pokemon && pokemon.cryUrl) {
      setAudio(new Audio(pokemon.cryUrl));
    }
  }, [pokemon]);

  const handleClick = () => {
    if (pokemon) {
      onClick(pokemon);
      if (audio) {
        audio.play().catch((error) => {
          console.error('Error playing audio:', error);
        });
      }
    }
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  if (!pokemon) {
    return (
      <Card className="pokemon-card" style={{ width: 200, height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CardContent>
          <Typography variant="h6" align="center">
            No Pokémon
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className="pokemon-card"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: 'pointer' }}
    >
      <CardMedia
        component="img"
        height="140"
        image={pokemon.imageUrl}
        alt={pokemon.name}
        style={{ objectFit: 'contain' }}
      />
      <CardContent>
        <Typography variant="h5" component="div" align="center">
          {pokemon.name}
        </Typography>
      </CardContent>
      {hovered && (
        <Box className="pokemon-stats">
          <Typography variant="body2" color="text.secondary">Attack</Typography>
          <LinearProgress variant="determinate" value={pokemon.attack * 10} />
          <Typography variant="body2" color="text.secondary">Defense</Typography>
          <LinearProgress variant="determinate" value={pokemon.defense * 10} />
          <Typography variant="body2" color="text.secondary">HP</Typography>
          <LinearProgress variant="determinate" value={pokemon.hp * 10} />
          <Typography variant="body2" color="text.secondary">Speed</Typography>
          <LinearProgress variant="determinate" value={pokemon.speed * 10} />
        </Box>
      )}
    </Card>
  );
};

export default PokeCard;
