import React from 'react';
import { useSelector } from 'react-redux';
import './Hero.css';

function Hero() {
  const { hero } = useSelector((state) => state.game);

  return (
    <div
      className="hero"
      style={{
        transform: ` translate(${hero.x}px, ${hero.y}px) scale(${hero.move}, 1)`,
        width: `${hero.w}px`,
        height: `${hero.h}px`,
        zIndex: `${hero.y}`,
      }}
    >
      <img
        src={`${hero.skin}`} // скин игрока
        alt={`${hero.move}`} // зеркалим скин
      />
    </div>
  );
}

export default Hero;
