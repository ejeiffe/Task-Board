import React, { memo } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { getData } from '../redux/selectors';
import Column from './Column';
import NewItemForm from './NewItemForm';
import { moveColumnRequest, moveTaskRequest } from '../redux/thunks';

const BoardContainer = styled.div`
  display: flex;
`;

const ColumnsContainer = styled.div`
  display: flex;
  background-color: lightgrey;
`;

const InnerList = memo(({ boardName, column, index, taskMap }) => {
  const tasks = column.taskIds.map((taskId) => taskMap[taskId]);
  return (
    <Column
      key={column.id}
      boardName={boardName}
      column={column}
      index={index}
      tasks={tasks}
    />
  );
});

const Board = ({ data, handleTaskMove, handleColumnMove }) => {
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
      handleTaskMove(data.name, result);
    }
    if (result.type === 'column') {
      handleColumnMove(data.name, result);
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

                return (
                  <InnerList
                    key={column.id}
                    boardName={data.name}
                    column={column}
                    index={index}
                    taskMap={data.tasks}
                  />
                );
              })}
              {provided.placeholder}
            </ColumnsContainer>
          )}
        </Droppable>
        <NewItemForm boardName={data.name} formType="column" />
      </BoardContainer>
    </DragDropContext>
  );
};

const mapStateToProps = (state) => ({
  data: getData(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleColumnMove: (boardName, result) =>
    dispatch(moveColumnRequest(boardName, result)),
  handleTaskMove: (boardName, result) =>
    dispatch(moveTaskRequest(boardName, result)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
