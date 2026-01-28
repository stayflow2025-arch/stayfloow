
"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { CurrencyProvider } from "@/context/currency-context";
import { LanguageProvider } from "@/context/language-context";
import React from "react";

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <PayPalScriptProvider options={{ clientId: PAYPAL_CLIENT_ID, currency: "EUR" }}>
          <LanguageProvider>
              <CurrencyProvider>
                {children}
              </CurrencyProvider>
          </LanguageProvider>
        </PayPalScriptProvider>
    );
}
