'use client';
import { Cairo } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import { store } from "./state/store";
import AuthInit from "./AuthInit";
import SideNavbar from "./components/SideNavbar";
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
      <Provider store={store}>

      <body
        className={`${cairo.className}  antialiased`}
        >
          <AuthInit />
        <Navbar />
        <SideNavbar />
        {children}
      </body>
        </Provider>
    </html>
  );
}
