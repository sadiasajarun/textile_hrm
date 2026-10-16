# FINAL_EDGE_CASE_MATRIX — Variation H final prototype

**Date:** 15 Oct 2026 · Covers the edge-case list in the build specification (§22) plus the extra cases built into the screens.

Edge cases use shared patterns: an **inline field error**, an **alert** (info / warn / danger), a **timeline step** (warn / fail), an **empty state** or a **status tag**. None of them needs a separate page. "How to see it" gives the quickest way to trigger each case in the prototype.

| # | Edge case (spec §22) | Route | Pattern | How to see it | Status |
|---|---|---|---|---|---|
| 1 | Invalid login | `login.html` (Student and Teacher tabs), `portal-*.html` | Inline error + lock-out rule | Sign in with any password other than `demo-pass` | Built |
| 2 | Session expired | `access-denied.html?reason=session` | Access state page | Open the URL | Built |
| 3 | Permission denied | `access-denied.html?reason=permission` | Access state page | Open the URL | Built |
| 4 | Account locked | `access-denied.html?reason=locked` | Access state page | Open the URL | Built |
| 5 | No role / scope assignment | `access-denied.html?reason=noassign`, `ministry-users.html` | Warning alert + access state | Users tab → "See her screen" | Built |
| 6 | Missing application document | `apply.html` step 4, `license-apply.html` step 3 | Required file fields block "Continue" | Click "Continue" without choosing files | Built |
| 7 | Payment failed | `candidate.html`, `student-payment.html`, `verifier.html` | Danger alert with gateway reference; "No money was deducted" | "Simulate failed payment" | Built |
| 8 | Payment pending | `verifier.html` | Warn alert "Payment is being confirmed… Do not pay twice"; search stays locked | "Simulate pending confirmation" | Built |
| 9 | Application closed | `apply.html`, `admissions.html` | Option blocked with note; "closed" tag | Choose "SSC (Vocational) 2027" | Built |
| 10 | Correction required | `student-request.html`, `inst-requests.html`, `license-track.html` | Warn timeline step + resubmit form | Flow D step 2 or Flow J step 4a | Built |
| 11 | Selected / not selected / waiting list | `candidate.html`, `admission-result.html` | Result alerts | "Selected" / "Not selected"; look up TX-26-0051177 | Built |
| 12 | Attendance missing | `inst-attendance.html` | "Not submitted" status tag on a class register | Open the page (demo data) | Built |
| 13 | Attendance late | `teacher-attendance.html`, `inst-attendance.html` | Attendance-window rule on the register; "Late" status tag in the institution view | Open both pages | Built |
| 14 | Attendance correction | `teacher-attendance.html` → `inst-attendance.html` | Correction request → approval | Flow B steps 2–3 | Built |
| 15 | Result validation error | `teacher-results.html` | Alerts for missing marks and marks above maximum; inline errors | Clear a mark or enter > 100, then submit | Built |
| 16 | Result published / corrected | `inst-results.html`, `student-results.html` | Published alert; correction with history | Flow C steps 2–3 | Built |
| 17 | Service request states | `student-services.html`, `inst-requests.html`, `student-request.html` | Timeline: submitted, under review, returned, resubmitted, approved/rejected, completed | Flow D | Built |
| 18 | Budget insufficiency | `ministry-budget.html` | Inline error when the amount exceeds the head balance | Enter more than ৳ 210 lakh | Built |
| 19 | Budget revision | `ministry-budget.html` | Revision request rows | Open the page | Built |
| 20 | Duplicate expense | `inst-finance.html` | Inline error on invoice number | Enter INV-4471 | Built |
| 21 | Asset already assigned | `inst-assets.html` | Option shows holder; inline error "must be transferred, not assigned again" | Choose KTI-LAB-0412 | Built |
| 22 | Asset transferred / returned | `inst-assets.html` | Timeline + history | Flow F step 3 | Built |
| 23 | Asset damaged / lost / recovered | `inst-assets.html`, `ministry-assets.html` | "Damaged — unavailable" alert, reason, recovery | Flow F step 4 | Built |
| 24 | Library unavailable | `student-academics.html#library` | "Unavailable" tag + "Reserve" | Open the library tab | Built |
| 25 | Library overdue / fine / lost | `inst-library.html`, `principal.html` | Overdue tag, fine amount, lost replacement cost | Open the page | Built |
| 26 | Leave insufficient balance | `teacher-leave.html`, `inst-leave.html` | Inline error (more than balance); "Insufficient balance" in the Principal queue | Enter more days than the balance | Built |
| 27 | Leave overlap | `teacher-leave.html` | Inline error | Choose 17 Oct as start date | Built |
| 28 | Leave withdrawn | `teacher-leave.html`, `inst-leave.html` | "Withdrawn" tag | "Withdraw application" | Built |
| 29 | Certificate not eligible | `student-certificate.html` | Warn alert "not available yet"; not-eligible example | Open the page before Flow I | Built |
| 30 | Duplicate certificate | `student-certificate.html`, `inst-certificates.html` | "Duplicate certificate (original lost)" request type and queue row | Choose the duplicate request type | Built |
| 31 | Certificate data mismatch | `student-certificate.html`, `inst-certificates.html` | "Data mismatch? Request correction"; "Return: data mismatch" | Click either control | Built |
| 32 | Licence duplicate application | `license-apply.html` | Inline error on NID; alert when an application already exists | Enter NID 1990123456789, or open the page after Flow J step 2 | Built |
| 33 | Licence missing documents | `license-apply.html` | Required file fields block "Continue" | Skip the uploads | Built |
| 34 | Licence returned / rejected | `ministry-licenses.html`, `license-track.html`, `license-apply.html` | Warn / fail timeline step, reason, resubmit form | Flow J steps 4a / 4b | Built |
| 35 | Verification not found | `verifier.html`, `verify.html` | Warn alert "No record found" | Search any unknown number | Built |
| 36 | Verification before payment | `verifier.html` | Locked result "Payment required before verification" | Search before paying | Built |
| 37 | Licence expired / revoked | `verifier.html` | Warn / danger result | TX-LIC-2024-000102 / TX-LIC-2023-000057 | Built |
| 38 | Organisation already registered | `verifier-register.html` | Inline error on trade licence; alert when registered | Enter TRAD/DNCC/2019/004512 | Built |
| 39 | Tracking reference not found | `license-track.html` | Danger alert | Search LIC-APP-2026-99999 | Built |
| 40 | External API unavailable | `ministry-integrations.html` | "Service unavailable" log row | Open the page | Built (boundary) |
| 41 | External API timeout | `ministry-integrations.html` | "Timeout (30 s)" log row | Open the page | Built (boundary) |
| 42 | External API data mismatch | `ministry-integrations.html` | "Data mismatch" log row with detail | Open the page | Built (boundary) |

## Additional cases built into the screens

| Edge case | Route | Pattern |
|---|---|---|
| Duplicate institution category name | `ministry-institutions.html#categories` | Inline error ("Textile Institute") |
| Role conflict on multi-role assignment | `ministry-users.html` | "Conflict check" warning |
| Certificate checked before it is issued (Flow I) | `verify.html`, `verifier.html` | CERT-2026-00512: "No record found" + prototype note; "Valid certificate" after issue |
| Alumni account before being marked alumni | `alumni.html` | Locked empty state; form after `cert=alumni` |
| Migration decided by the Ministry | `division-admissions.html`, `district-admissions.html` | MG-2026-221 "Approved by the Ministry"; Recommend / Forward hidden |
| Nothing waiting at a level | `district.html`, `division.html`, `ministry.html` | Waiting banner and action item appear only at that level's turn |
| Request list filter with no match | `student-services.html#requests` | Empty state "No requests match this filter." |
| Organisation not registered | `verifier.html` | Empty state as the page heading (h1) with Register action |
| Migration with no vacant seat | `ministry-admissions.html#migration` | "Unavailable" tag + reason |
| Report with no data | `ministry-reports.html` | Empty state ("Prototype: no-data example") |
| Attendance below the 80% threshold | `inst-attendance.html`, `principal.html`, `ministry.html` | Danger / warn alerts |
| Student attendance below the exam requirement | `student.html` | Warn alert (78% vs 80%) |
| File too large or wrong type | All upload fields | `accept` + `data-max-kb` inline error |
| Flow not started yet | Every receiving page | Info alert with a link to the start of the flow |

## Not modelled (rules not confirmed)

These are shown only as labelled **TBD — Requires Client Confirmation** boundaries: procurement / LC / PO / gate-pass approval thresholds, MY GOV API use case, licence eligibility and validation criteria, licence validity and renewal, verification pricing model and gateway, appeal after licence rejection, profile lock after certificate issue.

_Updated 16 Oct 2026 (Fix round 1, `570db89`): six cases added above; all are covered by `qa-final.mjs`._
