import { createStore, combineReducers } from 'redux';
import { taskBoard } from './redux/reducers';

const reducers = {
  taskBoard,
};

const rootReducer = combineReducers(reducers);

export const configureStore = () => createStore(rootReducer);
