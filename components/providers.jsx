"use client";
import { Provider } from "react-redux";
import { persistor, store } from "@/_core/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          {children}
          <NextTopLoader showSpinner={false} />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}


