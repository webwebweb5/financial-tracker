import { useUser } from "@clerk/clerk-react";
import { GiMoneyStack } from "react-icons/gi";
import FinancialRecordForm from "./financial-record-form";
import FinancialRecordList from "./financial-record-list";

export default function DashboardPage() {
  const { user } = useUser();
  return (
    <main className="max-w-[78rem] mx-auto p-4">
      <div className="gap-4 flex flex-col">
        <div className="rounded-lg flex gap-x-6 p-4">
          <GiMoneyStack className="text-6xl text-neutral-50" />

          <div>
            <h1 className="text-2xl font-medium text-neutral-300">
              Welcome,{" "}
              <span className="text-sm text-neutral-400">
                {user?.firstName}
              </span>
            </h1>
            <p className="max-w-sm text-neutral-400 text-sm">
              Track your spending, save smartly, and <br />
              achieve your financial goals with ease.
            </p>
          </div>
        </div>

        <div className="border border-neutral-700 my-5" />

        <FinancialRecordForm />

        <div className="border border-neutral-700 my-4" />

        <div className="my-4 bg-[#1C1C1C] rounded-lg text-neutral-400">
          <div className="hover:bg-neutral-800 rounded-lg duration-200 transition-all ease-in p-4">
            <div className="flex text-2xl gap-x-3">
              $ 999
            </div>
          </div>
        </div>

        <FinancialRecordList />
      </div>
    </main>
  );
}
