import React, { useState, useRef, useEffect, memo } from 'react';
import styled from 'styled-components';
import { TitleInput } from './ButtonsInputs';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import Task from './Task';
import NewItemForm from './NewItemForm';
import { deleteColumnRequest, updateColumnRequest } from '../redux/thunks';

const ColumnContainer = styled.div`
  margin: 8px;
  border: none;
  background-color: #ebfff6;
  border-radius: 10px;
  width: 220px;
  display: flex;
  flex-direction: column;
`;
const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 5px;
`;

const Title = styled.h3`
  padding: 10px;
  display: ${(props) => (props.display === 'title' ? 'block' : 'none')};
`;
const TitleEdit = styled(TitleInput)`
  padding: 10px;
  width: 80%;
  font-size: 18px;
  font-weight: 600;
  display: ${(props) => (props.display === 'input' ? 'block' : 'none')};
`;

const DeleteButton = styled.button`
  color: darkgrey;
  background-color: #ebfff6;
  font-size: 22px;
  border: none;
  cursor: pointer;
`;

const TaskList = styled.div`
  padding: 8px;
  min-height: 100px;
  flex-grow: 1;
`;

const InnerList = memo(({ tasks, parent }) => {
  return tasks.map((task, index) => (
    <Task key={task.id} task={task} index={index} parent={parent} />
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
                <InnerList tasks={tasks} parent={column.id} />
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
