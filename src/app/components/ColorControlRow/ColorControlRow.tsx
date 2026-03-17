import type { ReactNode } from 'react';

interface ColorControlRowProps {
  /** Content for column 1 — typically a color space selector or label */
  selector: ReactNode;
  /** Content for column 2 — controls for the start color */
  startControl: ReactNode;
  /** Content for column 3 — controls for the end color (omitted in step mode) */
  endControl?: ReactNode;
}

/**
 * Renders a 3-column grid row used inside ColorScaleForm.
 * Keeps the selector in column 1, start-color control in column 2,
 * and an optional end-color control in column 3.
 * `col-start-1` is applied to the selector so the row always begins
 * at the first column regardless of how many items came before it,
 * eliminating the need for empty spacer `<div>`s.
 */
export function ColorControlRow({ selector, startControl, endControl }: ColorControlRowProps) {
  return (
    <>
      <div className="col-start-1">{selector}</div>
      {startControl}
      {endControl}
    </>
  );
}
