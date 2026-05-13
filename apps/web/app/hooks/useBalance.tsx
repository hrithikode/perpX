import { useEffect, useState } from "react";
import api from "../lib/axios";

export default function useBalance() {
  const [balance, setBalance] =
    useState(0);

  const fetchBalance =
    async () => {
      try {
        const response =
          await api.get(
            "/balance"
          );
console.log(response.data)
        setBalance(
          response.data
            .availableBalance
        );
      } catch (error) {
        console.error(
          error
        );
      }
    };

  useEffect(() => {
    fetchBalance();
  }, []);

  return {
    balance,
    fetchBalance
  };
}