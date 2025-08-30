// app/layout.tsx
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NoteHub",
  description:
    "A simple and efficient application for managing personal notes.",
};

export default function RootLayout({
  children,
  modal, // ⬅️ добавили слот для модалки
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
          {children}
          {modal}
          {}
          <Footer />
          {}
          <div id="modal-root" />
        </TanStackProvider>
      </body>
    </html>
  );
}
