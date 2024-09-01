import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
} from "../../components/ui/form";

import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Button } from "../ui/button";
import { useEffect, useTransition } from "react";

import { LuLoader2 } from "react-icons/lu";

// ----------------------------------------------------------------------

interface SelectedRowDialogProps {
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
  selectedRow: FinancialRecord | null;
}

// ----------------------------------------------------------------------

export function SelectedRowDialog({
  isOpen,
  onClose,
  selectedRow,
}: SelectedRowDialogProps) {
  const { user } = useUser();
  const { updateRecord } = useFinancialRecords();

  const [isPending, startTransition] = useTransition();

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

  // Reset the form with new values when selectedRow changes
  useEffect(() => {
    if (selectedRow) {
      form.reset({
        _id: selectedRow._id || "",
        description: selectedRow.description || "",
        amount: selectedRow.amount || 0,
        category: selectedRow.category || "",
        paymentMethod: selectedRow.paymentMethod || "",
      });
    }
  }, [selectedRow, form]);

  function onSubmit(values: z.infer<typeof RecordWithIdSchema>) {
    const newRecord = {
      userId: user?.id ?? "",
      description: values.description,
      amount: values.amount,
      category: values.category,
      paymentMethod: values.paymentMethod,
    };

    console.log(newRecord);
    startTransition(() => {
      updateRecord(values._id, newRecord);
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
                        disabled={isPending}
                      />
                    </FormControl>
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
            <Button type="submit" disabled={isPending}>
              {isPending && <LuLoader2 className="mr-2 w-5 h-5 animate-spin" />}
              Update Record
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
