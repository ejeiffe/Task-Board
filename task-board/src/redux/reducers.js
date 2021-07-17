import {
  ADD_NEW_BOARD,
  DELETE_BOARD,
  LOAD_BOARD_FAILURE,
  LOAD_BOARD_IN_PROGRESS,
  LOAD_BOARD_SUCCESS,
  UPDATE_CURRENT_BOARD,
} from './actions';

const initialState = { isLoading: false, currentBoard: {}, allBoards: [] };

export const taskBoard = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_BOARD_IN_PROGRESS: {
      const newState = {
        ...state,
        isLoading: true,
      };

      return newState;
    }
    case LOAD_BOARD_SUCCESS: {
      const board = action.payload;

      const newState = {
        ...state,
        isLoading: false,
        currentBoard: board,
      };

      return newState;
    }

    case LOAD_BOARD_FAILURE: {
      const newState = {
        ...state,
        isLoading: false,
      };
      return newState;
    }
    case UPDATE_CURRENT_BOARD: {
      const updatedBoard = action.payload;

      if (updatedBoard.name !== state.currentBoard.name) {
        const newAllBoards = Array.from(state.allBoards);
        newAllBoards.forEach((board) => {
          if (board.name === state.currentBoard.name) {
            board.name = updatedBoard.name;
            board.title = updatedBoard.title;
          }
        });
        const newState = {
          ...state,
          currentBoard: updatedBoard,
          allBoards: newAllBoards,
        };
        return newState;
      } else {
        const newState = {
          ...state,
          currentBoard: updatedBoard,
        };

        return newState;
      }
    }
    case ADD_NEW_BOARD: {
      const newBoard = action.payload;
      const newBoardInfo = {
        name: newBoard.name,
        title: newBoard.title,
      };

      const newState = {
        ...state,
        currentBoard: newBoard,
        allBoards: state.allBoards.concat(newBoardInfo),
      };

      return newState;
    }
    case DELETE_BOARD: {
      const boardToDelete = action.payload;

      const newState = {
        ...state,
        currentBoard: {},
        allBoards: state.allBoards.filter(
          (board) => board.name !== boardToDelete.name
        ),
      };
      return newState;
    }
    default:
      return state;
  }
};
