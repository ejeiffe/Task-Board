import React, { useState } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import TaskContextMenu from './TaskContextMenu';

const TaskContainer = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding 8px;
  margin-bottom: 8px;
  display: ${(props) => (props.display === 'task' ? 'block' : 'none')}
`;

const Task = ({ task, index, parent }) => {
  const [display, setDisplay] = useState('task');

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided) => (
          <TaskContainer
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            display={display}
            onContextMenu={(e) => {
              e.preventDefault();
              setDisplay('contextMenu');
            }}
          >
            {task.title}
          </TaskContainer>
        )}
      </Draggable>
      <TaskContextMenu
        task={task}
        parent={parent}
        display={display}
        setDisplay={setDisplay}
      />
    </>
  );
};

export default Task;
