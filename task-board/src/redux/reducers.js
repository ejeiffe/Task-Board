import {
  ADD_NEW_BOARD,
  DELETE_BOARD,
  LOAD_BOARD_FAILURE,
  LOAD_BOARD_IN_PROGRESS,
  LOAD_BOARD_SUCCESS,
  UPDATE_CURRENT_BOARD,
} from './actions';

const initialState = { isLoading: false, currentData: {}, currentBoard: "", allBoards: [] };

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
        currentData: board,
        currentBoard: board.name,
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

      if (updatedBoard.title !== state.currentData.title) {
        const newAllBoards = Array.from(state.allBoards);
        newAllBoards.forEach((board) => {
          if (board.name === state.currentBoard) {
            board.title = updatedBoard.title;
          }
        });
        const newState = {
          ...state,
          currentData: updatedBoard,
          allBoards: newAllBoards,
        };
        return newState;
      } else {
        const newState = {
          ...state,
          currentData: updatedBoard,
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
        currentData: newBoard,
        currentBoard: newBoard.name,
        allBoards: state.allBoards.concat(newBoardInfo),
      };

      return newState;
    }
    case DELETE_BOARD: {
      const boardToDelete = action.payload;

      const newAllBoards = Array.from(state.allBoards).filter((board) => board.name !== boardToDelete.name);

      if (newAllBoards.length > 0) {
        const newState = {
          ...state,
          currentData: {},
          currentBoard: newAllBoards[0].name,
          allBoards: newAllBoards,
        };

        return newState;

      } else {
        
        return initialState;

      }

    }
    default:
      return state;
  }
};
