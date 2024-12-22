"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import InvoiceTable from "./InvoiceTable";
import AddInvoice from "./AddInvoice";
import EditInvoice from "./EditInvoice";
import ViewInvoice from "./ViewInvoice";

interface Invoice {
  id: number;
  invoiceNumber: string;
  date: string;
  supplier: string;
  amount: number;
  status: string;
}

const mockInvoices: Invoice[] = [
  {
    id: 1,
    invoiceNumber: "INV001",
    date: "2024-11-10",
    supplier: "Oppo",
    amount: 1000,
    status: "Đã thanh toán",
  },
  {
    id: 2,
    invoiceNumber: "INV002",
    date: "2024-11-12",
    supplier: "Samsung",
    amount: 2000,
    status: "Chưa thanh toán",
  },
  {
    id: 3,
    invoiceNumber: "INV003",
    date: "2024-11-14",
    supplier: "IPhone",
    amount: 1500,
    status: "Đã thanh toán",
  },
  {
    id: 4,
    invoiceNumber: "INV004",
    date: "2024-11-16",
    supplier: "Sony",
    amount: 2500,
    status: "Đã thanh toán",
  },
];

const InvoiceMain = () => {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isViewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedInvoiceForView, setSelectedInvoiceForView] = useState<Invoice | null>(null);

  const handleAddInvoice = (newInvoice: Invoice) => {
    setInvoices([...invoices, newInvoice]);
    setAddDialogOpen(false);
  };

  const handleViewInvoice = (id: number) => {
    const invoice = invoices.find((inv) => inv.id === id);
    if (invoice) {
      setSelectedInvoiceForView(invoice);
      setViewDialogOpen(true);
    } else {
      console.error(`Không tìm thấy hóa đơn với ID: ${id}`);
    }
  };

  const handleEditInvoice = (updatedInvoice: Invoice) => {
    setInvoices((prevInvoices) =>
      prevInvoices.map((inv) =>
        inv.id === updatedInvoice.id ? updatedInvoice : inv
      )
    );
    setEditDialogOpen(false);
  };

  const handleDeleteInvoice = (id: number) => {
    setInvoices((prevInvoices) =>
      prevInvoices.filter((inv) => inv.id !== id)
    );
  };

  const handleEditButtonClick = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setEditDialogOpen(true);
  };

  return (
    <div>
      <Button className="bg-orange-600" onClick={() => setAddDialogOpen(true)}>
        Thêm Hóa Đơn
      </Button>
      <InvoiceTable
        invoices={invoices}
        onView={handleViewInvoice}
        onEdit={handleEditButtonClick}
        onDelete={handleDeleteInvoice}
      />
      <ViewInvoice
        isOpen={isViewDialogOpen}
        onClose={() => setViewDialogOpen(false)}
        invoice={selectedInvoiceForView}
      />

      {/* Dialog for Adding Invoice */}
      <AddInvoice
        isOpen={isAddDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        onAdd={handleAddInvoice}
      />

      {/* Dialog for Editing Invoice */}
      <EditInvoice
        isOpen={isEditDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        invoice={selectedInvoice}
        onEdit={handleEditInvoice}
      />
    </div>
  );
};

export default InvoiceMain;
