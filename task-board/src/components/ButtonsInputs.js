import styled from 'styled-components';

export const FormContainer = styled.div`
  min-height: 40px;
  max-height: 66px;
  border: none;
  border-radius: 8px;
  margin-top: 8px;
  background-color: #ebfff6;
  padding: 8px;
  cursor: pointer;
  font-size: inherit;
`;

export const TitleInput = styled.input`
  font-size: inherit;
  border-radius: 5px;
  padding: 8px;
  border: 1px solid #5d737e;
`;

export const SaveButton = styled.button`
  background-color: #c0fdfb;
  border: 1px solid #5d737e;
  border-radius: 5px;
  font-size: inherit;
  cursor: pointer;
  &:hover {
    background-color: #92dad4;
  }
`;

export const CancelButton = styled.button`
  border: none;
  background-color: inherit;
  marign-left: 12px;
  font-size: 20px;
  color: #5d737e;
  cursor: pointer;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  font-size: inherit;
  margin-top: 5px;
  background-color: #ebfff6;
`;
