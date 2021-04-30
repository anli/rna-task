export const firebase = {
  analytics: jest.fn().mockReturnValue({
    logEvent: jest.fn(),
    logLogin: jest.fn(),
  }),
};
