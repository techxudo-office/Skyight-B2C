import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "@/components/providers";

export const metadata = {
  title: "Skyight - Find Your Perfect Flight",
  description:
    "Book flights to anywhere in the world with the best prices. Your trusted partner for travel.",
  generator: "v0.dev",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
