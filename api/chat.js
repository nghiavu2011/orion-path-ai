// Vercel Serverless Function: Orion Path AI Secure AI Endpoint
// Handles Career Coach, Family Facilitator, and Reflection Lab with strict separation and child-safety guards.

const IMMEDIATE_DANGER_KEYWORDS = [
  'tự tử', 'tu tu', 'suicide', 'muốn chết', 'muon chet', 'cắt cổ tay', 'cat co tay', 'chết đi cho xong', 'chet di cho xong'
];

const HIGH_RISK_KEYWORDS = [
  'tự hại', 'tu hai', 'self-harm', 'kết liễu', 'ket lieu',
  'bị bạo hành', 'bi bao hanh', 'bị đánh', 'bi danh', 'bị lạm dụng', 'bi lam dung',
  'bị xâm hại', 'bi xam hai', 'trầm cảm nặng', 'tram cam nang', 'tuyệt vọng', 'tuyet vong',
  'muốn biến mất', 'muon bien mat', 'không muốn sống', 'khong muon song'
];

const DISTRESS_KEYWORDS = [
  'quá kiệt sức', 'qua kiet suc', 'áp lực không chịu nổi', 'khóc suốt',
  'mất ngủ triền miên', 'rất hoảng loạn', 'bế tắc hoàn toàn', 'muốn buông xuôi',
  'áp lực', 'stress', 'lo lắng', 'mệt mỏi', 'bế tắc'
];

function classifySafety(text) {
  if (!text || typeof text !== 'string') return 'NORMAL';
  const lower = text.toLowerCase();
  if (IMMEDIATE_DANGER_KEYWORDS.some(k => lower.includes(k))) return 'IMMEDIATE_DANGER';
  if (HIGH_RISK_KEYWORDS.some(k => lower.includes(k))) return 'HIGH_RISK';
  if (DISTRESS_KEYWORDS.some(k => lower.includes(k))) return 'DISTRESS';
  return 'NORMAL';
}

const CRISIS_RESPONSE = `Chào em, Orion nhận thấy em có thể đang phải trải qua những cảm xúc rất nặng nề hoặc tình huống khó khăn. Sự an toàn và sức khỏe tâm lý của em luôn quan trọng hơn bất kỳ kế hoạch nghề nghiệp hay học tập nào.

Orion là trợ lý định hướng học tập, không phải chuyên gia tâm lý hay bác sĩ y khoa. Em hãy dừng ngay việc tra cứu nghề nghiệp và liên hệ ngay với người lớn đáng tin cậy (cha mẹ, thầy cô, người thân) hoặc các kênh hỗ trợ khẩn cấp chính thức tại Việt Nam:

☎️ Tổng đài Quốc gia Bảo vệ Trẻ em: 111 (Cục Bà mẹ và Trẻ em — Bộ Y tế, hoạt động 24/7, hoàn toàn miễn phí)
🏥 Cấp cứu Y tế Khẩn cấp: 115 (Trực cấp cứu y tế toàn quốc) hoặc cơ sở y tế gần nhất

Em không phải vượt qua điều này một mình. Hãy tìm kiếm sự hỗ trợ ngay em nhé!`;

const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3.8-flash';
const GEMINI_FALLBACK_MODEL = 'gemini-2.5-flash';
const USER_SAFE_AI_ERROR = 'Trợ lý AI hiện tạm thời chưa khả dụng. Các kết quả hướng nghiệp và dữ liệu của em vẫn được giữ nguyên. Vui lòng thử lại sau.';

// Lightweight in-memory rate limiter (~15 requests / client / hour)
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 15;
const ipRateLimitMap = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const record = ipRateLimitMap.get(ip);
  if (!record || (now - record.startTime > RATE_LIMIT_WINDOW_MS)) {
    ipRateLimitMap.set(ip, { count: 1, startTime: now });
    return { allowed: true };
  }
  if (record.count >= RATE_LIMIT_MAX) {
    return { allowed: false };
  }
  record.count += 1;
  return { allowed: true };
}

// Server-side context sanitizers (Strict allow-listing to prevent PII leakage)
function sanitizeCareerContext(profile) {
  if (!profile) return null;
  const cp = profile.careerProfile || profile;
  return {
    grade: typeof cp.grade === 'string' ? cp.grade.slice(0, 20) : 'Lớp 10',
    riasec: typeof cp.riasec === 'string' ? cp.riasec.slice(0, 50) : '',
    math: (typeof cp.math === 'number' || typeof cp.math === 'string') && cp.math !== null ? String(cp.math).slice(0, 5) : null,
    lit: (typeof cp.lit === 'number' || typeof cp.lit === 'string') && cp.lit !== null ? String(cp.lit).slice(0, 5) : null,
    eng: (typeof cp.eng === 'number' || typeof cp.eng === 'string') && cp.eng !== null ? String(cp.eng).slice(0, 5) : null,
    targets: Array.isArray(cp.targets) ? cp.targets.slice(0, 5).map(t => String(t).slice(0, 50)) : [],
    coreValues: Array.isArray(cp.coreValues) ? cp.coreValues.slice(0, 3).map(v => String(v).slice(0, 50)) : [],
    workPreferences: Array.isArray(cp.workPreferences) ? cp.workPreferences.slice(0, 3).map(w => String(w).slice(0, 50)) : [],
    completedExperiments: Array.isArray(cp.completedExperiments) ? cp.completedExperiments.slice(0, 5).map(e => String(e).slice(0, 100)) : []
  };
}

function sanitizeFamilyContext(profile) {
  if (!profile) return null;
  const fp = profile.careerProfile || profile;
  return {
    grade: typeof fp.grade === 'string' ? fp.grade.slice(0, 20) : 'Lớp 10',
    riasec: typeof fp.riasec === 'string' ? fp.riasec.slice(0, 50) : '',
    studentTarget: typeof fp.studentTarget === 'string' ? fp.studentTarget.slice(0, 100) : '',
    parentExpectation: typeof profile.parentExpectation === 'string' ? profile.parentExpectation.slice(0, 100) : ''
  };
}

function sanitizeReflectionContext(profile) {
  if (!profile) return null;
  return {
    birthYear: profile.birthYear ? String(profile.birthYear).slice(0, 4) : null,
    topic: profile.topic ? String(profile.topic).slice(0, 100) : 'Chiêm nghiệm bản thân'
  };
}

export { classifySafety, sanitizeCareerContext, sanitizeFamilyContext, sanitizeReflectionContext, GEMINI_MODEL, USER_SAFE_AI_ERROR, checkRateLimit };

export default async function handler(req, res) {
  // Enforce POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Chỉ chấp nhận phương thức POST (Method Not Allowed)' });
  }

  // Set secure headers
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // Rate Limiting (~15 req/hr per IP)
  const forwarded = req.headers && req.headers['x-forwarded-for'];
  const clientIp = (typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : null) || (req.socket && req.socket.remoteAddress) || 'client-default';
  const rateStatus = checkRateLimit(clientIp);
  if (!rateStatus.allowed) {
    return res.status(429).json({
      error: 'Em đã gửi khá nhiều câu hỏi trong giờ này. Vui lòng nghỉ ngơi một chút và quay lại sau nhé.'
    });
  }

  const { message, profile, mode = 'career_coach', history = [] } = req.body || {};

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: 'Nội dung câu hỏi không được để trống.' });
  }

  if (message.length > 2000) {
    return res.status(400).json({ error: 'Nội dung câu hỏi quá dài (vui lòng tóm tắt dưới 1.000 ký tự).' });
  }

  // Enforce message length limit
  const sanitizedMessage = message.trim().slice(0, 1000);

  // Check child safety classification (canonical 4-tier enum)
  const safetyLevel = classifySafety(sanitizedMessage);
  if (safetyLevel === 'IMMEDIATE_DANGER' || safetyLevel === 'HIGH_RISK') {
    return res.status(200).json({
      reply: CRISIS_RESPONSE,
      safetyTriggered: true,
      safetyLevel: safetyLevel
    });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('AI Runtime Error: AI_CONFIG_MISSING');
    return res.status(503).json({
      error: USER_SAFE_AI_ERROR
    });
  }

  // Build isolated system instruction based on mode
  let systemInstruction = '';

  if (mode === 'family_facilitator') {
    const sc = sanitizeFamilyContext(profile);
    systemInstruction = `Bạn là một Điều phối viên Giáo dục và Gia đình (Family Dialogue Facilitator) thấu cảm, khách quan, giàu kinh nghiệm tại Việt Nam.
Mục tiêu của bạn là xây dựng cầu nối thấu hiểu giữa cha mẹ và học sinh lứa tuổi 14-18 (lớp 9 đến lớp 12).
NGUYÊN TẮC BẮT BUỘC:
1. KHÔNG BAO GIỜ phân xử ai đúng, ai sai ("Con đúng" hay "Cha mẹ đúng").
2. Luôn làm rõ:
   - Góc nhìn và mong muốn thực sự của học sinh.
   - Nỗi lo âu và tình yêu thương của cha mẹ (về tính an toàn, chi phí, ổn định).
   - Mục tiêu chung của cả hai thế hệ.
   - Các điểm khác biệt góc nhìn cần dung hòa.
   - Thử nghiệm thực tế (Career Experiment) nào có thể giúp cả hai kiểm chứng mà không gây tranh cãi gay gắt.
3. Sử dụng ngôn ngữ tôn trọng, ấm áp, văn minh, mang tính kiến tạo giải pháp.
4. TUYỆT ĐỐI KHÔNG dùng bói toán, tử vi, thần số học để đưa ra lời khuyên.`;

    if (sc) {
      systemInstruction += `\n\nThông tin bối cảnh học sinh:
- Khối lớp: ${sc.grade}
- Sở thích nghề nghiệp (RIASEC): ${sc.riasec || 'Chưa xác định'}
- Hướng ngành học sinh quan tâm: ${sc.studentTarget || 'Đang khám phá'}
- Nguyện vọng gia đình: ${sc.parentExpectation || 'Mong muốn ngành ổn định, an toàn'}`;
    }
  } else if (mode === 'reflection_lab') {
    const rc = sanitizeReflectionContext(profile);
    systemInstruction = `Bạn là chuyên gia diễn giải chiêm nghiệm văn hóa dân gian phương Đông và triết lý số Pythagoras trong khuôn khổ Reflection Lab của Orion.
NGUYÊN TẮC BẮT BUỘC:
1. Bạn PHẢI khẳng định: "Đây là nội dung chiêm nghiệm văn hóa, mang tính gợi mở suy ngẫm bản thân, không phải đánh giá tâm lý, đo lường năng lực hay công cụ dự đoán nghề nghiệp."
2. TUYỆT ĐỐI KHÔNG phán đoán tương lai hay cam đoan số phận học sinh.
3. Khuyến khích học sinh tập trung vào rèn luyện năng lực thực tế, học tập chăm chỉ và làm các trải nghiệm thực tế để tự quyết định con đường của mình.`;
    if (rc && rc.birthYear) {
      systemInstruction += `\n\nNăm sinh tham khảo: ${rc.birthYear} (Chỉ phục vụ góc nhìn văn hóa, không liên quan đến nghề nghiệp)`;
    }
  } else {
    // Default: Evidence-based Career Coach (career_coach)
    const cc = sanitizeCareerContext(profile);
    systemInstruction = `Bạn là Chuyên gia Khai vấn Hướng nghiệp AI (Orion Career Coach) dành cho học sinh từ lớp 9 đến lớp 12 tại Việt Nam.
NGUYÊN TẮC BẮT BUỘC:
1. ĐI THẲNG VÀO TRỌNG TÂM: Trả lời trực tiếp và rõ ràng câu hỏi của học sinh ngay từ câu đầu tiên. Tuyệt đối không chào hỏi dông dài hay lặp lại các câu rập khuôn như 'Orion rất vui khi...'.
2. RÕ RÀNG, ĐẦY ĐỦ & CỤ THỂ: Cung cấp thông tin thực tế chính xác (tên các trường đại học cụ thể, các khối/tổ hợp môn, phương thức xét tuyển TSA/HSA/học bạ, ưu nhược điểm chi tiết từng lựa chọn, các bước ôn luyện).
3. ĐỘ DÀI TỐI ƯU & GÃY GỌN (khoảng 400 - 600 từ): Trình bày bằng các đề mục và gạch đầu dòng rõ ràng, mạch lạc, đi trọn vẹn từ phân tích đến kết luận và các bước hành động tiếp theo, không viết lan man kéo dài.
4. KẾT THÚC BẰNG HÀNH ĐỘNG CỤ THỂ: Nêu 2-3 bước hành động cụ thể tiếp theo để học sinh áp dụng ngay.
5. Orion KHÔNG PHẢI là nhà tiên tri (Oracle). KHÔNG BAO GIỜ nói "Em sinh ra để làm nghề X" hay đưa ra các tỷ lệ % phù hợp ảo.
6. Cập nhật chính sách giáo dục Việt Nam chính xác: Dùng thuật ngữ "Kỳ thi tốt nghiệp THPT" (KHÔNG dùng từ cũ THPT Quốc Gia), nắm rõ các tổ hợp môn mới theo Chương trình THPT Mới (áp dụng kỳ thi tốt nghiệp 2025–2026+), các phương thức xét tuyển (học bạ, thi ĐGNL HSA/APT, thi Đánh giá tư duy TSA Bách Khoa, chứng chỉ quốc tế, điểm thi tốt nghiệp).
7. Tôn trọng mọi lộ trình: Đại học, Cao đẳng thực hành, Học nghề, Chương trình liên kết, Du học. Không thiên vị chỉ mỗi "đại học danh tiếng".
8. AN TOÀN TRẺ EM: Bạn KHÔNG PHẢI là bác sĩ tâm lý hay chuyên gia trị liệu. Nếu học sinh có dấu hiệu stress nặng, hãy khuyên học sinh chia sẻ với người lớn tin cậy hoặc gọi tổng đài 111.
9. TUYỆT ĐỐI KHÔNG SỬ DỤNG Tử Vi, Nạp Âm, Thần Số Học, Cung Hoàng Đạo trong tư vấn nghề nghiệp.`;

    if (safetyLevel === 'DISTRESS') {
      systemInstruction += `\n\n[LƯU Ý ĐẶC BIỆT]: Học sinh đang bày tỏ cảm xúc lo âu/căng thẳng học tập. Hãy phản hồi với sự thấu cảm cao nhất, động viên tinh thần trước khi bàn về việc học, nhắc nhở em giữ gìn sức khỏe.`;
    }

    if (cc) {
      systemInstruction += `\n\nHồ sơ học sinh (Dữ liệu bằng chứng đã chuẩn hóa):
- Khối lớp: ${cc.grade}
- Điểm học thuật: ${cc.math ? 'Toán ' + cc.math : 'Toán: Chưa có'}, ${cc.lit ? 'Ngữ văn ' + cc.lit : 'Ngữ văn: Chưa có'}, ${cc.eng ? 'Tiếng Anh ' + cc.eng : 'Tiếng Anh: Chưa có'}
- Sở thích nghề nghiệp (RIASEC): ${cc.riasec || 'Chưa rõ'}
- Định hướng quan tâm: ${cc.targets.length > 0 ? cc.targets.join(', ') : 'Đang tìm hiểu'}
- Giá trị cốt lõi: ${cc.coreValues.length > 0 ? cc.coreValues.join(', ') : 'Chưa chọn'}
- Thử nghiệm đã làm: ${cc.completedExperiments.length > 0 ? cc.completedExperiments.join(', ') : 'Chưa có'}`;
    }
  }

  // Prepend supportive boundary for DISTRESS tier (Section 4)
  if (safetyLevel === 'DISTRESS') {
    systemInstruction = `[LƯU Ý AN TOÀN TÂM LÝ - HỖ TRỢ CẢM XÚC (DISTRESS TIER)]
Học sinh hoặc phụ huynh đang thể hiện dấu hiệu áp lực, mệt mỏi hoặc lo âu.
1. Luôn phản hồi bằng sự thấu cảm nhẹ nhàng, thấu hiểu và động viên tích cực.
2. TUYỆT ĐỐI KHÔNG chẩn đoán bệnh lý tâm thần (trầm cảm, lo âu...) hay đưa ra lời khuyên y khoa.
3. Giảm nhẹ áp lực chọn nghề/học tập; khuyến khích học sinh nghỉ ngơi, chia nhỏ mục tiêu và chia sẻ với người thân đáng tin cậy.\n\n` + systemInstruction;
  }

  // Bounded chat history window (at most 4 recent messages, 500 chars max each)
  const boundedContents = [];
  if (Array.isArray(history) && history.length > 0) {
    const recentHistory = history.slice(-4);
    for (const h of recentHistory) {
      const role = h.role === 'model' ? 'model' : 'user';
      const text = typeof h.text === 'string' ? h.text.slice(0, 500) : (typeof h.message === 'string' ? h.message.slice(0, 500) : '');
      if (text) {
        boundedContents.push({ role, parts: [{ text }] });
      }
    }
  }
  boundedContents.push({
    role: 'user',
    parts: [{ text: sanitizedMessage }]
  });

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 28000); // 28s timeout (aligned with maxDuration: 30s)

    const payload = JSON.stringify({
      system_instruction: {
        parts: [{ text: systemInstruction }]
      },
      contents: boundedContents,
      generationConfig: {
        temperature: mode === 'family_facilitator' ? 0.6 : 0.7,
        maxOutputTokens: 1200,
        thinkingConfig: { thinkingBudget: 0 }
      }
    });

    const candidateModels = [
      'gemini-3.6-flash',
      'gemini-3.5-flash',
      GEMINI_MODEL,
      'gemini-3.7-flash',
      GEMINI_FALLBACK_MODEL,
      'gemini-2.5-flash'
    ].filter((m, idx, arr) => m && arr.indexOf(m) === idx);

    let response = null;
    for (const modelToUse of candidateModels) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelToUse}:generateContent?key=${apiKey}`;
      response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        signal: controller.signal,
        body: payload
      });

      if (response.ok) {
        break;
      }

      console.warn(`Model ${modelToUse} returned status ${response.status}, trying next fallback...`);
      if (response.status !== 429 && response.status !== 503) {
        break;
      }
    }

    clearTimeout(timeout);

    if (!response || !response.ok) {
      console.error('Gemini Provider Error Status:', response ? response.status : 'No response');
      return res.status(502).json({
        error: USER_SAFE_AI_ERROR
      });
    }

    const data = await response.json();
    if (data.candidates && data.candidates[0] && data.candidates[0].content && Array.isArray(data.candidates[0].content.parts)) {
      const text = data.candidates[0].content.parts
        .filter(p => !p.thought && typeof p.text === 'string')
        .map(p => p.text)
        .join('')
        .trim();

      if (text) {
        return res.status(200).json({
          reply: text,
          mode: mode,
          safetyLevel: safetyLevel
        });
      }
    }

    return res.status(502).json({
      error: USER_SAFE_AI_ERROR
    });
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('AI Request Timeout');
      return res.status(504).json({
        error: USER_SAFE_AI_ERROR
      });
    }
    console.error('Serverless Execution Error:', error.message);
    return res.status(500).json({
      error: USER_SAFE_AI_ERROR
    });
  }
}
