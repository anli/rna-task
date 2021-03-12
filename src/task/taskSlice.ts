import {createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import {RootState} from '@store';

interface Task {
  id: string;
  name: string;
}

const taskAdapter = createEntityAdapter<Task>({
  selectId: (task) => task.id,
});

const taskSlice = createSlice({
  name: 'task',
  initialState: taskAdapter.getInitialState(),
  reducers: {},
});

const adapterSelectors = taskAdapter.getSelectors<RootState>(
  (state) => state.task,
);

export class TaskSelectors {
  static selectAll = (state: RootState) => adapterSelectors.selectAll(state);
}

export default taskSlice;
