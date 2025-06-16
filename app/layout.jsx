"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "../_core/store/store"
import { ThemeProvider } from "../components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

const metadata = {
  title: "Skyight - Find Your Perfect Flight",
  description:
    "Book flights to anywhere in the world with the best prices. Your trusted partner for travel.",
  generator: "v0.dev",
};

export default function RootLayout({ children }) {
  console.log("CICD TEST 3");
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Provider store={store}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
