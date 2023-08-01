import { useEffect, useState } from "react";

const KEY =
  process.env.REACT_APP_BROADCAST_TOKEN ||
  "55541b06-611d-478e-b2d7-028bc3d41eff";

const broadcast = new BroadcastChannel(KEY);

export const useConnect = () => {
  const [isConnected, setConnected] = useState(false);

  useEffect(() => {
    broadcast.postMessage({
      isConnected: true,
    });

    setConnected(true);
  }, []);

  return {
    isConnected,
  };
};
