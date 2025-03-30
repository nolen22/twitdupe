import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "./context/UserContext";

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
      <body className={`${inter.className} antialiased bg-gray-50`}>
        <UserProvider>
          <div className="min-h-screen">
            <nav className="bg-white border-b border-gray-200">
              <div className="max-w-2xl mx-auto px-4 py-3">
                <h1 className="text-xl font-bold text-gray-900">TwitDupe</h1>
              </div>
            </nav>
            <main className="max-w-2xl mx-auto px-4 py-6">
              {children}
            </main>
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
