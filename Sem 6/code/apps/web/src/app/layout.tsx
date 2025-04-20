"use client";
import { useEffect } from "react";
import useThemeStore from "@/store/store";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, Bounce } from "react-toastify";
import Loading from "@/components/own/Loading";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Destructure initializeTheme from the store
  const { initializeTheme }: any = useThemeStore();

  useEffect(() => {
    // Initialize the theme on the first render
    initializeTheme();
  }, [initializeTheme]);

  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/assets/PlaceNext_logo.png"
          type="image/x-icon"
        />
      </head>
      <body className={inter.className}>
        {children}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        <Loading />
      </body>
    </html>
  );
}
