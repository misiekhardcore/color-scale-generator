# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Color scale export to CSS and Sass variables in hex, rgb, hsl, and hwb.
- `Step` scale mode to interpolate from a start color by a fixed step value.
- Hex inputs to override either color space's start/end color.
- `CHANGELOG.md` and `CONTRIBUTING.md`.
- Light, dark, and system themes that follow the OS by default, with a toggle in the page header.
- A gradient preview of the whole scale above the result swatches.
- Keyboard activation for result swatches, alongside the existing click-to-cycle behavior.

### Changed

- Replaced the default `create-next-app` README with project documentation.
- Adopted `shadcn/ui` on top of the existing Tailwind CSS v4 setup; `classnames` is replaced by the `cn` helper.
- Reorganised the single dense form into labelled sections (**Scale mode**, **Input colors**, **Scale settings**) and moved the export action into the results header.
- Renamed the color space controls to `Enter colors as`, `Show values as`, and `Interpolate in` to make their roles clear.
- Rendered the results as a responsive swatch grid that no longer overflows on small screens, and made the page responsive with a two-column layout on large screens.
- Rebuilt the export dialog on the shadcn dialog, adding Escape-to-close, focus trapping, and body scroll locking.
- Clamped the number of colors to 1-100 so an empty or out-of-range input can no longer produce invalid scales.
- Copying a scale now confirms with a toast instead of only swapping the button label.

### Removed

- Hand-rolled `Button`, `Modal`, and `ColorControlRow` components, replaced by shadcn primitives.

### Fixed

- Result swatches now pick their text color from the WCAG contrast ratio of black against white and let the channel label inherit it, so values stay legible on light and dark swatches alike.
- Closing the export dialog returns focus to the Export button, so keyboard users no longer lose their place.
- The result swatch focus ring is drawn immediately instead of fading in.
- The selected theme is visible again in the header toggle: the tooltip wrapping each button overwrote the toggle's `data-state`, so the active option had no highlight.
- The export dialog declares itself as a modal, which the Radix dialog does not set on its own.

## [1.0.0] - 2025-01-01

- Initial public release.
- Two-color interpolation and step-based scale modes.
- Color space support: RGB, CMYK, HSL, HSV, HEX, HWB, RAL.

[Unreleased]: https://github.com/misiekhardcore/color-scale-generator/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/misiekhardcore/color-scale-generator/releases/tag/v1.0.0
