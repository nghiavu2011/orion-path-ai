// Động cơ Phân tích Giả thiết Nghề nghiệp (career-engine.js)
// Chuyển đổi từ "Phán xét định mệnh" sang "Giả thiết nghề nghiệp dựa trên bằng chứng (Career Hypotheses)"
// Tuân thủ: Hiển thị Bằng chứng (Evidence) + Mâu thuẫn/Thách thức + Điều Orion chưa biết (Unknowns)

class OrionCareerEngine {
  constructor() {
    this.careers = typeof CAREERS_DATABASE !== 'undefined' ? CAREERS_DATABASE : [];
  }

  /**
   * Tính toán điểm RIASEC từ bảng trả lời trắc nghiệm
   * @param {object} answers { R: 6, I: 7, A: 3, S: 4, E: 5, C: 4 }
   */
  calculateRiasecScores(answers) {
    const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    for (const key in answers) {
      if (scores.hasOwnProperty(key)) {
        scores[key] = Math.max(0, parseInt(answers[key], 10) || 0);
      }
    }
    return scores;
  }

  /**
   * Xác định nhóm sở thích nổi trội
   * @param {object} riasecScores 
   */
  getTopRiasecCodes(riasecScores) {
    return Object.entries(riasecScores)
      .sort((a, b) => b[1] - a[1])
      .map(item => item[0]);
  }

  /**
   * Tạo 3 - 5 Giả thiết Nghề nghiệp (Career Hypotheses)
   * @param {object} params { riasecScores, academic: { math, lit, eng }, targets }
   */
  generateCareerHypotheses(params) {
    const { riasecScores, academic = { math: 7, lit: 7, eng: 7 }, targets = [] } = params;
    const sortedCodes = this.getTopRiasecCodes(riasecScores);
    const primary = sortedCodes[0] || 'I';
    const secondary = sortedCodes[1] || 'R';
    const tertiary = sortedCodes[2] || 'C';

    const hypotheses = [];

    // Duyệt qua kho dữ liệu ngành nghề để đối chiếu tín hiệu
    this.careers.forEach(career => {
      let matchCount = 0;
      if (career.riasec.includes(primary)) matchCount += 3;
      if (career.riasec.includes(secondary)) matchCount += 2;
      if (career.riasec.includes(tertiary)) matchCount += 1;

      // Tính toán tín hiệu dựa trên học lực
      const mathScore = parseFloat(academic.math) || 7.0;
      const engScore = parseFloat(academic.eng) || 7.0;
      const litScore = parseFloat(academic.lit) || 7.0;

      let signalLevel = "Đang khám phá";
      const evidenceList = [];
      const conflictList = [...(career.potentialConflicts || [])];

      // Đánh giá tín hiệu cho nhóm kỹ thuật/công nghệ
      if (career.riasec.includes('I') || career.riasec.includes('R')) {
        if (mathScore >= 8.0) {
          evidenceList.push(`Điểm môn Toán học lực tốt (${mathScore}/10) - hỗ trợ năng lực tư duy logic/mô hình.`);
          matchCount += 2;
        } else if (mathScore < 6.5) {
          conflictList.unshift(`Điểm môn Toán hiện tại (${mathScore}) có thể là thử thách nếu học kỹ thuật chuyên sâu.`);
        }
      }

      // Đánh giá tín hiệu cho nhóm nghệ thuật/sáng tạo
      if (career.riasec.includes('A')) {
        evidenceList.push(`Nhóm Nghệ thuật (${riasecScores.A}đ) - thể hiện sự nhạy bén về thẩm mỹ và cách diễn đạt ý tưởng.`);
      }

      // Đánh giá tín hiệu cho nhóm xã hội/y tế
      if (career.riasec.includes('S')) {
        evidenceList.push(`Nhóm Xã hội (${riasecScores.S}đ) - có xu hướng thấu cảm và thích chăm sóc, hỗ trợ cộng đồng.`);
      }

      // Đánh giá ngoại ngữ
      if (engScore >= 7.5) {
        evidenceList.push(`Điểm Tiếng Anh thuận lợi (${engScore}/10) để tiếp cận tài liệu chuẩn quốc tế.`);
      }

      // Phân tầng tín hiệu
      if (matchCount >= 5) {
        signalLevel = "Tín hiệu mạnh";
      } else if (matchCount >= 3) {
        signalLevel = "Tín hiệu vừa";
      } else {
        signalLevel = "Đang khám phá";
      }

      hypotheses.push({
        careerId: career.id,
        name: career.name,
        desc: career.desc,
        signalLevel: signalLevel,
        scoreRank: matchCount,
        whySuggested: `Sở thích nghề nghiệp RIASEC của em nổi trội ở nhóm ${primary} và ${secondary}. ${career.signalBase}`,
        evidenceFor: evidenceList.length > 0 ? evidenceList : [`Sở thích nghề nghiệp tương đồng với nhóm ${career.riasec.join('/')}`],
        conflicts: conflictList,
        unknowns: career.unknownsToTest || [
          "Mức độ hứng thú thực tế của em khi làm việc này liên tục mỗi ngày?",
          "Khả năng thích ứng với môi trường làm việc đặc thù của ngành này?"
        ],
        pathways: career.pathways,
        salary: career.salary,
        laborDemand: career.laborDemand,
        aiAdaptability: career.aiAdaptability,
        experiment: career.recommendedExperiment
      });
    });

    // Sắp xếp theo độ mạnh của tín hiệu và lấy top 4 giả thiết
    hypotheses.sort((a, b) => b.scoreRank - a.scoreRank);
    return hypotheses.slice(0, 4);
  }

  /**
   * Đề xuất Tổ hợp môn THPT & Chiến lược học tập 3 năm
   * @param {string} primary 
   * @param {object} academic 
   */
  recommendCombination(primary, academic = {}) {
    const math = parseFloat(academic.math) || 7.5;
    const eng = parseFloat(academic.eng) || 7.5;

    let primaryCombo = 'A01';
    let backupCombo = 'D01';
    let rationale = '';

    if (primary === 'I' || primary === 'R') {
      if (math >= 8.0 && eng >= 7.5) {
        primaryCombo = 'A01';
        backupCombo = 'A00';
        rationale = 'Thế mạnh tự nhiên và ngoại ngữ tốt giúp em có lợi thế cạnh tranh vào các khối ngành Công nghệ thông tin, Trí tuệ Nhân tạo, Vi mạch Bán dẫn.';
      } else {
        primaryCombo = 'A00';
        backupCombo = 'A01';
        rationale = 'Tổ hợp truyền thống Toán - Lý - Hóa mở rộng tối đa cơ hội xét tuyển vào tất cả các trường đại học, cao đẳng kỹ thuật trên toàn quốc.';
      }
    } else if (primary === 'S') {
      if (math >= 7.0 && eng >= 7.5) {
        primaryCombo = 'D01';
        backupCombo = 'B00';
        rationale = 'Nhóm Xã hội kết hợp tư duy ngôn ngữ tốt phù hợp cho ngành Tâm lý học, Giáo dục, Luật hoặc Quản lý dịch vụ Y tế.';
      } else {
        primaryCombo = 'B00';
        backupCombo = 'D07';
        rationale = 'Tổ hợp then chốt cho khối ngành Chăm sóc sức khỏe, Y sinh và Dược học.';
      }
    } else if (primary === 'A') {
      primaryCombo = 'D01';
      backupCombo = 'H01';
      rationale = 'Nền tảng Toán - Văn - Anh vững chắc giúp mở rộng xét tuyển khối ngành Thiết kế đa phương tiện, UI/UX, Truyền thông số.';
    } else {
      primaryCombo = 'D01';
      backupCombo = 'A01';
      rationale = 'Lựa chọn an toàn, độ phủ tuyển sinh rộng nhất vào các trường khối ngành Kinh tế, Quản trị, Marketing và Logistics.';
    }

    return {
      primaryCombo,
      backupCombo,
      rationale,
      timeline: [
        { year: "Lớp 10", focus: "Thăm dò & Nền tảng", desc: `Học đều các môn, chú trọng củng cố 3 môn tổ hợp ${primaryCombo}. Tham gia 1-2 trải nghiệm thử (Career Experiments) để kiểm chứng sở thích.` },
        { year: "Lớp 11", focus: "Kỹ năng & Chứng chỉ", desc: "Đạt mục tiêu chứng chỉ ngoại ngữ (IELTS/VSTEP) nếu có định hướng xét tuyển kết hợp; bắt đầu tiếp cận cấu trúc đề thi Đánh giá năng lực / Đánh giá tư duy." },
        { year: "Lớp 12", focus: "Chiến lược & Đột phá", desc: "Tập trung tối đa cho Kỳ thi tốt nghiệp THPT và các đợt thi ĐGNL (HSA/APT/TSA) sớm để chủ động đỗ nguyện vọng ưu tiên." }
      ]
    };
  }
}

if (typeof window !== 'undefined') {
  window.OrionCareerEngine = OrionCareerEngine;
  window.orionCareerEngine = new OrionCareerEngine();
}
if (typeof global !== 'undefined') {
  global.OrionCareerEngine = OrionCareerEngine;
  global.orionCareerEngine = new OrionCareerEngine();
}
