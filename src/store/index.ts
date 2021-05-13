import {
  AppDispatch as AppDispatchNative,
  RootState as RootStateNative,
} from './store';
export {useAppDispatch, useAppSelector} from './hooks';
export {default, persistedReducer, persistor, reducer} from './store';

export type RootState = RootStateNative;
export type AppDispatch = AppDispatchNative;
