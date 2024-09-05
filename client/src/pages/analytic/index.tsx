import { RecordBarChart } from "../../components/charts/record-bar-chart";
import TopNavigation from "../../components/top-navigation";
import { useFinancialRecords } from "../../context/financial-record-context";
import { formatRecordsToMonthChartData } from "../../utils/format-chart";

export default function AnalyticPage() {
  const { records } = useFinancialRecords();

  console.log(records);

  const chartData = formatRecordsToMonthChartData(records);

  return (
    <div className="flex flex-col w-full">
      <TopNavigation />
      {records.length !== 0 ? (
        <RecordBarChart chartData={chartData} />
      ) : (
        <div className="flex justify-center items-center h-full">
          <div>No Records.</div>
        </div>
      )}
    </div>
  );
}
