# Bot Run Consolidated Report

**Reviewed by**: <!-- Claude / GPT / other -->
**Review date**: YYYY-MM-DD
**Consolidated report ID**: <!-- e.g. YYYYMMDD-001 -->

---

## Runs Analysed

| Run ID | Date | Time | Build Version | Bot Actions | Runs | Deaths | Stop Reason |
|--------|------|------|---------------|-------------|------|--------|-------------|
| 20260430-143022 | 2026-04-30 | 14:30:22 | v66.57 | 1000/1000 | 5 | 3 | max steps |

*Source files: `logs/bot-runs/<run-id>/compact.txt` (and `full.txt` for deep dives)*

---

## Patch Gate Status

| Check | Result |
|-------|--------|
| Action crashes / ERR_ACTION_EXCEPTION | NONE / FAIL |
| Turn-backwards errors | NONE / FAIL |
| Warnings requiring review | N |

---

## Bugs Found

### BUG-001: [Short description]
- **Severity**: ERROR / WARNING
- **Code(s)**: ERR_ACTION_EXCEPTION
- **Occurrences**: N (across M runs)
- **First seen**: Run YYYYMMDD-HHMMSS, step N, turn N
- **Description**: What happens and under what conditions.
- **Repro notes**: <!-- anything that helps narrow it down -->
- **Status**: OPEN
- **Resolved in**: —

### BUG-002: [Short description]
<!-- copy block above for each additional bug -->

---

## Warnings / Low-Priority Observations

- **WARN-001**: [code] — brief description. Occurrences: N.

---

## Resolved Issues

| Bug ID | Description | Resolved in Patch | Notes |
|--------|-------------|-------------------|-------|
| BUG-001 | Example resolved bug | Patch 9 | Fixed by ... |

---

## Notes for Next Patch

<!-- Summarise what the patch should address, in priority order -->

1. ...
2. ...

---

*Runs included: [list run IDs]*
*Report saved: YYYY-MM-DD*
