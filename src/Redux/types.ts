export const INITIALIZE = 'INITIALIZE';
export const SELECT_CARD = 'SELECT_CARD';
export const WIN = 'WIN';

export type GameType = {
  cards: CardType[];
  moves: string[];
  score: number;
};

export type CardType = {
  color: string;
  id: number;
  exist: boolean;
  selected: boolean;
};

export type InitializeCards = {
  type: typeof INITIALIZE;
  payload: CardType[];
};

export type SelectCard = {
  type: typeof SELECT_CARD;
  payload: {
    id: number;
    move: string;
  };
};

export type Win = {
  type: typeof WIN;
};

export type ActionTypes = InitializeCards | SelectCard | Win;
