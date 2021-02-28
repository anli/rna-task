import {useApp} from '@store';
import {TaskSelectors} from './../../task/taskSlice';

const useTask = () => {
  return {data: useApp.selector(TaskSelectors.selectData)};
};

export default useTask;
