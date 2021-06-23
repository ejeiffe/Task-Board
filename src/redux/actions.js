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
