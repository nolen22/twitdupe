import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "./context/UserContext";
import Sidebar from "./components/Sidebar";
import RightSidebar from "./components/RightSidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TwitDupe",
  description: "A Twitter clone built with Next.js",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-white`}>
        <UserProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 border-x border-gray-200">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
                <h2 className="text-xl font-bold text-gray-900">Home</h2>
                <div className="flex mt-4 border-b border-gray-200">
                  <button className="flex-1 py-2 text-center font-medium text-gray-900 border-b-2 border-blue-500">
                    For you
                  </button>
                  <button className="flex-1 py-2 text-center font-medium text-gray-500 hover:text-gray-900">
                    Following
                  </button>
                </div>
              </div>
              <div className="p-4">
                {children}
              </div>
            </main>
            <RightSidebar />
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
