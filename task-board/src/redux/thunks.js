import {
  loadBoardInProgress,
  loadBoardSuccess,
  loadBoardFailure,
  updateCurrentBoard,
  addNewBoard,
  deleteBoard,
} from './actions';

const displayAlert = (text) => () => {
  alert(text);
};

export const loadCurrentBoard = (boardName) => async (dispatch) => {
  try {
    dispatch(loadBoardInProgress());
    const response = await fetch(
      `http://localhost:8000/api/boards/${boardName}`
    );
    const board = await response.json();
    dispatch(loadBoardSuccess(board));
  } catch (error) {
    dispatch(loadBoardFailure());
    dispatch(displayAlert(error));
  }
};

export const createBoardRequest = (text) => async (dispatch) => {
  try {
    const body = JSON.stringify({ text: text });
    const response = await fetch('http://localhost:8000/api/boards', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body,
    });
    const newBoard = await response.json();
    dispatch(addNewBoard(newBoard));
  } catch (error) {
    dispatch(displayAlert(error));
  }
};

export const createColumnRequest = (boardName, text) => async (dispatch) => {
  try {
    const body = JSON.stringify({ text: text });
    const response = await fetch(
      `http://localhost:8000/api/boards/${boardName}/columns`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body,
      }
    );
    const updatedBoard = await response.json();
    dispatch(updateCurrentBoard(updatedBoard));
  } catch (error) {
    dispatch(displayAlert(error));
  }
};

export const createTaskRequest =
  (boardName, text, parent) => async (dispatch) => {
    try {
      const body = JSON.stringify({ text: text, parent: parent });
      const response = await fetch(
        `http://localhost:8000/api/boards/${boardName}/tasks`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body,
        }
      );
      const updatedBoard = await response.json();
      dispatch(updateCurrentBoard(updatedBoard));
    } catch (error) {
      dispatch(displayAlert(error));
    }
  };

export const updateBoardRequest = (boardName, text) => async (dispatch) => {
  try {
    const body = JSON.stringify({ text: text });
    const response = await fetch(
      `http://localhost:8000/api/boards/${boardName}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body,
      }
    );
    const updatedBoard = await response.json();
    dispatch(updateCurrentBoard(updatedBoard));
  } catch (error) {
    dispatch(displayAlert(error));
  }
};

export const updateColumnRequest = (boardName, column) => async (dispatch) => {
  try {
    const body = JSON.stringify({ updatedColumn: column });
    const response = await fetch(
      `http://localhost:8000/api/boards/${boardName}/columns/${column.id}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body,
      }
    );
    const updatedBoard = await response.json();
    dispatch(updateCurrentBoard(updatedBoard));
  } catch (error) {
    dispatch(displayAlert(error));
  }
};

export const updateTaskRequest = (boardName, task) => async (dispatch) => {
  try {
    const body = JSON.stringify({ updatedTask: task });
    const response = await fetch(
      `http://localhost:8000/api/boards/${boardName}/tasks/${task.id}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body,
      }
    );
    const updatedBoard = await response.json();
    dispatch(updateCurrentBoard(updatedBoard));
  } catch (error) {
    dispatch(displayAlert(error));
  }
};

export const moveColumnRequest = (boardName, result) => async (dispatch) => {
  try {
    const body = JSON.stringify(result);
    const response = await fetch(
      `http://localhost:8000/api/boards/${boardName}/move-column`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body,
      }
    );
    const updatedBoard = await response.json();
    dispatch(updateCurrentBoard(updatedBoard));
  } catch (error) {
    dispatch(displayAlert(error));
  }
};

export const moveTaskRequest = (boardName, result) => async (dispatch) => {
  try {
    const body = JSON.stringify(result);
    const response = await fetch(
      `http://localhost:8000/api/boards/${boardName}/move-task`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body,
      }
    );
    const updatedBoard = await response.json();
    dispatch(updateCurrentBoard(updatedBoard));
  } catch (error) {
    dispatch(displayAlert(error));
  }
};

export const deleteBoardRequest = (boardName) => async (dispatch) => {
  try {
    const response = await fetch(
      `http://localhost:8000/api/boards/${boardName}`,
      {
        method: 'DELETE',
      }
    );
    const boardToDelete = await response.json();
    dispatch(deleteBoard(boardToDelete));
  } catch (error) {
    dispatch(displayAlert(error));
  }
};

export const deleteColumnRequest =
  (boardName, columnId) => async (dispatch) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/boards/${boardName}/columns/${columnId}`,
        {
          method: 'DELETE',
        }
      );
      const updatedBoard = await response.json();
      dispatch(updateCurrentBoard(updatedBoard));
    } catch (error) {
      dispatch(displayAlert(error));
    }
  };

export const deleteTaskRequest = (boardName, taskId) => async (dispatch) => {
  try {
    const response = await fetch(
      `http://localhost:8000/api/boards/${boardName}/tasks/${taskId}`,
      {
        method: 'DELETE',
      }
    );
    const updatedBoard = await response.json();
    dispatch(updateCurrentBoard(updatedBoard));
  } catch (error) {
    dispatch(displayAlert(error));
  }
};
