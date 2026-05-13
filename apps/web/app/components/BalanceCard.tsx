type Props = {
  balance: number;
};

export default function BalanceCard({
  balance
}: Props) {
  return (
    <p className="text-sm text-green-400 mt-2">
      Available Balance: ${balance}
    </p>
  );
}