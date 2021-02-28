import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {RootState} from './store';

// const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default class useApp {
  // static dispatch = useAppDispatch;
  static selector = useAppSelector;
}
