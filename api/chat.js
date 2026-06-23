export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { message, profile } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Gemini API Key is not configured on the server. Please enter your own key in the settings.' });
  }

  // Build the prompt including the student's profile
  let systemPrompt = `Bạn là một chuyên gia tư vấn tuyển sinh và hướng nghiệp AI nhiệt huyết, thấu cảm cho học sinh lớp 9-12 tại Việt Nam. Nhiệm vụ của bạn là đưa ra những lời khuyên hữu ích, khoa học và thực tế về chọn trường cấp 3, chọn khối thi ĐH (A00, A01, D01, TSA, HSA...), định hướng ngành học và giải tỏa áp lực tâm lý học tập.\n\n`;
  if (profile) {
    systemPrompt += `Thông tin học sinh đang tư vấn:\n`;
    systemPrompt += `- Tên: ${profile.name || 'Học sinh'}\n`;
    systemPrompt += `- Giới tính: ${profile.gender || 'Chưa rõ'}\n`;
    systemPrompt += `- Ngày sinh: ${profile.dob || 'Chưa rõ'}\n`;
    systemPrompt += `- Kiểu tính cách Holland (RIASEC): ${profile.riasec || 'Chưa có'}\n`;
    if (profile.numerology) {
      systemPrompt += `- Chỉ số Đường đời (Numerology): ${profile.numerology.lifePath || 'Chưa có'}\n`;
    }
    if (profile.astrology) {
      systemPrompt += `- Nạp âm bản mệnh (Tử Vi): ${profile.astrology.napAm || 'Chưa có'}\n`;
    }
    systemPrompt += `Hãy sử dụng những thông tin cá nhân hóa này để trả lời một cách gần gũi, thấu cảm và chính xác nhất cho bạn học sinh này.\n\n`;
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: `${systemPrompt}Câu hỏi của học sinh: "${message}"` }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1000
        }
      })
    });

    const data = await response.json();
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
      const text = data.candidates[0].content.parts[0].text;
      
      // Allow CORS for easy testing
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      return res.status(200).json({ reply: text });
    } else {
      console.error('Gemini Error Response:', data);
      return res.status(500).json({ error: 'Failed to generate response from Gemini API' });
    }
  } catch (error) {
    console.error('Serverless Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
