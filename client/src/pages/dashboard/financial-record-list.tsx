import { FinancialRecord } from "../../types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

interface FinancialRecordListProps {
  records: FinancialRecord[];
  totalMonthly: number;
}

export default function FinancialRecordList({
  records,
  totalMonthly,
}: FinancialRecordListProps) {
  return (
    <Table className="relative">
      <TableCaption>A list of your recent records.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Description</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Method</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {records?.map((record) => (
          <TableRow key={record._id}>
            <TableCell className="font-medium">{record.description}</TableCell>
            <TableCell>{record.amount}</TableCell>
            <TableCell>{record.category}</TableCell>
            <TableCell>{record.paymentMethod}</TableCell>
            <TableCell>
              {new Date(record.date).toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">$ {totalMonthly}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
