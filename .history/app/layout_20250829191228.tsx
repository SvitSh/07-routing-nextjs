import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'A simple and efficient application for managing personal notes.',
};

/**
 * Root layout for the application.  This component defines the top‑level
 * HTML structure, applies the global query provider and injects the
 * header and footer.  A dedicated div with the id `modal-root` is also
 * provided for modal portals to mount into.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
          {children}
          <Footer />
          {/* Portal mount point for modals */}
          <div id="modal-root" />
        </TanStackProvider>
      </body>
    </html>
  );
}