import {
  createTask,
  createColumn,
  moveTask,
  moveColumn,
  CREATE_TASK,
  CREATE_COLUMN,
  MOVE_TASK,
  MOVE_COLUMN,
} from '../actions';

describe('Testing action creators', () => {
  it('createTask', () => {
    const text = 'Test task';
    const parent = 'Parent column id';
    const expected = {
      type: CREATE_TASK,
      payload: {
        text: text,
        parent: parent,
      },
    };
    const actual = createTask(text, parent);

    expect(actual).toEqual(expected);
  });
  it('createColumn', () => {
    const text = 'Test column';
    const expected = {
      type: CREATE_COLUMN,
      payload: {
        text: text,
      },
    };
    const actual = createColumn(text);

    expect(actual).toEqual(expected);
  });
  it('moveTask', () => {
    const result = {
      draggableId: 'task-id',
      source: {
        droppableId: 'column-id-1',
        index: 0,
      },
      destination: {
        droppableId: 'column-id-2',
        index: 1,
      },
    };
    const expected = {
      type: MOVE_TASK,
      payload: result,
    };
    const actual = moveTask(result);

    expect(actual).toEqual(expected);
  });
  it('moveColumn', () => {
    const result = {
      draggableId: 'column-id',
      source: {
        droppableId: 'board',
        index: 0,
      },
      destination: {
        droppableId: 'board',
        index: 1,
      },
    };
    const expected = {
      type: MOVE_COLUMN,
      payload: result,
    };
    const actual = moveColumn(result);

    expect(actual).toEqual(expected);
  });
});
