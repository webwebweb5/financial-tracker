"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { LuLoader2 } from "react-icons/lu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { FinancialRecord } from "../../types";
import { RecordWithIdSchema } from "../../schemas";
import { useUser } from "@clerk/clerk-react";
import { useFinancialRecords } from "../../context/financial-record-context";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { PiCheckCircleLight, PiTrashLight } from "react-icons/pi";

interface SelectedRowDialogProps {
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
  selectedRow: FinancialRecord | null;
}

export function UpdateSelectedRowDialog({
  isOpen,
  onClose,
  selectedRow,
}: SelectedRowDialogProps) {
  const { user } = useUser();
  const { updateRecord, deleteRecord } = useFinancialRecords();
  const [isPending, startTransition] = useTransition();
  const [amount, setAmount] = useState<string>("");

  const form = useForm<z.infer<typeof RecordWithIdSchema>>({
    resolver: zodResolver(RecordWithIdSchema),
    defaultValues: {
      _id: "",
      description: "",
      amount: 0,
      category: "",
      paymentMethod: "",
    },
  });

  useEffect(() => {
    if (selectedRow) {
      form.reset({
        _id: selectedRow._id || "",
        description: selectedRow.description || "",
        amount: selectedRow.amount || 0,
        category: selectedRow.category || "",
        paymentMethod: selectedRow.paymentMethod || "",
      });
      setAmount(selectedRow.amount.toString());
    }
  }, [selectedRow, form]);

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

  function onSubmit(values: z.infer<typeof RecordWithIdSchema>) {
    const newRecord = {
      userId: user?.id ?? "",
      description: values.description,
      amount: values.amount,
      category: values.category,
      paymentMethod: values.paymentMethod,
    };

    startTransition(() => {
      updateRecord(values._id, newRecord);
    });
  }

  function handleDelete() {
    const recordId = selectedRow?._id || "";
    if (!recordId) {
      console.error("Cannot delete record: _id is undefined");
      return;
    }

    startTransition(() => {
      deleteRecord(recordId);
      onClose(false); // Close the dialog after deleting
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Selected Record Details</DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-2">
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
                      />
                    </FormControl>
                    {amount && (
                      <div className="flex mt-2">
                        <Button
                          variant="ghost"
                          type="button"
                          size={"sm"}
                          onClick={handleIncomeClick}
                        >
                          Income (+)
                        </Button>
                        <Button
                          variant="ghost"
                          type="button"
                          size={"sm"}
                          onClick={handleExpenseClick}
                        >
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
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="food">Food</SelectItem>
                        <SelectItem value="rent">Rent</SelectItem>
                        <SelectItem value="salary">Salary</SelectItem>
                        <SelectItem value="utilities">Utilities</SelectItem>
                        <SelectItem value="entertainment">
                          Entertainment
                        </SelectItem>
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
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a payment method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="credit-card">Credit Card</SelectItem>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="bank-transfer">
                          Bank Transfer
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end space-x-4">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" disabled={isPending}>
                    <PiTrashLight className="mr-2 w-5 h-5" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      this record.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button variant="destructive" asChild>
                      <AlertDialogAction onClick={handleDelete}>
                        Continue
                      </AlertDialogAction>
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <LuLoader2 className="mr-2 w-5 h-5 animate-spin" />
                ) : (
                  <PiCheckCircleLight className="mr-2 w-5 h-5" />
                )}
                Update
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
