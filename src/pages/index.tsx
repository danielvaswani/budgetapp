import Head from "next/head";
import AddTransaction from "~/components/AddTransaction";
import AuthShowcase from "~/components/AuthShowcase";
import PieChart from "~/components/PieChart";
import TransactionCard from "~/components/TransactionCard";

import { api } from "~/utils/api";

export default function Home() {
  const transactions = api.transaction.getAll.useQuery();

  const balance = transactions.data?.reduce(
    (acc, transaction) => acc + Number(transaction.value),
    0,
  );

  let pieData =
    transactions.data?.map((transaction) => ({
      category: transaction.category,
      value: Number(transaction.value),
    })) ?? [];

  pieData = [
    ...pieData,
    { category: balance! < 0 ? "Debt" : "Remaining", value: balance },
  ]
    .filter((t) => t.category !== "Income")
    .map((t) => ({ category: t.category, value: Math.abs(t.value!) }));

  return (
    <>
      <Head>
        <title>Budget App v0</title>
        <meta name="description" content="Daniel Vaswani" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <PieChart width={500} height={500} transactions={pieData} />
        <div className="container flex flex-col items-center justify-center gap-3 px-4 py-16 ">
          <div className="text-5xl">Your Balance</div>
          <div className="text-4xl">€{balance?.toFixed(2)}</div>
          { balance! < 0 && <div className="text-sm">Total Income: €{
            transactions.data
            ?.filter((t) => t.category === "Income")
            .reduce(
              (acc, transaction) => acc + Number(transaction.value),
              0,
            )?.toFixed(2)
          }</div>}

          <AddTransaction></AddTransaction>
          {transactions.data
            ?.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
            )
            .map((transaction) => {
              return (
                <div className="w-full" key={transaction.id}>
                  <TransactionCard transaction={transaction}></TransactionCard>
                </div>
              );
            })}

          <AuthShowcase />
        </div>
      </main>
    </>
  );
}
