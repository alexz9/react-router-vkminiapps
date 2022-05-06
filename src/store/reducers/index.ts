import { combineReducers } from 'redux';
import app from './app.reducer';

const rootReducer = combineReducers({
  app
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>