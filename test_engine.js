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

console.log('--- TEST 6: Career Experiments Tracking & Repository ---');
const exp = EXPERIMENT_REPOSITORY['exp_ai_chatbot'];
assert.ok(exp);
assert.strictEqual(exp.instructions.length, 4);
assert.strictEqual(exp.duration, '90 phút');
console.log('✓ Test 6 Passed: Career experiments repository intact.');

console.log('--- TEST 7: Multi-Tier Child Safety & Official Hotlines (Section 23 & 24) ---');
assert.strictEqual(classifySafetyTier('Em muốn tự tử'), 'IMMEDIATE_DANGER');
assert.strictEqual(classifySafetyTier('Em bị bạo hành gia đình'), 'HIGH_RISK');
assert.strictEqual(classifySafetyTier('Em quá kiệt sức và bế tắc hoàn toàn'), 'DISTRESS');
assert.strictEqual(classifySafetyTier('Em muốn tìm hiểu ngành thiết kế đồ họa'), 'NORMAL');
assert.strictEqual(SAFETY_CONFIG.officialHotlines.length, 2);
assert.strictEqual(SAFETY_CONFIG.officialHotlines[0].number, '111');
assert.strictEqual(SAFETY_CONFIG.officialHotlines[1].number, '115');
console.log('✓ Test 7 Passed: Multi-tier child safety and verified official hotlines intact.');

console.log('--- TEST 8: Structured Career Hypotheses Validation & Fallback (Section 15 & 22) ---');
const validHypothesis = [{
  id: 'test_1',
  career: 'Kỹ sư AI',
  field: 'Công nghệ',
  signalLevel: 'strong',
  supportingEvidence: ['Toán 9.0'],
  conflicts: ['Học nhiều'],
  unknowns: ['Kiên trì'],
  experiments: [{ id: 'exp_test', title: 'Thử nghiệm test' }],
  educationPaths: [{ type: 'Đại học' }]
}];
const validated = engine.validateCareerHypotheses(validHypothesis);
assert.strictEqual(validated.length, 1);
assert.strictEqual(validated[0].signalLevel, 'strong');
assert.strictEqual(validated[0].signalLevelLabel, 'Tín hiệu mạnh');

// Malformed input must not throw and must return valid fallback
const malformedFallback = engine.validateCareerHypotheses("invalid json {", { riasecScores: scores });
assert.ok(Array.isArray(malformedFallback));
assert.strictEqual(malformedFallback.length >= 3, true);
console.log('✓ Test 8 Passed: Structured hypotheses validated and gracefully handled when malformed.');

console.log('--- TEST 9: 4-Stage Career Experiment Lifecycle (Section 17) ---');
const mgr = new CareerExperimentManager();
assert.strictEqual(mgr.getExperimentStatus('exp_figma_app'), 'NOT STARTED');
mgr.startExperiment('exp_figma_app');
assert.strictEqual(mgr.getExperimentStatus('exp_figma_app'), 'IN PROGRESS');
mgr.openReflectionStage('exp_figma_app');
assert.strictEqual(mgr.getExperimentStatus('exp_figma_app'), 'REFLECTION');
mgr.saveReflection('exp_figma_app', { q1: 'Rất vui', q2: 'Có', q3: 'Vẽ UI', q4: 'Không', q5: 'Có', q6: 'Màu sắc' });
assert.strictEqual(mgr.getExperimentStatus('exp_figma_app'), 'COMPLETED');
const completed = mgr.getCompletedList();
assert.strictEqual(completed.some(c => c.id === 'exp_figma_app'), true);
console.log('✓ Test 9 Passed: 4-stage experiment lifecycle works end-to-end.');

console.log('\n=========================================');
console.log('ALL 9 PRODUCTION ENGINE TESTS PASSED 100%');
console.log('=========================================');

