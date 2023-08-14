import { useRef } from "react";

interface UseRequestStatus<T> {
  callback: () => Promise<T | null>;
}

export const useRequestStatus = <T,>({ callback }: UseRequestStatus<T>) => {
  const isLoading = useRef(false);

  const handleLoadData = async () => {
    isLoading.current = true;

    const response = await callback();

    if (!response) {
      isLoading.current = false;

      return null;
    }

    isLoading.current = false;

    return response;
  };

  return {
    isLoading: isLoading.current,
    handleLoadData,
  };
};
