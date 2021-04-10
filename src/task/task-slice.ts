import {createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import {RootState} from '@store';

export interface Task {
  id: string;
  name: string;
  date?: string;
}

const taskAdapter = createEntityAdapter<Task>();

const taskSlice = createSlice({
  name: 'task',
  initialState: taskAdapter.getInitialState(),
  reducers: {
    fetched: taskAdapter.setAll,
  },
});

const adapterSelectors = taskAdapter.getSelectors<RootState>(
  (state) => state.task,
);

export class TaskSelectors {
  static selectAll = (state: RootState) => adapterSelectors.selectAll(state);
  static getSelectById = (id: string) => (state: RootState) =>
    adapterSelectors.selectById(state, id);
}

export default taskSlice;
