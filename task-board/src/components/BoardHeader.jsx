import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getAllBoards } from '../redux/selectors';
import { deleteBoardRequest, updateBoardRequest } from '../redux/thunks';
import NewItemForm from './NewItemForm';
import { switchCurrentBoard } from '../redux/actions';

const HeaderContainer = styled.div`
  display: flex;
  padding: 8px;
`;

const BoardTitle = styled.h1`
  padding: 8px;
  color: #fcfffd;
  display: ${(props) => (props.display === 'title' ? 'block' : 'none')};
`;

const TitleEdit = styled.input`
  padding: 8px;
  display: ${(props) => (props.display === 'input' ? 'block' : 'none')};
`;

const MenuButton = styled.button`
  background-colour: lightgreen;
  border: none;
  cursor: pointer;
  display: ${(props) => (props.display === 'button' ? 'block' : 'none')};
`;

const ContextMenu = styled.ul`
  list-style: none;
  background-color: lightgreen;
  cursor: pointer;
  z-index: 1;
  display: ${(props) => (props.display === 'menu' ? 'block' : 'none')};
`;

const DeleteButton = styled.button`
  background-color: lightgrey;
  cursor: pointer;
`;

const BoardHeader = ({
  boardName,
  boardTitle,
  allBoards,
  changeBoardTitle,
  switchBoard,
  deleteBoard,
}) => {
  const [titleDisplay, setTitleDisplay] = useState('title');
  const [menuDisplay, setMenuDisplay] = useState('button');
  const [title, setTitle] = useState(boardTitle);

  const titleRef = useRef();

  const onInputEnter = (e) => {
    if (e.key === 'Enter') {
      onTitleChange();
    }
  };

  const onTitleChange = () => {
    changeBoardTitle(boardName, title);
    setTitleDisplay('title');
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (titleRef.current.contains(e.target) || titleDisplay === 'title') {
        return;
      } else {
        onTitleChange();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  });

  const menuRef = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current.contains(e.target) || menuDisplay === 'button') {
        return;
      } else {
        setMenuDisplay('button');
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  });

  return (
    <HeaderContainer>
      <BoardTitle
        display={titleDisplay}
        onClick={() => setTitleDisplay('input')}
      >
        {title}
      </BoardTitle>
      <TitleEdit
        type="text"
        ref={titleRef}
        value={title}
        display={titleDisplay}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => onInputEnter(e)}
      ></TitleEdit>
      <MenuButton display={menuDisplay} onClick={() => setMenuDisplay('menu')}>
        Change Board
      </MenuButton>
      <ContextMenu display={menuDisplay} ref={menuRef}>
        {allBoards.map((board) => {
          if (board.name !== boardName) {
            return (
              <li
                onClick={() => {
                  setMenuDisplay('button');
                  switchBoard(board.name);
                }}
              >
                {board.title}
              </li>
            );
          } else {
            return null;
          }
        })}
        <li>
          <NewItemForm boardName={null} formType="board" />
        </li>
      </ContextMenu>
      <DeleteButton
        onClick={() => {
          deleteBoard(boardName);
        }}
      >
        Delete Board
      </DeleteButton>
    </HeaderContainer>
  );
};

const mapStateToProps = (state) => ({
  allBoards: getAllBoards(state),
});

const mapDispatchToProps = (dispatch) => ({
  changeBoardTitle: (boardName, text) =>
    dispatch(updateBoardRequest(boardName, text)),
  switchBoard: (boardName) => dispatch(switchCurrentBoard(boardName)),
  deleteBoard: (boardName) => dispatch(deleteBoardRequest(boardName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardHeader);
