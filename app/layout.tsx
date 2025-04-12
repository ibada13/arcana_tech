'use client';
import { Cairo } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
const cairo = Cairo({
 
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
        className={`${cairo.className}  antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
