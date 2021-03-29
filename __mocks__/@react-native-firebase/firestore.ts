export const mockFirestoreAdd = jest.fn().mockResolvedValue(true);
export const mockFirestoreDelete = jest.fn().mockResolvedValue(true);
export const mockFirestoreUpdate = jest.fn().mockResolvedValue(true);

const firestore = jest.fn().mockReturnValue({
  collection: jest.fn().mockReturnValue({
    onSnapshot: jest.fn((callback) => {
      const query = {
        docs: [
          {id: 'idA', data: () => ({name: 'Task A'})},
          {id: 'idB', data: () => ({name: 'Task B'})},
        ],
      };
      callback(query);
      return jest.fn();
    }),
    add: mockFirestoreAdd,
    doc: jest.fn().mockReturnValue({
      delete: mockFirestoreDelete,
      update: mockFirestoreUpdate,
    }),
  }),
});

export const firebase = {
  auth: jest.fn().mockReturnValue({
    currentUser: {
      uid: 'USER_UID',
    },
  }),
};

export default firestore;
