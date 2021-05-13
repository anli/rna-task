import filterSlice, {FilterState as FilterStateNative} from './filter-slice';

export {
  default as filterSlice,
  filters,
  FilterSelectors,
  setKey,
} from './filter-slice';

export type FilterState = FilterStateNative;

export const FilterActions = filterSlice.actions;
