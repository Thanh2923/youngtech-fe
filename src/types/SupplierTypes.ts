// src/types/SupplierTypes.ts

export interface Supplier {
  id: number; // Primary key, auto-increment
  flag: boolean; // Indicates the active state of the supplier
  supplierName: string; // Name of the supplier
  contactName: string; // Name of the contact person
  phoneNumber: string; // Unique phone number of the supplier
  email: string; // Email address of the supplier
  address: string; // Address of the supplier
}


export interface SupplierState {
  data: Supplier[];
  loading: boolean;
  error: string | null;
}
