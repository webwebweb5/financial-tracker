export interface FinancialRecord {
  _id?: string;
  userId: string;
  date?: string;
  // date: Date;
  description: string;
  amount: number;
  category: string;
  paymentMethod: string;
}

export interface FinancialRecordsContextType {
  records: FinancialRecord[];
  addRecord: (record: FinancialRecord) => void;
  updateRecord: (id: string, newRecord: FinancialRecord) => void;
  deleteRecord: (id: string) => void;
  isLoading: boolean;
}

export interface DateChartData {
  date: string;
  income: number;
  expense: number;
}

export interface MonthChartData {
  month: string;
  income: number;
  expense: number;
}
