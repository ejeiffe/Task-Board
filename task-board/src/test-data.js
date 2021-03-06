const testData = {
  tasks: {
    'task-1': {
      id: 'task-1',
      title: 'Write report',
      description: 'Summarise results of molecular modelling project',
    },
    'task-2': {
      id: 'task-2',
      title: 'Feed the cat',
      description: 'Tender Tuna Dinner',
    },
    'task-3': {
      id: 'task-3',
      title: 'Cook dinner',
      description: 'Pasta bake, ready by 7:30',
    },
    'task-4': { id: 'task-4', title: 'Wash the dishes', description: '' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In progress',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: [],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

export default testData;
