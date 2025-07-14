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
  console.log("CICD TEST 2.0")
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
              <Toaster />
              {children}
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
