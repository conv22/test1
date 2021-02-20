import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initializeCards, SelectCardThunk } from '../Redux/Actions/actions';
import { RootState } from '../Redux/Reducers/indexReducer';
import classes from '../App.module.scss';

const Board: React.FC = () => {
  const dispatch = useDispatch();
  const score = useSelector((state: RootState) => state.game.score);
  const cards = useSelector((state: RootState) => state.game.cards);
  useEffect(() => {
    dispatch(initializeCards());
  }, [dispatch]);

  useEffect(() => {
    if (score >= 8) {
      alert('You won!');
    }
  }, [score]);

  const clickHandler = (color: string, id: number) => {
    dispatch(SelectCardThunk(color, id));
  };

  return (
    <>
      <h1 className={classes.h1}>Score {score}</h1>
      <div className={classes.items}>
        {cards.map(item => {
          return (
            <Tale
              key={item.id}
              id={item.id}
              selected={item.selected}
              exist={item.exist}
              color={item.color}
              click={clickHandler}
            />
          );
        })}
      </div>
    </>
  );
};

type TaleProps = {
  color: string;
  exist: boolean;
  selected: boolean;
  id: number;
  click(color: string, id: number): void;
};
const Tale: React.FC<TaleProps> = ({ selected, id, color, exist, click }) => {
  const clickHandler = (color: string, id: number) => {
    click(color, id);
  };
  if (!exist) {
    return <div className={classes.empty}></div>;
  }
  return (
    <div
      className={
        selected ? `${classes.item} ${classes.selected}` : classes.item
      }
      onClick={() => (selected ? null : clickHandler(color, id))}
    >
      <div className={classes.flipper}>
        <div
          className={selected ? classes.front : classes.back}
          style={
            selected ? { background: `#${color}` } : { background: 'grey' }
          }
        ></div>
      </div>
    </div>
  );
};

export { Board };
