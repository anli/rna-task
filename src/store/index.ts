import {
  AppDispatch as AppDispatchNative,
  RootState as RootStateNative,
} from './store';
export {useAppDispatch, useAppSelector} from './hooks';
export {default, reducer} from './store';

export type RootState = RootStateNative;
export type AppDispatch = AppDispatchNative;
