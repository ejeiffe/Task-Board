export const getBoardLoading = (state) => state.taskBoard.isLoading;

export const getData = (state) => state.taskBoard.currentBoard;

export const getBoardName = (state) => state.taskBoard.currentBoard.name;

export const getBoards = (state) => state.taskBoard.allBoards;
