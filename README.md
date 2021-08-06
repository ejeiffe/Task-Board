# Task-Board

Simple task board app with drag and drop functionality inspired by [Trello](https://trello.com/home).

The purpose of this project was to practice building a full-stack app and to consolidate what I've learned about the React ecosystem.

## Built with

- [React](https://github.com/facebook/react)
- [create-react-app](https://github.com/facebook/create-react-app)
- [Redux](https://github.com/reactjs/redux)
- [redux-thunk](https://github.com/reduxjs/redux-thunk)
- [styled-components](https://github.com/styled-components/styled-components)
- [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd)
- [Express](https://github.com/expressjs/express)
- [MongoDB](https://github.com/mongodb/mongo)

## Features

- Create multiple boards with their own tasks and columns.
- Drag and drop tasks within and between columns.
- Drag and drop columns to reorder.
- Click on a task to view and edit a more detailed description.
- Right-click on a task to delete or view details.
- Click on board and column titles to edit.

## Screenshots

![Board Example](screenshots/task_board_1.png?raw=true)

![Task Details Window](screenshots/task_board_2.png?raw=true)

![Switch Between Boards](screenshots/task_board_3.png?raw=true)

![Right-Click Task for Options](screenshots/task_board_4.png?raw=true)

## Setup

Clone repo, then:

```shell
cd Task-Board/task-board
npm install
cd ../task-board-backend
npm install
npm start
```

App will be running on localhost:8000. Requires MongoDB instance on localhost:27017.
