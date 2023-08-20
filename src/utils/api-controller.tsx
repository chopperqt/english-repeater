import { useRef, useState } from "react";

interface UseRequestStatus<T> {
  callback: () => Promise<T | null>;
  shouldPending?: boolean;
}

/**
 * Создаеём экземпляк запроса, сохраняя состояние загрузки.
 */
export const ApiController = <T,>({
  callback,
  shouldPending = true,
}: UseRequestStatus<T>) => {
  const [isLoading, setLoading] = useState(false);
  const [isFetched, setFetched] = useState(false);
  const [error, setError] = useState("");

  const handleRequest = async () => {
    if (shouldPending) {
      setLoading(true);
    }

    try {
      const response = await callback();

      if (!response) {
        setLoading(false);

        return null;
      }

      setLoading(false);

      return response;
    } catch (e: any) {
      setLoading(false);
      setError(e?.message);

      return null;
    } finally {
      setFetched(true);
    }
  };

  const handleReset = () => {
    setFetched(false);
    setLoading(false);
    setError("");
  };

  return {
    isLoading,
    isFetched,
    error,
    handleRequest,
    handleReset,
  };
};
