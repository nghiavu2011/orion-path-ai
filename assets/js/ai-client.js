// Module Giao tiếp AI phía Client (ai-client.js)
// Bảo mật máy chủ: Không lưu API key ở trình duyệt, chỉ gọi qua Vercel Serverless Function (/api/chat).
// Đảm bảo không để lộ dữ liệu chiêm nghiệm văn hóa sang trợ lý hướng nghiệp.

class OrionAIClient {
  constructor() {
    this.endpoint = '/api/chat';
  }

  /**
   * Gửi câu hỏi đến Career Coach AI
   * @param {string} messageText 
   * @param {object} careerProfile 
   */
  async askCareerCoach(messageText, careerProfile) {
    if (!messageText || !messageText.trim()) {
      return { error: "Vui lòng nhập nội dung câu hỏi." };
    }

    // Client-side child-safety precheck
    if (typeof window.detectCrisis === 'function' && window.detectCrisis(messageText)) {
      if (typeof window.renderCrisisAlertModal === 'function') {
        window.renderCrisisAlertModal();
      }
      return {
        reply: "Orion đã kích hoạt cảnh báo an toàn tâm lý. Vui lòng xem thông tin hỗ trợ khẩn cấp trên màn hình hoặc gọi Tổng đài 111.",
        safetyTriggered: true
      };
    }

    // Sanitize profile: STRICTLY eliminate numerology and astrology
    const sanitizedCareerProfile = {
      name: careerProfile.name || 'Học sinh',
      gender: careerProfile.gender || 'Chưa rõ',
      grade: careerProfile.grade || 'Lớp 10',
      math: careerProfile.math,
      lit: careerProfile.lit,
      eng: careerProfile.eng,
      riasec: careerProfile.riasec,
      targets: careerProfile.targets || [],
      completedExperiments: careerProfile.completedExperiments || []
    };

    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: messageText.trim(),
          mode: 'career_coach',
          profile: { careerProfile: sanitizedCareerProfile }
        })
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          error: data.error || "Không thể kết nối đến máy chủ AI. Vui lòng thử lại sau ít phút."
        };
      }

      if (data.safetyTriggered && typeof window.renderCrisisAlertModal === 'function') {
        window.renderCrisisAlertModal();
      }

      return data;
    } catch (err) {
      console.error("AI Client Network Error:", err);
      return {
        error: "Sự cố kết nối mạng. Vui lòng kiểm tra internet và thử lại."
      };
    }
  }

  /**
   * Gửi câu hỏi đến Family Dialogue Facilitator
   * @param {string} messageText 
   * @param {object} familyContext 
   */
  async askFamilyFacilitator(messageText, familyContext) {
    if (!messageText || !messageText.trim()) {
      return { error: "Vui lòng nhập nội dung cần trao đổi." };
    }

    if (typeof window.detectCrisis === 'function' && window.detectCrisis(messageText)) {
      if (typeof window.renderCrisisAlertModal === 'function') {
        window.renderCrisisAlertModal();
      }
      return {
        reply: "Cuộc đối thoại đã tạm dừng để ưu tiên an toàn sức khỏe tinh thần. Vui lòng liên hệ Tổng đài 111 nếu có tình huống khẩn cấp.",
        safetyTriggered: true
      };
    }

    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: messageText.trim(),
          mode: 'family_facilitator',
          profile: familyContext
        })
      });

      const data = await response.json();
      if (!response.ok) {
        return { error: data.error || "Chưa thể kết nối với Điều phối viên AI." };
      }
      return data;
    } catch (err) {
      console.error("Family Facilitator Network Error:", err);
      return { error: "Sự cố kết nối mạng. Vui lòng thử lại sau." };
    }
  }
}

if (typeof window !== 'undefined') {
  window.orionAIClient = new OrionAIClient();
}
