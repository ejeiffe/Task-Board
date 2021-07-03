export const CREATE_TASK = 'CREATE_TASK';
export const createTask = (text, parent) => ({
  type: CREATE_TASK,
  payload: { text: text, parent: parent },
});

export const CREATE_COLUMN = 'CREATE_COLUMN';
export const createColumn = (text) => ({
  type: CREATE_COLUMN,
  payload: { text: text },
});

export const MOVE_TASK = 'MOVE_TASK';
export const moveTask = (result) => ({
  type: MOVE_TASK,
  payload: result,
});

export const MOVE_COLUMN = 'MOVE_COLUMN';
export const moveColumn = (result) => ({
  type: MOVE_COLUMN,
  payload: result,
});

export const CHANGE_COLUMN_TITLE = 'CHANGE_COLUMN_TITLE';
export const changeColumnTitle = (text, columnId) => ({
  type: CHANGE_COLUMN_TITLE,
  payload: {
    text: text,
    columnId: columnId,
  },
});

export const CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE';
export const changeTaskTitle = (text, taskId) => ({
  type: CHANGE_TASK_TITLE,
  payload: {
    text: text,
    taskId: taskId,
  },
});

export const CHANGE_TASK_DESCRIPTION = 'CHANGE_TASK_DESCRIPTION';
export const changeTaskDescription = (text, taskId) => ({
  type: CHANGE_TASK_DESCRIPTION,
  payload: {
    text: text,
    taskId: taskId,
  },
});

export const DELETE_TASK = 'DELETE_TASK';
export const deleteTask = (taskId, columnId) => ({
  type: DELETE_TASK,
  payload: {
    taskId: taskId,
    columnId: columnId,
  },
});

export const DELETE_COLUMN = 'DELETE_COLUMN';
export const deleteColumn = (columnId) => ({
  type: DELETE_COLUMN,
  payload: {
    columnId: columnId,
  },
});
