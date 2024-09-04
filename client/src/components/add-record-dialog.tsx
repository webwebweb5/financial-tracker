"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

import FinancialRecordForm from "../pages/dashboard/financial-record-form";

interface AddRecordDialogProps {
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
}

export function AddRecordDialog({ isOpen, onClose }: AddRecordDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Record Details</DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <FinancialRecordForm onClose={onClose} isOpen={isOpen} />
      </DialogContent>
    </Dialog>
  );
}
