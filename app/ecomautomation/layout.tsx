import type { Metadata } from 'next';
import EcomwealthCalendlyRoot from '@/components/EcomwealthCalendlyRoot';

export const metadata: Metadata = {
  title: 'ECOM SHARKS | Partnership Call',
  robots: { index: false, follow: false },
};

export default function EcomAutomationLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <EcomwealthCalendlyRoot />
      {children}
    </>
  );
}
