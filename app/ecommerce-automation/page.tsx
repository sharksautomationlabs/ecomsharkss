import EcomAutomationPage from '../ecomautomation/page';
import CalendlyEmbedSection from '@/components/CalendlyEmbedSection';

/**
 * Calendly is first in the HTML source (earliest network fetch) but second visually (order-2).
 */
export default function EcommerceAutomationPage() {
  return (
    <div className="flex flex-col">
      <CalendlyEmbedSection className="order-2" />
      <div className="order-1">
        <EcomAutomationPage part="hero" />
      </div>
      <div className="order-3">
        <EcomAutomationPage part="after-calendly" />
      </div>
    </div>
  );
}
