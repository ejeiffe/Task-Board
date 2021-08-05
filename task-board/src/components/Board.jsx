import React, { memo, useEffect } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { getBoardLoading, getBoardName, getData } from '../redux/selectors';
import Column from './Column';
import NewItemForm from './NewItemForm';
import {
  loadCurrentBoard,
  moveColumnRequest,
  moveTaskRequest,
} from '../redux/thunks';
import BoardHeader from './BoardHeader';

const BoardContainer = styled.div`
  display: block;
  background-color: #619595;
`;

const BoardItemsContainer = styled.div`
  display: flex;
`;

const ColumnsContainer = styled.div`
  display: flex;
  align-items: start;
  margin-right: 8px;
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

const Board = ({
  boardName,
  data,
  isLoading,
  loadBoardData,
  handleTaskMove,
  handleColumnMove,
}) => {
  useEffect(() => {
    loadBoardData(boardName);
  }, [loadBoardData, boardName]);

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

  const boardContent = (
    <BoardContainer>
      <BoardHeader boardName={boardName} boardTitle={data.title} />
      <DragDropContext onDragEnd={onDragEnd}>
        <BoardItemsContainer>
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
        </BoardItemsContainer>
      </DragDropContext>
    </BoardContainer>
  );
  return isLoading ? (
    <h3>Loading board data...</h3>
  ) : boardName ? (
    boardContent
  ) : (
    <NewItemForm boardName={null} formType="board" />
  );
};

const mapStateToProps = (state) => ({
  data: getData(state),
  boardName: getBoardName(state),
  isLoading: getBoardLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadBoardData: (boardName) => {
    dispatch(loadCurrentBoard(boardName));
  },
  handleColumnMove: (boardName, result) =>
    dispatch(moveColumnRequest(boardName, result)),
  handleTaskMove: (boardName, result) =>
    dispatch(moveTaskRequest(boardName, result)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
