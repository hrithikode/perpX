"use client";

import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

type Props = {
  balance: number;
};

export default function Header({
  balance,
}: Props) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await api.post("api/auth/logout");

      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header className="h-16 border-b px-6 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold">
          PerpX
        </h1>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex flex-col">
          <p className="text-xs">
            Balance
          </p>

          <p className="font-semibold text-lg">
            ${balance}
          </p>
        </div>

        <div>
          <Button 
            className="cursor-pointer"
            onClick={handleLogout}>Logout</Button>
        </div>
      </div>
    </header>
  );
}