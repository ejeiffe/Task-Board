import React, { memo } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { moveTask, moveColumn } from '../redux/actions';
import Column from './Column';
import NewItemForm from './NewItemForm';

const BoardContainer = styled.div`
  display: flex;
`;

const ColumnsContainer = styled.div`
  display: flex;
  background-color: lightgrey;
`;

const InnerList = memo(({ column, index, taskMap }) => {
  const tasks = column.taskIds.map((taskId) => taskMap[taskId]);
  return <Column key={column.id} column={column} index={index} tasks={tasks} />;
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

                return (
                  <InnerList
                    key={column.id}
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
        <NewItemForm formType="column" parent="board" />
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
