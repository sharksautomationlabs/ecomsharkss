import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Call confirmed | ECOM SHARKS',
  robots: { index: false, follow: false },
};

export default function ThankYouFunnelLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
