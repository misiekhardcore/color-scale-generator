# Contributing to color-scale-generator

Thanks for taking the time to contribute! 🎉

The following is a set of guidelines for contributing. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to the docs in a pull request.

## Table of contents

- [Code of conduct](#code-of-conduct)
- [Getting started](#getting-started)
- [Development workflow](#development-workflow)
- [Coding standards](#coding-standards)
- [Testing](#testing)
- [Pull requests](#pull-requests)
- [Reporting issues](#reporting-issues)

## Code of conduct

Be respectful and constructive. Harassment or exclusionary behavior of any kind will not be tolerated.

## Getting started

Requirements: Node.js and Yarn 4.

```bash
git clone https://github.com/misiekhardcore/color-scale-generator.git
cd color-scale-generator
yarn install
```

## Development workflow

1. Fork the repo and create your branch from `main`:
   ```bash
   git checkout -b fix/issue-name
   ```
2. Make your changes, keeping commits focused. Commit messages follow [Conventional Commits](https://www.conventionalcommits.org):
   - `feat: add RAL 4000 color conversion`
   - `fix: handle out-of-range step value`
   - `docs: update export formats table`
3. Push to your branch and open a pull request.

## Coding standards

- **TypeScript** - no `any`/`unknown` types. Strict mode is on; fix type errors rather than suppress them.
- **ESLint + Prettier** - run `yarn lint` and `yarn lint:fix` before committing.
- **Imports** - use the `@/` alias for `src/` paths.
- **Components** - prefer small, typed, single-purpose components.

## Testing

- Unit tests live next to the code they cover (`*.test.ts` / `*.test.tsx`).
- Run all tests once: `yarn test`
- Run in watch mode: `yarn test:watch`
- Add tests for any new behavior.

## Pull requests

- Keep PRs small and focused. Link to an open issue when possible.
- CI must pass (lint + tests) before merge.
- Update docs (`README.md`, inline comments) when a user-facing behavior changes.

## Reporting issues

Use the [GitHub issue tracker](https://github.com/misiekhardcore/color-scale-generator/issues). Include:

- a clear title and description
- steps to reproduce
- the expected and actual behavior
- your environment (OS, Node version, browser)
