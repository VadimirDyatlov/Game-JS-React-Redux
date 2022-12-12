/* eslint-disable import/named */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCheckSession } from './store/userReducer/userReducer';

import Register from './components/Register/Register';
import Login from './components/Login/Login';
import GameMenu from './components/GameMenu/GameMenu';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getCheckSession());
  }, []);
  console.log(user);
  return (
    <BrowserRouter>
      {user
        ? (
          <Routes>
            <Route path="/reg" element={<Register />} />
            <Route path="log" element={<Login />} />
            <Route path="/" element={<GameMenu />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/reg" element={<Register />} />
            <Route path="log" element={<Login />} />
            <Route path="/" element={<GameMenu />} />
          </Routes>
        )}
    </BrowserRouter>
  );
}

export default App;
