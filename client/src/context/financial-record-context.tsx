import { useUser } from "@clerk/clerk-react";
import { createContext, useContext, useEffect, useState } from "react";
import { FinancialRecord, FinancialRecordsContextType } from "../types";

export const FinancialRecordsContext = createContext<
  FinancialRecordsContextType | undefined
>(undefined);

export const FinancialRecordsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [records, setRecords] = useState<FinancialRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useUser();

  const fetchRecords = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/financial-records/getAllByUserID/${user.id}`
      );

      if (response.ok) {
        const records = await response.json();
        setRecords(records);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [user]);

  const addRecord = async (record: FinancialRecord) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/financial-records`, {
      method: "POST",
      body: JSON.stringify(record),
      headers: {
        "Content-Type": "application/json",
      },
    });

    try {
      if (response.ok) {
        const newRecord = await response.json();
        setRecords((prev) => [...prev, newRecord]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateRecord = async (id: string, newRecord: FinancialRecord) => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API}/financial-records/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(newRecord),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    try {
      if (response.ok) {
        const newRecord = await response.json();
        setRecords((prev) =>
          prev.map((record) => {
            if (record._id === id) {
              return newRecord;
            } else {
              return record;
            }
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteRecord = async (id: string) => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API}/financial-records/${id}`,
      {
        method: "DELETE",
      }
    );

    try {
      if (response.ok) {
        const deletedRecord = await response.json();
        setRecords((prev) =>
          prev.filter((record) => record._id !== deletedRecord._id)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FinancialRecordsContext.Provider
      value={{ records, addRecord, updateRecord, deleteRecord, isLoading }}
    >
      {children}
    </FinancialRecordsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFinancialRecords = () => {
  const context = useContext<FinancialRecordsContextType | undefined>(
    FinancialRecordsContext
  );

  if (!context) {
    throw new Error(
      "useFinancialRecords must be used within a FinancialRecordsProvider"
    );
  }

  return context;
};
