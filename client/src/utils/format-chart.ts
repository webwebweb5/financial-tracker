import { DateChartData, FinancialRecord, MonthChartData } from "../types";

// ----------------------------------------------------------------------

export const formatDateToMonth = (dateString: string | undefined): string => {
  if (!dateString) return ""; // Fallback if date is undefined

  const date = new Date(dateString);

  // Format the date to extract only the full month name
  return date.toLocaleDateString("en-US", {
    month: "long",
  });
};

// Function to convert the raw records into chart data grouped by month
export const formatRecordsToMonthChartData = (
  records: FinancialRecord[]
): MonthChartData[] => {
  return records.reduce((acc: MonthChartData[], transaction) => {
    const month = formatDateToMonth(transaction.date); // Extract the month from the date
    const amount = transaction.amount;
    const income = amount > 0 ? amount : 0; // If the amount is positive, it's income
    const expense = amount < 0 ? -amount : 0; // If the amount is negative, convert to positive for expense

    if (month) {
      // Check if the month already exists in the accumulator
      const existingEntry = acc.find((entry) => entry.month === month);

      if (existingEntry) {
        // If the month exists, add the values to the existing entry
        existingEntry.income += income;
        existingEntry.expense += expense;
      } else {
        // If the month doesn't exist, create a new entry
        acc.push({ month, income, expense });
      }
    }

    return acc;
  }, []);
};

// ----------------------------------------------------------------------

export const formatDateToLocale = (dateString: string | undefined): string => {
  if (!dateString) return ""; // Fallback if date is undefined

  const date = new Date(dateString);

  // Format the date using toLocaleDateString with custom options for month and day
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

export const formatRecordsToDateChartData = (
  records: FinancialRecord[]
): DateChartData[] => {
  return records.reduce((acc: DateChartData[], transaction) => {
    const date = formatDateToLocale(transaction.date); // Ensure date is a string or provide fallback
    const amount = transaction.amount;
    const income = amount > 0 ? amount : 0; // If the amount is positive, it's income
    const expense = amount < 0 ? -amount : 0; // If the amount is negative, convert to positive for expense

    if (date) {
      // Check if the date already exists in the accumulator
      const existingEntry = acc.find((entry) => entry.date === date);

      if (existingEntry) {
        // If the date exists, add the values to the existing entry
        existingEntry.income += income;
        existingEntry.expense += expense;
      } else {
        // If the date doesn't exist, create a new entry
        acc.push({ date, income, expense });
      }
    }

    return acc;
  }, []);
};
