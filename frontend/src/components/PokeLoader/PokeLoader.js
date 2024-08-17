import React, { useState, useEffect } from 'react';
import { Fade } from '@mui/material';
import './PokeLoader.css'; 

const PokeBallLoading = ({ onLoadingComplete }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(onLoadingComplete, 1000); 
    }, 900); 

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