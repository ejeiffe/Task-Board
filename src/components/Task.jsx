import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const TaskContainer = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding 8px;
  margin-bottom: 8px;
`;

const Task = ({ task, index }) => (
  <Draggable draggableId={task.id} index={index}>
    {(provided) => (
      <TaskContainer
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        {task.content}
      </TaskContainer>
    )}
  </Draggable>
);

export default Task;
