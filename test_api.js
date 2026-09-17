// Unit test for /api/chat.js serverless handler
const assert = require('assert');

// Mock req / res helpers
function createMockRes() {
  const res = {
    statusCode: 200,
    headers: {},
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    setHeader(k, v) {
      this.headers[k] = v;
      return this;
    },
    json(data) {
      this.body = data;
      return this;
    }
  };
  return res;
}

async function runApiTests() {
  const handler = (await import('./api/chat.js')).default;

  console.log('--- API TEST 1: Reject Non-POST Requests ---');
  const res1 = createMockRes();
  await handler({ method: 'GET' }, res1);
  assert.strictEqual(res1.statusCode, 405);
  console.log('✓ API Test 1 Passed: 405 Method Not Allowed.');

  console.log('--- API TEST 2: Reject Empty Message ---');
  const res2 = createMockRes();
  await handler({ method: 'POST', body: { message: '' } }, res2);
  assert.strictEqual(res2.statusCode, 400);
  console.log('✓ API Test 2 Passed: 400 Bad Request on empty message.');

  console.log('--- API TEST 3: Canonical 4-Tier Safety Classification & Interception ---');
  const { classifySafety } = await import('./api/chat.js');
  assert.strictEqual(classifySafety('Em muốn tự tử'), 'IMMEDIATE_DANGER');
  assert.strictEqual(classifySafety('Em bị bạo hành gia đình'), 'HIGH_RISK');
  assert.strictEqual(classifySafety('Em thấy rất áp lực và mệt mỏi'), 'DISTRESS');
  assert.strictEqual(classifySafety('Em muốn tìm hiểu ngành AI'), 'NORMAL');
  console.log('✓ API Test 3.1 Passed: classifySafety correctly identifies all 4 tiers.');

  // Test IMMEDIATE_DANGER via handler
  const resDanger = createMockRes();
  await handler({
    method: 'POST',
    body: { message: 'Em muốn tự tử ngay bây giờ' }
  }, resDanger);
  assert.strictEqual(resDanger.statusCode, 200);
  assert.strictEqual(resDanger.body.safetyTriggered, true);
  assert.strictEqual(resDanger.body.safetyLevel, 'IMMEDIATE_DANGER');
  assert.strictEqual(resDanger.body.reply.includes('111'), true);
  assert.strictEqual(resDanger.body.reply.includes('Cục Bà mẹ và Trẻ em — Bộ Y tế'), true);

  // Test HIGH_RISK via handler
  const resHighRisk = createMockRes();
  await handler({
    method: 'POST',
    body: { message: 'Em bị bạo hành và bị đánh đập' }
  }, resHighRisk);
  assert.strictEqual(resHighRisk.statusCode, 200);
  assert.strictEqual(resHighRisk.body.safetyTriggered, true);
  assert.strictEqual(resHighRisk.body.safetyLevel, 'HIGH_RISK');
  assert.strictEqual(resHighRisk.body.reply.includes('111'), true);
  console.log('✓ API Test 3.2 Passed: IMMEDIATE_DANGER and HIGH_RISK intercepted with 2026 authority.');

  console.log('--- API TEST 4: Graceful Handling when API Key is missing on server ---');
  const oldKey = process.env.GEMINI_API_KEY;
  delete process.env.GEMINI_API_KEY;
  const res4 = createMockRes();
  await handler({
    method: 'POST',
    body: { message: 'Em muốn tìm hiểu ngành AI' }
  }, res4);
  assert.strictEqual(res4.statusCode, 503);
  assert.strictEqual(typeof res4.body.error, 'string');
  assert.strictEqual(res4.body.error.includes('Trợ lý AI hiện tạm thời chưa khả dụng'), true);
  assert.strictEqual(res4.body.error.includes('API Key'), false, 'Must not leak API key implementation details');
  assert.strictEqual(res4.body.error.includes('GEMINI_API_KEY'), false, 'Must not leak env var name');
  console.log('✓ API Test 4 Passed: Safe 503 user-safe error returned with zero leaked internals.');
  if (oldKey) process.env.GEMINI_API_KEY = oldKey;

  console.log('--- API TEST 5: Centralized Model ID ---');
  const { GEMINI_MODEL } = await import('./api/chat.js');
  assert.strictEqual(GEMINI_MODEL, 'gemini-3.8-flash', 'Model must default to stable gemini-3.8-flash');
  console.log('✓ API Test 5 Passed: Centralized model correctly set to gemini-3.8-flash.');

  console.log('--- API TEST 6: Server-side Allow-list Context Sanitizers ---');
  const { sanitizeCareerContext, sanitizeFamilyContext, sanitizeReflectionContext } = await import('./api/chat.js');
  const dirtyProfile = {
    careerProfile: {
      name: 'Nguyễn Văn A',
      phone: '0912345678',
      email: 'test@example.com',
      address: '123 Đường ABC, Hà Nội',
      cccd: '001200000000',
      school: 'THPT Chu Văn An',
      grade: 'Lớp 11',
      math: 8.5,
      lit: 7.0,
      eng: 8.0,
      riasec: 'I-R-A',
      targets: ['Công nghệ', 'Y tế'],
      coreValues: ['Sáng tạo'],
      workPreferences: ['Nghiên cứu'],
      completedExperiments: ['exp_ai_chatbot']
    }
  };
  const sanitized = sanitizeCareerContext(dirtyProfile);
  assert.strictEqual(sanitized.phone, undefined, 'PII phone must be stripped');
  assert.strictEqual(sanitized.email, undefined, 'PII email must be stripped');
  assert.strictEqual(sanitized.address, undefined, 'PII address must be stripped');
  assert.strictEqual(sanitized.cccd, undefined, 'PII CCCD must be stripped');
  assert.strictEqual(sanitized.school, undefined, 'School name must be stripped');
  assert.strictEqual(sanitized.grade, 'Lớp 11', 'Grade must be preserved');
  assert.strictEqual(sanitized.math, '8.5', 'Academic math must be preserved');

  const familySanitized = sanitizeFamilyContext({
    careerProfile: { grade: 'Lớp 12', riasec: 'S-E', studentTarget: 'Sư phạm', phone: '0909090909' },
    parentExpectation: 'Kinh doanh'
  });
  assert.strictEqual(familySanitized.phone, undefined, 'PII in family context stripped');
  assert.strictEqual(familySanitized.grade, 'Lớp 12');
  assert.strictEqual(familySanitized.parentExpectation, 'Kinh doanh');

  const reflectionSanitized = sanitizeReflectionContext({ birthYear: 2008, phone: '123', topic: 'Triết lý số' });
  assert.strictEqual(reflectionSanitized.phone, undefined);
  assert.strictEqual(reflectionSanitized.birthYear, '2008');
  console.log('✓ API Test 6 Passed: Context sanitizers strictly allow-list guidance fields and strip all PII.');

  console.log('--- API TEST 7: Rate Limiter (~15 req/hour) ---');
  const testIp = '198.51.100.42';
  const { checkRateLimit } = await import('./api/chat.js');
  let allowedCount = 0;
  for (let i = 0; i < 20; i++) {
    const status = checkRateLimit(testIp);
    if (status.allowed) allowedCount++;
  }
  assert.strictEqual(allowedCount, 15, 'Rate limiter must permit exactly 15 requests before blocking');
  const blockedStatus = checkRateLimit(testIp);
  assert.strictEqual(blockedStatus.allowed, false, '16th request must be blocked');

  // Test handler integration with blocked IP
  const resRateLimit = createMockRes();
  await handler({
    method: 'POST',
    headers: { 'x-forwarded-for': testIp },
    body: { message: 'Kiểm tra rate limit' }
  }, resRateLimit);
  assert.strictEqual(resRateLimit.statusCode, 429, 'Blocked client must receive 429');
  console.log('✓ API Test 7 Passed: In-memory IP rate limiter restricts to 15 req/hr with 429.');

  console.log('--- API TEST 8: Reject Oversized Message ---');
  const oversizedMessage = 'a'.repeat(2500);
  const resOversized = createMockRes();
  await handler({
    method: 'POST',
    headers: { 'x-forwarded-for': '198.51.100.99' },
    body: { message: oversizedMessage }
  }, resOversized);
  assert.strictEqual(resOversized.statusCode, 400);
  assert.strictEqual(resOversized.body.error.includes('quá dài'), true);
  console.log('✓ API Test 8 Passed: Oversized messages (>2000 chars) are rejected with 400.');

  console.log('\n=====================================');
  console.log('ALL API SECURITY TESTS PASSED 100%');
  console.log('=====================================');
}

runApiTests().catch(err => {
  console.error('API Test Failed:', err);
  process.exit(1);
});
