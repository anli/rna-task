import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '@store';

interface Task {
  id: string;
  name: string;
}

interface TaskState {
  data: Task[];
}

const initialState: TaskState = {
  data: [],
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
});

export class TaskSelectors {
  static selectData = (state: RootState) => state.task.data;
}

export default taskSlice;
