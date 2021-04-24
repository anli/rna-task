import {useEffect, useState} from 'react';
import VersionCheck from 'react-native-version-check';

enum STATUS {
  IDLE,
  LOADING,
}

type UpdateNeeded = {
  isNeeded: boolean;
  currentVersion: string;
  latestVersion: string;
  storeUrl: string;
};

interface Props {
  depth: number;
}

const useUpdateNeeded = ({depth}: Props) => {
  const [status, setStatus] = useState<STATUS>(STATUS.IDLE);
  const [data, setData] = useState<UpdateNeeded | undefined>(undefined);

  useEffect(() => {
    const checkVersion = async () => {
      setStatus(STATUS.LOADING);
      const result = await VersionCheck.needUpdate({depth});

      setData(result);
      setStatus(STATUS.IDLE);
    };

    checkVersion();
  }, [depth]);

  const isLoading = status === STATUS.LOADING;

  return {data, isLoading};
};

export default useUpdateNeeded;
