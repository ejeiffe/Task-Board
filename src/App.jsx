import React from 'react';
import { hot } from 'react-hot-loader';
import styled from 'styled-components';
import Board from './components/Board';

const AppContainer = styled.div`
  margin: 1rem;
  font-family: Arial, Helvetica, sans-serif;
  color: #222222;
`;

const App = () => (
  <AppContainer>
    <Board />
  </AppContainer>
);

export default hot(module)(App);
