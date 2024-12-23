// src/context/userContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

// Tạo context
interface UserContextProps {
  customerId: string | null;
  setCustomerId: (id: string | null) => void;
  orderId: string | null;
  setOrderId: (id: string | null) => void;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ customerId, setCustomerId, orderId, setOrderId }}>
      {children}
    </UserContext.Provider>
  );
};
