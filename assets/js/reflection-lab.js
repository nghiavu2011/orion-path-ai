// Reflection Lab: Không gian Chiêm Nghiệm Văn Hóa Tùy Chọn (reflection-lab.js)
// LƯU Ý BẮT BUỘC:
// "Nội dung chiêm nghiệm văn hóa, không phải đánh giá tâm lý, năng lực hay công cụ dự đoán nghề nghiệp."
// Module này hoàn toàn CÔ LẬP: Tuyệt đối KHÔNG thay đổi điểm RIASEC, KHÔNG can thiệp xếp hạng nghề nghiệp.

const REFLECTION_DISCLAIMER = "Nội dung chiêm nghiệm văn hóa, không phải đánh giá tâm lý, năng lực hay công cụ dự đoán nghề nghiệp.";

class OrionReflectionLab {
  constructor() {
    this.pythagoreanMap = {
      'A': 1, 'J': 1, 'S': 1, 'B': 2, 'K': 2, 'T': 2, 'C': 3, 'L': 3, 'U': 3,
      'D': 4, 'M': 4, 'V': 4, 'E': 5, 'N': 5, 'W': 5, 'F': 6, 'O': 6, 'X': 6,
      'G': 7, 'P': 7, 'Y': 7, 'H': 8, 'Q': 8, 'Z': 8, 'I': 9, 'R': 9
    };
  }

  removeAccents(str) {
    if (!str) return '';
    return str.normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  }

  reduceNum(num, keepMaster = true) {
    if (keepMaster && (num === 11 || num === 22 || num === 33)) return num;
    while (num > 9) {
      let sum = 0;
      let temp = num;
      while (temp > 0) {
        sum += temp % 10;
        temp = Math.floor(temp / 10);
      }
      num = sum;
      if (keepMaster && (num === 11 || num === 22 || num === 33)) break;
    }
    return num;
  }

  calculateLifePath(dobString) {
    if (!dobString) return 7;
    const clean = dobString.replace(/\D/g, '');
    let sum = 0;
    for (let i = 0; i < clean.length; i++) {
      sum += parseInt(clean[i], 10) || 0;
    }
    return this.reduceNum(sum, true);
  }

  calculateNameNumber(fullname) {
    if (!fullname) return 1;
    const clean = this.removeAccents(fullname).toUpperCase().replace(/[^A-Z]/g, '');
    let sum = 0;
    for (let i = 0; i < clean.length; i++) {
      sum += this.pythagoreanMap[clean[i]] || 0;
    }
    return this.reduceNum(sum, false);
  }

  getLunarYearCanChi(year) {
    const canList = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
    const chiList = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
    const canIndex = (year + 6) % 10;
    const chiIndex = (year + 8) % 12;
    return `${canList[canIndex]} ${chiList[chiIndex]}`;
  }

  /**
   * Tạo bản chiêm nghiệm văn hóa độc lập
   */
  generateCulturalReflection(userDob, fullname) {
    const birthYear = userDob ? parseInt(userDob.split('-')[0], 10) : 2010;
    const lifePath = this.calculateLifePath(userDob);
    const nameNum = this.calculateNameNumber(fullname);
    const canChi = this.getLunarYearCanChi(birthYear);

    const archetypes = {
      1: "Người Tiên Phong (Độc lập, chủ động, thích dẫn đầu)",
      2: "Người Hòa Giải (Khéo léo, lắng nghe, kết nối hòa bình)",
      3: "Người Sáng Tạo (Hoạt ngôn, truyền cảm hứng, yêu cái đẹp)",
      4: "Người Kiến Thiết (Chắc chắn, kỷ luật, kiên trì, chu toàn)",
      5: "Người Khám Phá (Thích tự do, thích nghi nhanh, yêu trải nghiệm)",
      6: "Người Nuôi Dưỡng (Quan tâm gia đình, trách nhiệm, bao dung)",
      7: "Người Tìm Kiếm Chân Lý (Thích chiêm nghiệm, tò mò, trực giác cao)",
      8: "Người Điều Hành (Tư duy thực tế, nghị lực, hướng tới thành tựu)",
      9: "Người Phụng Sự (Nhân ái, vị tha, hướng về cộng đồng)",
      11: "Người Truyền Cảm Hứng Trực Giác",
      22: "Bậc Thầy Kiến Tạo Ý Tưởng Lớn",
      33: "Bậc Thầy Nâng Đỡ Tinh Thần"
    };

    return {
      disclaimer: REFLECTION_DISCLAIMER,
      canChi: canChi,
      lifePathNumber: lifePath,
      lifePathArchetype: archetypes[lifePath] || "Khí chất kiên định",
      nameNumber: nameNum,
      reflectionEssay: `Theo quan niệm văn hóa dân gian và triết lý biểu tượng, năm sinh ${canChi} cùng con số tượng trưng (${lifePath}) gợi mở góc nhìn về sự kiên định trong học tập và lòng trắc ẩn trong cuộc sống. Hãy xem đây là một lăng kính nhẹ nhàng để nhìn nhận lại sự nhẫn nại của bản thân, không dùng để dự đoán tương lai hay đo lường giới hạn của chính mình.`
    };
  }
}

if (typeof window !== 'undefined') {
  window.OrionReflectionLab = OrionReflectionLab;
  window.orionReflectionLab = new OrionReflectionLab();
  window.REFLECTION_DISCLAIMER = REFLECTION_DISCLAIMER;
}
if (typeof global !== 'undefined') {
  global.OrionReflectionLab = OrionReflectionLab;
  global.orionReflectionLab = new OrionReflectionLab();
  global.REFLECTION_DISCLAIMER = REFLECTION_DISCLAIMER;
}
