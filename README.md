# color-scale-generator

Generate color scales based on two input colors (or a start color and a step value) and the desired number of colors in the scale. Built with Next.js and TypeScript.

[![CI](https://github.com/misiekhardcore/color-scale-generator/actions/workflows/ci.yml/badge.svg)](https://github.com/misiekhardcore/color-scale-generator/actions/workflows/ci.yml)
[![License](https://img.shields.io/github/license/misiekhardcore/color-scale-generator)](LICENSE)

## Features

- **Two modes** - generate a scale between a start and end color, or from a start color plus a fixed step value
- **Multiple color spaces** - `RGB`, `CMYK`, `HSL`, `HSV`, `HEX`, `HWB`, and `RAL`
- **Flexible inputs** - enter colors directly in the active color space (e.g. a RAL number) or paste a hex value
- **Export** - copy the generated scale as CSS or Sass variables in hex, rgb, hsl, or hwb
- **Light and dark themes** - follows the system preference by default, with a toggle in the header
- **Live results** - the scale updates as you type, with a gradient preview and swatches that can be switched between color spaces
- **Typed API** - the underlying scaler, converter, validator, and exporter services are covered by unit tests and can be reused directly from `lib/`

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS 4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com) components (Radix UI primitives, `cn`, `class-variance-authority`)
- [next-themes](https://github.com/pacocoursey/next-themes) for light/dark/system theming
- [Jest](https://jestjs.io) for unit testing
- [ESLint](https://eslint.org) + [Prettier](https://prettier.io) for linting

## Getting started

Requirements: [Node.js](https://nodejs.org) (see `.nvmrc` or `engines` in `package.json`) and [PNPM](https://pnpm.io/) 12.

```bash
git clone https://github.com/misiekhardcore/color-scale-generator.git
cd color-scale-generator
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to use the app.

## Usage

1. Pick a **scale mode**:
   - `Between two colors` - interpolate between a start and end color.
   - `Fixed step` - advance from the start color by a fixed step value.
2. In **Input colors**, choose the space you want to enter colors in (`Enter colors as`) and the space the value read-out uses (`Show values as`), then set the start (and end) color using the color picker, the channel inputs, or a hex value.
3. In **Scale settings**, set how many colors to generate and choose the space used for interpolation (`Interpolate in`). In step mode the per-channel step values appear here too.
4. Click **Export** in the results header to copy the scale as CSS or Sass variables. Click any swatch to show its values in the next color space, or use the theme toggle in the header to switch between light and dark.

### Color spaces

| Space | Example input                         |
| ----- | ------------------------------------- |
| RGB   | `r`, `g`, `b` (0-255)                 |
| CMYK  | `c`, `m`, `y`, `k` (0-100)            |
| HSL   | `h` (0-360), `s`, `l` (0-100)         |
| HSV   | `h` (0-360), `s`, `v` (0-100)         |
| HEX   | `#rrggbb`                             |
| HWB   | `h` (0-360), `w`, `b` (0-100)         |
| RAL   | RAL number, e.g. `3020` (Traffic red) |

### Export formats

| Format   | Output              |
| -------- | ------------------- |
| CSS hex  | `--color-1: #…`     |
| CSS rgb  | `--color-1: rgb(…)` |
| CSS hsl  | `--color-1: hsl(…)` |
| CSS hwb  | `--color-1: hwb(…)` |
| Sass hex | `$color-1: #…`      |
| Sass rgb | `$color-1: rgb(…)`  |
| Sass hsl | `$color-1: hsl(…)`  |
| Sass hwb | `$color-1: hwb(…)`  |

## Project structure

```
src/
  app/        # Next.js App Router: page, layout, hooks, components
    components/
      ui/     # shadcn/ui primitives (generated, restyled to repo conventions)
  lib/
    services/ # Scaler, Converter, Validator, Stringifier, Exporter
    helpers/  # small utilities
    utils.ts  # `cn` class name helper
  tests/      # shared test helpers
components.json # shadcn/ui CLI configuration
```

The public services are re-exported from `lib/services` and can be used standalone:

```ts
import { Scaler } from './lib/services';
import type { ColorScale } from './lib/services/Scaler/types';

const scale = Scaler.getScale('RGB', 'HEX', { r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 }, 6);
```

## Development

```bash
pnpm dev        # start the dev server
pnpm build      # lint + build for production
pnpm test       # run the unit tests once
pnpm test:watch # run tests in watch mode
pnpm lint       # run eslint + prettier
pnpm lint:fix   # auto-fix lint and format issues
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full workflow.

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

## License

[MIT](LICENSE) - see [LICENSE](LICENSE).
