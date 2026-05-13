type Props = {
  btcPrice: number;
};

export default function Header({
  btcPrice
}: Props) {
  return (
    <>
      {/* paste JSX here */}

      <div>
          <h1 className="text-3xl font-bold">
            BTC-USDT
          </h1>

          <p className="text-zinc-400 mt-1">
            Live Price: ${btcPrice}
          </p>

          <p className="text-sm text-zinc-500 mt-2">
            Estimated margin shown here.
            Final margin is validated by backend.
          </p>
        </div>
    </>
  );
}
