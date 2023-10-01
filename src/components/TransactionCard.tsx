import { type Transaction } from "@prisma/client";
import React from "react";

export default function TransactionCard({ transaction }: { transaction: Transaction }) {
  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20">
      <div className="flex items-center justify-between">
        <h3 className="text-md">{transaction.name}</h3>
        <div className="flex flex-col items-center">
        <h5 className="font-bold">
          €{String(Number(transaction.value).toFixed(2))}
        </h5>
        <div className="text-sm text-purple-300">{transaction.category}</div>
        </div>
      </div>
    </div>
  );
}
