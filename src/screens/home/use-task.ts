import {useApp} from '@store';
import {TaskSelectors} from '@task';

const useTask = () => {
  return {data: useApp.selector(TaskSelectors.selectAll)};
};

export default useTask;
