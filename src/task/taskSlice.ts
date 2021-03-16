import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {RootState} from '@store';

interface Task {
  id: string;
  name: string;
}

const taskAdapter = createEntityAdapter<Task>();

const taskSlice = createSlice({
  name: 'task',
  initialState: taskAdapter.getInitialState(),
  reducers: {
    created: taskAdapter.addOne,
    deleted: (state, action: PayloadAction<string>) => {
      taskAdapter.removeOne(state, action.payload);
    },
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
