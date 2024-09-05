import { useUser } from "@clerk/clerk-react";
import { createContext, useContext, useEffect, useState } from "react";
import {
  FinancialRecord,
  FinancialRecordsContextType,
  ICategory,
} from "../types";
import { useToast } from "../hooks/use-toast";

export const FinancialRecordsContext = createContext<
  FinancialRecordsContextType | undefined
>(undefined);

export const FinancialRecordsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [records, setRecords] = useState<FinancialRecord[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useUser();
  const { toast } = useToast();

  const fetchRecords = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/financial-records/getAllByUserID/${
          user.id
        }`
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

  const fetchCategories = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/category/getAllCategories/${
          user.id
        }`
      );

      if (response.ok) {
        const categories = await response.json();
        setCategories(categories);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
    fetchCategories();
  }, [user]);

  const addRecord = async (record: FinancialRecord) => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API}/financial-records`,
      {
        method: "POST",
        body: JSON.stringify(record),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    try {
      if (response.ok) {
        const newRecord = await response.json();
        setRecords((prev) => [...prev, newRecord]);
        toast({
          variant: "success",
          description: "Add Record Successfully",
        });
      }
    } catch (err) {
      console.log(err);
      // TODO: fix err backend
      toast({
        variant: "destructive",
        description: "Uh oh! Something went wrong.",
      });
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
        toast({
          variant: "success",
          description: "Update Record Successfully",
        });
      }
    } catch (err) {
      console.log(err);
      // TODO: fix err backend
      toast({
        variant: "destructive",
        description: "Uh oh! Something went wrong.",
      });
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
        toast({
          variant: "success",
          description: "Delete Record Successfully",
        });
      }
    } catch (err) {
      console.log(err);
      // TODO: fix err backend
      toast({
        variant: "destructive",
        description: "Uh oh! Something went wrong.",
      });
    }
  };

  const createCategory = async (category: ICategory) => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API}/category/create`,
      {
        method: "POST",
        body: JSON.stringify(category),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    try {
      if (response.ok) {
        const newCategory = await response.json();
        setCategories((prev) => [...prev, newCategory]);
        toast({
          variant: "success",
          description: "Create Category Successfully",
        });
      }
    } catch (err) {
      console.log(err);
      // TODO: fix err backend
      toast({
        variant: "destructive",
        description: "Uh oh! Something went wrong.",
      });
    }
  };

  return (
    <FinancialRecordsContext.Provider
      value={{ records, categories, addRecord, updateRecord, deleteRecord, createCategory, isLoading }}
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
