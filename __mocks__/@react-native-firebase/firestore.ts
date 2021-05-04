export const mockFirestoreAdd = jest.fn().mockResolvedValue(true);
export const mockFirestoreDelete = jest.fn().mockResolvedValue(true);
export const mockFirestoreUpdate = jest.fn().mockResolvedValue(true);
export const mockFirestoreSet = jest.fn().mockResolvedValue(true);

const firestore = jest.fn().mockReturnValue({
  collection: jest.fn().mockReturnValue({
    onSnapshot: jest.fn((callback) => {
      const query = {
        docs: [
          {
            id: 'idA',
            data: () => ({name: 'Task A', date: '2021-04-10'}),
          },
          {id: 'idB', data: () => ({name: 'Task B'})},
          {
            id: 'idC',
            data: () => ({name: 'Task C', date: '2021-04-09'}),
          },
          {
            id: 'CompletedTaskId',
            data: () => ({
              name: 'Completed Task',
              date: '2021-04-09',
              isCompleted: true,
            }),
          },
          {
            id: 'ScheduledTaskId',
            data: () => ({
              name: 'Scheduled Task',
              date: '2021-04-09',
              schedule: {frequency: 2, period: 'week'},
            }),
          },
          {
            id: 'ObsoleteTask',
            data: () => ({
              name: 'Obsolete Task',
              date: '2021-04-02',
              isCompleted: true,
            }),
          },
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
    where: jest.fn().mockReturnValue({
      where: jest.fn().mockReturnValue({
        get: jest.fn().mockReturnValue({
          forEach: (callback: any) => {
            callback({ref: 'REF'});
          },
        }),
      }),
    }),
  }),
  doc: jest.fn().mockReturnValue({
    onSnapshot: jest.fn((callback) => {
      const query = {
        data: () => ({
          filter: 'all',
        }),
      };
      callback(query);
      return jest.fn();
    }),
    set: mockFirestoreSet,
  }),
  batch: jest.fn().mockReturnValue({
    delete: jest.fn(),
    commit: jest.fn(),
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
