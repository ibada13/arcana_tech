'use client';
import { Cairo } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import { store } from "./state/store";
import AuthInit from "./AuthInit";
import SideNavbar from "./components/SideNavbar";
import StoreInit from "./StoreInit";
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
          <StoreInit/>
        <SideNavbar />
        {children}
      </body>
        </Provider>
    </html>
  );
}
