# Contributing to MintForge

Thank you for your interest in contributing to MintForge! This guide covers how to
report issues, suggest features, and submit pull requests.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Reporting Issues](#reporting-issues)

---

## Code of Conduct

Be respectful, constructive, and collaborative. We follow the
[Contributor Covenant](https://www.contributor-covenant.org/) code of conduct.

---

## Getting Started

1. Fork the repository on GitHub.
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/MintForge.git
   cd MintForge
   ```
3. Install root dependencies:
   ```bash
   npm ci
   ```
4. Install frontend dependencies:
   ```bash
   npm run frontend:install
   ```
5. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
6. Create a feature branch:
   ```bash
   git checkout -b feat/your-feature-name
   ```

---

## Development Workflow

### Smart Contracts

Use [Clarinet](https://docs.hiro.so/clarinet/get-started) for contract development:

```bash
clarinet check          # Lint all contracts
clarinet test           # Run Clarinet unit tests
clarinet console        # Interactive REPL
```

### Frontend

```bash
cd frontend
npm run dev             # Start Vite dev server
npm run test            # Run Vitest test suite
npm run build           # Production build
```

---

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <short description>
```

**Types:**

| Type       | When to use                                      |
|------------|--------------------------------------------------|
| `feat`     | New feature                                      |
| `fix`      | Bug fix                                          |
| `docs`     | Documentation only                               |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `chore`    | Build process, tooling, or dependency updates    |
| `test`     | Adding or updating tests                         |
| `ci`       | CI/CD configuration                              |
| `perf`     | Performance improvement                          |

**Examples:**

```bash
feat(contracts): add royalty enforcement to core contract
fix(useAsync): declare lastArgsRef before execute callback
docs(README): update contract table to v-i28
chore(deps): bump @stacks/connect to 8.x
```

All commits on the `main` branch are expected to be **GPG-signed**.

---

## Pull Request Process

1. Ensure your branch is up to date with `main`.
2. Run all frontend tests and confirm no new failures:
   ```bash
   cd frontend && npm run test -- --run
   ```
3. Run a production build and verify it succeeds:
   ```bash
   cd frontend && npm run build
   ```
4. Open a PR against `main` with a clear description of the change.
5. Reference any related issues using `Fixes #<issue>` or `Closes #<issue>`.
6. Wait for a review — at least one approval is required before merging.

---

## Coding Standards

- **JavaScript / JSX**: Follow existing patterns; avoid introducing new dependencies
  without discussion.
- **Clarity contracts**: Keep functions pure where possible; add comments for
  non-obvious post-conditions.
- **Accessibility**: All interactive UI elements must have accessible labels and
  ARIA attributes.
- **No secrets**: Never commit private keys, mnemonics, or API tokens. Add sensitive
  files to `.gitignore` before tracking.

---

## Testing

- Frontend unit tests live alongside their source files in `frontend/src/`.
- Run the full suite with `cd frontend && npm run test -- --run`.
- New utility functions and hooks **must** have corresponding test files.
- Do not delete or skip existing tests.

---

## Reporting Issues

Please use [GitHub Issues](https://github.com/AK-Bit-Lab/MintForge/issues) and choose
the appropriate template:

- **Bug report** — something is broken or behaves incorrectly.
- **Feature request** — a new capability or improvement you'd like to see.

For security vulnerabilities, **do not open a public issue**. See [SECURITY.md](SECURITY.md).
