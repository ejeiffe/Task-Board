import React from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import {
  moveTask,
  moveColumn,
  createTask,
  createColumn,
} from '../redux/actions';
import Column from './Column';
import NewItemForm from './NewItemForm';

const BoardContainer = styled.div`
  display: flex;
`;

const ColumnsContainer = styled.div`
  display: flex;
  background-color: lightgrey;
`;

const Board = ({
  data,
  handleTaskMove,
  handleColumnMove,
  saveNewTask,
  saveNewColumn,
}) => {
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    if (
      result.destination.droppableId === result.source.droppableId &&
      result.destination.index === result.source.index
    ) {
      return;
    }

    if (result.type === 'task') {
      handleTaskMove(result);
    }
    if (result.type === 'column') {
      handleColumnMove(result);
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <BoardContainer>
        <Droppable droppableId="board" direction="horizontal" type="column">
          {(provided) => (
            <ColumnsContainer
              ref={provided.innerRef}
              {...provided.droppableProps}
              data={data}
            >
              {data.columnOrder.map((columnId, index) => {
                const column = data.columns[columnId];
                const tasks = column.taskIds.map(
                  (taskId) => data.tasks[taskId]
                );

                return (
                  <Column
                    key={column.id}
                    column={column}
                    index={index}
                    tasks={tasks}
                    saveNewTask={saveNewTask}
                  />
                );
              })}
              {provided.placeholder}
            </ColumnsContainer>
          )}
        </Droppable>
        <NewItemForm
          formType="column"
          parent="board"
          onSavePressed={saveNewColumn}
        />
      </BoardContainer>
    </DragDropContext>
  );
};

const mapStateToProps = (state) => ({
  data: state.taskBoard,
});

const mapDispatchToProps = (dispatch) => ({
  handleTaskMove: (result) => dispatch(moveTask(result)),
  handleColumnMove: (result) => dispatch(moveColumn(result)),
  saveNewTask: (text, parent) => dispatch(createTask(text, parent)),
  saveNewColumn: (text) => dispatch(createColumn(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
