export const LOAD_BOARD_IN_PROGRESS = 'LOAD_BOARD_IN_PROGRESS';
export const loadBoardInProgress = () => ({
  type: LOAD_BOARD_IN_PROGRESS,
});

export const LOAD_BOARD_SUCCESS = 'LOAD_BOARD_SUCCESS';
export const loadBoardSuccess = (board) => ({
  type: LOAD_BOARD_SUCCESS,
  payload: board,
});

export const LOAD_BOARD_FAILURE = 'LOAD_BOARD_FAILURE';
export const loadBoardFailure = () => ({
  type: LOAD_BOARD_FAILURE,
});

export const UPDATE_CURRENT_BOARD = 'UPDATE_CURRENT_BOARD';
export const updateCurrentBoard = (board) => ({
  type: UPDATE_CURRENT_BOARD,
  payload: board,
});

export const ADD_NEW_BOARD = 'ADD_NEW_BOARD';
export const addNewBoard = (board) => ({
  type: ADD_NEW_BOARD,
  payload: board,
});

export const DELETE_BOARD = 'DELETE_BOARD';
export const deleteBoard = (board) => ({
  type: DELETE_BOARD,
  payload: board,
});
