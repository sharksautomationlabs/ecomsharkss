'use client';

import { useDepthGauge } from '../hooks';

/** Signature right-edge scroll indicator — "how deep" the visitor has scrolled. */
export default function DepthGauge() {
  const { fillRef, meterRef } = useDepthGauge();

  return (
    <div aria-hidden="true" className="fixed top-1/2 right-[18px] z-50 hidden -translate-y-1/2 flex-col items-center gap-2.5 md:flex">
      <div ref={meterRef} className="font-[family-name:var(--font-eh2-archivo)] text-[0.72rem] font-extrabold text-[#7eebff]">0m</div>
      <div className="relative h-[180px] w-[3px] overflow-hidden rounded-full bg-[#35c4dd]/15">
        <div ref={fillRef} className="absolute left-0 top-0 h-0 w-full rounded-full bg-gradient-to-b from-[#7eebff] to-[#35c4dd]" />
      </div>
      <div className="font-[family-name:var(--font-eh2-archivo)] text-[0.62rem] uppercase tracking-[0.18em] text-[#35c4dd]" style={{ writingMode: 'vertical-rl' }}>
        Dive Deeper
      </div>
    </div>
  );
}
