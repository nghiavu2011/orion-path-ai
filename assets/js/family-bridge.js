// Cầu Nối Đối Thoại Gia Đình (family-bridge.js)
// AI đóng vai trò ĐIỀU PHỐI VIÊN (FACILITATOR), KHÔNG PHÁN XỬ "Ai đúng ai sai".
// Tôn trọng quyền riêng tư học sinh: Tách biệt dữ liệu Riêng tư (Private) và Chia sẻ với cha mẹ (Shared).

class FamilyBridgeFacilitator {
  constructor() {
    this.privacySettings = {
      shareFullChat: false,       // Tuyệt đối không tự động chia sẻ tin nhắn riêng tư
      shareSummary: true,         // Chia sẻ bản tóm tắt mục tiêu và mối quan tâm
      shareExperiments: true      // Chia sẻ kế hoạch thử nghiệm để cha mẹ hỗ trợ
    };
  }

  /**
   * Tạo cấu trúc đối thoại đa chiều giữa cha mẹ và học sinh
   * @param {object} params { studentCareerHypothesis, academic, studentVoice, parentConcerns }
   */
  generateDialogueReport(params) {
    const {
      topHypothesis = { name: "Công nghệ / Kỹ thuật", salary: { range: "Thu nhập thay đổi đáng kể theo kinh nghiệm, địa phương và doanh nghiệp. Xem nguồn dữ liệu." } },
      academic = { math: 8, lit: 7.5, eng: 8 },
      studentVoice = "Em muốn học ngành mình đam mê, được tự do sáng tạo và làm việc trong môi trường năng động.",
      parentConcerns = "Gia đình mong muốn con có công việc ổn định, an toàn, thu nhập đủ trang trải cuộc sống và học phí vừa sức."
    } = params;

    return {
      studentPerspective: {
        title: "Góc nhìn & Ước mơ của Học sinh",
        summary: studentVoice,
        keyNeeds: [
          "Muốn được cha mẹ tôn trọng sở thích cá nhân và quyền tự chủ lựa chọn.",
          "Cần sự tin tưởng và động viên thay vì so sánh với con nhà người ta.",
          "Hào hứng với các cơ hội việc làm mới trong kỷ nguyên số."
        ]
      },
      parentPerspective: {
        title: "Nỗi lo & Tình thương của Cha mẹ",
        summary: parentConcerns,
        keyNeeds: [
          "Lo lắng về tính an toàn, sợ ngành nghề mới biến động hoặc bị AI thay thế.",
          "Áp lực học phí và mong muốn đảm bảo tương lai kinh tế vững chắc cho con.",
          "Khao khát thấy con trưởng thành độc lập, bình an và không vấp ngã."
        ]
      },
      commonGround: {
        title: "Mục Tiêu Chung Của Cả Hai Thế Hệ",
        points: [
          "Đều mong muốn con có một tương lai hạnh phúc, tự nuôi sống bản thân và phát huy được tiềm năng tốt nhất.",
          "Đều muốn tìm kiếm một môi trường đào tạo chất lượng, học phí phù hợp với điều kiện gia đình.",
          "Đều trân trọng sự cố gắng học tập của con qua từng kỳ học."
        ]
      },
      divergences: {
        title: "Điểm Khác Biệt Cần Dung Hòa",
        points: [
          "Khoảng cách nhận thức: Con nhìn thấy cơ hội mới mẻ; Cha mẹ nhìn qua lăng kính an toàn và rủi ro.",
          "Tiêu chí ưu tiên: Học sinh ưu tiên 'đam mê & hứng thú'; Cha mẹ ưu tiên 'tính ổn định & thanh khoản việc làm'."
        ]
      },
      existingEvidence: {
        title: "Bằng Chứng Hiện Có (Cả Nhà Cùng Nhìn Nhận)",
        points: [
          `Kết quả học tập: Điểm Toán ${academic.math}, Ngữ văn ${academic.lit}, Tiếng Anh ${academic.eng}.`,
          `Ngành học tiềm năng đề xuất: ${topHypothesis.name} có tín hiệu phù hợp bước đầu.`,
          "Chưa đủ cơ sở để khẳng định con sẽ thành công tuyệt đối hay sẽ thất bại nếu theo ngành này."
        ]
      },
      unknownsToClarify: {
        title: "Điều Cả Hai Chưa Biết (Cần Kiểm Chứng Thêm)",
        points: [
          "Môi trường học tập thực tế và áp lực công việc hàng ngày trong ngành này ra sao?",
          "Khả năng thích ứng thực sự của con khi đối diện với bài tập kỹ thuật khó?",
          "Chính sách học bổng và mức tăng học phí của các trường đào tạo trong 4 năm tới?"
        ]
      },
      actionExperiment: {
        title: "Thử Nghiệm Giúp Dung Hòa (Không Tranh Cãi Bằng Lời)",
        recommendation: `Thay vì tranh luận ai đúng ai sai, hãy cùng con thực hiện 1 trải nghiệm thử trong 60-90 phút (${topHypothesis.name}). Sau trải nghiệm, cả gia đình sẽ cùng ngồi lại xem cảm nhận thực tế của con và số liệu tuyển sinh cụ thể.`
      }
    };
  }
}

if (typeof window !== 'undefined') {
  window.FamilyBridgeFacilitator = FamilyBridgeFacilitator;
  window.familyBridgeFacilitator = new FamilyBridgeFacilitator();
}
if (typeof global !== 'undefined') {
  global.FamilyBridgeFacilitator = FamilyBridgeFacilitator;
  global.familyBridgeFacilitator = new FamilyBridgeFacilitator();
}
