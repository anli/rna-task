import {renderApp} from '@test';
import ReactNativeDeviceInfo from 'react-native-device-info';
import SettingScreen from './setting';

describe('Setting Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('See UI', () => {
    jest.spyOn(ReactNativeDeviceInfo, 'getVersion').mockReturnValue('1.0.0');

    const {getByText} = renderApp({
      Component: SettingScreen.Component,
      navigationOptions: SettingScreen.options,
    });

    expect(getByText('1.0.0')).toBeDefined();
    expect(getByText('user@email.com')).toBeDefined();
  });
});
