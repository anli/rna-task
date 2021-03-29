/* istanbul ignore file */

import React from 'react';
import ToastNative from 'react-native-toast-message';

const Toast = () => {
  return <ToastNative ref={(ref) => ToastNative.setRef(ref)} />;
};

export default Toast;
