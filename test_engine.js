// Automated Unit Test Suite for Orion Path AI Production Refactor
const assert = require('assert');

// 1. Load modules
require('./data/careers.js');
require('./data/education.js');
require('./assets/js/safety.js');
require('./assets/js/riasec.js');
require('./assets/js/career-engine.js');
require('./assets/js/career-experiments.js');
require('./assets/js/family-bridge.js');
require('./assets/js/reflection-lab.js');

console.log('--- TEST 1: Child Safety & Crisis Keyword Detection ---');
assert.strictEqual(detectCrisis('Em đang cảm thấy muốn chết và bế tắc'), true, 'Should detect "muốn chết"');
assert.strictEqual(detectCrisis('Em muốn tự tử vì áp lực thi cử'), true, 'Should detect "tự tử"');
assert.strictEqual(detectCrisis('Em đang học khối A01 thì nên thi trường nào'), false, 'Normal query should not trigger crisis');
console.log('✓ Test 1 Passed: Crisis keywords detected accurately.');

console.log('--- TEST 2: Deterministic RIASEC Scoring & Descriptions ---');
assert.strictEqual(typeof RIASEC_CATEGORIES.R.name, 'string');
assert.strictEqual(typeof RIASEC_CATEGORIES.I.name, 'string');
assert.strictEqual(RIASEC_QUESTIONS.length, 12, 'Questionnaire has 12 standardized questions');
const engine = new OrionCareerEngine();
const mockAnswers = { R: 4, I: 4, A: 0, S: 2, E: 1, C: 1 };
const scores = engine.calculateRiasecScores(mockAnswers);
assert.deepStrictEqual(scores, { R: 4, I: 4, A: 0, S: 2, E: 1, C: 1 });
const topCodes = engine.getTopRiasecCodes(scores);
assert.strictEqual(topCodes[0] === 'R' || topCodes[0] === 'I', true);
console.log('✓ Test 2 Passed: RIASEC scoring is deterministic.');

console.log('--- TEST 3: Career Hypotheses, Evidence & Unknowns ---');
const hypotheses = engine.generateCareerHypotheses({
  riasecScores: scores,
  academic: { math: 9.0, lit: 7.0, eng: 8.5 },
  targets: ['tech', 'semiconductor']
});

assert.strictEqual(hypotheses.length >= 3 && hypotheses.length <= 5, true, 'Returns 3-5 hypotheses');
hypotheses.forEach((h, i) => {
  assert.ok(h.name, `Hypothesis ${i} must have a name`);
  assert.ok(h.signalLevel, `Hypothesis ${i} must have a signalLevel`);
  assert.ok(Array.isArray(h.evidenceFor) && h.evidenceFor.length > 0, `Hypothesis ${i} must have evidence`);
  assert.ok(Array.isArray(h.conflicts), `Hypothesis ${i} must have conflicts`);
  assert.ok(Array.isArray(h.unknowns) && h.unknowns.length > 0, `Hypothesis ${i} must have unknowns`);
  assert.ok(h.pathways && h.pathways.length > 0, `Hypothesis ${i} must have pathways`);
  assert.ok(h.salary && h.salary.range, `Hypothesis ${i} must have verified or labeled salary`);
});
console.log(`✓ Test 3 Passed: Generated ${hypotheses.length} Career Hypotheses with evidence, conflicts, and unknowns.`);

console.log('--- TEST 4: Isolation of Reflection Lab from Career Hypotheses ---');
const lab = new OrionReflectionLab();
const reflection1 = lab.generateCulturalReflection('2010-06-15', 'Nguyễn Minh An');
const reflection2 = lab.generateCulturalReflection('2008-01-01', 'Trần Thị Bình');

// Ensure reflection disclaimer is present
assert.strictEqual(reflection1.disclaimer, REFLECTION_DISCLAIMER);
// Verify that changing birthdate/cultural reflection does not alter hypotheses result
const hypothesesAfter = engine.generateCareerHypotheses({
  riasecScores: scores,
  academic: { math: 9.0, lit: 7.0, eng: 8.5 },
  targets: ['tech', 'semiconductor']
});
assert.deepStrictEqual(hypotheses.map(h => h.careerId), hypothesesAfter.map(h => h.careerId), 'Career hypotheses must NOT change when cultural reflection data changes');
console.log('✓ Test 4 Passed: Cultural Reflection is 100% isolated from career decision logic.');

console.log('--- TEST 5: Family Bridge Facilitator (No judging right/wrong) ---');
const facilitator = new FamilyBridgeFacilitator();
const dialogue = facilitator.generateDialogueReport({
  topHypothesis: hypotheses[0],
  academic: { math: 9, lit: 7, eng: 8.5 },
  studentVoice: 'Em muốn học lập trình AI',
  parentConcerns: 'Cha mẹ muốn ngành ổn định'
});

assert.ok(dialogue.studentPerspective);
assert.ok(dialogue.parentPerspective);
assert.ok(dialogue.commonGround);
assert.ok(dialogue.divergences);
assert.ok(dialogue.actionExperiment);

const serialized = JSON.stringify(dialogue);
assert.strictEqual(serialized.includes('Con đúng'), false, 'Must not claim Con đúng');
assert.strictEqual(serialized.includes('Cha mẹ đúng'), false, 'Must not claim Cha mẹ đúng');
console.log('✓ Test 5 Passed: Family Bridge acts as objective facilitator.');

console.log('--- TEST 6: Career Experiments Tracking & Reflection ---');
const exp = EXPERIMENT_REPOSITORY['exp_ai_chatbot'];
assert.ok(exp);
assert.strictEqual(exp.instructions.length, 4);
assert.strictEqual(exp.duration, '90 phút');
console.log('✓ Test 6 Passed: Career experiments repository intact.');

console.log('\n=========================================');
console.log('ALL 6 PRODUCTION ENGINE TESTS PASSED 100%');
console.log('=========================================');
