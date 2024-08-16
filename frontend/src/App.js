import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import PokeLoader from './components/PokeLoader/PokeLoader';

function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  const handleLoadingComplete = () => {
    setLoadingComplete(true);
  };

  return (
    <>
      {!loadingComplete && <PokeLoader onLoadingComplete={handleLoadingComplete} />}
      {loadingComplete && (
        <Container>
          <Typography variant="h2" align="center" gutterBottom>
            Welcome to Pokémon Battle App
          </Typography>
          {/* Contenido principal aquí */}
        </Container>
      )}
    </>
  );
}

export default App;
