import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import {
  TitleInput,
  SaveButton,
  CancelButton,
  ButtonsContainer,
} from './ButtonsInputs';
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
  background-color: #ebfff6;
  border-radius: 10px;
  padding: 10px;
  overflow: hidden;
  justify-content: space-between;
`;

const TitleDescriptionContainer = styled.div`
  padding: 8px;
  display: block;
  min-height: 100px;
  flex-grow: 1;
`;

const TitleContainer = styled.div`
  font-size: 24px;
`;

const Title = styled.h2`
  font-size: inherit;
  margin-top: 10px;
  margin-bottom: 0;
  padding: 8px;
  display: ${(props) => (props.display === 'title' ? 'block' : 'none')};
`;
const TaskTitleEdit = styled(TitleInput)`
  font-weight: 700;
  padding: 8px;
  margin-top: 10px;
  display: ${(props) => (props.display === 'input' ? 'block' : 'none')};
`;

const DescriptionContainer = styled.div`
  max-width: 500 px;
  padding: 8px;
`;

const DescriptionHeaderContainer = styled.div`
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const DescriptionHeader = styled.h3`
  margin: inherit;
`;

const DescriptionEditButton = styled.button`
  border: none;
  border-radius: 5px;
  margin-left: 10px;
  font-size: inherit;
  background-color: inherit;
  cursor: pointer;
  &:hover {
    background-color: #daffef;
  }
`;

const Description = styled.p`
  display: ${(props) => (props.display === 'description' ? 'block' : 'none')};
`;

const DescriptionEditContainer = styled.div`
  display: ${(props) => (props.display === 'input' ? 'block' : 'none')};
`;

const DescriptionTextArea = styled.textarea`
  font-size: inherit;
  font-family: inherit;
  width: 100%;
`;

const MenuContainer = styled.div`
  display: block;
  padding: 8px;
  width: 100px;
`;

const CloseButton = styled.button`
  background-color: inherit;
  width: inherit;
  font-size: 40px;
  color: #5d737e;
  border: none;
  text-align: right;
  display: block;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  background-color: inherit;
  border: none;
  border-radius: 5px;
  font-size: inherit;
  display: block;
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: #daffef;
  }
`;

const TaskModal = ({
  task,
  parent,
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
          <TitleContainer>
            <Title
              display={titleDisplay}
              onClick={() => setTitleDisplay('input')}
            >
              {task.title}
            </Title>
            <TaskTitleEdit
              ref={titleRef}
              type="text"
              value={title}
              display={titleDisplay}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => onTitleEnter(e)}
            ></TaskTitleEdit>
          </TitleContainer>

          <DescriptionContainer>
            <DescriptionHeaderContainer>
              <DescriptionHeader>Description</DescriptionHeader>
              <DescriptionEditButton
                onClick={() => setDescriptionDisplay('input')}
              >
                Edit
              </DescriptionEditButton>
            </DescriptionHeaderContainer>

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
              <DescriptionTextArea
                rows="10"
                cols="40"
                placeholder={task.description}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></DescriptionTextArea>
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
          <DeleteButton onClick={() => deleteTask(boardName, task.id, parent)}>
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
  deleteTask: (boardName, taskId, parent) =>
    dispatch(deleteTaskRequest(boardName, taskId, parent)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskModal);
