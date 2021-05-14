import {createSelector, createSlice} from '@reduxjs/toolkit';
import {RootState} from '@store';
import VersionActions from './version-actions';

export interface VersionState {
  result: any;
}

const initialState = {} as VersionState;

const versionSlice = createSlice({
  name: 'version',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(VersionActions.checkUpdate.fulfilled, (state, action) => {
      state.result = action.payload;
    });
  },
});

const versionSelector = (state: RootState) => state.version;

const hasUpdateSelector = createSelector(versionSelector, (state) =>
  Boolean(state?.result?.isNeeded),
);

export class VersionSelectors {
  static hasUpdate = hasUpdateSelector;
}

export default versionSlice;
