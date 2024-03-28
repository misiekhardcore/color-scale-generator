'use client';

import { FormEvent, useState } from 'react';
import styles from './page.module.css';

type RGB = { r: number; g: number; b: number };
type HSL = { h: number; s: number; l: number };

export default function Home() {
  const [firstColor, setFirstColor] = useState('');
  const [secondColor, setSecondColor] = useState('');
  const [colorsNumber, setColorsNumber] = useState(0);
  const [results, setResults] = useState<string[]>([]);

  function calculateCColorScale(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { r: r1, g: g1, b: b1 } = hexToRgb(firstColor);
    const { r: r2, g: g2, b: b2 } = hexToRgb(secondColor);

    const rDiff = Math.ceil((r2 - r1) / (colorsNumber - 1));
    const gDiff = Math.ceil((g2 - g1) / (colorsNumber - 1));
    const bDiff = Math.ceil((b2 - b1) / (colorsNumber - 1));

    const results = [];
    for (let i = 0; i < colorsNumber; i++) {
      results.push(rgbToHex(r1 + rDiff * i, g1 + gDiff * i, b1 + bDiff * i));
    }

    setResults(results);
  }

  return (
    <main className={styles.main}>
      <form onSubmit={calculateCColorScale}>
        <label>
          First color
          <input
            type="text"
            value={firstColor}
            maxLength={6}
            onChange={(e) => setFirstColor(e.target.value)}
          />
        </label>
        <label>
          Second color
          <input
            type="text"
            value={secondColor}
            maxLength={6}
            onChange={(e) => setSecondColor(e.target.value)}
          />
        </label>
        <label>
          how many results
          <input
            type="number"
            value={colorsNumber}
            onChange={(e) => {
              const count = parseInt(e.target.value);
              setColorsNumber(count);
            }}
          />
        </label>
        <button type="submit">calculate</button>
      </form>
      <div className="calculations">
        <div className="calculation">
          <PrintHex hex={firstColor} />
          <PrintRGB rgb={hexToRgb(firstColor)} />
          <PrintHSL hsl={hexToHsl(firstColor)} />
        </div>
        <div className="calculation">
          <PrintHex hex={secondColor} />
          <PrintRGB rgb={hexToRgb(secondColor)} />
          <PrintHSL hsl={hexToHsl(secondColor)} />
        </div>
      </div>
      <div className="colorScale">
        {results.map((result, index) => (
          <div key={index} className="color" style={{ backgroundColor: `#${result}` }}>
            {result}
          </div>
        ))}
      </div>
    </main>
  );
}

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return { r, g, b };
}

function hexToHsl(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const r1 = r / 255;
  const g1 = g / 255;
  const b1 = b / 255;

  const max = Math.max(r1, g1, b1);
  const min = Math.min(r1, g1, b1);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r1:
        h = (g1 - b1) / d + (g1 < b1 ? 6 : 0);
        break;
      case g1:
        h = (b1 - r1) / d + 2;
        break;
      case b1:
        h = (r1 - g1) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h, s, l };
}

function rgbToHex(r: number, g: number, b: number) {
  return `${r.toString(16).padStart(2, '0')}${g
    .toString(16)
    .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function PrintHex({ hex }: { hex: string }) {
  return <div className="print">HEX: #{hex}</div>;
}

function PrintRGB({ rgb }: { rgb: RGB }) {
  return (
    <div className="print">
      <p>R:{rgb.r.toFixed(2)}</p>
      <p>G:{rgb.g.toFixed(2)}</p>
      <p>B:{rgb.b.toFixed(2)}</p>
    </div>
  );
}

function PrintHSL({ hsl }: { hsl: HSL }) {
  return (
    <div className="print">
      <p>H:{hsl.h.toFixed(2)}deg</p>
      <p>S:{hsl.s.toFixed(2)}%</p>
      <p>L:{hsl.l.toFixed(2)}%</p>
    </div>
  );
}
