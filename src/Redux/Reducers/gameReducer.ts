import { GameType, INITIALIZE, SELECT_CARD, WIN, ActionTypes } from '../types';

const initialState: GameType = {
  moves: [],
  cards: [],
  score: 0,
};

const gameReducer = (state = initialState, action: ActionTypes): GameType => {
  switch (action.type) {
    case INITIALIZE: {
      return {
        ...state,
        moves: [],
        cards: [...action.payload],
        score: 0,
      };
    }
    case SELECT_CARD: {
      return {
        ...state,
        moves: [...state.moves, action.payload.move],
        cards: [
          ...state.cards.map(card => {
            if (card.id === action.payload.id) {
              return {
                ...card,
                selected: true,
              };
            }
            return card;
          }),
        ],
      };
    }
    case WIN: {
      return {
        ...state,
        cards: [
          ...state.cards.map(card => {
            if (card.color === state.moves[0]) {
              return {
                ...card,
                exist: false,
              };
            }
            return {
              ...card,
              selected: false,
            };
          }),
        ],
        moves: [],
        score: state.score + 1,
      };
    }
    default:
      return state;
  }
};

export default gameReducer;
