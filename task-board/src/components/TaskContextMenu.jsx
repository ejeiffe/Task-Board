import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { changeTaskTitle, deleteTask } from '../redux/actions';

const ContextMenuContainer = styled.div`
  display: ${(props) => (props.display === 'contextMenu' ? 'flex' : 'none')};
`;

const TaskEditContainer = styled.div`
  display: ${(props) => (props.display === 'contextMenu' ? 'block' : 'none')};
`;

const ButtonsContainer = styled.div`
  display: flex;
`;

const SaveButton = styled.button`
  background-color: lightblue;
  cursor: pointer;
`;
const CancelButton = styled.button`
  border: none;
  color: darkgrey;
  cursor: pointer;
`;

const ContextMenu = styled.ul`
  list-style: none;
  background-color: lightgreen;
  cursor: pointer;
  z-index: 1;
`;

const TaskContextMenu = ({
  task,
  parent,
  display,
  setDisplay,
  modalDisplay,
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
    changeTaskTitle(inputValue, task.id);
    setDisplay('task');
  };

  return (
    <ContextMenuContainer display={display} ref={taskRef}>
      <TaskEditContainer display={display}>
        <input
          type="text"
          placeholder={task.title}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => onInputEnter(e)}
        ></input>
        <ButtonsContainer>
          <SaveButton onClick={() => changeTitle()}>Save</SaveButton>
          <CancelButton onClick={() => setDisplay('task')}>
            &times;
          </CancelButton>
        </ButtonsContainer>
      </TaskEditContainer>
      <ContextMenu>
        <li
          onClick={() => {
            setDisplay('task');
            setModalDisplay('show');
          }}
        >
          Details...
        </li>
        <li
          onClick={() => {
            deleteTask(task.id, parent);
          }}
        >
          Delete Task
        </li>
      </ContextMenu>
    </ContextMenuContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  changeTaskTitle: (text, taskId) => dispatch(changeTaskTitle(text, taskId)),
  deleteTask: (taskId, columnId) => dispatch(deleteTask(taskId, columnId)),
});

export default connect(null, mapDispatchToProps)(TaskContextMenu);
