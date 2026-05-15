"use client";

type Props = {
  balance: number;
  loading: boolean;
};

export default function Header({
  balance,
  loading,
}: Props) {
  return (
    <header className="h-16 border-b px-6 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold">
          PerpX
        </h1>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex flex-col">
          <p className="text-xs text-muted-foreground">
            Balance
          </p>

          <p className="font-semibold text-lg">
            {loading
              ? "Loading..."
              : `$${balance}`}
          </p>
        </div>
      </div>
    </header>
  );
}