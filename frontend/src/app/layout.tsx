import { Inter } from "next/font/google"
import NavBar from "@/components/navbar";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        <NavBar/>
        {children}
      </body>
    </html>
  );
}
