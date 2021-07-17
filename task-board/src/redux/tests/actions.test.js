import {
  addNewBoard,
  deleteBoard,
  loadBoardFailure,
  loadBoardInProgress,
  loadBoardSuccess,
  updateCurrentBoard,
} from '../actions';

const board = {
  name: 'board-name',
  title: 'Board Title',
  tasks: {},
  columns: {},
  columnOrder: [],
};

describe('Testing action creators', () => {
  test('loadBoardInProgress', () => {
    const expected = {
      type: 'LOAD_BOARD_IN_PROGRESS',
    };
    const actual = loadBoardInProgress();

    expect(actual).toEqual(expected);
  });
  test('loadBoardSuccess', () => {
    const expected = {
      type: 'LOAD_BOARD_SUCCESS',
      payload: board,
    };
    const actual = loadBoardSuccess(board);

    expect(actual).toEqual(expected);
  });
  test('loadBoardFailure', () => {
    const expected = {
      type: 'LOAD_BOARD_FAILURE',
    };
    const actual = loadBoardFailure();

    expect(actual).toEqual(expected);
  });
  test('updateCurrentBoard', () => {
    const expected = {
      type: 'UPDATE_CURRENT_BOARD',
      payload: board,
    };
    const actual = updateCurrentBoard(board);

    expect(actual).toEqual(expected);
  });
  test('addNewBoard', () => {
    const expected = {
      type: 'ADD_NEW_BOARD',
      payload: board,
    };
    const actual = addNewBoard(board);

    expect(actual).toEqual(expected);
  });
  test('deleteBoard', () => {
    const expected = {
      type: 'DELETE_BOARD',
      payload: board,
    };
    const actual = deleteBoard(board);

    expect(actual).toEqual(expected);
  });
});
