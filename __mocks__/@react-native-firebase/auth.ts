const auth = jest.fn().mockReturnValue({
  onAuthStateChanged: jest.fn((callback) => {
    callback({uid: 'USER_ID', email: 'user@email.com'});
  }),
});

export default auth;
