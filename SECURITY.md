# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| `main` branch (latest) | ✅ Yes |

Only the `main` branch receives security fixes. We do not backport patches to
previous branches.

---

## Reporting a Vulnerability

**Please do not open a public GitHub issue for security vulnerabilities.**

To report a security issue responsibly:

1. Send an email to **adblakeembamidele@gmail.com** with the subject line:
   `[MintForge Security] <brief description>`.
2. Include:
   - A clear description of the vulnerability.
   - Steps to reproduce or a proof-of-concept (if applicable).
   - The potential impact (e.g., fund drain, unauthorized mint, data leak).
   - Your GitHub handle or preferred contact for follow-up.
3. We will acknowledge receipt within **48 hours** and aim to provide a remediation
   timeline within **7 days**.

---

## Scope

The following are **in scope** for security reports:

- Smart contract vulnerabilities (`contracts/` directory).
- Frontend code that could result in wallet drain, phishing, or XSS.
- Automation scripts that could expose private keys or mnemonics.
- Dependency vulnerabilities with a direct exploitation path.

The following are **out of scope**:

- Theoretical vulnerabilities without a realistic attack vector.
- Issues already known and tracked in the public issue tracker.
- Third-party services (Hiro API, IPFS gateways, Leather/Xverse wallets).

---

## Security Best Practices for Contributors

- Never commit private keys, mnemonics, or API tokens to the repository.
- All files containing secrets must be listed in `.gitignore` before being created.
- Use `.env` files for local configuration; never hardcode secrets in source files.
- Run `git log --all -p | grep -E "(mnemonic|privateKey|secret)"` before pushing to
  verify no sensitive data has been introduced.

---

## Disclosure Policy

We follow a **coordinated disclosure** model. Once a fix has been deployed, we will
publish a brief security advisory in the GitHub Security Advisories tab and update
the `CHANGELOG.md`.
