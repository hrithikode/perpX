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

type Props = {
  closedOrders: Order[];
};

export default function OrderHistory({
  closedOrders
}: Props) {
  return (
    <>
      {/* paste JSX here */}


<div className="mt-8 space-y-4">
  <h2 className="text-xl font-semibold">
    Order History
  </h2>

  {closedOrders.map((order) => (
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
          {order.symbol}
        </p>
      </div>

      <div className="text-right">
        <p className="font-bold">
          PnL: {(order.pnl || 0) / 100} USDT
        </p>

        <p className="text-sm text-zinc-400">
          Closed
        </p>
      </div>
    </div>
  ))}
</div>
    </>
  );
}