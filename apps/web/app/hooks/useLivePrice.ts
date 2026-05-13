import { useEffect, useState } from "react";

export default function useLivePrice() {
  const [btcPrice, setBtcPrice] =
    useState(0);

  useEffect(() => {
    const ws =
      new WebSocket(
        "ws://localhost:8080"
      );

    ws.onopen = () => {
      console.log(
        "WebSocket connected"
      );
    };

    ws.onmessage = (
      event
    ) => {
      const data =
        JSON.parse(
          event.data
        );

      setBtcPrice(
        Number(data.price)
      );
    };

    ws.onerror = (
      error
    ) => {
      console.log(
        "WebSocket error:",
        error
      );
    };

    return () => {
      ws.close();
    };
  }, []);

  return {
    btcPrice
  };
}