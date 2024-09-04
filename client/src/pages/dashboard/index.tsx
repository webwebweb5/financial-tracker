import { SignedIn, UserButton, useUser } from "@clerk/clerk-react";
import { GiMoneyStack } from "react-icons/gi";
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

  const [integerPart, decimalPart] = totalMonthly
    .toFixed(2)
    .split(".");

  const textColor = totalMonthly > 0 ? "text-green-500" : "text-red-500";

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

        <div className="border border-neutral-700 mb-2 mt-2" />

        <div className="h-56 flex justify-center items-center flex-col">
          <h1 className="text-center text-gray-500 dark:text-gray-400">
            Spent this month
          </h1>
          <div className={`flex justify-center mt-5 ${textColor}`}>
            <h1 className="text-4xl font-bold">{"$ "}</h1>
            <h1 className="text-center text-6xl">{integerPart}</h1>
            <h1 className="text-center text-4xl">.{decimalPart}</h1>
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

