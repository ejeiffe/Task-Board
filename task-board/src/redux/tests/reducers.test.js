import { taskBoard } from '../reducers';

const originalBoard = {
  name: 'original-board',
  title: 'Original Board',
  tasks: {},
  columns: {},
  columnOrder: [],
};
const updatedBoard = {
  name: 'original-board',
  title: 'Updated Board',
  tasks: {},
  columns: {},
  columnOrder: [],
};
const newBoard = {
  name: 'new-board',
  title: 'New Board',
  tasks: {},
  columns: {},
  columnOrder: [],
};

describe('The taskBoard reducer', () => {
  test('Load board in progress updates isLoading to true', () => {
    const loadInProgressAction = {
      type: 'LOAD_BOARD_IN_PROGRESS',
    };
    const originalState = {
      isLoading: false,
      currentData: originalBoard,
      currentBoard: originalBoard.name,
      allBoards: [{ name: originalBoard.name, title: originalBoard.title }],
    };

    const expected = {
      isLoading: true,
      currentData: originalBoard,
      currentBoard: originalBoard.name,
      allBoards: [{ name: originalBoard.name, title: originalBoard.title }],
    };

    const actual = taskBoard(originalState, loadInProgressAction);

    expect(actual).toEqual(expected);
  });

  test('Load board success sets isLoading to false and updates current board', () => {
    const loadSuccessAction = {
      type: 'LOAD_BOARD_SUCCESS',
      payload: newBoard,
    };
    const originalState = {
      isLoading: true,
      currentData: originalBoard,
      currentBoard: originalBoard.name,
      allBoards: [
        { name: originalBoard.name, title: originalBoard.title },
        { name: newBoard.name, title: newBoard.title },
      ],
    };

    const expected = {
      isLoading: false,
      currentData: newBoard,
      currentBoard: newBoard.name,
      allBoards: [
        { name: originalBoard.name, title: originalBoard.title },
        { name: newBoard.name, title: newBoard.title },
      ],
    };

    const actual = taskBoard(originalState, loadSuccessAction);

    expect(actual).toEqual(expected);
  });

  test('Load board failure updates isLoading to false', () => {
    const loadFailureAction = {
      type: 'LOAD_BOARD_FAILURE',
    };

    const originalState = {
      isLoading: true,
      currentData: {},
      currentBoard: "",
      allBoards: [],
    };

    const expected = {
      isLoading: false,
      currentData: {},
      currentBoard: "",
      allBoards: [],
    };

    const actual = taskBoard(originalState, loadFailureAction);

    expect(actual).toEqual(expected);
  });

  test('Updates currentBoard and allBoards with updated board details', () => {
    const updateBoardAction = {
      type: 'UPDATE_CURRENT_BOARD',
      payload: updatedBoard,
    };

    const originalState = {
      isLoading: false,
      currentData: originalBoard,
      currentBoard: originalBoard.name,
      allBoards: [
        { name: originalBoard.name, title: originalBoard.title },
        { name: newBoard.name, title: newBoard.title },
      ],
    };

    const expected = {
      isLoading: false,
      currentData: updatedBoard,
      currentBoard: updatedBoard.name,
      allBoards: [
        { name: updatedBoard.name, title: updatedBoard.title },
        { name: newBoard.name, title: newBoard.title },
      ],
    };

    const actual = taskBoard(originalState, updateBoardAction);

    expect(actual).toEqual(expected);
  });

  test('Adds new board details to allBoards and sets new board as currentBoard', () => {
    const addBoardAction = {
      type: 'ADD_NEW_BOARD',
      payload: newBoard,
    };
    const originalState = {
      isLoading: false,
      currentData: originalBoard,
      currentBoard: originalBoard.name,
      allBoards: [{ name: originalBoard.name, title: originalBoard.title }],
    };

    const expected = {
      isLoading: false,
      currentData: newBoard,
      currentBoard: newBoard.name,
      allBoards: [
        { name: originalBoard.name, title: originalBoard.title },
        { name: newBoard.name, title: newBoard.title },
      ],
    };

    const actual = taskBoard(originalState, addBoardAction);

    expect(actual).toEqual(expected);
  });
  test('Deletes current board and set the first board in the allBoards array as the current one', () => {
    const deleteBoardAction = {
      type: 'DELETE_BOARD',
      payload: originalBoard,
    };
    const originalState = {
      isLoading: false,
      currentData: originalBoard,
      currentBoard: originalBoard.name,
      allBoards: [
        { name: originalBoard.name, title: originalBoard.title },
        { name: newBoard.name, title: newBoard.title },
      ],
    };
    const expected = {
      isLoading: false,
      currentData: {},
      currentBoard: newBoard.name,
      allBoards: [
        { name: newBoard.name, title: newBoard.title },
      ],
    };

    const actual = taskBoard(originalState, deleteBoardAction);

    expect(actual).toEqual(expected);
  });
  test('Deletes the last board and resets state to empty', () => {
    const deleteBoardAction = {
      type: 'DELETE_BOARD',
      payload: originalBoard,
    };
    const originalState = {
      isLoading: false,
      currentData: originalBoard,
      currentBoard: originalBoard.name,
      allBoards: [{ name: originalBoard.name, title: originalBoard.title }],
    };
    const expected = {
      isLoading: false,
      currentData: {},
      currentBoard: "",
      allBoards: [],
    };
    const actual = taskBoard(originalState, deleteBoardAction);

    expect(actual).toEqual(expected);
  });
});
