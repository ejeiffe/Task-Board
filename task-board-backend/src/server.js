import express from 'express';
import { MongoClient } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(express.json());

const withDB = async (operations, res) => {
  try {
    const client = await MongoClient.connect('mongodb://localhost:27017', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db('task-board');
    await operations(db);
    client.close();
  } catch (error) {
    res.status(500).json({ message: 'Error connecting to db', error });
  }
};

app.get('/api/boards/:name', async (req, res) => {
  withDB(async (db) => {
    const boardName = req.params.name;
    const boardInfo = await db
      .collection('boards')
      .findOne({ name: boardName });
    res.status(200).json(boardInfo);
  }, res);
});

app.post('/api/boards', async (req, res) => {
  withDB(async (db) => {
    const { text } = req.body;
    if (text) {
      const name = uuidv4();
      const newBoard = {
        name: name,
        title: text,
        tasks: {},
        columns: {},
        columnOrder: [],
      };
      await db.collection('boards').insertOne(newBoard);
      res.status(200).json(newBoard);
    } else {
      res
        .status(400)
        .json({ message: 'Request body should have a text property' });
    }
  }, res);
});

app.post('/api/boards/:name/columns', async (req, res) => {
  withDB(async (db) => {
    const boardName = req.params.name;
    const { text } = req.body;
    const columnId = uuidv4();
    if (text) {
      const newColumn = {
        id: columnId,
        title: text,
        taskIds: [],
      };
      //Add new column to board.columns
      const columnsFieldName = 'columns.' + columnId;
      const updateColumns = { $set: {} };
      updateColumns['$set'][columnsFieldName] = newColumn;
      await db
        .collection('boards')
        .updateOne({ name: boardName }, updateColumns);

      //Add new column to ColumnOrder array
      const updateColumnOrder = { $push: { columnOrder: columnId } };

      await db
        .collection('boards')
        .updateOne({ name: boardName }, updateColumnOrder);

      //Return updated board
      const updatedBoard = await db
        .collection('boards')
        .findOne({ name: boardName });
      res.status(200).json(updatedBoard);
    } else {
      res
        .status(400)
        .json({ message: 'Request body should have a text property' });
    }
  }, res);
});

app.post('/api/boards/:name/tasks', async (req, res) => {
  withDB(async (db) => {
    const boardName = req.params.name;
    const { text, parent } = req.body;
    const taskId = uuidv4();
    if (text && parent) {
      const newTask = {
        id: taskId,
        title: text,
        description: '',
      };
      //Add task to board.tasks
      const tasksFieldName = 'tasks.' + taskId;
      const updateTasks = { $set: {} };
      updateTasks['$set'][tasksFieldName] = newTask;
      await db.collection('boards').updateOne({ name: boardName }, updateTasks);

      //Add taskId to parent column
      const columnFieldName = 'columns.' + parent + '.taskIds';
      const updateColumn = { $push: {} };
      updateColumn['$push'][columnFieldName] = taskId;
      await db
        .collection('boards')
        .updateOne({ name: boardName }, updateColumn);

      //Return updated board
      const updatedBoard = await db
        .collection('boards')
        .findOne({ name: boardName });
      res.status(200).json(updatedBoard);
    } else {
      res.status(400).json({
        message:
          'Request body should have a text property and a parent property',
      });
    }
  }, res);
});

app.put('/api/boards/:name', (req, res) => {
  withDB(async (db) => {
    const boardName = req.params.name;
    const { text } = req.body;
    if (text) {
      const boardInfo = await db
        .collection('boards')
        .findOne({ name: boardName });
      const newBoard = {
        ...boardInfo,
        title: text,
      };
      await db.collection('boards').replaceOne({ name: boardName }, newBoard);

      //Return updated board
      const updatedBoard = await db
        .collection('boards')
        .findOne({ name: boardName });
      res.status(200).json(updatedBoard);
    } else {
      res.status(400).json({
        message: 'Request body should have an updatedBoard property',
      });
    }
  }, res);
});

app.put('/api/boards/:name/columns/:id', (req, res) => {
  withDB(async (db) => {
    const boardName = req.params.name;
    const columnId = req.params.id;
    const { updatedColumn } = req.body;
    if (updatedColumn) {
      //Update column
      const columnsFieldName = 'columns.' + columnId;
      const updateColumn = { $set: {} };
      updateColumn['$set'][columnsFieldName] = updatedColumn;
      await db
        .collection('boards')
        .updateOne({ name: boardName }, updateColumn);

      //Return updated board
      const updatedBoard = await db
        .collection('boards')
        .findOne({ name: boardName });
      res.status(200).json(updatedBoard);
    } else {
      res.status(400).json({
        message: 'Request body should have an updatedColumn property',
      });
    }
  }, res);
});

app.put('/api/boards/:name/tasks/:id', (req, res) => {
  withDB(async (db) => {
    const boardName = req.params.name;
    const taskId = req.params.id;
    const { updatedTask } = req.body;

    if (updatedTask) {
      //Update task
      const tasksFieldName = 'tasks.' + taskId;
      const updateTask = { $set: {} };
      updateTask['$set'][tasksFieldName] = updatedTask;
      await db.collection('boards').updateOne({ name: boardName }, updateTask);

      //Return updated board
      const updatedBoard = await db
        .collection('boards')
        .findOne({ name: boardName });
      res.status(200).json(updatedBoard);
    } else {
      res.status(400).json({
        message: 'Request body should have an updatedTask property',
      });
    }
  }, res);
});

app.post('/api/boards/:name/move-task', (req, res) => {
  withDB(async (db) => {
    const boardName = req.params.name;
    const { draggableId, source, destination } = req.body;
    if (draggableId && source && destination) {
      const startColumnId = source.droppableId;
      const finishColumnId = destination.droppableId;
      const boardInfo = await db
        .collection('boards')
        .findOne({ name: boardName });

      if (startColumnId === finishColumnId) {
        //Task moved within source column
        const newTaskIds = Array.from(
          boardInfo['columns'][startColumnId]['taskIds']
        );
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const columnFieldName = 'columns.' + startColumnId + '.taskIds';
        const updateColumn = { $set: {} };
        updateColumn['$set'][columnFieldName] = newTaskIds;

        await db
          .collection('boards')
          .updateOne({ name: boardName }, updateColumn);
      } else {
        //Update start column
        const newStartTaskIds = Array.from(
          boardInfo['columns'][startColumnId]['taskIds']
        );
        newStartTaskIds.splice(source.index, 1);

        const startFieldName = 'columns.' + startColumnId + '.taskIds';
        const updateStart = { $set: {} };
        updateStart['$set'][startFieldName] = newStartTaskIds;

        await db
          .collection('boards')
          .updateOne({ name: boardName }, updateStart);
        //Update finish column
        const newFinishTaskIds = Array.from(
          boardInfo['columns'][finishColumnId]['taskIds']
        );
        newFinishTaskIds.splice(destination.index, 0, draggableId);

        const finishFieldName = 'columns.' + finishColumnId + '.taskIds';
        const updateFinish = { $set: {} };
        updateFinish['$set'][finishFieldName] = newFinishTaskIds;

        await db
          .collection('boards')
          .updateOne({ name: boardName }, updateFinish);
      }
      //Return updated board
      const updatedBoard = await db
        .collection('boards')
        .findOne({ name: boardName });
      res.status(200).json(updatedBoard);
    } else {
      res.status(400).json({
        message:
          'Request body should have draggableId, source, and destination properties',
      });
    }
  }, res);
});

app.post('/api/boards/:name/move-column', (req, res) => {
  withDB(async (db) => {
    const boardName = req.params.name;
    const { draggableId, source, destination } = req.body;
    if (draggableId && source && destination) {
      const boardInfo = await db
        .collection('boards')
        .findOne({ name: boardName });
      const newColumnOrder = Array.from(boardInfo['columnOrder']);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const updateColumnOrder = { $set: { columnOrder: newColumnOrder } };
      await db
        .collection('boards')
        .updateOne({ name: boardName }, updateColumnOrder);

      //Return updated board
      const updatedBoard = await db
        .collection('boards')
        .findOne({ name: boardName });
      res.status(200).json(updatedBoard);
    } else {
      res.status(400).json({
        message:
          'Request body should have draggableId, source, and destination properties',
      });
    }
  }, res);
});

app.delete('/api/boards/:name', (req, res) => {
  withDB(async (db) => {
    const boardName = req.params.name;
    const deletedBoard = await db
      .collection('boards')
      .findOne({ name: boardName });
    await db.collection('boards').deleteOne({ name: boardName });
    res.status(200).json(deletedBoard);
  }, res);
});

app.delete('/api/boards/:name/tasks/:id', (req, res) => {
  withDB(async (db) => {
    const boardName = req.params.name;
    const taskId = req.params.id;
    const { parent } = req.body;

    if (parent) {
      //Remove task from board.tasks
      const tasksFieldName = 'tasks.' + taskId;
      const updateTasks = { $unset: {} };
      updateTasks['$unset'][tasksFieldName] = '';
      await db.collection('boards').updateOne({ name: boardName }, updateTasks);

      //Remove taskId from parent column taskIds
      const columnFieldName = 'columns.' + parent + '.taskIds';
      const updateColumn = { $pull: {} };
      updateColumn['$pull'][columnFieldName] = taskId;
      await db
        .collection('boards')
        .updateOne({ name: boardName }, updateColumn);

      //Return updated board
      const updatedBoard = await db
        .collection('boards')
        .findOne({ name: boardName });
      res.status(200).json(updatedBoard);
    } else {
      res.status(400).json({
        message: 'Request body should have a parent property',
      });
    }
  }, res);
});

app.delete('/api/boards/:name/columns/:id', (req, res) => {
  withDB(async (db) => {
    const boardName = req.params.name;
    const columnId = req.params.id;

    //Remove column's tasks from board.tasks
    const boardInfo = await db
      .collection('boards')
      .findOne({ name: boardName });
    const taskIds = Array.from(boardInfo['columns'][columnId]['taskIds']);
    taskIds.forEach(async (taskId) => {
      const tasksFieldName = 'tasks.' + taskId;
      const updateTasks = { $unset: {} };
      updateTasks['$unset'][tasksFieldName] = '';
      await db.collection('boards').updateOne({ name: boardName }, updateTasks);
    });

    //Remove column from board
    const columnsFieldName = 'columns.' + columnId;
    const updateColumns = { $unset: {} };
    updateColumns['$unset'][columnsFieldName] = '';
    await db.collection('boards').updateOne({ name: boardName }, updateColumns);

    //Remove column from baord.columnOrder
    const updateColumnOrder = { $pull: { columnOrder: columnId } };
    await db
      .collection('boards')
      .updateOne({ name: boardName }, updateColumnOrder);

    //Return updated board
    const updatedBoard = await db
      .collection('boards')
      .findOne({ name: boardName });
    res.status(200).json(updatedBoard);
  }, res);
});

app.listen(8000, () => console.log('Listening on port 8000'));
