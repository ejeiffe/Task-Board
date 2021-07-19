import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  createBoardRequest,
  createColumnRequest,
  createTaskRequest,
} from '../redux/thunks';

const NewItemButton = styled.button`
  width: 220px;
  height: 40px;
  border: none;
  background-color: lightgrey;
  cursor: pointer;
  display: ${(props) => (props.display === 'button' ? 'block' : 'none')};
`;

const FormContainer = styled.div`
  width: 200px;
  display: ${(props) => (props.display === 'form' ? 'block' : 'none')};
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

const ButtonsContainer = styled.div`
  display: flex;
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
      <FormContainer display={display} ref={itemFormRef}>
        <input
          type="text"
          placeholder={`Enter new ${formType}`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => onInputEnter(e)}
        ></input>
        <ButtonsContainer>
          <SaveButton onClick={() => saveNewItem()}>Save</SaveButton>
          <CancelButton onClick={() => setDisplay('button')}>
            &times;
          </CancelButton>
        </ButtonsContainer>
      </FormContainer>
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
