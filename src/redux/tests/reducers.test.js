import { taskBoard } from '../reducers';

describe('The taskBoard reducer', () => {
  it('Creates a new task in an empty parent column when the new task Save button is clicked', () => {
    const newTaskAction = {
      type: 'CREATE_TASK',
      payload: {
        text: 'New task',
        parent: 'column-1',
      },
    };
    const originalState = {
      tasks: {},
      columns: {
        'column-1': {
          id: 'column-1',
          title: 'Test Column',
          taskIds: [],
        },
      },
      columnOrder: ['column-1'],
    };

    const expected = {
      tasks: { 'task-1': { id: 'task-1', content: 'New task' } },
      columns: {
        'column-1': {
          id: 'column-1',
          title: 'Test Column',
          taskIds: ['task-1'],
        },
      },
      columnOrder: ['column-1'],
    };

    const actual = taskBoard(originalState, newTaskAction);

    expect(actual).toEqual(expected);
  });

  it('Creates a new task at the bottom of a parent column when the new task Save button is clicked', () => {
    const newTaskAction = {
      type: 'CREATE_TASK',
      payload: {
        text: 'New task',
        parent: 'column-1',
      },
    };
    const originalState = {
      tasks: {
        'task-1': { id: 'task-1', content: 'test task 1' },
        'task-2': { id: 'task-2', content: 'test task 2' },
      },
      columns: {
        'column-1': {
          id: 'column-1',
          title: 'Test Column',
          taskIds: ['task-1', 'task-2'],
        },
      },
      columnOrder: ['column-1'],
    };

    const expected = {
      tasks: {
        'task-1': { id: 'task-1', content: 'test task 1' },
        'task-2': { id: 'task-2', content: 'test task 2' },
        'task-3': { id: 'task-3', content: 'New task' },
      },
      columns: {
        'column-1': {
          id: 'column-1',
          title: 'Test Column',
          taskIds: ['task-1', 'task-2', 'task-3'],
        },
      },
      columnOrder: ['column-1'],
    };

    const actual = taskBoard(originalState, newTaskAction);

    expect(actual).toEqual(expected);
  });

  it('Creates a new column in an empty board when the new column Save button is clicked', () => {
    const newColumnAction = {
      type: 'CREATE_COLUMN',
      payload: {
        text: 'New Column',
      },
    };

    const originalState = {
      tasks: {},
      columns: {},
      columnOrder: [],
    };

    const expected = {
      tasks: {},
      columns: {
        'column-1': {
          id: 'column-1',
          title: 'New Column',
          taskIds: [],
        },
      },
      columnOrder: ['column-1'],
    };

    const actual = taskBoard(originalState, newColumnAction);

    expect(actual).toEqual(expected);
  });

  it('Creates a new column on the right side of the board when the new column Save button is clicked', () => {
    const newColumnAction = {
      type: 'CREATE_COLUMN',
      payload: {
        text: 'New Column',
      },
    };

    const originalState = {
      tasks: {},
      columns: {
        'column-1': {
          id: 'column-1',
          title: 'Test Column 1',
          taskIds: [],
        },
        'column-2': {
          id: 'column-2',
          title: 'Test Column 2',
          taskIds: [],
        },
      },
      columnOrder: ['column-1', 'column-2'],
    };

    const expected = {
      tasks: {},
      columns: {
        'column-1': {
          id: 'column-1',
          title: 'Test Column 1',
          taskIds: [],
        },
        'column-2': {
          id: 'column-2',
          title: 'Test Column 2',
          taskIds: [],
        },
        'column-3': {
          id: 'column-3',
          title: 'New Column',
          taskIds: [],
        },
      },
      columnOrder: ['column-1', 'column-2', 'column-3'],
    };

    const actual = taskBoard(originalState, newColumnAction);

    expect(actual).toEqual(expected);
  });

  it('Updates the board when a task is dragged to a new position in the same column', () => {
    const moveTaskAction = {
      type: 'MOVE_TASK',
      payload: {
        draggableId: 'task-3',
        source: {
          droppableId: 'column-1',
          index: 2,
        },

        destination: {
          droppableId: 'column-1',
          index: 0,
        },
      },
    };
    const originalState = {
      tasks: {
        'task-1': { id: 'task-1', content: 'test task 1' },
        'task-2': { id: 'task-2', content: 'test task 2' },
        'task-3': { id: 'task-3', content: 'test task 3' },
      },
      columns: {
        'column-1': {
          id: 'column-1',
          title: 'Test Column',
          taskIds: ['task-1', 'task-2', 'task-3'],
        },
      },
      columnOrder: ['column-1'],
    };

    const expected = {
      tasks: {
        'task-1': { id: 'task-1', content: 'test task 1' },
        'task-2': { id: 'task-2', content: 'test task 2' },
        'task-3': { id: 'task-3', content: 'test task 3' },
      },
      columns: {
        'column-1': {
          id: 'column-1',
          title: 'Test Column',
          taskIds: ['task-3', 'task-1', 'task-2'],
        },
      },
      columnOrder: ['column-1'],
    };

    const actual = taskBoard(originalState, moveTaskAction);

    expect(actual).toEqual(expected);
  });

  it('Updates the board when a task is dragged to a new column', () => {
    const moveTaskAction = {
      type: 'MOVE_TASK',
      payload: {
        draggableId: 'task-2',
        source: {
          droppableId: 'column-1',
          index: 1,
        },

        destination: {
          droppableId: 'column-2',
          index: 0,
        },
      },
    };
    const originalState = {
      tasks: {
        'task-1': { id: 'task-1', content: 'test task 1' },
        'task-2': { id: 'task-2', content: 'test task 2' },
        'task-3': { id: 'task-3', content: 'test task 3' },
      },
      columns: {
        'column-1': {
          id: 'column-1',
          title: 'Test Column 1',
          taskIds: ['task-1', 'task-2', 'task-3'],
        },
        'column-2': {
          id: 'column-2',
          title: 'Test Column 2',
          taskIds: [],
        },
      },
      columnOrder: ['column-1', 'column-2'],
    };

    const expected = {
      tasks: {
        'task-1': { id: 'task-1', content: 'test task 1' },
        'task-2': { id: 'task-2', content: 'test task 2' },
        'task-3': { id: 'task-3', content: 'test task 3' },
      },
      columns: {
        'column-1': {
          id: 'column-1',
          title: 'Test Column 1',
          taskIds: ['task-1', 'task-3'],
        },
        'column-2': {
          id: 'column-2',
          title: 'Test Column 2',
          taskIds: ['task-2'],
        },
      },
      columnOrder: ['column-1', 'column-2'],
    };

    const actual = taskBoard(originalState, moveTaskAction);

    expect(actual).toEqual(expected);
  });

  it('Updates the board when a column is dragged to a new position', () => {
    const moveColumnAction = {
      type: 'MOVE_COLUMN',
      payload: {
        draggableId: 'column-1',
        source: {
          droppableId: 'board',
          index: 0,
        },

        destination: {
          droppableId: 'board',
          index: 1,
        },
      },
    };

    const originalState = {
      tasks: {},
      columns: {
        'column-1': {
          id: 'column-1',
          title: 'Test Column 1',
          taskIds: [],
        },
        'column-2': {
          id: 'column-2',
          title: 'Test Column 2',
          taskIds: [],
        },
        'column-3': {
          id: 'column-3',
          title: 'Test Column 3',
          taskIds: [],
        },
      },
      columnOrder: ['column-1', 'column-2', 'column-3'],
    };

    const expected = {
      tasks: {},
      columns: {
        'column-1': {
          id: 'column-1',
          title: 'Test Column 1',
          taskIds: [],
        },
        'column-2': {
          id: 'column-2',
          title: 'Test Column 2',
          taskIds: [],
        },
        'column-3': {
          id: 'column-3',
          title: 'Test Column 3',
          taskIds: [],
        },
      },
      columnOrder: ['column-2', 'column-1', 'column-3'],
    };

    const actual = taskBoard(originalState, moveColumnAction);

    expect(actual).toEqual(expected);
  });
});
