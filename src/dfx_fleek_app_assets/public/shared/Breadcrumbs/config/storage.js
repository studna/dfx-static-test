import { storageRoot, storageBucket, storageItemPath } from '../resolvers';


const storage = [
  {
    path: '/teams/:teamId/storage',
    resolvers: [],
    defaultConfig: [storageRoot],
  },
  {
    path: '/teams/:teamId/storage/:bucketName',
    resolvers: [],
    defaultConfig: [storageRoot, storageBucket],
  },
  {
    path: '/teams/:teamId/storage/:bucketName/(object|folder)/*',
    resolvers: [],
    defaultConfig: [storageRoot, storageBucket, storageItemPath],
  },
];

export default storage;
