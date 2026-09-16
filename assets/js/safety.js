// Module An toàn Trẻ em & Định tuyến Khủng hoảng (Child Safety & Crisis Router)
// Đảm bảo tuân thủ đạo đức AI: Không chẩn đoán bệnh lý, ưu tiên an toàn tính mạng và hỗ trợ tâm lý học đường.

const SAFETY_CONFIG = {
  crisisKeywords: [
    'tự tử', 'tu tu', 'suicide', 'tự hại', 'tu hai', 'self-harm',
    'muốn chết', 'muon chet', 'kết liễu', 'ket lieu', 'cắt cổ tay', 'cat co tay',
    'bị bạo hành', 'bi bao hanh', 'bị đánh', 'bi danh', 'bị lạm dụng', 'bi lam dung',
    'bị xâm hại', 'bi xam hai', 'trầm cảm nặng', 'tram cam nang', 'tuyệt vọng', 'tuyet vong',
    'muốn biến mất', 'muon bien mat', 'chết đi cho xong'
  ],
  distressKeywords: [
    'quá kiệt sức', 'qua kiet suc', 'áp lực không chịu nổi', 'khóc suốt',
    'mất ngủ triền miên', 'rất hoảng loạn', 'bế tắc hoàn toàn', 'muốn buông xuôi'
  ],
  // Verified official emergency and child protection hotlines only (Section 24)
  officialHotlines: [
    {
      name: "Tổng đài Quốc gia Bảo vệ Trẻ em",
      number: "111",
      purpose: "Tiếp nhận thông tin, tố giác hành vi xâm hại và can thiệp bảo vệ khẩn cấp cho trẻ em, thanh thiếu niên",
      jurisdiction: "Toàn quốc (Việt Nam)",
      source: "Cục Bà mẹ và Trẻ em — Bộ Y tế",
      lastVerifiedAt: "2026-03"
    },
    {
      name: "Cấp cứu Y tế Khẩn cấp",
      number: "115",
      purpose: "Cấp cứu, sơ cứu y tế khẩn cấp khi gặp nguy hiểm tính mạng hoặc tai nạn chấn thương",
      jurisdiction: "Toàn quốc (Việt Nam)",
      source: "Bộ Y tế Việt Nam",
      lastVerifiedAt: "2026-03"
    }
  ]
};

/**
 * Phân loại mức độ an toàn theo 4 tầng (Section 23)
 * @param {string} text 
 * @returns {'NORMAL' | 'DISTRESS' | 'HIGH_RISK' | 'IMMEDIATE_DANGER'}
 */
function classifySafetyTier(text) {
  if (!text || typeof text !== 'string') return 'NORMAL';
  const normalized = text.toLowerCase();
  
  const immediateWords = ['tự tử', 'tu tu', 'suicide', 'muốn chết', 'muon chet', 'cắt cổ tay', 'chết đi cho xong'];
  if (immediateWords.some(k => normalized.includes(k))) return 'IMMEDIATE_DANGER';

  if (SAFETY_CONFIG.crisisKeywords.some(k => normalized.includes(k))) return 'HIGH_RISK';
  if (SAFETY_CONFIG.distressKeywords.some(k => normalized.includes(k))) return 'DISTRESS';

  return 'NORMAL';
}

function detectCrisis(text) {
  const tier = classifySafetyTier(text);
  return tier === 'HIGH_RISK' || tier === 'IMMEDIATE_DANGER';
}

function renderCrisisAlertModal() {
  let modal = document.getElementById('orion-crisis-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'orion-crisis-modal';
    modal.style.cssText = `
      position: fixed; inset: 0; background: rgba(0, 0, 0, 0.88);
      backdrop-filter: blur(8px); z-index: 99999;
      display: flex; align-items: center; justify-content: center; padding: 20px;
    `;
    modal.innerHTML = `
      <div style="background: #1e1b4b; border: 2px solid #ef4444; border-radius: 16px; max-width: 540px; width: 100%; padding: 28px; color: #fff; box-shadow: 0 0 40px rgba(239, 68, 68, 0.4); text-align: left; font-family: inherit;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
          <span style="background: #ef4444; color: #fff; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: bold;">!</span>
          <h3 style="font-size: 18px; font-weight: 800; color: #fca5a5; margin: 0;">Sức khỏe & Sự An toàn Của Em Luôn Là Trên Hết</h3>
        </div>
        <p style="font-size: 13.5px; line-height: 1.6; color: #e2e8f0; margin-bottom: 16px;">
          Chào em, Orion nhận thấy em có thể đang trải qua những áp lực rất lớn hoặc cảm xúc bế tắc. Orion là công cụ hỗ trợ chọn trường lớp, <strong>không phải là bác sĩ tâm lý hay dịch vụ y tế</strong>.
        </p>
        <p style="font-size: 13px; line-height: 1.5; color: #cbd5e1; margin-bottom: 16px; background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px;">
          <strong>Hãy chia sẻ ngay với người lớn em tin tưởng</strong> (cha mẹ, thầy cô giáo, phòng tham vấn tâm lý học đường) hoặc liên hệ các tổng đài hỗ trợ chính thức miễn phí 24/7 dưới đây:
        </p>
        <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 22px;">
          <a href="tel:111" style="display: flex; justify-content: space-between; align-items: center; background: rgba(239,68,68,0.18); border: 1px solid rgba(239,68,68,0.5); padding: 12px 16px; border-radius: 10px; color: #fff; text-decoration: none;">
            <div>
              <div style="font-weight: 800; font-size: 14px; color: #fca5a5;">Tổng đài Quốc gia 111 (Miễn phí 24/7)</div>
              <div style="font-size: 11px; color: #94a3b8;">Cục Bà mẹ và Trẻ em — Bộ Y tế</div>
            </div>
            <span style="background: #ef4444; padding: 6px 14px; border-radius: 20px; font-weight: 800; font-size: 13px;">Gọi 111</span>
          </a>
          <a href="tel:115" style="display: flex; justify-content: space-between; align-items: center; background: rgba(99,102,241,0.18); border: 1px solid rgba(99,102,241,0.5); padding: 12px 16px; border-radius: 10px; color: #fff; text-decoration: none;">
            <div>
              <div style="font-weight: 800; font-size: 14px; color: #c7d2fe;">Cấp cứu Y tế Khẩn cấp 115 (Trực cấp cứu toàn quốc)</div>
              <div style="font-size: 11px; color: #94a3b8;">Hệ thống Cấp cứu Y tế — Bộ Y tế Việt Nam</div>
            </div>
            <span style="background: #6366f1; padding: 6px 14px; border-radius: 20px; font-weight: 800; font-size: 13px;">Gọi 115</span>
          </a>
        </div>
        <div style="display: flex; justify-content: flex-end;">
          <button onclick="document.getElementById('orion-crisis-modal').remove()" style="background: transparent; border: 1px solid rgba(255,255,255,0.2); color: #94a3b8; padding: 8px 18px; border-radius: 8px; cursor: pointer; font-size: 12.5px;">
            Đã hiểu, quay lại
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }
}

if (typeof window !== 'undefined') {
  window.detectCrisis = detectCrisis;
  window.classifySafetyTier = classifySafetyTier;
  window.renderCrisisAlertModal = renderCrisisAlertModal;
  window.SAFETY_CONFIG = SAFETY_CONFIG;
}
if (typeof global !== 'undefined') {
  global.detectCrisis = detectCrisis;
  global.classifySafetyTier = classifySafetyTier;
  global.renderCrisisAlertModal = renderCrisisAlertModal;
  global.SAFETY_CONFIG = SAFETY_CONFIG;
}
