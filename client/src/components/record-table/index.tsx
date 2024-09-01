"use client";

import { useEffect, useState } from "react";
import { columns, RecordProps } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<RecordProps[]> {
  // Fetch data from your API here.
  return [
    {
      _id: "m5gr84i9",
      description: "Test",
      amount: 100,
      category: "other",
      paymentMethod: "cash",
      date: new Date().toLocaleDateString(),
    },
    {
      _id: "3u1reuv4",
      description: "Test",
      amount: 100,
      category: "other",
      paymentMethod: "cash",
      date: new Date().toLocaleDateString(),
    },
    {
      _id: "derv1ws0",
      description: "Test",
      amount: 100,
      category: "other",
      paymentMethod: "cash",
      date: new Date().toLocaleDateString(),
    },
    {
      _id: "5kma53ae",
      description: "Test",
      amount: 100,
      category: "other",
      paymentMethod: "cash",
      date: new Date().toLocaleDateString(),
    },
    {
      _id: "bhqecj4p",
      description: "Test",
      amount: 100,
      category: "other",
      paymentMethod: "cash",
      date: new Date().toLocaleDateString(),
    },
    // ...
  ];
}

export default function PaymentPage() {
  const [data, setData] = useState<RecordProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getData();
      setData(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or component
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
