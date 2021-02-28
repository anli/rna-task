import {configureStore} from '@reduxjs/toolkit';
import {taskSlice} from '@task';

export const reducer = {
  task: taskSlice.reducer,
};

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
