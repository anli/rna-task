import {useAuthentication} from '@authentication';
import firestore from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

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

const filterTabTitles = {
  canDo: 'filter_tab_title.can_do',
  wantToDoToday: 'filter_tab_title.want_to_do_today',
  didPreviously: 'filter_tab_title.did_previously',
  all: 'filter_tab_title.all',
};

const filterTabDefaultTitles = {
  canDo: 'Can do',
  wantToDoToday: 'Today',
  didPreviously: 'Previously',
  all: 'All',
};

const defaultFilter: Filter = 'all';

const useFilter = () => {
  const [filter, setFilter] = useState<Filter>(defaultFilter);
  const {user} = useAuthentication();
  const userId = user?.uid as string;
  const {t} = useTranslation();

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

  const defaultTitles = Object.values(filterTabDefaultTitles);
  const tabTitles = Object.values(filterTabTitles).map((value, index) =>
    t(value, defaultTitles[index]),
  );

  return {
    filter,
    onFilter,
    filterOptions,
    filterOptionsDefaultValue,
    filterTabTitles: tabTitles,
  };
};

export default useFilter;

const persistFilterData = async (filter: string, userId: string) => {
  const url = `users/${userId}`;
  await firestore().doc(url).set({filter});
  return true;
};
