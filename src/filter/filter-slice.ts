import {createSelector, createSlice} from '@reduxjs/toolkit';
import {RootState} from '@store';

export interface FilterState {
  key: string;
}

const initialState = {key: 'all'} as FilterState;

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setKey: (state, action) => {
      state.key = action.payload;
    },
  },
});

const filterSelector = (state: RootState) => state.filter;

const filterKeySelector = createSelector(filterSelector, (state) => state.key);

export class FilterSelectors {
  static filterKeySelector = filterKeySelector;
}

export const {setKey} = filterSlice.actions;

export default filterSlice;

export const filters = [
  {
    key: 'canDo',
    labelDefaultValue: 'Can do',
    labelTranslationKey: 'filter_tab_title.can_do',
  },
  {
    key: 'wantToDoToday',
    labelDefaultValue: 'Today',
    labelTranslationKey: 'filter_tab_title.want_to_do_today',
  },
  {
    key: 'didPreviously',
    labelDefaultValue: 'Previously',
    labelTranslationKey: 'filter_tab_title.did_previously',
  },
  {
    key: 'all',
    labelDefaultValue: 'All',
    labelTranslationKey: 'filter_tab_title.all',
  },
];
