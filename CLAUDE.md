# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Run tests in watch mode
npm test

# Run a single test file
npx jest src/path/to/file.test.ts

# Run tests matching a name pattern
npx jest --testNamePattern="evaluates simple"

# Format code
npm run prettier
```

## Architecture

This is a TypeScript algorithm/data-structures practice repository. All source lives under `src/`, compiled output goes to `dist/` (excluded from TS compilation inputs).

**Directory layout by category:**
- `src/leetcode/` — LeetCode problems; `c1_arrays_and_strings/` subdirectory follows book chapter organization (Cracking the Coding Interview 6th ed.)
- `src/companies/<company>/` — company-specific interview problems (currently `meta/`, `capitalone/`)
- `src/codesignal/` — CodeSignal challenge solutions
- `src/sabre-interview/` — Sabre interview problems
- `src/fibonacci/`, `src/reverse/`, `src/misc/` — topic-grouped utility problems

**File conventions:**
- Implementation: `problem.name.ts`
- Tests: `problem.name.test.ts` (co-located with implementation)
- Path alias `@/` maps to `src/` — use it for cross-directory imports in tests (e.g., `import { foo } from '@/companies/meta/balanced.paren.actual'`)

**Testing:** Jest with `ts-jest` transformer. Tests use `describe`/`test` blocks. No compilation step needed — `ts-jest` transpiles on the fly.

**TypeScript:** Strict mode enabled, target ES6, CommonJS modules.
