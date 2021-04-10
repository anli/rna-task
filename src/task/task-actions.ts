import firestore, {firebase} from '@react-native-firebase/firestore';
import {createAsyncThunk} from '@reduxjs/toolkit';
import R from 'ramda';
import {Task} from './task-slice';

const create = createAsyncThunk(
  'task/create',
  async (task: Omit<Task, 'id'>) => {
    const removeNull = R.filter((n) => !R.isNil(n));
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

class TaskActions {
  static create = create;
  static remove = remove;
  static update = update;
}

export default TaskActions;
