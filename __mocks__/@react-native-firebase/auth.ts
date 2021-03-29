const auth = jest.fn().mockReturnValue({
  onAuthStateChanged: jest.fn((callback) => {
    callback({uid: 'USER_ID'});
  }),
});

export default auth;
