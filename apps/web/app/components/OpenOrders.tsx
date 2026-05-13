type Order = {
  id: string;
  symbol: string;
  side: "long" | "short";
  leverage: number;
  qty: number;
  qtyDecimals: number;
};

type Props = {
  openOrders: Order[];

  handleCloseOrder: (
    orderId: string
  ) => void;
  isLoading: boolean;
};

export default function OpenOrders({
  openOrders,
  handleCloseOrder,
  isLoading
}: Props) {
  return (
    <>
       <div className="space-y-3">
  <h2 className="text-xl font-semibold">
    Open Orders
  </h2>

  {openOrders.map((order) => (
    <div
      key={order.id}
      className="bg-zinc-800 rounded-xl p-4 flex items-center justify-between"
    >
      <div>
        <p
          className={`font-semibold ${
            order.side === "long"
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {String(order.side).toUpperCase()}
        </p>

        <p className="text-sm text-zinc-400">
          {order.symbol} •{" "}
          {order.qty /
            Math.pow(
              10,
              order.qtyDecimals
            )} BTC
        </p>
      </div>

      <div className="text-right space-y-2">
  <p className="font-bold">
    {order.leverage}x
  </p>

  <p className="text-sm text-zinc-400">
    Leverage
  </p>

  <button
    disabled={isLoading}
    onClick={() =>
      handleCloseOrder(order.id)
    }
    className="bg-red-500 text-white px-4 py-1 rounded-lg text-sm font-semibold"
  >
    Close
  </button>
</div>
    </div>
  ))}
</div>

    </>
  );
}