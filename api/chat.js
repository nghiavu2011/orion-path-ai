// Vercel Serverless Function: Orion Path AI Secure AI Endpoint
// Handles Career Coach, Family Facilitator, and Reflection Lab with strict separation and child-safety guards.

const CRISIS_KEYWORDS = [
  'tự tử', 'tu tu', 'suicide', 'tự hại', 'tu hai', 'self-harm',
  'muốn chết', 'muon chet', 'kết liễu', 'ket lieu', 'cắt cổ tay', 'cat co tay',
  'bị bạo hành', 'bi bao hanh', 'bị đánh', 'bi danh', 'bị lạm dụng', 'bi lam dung',
  'bị xâm hại', 'bi xam hai', 'trầm cảm nặng', 'tram cam nang', 'tuyệt vọng', 'tuyet vong'
];

function checkCrisisContent(text) {
  if (!text || typeof text !== 'string') return false;
  const lower = text.toLowerCase();
  return CRISIS_KEYWORDS.some(keyword => lower.includes(keyword));
}

const CRISIS_RESPONSE = `Chào em, Orion nhận thấy em có thể đang phải trải qua những cảm xúc rất nặng nề hoặc tình huống khó khăn. Sự an toàn và sức khỏe tâm lý của em luôn quan trọng hơn bất kỳ kế hoạch nghề nghiệp hay học tập nào.

Orion là trợ lý định hướng học tập, không phải chuyên gia tâm lý hay bác sĩ y khoa. Em hãy dừng ngay việc tra cứu nghề nghiệp và liên hệ ngay với người lớn đáng tin cậy (cha mẹ, thầy cô, người thân) hoặc các kênh hỗ trợ khẩn cấp miễn phí:

☎️ Tổng đài Quốc gia Bảo vệ Trẻ em: 111 (hoạt động 24/7, hoàn toàn miễn phí)
☎️ Đường dây nóng Hỗ trợ Tâm lý Ngày Mai: 096 306 1414
🏥 Nếu trong tình huống nguy cấp, em hãy đến ngay cơ sở y tế hoặc trạm y tế gần nhất.

Em không phải vượt qua điều này một mình. Hãy tìm kiếm sự hỗ trợ ngay em nhé!`;

export default async function handler(req, res) {
  // Enforce POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Chỉ chấp nhận phương thức POST (Method Not Allowed)' });
  }

  // Set secure headers (same-origin / controlled)
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  const { message, profile, mode = 'career_coach' } = req.body || {};

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: 'Nội dung câu hỏi không được để trống.' });
  }

  // Enforce message length limit to prevent abuse
  const sanitizedMessage = message.trim().slice(0, 1000);

  // Check child safety & crisis keywords
  if (checkCrisisContent(sanitizedMessage)) {
    return res.status(200).json({
      reply: CRISIS_RESPONSE,
      safetyTriggered: true
    });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      error: 'Hệ thống AI hiện đang trong chế độ bảo trì hoặc chưa cấu hình API Key phía máy chủ. Vui lòng thử lại sau.'
    });
  }

  // Build isolated system prompt based on mode
  let systemInstruction = '';

  if (mode === 'family_facilitator') {
    // Family Negotiation Bridge Facilitator
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

    if (profile && profile.careerProfile) {
      const cp = profile.careerProfile;
      systemInstruction += `\n\nThông tin bối cảnh học sinh:
- Tên: ${cp.name || 'Học sinh'}
- Lớp/Độ tuổi: ${cp.grade || 'Lớp 10'}
- Sở thích nghề nghiệp (RIASEC): ${cp.riasec || 'Chưa xác định'}
- Môn học thế mạnh: ${cp.strengths || 'Chưa cập nhật'}
- Hướng ngành con quan tâm: ${cp.targetField || 'Đang khám phá'}
- Nguyện vọng gia đình: ${profile.parentExpectation || 'Mong muốn ngành ổn định, an toàn'}`;
    }
  } else if (mode === 'reflection_lab') {
    // Reflection Lab - Cultural & Symbolic Reflection ONLY
    systemInstruction = `Bạn là chuyên gia diễn giải chiêm nghiệm văn hóa dân gian phương Đông và triết lý số Pythagoras trong khuôn khổ Reflection Lab của Orion.
NGUYÊN TẮC BẮT BUỘC:
1. Bạn PHẢI khẳng định: "Đây là nội dung chiêm nghiệm văn hóa, mang tính gợi mở suy ngẫm bản thân, không phải đánh giá tâm lý, đo lường năng lực hay công cụ dự đoán nghề nghiệp."
2. TUYỆT ĐỐI KHÔNG phán đoán tương lai hay cam đoan số phận học sinh.
3. Khuyến khích học sinh tập trung vào rèn luyện năng lực thực tế, học tập chăm chỉ và làm các trải nghiệm thực tế để tự quyết định con đường của mình.`;
  } else {
    // Default: Evidence-based Career Coach
    systemInstruction = `Bạn là Chuyên gia Khai vấn Hướng nghiệp AI (Evidence-Informed Career Coach) dành cho học sinh từ lớp 9 đến lớp 12 tại Việt Nam.
NGUYÊN TẮC BẮT BUỘC:
1. Phương pháp hướng nghiệp dựa trên BẰNG CHỨNG (sở thích nghề nghiệp RIASEC, kết quả học tập, môn học yêu thích, kỹ năng đã thể hiện, thử nghiệm thực tế đã làm).
2. Orion KHÔNG PHẢI là nhà tiên tri (Oracle). KHÔNG BAO GIỜ nói "Em sinh ra để làm nghề X" hay đưa ra các tỷ lệ % phù hợp ảo.
3. Luôn đưa ra các GIẢ THIẾT NGHỀ NGHIỆP (Career Hypotheses): nêu rõ bằng chứng hiện có ủng hộ điều gì, mâu thuẫn cần lưu ý, và "Orion chưa biết điều gì về em".
4. Khuyến khích học sinh tiến hành "Trải nghiệm thử" (Career Experiments: mini-project, phỏng vấn người đi trước, học thử khóa học ngắn) để kiểm chứng giả thiết.
5. Cập nhật chính sách giáo dục Việt Nam chính xác: Dùng thuật ngữ "Kỳ thi tốt nghiệp THPT" (KHÔNG dùng từ cũ THPT Quốc Gia), nắm rõ các tổ hợp môn mới, các phương thức xét tuyển (học bạ, thi ĐGNL/TSA, chứng chỉ quốc tế, điểm thi tốt nghiệp).
6. Tôn trọng mọi lộ trình: Đại học, Cao đẳng, Học nghề, Chương trình liên kết, Du học. Không thiên vị chỉ mỗi "đại học danh tiếng".
7. AN TOÀN TRẺ EM: Bạn KHÔNG PHẢI là bác sĩ tâm lý hay chuyên gia trị liệu. Nếu học sinh có dấu hiệu stress cực độ, hãy khuyên học sinh chia sẻ với người lớn tin cậy hoặc gọi tổng đài 111.
8. TUYỆT ĐỐI KHÔNG SỬ DỤNG Tử Vi, Nạp Âm, Thần Số Học, Cung Hoàng Đạo trong tư vấn nghề nghiệp.`;

    if (profile) {
      // Only extract career-related evidence fields (strict isolation from reflection fields)
      const cp = profile.careerProfile || profile;
      systemInstruction += `\n\nHồ sơ học sinh (Dữ liệu bằng chứng):
- Họ tên: ${cp.name || 'Học sinh'}
- Giới tính: ${cp.gender || 'Chưa rõ'}
- Điểm học thuật: Toán ${cp.math || 'Chưa rõ'}, Ngữ văn ${cp.lit || 'Chưa rõ'}, Tiếng Anh ${cp.eng || 'Chưa rõ'}
- Sở thích nghề nghiệp (RIASEC): ${cp.riasec || 'Chưa rõ'}
- Định hướng quan tâm: ${cp.targets ? (Array.isArray(cp.targets) ? cp.targets.join(', ') : cp.targets) : 'Đang tìm hiểu'}
- Thử nghiệm đã trải nghiệm: ${cp.completedExperiments || 'Chưa có thử nghiệm nào'}`;
    }
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    
    // Call Gemini API with timeout protection
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000); // 20s timeout

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      signal: controller.signal,
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: `${systemInstruction}\n\nCâu hỏi của học sinh: "${sanitizedMessage}"` }]
          }
        ],
        generationConfig: {
          temperature: mode === 'family_facilitator' ? 0.6 : 0.7,
          maxOutputTokens: 1000
        }
      })
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const errText = await response.text();
      console.error('Gemini Provider Error Status:', response.status, errText.slice(0, 200));
      return res.status(502).json({
        error: 'Dịch vụ AI đang bận hoặc gặp sự cố kết nối tạm thời. Vui lòng thử lại sau giây lát.'
      });
    }

    const data = await response.json();
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
      const text = data.candidates[0].content.parts[0].text;
      return res.status(200).json({
        reply: text,
        mode: mode
      });
    } else {
      return res.status(502).json({
        error: 'Không nhận được câu trả lời hợp lệ từ AI. Vui lòng đặt lại câu hỏi ngắn gọn hơn.'
      });
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      return res.status(504).json({
        error: 'Quá thời gian phản hồi từ máy chủ AI (Timeout). Vui lòng thử lại.'
      });
    }
    console.error('Serverless Execution Error:', error.message);
    return res.status(500).json({
      error: 'Đã xảy ra sự cố nội bộ khi xử lý phản hồi AI.'
    });
  }
}
