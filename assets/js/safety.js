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
  hotlines: [
    { name: "Tổng đài Quốc gia Bảo vệ Trẻ em (Miễn phí 24/7)", number: "111", desc: "Tiếp nhận thông tin, can thiệp khẩn cấp và bảo vệ trẻ em mọi lúc mọi nơi." },
    { name: "Đường dây nóng Hỗ trợ Tâm lý Ngày Mai", number: "096 306 1414", desc: "Hỗ trợ sơ cứu tâm lý cho người trẻ và học sinh gặp khủng hoảng tinh thần." },
    { name: "Tổng đài Tư vấn Tâm lý & Phòng chống Bạo lực Gia đình", number: "1900 969 680", desc: "Tư vấn hòa giải và bảo trợ tâm lý học sinh, phụ huynh." }
  ]
};

function detectCrisis(text) {
  if (!text || typeof text !== 'string') return false;
  const normalized = text.toLowerCase();
  return SAFETY_CONFIG.crisisKeywords.some(keyword => normalized.includes(keyword));
}

function renderCrisisAlertModal() {
  let modal = document.getElementById('orion-crisis-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'orion-crisis-modal';
    modal.style.cssText = `
      position: fixed; inset: 0; background: rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(8px); z-index: 99999;
      display: flex; align-items: center; justify-content: center; padding: 20px;
    `;
    modal.innerHTML = `
      <div style="background: #1e1b4b; border: 2px solid #ef4444; border-radius: 16px; max-width: 520px; width: 100%; padding: 28px; color: #fff; box-shadow: 0 0 40px rgba(239, 68, 68, 0.4); text-align: left; font-family: inherit;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
          <span style="background: #ef4444; color: #fff; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: bold;">!</span>
          <h3 style="font-size: 18px; font-weight: 800; color: #fca5a5; margin: 0;">Sức khỏe & Sự An toàn Của Em Là Trên Hết</h3>
        </div>
        <p style="font-size: 14px; line-height: 1.6; color: #e2e8f0; margin-bottom: 18px;">
          Chào em, Orion nhận thấy em đang có những cảm xúc hoặc trải nghiệm rất nặng nề. Trợ lý AI không thể thay thế con người thật trong việc chăm sóc cảm xúc và bảo vệ an toàn cho em.
        </p>
        <p style="font-size: 13px; line-height: 1.5; color: #cbd5e1; margin-bottom: 16px; background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px;">
          <strong>Hãy chia sẻ ngay với người em tin tưởng</strong> (cha mẹ, thầy cô giáo, anh chị) hoặc gọi ngay tới các số hỗ trợ miễn phí dưới đây:
        </p>
        <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 22px;">
          <a href="tel:111" style="display: flex; justify-content: space-between; align-items: center; background: rgba(239,68,68,0.15); border: 1px solid rgba(239,68,68,0.4); padding: 12px 16px; border-radius: 10px; color: #fff; text-decoration: none;">
            <div>
              <div style="font-weight: 700; font-size: 14px; color: #fca5a5;">Tổng đài Quốc gia 111</div>
              <div style="font-size: 11px; color: #94a3b8;">Bảo vệ trẻ em - Miễn phí 24/7</div>
            </div>
            <span style="background: #ef4444; padding: 6px 14px; border-radius: 20px; font-weight: 800; font-size: 14px;">Gọi 111</span>
          </a>
          <a href="tel:0963061414" style="display: flex; justify-content: space-between; align-items: center; background: rgba(99,102,241,0.15); border: 1px solid rgba(99,102,241,0.4); padding: 12px 16px; border-radius: 10px; color: #fff; text-decoration: none;">
            <div>
              <div style="font-weight: 700; font-size: 14px; color: #c7d2fe;">Đường dây nóng Ngày Mai</div>
              <div style="font-size: 11px; color: #94a3b8;">Hỗ trợ khủng hoảng tâm lý người trẻ</div>
            </div>
            <span style="background: #6366f1; padding: 6px 14px; border-radius: 20px; font-weight: 800; font-size: 13px;">096 306 1414</span>
          </a>
        </div>
        <div style="display: flex; justify-content: flex-end;">
          <button onclick="document.getElementById('orion-crisis-modal').remove()" style="background: transparent; border: 1px solid rgba(255,255,255,0.2); color: #94a3b8; padding: 8px 18px; border-radius: 8px; cursor: pointer; font-size: 12.5px;">
            Đã hiểu, quay lại trang
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }
}

if (typeof window !== 'undefined') {
  window.detectCrisis = detectCrisis;
  window.renderCrisisAlertModal = renderCrisisAlertModal;
  window.SAFETY_CONFIG = SAFETY_CONFIG;
}
if (typeof global !== 'undefined') {
  global.detectCrisis = detectCrisis;
  global.renderCrisisAlertModal = renderCrisisAlertModal;
  global.SAFETY_CONFIG = SAFETY_CONFIG;
}
