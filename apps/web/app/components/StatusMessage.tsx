type Props = {
  message: string;
};

export default function StatusMessage({
  message
}: Props) {
  if (!message) return null;

  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-3">
      <p className="text-sm text-blue-400 font-medium">
        {message}
      </p>
    </div>
  );
}