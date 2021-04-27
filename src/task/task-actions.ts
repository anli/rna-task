import firestore, {firebase} from '@react-native-firebase/firestore';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {getNextScheduleDate} from '@utils';
import R from 'ramda';
import {Task} from './task-slice';

const create = createAsyncThunk(
  'task/create',
  async (task: Omit<Task, 'id'>) => {
    const cleanTask = removeNull(task) as Omit<Task, 'id'>;
    const userId = firebase.auth().currentUser?.uid;
    const url = `users/${userId}/tasks`;
    await firestore().collection<Omit<Task, 'id'>>(url).add(cleanTask);
    return true;
  },
);

const remove = createAsyncThunk('task/remove', async (id: string) => {
  const userId = firebase.auth().currentUser?.uid;
  const url = `users/${userId}/tasks`;
  await firestore().collection(url).doc(id).delete();
  return true;
});

const update = createAsyncThunk(
  'task/update',
  async ({id, changes}: {id: string; changes: Partial<Task>}) => {
    const userId = firebase.auth().currentUser?.uid;
    const url = `users/${userId}/tasks`;
    await firestore().collection(url).doc(id).update(changes);
    return true;
  },
);

const complete = createAsyncThunk(
  'task/complete',
  async ({id, changes}: {id: string; changes: Partial<Task>}) => {
    const userId = firebase.auth().currentUser?.uid;
    const url = `users/${userId}/tasks`;

    await firestore().collection(url).doc(id).update(changes);

    if (
      changes?.date &&
      changes?.schedule?.period &&
      changes?.schedule?.frequency &&
      changes.isCompleted
    ) {
      const newDate = getNextScheduleDate(
        changes.date,
        changes.schedule.period,
        changes.schedule.frequency,
      );
      const newTask = {
        ...(removeNull(R.omit(['id'], changes)) as Omit<Task, 'id'>),
        date: newDate,
        isCompleted: false,
      };
      await firestore().collection<Omit<Task, 'id'>>(url).add(newTask);
      return true;
    }

    return true;
  },
);

class TaskActions {
  static create = create;
  static remove = remove;
  static update = update;
  static complete = complete;
}

export default TaskActions;

const removeNull = R.filter((n) => !R.isNil(n));
