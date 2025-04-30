// utils/email-templates.tsx
"use client";

import PurchaseConfirmation from "@/components/PurchaseConfirmation";
import InvoiceTemplate from "@/components/InvoiceTemplate";

export const renderPurchaseConfirmation = (props: {
  name: string;
  invoiceNumber: string;
  amount: number;
}) => {
  return <PurchaseConfirmation {...props} />;
};

export const renderInvoiceTemplate = (props: {
  invoiceNumber: string;
  date: string;
  customerName: string;
  customerEmail: string;
  items: Array<{ description: string; amount: number }>;
  total: number;
}) => {
  return <InvoiceTemplate {...props} />;
};
