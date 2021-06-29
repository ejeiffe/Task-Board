import {
  MOVE_TASK,
  MOVE_COLUMN,
  CREATE_TASK,
  CREATE_COLUMN,
  CHANGE_COLUMN_TITLE,
  CHANGE_TASK_TITLE,
  DELETE_TASK,
  DELETE_COLUMN,
} from './actions';
import testData from '../test-data';

export const taskBoard = (state = testData, action) => {
  switch (action.type) {
    case CREATE_TASK: {
      const { text, parent } = action.payload;
      const newTaskId =
        'task-' + (Object.keys(state.tasks).length + 1).toString();
      const newTasks = {
        ...state.tasks,
        [newTaskId]: { id: newTaskId, title: text },
      };
      const parentColumn = state.columns[parent];
      const newColumn = {
        ...parentColumn,
        taskIds: parentColumn.taskIds.concat(newTaskId),
      };
      const newState = {
        ...state,
        tasks: newTasks,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };

      return newState;
    }
    case CREATE_COLUMN: {
      const { text } = action.payload;
      const newColumnId = 'column-' + (state.columnOrder.length + 1).toString();
      const newColumn = {
        id: newColumnId,
        title: text,
        taskIds: [],
      };
      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
        columnOrder: state.columnOrder.concat(newColumnId),
      };
      return newState;
    }

    case MOVE_TASK: {
      const { destination, source, draggableId } = action.payload;
      const startColumn = state.columns[source.droppableId];
      const finishColumn = state.columns[destination.droppableId];

      if (startColumn === finishColumn) {
        const newTaskIds = Array.from(startColumn.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newColumn = {
          ...startColumn,
          taskIds: newTaskIds,
        };

        const newState = {
          ...state,
          columns: {
            ...state.columns,
            [newColumn.id]: newColumn,
          },
        };
        return newState;
      } else {
        const startTaskIds = Array.from(startColumn.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStartColumn = {
          ...startColumn,
          taskIds: startTaskIds,
        };

        const finishTaskIds = Array.from(finishColumn.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinishColumn = {
          ...finishColumn,
          taskIds: finishTaskIds,
        };
        const newState = {
          ...state,
          columns: {
            ...state.columns,
            [startColumn.id]: newStartColumn,
            [finishColumn.id]: newFinishColumn,
          },
        };
        return newState;
      }
    }
    case MOVE_COLUMN: {
      const { destination, source, draggableId } = action.payload;
      const newColumnOrder = Array.from(state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...state,
        columnOrder: newColumnOrder,
      };

      return newState;
    }
    case CHANGE_COLUMN_TITLE: {
      const { text, columnId } = action.payload;
      const column = state.columns[columnId];
      const newColumn = {
        ...column,
        title: text,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [columnId]: newColumn,
        },
      };

      return newState;
    }
    case CHANGE_TASK_TITLE: {
      const { text, taskId } = action.payload;
      const task = state.tasks[taskId];
      const newTask = {
        ...task,
        title: text,
      };

      const newState = {
        ...state,
        tasks: {
          ...state.tasks,
          [taskId]: newTask,
        },
      };

      return newState;
    }
    case DELETE_TASK: {
      const { taskId: taskToDelete, columnId } = action.payload;
      const column = state.columns[columnId];
      const newTasks = {
        ...state.tasks,
      };
      delete newTasks[taskToDelete];
      const newColumn = {
        ...column,
        taskIds: column.taskIds.filter((taskId) => taskId !== taskToDelete),
      };

      const newState = {
        ...state,
        tasks: newTasks,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };
      return newState;
    }
    case DELETE_COLUMN: {
      const { columnId: columnToDelete } = action.payload;
      const tasksToDelete = state.columns[columnToDelete].taskIds;
      const newTasks = {
        ...state.tasks,
      };
      tasksToDelete.forEach((taskId) => {
        delete newTasks[taskId];
      });

      const newColumns = {
        ...state.columns,
      };

      delete newColumns[columnToDelete];

      const newState = {
        ...state,
        tasks: newTasks,
        columns: newColumns,
        columnOrder: state.columnOrder.filter(
          (columnId) => columnId !== columnToDelete
        ),
      };

      return newState;
    }
    default:
      return state;
  }
};
