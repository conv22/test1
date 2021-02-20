import React from 'react';
import { Board } from './Components/Board';
import classes from './App.module.scss';

const App: React.FC = () => {
  return (
    <div className={classes.container}>
      <Board />
    </div>
  );
};

export default App;
