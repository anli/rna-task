import {useAuthentication} from '@authentication';
import firestore from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';

export type Filter = keyof typeof filterOptions;

const filterOptionsDefaultValue = {
  canDo: 'What I can do',
  wantToDoToday: 'What I want to do Today',
  didPreviously: 'What I did Previously',
  all: 'All Tasks',
};

const filterOptions = {
  canDo: 'filter_option.can_do',
  wantToDoToday: 'filter_option.want_to_do_today',
  didPreviously: 'filter_option.did_previously',
  all: 'filter_option.all',
};

const defaultFilter: Filter = 'all';

const useFilter = () => {
  const [filter, setFilter] = useState<Filter>(defaultFilter);
  const {user} = useAuthentication();
  const userId = user?.uid as string;

  useEffect(() => {
    const url = `users/${userId}`;
    const unsubscribe = firestore()
      .doc(url)
      .onSnapshot((query) => {
        const result = query.data();
        result?.filter && setFilter(result.filter);
      });

    return () => unsubscribe();
  }, [userId]);

  const onFilter = async (_filter: Filter) => {
    persistFilterData(_filter, userId);
    setFilter(_filter);
  };

  return {filter, onFilter, filterOptions, filterOptionsDefaultValue};
};

export default useFilter;

const persistFilterData = async (filter: string, userId: string) => {
  const url = `users/${userId}`;
  await firestore().doc(url).set({filter});
  return true;
};
