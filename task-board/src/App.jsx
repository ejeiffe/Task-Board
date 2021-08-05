import React from 'react';
import { hot } from 'react-hot-loader';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import Board from './components/Board';

const GlobalStyle = createGlobalStyle`
  body {
    background: #619595;
  }
`;

const AppContainer = styled.div`
  font-family: Roboto, sans-serif;
  color: #556973;
`;

const App = () => (
  <>
    <GlobalStyle />
    <AppContainer>
      <Board />
    </AppContainer>
  </>
);

export default hot(module)(App);
