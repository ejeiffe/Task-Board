import React, { useState, useRef, useEffect, memo } from 'react';
import styled from 'styled-components';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import Task from './Task';
import NewItemForm from './NewItemForm';
import { deleteColumnRequest, updateColumnRequest } from '../redux/thunks';

const ColumnContainer = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  background-color: white;
  border-radius: 2px;
  width: 220px;
  display: flex;
  flex-direction: column;
`;
const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
`;

const Title = styled.h3`
  padding: 8px;
  display: ${(props) => (props.display === 'title' ? 'block' : 'none')};
`;
const TitleEdit = styled.input`
  padding: 8px;
  display: ${(props) => (props.display === 'input' ? 'block' : 'none')};
`;

const DeleteButton = styled.button`
  color: darkgrey;
  background-color: white;
  font-size: 22px;
  border: none;
  cursor: pointer;
`;

const TaskList = styled.div`
  padding: 8px;
  flex-grow: 1;
  min-height: 100px;
`;

const InnerList = memo(({ tasks }) => {
  return tasks.map((task, index) => (
    <Task key={task.id} task={task} index={index} />
  ));
});

const Column = ({
  boardName,
  column,
  index,
  tasks,
  changeColumnTitle,
  deleteColumn,
}) => {
  const [title, setTitle] = useState(column.title);
  const [titleDisplay, setTitleDisplay] = useState('title');

  const titleEditRef = useRef();

  const onInputEnter = (e) => {
    if (e.key === 'Enter') {
      onTitleChange();
    }
  };

  const onTitleChange = () => {
    const updatedColumn = {
      ...column,
      title: title,
    };
    changeColumnTitle(boardName, updatedColumn);
    setTitleDisplay('title');
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (titleEditRef.current.contains(e.target) || titleDisplay === 'title') {
        return;
      } else {
        onTitleChange();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  });

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <ColumnContainer ref={provided.innerRef} {...provided.draggableProps}>
          <TitleContainer>
            <Title
              {...provided.dragHandleProps}
              display={titleDisplay}
              onClick={() => setTitleDisplay('input')}
            >
              {title}
            </Title>
            <TitleEdit
              type="text"
              ref={titleEditRef}
              value={title}
              display={titleDisplay}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => onInputEnter(e)}
            />
            <DeleteButton onClick={() => deleteColumn(boardName, column.id)}>
              &times;
            </DeleteButton>
          </TitleContainer>

          <Droppable droppableId={column.id} type="task">
            {(provided) => (
              <TaskList ref={provided.innerRef} {...provided.droppableProps}>
                <InnerList tasks={tasks} />
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
          <NewItemForm
            boardName={boardName}
            formType="task"
            parent={column.id}
          />
        </ColumnContainer>
      )}
    </Draggable>
  );
};

const mapDispatchToProps = (dispatch) => ({
  changeColumnTitle: (boardName, column) =>
    dispatch(updateColumnRequest(boardName, column)),
  deleteColumn: (boardName, columnId) =>
    dispatch(deleteColumnRequest(boardName, columnId)),
});

export default connect(null, mapDispatchToProps)(Column);
