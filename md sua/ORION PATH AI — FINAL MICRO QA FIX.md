This is a FINAL MICRO-FIX PASS only.

Do NOT redesign, refactor broadly, or add new product features.

The current production implementation is substantially correct.

Fix ONLY the following independently verified residual issues.

## 1. UPDATE CHILD SAFETY AUTHORITY

Search all occurrences of:

`Cục Trẻ em`
`Bộ Lao động - Thương binh và Xã hội`
`Bộ LĐ-TB&XH`

used as the current 2026 authority for child protection / hotline 111.

The current government structure places child affairs under:

**Cục Bà mẹ và Trẻ em — Bộ Y tế**

Update metadata and UI accordingly.

Do not falsely state that 115 is “free 24/7” unless an authoritative source explicitly verifies both attributes.

Keep 111 and 115 as emergency/support numbers but phrase their characteristics accurately.

Update `lastVerifiedAt` to the actual verification date used.

---

## 2. REMOVE UNSUPPORTED RIASEC VALIDATION CLAIMS

Search:

`chuẩn xác`
`psychometrics`
`psychometric`
`validated`
`chuẩn hóa`

where they imply Orion's own RIASEC questionnaire has scientifically validated psychometric properties.

Unless repository documentation contains an actual validation study, replace with:

**“Bài sàng lọc sở thích nghề nghiệp dựa trên mô hình Holland RIASEC.”**

RIASEC may be described as a vocational-interest framework.

Do not claim Orion's implementation itself is psychometrically validated.

---

## 3. FIX SALARY TRANSPARENCY

Search for:

`18 - 45 tr/tháng`
`18–45`
and all other salary figures.

No salary figure may be displayed without enough context to avoid misleading students.

At minimum attach:

- source
- source year/date
- geography if available
- experience band if available
- gross/net if source provides it

If those dimensions cannot be supported by verified structured data:

remove the exact salary range and display:

**“Thu nhập thay đổi đáng kể theo kinh nghiệm, địa phương và doanh nghiệp. Xem nguồn dữ liệu.”**

Do not invent replacement numbers.

---

## 4. UNIFY SAFETY TIERS CLIENT AND SERVER

Client currently supports:

NORMAL  
DISTRESS  
HIGH_RISK  
IMMEDIATE_DANGER

Server must implement the same canonical enum.

Create one logically consistent safety policy.

`IMMEDIATE_DANGER` must trigger immediate safety interruption.

`HIGH_RISK` must also stop normal career coaching.

`DISTRESS` may continue only with appropriate supportive boundaries.

Do not diagnose mental illness.

Add tests verifying all four states on BOTH client logic and server logic.

---

## 5. VERIFY PRIVACY COPY AGAINST LOCAL STORAGE

Career Experiments intentionally persist using localStorage.

Audit `privacy.html`.

Do not say all student information exists only “within the current session” if any career data persists across sessions.

Clearly distinguish:

- temporary state
- local browser persistence
- data sent to `/api/chat`
- server/provider processing
- data not collected

The privacy page must describe actual implementation, not intended architecture.

---

## 6. VERIFY GIT PROVENANCE

Run:

git fetch origin
git rev-parse HEAD
git rev-parse origin/main
git rev-parse origin/refactor/orion-career-platform-v2
git log --oneline --decorate -5
git status

Confirm exactly which commit production is based on.

If `main` is not actually at the final production commit, fix branch synchronization safely.

Do NOT force-push.

---

## 7. FINAL TEST

Run existing tests plus add regression tests for:

- current child-safety authority metadata
- no unsupported RIASEC validation claims
- no unsourced salary range
- NORMAL
- DISTRESS
- HIGH_RISK
- IMMEDIATE_DANGER
- privacy copy accurately reflects CareerExperiment localStorage persistence

Then inspect production after deployment.

Return a concise report with:

- commit SHA
- branch HEADs
- production deployment commit
- changed files
- test results
- exact remaining limitations

Do not return READY unless source, branches and production are aligned.