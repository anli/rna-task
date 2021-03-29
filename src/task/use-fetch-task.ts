import {useAuthentication} from '@authentication';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {taskSlice} from '@task';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Task} from './task-slice';

const useFetchTask = () => {
  const {user} = useAuthentication();
  const dispatch = useDispatch();

  const userId = user?.uid;

  useEffect(() => {
    if (userId) {
      const url = `users/${userId}/tasks`;
      const unsubscribe = firestore()
        .collection<Omit<Task, 'id'>>(url)
        .onSnapshot((query) => {
          const result = getData(query);
          dispatch(taskSlice.actions.fetched(result));
        });

      return () => unsubscribe();
    }

    dispatch(taskSlice.actions.fetched([]));
  }, [userId, dispatch]);

  return {};
};

export default useFetchTask;

const getData = <T>(
  query: FirebaseFirestoreTypes.QuerySnapshot<Omit<T, 'id'>>,
): T[] => {
  return query.docs.map((doc) => {
    const data = {
      ...doc.data(),
      id: doc.id,
    } as unknown;

    return data as T;
  });
};
