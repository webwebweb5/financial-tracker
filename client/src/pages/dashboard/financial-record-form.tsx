"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../../components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";

import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useUser } from "@clerk/clerk-react";
import { useFinancialRecords } from "../../context/financial-record-context";
import { RecordSchema } from "../../schemas";
import { useTransition } from "react";
import { LuLoader2 } from "react-icons/lu";

// ----------------------------------------------------------------------

export default function FinancialRecordForm() {
  const { user } = useUser();
  const { addRecord } = useFinancialRecords();
  const [amount, setAmount] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RecordSchema>>({
    resolver: zodResolver(RecordSchema),
    defaultValues: {
      description: "",
      amount: 0,
      category: "",
      paymentMethod: "",
    },
  });

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
    form.setValue("amount", parseFloat(e.target.value));
  };

  const handleIncomeClick = () => {
    const positiveAmount = Math.abs(parseFloat(amount)).toString();
    setAmount(positiveAmount);
    form.setValue("amount", parseFloat(positiveAmount));
  };

  const handleExpenseClick = () => {
    const negativeAmount = (-Math.abs(parseFloat(amount))).toString();
    setAmount(negativeAmount);
    form.setValue("amount", parseFloat(negativeAmount));
  };

  function onSubmit(values: z.infer<typeof RecordSchema>) {
    const newRecord = {
      userId: user?.id ?? "",
      date: new Date().toISOString(),
      description: values.description,
      amount: values.amount,
      category: values.category,
      paymentMethod: values.paymentMethod,
    };

    console.log(newRecord);
    startTransition(() => {
      addRecord(newRecord);
    });
    form.reset();
    setAmount(""); // Reset the amount state
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Description"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="100"
                    {...field}
                    value={amount}
                    onChange={handleAmountChange}
                    disabled={isPending}
                    pattern="^-?\d*\.?\d*$"
                  />
                </FormControl>
                {amount && (
                  <div className="flex mt-2">
                    <Button variant="ghost" size={"sm"} onClick={handleIncomeClick}>
                      Income (+)
                    </Button>
                    <Button variant="ghost" size={"sm"} onClick={handleExpenseClick}>
                      Expense (-)
                    </Button>
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={(value) =>
                    field.onChange(value === "none" ? "" : value)
                  }
                  defaultValue={field.value || "none"}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="none">Select a category</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="rent">Rent</SelectItem>
                    <SelectItem value="salary">Salary</SelectItem>
                    <SelectItem value="utilities">Utilities</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Method</FormLabel>
                <Select
                  onValueChange={(value) =>
                    field.onChange(value === "none" ? "" : value)
                  }
                  defaultValue={field.value || "none"}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a payment method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="none">
                      Select a payment method
                    </SelectItem>
                    <SelectItem value="credit-card">Credit Card</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending && <LuLoader2 className="mr-2 w-5 h-5 animate-spin" />}
          Add Record
        </Button>
      </form>
    </Form>
  );
}
