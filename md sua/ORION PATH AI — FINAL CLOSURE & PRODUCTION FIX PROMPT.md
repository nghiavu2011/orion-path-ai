# ORION PATH AI — FINAL CLOSURE PASS

## SOURCE OF TRUTH

Work directly on the existing repository:

https://github.com/nghiavu2011/orion-path-ai

Production:

https://orion-path-ai.vercel.app/

This is a **FINAL CLOSURE PASS**.

Do NOT redesign the product from scratch.

Do NOT migrate framework.

Do NOT create another Orion project.

Do NOT spend time adding unrelated features.

The previous refactor already improved `/api/chat.js`.

Your job now is to **finish everything that was missed**, especially the frontend/product consistency, trust pages, security cleanup, structured Career Hypotheses, Career Experiments and production verification.

---

# 1. FIRST RULE — VERIFY BEFORE EDITING

Inspect the CURRENT repository state first.

Read at minimum:

- `index.html`
- `app.html`
- `api/chat.js`
- all CSS/JS modules added during previous refactor
- repository tree
- Vercel/deployment configuration

Also inspect the CURRENT production site:

https://orion-path-ai.vercel.app/

Do not assume the previous implementation is fully deployed.

Compare:

**GitHub source → current local source → deployed production**

Identify any mismatch.

---

# 2. DO NOT REVERT THE GOOD BACKEND WORK

Preserve the following concepts already implemented in `/api/chat.js`:

- `career_coach`
- `family_facilitator`
- `reflection_lab`
- Gemini server-side API key
- Career Coach must not use Numerology/Tử Vi
- Family AI must act as facilitator, not judge
- career hypotheses concept
- career experiments concept
- uncertainty
- child-safety handling
- no fake precise career-match percentage
- no prestige-first university bias

Do not regress these.

Improve them only where explicitly required below.

---

# 3. P0 — REMOVE GEMINI API KEY UI FROM FRONTEND

The production user should NOT have to enter a Gemini API Key.

Search the entire repository for:

`orion_gemini_api_key`

`localStorage`

`generativelanguage.googleapis.com`

`?key=`

`Gemini API Key`

`Bảo mật tối đa`

`Nhập API Key`

Remove all Gemini-secret related user interface and legacy logic that is no longer required.

Specifically remove:

- API-key input/settings from `index.html`
- API-key input/settings from `app.html`
- localStorage Gemini key persistence
- API key import through URL parameters
- direct browser Gemini REST requests
- misleading security copy around browser-stored keys

Production architecture must be:

Browser  
↓  
Orion `/api/...`  
↓  
Gemini  
↓  
`process.env.GEMINI_API_KEY`

No production secret in browser.

After changing this, verify through browser devtools/network that the Gemini API key is NOT visible.

---

# 4. P0 — FIX LANDING PAGE METHODOLOGY

The public landing page still describes the OLD Orion methodology.

Fix it completely.

Search and remove or rewrite all wording similar to:

- “Khoa học & Huyền học hội tụ”
- “AI hiểu đúng tiềm năng”
- “thế mạnh bẩm sinh”
- “năng lực số mệnh”
- “định hướng trời sao”
- “nghề phù hợp nhất”
- deterministic career claims

The landing page must reflect the NEW architecture.

Communicate three separate layers:

## Evidence

Includes:

- RIASEC vocational interests
- interests
- academic signals
- values
- goals
- experiences
- constraints

## Reality

Includes:

- education pathways
- admissions
- tuition
- geography
- labour-market information
- family constraints

## Reflection Lab

Includes:

- Numerology
- Tử Vi

Reflection Lab must be clearly OPTIONAL.

Display wording equivalent to:

> “Reflection Lab là không gian chiêm nghiệm văn hóa tùy chọn. Nội dung này không được sử dụng để chấm điểm năng lực, tính phù hợp nghề nghiệp hoặc quyết định ngành học.”

This distinction must be obvious BEFORE users register/use Orion.

---

# 5. REMOVE NUMEROLOGY FROM FAMILY CAREER EXAMPLES

Search landing/app content for any Family Bridge example where student career reasoning includes:

- “Thần số học 7”
- life path
- Nạp Âm
- Tử Vi
- “năng lực số mệnh”

Remove these from career/family decision examples.

Family examples should instead use evidence such as:

- student interests
- academic subjects
- goals
- parent's concerns
- cost
- employment uncertainty
- career experiments

Example logic:

Student:
thích công nghệ + sáng tạo

Parents:
lo đầu ra nghề nghiệp và độ ổn định

Shared goal:
một con đường vừa phù hợp vừa khả thi

Experiment:
thử 3 mini-project / course samples / professional interviews

Do not use Numerology/Tử Vi as compromise evidence.

---

# 6. CORRECT EDUCATION TERMINOLOGY

Search entire repository for:

`THPT Quốc Gia`

Replace inappropriate current references with:

**Kỳ thi tốt nghiệp THPT**

Do not hard-code historical terminology into current guidance.

Also review all other admissions text for obsolete or overly absolute wording.

---

# 7. RIASEC WORDING

RIASEC must be described as:

**Hồ sơ sở thích nghề nghiệp RIASEC**

or equivalent accurate wording.

Do NOT describe RIASEC as measuring:

- IQ
- destiny
- full personality
- innate talent
- intelligence
- complete ability

Where questionnaire validation is not documented, use transparent language such as:

> “Bài sàng lọc sở thích nghề nghiệp dựa trên mô hình RIASEC.”

Do not claim clinical or psychometric validation that does not exist.

---

# 8. REMOVE UNVERIFIED EXPERT TESTIMONIAL

Search:

`TS. Tâm lý học`

and any anonymous/unverifiable expert endorsement.

If there is no verified real expert identity and permission:

REMOVE IT.

Do not replace it with another fake testimonial.

Prefer methodology transparency.

---

# 9. TRUST / LEGAL PAGES — MUST EXIST

Create real accessible pages:

- `methodology.html`
- `privacy.html`
- `terms.html`
- `child-safety.html`
- `data-sources.html`

Use the existing Orion design system.

Footer/navigation links must point to these real pages.

Every page must work via:

- direct URL
- browser refresh
- mobile
- desktop

Do NOT make critical trust information available only in JS modals.

---

# 10. METHODOLOGY PAGE CONTENT

`methodology.html` must explain clearly:

### Orion measures
- vocational interests
- relevant student/context signals

### Orion does NOT measure
- IQ
- destiny
- guaranteed ability
- psychological diagnosis

### RIASEC
Explain what it is and its limits.

### Career Hypotheses
Explain why Orion returns multiple possibilities rather than one destiny career.

### Evidence
Explain what signals may influence recommendations.

### Unknowns
Explain why Orion shows missing information.

### Career Experiments
Explain how real-world experience can update the profile.

### AI
Explain what Gemini/AI does and does not do.

### Reflection Lab
Clearly explain:

Numerology/Tử Vi are optional cultural reflection tools and do not affect Career Engine results.

### Limitations
Be explicit.

Avoid pseudo-scientific language.

---

# 11. PRIVACY PAGE

Explain in understandable Vietnamese:

- what information may be stored
- what may be sent to AI provider
- what remains local if applicable
- student vs parent sharing
- account/data deletion if supported
- data retention limitations
- no Gemini API key is required from users
- AI conversations may contain sensitive data
- avoid unnecessary collection

Do NOT claim security properties that are not technically guaranteed.

---

# 12. CHILD SAFETY PAGE

Explain:

- Orion is career guidance, not therapy
- Orion does not diagnose
- safety escalation philosophy
- trusted adult / professional support
- relevant official resources

Do not overstate capability.

---

# 13. DATA SOURCES PAGE

Create source categories for:

- admissions
- institutions/programmes
- tuition
- labour market
- occupational information
- career frameworks

If Orion currently does not yet maintain verified datasets, SAY SO.

Do not create fake data just to fill the page.

Use language equivalent to:

> “Khi dữ liệu chưa đủ đáng tin cậy, Orion sẽ hiển thị ‘Chưa đủ dữ liệu đáng tin cậy’ thay vì tự suy đoán.”

---

# 14. TERMS PAGE

Create sensible terms appropriate to current functionality.

Avoid pretending Orion provides:

- medical diagnosis
- psychological diagnosis
- guaranteed admission
- guaranteed employment
- financial guarantees

Explain that Career Guidance is decision support.

---

# 15. REAL CAREER HYPOTHESES DATA STRUCTURE

Do not rely solely on Gemini returning an uncontrolled Markdown paragraph.

Create or enforce a structured Career Hypothesis shape.

Conceptually:

```js
{
  id,
  career,
  field,
  signalLevel,
  supportingEvidence: [],
  conflicts: [],
  unknowns: [],
  experiments: [],
  educationPaths: []
}
```

Possible signal levels:

- `strong`
- `moderate`
- `exploratory`

Do not use unsupported percentages.

Validate Gemini structured output before rendering.

Provide graceful fallback if AI JSON is malformed.

Never blindly inject arbitrary model HTML.

---

# 16. CAREER RESULTS UI

Results should clearly separate:

## Hồ sơ sở thích hiện tại

## Các giả thuyết nghề nghiệp

3–5 directions where possible.

For every hypothesis show:

### Vì sao Orion gợi ý?

### Bằng chứng hiện có

### Điểm cần kiểm chứng

### Orion chưa biết

### Trải nghiệm nên thử tiếp

This should be visible UI, not only hidden inside an AI chat response.

---

# 17. CAREER EXPERIMENTS MUST BECOME A REAL FEATURE

The previous implementation may only mention Career Experiments inside AI text.

That is not sufficient.

Implement an actual lightweight lifecycle in the current static architecture.

Each experiment should support:

```text
NOT STARTED
↓
IN PROGRESS
↓
COMPLETED
↓
REFLECTION
```

Minimum fields:

- experiment id
- related career hypothesis
- title
- estimated duration
- objective
- instructions
- status
- reflection answers
- completion date

Suggested reflection questions:

1. Em có thấy tò mò khi làm không?
2. Em có muốn tiếp tục thêm thời gian không?
3. Phần nào khiến em hứng thú nhất?
4. Phần nào khiến em khó chịu?
5. Em có muốn thử lại không?
6. Em nghĩ mình cần học thêm kỹ năng nào?

Persist locally if no backend database exists.

Do NOT create a fake cloud database.

The experiment reflection should contribute to the student's evolving Career Profile where feasible.

---

# 18. LIVING CAREER PROFILE

Add a lightweight concept of profile evolution.

Store/review:

- initial RIASEC
- current hypotheses
- completed experiments
- reflections
- changes over time

Show users:

### Hồ sơ hiện tại

and where feasible:

### Điều gì đã thay đổi?

Do not permanently label students based on their first assessment.

---

# 19. REFLECTION LAB MUST BE VISUALLY SEPARATE

Keep Numerology/Tử Vi if desired.

But visually and logically place them inside:

# REFLECTION LAB

Do not position them inside the main scientific/evidence methodology.

Add the disclaimer prominently.

Career results must not change if Reflection Lab information changes.

Test this.

---

# 20. AI CONTEXT SEPARATION TEST

Inspect every AI request.

Career Coach context MUST NOT include:

- numerology
- lifePath
- astrology
- napAm
- tử vi
- birth-based symbolic values

Family Facilitator MUST NOT receive those either.

Only Reflection Lab may receive Reflection data.

Add comments/tests where useful to prevent regression.

---

# 21. IMPROVE GEMINI SYSTEM INSTRUCTION USAGE

Inspect current Gemini API implementation.

If supported by the Gemini API/model currently used, send role/boundary instructions through proper:

`systemInstruction`

rather than concatenating all instructions into the same user message.

Separate:

SYSTEM

CONTEXT

USER MESSAGE

OUTPUT CONTRACT

Improve prompt-injection resistance without overengineering.

---

# 22. STRUCTURED AI RESPONSE VALIDATION

For structured AI modes, validate:

- JSON parse
- required fields
- arrays
- maximum array lengths
- valid signal levels
- missing values

If malformed:

- retry once with repair request if appropriate
or
- use graceful fallback

Never crash the student UI.

---

# 23. CHILD SAFETY — IMPROVE BEYOND KEYWORDS

Preserve deterministic keyword safety detection.

Add a second safety layer for ambiguous distress language.

Conceptual classification:

```text
NORMAL
DISTRESS
HIGH_RISK
IMMEDIATE_DANGER
```

Do not diagnose mental illness.

For HIGH_RISK / IMMEDIATE_DANGER:

stop normal career coaching.

Provide appropriate support-oriented response.

Do not continue career Socratic questioning.

---

# 24. SAFETY RESOURCE QUALITY

Review all hard-coded hotline/support numbers.

Do NOT include an unverified private hotline as if it were an official emergency service.

Where support contacts are included, structure them conceptually with:

- name
- purpose
- jurisdiction
- source
- lastVerifiedAt

Prefer verified official resources.

If uncertain, keep the response general rather than inventing a hotline.

---

# 25. HOMEPAGE INFORMATION ARCHITECTURE

Do NOT redesign Orion visually.

Preserve its existing:

- constellation identity
- dark/navy aesthetic
- premium feel
- logo
- visual storytelling

But update content hierarchy to:

1. Hero
2. Orion giúp bạn làm gì?
3. Báo cáo mẫu
4. Phương pháp
5. Career Hypotheses
6. Career Experiments
7. Family Bridge
8. Education / Reality
9. Reflection Lab
10. Privacy & Safety
11. Pricing
12. Footer

Primary CTA:

**Bắt đầu hồ sơ hướng nghiệp**

Secondary CTA:

**Xem báo cáo mẫu**

---

# 26. HERO COPY

Replace overpromising language.

Preferred conceptual messaging:

### Heading
**Hiểu mình hơn. Thử nhiều hướng hơn. Chọn tương lai có cơ sở hơn.**

### Supporting message
**Orion giúp học sinh và gia đình tổng hợp sở thích nghề nghiệp, dữ liệu học tập, trải nghiệm thực tế và điều kiện lựa chọn để xây dựng những hướng nghề nghiệp đáng khám phá.**

Avoid:

- AI biết tương lai
- AI hiểu chính xác con người
- định mệnh nghề nghiệp
- nghề hoàn hảo
- số mệnh quyết định nghề

---

# 27. PRICING CLAIMS

Review:

`99.000đ trọn đời`

`AI không giới hạn`

Do not change pricing strategy unless necessary.

But wording must match technical reality.

If “unlimited AI” cannot genuinely be guaranteed due to Gemini quotas/cost:

rewrite transparently.

Do not make contractual promises the system cannot reliably deliver.

---

# 28. ERROR / LOADING STATES

Ensure UI has understandable Vietnamese responses for:

- Gemini unavailable
- Gemini timeout
- missing server configuration
- provider quota
- malformed AI output
- missing admissions data
- offline/network failure

Never expose:

- stack traces
- raw API errors
- provider secrets

---

# 29. RESPONSIVE QA

Test explicitly at:

- 360px
- 375px
- 390px
- 430px
- 768px
- 1024px
- 1440px

Check:

- homepage
- onboarding
- RIASEC
- results
- hypotheses
- experiments
- Family Bridge
- Reflection Lab
- AI chat
- legal/trust pages

Fix all obvious overflow/clipping problems.

---

# 30. ACCESSIBILITY CLOSURE

At minimum verify:

- semantic buttons
- form labels
- keyboard navigation
- focus-visible
- adequate contrast
- accessible dialog behaviour
- alt text
- tap targets
- no essential information encoded by colour only

---

# 31. DEAD CODE CLEANUP

After implementation, search entire repository for:

```text
orion_gemini_api_key
generativelanguage.googleapis.com
THPT Quốc Gia
Khoa học & Huyền học hội tụ
năng lực số mệnh
AI hiểu đúng tiềm năng
Bảo mật tối đa
TS. Tâm lý học
Thần số học 7
```

Every remaining occurrence must be intentional.

Remove:

- old API key functions
- duplicate Gemini clients
- obsolete modal code
- unused settings code
- obsolete prompt fragments
- duplicate scoring logic
- misleading copy
- dead functions

---

# 32. CROSS-CHECK SOURCE AGAINST PRODUCTION

This step is mandatory.

After local/source fixes:

compare the updated repository against:

https://orion-path-ai.vercel.app/

If your environment has Vercel deployment access:

deploy the corrected version.

If you do NOT have deployment permission:

state that clearly.

DO NOT claim production is fixed when only source code is changed.

---

# 33. PRODUCTION SMOKE TEST

After deployment, open the actual production URL and test:

### Landing
Correct new methodology appears.

### API Key
No API-key settings remain.

### RIASEC
Works.

### Career hypotheses
Displays multiple options.

### Reflection Lab
Still works separately.

### Isolation
Changing Reflection data does not change Career Engine.

### Career Coach
Does not receive astrology/numerology.

### Family Bridge
Does not use astrology/numerology.

### Experiments
Can Start → Complete → Reflect.

### Trust pages
All direct URLs work.

### Mobile
No serious breakage.

### AI
Uses server-side endpoint.

### Console
No important runtime errors.

---

# 34. ACCEPTANCE TEST — EXACT STRINGS

Production must NOT contain these misleading phrases in career methodology:

❌ `Khoa học & Huyền học hội tụ`

❌ `AI hiểu đúng tiềm năng`

❌ `năng lực số mệnh`

❌ `THPT Quốc Gia` for current admissions

❌ `Bảo mật tối đa` related to localStorage API key

❌ anonymous `TS. Tâm lý học`

Production must NOT expose Gemini API-key input.

Production Career AI must NOT receive Reflection Lab data.

---

# 35. REGRESSION TESTS

Verify existing good features were not destroyed:

- visual identity
- onboarding
- RIASEC radar
- AI Career Coach
- Family Bridge
- Reflection Lab
- Vietnamese content
- responsive navigation
- main CTA

Do not solve methodology problems by deleting the valuable product.

---

# 36. FINAL GO / NO-GO GATE

You are NOT allowed to return:

`READY`

until all of the following pass:

[ ] Frontend no longer asks for Gemini API key.

[ ] No production Gemini secret is exposed client-side.

[ ] Old methodology copy is removed.

[ ] Numerology/Tử Vi is isolated in Reflection Lab.

[ ] Career Engine is evidence-based.

[ ] Family Bridge contains no metaphysical career evidence.

[ ] RIASEC terminology is corrected.

[ ] `THPT Quốc Gia` current references are corrected.

[ ] Anonymous expert testimonial is removed.

[ ] Career Hypotheses have a structured representation.

[ ] Results UI displays evidence + unknowns.

[ ] Career Experiments have a real lifecycle.

[ ] Living Career Profile exists at least in lightweight/local form.

[ ] Child-safety logic is improved.

[ ] AI structured responses are validated.

[ ] Methodology page works.

[ ] Privacy page works.

[ ] Terms page works.

[ ] Child Safety page works.

[ ] Data Sources page works.

[ ] Footer links work.

[ ] Mobile layout passes.

[ ] No major console errors.

[ ] Production URL reflects the new code.

---

# 37. DO NOT EXPAND SCOPE

Do NOT add:

- social network
- school LMS
- payment gateway redesign
- complex admin dashboard
- new framework
- database migration unless genuinely required
- unrelated gamification
- new branding
- unnecessary animation
- unrelated AI features

This pass exists to CLOSE existing requirements.

---

# 38. FINAL SELF-AUDIT

After implementation, inspect the PRODUCT AS A USER.

Ask:

### Student
“Does Orion tell me I AM a particular type of person, or help me explore possibilities?”

### Parent
“Can I understand the evidence behind a suggestion?”

### Career counsellor
“Are evidence and reflection clearly separated?”

### Psychologist
“Is Orion overreaching into therapy or diagnosis?”

### Security engineer
“Can I retrieve any API secret from browser code/storage/network?”

### Engineer
“Did we actually implement features, or just instruct Gemini to talk about them?”

Fix failures before stopping.

---

# 39. FINAL RESPONSE FORMAT

Return only:

## CLOSURE RESULT

### PASS
Completed requirements.

### FAILED / BLOCKED
Any requirement that genuinely could not be completed.

### SOURCE CHANGES
Files modified/created/deleted.

### SECURITY CHECK
Secret/browser/API status.

### CAREER ENGINE CHECK
Evidence vs Reflection separation status.

### CAREER EXPERIMENT CHECK
Actual lifecycle status.

### TRUST PAGE CHECK
URLs tested.

### TESTS
Exact tests executed.

### PRODUCTION VERIFICATION
URL tested and result.

### GIT STATUS
Branch/commit state.

### FINAL STATUS

Use exactly one:

**READY FOR PRODUCTION**

or

**NOT READY FOR PRODUCTION**

Do not use READY unless production itself—not only local source—passes the acceptance gate.

---

# FINAL INSTRUCTION

This is NOT another planning pass.

Do not reply with a proposed roadmap.

Do not merely describe code that should change.

Open the repository, edit the files, run the application, test the flows, inspect production, fix failures, deploy if deployment access exists, then verify again.

Continue until every feasible item in this Closure Pass is genuinely complete.