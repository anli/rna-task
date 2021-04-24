import {unwrapResult} from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';

export enum STATUS {
  IDLE,
  LOADING,
}

const dispatchAsyncAction = async ({setStatus, dispatch, action}: any) => {
  try {
    setStatus && setStatus(STATUS.LOADING);
    const action$ = await dispatch(action);
    await unwrapResult(action$);
    setStatus && setStatus(STATUS.IDLE);
    return true;
  } catch ({message}) {
    setStatus && setStatus(STATUS.IDLE);
    Toast.show({
      type: 'error',
      text2: message,
    });
    return false;
  }
};

export default dispatchAsyncAction;
