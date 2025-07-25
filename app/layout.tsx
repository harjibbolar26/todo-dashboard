import type { Metadata } from "next";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from "@/components/theme-provider";
import Sidebar from "@/components/Sidebar";
import Projects from "@/components/Projects";
import Header from "@/components/Header";
import { ToastContainer } from 'react-toastify';

export const metadata: Metadata = {
  title: "Todo Board",
  description: "Drag & Drop Task management board",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex">
            <div className="fixed inset-0 w-[90px] max-lg:hidden">
              <Sidebar />
            </div>
            <div className="ml-[90px] w-[300px] fixed inset-0 max-lg:hidden">
              <Projects />
            </div>
            <div className="flex flex-col w-full h-full bg-gradient min-h-screen lg:ml-[390px]">
              <Header />
              <div className="w-full h-full">{children}</div>
            </div>
          </div>
        </ThemeProvider>
        <ToastContainer position="top-right" autoClose={3000} />
      </body>
    </html>
  );
}
