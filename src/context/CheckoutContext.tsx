"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export interface Address {
  fullName: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
}

export type PaymentMethod = "upi" | "card" | "cod";

interface CheckoutContextType {
  customerName: string;
  customerEmail: string;
  address: Address | null;
  paymentMethod: PaymentMethod | null;
  paymentComplete: boolean;
  setCustomerInfo: (name: string, email: string) => void;
  setAddress: (address: Address) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  setPaymentComplete: (complete: boolean) => void;
  resetCheckout: () => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [address, setAddressState] = useState<Address | null>(null);
  const [paymentMethod, setPaymentMethodState] = useState<PaymentMethod | null>(null);
  const [paymentComplete, setPaymentCompleteState] = useState(false);

  const setCustomerInfo = useCallback((name: string, email: string) => {
    setCustomerName(name);
    setCustomerEmail(email);
  }, []);

  const setAddress = useCallback((addr: Address) => {
    setAddressState(addr);
  }, []);

  const setPaymentMethod = useCallback((method: PaymentMethod) => {
    setPaymentMethodState(method);
  }, []);

  const setPaymentComplete = useCallback((complete: boolean) => {
    setPaymentCompleteState(complete);
  }, []);

  const resetCheckout = useCallback(() => {
    setCustomerName("");
    setCustomerEmail("");
    setAddressState(null);
    setPaymentMethodState(null);
    setPaymentCompleteState(false);
  }, []);

  return (
    <CheckoutContext.Provider
      value={{
        customerName,
        customerEmail,
        address,
        paymentMethod,
        paymentComplete,
        setCustomerInfo,
        setAddress,
        setPaymentMethod,
        setPaymentComplete,
        resetCheckout,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }
  return context;
}
