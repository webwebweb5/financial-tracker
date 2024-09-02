import { SignedIn, UserButton, useUser } from "@clerk/clerk-react";
import { GiMoneyStack } from "react-icons/gi";
import FinancialRecordForm from "./financial-record-form";
import { useFinancialRecords } from "../../context/financial-record-context";
import { useEffect, useMemo } from "react";
import Loading from "../../components/loading";
import { DataTable } from "../../components/record-table/data-table";
import { columns } from "../../components/record-table/columns";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const { records } = useFinancialRecords();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !user) {
      navigate("/auth");
    }
  }, [isLoaded, user, navigate]);

  const totalMonthly = useMemo(() => {
    let totalAmount = 0;
    records.forEach((record) => {
      totalAmount += record.amount;
    });

    return parseFloat(totalAmount.toFixed(2));
  }, [records]);

  if (!isLoaded) return <Loading />;

  return (
    <main className="max-w-[78rem] mx-auto p-4 overflow-auto">
      <div className="gap-4 flex flex-col">
        <div className="flex">
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

          <div className="flex-1 flex justify-center items-center">
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>

        <div className="border border-neutral-700 mb-5 mt-2" />

        <FinancialRecordForm />

        <div className="my-4 bg-[#1C1C1C] rounded-lg text-neutral-300">
          <div className="hover:bg-neutral-800 rounded-lg duration-200 transition-all ease-in p-4">
            <div className="flex text-2xl gap-x-3">฿ {totalMonthly}</div>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={records}
          totalMonthly={totalMonthly}
        />
      </div>
    </main>
  );
}
