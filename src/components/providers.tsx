"use client";

console.log("DEBUG: Providers loaded");

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { CurrencyProvider } from "@/context/currency-context";
import { LanguageProvider } from "@/context/language-context";
import React, { useEffect, useState } from "react";

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test";

export function Providers({ children }: { children: React.ReactNode }) {
  console.log("DEBUG: Rendering Providers");

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <>{children}</>;
  }

  return (
    <PayPalScriptProvider
      options={{ clientId: PAYPAL_CLIENT_ID, currency: "EUR" }}
    >
      <LanguageProvider>
        <CurrencyProvider>
          {children}
        </CurrencyProvider>
      </LanguageProvider>
    </PayPalScriptProvider>
  );
}
