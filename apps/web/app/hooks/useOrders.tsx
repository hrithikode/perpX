import { useEffect, useState } from "react";
import api from "../lib/axios";
import axios from "axios";

type Order = {
  id: string;
  symbol: string;
  side: "long" | "short";
  leverage: number;
  qty: number;
  qtyDecimals: number;

  status: "open" | "closed";
  pnl?: number | null;
  closedAt?: string | null;
};

export default function useOrders(
  fetchBalance: () => Promise<void>,
  setMessage: ( Message: string ) => void,
  setIsLoading: ( value: boolean) => void
) {
  const [
    openOrders,
    setOpenOrders
  ] = useState<Order[]>([]);

  const [
    closedOrders,
    setClosedOrders
  ] = useState<Order[]>([]);

  const fetchOrders =
    async () => {
      try {
        const response =
          await api.get(
            "/trade/orders"
          );

        setOpenOrders(
          response.data
            .openOrders
        );

        setClosedOrders(
          response.data
            .closedOrders
        );
      } catch (error) {
        console.error(
          error
        );
      }
    };

  const handleCreateOrder =
    async (
      side:
        | "long"
        | "short",
      quantity: string,
      leverage: number
    ) => {
      try {
        setIsLoading(true)
        await api.post(
          "/trade/create",
          {
            symbol:
              "BTCUSDT",
            side,
            qty: Number(
              quantity
            ),
            leverage
          }
        );

        await fetchOrders();
        await fetchBalance();
      } catch (
        error: unknown
      ) {
        if (
          axios.isAxiosError(
            error
          )
        ) {
          console.error(
            error
          );
        }

        setMessage("order creation failed");
      } finally {
        setIsLoading(false);
      }
    };

  const handleCloseOrder =
    async (
      orderId: string
    ) => {
      try {
        await api.post(
          `/trade/close/${orderId}`
        );

        await fetchOrders();
        await fetchBalance();
      } catch (error) {
        console.error(
          error
        );

        setMessage("close order failed")
      } finally{
        setIsLoading(false)
      }
    };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    openOrders,
    closedOrders,
    handleCreateOrder,
    handleCloseOrder,
    fetchOrders
  };
}