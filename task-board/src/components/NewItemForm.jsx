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
  border-radius: 10px;
  margin-top: 8px;
  background-color: #ebfff6;
  padding: 8px;
  cursor: pointer;
  font-size: inherit;
  display: ${(props) => (props.display === 'button' ? 'block' : 'none')};
  &:hover {
    background-color: #daffef;
  }
`;

const FormContainer = styled.div`
  width: 204px;
  height: 40px;
  border: none;
  border-radius: 8px;
  margin-top: 8px;
  background-color: #ebfff6;
  padding: 8px;
  cursor: pointer;
  font-size: inherit;
  display: ${(props) => (props.display === 'form' ? 'block' : 'none')};
`;

const TitleEdit = styled.input`
  font-size: inherit;
  border-radius: 5px;
  border: 1px solid #5d737e;
`;

const SaveButton = styled.button`
  background-color: #c0fdfb;
  border: 1px solid #5d737e;
  border-radius: 5px;
  font-size: inherit;
  cursor: pointer;
`;

const CancelButton = styled.button`
  border: none;
  background-color: #ebfff6;
  marign-left: 12px;
  font-size: inherit;
  font-weight: bold;
  color: #5d737e;
  cursor: pointer;
`;

const ButtonsContainer = styled.div`
  display: flex;
  font-size: inherit;
  margin-top: 2px;
  background-color: #ebfff6;
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
        <TitleEdit
          type="text"
          placeholder={`Enter new ${formType}`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => onInputEnter(e)}
        ></TitleEdit>
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
