import type { Metadata } from 'next';
import './index.scss';
import { dosis } from '@/app/ui/fonts';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { ClerkProvider } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: 'Hopways Facture',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${dosis.className}`}>
          <main className="container">
            <Header />
            {children}
            <Footer />
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
