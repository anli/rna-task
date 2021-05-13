import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import React from 'react';
import App from './app';

const defaultUser: Partial<FirebaseAuthTypes.User> = {
  displayName: 'Joe',
};

const mockedOnAuthStateChanged = jest
  .fn()
  .mockImplementation((cb: any) => cb(defaultUser));

jest.mock('@react-native-firebase/auth', () => ({
  __esModule: true,
  default: () => ({onAuthStateChanged: mockedOnAuthStateChanged}),
}));

describe('App', () => {
  beforeEach(() => {
    mockedOnAuthStateChanged.mockImplementation((cb: any) => cb(defaultUser));
    jest.clearAllMocks();
  });

  it('I am logged in', async () => {
    const {getByText} = render(<App />);
    await waitFor(() => expect(getByText('Can do')).toBeDefined());

    expect(getByText('Can do')).toBeDefined();
    expect(getByText('Today')).toBeDefined();
    expect(getByText('Previously')).toBeDefined();
    expect(getByText('All')).toBeDefined();
  });

  it('I am logged out', async () => {
    mockedOnAuthStateChanged.mockImplementation((cb: any) => cb(null));

    const {getByA11yLabel} = render(<App />);
    await waitFor(() => expect(getByA11yLabel('Google Login')).toBeDefined());

    expect(getByA11yLabel('Google Login')).toBeDefined();
  });

  it('Press Add Task Bottom Tab Button', async () => {
    const {getByA11yLabel} = render(<App />);
    await waitFor(() => expect(getByA11yLabel('Add Task')).toBeDefined());
    fireEvent.press(getByA11yLabel('Add Task'));
  });
});
