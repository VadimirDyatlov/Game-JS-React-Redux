/* eslint-disable import/named */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCheckSession } from './store/authReducer/authReducer';

import Register from './components/Register/Register';
import Login from './components/Login/Login';
import GameMenu from './components/GameMenu/GameMenu';
import Game from './components/Game/Game';
import UpgradeHero from './components/UpgradeHero/UpgradeHero';
import Statistics from './components/Statistics/Statistics';
import Settings from './components/Settings/Settings';
import NoPage from './components/NoPage/NoPage';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getCheckSession());
  }, []);
  return (
    <BrowserRouter>
      {user
        ? (
          <Routes>
            <Route path="reg" element={<Register />} />
            <Route path="log" element={<Login />} />
            <Route path="/" element={<GameMenu />} />
            <Route path="game" element={<Game />} />
            <Route path="hero-up" element={<UpgradeHero />} />
            <Route path="statistics" element={<Statistics />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="reg" element={<Register />} />
            <Route path="log" element={<Login />} />
            <Route path="123" element={<NoPage />} />
            <Route path="/" element={<GameMenu />} />
          </Routes>
        )}
    </BrowserRouter>
  );
}

export default App;
