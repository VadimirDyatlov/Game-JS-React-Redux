/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addData } from './store/game/reducer';

function App() {
  const data = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addData());
  }, [dispatch]);
  return (
    <div className="App">
      {data.game.data.map((el) => (
        <div key={el}>{el}</div>
      ))}
    </div>
  );
}

export default App;
