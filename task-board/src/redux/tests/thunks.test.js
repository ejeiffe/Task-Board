import 'node-fetch';
import fetchMock from 'fetch-mock';
import sinon from 'sinon';
import {
  createBoardRequest,
  createColumnRequest,
  createTaskRequest,
  deleteBoardRequest,
  deleteColumnRequest,
  deleteTaskRequest,
  loadCurrentBoard,
  moveColumnRequest,
  moveTaskRequest,
  updateBoardRequest,
  updateColumnRequest,
  updateTaskRequest,
} from '../thunks';

const currentBoard = {
  name: 'current-board',
  title: 'Current Board',
  tasks: {},
  columns: {},
  columnOrder: [],
};
const updatedBoard = {
  name: 'updated-board',
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

describe('The loadCurrentBoard thunk', () => {
  test('Dispatches the correct actions in the success scenario', async () => {
    const fakeDispatch = sinon.spy();
    fetchMock.get(
      'http://localhost:8000/api/boards/current-board',
      currentBoard
    );
    const expectedFirstAction = {
      type: 'LOAD_BOARD_IN_PROGRESS',
    };
    const expectedSecondAction = {
      type: 'LOAD_BOARD_SUCCESS',
      payload: currentBoard,
    };
    await loadCurrentBoard('current-board')(fakeDispatch);
    expect(fakeDispatch.getCall(0).args[0]).toEqual(expectedFirstAction);
    expect(fakeDispatch.getCall(1).args[0]).toEqual(expectedSecondAction);
    fetchMock.reset();
  });
  test('Dispatches the correct actions in the failure scenario', async () => {
    const fakeDispatch = sinon.spy();
    fetchMock.get('http://localhost:8000/api/boards/current-board', {
      throws: new Error('fetch failed'),
    });
    const expectedFirstAction = {
      type: 'LOAD_BOARD_IN_PROGRESS',
    };
    const expectedSecondAction = {
      type: 'LOAD_BOARD_FAILURE',
    };
    await loadCurrentBoard('current-board')(fakeDispatch);
    expect(fakeDispatch.getCall(0).args[0]).toEqual(expectedFirstAction);
    expect(fakeDispatch.getCall(1).args[0]).toEqual(expectedSecondAction);
  });
});

describe('The createBoardRequest thunk', () => {
  test('Dispatches the addNewBoard action', async () => {
    const fakeDispatch = sinon.spy();
    const body = { text: 'New Board' };
    fetchMock.post('http://localhost:8000/api/boards', newBoard, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: body,
    });
    const expectedAction = {
      type: 'ADD_NEW_BOARD',
      payload: newBoard,
    };
    await createBoardRequest('New Board')(fakeDispatch);
    expect(fakeDispatch.getCall(0).args[0]).toEqual(expectedAction);
    fetchMock.reset();
  });
});

describe('The createColumnRequest thunk', () => {
  test('Dispatches the updateCurrentBoard action', async () => {
    const fakeDispatch = sinon.spy();
    const body = { text: 'New Column' };
    fetchMock.post(
      'http://localhost:8000/api/boards/current-board/columns',
      currentBoard,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body,
      }
    );
    const expectedAction = {
      type: 'UPDATE_CURRENT_BOARD',
      payload: currentBoard,
    };
    await createColumnRequest('current-board', 'New Column')(fakeDispatch);
    expect(fakeDispatch.getCall(0).args[0]).toEqual(expectedAction);
    fetchMock.reset();
  });
});

describe('The createTaskRequest thunk', () => {
  test('Dispatches the updateCurrentBoard action', async () => {
    const fakeDispatch = sinon.spy();
    const body = { text: 'New Task', parent: 'column-id' };
    fetchMock.post(
      'http://localhost:8000/api/boards/current-board/tasks',
      currentBoard,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body,
      }
    );
    const expectedAction = {
      type: 'UPDATE_CURRENT_BOARD',
      payload: currentBoard,
    };
    await createTaskRequest(
      'current-board',
      'New Task',
      'column-id'
    )(fakeDispatch);
    expect(fakeDispatch.getCall(0).args[0]).toEqual(expectedAction);
    fetchMock.reset();
  });
});

describe('The updateBoardRequest thunk', () => {
  test('Dispatches the updateCurrentBoard action', async () => {
    const fakeDispatch = sinon.spy();
    const body = { text: 'Updated Board' };
    fetchMock.put(
      'http://localhost:8000/api/boards/current-board',
      updatedBoard,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body,
      }
    );
    const expectedAction = {
      type: 'UPDATE_CURRENT_BOARD',
      payload: updatedBoard,
    };
    await updateBoardRequest('current-board', 'Updated Board')(fakeDispatch);
    expect(fakeDispatch.getCall(0).args[0]).toEqual(expectedAction);
    fetchMock.reset();
  });
});

describe('The updateColumnRequest thunk', () => {
  test('Dispatches the updateCurrentBoard action', async () => {
    const fakeDispatch = sinon.spy();
    const updatedColumn = { id: 'column-1', title: 'New Title' };
    const body = { updatedColumn: updatedColumn };
    fetchMock.put(
      'http://localhost:8000/api/boards/current-board/columns/column-1',
      currentBoard,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body,
      }
    );
    const expectedAction = {
      type: 'UPDATE_CURRENT_BOARD',
      payload: currentBoard,
    };
    await updateColumnRequest('current-board', updatedColumn)(fakeDispatch);
    expect(fakeDispatch.getCall(0).args[0]).toEqual(expectedAction);
    fetchMock.reset();
  });
});

describe('The updateTaskRequest thunk', () => {
  test('Dispatches the updateCurrentBoard action', async () => {
    const fakeDispatch = sinon.spy();
    const updatedTask = {
      id: 'task-1',
      title: 'New Title',
      description: 'New Description',
    };
    const body = { updatedTask: updatedTask };
    fetchMock.put(
      'http://localhost:8000/api/boards/current-board/tasks/task-1',
      currentBoard,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body,
      }
    );
    const expectedAction = {
      type: 'UPDATE_CURRENT_BOARD',
      payload: currentBoard,
    };
    await updateTaskRequest('current-board', updatedTask)(fakeDispatch);
    expect(fakeDispatch.getCall(0).args[0]).toEqual(expectedAction);
    fetchMock.reset();
  });
});

describe('The moveColumnRequest thunk', () => {
  test('Dispatches the updateCurrentBoard action', async () => {
    const fakeDispatch = sinon.spy();
    const result = {
      draggableId: 'column-1',
      source: { droppableId: 'board', index: 0 },
      destination: { droppableId: 'board', index: 1 },
    };
    const body = result;
    fetchMock.post(
      'http://localhost:8000/api/boards/current-board/move-column',
      currentBoard,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body,
      }
    );
    const expectedAction = {
      type: 'UPDATE_CURRENT_BOARD',
      payload: currentBoard,
    };
    await moveColumnRequest('current-board', result)(fakeDispatch);
    expect(fakeDispatch.getCall(0).args[0]).toEqual(expectedAction);
    fetchMock.reset();
  });
});

describe('The moveTaskRequest thunk', () => {
  test('Dispatches the updateCurrentBoard action', async () => {
    const fakeDispatch = sinon.spy();
    const result = {
      draggableId: 'task-1',
      source: { droppableId: 'column-1', index: 0 },
      destination: { droppableId: 'column-2', index: 1 },
    };
    const body = result;
    fetchMock.post(
      'http://localhost:8000/api/boards/current-board/move-task',
      currentBoard,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body,
      }
    );
    const expectedAction = {
      type: 'UPDATE_CURRENT_BOARD',
      payload: currentBoard,
    };
    await moveTaskRequest('current-board', result)(fakeDispatch);
    expect(fakeDispatch.getCall(0).args[0]).toEqual(expectedAction);
    fetchMock.reset();
  });
});

describe('The deleteBoard thunk', () => {
  test('Dispatches the deleteBoard action', async () => {
    const fakeDispatch = sinon.spy();
    fetchMock.delete(
      'http://localhost:8000/api/boards/current-board',
      currentBoard
    );
    const expectedAction = {
      type: 'DELETE_BOARD',
      payload: currentBoard,
    };
    await deleteBoardRequest('current-board', null)(fakeDispatch);
    expect(fakeDispatch.getCall(0).args[0]).toEqual(expectedAction);
  });
});

describe('The deleteColumn thunk', () => {
  test('Dispatches the updateCurrentBoard action', async () => {
    const fakeDispatch = sinon.spy();
    fetchMock.delete(
      'http://localhost:8000/api/boards/current-board/columns/column-id',
      currentBoard
    );
    const expectedAction = {
      type: 'UPDATE_CURRENT_BOARD',
      payload: currentBoard,
    };
    await deleteColumnRequest('current-board', 'column-id')(fakeDispatch);
    expect(fakeDispatch.getCall(0).args[0]).toEqual(expectedAction);
  });
});

describe('The deleteTask thunk', () => {
  test('Dispatches the updateCurrentBoard action', async () => {
    const fakeDispatch = sinon.spy();
    fetchMock.delete(
      'http://localhost:8000/api/boards/current-board/tasks/task-id',
      currentBoard
    );
    const expectedAction = {
      type: 'UPDATE_CURRENT_BOARD',
      payload: currentBoard,
    };
    await deleteTaskRequest('current-board', 'task-id')(fakeDispatch);
    expect(fakeDispatch.getCall(0).args[0]).toEqual(expectedAction);
  });
});
