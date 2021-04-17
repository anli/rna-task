import {createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import {RootState} from '@store';

export interface Task {
  id: string;
  name: string;
  date?: string;
  isCompleted?: boolean;
}

const taskAdapter = createEntityAdapter<Task>({
  sortComparer: (a, b) => {
    if (!a?.date) {
      return 1;
    }

    if (!b?.date) {
      return -1;
    }

    return new Date(b.date).getTime() - new Date(a.date).getTime();
  },
});

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
