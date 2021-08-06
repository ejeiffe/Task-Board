import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { TitleInput } from './ButtonsInputs';
import { connect } from 'react-redux';
import { getAllBoards } from '../redux/selectors';
import { deleteBoardRequest, updateBoardRequest } from '../redux/thunks';
import NewItemForm from './NewItemForm';
import { switchCurrentBoard } from '../redux/actions';

const HeaderContainer = styled.div`
  height: 95px;
  display: flex;
  padding: 8px;
  justify-content: space-between;
  align-items: end;
`;

const TitleContainer = styled.div`
margin-top: auto;
  font-size: 32px;
  padding 10px;
  align-items: end;
`;

const BoardTitle = styled.h1`
  font-size: inherit;
  margin: 0;
  color: #fcfffd;
  background-color: #64b6ac;
  border-radius: 10px;
  padding: 10px;
  display: ${(props) => (props.display === 'title' ? 'block' : 'none')};
`;

const TitleEdit = styled(TitleInput)`
  padding: 10px;
  font-weight: 700;
  display: ${(props) => (props.display === 'input' ? 'block' : 'none')};
`;

const ButtonsContainer = styled.div`
  margin-top: auto;
  padding: 10px;
  font-size: 18px;
  display: flex;
  align-items: end;
  position: relative;
`;

const HeaderButton = styled.button`
  background-color: #64b6ac;
  color: #fcfffd;
  font-size: inherit;
  border: none;
  border-radius: 10px;
  padding: 8px;
  cursor: pointer;
`;

const ContextMenu = styled.ul`
  font-size: 16px;
  list-style: none;
  background-color: #ebfff6;
  border: 1px solid #5d737e;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
  position: absolute;
  top: 40px;
  z-index: 1;
  display: ${(props) => (props.display === 'menu' ? 'block' : 'none')};
`;

const MenuItem = styled.li`
  padding: 8px;
  width: fit-content;
  &:hover {
    background-color: #daffef;
  }
`;

const ButtonsDivider = styled.span`
  padding: 8px;
  color: #fcfffd;
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
  const [menuDisplay, setMenuDisplay] = useState('hidden');
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
        setMenuDisplay('hidden');
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  });

  return (
    <HeaderContainer>
      <TitleContainer>
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
      </TitleContainer>
      <ButtonsContainer>
        <HeaderButton onClick={() => setMenuDisplay('menu')}>
          Change Board
        </HeaderButton>
        <ContextMenu display={menuDisplay} ref={menuRef}>
          {allBoards.map((board) => {
            if (board.name !== boardName) {
              return (
                <MenuItem
                  onClick={() => {
                    setMenuDisplay('button');
                    switchBoard(board.name);
                  }}
                >
                  {board.title}
                </MenuItem>
              );
            } else {
              return null;
            }
          })}
          <li>
            <NewItemForm boardName={null} formType="board" />
          </li>
        </ContextMenu>
        <ButtonsDivider>|</ButtonsDivider>
        <HeaderButton
          onClick={() => {
            if (window.confirm('Delete this board and all associated tasks?')) {
              deleteBoard(boardName);
            }
          }}
        >
          Delete Board
        </HeaderButton>
      </ButtonsContainer>
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
