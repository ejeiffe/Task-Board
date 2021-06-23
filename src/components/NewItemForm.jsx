import React, { useState } from 'react';
import styled from 'styled-components';

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

const NewItemForm = ({ formType, parent, onSavePressed }) => {
  const [display, setDisplay] = useState('button');
  const [inputValue, setInputValue] = useState('');

  return (
    <>
      <NewItemButton display={display} onClick={() => setDisplay('form')}>
        + Add a new {formType}
      </NewItemButton>
      <FormContainer display={display}>
        <input
          type="text"
          placeholder={`Enter new ${formType}`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        ></input>
        <ButtonsContainer>
          <SaveButton
            onClick={() => {
              if (inputValue) {
                formType === 'column'
                  ? onSavePressed(inputValue)
                  : onSavePressed(inputValue, parent);
                setInputValue('');
              }
            }}
          >
            Save
          </SaveButton>
          <CancelButton onClick={() => setDisplay('button')}>
            &times;
          </CancelButton>
        </ButtonsContainer>
      </FormContainer>
    </>
  );
};

export default NewItemForm;
