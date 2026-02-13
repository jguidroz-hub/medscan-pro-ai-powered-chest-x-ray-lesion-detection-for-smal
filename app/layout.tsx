import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MedScan Pro - AI-powered chest X-ray lesion detection for small clinics',
  description: 'Value Proposition: Automated chest X-ray analysis that helps small clinics and radiologists detect lesions with hospital-grade accuracy, reducing misdiagnosis and improving patient outcomes without expensive equipment upgrades.

Target Customer: Small to medium medical clinics, independent radiologists, telehealth providers in underserved areas

---
Category: Healthcare
Target Market: Small to medium medical clinics, independent radiologists, telehealth providers in underserved areas
Source Hypothesis ID: c39705dd-5741-4c15-b655-b27d1ab8539f
Promotion Type: automatic',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <nav className="border-b">
            <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
              <a href="/" className="font-bold text-lg">MedScan Pro - AI-powered chest X-ray lesion detection for small clinics</a>
              <div className="flex items-center gap-4">
                <a href="/dashboard" className="text-sm hover:text-blue-600">Dashboard</a>
                <a href="/pricing" className="text-sm hover:text-blue-600">Pricing</a>
              </div>
            </div>
          </nav>
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
