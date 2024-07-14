// reducers/index.ts
import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import userReducer from './userSlice';

const rootReducer = combineReducers({
    counter: counterReducer,
    user: userReducer,
    // 可以继续添加其他的 reducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
