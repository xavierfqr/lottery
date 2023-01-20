import { contractABI } from '@/utils/contract';
import { ethers } from 'ethers';
import { useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';

const defaultConfig = {
  address: '0x72597C6B3d24a5712DCEf6F46eD589eA899A8A50',
  abi: contractABI,
};

interface ReturnFunctionName {
  lastWinner: string;
  participate: string;
  getParticipantsCount: string;
  test: string;
}

type FunctionName = 'participate' | 'lastWinner' | 'getParticipantsCount' | 'test';

export const useLotteryRead = <T extends FunctionName>(functionName: T) => {
  const {
    data: rawData,
    isError,
    isLoading,
  } = useContractRead({
    ...defaultConfig,
    functionName,
  });
  const data = rawData as ReturnFunctionName[T];

  return { data, isError, isLoading };
};

export const useLotteryWithoutParameter = (functionName: FunctionName, value = '0') => {
  const { config } = usePrepareContractWrite({
    ...defaultConfig,
    functionName,
    overrides: {
      value: ethers.utils.parseEther(value),
    },
  });

  const { data: writeData, write, error, isSuccess, isError, isIdle } = useContractWrite(config);
  const { isLoading, data } = useWaitForTransaction({
    hash: writeData?.hash,
  });

  return { data, write, isLoading, isSuccess, error, isError, isIdle };
};
