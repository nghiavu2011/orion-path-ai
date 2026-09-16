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
  console.log('✓ API Test 4 Passed: Safe 503 maintenance message returned when key missing.');
  if (oldKey) process.env.GEMINI_API_KEY = oldKey;

  console.log('\n=====================================');
  console.log('ALL API SECURITY TESTS PASSED 100%');
  console.log('=====================================');
}

runApiTests().catch(err => {
  console.error('API Test Failed:', err);
  process.exit(1);
});
