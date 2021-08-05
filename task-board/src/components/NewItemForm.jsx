import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  FormContainer,
  TitleInput,
  SaveButton,
  CancelButton,
  ButtonsContainer,
} from './ButtonsInputs';
import {
  createBoardRequest,
  createColumnRequest,
  createTaskRequest,
} from '../redux/thunks';

const NewItemButton = styled.button`
  width: 220px;
  height: 40px;
  border: none;
  border-radius: 10px;
  margin-top: 8px;
  color: #556973;
  background-color: #ebfff6;
  padding: 8px;
  cursor: pointer;
  font-size: inherit;
  display: ${(props) => (props.display === 'button' ? 'block' : 'none')};
  &:hover {
    background-color: #daffef;
  }
`;

const NewItemFormContainer = styled(FormContainer)`
  display: ${(props) => (props.display === 'form' ? 'inline-flex' : 'none')};
  flex-direction: column;
`;

const NewItemForm = ({
  boardName,
  formType,
  parent = null,
  saveNewBoard,
  saveNewColumn,
  saveNewTask,
}) => {
  const [display, setDisplay] = useState('button');
  const [inputValue, setInputValue] = useState('');

  const itemFormRef = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (itemFormRef.current.contains(e.target) || display === 'button') {
        return;
      } else {
        saveNewItem();
        setDisplay('button');
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  });

  const onInputEnter = (e) => {
    if (e.key === 'Enter') {
      saveNewItem();
    }
  };

  const saveNewItem = () => {
    if (inputValue) {
      formType === 'board'
        ? saveNewBoard(inputValue)
        : formType === 'column'
        ? saveNewColumn(boardName, inputValue)
        : saveNewTask(boardName, inputValue, parent);
      setInputValue('');
    }
  };

  return (
    <>
      <NewItemButton display={display} onClick={() => setDisplay('form')}>
        + Add a new {formType}
      </NewItemButton>
      <NewItemFormContainer display={display} ref={itemFormRef}>
        <TitleInput
          type="text"
          placeholder={`Enter new ${formType}`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => onInputEnter(e)}
        ></TitleInput>
        <ButtonsContainer>
          <SaveButton onClick={() => saveNewItem()}>Save</SaveButton>
          <CancelButton onClick={() => setDisplay('button')}>
            &times;
          </CancelButton>
        </ButtonsContainer>
      </NewItemFormContainer>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  saveNewBoard: (text) => dispatch(createBoardRequest(text)),
  saveNewColumn: (boardName, text) =>
    dispatch(createColumnRequest(boardName, text)),
  saveNewTask: (boardName, text, parent) =>
    dispatch(createTaskRequest(boardName, text, parent)),
});

export default connect(null, mapDispatchToProps)(NewItemForm);
