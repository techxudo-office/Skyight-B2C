"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store, persistor } from "../_core/store/store";
import { ThemeProvider } from "../components/theme-provider";
import { Toaster } from "react-hot-toast";
import { PersistGate } from "redux-persist/integration/react";

const inter = Inter({ subsets: ["latin"] });

const metadata = {
  title: "Skyight - Find Your Perfect Flight",
  description:
    "Book flights to anywhere in the world with the best prices. Your trusted partner for travel.",
  generator: "v0.dev",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: { borderRadius: "8px", fontSize: "14px" },
                  success: { icon: "✅" },
                  error: { icon: "❌" },
                }}
              />
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
