import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getBoardName } from '../redux/selectors';
import { deleteTaskRequest, updateTaskRequest } from '../redux/thunks';

const ModalContainer = styled.div`
  display: ${(props) => (props.display === 'show' ? 'block' : 'none')};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
`;

const TaskInfoContainer = styled.div`
  min-width: 280px;
  max-width: 700px;
  margin: 5% auto;
  display: flex;
  background-color: lightgrey;
  padding: 10px;
  overflow: hidden;
  justify-content: space-between;
`;

const TitleDescriptionContainer = styled.div`
  padding: 8px;
  display: block;
  min-height: 100px;
`;

const Title = styled.h3`
  padding: 8px;
  display: ${(props) => (props.display === 'title' ? 'block' : 'none')};
`;
const TitleEdit = styled.input`
  padding: 8px;
  display: ${(props) => (props.display === 'input' ? 'block' : 'none')};
`;

const DescriptionContainer = styled.div`
  max-width: 500 px;
  padding: 8px;
`;

const Description = styled.p`
  display: ${(props) => (props.display === 'description' ? 'block' : 'none')};
`;

const DescriptionEditContainer = styled.div`
  display: ${(props) => (props.display === 'input' ? 'block' : 'none')};
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

const MenuContainer = styled.div`
  display: block;
  padding: 8px;
  width: 100px;
`;

const CloseButton = styled.button`
  width: inherit;
  font-size: 40px;
  color: darkgrey;
  background-color: lightgrey;
  border: none;
  text-align: right;
  display: block;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  background-color: darkgrey;
  display: block;
  cursor: pointer;
`;

const TaskModal = ({
  task,
  boardName,
  display,
  setDisplay,
  updateTask,
  deleteTask,
}) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [titleDisplay, setTitleDisplay] = useState('title');
  const [descriptionDisplay, setDescriptionDisplay] = useState('description');

  const modalRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (
        (modalRef.current && modalRef.current.contains(e.target)) ||
        display === 'hide'
      ) {
        return;
      } else {
        onTitleChange();
        onDescriptionChange();
        setDisplay('hide');
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  });

  useEffect(() => {
    const handleClick = (e) => {
      if (
        (titleRef.current && titleRef.current.contains(e.target)) ||
        display === 'hide'
      ) {
        return;
      } else {
        onTitleChange();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  });

  useEffect(() => {
    const handleClick = (e) => {
      if (
        (descriptionRef.current && descriptionRef.current.contains(e.target)) ||
        display === 'hide'
      ) {
        return;
      } else {
        onDescriptionChange();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  });

  const onTitleEnter = (e) => {
    if (e.key === 'Enter') {
      onTitleChange();
    }
  };

  const onTitleChange = () => {
    const updatedTask = {
      ...task,
      title: title,
    };
    updateTask(boardName, updatedTask);
    setTitleDisplay('title');
  };

  const onDescriptionEnter = (e) => {
    if (e.key === 'Enter') {
      onDescriptionChange();
    }
  };

  const onDescriptionChange = () => {
    const updatedTask = {
      ...task,
      description: description,
    };
    updateTask(boardName, updatedTask);
    setDescriptionDisplay('description');
  };

  return (
    <ModalContainer display={display}>
      <TaskInfoContainer ref={modalRef}>
        <TitleDescriptionContainer>
          <Title
            display={titleDisplay}
            onClick={() => setTitleDisplay('input')}
          >
            {task.title}
          </Title>
          <TitleEdit
            ref={titleRef}
            type="text"
            value={title}
            display={titleDisplay}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => onTitleEnter(e)}
          ></TitleEdit>
          <DescriptionContainer>
            <h3>Description</h3>
            <Description
              display={descriptionDisplay}
              onClick={() => setDescriptionDisplay('input')}
            >
              {task.description === ''
                ? 'Add a description for this task'
                : task.description}
            </Description>
            <DescriptionEditContainer
              display={descriptionDisplay}
              ref={descriptionRef}
            >
              <input
                type="text"
                placeholder={task.description}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onKeyDown={(e) => onDescriptionEnter(e)}
              ></input>
              <ButtonsContainer>
                <SaveButton onClick={() => onDescriptionChange()}>
                  Save
                </SaveButton>
                <CancelButton
                  onClick={() => setDescriptionDisplay('description')}
                >
                  &times;
                </CancelButton>
              </ButtonsContainer>
            </DescriptionEditContainer>
          </DescriptionContainer>
        </TitleDescriptionContainer>
        <MenuContainer>
          <CloseButton onClick={() => setDisplay('hide')}>&times;</CloseButton>
          <DeleteButton onClick={() => deleteTask(boardName, task.id)}>
            Delete Task
          </DeleteButton>
        </MenuContainer>
      </TaskInfoContainer>
    </ModalContainer>
  );
};

const mapStateToProps = (state) => ({
  boardName: getBoardName(state),
});

const mapDispatchToProps = (dispatch) => ({
  updateTask: (boardName, task) => dispatch(updateTaskRequest(boardName, task)),
  deleteTask: (boardName, taskId) =>
    dispatch(deleteTaskRequest(boardName, taskId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskModal);
