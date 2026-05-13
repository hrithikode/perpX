"use client";

import React, {
  useState,
  useEffect
} from "react";

import Header from "./components/Header";
import TradeForm from "./components/TradeForm";
import OpenOrders from "./components/OpenOrders";
import OrderHistory from "./components/OrderHistory";
import BalanceCard from "./components/BalanceCard";
import StatusMessage from "./components/StatusMessage";

import useLivePrice from "./hooks/useLivePrice";
import useBalance from "./hooks/useBalance";
import useOrders from "./hooks/useOrders";

export default function Home() {
  /*
    Live BTC price from WebSocket
  */
  const { btcPrice } =
    useLivePrice();

  /*
    User balance
  */
  const {
    balance,
    fetchBalance
  } = useBalance();

  /*
    Trade form state
  */
  const [quantity, setQuantity] =
    useState("");

  const [leverage, setLeverage] =
    useState(1);

  /*
    UI message state
  */
  const [message, setMessage] =
    useState("");

  /*
    Loading state
  */
  const [isLoading, setIsLoading] =
    useState(false);

  /*
    Orders hook
  */
  const {
    openOrders,
    closedOrders,
    handleCreateOrder,
    handleCloseOrder
  } = useOrders(
    fetchBalance,
    setMessage,
    setIsLoading
  );

  /*
    Estimated margin preview
  */
  const estimatedMargin =
    quantity && leverage
      ? (
          (Number(quantity) *
            btcPrice) /
          leverage
        ).toFixed(2)
      : "0";

  /*
    Auto-clear message
  */
  useEffect(() => {
    if (!message) return;

    const timer =
      setTimeout(() => {
        setMessage("");
      }, 3000);

    return () =>
      clearTimeout(timer);
  }, [message]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">

        <Header
          btcPrice={btcPrice}
        />

        <BalanceCard
          balance={balance}
        />

        <StatusMessage
          message={message}
        />

        <TradeForm
          quantity={quantity}
          setQuantity={setQuantity}
          leverage={leverage}
          setLeverage={setLeverage}
          estimatedMargin={
            estimatedMargin
          }
          handleCreateOrder={
            handleCreateOrder
          }
          isLoading={isLoading}
        />

        <OpenOrders
          openOrders={openOrders}
          handleCloseOrder={
            handleCloseOrder
          }
          isLoading={isLoading}
        />

        <OrderHistory
          closedOrders={
            closedOrders
          }
        />
      </div>
    </div>
  );
}