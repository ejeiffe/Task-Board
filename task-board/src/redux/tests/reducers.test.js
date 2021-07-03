import { DELETE_COLUMN, DELETE_TASK } from '../actions';
import { taskBoard } from '../reducers';

describe('The taskBoard reducer', () => {
  it('Creates a new task in an empty parent column', () => {
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
      tasks: { 'task-1': { id: 'task-1', title: 'New task', description: '' } },
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

  it('Creates a new task at the bottom of a parent column', () => {
    const newTaskAction = {
      type: 'CREATE_TASK',
      payload: {
        text: 'New task',
        parent: 'column-1',
      },
    };
    const originalState = {
      tasks: {
        'task-1': {
          id: 'task-1',
          title: 'test task 1',
          description: 'first task',
        },
        'task-2': {
          id: 'task-2',
          title: 'test task 2',
          description: 'second task',
        },
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
        'task-1': {
          id: 'task-1',
          title: 'test task 1',
          description: 'first task',
        },
        'task-2': {
          id: 'task-2',
          title: 'test task 2',
          description: 'second task',
        },
        'task-3': { id: 'task-3', title: 'New task', description: '' },
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

  it('Creates a new column in an empty board', () => {
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

  it('Creates a new column on the right side of the board', () => {
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
        'task-1': {
          id: 'task-1',
          title: 'test task 1',
          description: 'first task',
        },
        'task-2': {
          id: 'task-2',
          title: 'test task 2',
          description: 'second task',
        },
        'task-3': {
          id: 'task-3',
          title: 'test task 3',
          description: 'third task',
        },
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
        'task-1': {
          id: 'task-1',
          title: 'test task 1',
          description: 'first task',
        },
        'task-2': {
          id: 'task-2',
          title: 'test task 2',
          description: 'second task',
        },
        'task-3': {
          id: 'task-3',
          title: 'test task 3',
          description: 'third task',
        },
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
        'task-1': {
          id: 'task-1',
          title: 'test task 1',
          description: 'first task',
        },
        'task-2': {
          id: 'task-2',
          title: 'test task 2',
          description: 'second task',
        },
        'task-3': {
          id: 'task-3',
          title: 'test task 3',
          description: 'third task',
        },
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
        'task-1': {
          id: 'task-1',
          title: 'test task 1',
          description: 'first task',
        },
        'task-2': {
          id: 'task-2',
          title: 'test task 2',
          description: 'second task',
        },
        'task-3': {
          id: 'task-3',
          title: 'test task 3',
          description: 'third task',
        },
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
  it('Updates the column title when a new one is entered', () => {
    const changeColumnTitleAction = {
      type: 'CHANGE_COLUMN_TITLE',
      payload: {
        text: 'New Column Title',
        columnId: 'column-1',
      },
    };

    const originalState = {
      tasks: {},
      columns: {
        'column-1': { id: 'column-1', title: 'Column Title', taskIds: [] },
      },
      columnOrder: ['column-1'],
    };

    const expected = {
      tasks: {},
      columns: {
        'column-1': { id: 'column-1', title: 'New Column Title', taskIds: [] },
      },
      columnOrder: ['column-1'],
    };

    const actual = taskBoard(originalState, changeColumnTitleAction);

    expect(actual).toEqual(expected);
  });
  it('Updates the task title when a new one is entered', () => {
    const changeTaskTitleAction = {
      type: 'CHANGE_TASK_TITLE',
      payload: {
        text: 'New Task Title',
        taskId: 'task-1',
      },
    };

    const originalState = {
      tasks: {
        'task-1': { id: 'task-1', title: 'Task Title', description: 'a task' },
      },
      columns: {
        'column-1': {
          id: 'column-1',
          title: 'Column Title',
          taskIds: ['task-1'],
        },
      },
      columnOrder: ['column-1'],
    };

    const expected = {
      tasks: {
        'task-1': {
          id: 'task-1',
          title: 'New Task Title',
          description: 'a task',
        },
      },
      columns: {
        'column-1': {
          id: 'column-1',
          title: 'Column Title',
          taskIds: ['task-1'],
        },
      },
      columnOrder: ['column-1'],
    };

    const actual = taskBoard(originalState, changeTaskTitleAction);

    expect(actual).toEqual(expected);
  });
  it('Updates the task description when a new one is entered', () => {
    const changeTaskDescriptionAction = {
      type: 'CHANGE_TASK_DESCRIPTION',
      payload: {
        text: 'New description',
        taskId: 'task-1',
      },
    };

    const originalState = {
      tasks: {
        'task-1': { id: 'task-1', title: 'Task Title', description: 'a task' },
      },
      columns: {
        'column-1': {
          id: 'column-1',
          title: 'Column Title',
          taskIds: ['task-1'],
        },
      },
      columnOrder: ['column-1'],
    };

    const expected = {
      tasks: {
        'task-1': {
          id: 'task-1',
          title: 'Task Title',
          description: 'New description',
        },
      },
      columns: {
        'column-1': {
          id: 'column-1',
          title: 'Column Title',
          taskIds: ['task-1'],
        },
      },
      columnOrder: ['column-1'],
    };

    const actual = taskBoard(originalState, changeTaskDescriptionAction);

    expect(actual).toEqual(expected);
  });
  it('Deletes the selected task', () => {
    const deleteTaskAction = {
      type: DELETE_TASK,
      payload: {
        taskId: 'task-1',
        columnId: 'column-1',
      },
    };
    const originalState = {
      tasks: {
        'task-1': { id: 'task-1', title: 'Task 1', description: 'first task' },
        'task-2': { id: 'task-2', title: 'Task 2', description: 'second task' },
      },
      columns: {
        'column-1': {
          id: 'column-1',
          title: 'Column 1',
          taskIds: ['task-1', 'task-2'],
        },
      },
      columnOrder: ['column-1'],
    };
    const expected = {
      tasks: {
        'task-2': { id: 'task-2', title: 'Task 2', description: 'second task' },
      },
      columns: {
        'column-1': {
          id: 'column-1',
          title: 'Column 1',
          taskIds: ['task-2'],
        },
      },
      columnOrder: ['column-1'],
    };
    const actual = taskBoard(originalState, deleteTaskAction);

    expect(actual).toEqual(expected);
  });
  it('Deletes the selected empty column', () => {
    const deleteColumnAction = {
      type: DELETE_COLUMN,
      payload: {
        columnId: 'column-1',
      },
    };
    const originalState = {
      tasks: {},
      columns: {
        'column-1': { id: 'column-1', title: 'Column 1', taskIds: [] },
        'column-2': { id: 'column-2', title: 'Column 2', taskIds: [] },
      },
      columnOrder: ['column-1', 'column-2'],
    };
    const expected = {
      tasks: {},
      columns: {
        'column-2': { id: 'column-2', title: 'Column 2', taskIds: [] },
      },
      columnOrder: ['column-2'],
    };
    const actual = taskBoard(originalState, deleteColumnAction);

    expect(actual).toEqual(expected);
  });
  it('Deletes the selected column and all its tasks', () => {
    const deleteColumnAction = {
      type: DELETE_COLUMN,
      payload: {
        columnId: 'column-1',
      },
    };
    const originalState = {
      tasks: {
        'task-1': { id: 'task-1', title: 'Task 1', description: 'first task' },
        'task-2': { id: 'task-2', title: 'Task 2', description: 'second task' },
      },
      columns: {
        'column-1': {
          id: 'column-1',
          title: 'Column 1',
          taskIds: ['task-1', 'task-2'],
        },
        'column-2': { id: 'column-2', title: 'Column 2', taskIds: [] },
      },
      columnOrder: ['column-1', 'column-2'],
    };
    const expected = {
      tasks: {},
      columns: {
        'column-2': { id: 'column-2', title: 'Column 2', taskIds: [] },
      },
      columnOrder: ['column-2'],
    };
    const actual = taskBoard(originalState, deleteColumnAction);

    expect(actual).toEqual(expected);
  });
});
