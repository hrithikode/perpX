type Props = {
  quantity: string;

  setQuantity: (
    value: string
  ) => void;

  leverage: number;

  setLeverage: (
    value: number
  ) => void;

  estimatedMargin: string;

  handleCreateOrder: (
    side: "long" | "short",
    quantity: string,
    leverage: number
  ) => void;

  isLoading: boolean;
};

const TradeForm = ({
  quantity,
  setQuantity,
  leverage,
  setLeverage,
  estimatedMargin,
  handleCreateOrder,
  isLoading
}: Props) => {
  return (
    <>
      <div className="space-y-2">
        <label className="text-sm text-zinc-400">
          Quantity (BTC)
        </label>

        <input
          type="number"
          placeholder="0.01"
          value={quantity}
          onChange={(e) =>
            setQuantity(
              e.target.value
            )
          }
          className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 outline-none"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-zinc-400">
          Leverage
        </label>

        <select
          value={leverage}
          onChange={(e) =>
            setLeverage(
              Number(
                e.target.value
              )
            )
          }
          className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 outline-none"
        >
          {[1, 2, 5, 10].map(
            (value) => (
              <option
                key={value}
                value={value}
              >
                {value}x
              </option>
            )
          )}
        </select>
      </div>

      <div className="bg-zinc-800 rounded-xl p-4">
        <p className="text-zinc-400 text-sm">
          Estimated Required Margin
        </p>

        <h2 className="text-3xl font-bold mt-2">
          ${estimatedMargin}
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() =>
            handleCreateOrder(
              "long",
              quantity,
              leverage
            )
          }
          disabled={isLoading}
          className="bg-green-500 text-black font-bold p-3 rounded-xl"
        >
          {isLoading
            ? "Creating..."
            : "Long"}
        </button>

        <button
          onClick={() =>
            handleCreateOrder(
              "short",
              quantity,
              leverage
            )
          }
          disabled={isLoading}
          className="bg-red-500 text-white font-bold p-3 rounded-xl"
        >
          {isLoading
            ? "Creating..."
            : "Short"}
        </button>
      </div>
    </>
  );
};

export default TradeForm;