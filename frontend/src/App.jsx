/* eslint-disable no-unused-vars */
import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addData } from './store/game/reducer';

function App() {
  const user = 0;
  return (
    <BrowserRouter>

      {user
        ? (
          <Routes>
            <div />
          </Routes>
        ) : (
          <Routes>
            <div />
          </Routes>
        )}

    </BrowserRouter>
  );
}

export default App;
