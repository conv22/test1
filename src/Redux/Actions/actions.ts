import {
  INITIALIZE,
  SELECT_CARD,
  CardType,
  InitializeCards,
  SelectCard,
  Win,
  WIN,
} from '../types';
import { shuffle } from '../../helpers/shuffle';
import { AppThunk } from '../store';

export function initializeCards() {
  let id = 0;
  let colors = [
    '59C9A5',
    'FFA0AC',
    'DAB6C4',
    '896978',
    'DD614A',
    'C5C392',
    'E5EBEA',
    '747572',
  ].reduce((acc: CardType[], color: string): CardType[] => {
    acc.push({
      id: id++,
      color,
      exist: true,
      selected: false,
    });
    acc.push({
      id: id++,
      color,
      exist: true,
      selected: false,
    });
    return acc;
  }, []);
  const payload = shuffle(colors);
  return initializeAction(payload);
}

export const SelectCardThunk = (color: string, id: number): AppThunk => (
  dispatch,
  getState
) => {
  const moves = getState().game.moves;
  if (moves.length === 0) {
    return dispatch(selectAction(color, id));
  }
  if (moves.length > 0 && moves[0] === color) {
    return dispatch(winAction());
  }
  if (moves.length > 0 && moves[0] !== color) {
    return dispatch(initializeCards());
  }
};
//Action creators

function initializeAction(cards: CardType[]): InitializeCards {
  return {
    type: INITIALIZE,
    payload: cards,
  };
}

function selectAction(color: string, id: number): SelectCard {
  return {
    type: SELECT_CARD,
    payload: {
      move: color,
      id,
    },
  };
}
function winAction(): Win {
  return {
    type: WIN,
  };
}
