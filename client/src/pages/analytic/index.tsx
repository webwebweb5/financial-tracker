import { RecordBarChart } from "../../components/charts/record-bar-chart";
import TopNavigation from "../../components/top-navigation";
import { useFinancialRecords } from "../../context/financial-record-context";
import { formatRecordsToMonthChartData } from "../../utils/format-chart";

export default function AnalyticPage() {
  const { records } = useFinancialRecords();

  const chartData = formatRecordsToMonthChartData(records);

  return (
    <div className="flex flex-col w-full">
      <TopNavigation />
      <RecordBarChart chartData={chartData} />
    </div>
  );
}
