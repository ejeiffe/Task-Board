import React, { useState } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import TaskContextMenu from './TaskContextMenu';
import TaskModal from './TaskModal';

const TaskContainer = styled.div`
  border: 1px solid #5d737e;
  background-color: #fcfffd;
  border-radius: 10px;
  padding: 8px;
  margin-bottom: 8px;
  display: ${(props) => (props.display === 'task' ? 'block' : 'none')};
  &:hover {
    background-color: #c0fdfb;
  }
`;

const Task = ({ task, index, parent }) => {
  const [taskDisplay, setTaskDisplay] = useState('task');
  const [modalDisplay, setModalDisplay] = useState('hide');

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <TaskContainer
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            display={taskDisplay}
            isDragging={snapshot.isDragging}
            onContextMenu={(e) => {
              e.preventDefault();
              setTaskDisplay('contextMenu');
            }}
            onClick={() => setModalDisplay('show')}
          >
            {task.title}
          </TaskContainer>
        )}
      </Draggable>
      <TaskContextMenu
        task={task}
        parent={parent}
        display={taskDisplay}
        setDisplay={setTaskDisplay}
        setModalDisplay={setModalDisplay}
      />
      <TaskModal
        task={task}
        parent={parent}
        display={modalDisplay}
        setDisplay={setModalDisplay}
      />
    </>
  );
};

export default Task;
