import {createAsyncThunk} from '@reduxjs/toolkit';
import VersionCheck from 'react-native-version-check';

const checkUpdate = createAsyncThunk('version/checkUpdate', async () => {
  const result = await VersionCheck.needUpdate({depth: 3});
  return result;
});

class VersionActions {
  static checkUpdate = checkUpdate;
}

export default VersionActions;
