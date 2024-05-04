import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { Suspense } from "react";
import Loading from "./components/loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog App",
  description: "Blog assignment application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="container mx-auto p-4">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </main>
        <Footer />
      </body>
    </html>
  );
}
