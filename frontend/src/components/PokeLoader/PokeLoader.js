import React, { useState, useEffect } from 'react';
import { Fade } from '@mui/material';
import './PokeLoader.css'; // Si es necesario, puedes ajustar los estilos aquí

const PokeBallLoading = ({ onLoadingComplete }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(onLoadingComplete, 1000); // Espera a que el fade termine antes de marcar la carga como completa
    }, 3000); // Duración de la pantalla de carga

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <Fade in={loading} timeout={1000} mountOnEnter unmountOnExit>
      <div className="pokeball-loading-screen">
        <div className="pokeball-half red">
          <div className="pokeball-center"></div>
        </div>
        <div className="pokeball-half white"></div>
      </div>
    </Fade>
  );
};

export default PokeBallLoading;