"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { CategorySchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@clerk/clerk-react";
import { useFinancialRecords } from "../context/financial-record-context";
import { useTransition } from "react";
import { Button } from "./ui/button";
import { LuLoader2 } from "react-icons/lu";
import { PiCheckCircleLight } from "react-icons/pi";

interface CreateCategoryDialogProps {
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
}

export function CreateCategoryDialog({
  isOpen,
  onClose,
}: CreateCategoryDialogProps) {
  const { user } = useUser();
  const { createCategory } = useFinancialRecords();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      userId: "",
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof CategorySchema>) {
    const newCategory = {
      userId: user?.id ?? "",
      name: values.name,
    };

    startTransition(() => {
      createCategory(newCategory);
    });
    
    onClose(!isOpen)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Food/Drink"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <LuLoader2 className="mr-2 w-5 h-5 animate-spin" />
              ) : (
                <PiCheckCircleLight className="mr-2 w-5 h-5" />
              )}
              Create
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
