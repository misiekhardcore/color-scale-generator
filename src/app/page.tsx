'use client';

import { DetailedHTMLProps, FormEvent, InputHTMLAttributes, useState } from 'react';

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
    <main className="grid gap-2">
      <form onSubmit={calculateCColorScale}>
        <Input value={firstColor} onChange={setFirstColor} label="First color" maxLength={6} />
        <Input value={secondColor} onChange={setSecondColor} label="Second color" maxLength={6} />
        <Input
          value={colorsNumber.toString()}
          onChange={(value) => setColorsNumber(parseInt(value))}
          label="How many results"
          type="number"
        />
        <button
          className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          calculate
        </button>
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
          <div
            key={index}
            className="rounded h-40 w-40 flex justify-center items-center color"
            style={{
              backgroundColor: `#${result}`,
              borderColor: `#${hexToOposite(result)}`,
            }}
          >
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

function hexToOposite(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHex(255 - r, 255 - g, 255 - b);
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

function Input({
  value,
  onChange,
  label,
  ...rest
}: {
  value: string;
  onChange: (value: string) => void;
  label: string;
} & Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'onChange' | 'capture'
>) {
  return (
    <label className="flex flex-col gap-1">
      {label}
      <input
        {...rest}
        className="bg-white border-2 rounded py-2 px-4"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
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
