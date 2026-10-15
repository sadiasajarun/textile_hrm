# FINAL_WORKFLOW_MAP — end-to-end flows A–J (Variation H)

**Date:** 15 Oct 2026 · **Prototype:** `design/prototype/` · **Start:** `prototype-index.html` → "End-to-end flows (A–J)"

## How the flows work

- Each flow crosses roles and portals. Progress is kept in the browser (`localStorage` key `tims-proto-v1`, managed by `assets/final/final.js`), so an action in one portal changes what the next portal shows.
- **Reset demo data** (review index or prototype bar) restores every key to its default.
- Steps that a real system would do by itself (payment gateway, result publication date) have a dashed **Prototype** control that simulates the outcome.
- Sign-in for any portal: choose a listed demo account, password `demo-pass`.

## State keys

| Key | Default | Values in order | Set on |
|---|---|---|---|
| `cand` | `none` | submitted → paid (or payfail) → selected (or notselected) → admitted | `apply`, `candidate` |
| `att` | `due` | submitted → correction → corrected | `teacher-attendance`, `inst-attendance` |
| `res` | `entry` | submitted → published → corrected (return → entry) | `teacher-results`, `inst-results` |
| `req` | `none` | submitted → returned → resubmitted → approved → completed (or rejected) | `student-services`, `inst-requests`, `student-request` |
| `bud` | `none` | allocated | `ministry-budget` |
| `exp` | `none` | recorded | `inst-finance` |
| `asset` | `none` | received → assigned → transferred → returned → damaged → recovered | `ministry-assets`, `inst-assets` |
| `proc` | `none` | submitted → approved → po → lc → received → gatepass | `inst-procurement`, `ministry-approvals` |
| `leave` | `none` | pending → approved (or rejected, withdrawn) | `teacher-leave`, `inst-leave` |
| `cert` | `none` | applied → issued → alumni | `student-certificate`, `inst-certificates` |
| `lic` | `none` | submitted → returned → submitted → issued (or rejected) | `license-apply`, `ministry-licenses`, `license-track` |
| `org` | `none` | registered | `verifier-register` |
| `orgpaid` | `no` | pending or failed → yes | `verifier` |
| `orgchk` | (unset) | 1 after the first search | `verifier` |
| `pay` | `due` | paid or failed | `student-payment` |
| `lib` | `issued` | returned | `inst-library` |
| `mig` | `pending` | approved | `ministry-admissions` |
| `eval` | `open` | done | `student-academics` |
| `rep` | `none` | ready or empty | `ministry-reports` |

---

## A. Candidate → Student

| # | Actor | Page | Action | State | Result shown |
|---|---|---|---|---|---|
| 1 | Public | `admissions.html` | "Apply online" | — | Dates, eligibility, seats, quota (TBD), documents |
| 2 | Candidate | `apply.html` | 5-step form → "Submit application" | `cand=submitted` | Toast with application ID TX-26-0048213 → `candidate.html` |
| 3 | Candidate | `candidate.html` | "Pay ৳ 500 — success" (or "Simulate failed payment" → `payfail`) | `cand=paid` | Receipt, admit card, test date |
| 4 | Prototype | `candidate.html` | "Selected" (or "Not selected" → `notselected`) | `cand=selected` | Merit position, allocated institution |
| 5 | Candidate | `candidate.html` | Upload certificate → "Pay ৳ 4,250 and confirm admission" | `cand=admitted` | Candidate → Student transition, student ID KTI-2026-0153 |
| 6 | Student | `student.html?new=1` | — | — | "Before classes begin" welcome in the student portal |

## B. Attendance → aggregate views

| # | Actor | Page | Action | State | Result shown |
|---|---|---|---|---|---|
| 1 | Teacher | `teacher-attendance.html` | Mark register → "Submit attendance" | `att=submitted` | Submitted time and count; late rule after 11:30 |
| 2 | Teacher | `teacher-attendance.html` | "Send correction request" | `att=correction` | Waiting for the Principal |
| 3 | Principal | `inst-attendance.html` | "Approve correction" | `att=corrected` | Corrected register; institution rate updates |
| 4 | District / Division / Ministry | `district.html`, `division.html`, `ministry-attendance.html` | — | — | Aggregate rates with the institution's submission |

## C. Result entry → publish → student

| # | Actor | Page | Action | State | Result shown |
|---|---|---|---|---|---|
| 1 | Teacher | `teacher-results.html` | Enter marks (missing or > max are blocked) → "Submit to Principal" | `res=submitted` | Submitted to Principal |
| 2 | Principal | `inst-results.html` | "Publish results" (or "Return to teacher" → `entry`) | `res=published` | Published date |
| 3 | Principal | `inst-results.html` | "Correct a published mark" | `res=corrected` | Correction with history |
| 4 | Student | `student-results.html` | — | — | Published result and grade table |

## D. Service request lifecycle

| # | Actor | Page | Action | State | Result shown |
|---|---|---|---|---|---|
| 1 | Student | `student-services.html` | Choose service → "Submit request" | `req=submitted` | Request SR-2026-01512 under review |
| 2 | Principal | `inst-requests.html` | "Return for correction" (with reason) | `req=returned` | Returned |
| 3 | Student | `student-request.html` | Correct → "Resubmit" | `req=resubmitted` | Back in the queue |
| 4 | Principal | `inst-requests.html` | "Approve" (or "Reject" → `rejected`) | `req=approved` | Approved |
| 5 | Principal | `inst-requests.html` | "Issue and complete" | `req=completed` | Student sees "Completed" |

## E. Budget → expenses → utilisation

| # | Actor | Page | Action | State | Result shown |
|---|---|---|---|---|---|
| 1 | Ministry | `ministry-budget.html` | "Issue allocation" (amount above the head balance is blocked) | `bud=allocated` | Allocation issued |
| 2 | Principal | `inst-finance.html` | "Record expense" (duplicate invoice INV-4471 is blocked) | `exp=recorded` | Utilisation against allocation |
| 3 | Ministry | `ministry-budget.html#utilisation` | — | — | Utilisation report |

## F. Asset lifecycle

| # | Actor | Page | Action | State | Result shown |
|---|---|---|---|---|---|
| 1 | Ministry | `ministry-assets.html` | "Allocate" | `asset=received` | Batch allocated to the institution |
| 2 | Principal | `inst-assets.html` | "Assign" (an already-assigned asset is blocked) | `asset=assigned` | Holder and history |
| 3 | Principal | `inst-assets.html` | "Transfer to another person" → "Return to store" | `transferred` → `returned` | History grows |
| 4 | Principal | `inst-assets.html` | "Report damage / loss" (reason) → "Mark repaired / recovered" | `damaged` → `recovered` | Unavailable, then available; full history |

## G. Procurement → gate pass

| # | Actor | Page | Action | State | Result shown |
|---|---|---|---|---|---|
| 1 | Principal | `inst-procurement.html` | "Submit request" | `proc=submitted` | PR-2026-071, forwarded by District |
| 2 | Ministry | `ministry-approvals.html` | "Approve" | `proc=approved` | Flow banner back to the institution |
| 3 | Principal | `inst-procurement.html` | "Generate PO" → "Upload LC" → "Record receipt (6 of 6)" → "Issue gate pass" | `po` → `lc` → `received` → `gatepass` | Timeline complete; items added to inventory |

The approval chain and thresholds are **TBD — Requires Client Confirmation** and are labelled on the page.

## H. Teacher leave

| # | Actor | Page | Action | State | Result shown |
|---|---|---|---|---|---|
| 1 | Teacher | `teacher-leave.html` | "Submit application" (insufficient balance or overlap is blocked) | `leave=pending` | Pending; "Withdraw application" → `withdrawn` |
| 2 | Principal | `inst-leave.html` | "Approve" (or "Reject" → `rejected`) | `leave=approved` | Approved |
| 3 | Teacher | `teacher-leave.html` | — | — | Updated balance |

## I. Certificate → alumni

| # | Actor | Page | Action | State | Result shown |
|---|---|---|---|---|---|
| 1 | Graduate | `student-certificate.html` | "Apply for certificate" (not-eligible case shown) | `cert=applied` | Under review |
| 2 | Principal | `inst-certificates.html` | "Issue certificate" (or "Return: data mismatch") | `cert=issued` | CERT-2026-00512 issued, verifiable on `verify.html` |
| 3 | Principal | `inst-certificates.html` | "Mark as alumni" | `cert=alumni` | Alumni status |
| 4 | Alumni | `alumni.html` | — | — | Alumni-only menu |

## J. Professional licence → verification (Phase 2)

| # | Actor | Page | Action | State | Result shown |
|---|---|---|---|---|---|
| 1 | Professional | `license.html` | "Apply for a licence" | — | Eligibility, documents, fees and validity (TBD) |
| 2 | Professional | `license-apply.html` | 4-step form → "Submit application" | `lic=submitted` | Toast with reference LIC-APP-2026-00071 → `license-track.html` |
| 3 | Professional | `license-track.html` | Find by reference + mobile | — | Status timeline "waiting for review" |
| 4 | Head Office | `ministry-licenses.html` | "Review" → checklist → "Approve and issue number" | `lic=issued` | Licence TX-LIC-2026-000418; flow banner to registration |
| 4a | Head Office | `ministry-licenses.html` | "Return for correction" (reason) | `lic=returned` | Applicant uploads the corrected document on `license-track.html` → "Resubmit" → `lic=submitted` |
| 4b | Head Office | `ministry-licenses.html` | "Reject with reason" | `lic=rejected` | Reason on the tracking page; appeal process TBD |
| 5 | Professional | `license-track.html` | — | — | Licence number, issue date, validity (TBD), download |
| 6 | Organisation | `verifier-register.html` | "Register organisation" | `org=registered` | Account ORG-2026-0142 → `verifier.html` |
| 7 | Organisation | `verifier.html` | Search before payment | — | "Payment required before verification" (locked) |
| 8 | Organisation | `verifier.html` | "Pay — success" (or pending / failed) | `orgpaid=yes` | Receipt RCPT-LV-2026-00318; search unlocked |
| 9 | Organisation | `verifier.html` | Search a number → "Verify" | `orgchk=1` | Result + usage history row |

Verification results in step 9:

| Number | Result |
|---|---|
| `TX-LIC-2026-000418` | Valid licence (Sabbir Hossain) **only after step 4**; before that, "No record found" with a prototype hint |
| `TX-LIC-2026-000402` | Valid licence (Kazi Anwar Hossain) |
| `TX-LIC-2024-000102` | Licence expired (renewal rules TBD) |
| `TX-LIC-2023-000057` | Licence revoked |
| `CERT-2025-00481` | Valid certificate (Phase 1) |
| `CERT-2024-00113` | Certificate revoked |
| anything else | No record found |

Pricing model (per check or subscription), amount, payment gateway, invoicing and the Phase 1 certificate link are **TBD — Requires Client Confirmation**.

---

## Other lookups and sign-ins

| Page | Input | Results |
|---|---|---|
| `admission-result.html` | TX-26-0048213 / TX-26-0051177 / TX-26-0049002 / other | Selected / waiting list / not selected / no result |
| `verify.html` | CERT-2025-00481 / CERT-2024-00113 / other | Valid / revoked / no record |
| `license-track.html` | LIC-APP-2026-00071 / other | Status (or "not submitted yet") / not found |
| Portal and student sign-ins | Listed account + `demo-pass` | Workspace; wrong password shows the error and lock-out rule |
| `access-denied.html?reason=` | `permission`, `session`, `locked`, `noassign` | Matching access message |
