# Security Policy

**Report a vulnerability privately** — email shauryapunj404@gmail.com (subject `[SECURITY] ...`) or use GitHub's "Security › Report a vulnerability" tab.

Acknowledgement within 48 hours; critical issues aim for a patch within 7 days.

## Controls

- CodeQL `security-extended` on push, PR, and weekly schedule.
- Dependabot weekly with `semver-major` version-updates ignored.
- Branch protection on `main`: required CodeQL check, linear history, no force-push, no deletion.
