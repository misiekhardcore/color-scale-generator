import { useState } from 'react';
import type { ColorSpace } from '@/app/types';

export function useStepValues() {
  const [step, setStep] = useState<Partial<Record<string, number>>>({ r: 10, g: 10, b: 10 });

  function resetStepForColorSpace(newColorSpace: ColorSpace) {
    if (newColorSpace === 'RGB' || newColorSpace === 'HEX' || newColorSpace === 'RAL') {
      setStep({ r: 10, g: 10, b: 10 });
    } else if (newColorSpace === 'CMYK') {
      setStep({ c: 1, m: 1, y: 1, k: 1 });
    } else if (newColorSpace === 'HSL') {
      setStep({ h: 10, s: 5, l: 5 });
    } else if (newColorSpace === 'HSV') {
      setStep({ h: 10, s: 5, v: 5 });
    } else if (newColorSpace === 'HWB') {
      setStep({ h: 10, w: 5, b: 5 });
    }
  }

  return {
    step,
    setStep,
    resetStepForColorSpace,
  };
}
