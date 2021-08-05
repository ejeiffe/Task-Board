import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import {
  FormContainer,
  TitleInput,
  SaveButton,
  CancelButton,
  ButtonsContainer,
} from './ButtonsInputs';
import { connect } from 'react-redux';
import { deleteTaskRequest, updateTaskRequest } from '../redux/thunks';
import { getBoardName } from '../redux/selectors';

const ContextMenuContainer = styled.div`
  display: ${(props) => (props.display === 'contextMenu' ? 'flex' : 'none')};
  width: fit-content;
`;

const TaskTitleEdit = styled(TitleInput)`
  width: 186px;
`;

const TaskEditContainer = styled(FormContainer)`
  display: ${(props) => (props.display === 'contextMenu' ? 'block' : 'none')};
  padding-left: 0;
  padding-top: 0;
  padding-bottom: 0;
  margin-top: 0;
`;

const ContextMenu = styled.ul`
  list-style: none;
  border: 1px solid #5d737e;
  border-radius: 5px;
  background-color: #fcfffd;
  padding 8px;
  margin-top: 0;
  cursor: pointer;
  z-index: 1;
`;

const MenuItem = styled.li`
  padding: 5px;
  width: fit-content;
  &:hover {
    background-color: #ebfff6;
  }
`;

const TaskContextMenu = ({
  task,
  parent,
  boardName,
  display,
  setDisplay,
  setModalDisplay,
  changeTaskTitle,
  deleteTask,
}) => {
  const [inputValue, setInputValue] = useState(task.title);

  const taskRef = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (
        (taskRef.current && taskRef.current.contains(e.target)) ||
        display === 'task'
      ) {
        return;
      } else {
        setDisplay('task');
        setInputValue(task.title);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  });

  const onInputEnter = (e) => {
    if (e.key === 'Enter') {
      changeTitle();
    }
  };

  const changeTitle = () => {
    const updatedTask = {
      ...task,
      title: inputValue,
    };
    changeTaskTitle(boardName, updatedTask);
    setDisplay('task');
  };

  return (
    <ContextMenuContainer display={display} ref={taskRef}>
      <TaskEditContainer display={display}>
        <TaskTitleEdit
          type="text"
          placeholder={task.title}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => onInputEnter(e)}
        ></TaskTitleEdit>
        <ButtonsContainer>
          <SaveButton onClick={() => changeTitle()}>Save</SaveButton>
          <CancelButton onClick={() => setDisplay('task')}>
            &times;
          </CancelButton>
        </ButtonsContainer>
      </TaskEditContainer>
      <ContextMenu>
        <MenuItem
          onClick={() => {
            setDisplay('task');
            setModalDisplay('show');
          }}
        >
          Details...
        </MenuItem>
        <MenuItem
          onClick={() => {
            deleteTask(boardName, task.id, parent);
          }}
        >
          Delete&nbsp;Task
        </MenuItem>
      </ContextMenu>
    </ContextMenuContainer>
  );
};

const mapStateToProps = (state) => ({
  boardName: getBoardName(state),
});

const mapDispatchToProps = (dispatch) => ({
  changeTaskTitle: (boardName, task) =>
    dispatch(updateTaskRequest(boardName, task)),
  deleteTask: (boardName, taskId, parent) =>
    dispatch(deleteTaskRequest(boardName, taskId, parent)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskContextMenu);
