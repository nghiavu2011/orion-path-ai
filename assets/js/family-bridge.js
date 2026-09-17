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

  /**
   * Bản đồ Góc nhìn Gia đình giữa Phụ huynh và Học sinh (Family Perspective Map)
   * @param {object} studentData { name, topCodes: ['I', 'R'], targets: ['tech'] }
   * @param {object} parentAnswers { q1_interest: 'I', q2_reaction: 'self_solve', q3_priority: 'passion' }
   * @returns {object} { score: number, sharedStrengths: string, perceptualGap: string, areasOfAgreement: Array, areasRequiringDiscussion: Array, conversationStarters: Array }
   */
  calculateAlignmentScorecard(studentData = {}, parentAnswers = {}) {
    const studentCodes = studentData.topCodes || ['I', 'R'];
    const pInterest = parentAnswers.q1_interest || 'I';
    const pReaction = parentAnswers.q2_reaction || 'self_solve';
    const pPriority = parentAnswers.q3_priority || 'passion';

    let score = 40;

    const riasecNames = {
      R: 'Kỹ thuật / Thực hành',
      I: 'Nghiên cứu / Phân tích',
      A: 'Sáng tạo / Nghệ thuật',
      S: 'Xã hội / Giúp đỡ',
      E: 'Quản lý / Kinh doanh',
      C: 'Quy chuẩn / Tổ chức'
    };

    let interestMatched = false;
    if (studentCodes[0] === pInterest) {
      score += 35;
      interestMatched = true;
    } else if (studentCodes.includes(pInterest)) {
      score += 28;
      interestMatched = true;
    } else {
      score += 18;
    }

    if (pReaction === 'self_solve' || pReaction === 'ai_tools') {
      score += 15;
    } else if (pReaction === 'ask_adult') {
      score += 12;
    } else {
      score += 8;
    }

    if (pPriority === 'passion' || pPriority === 'independence') {
      score += 10;
    } else {
      score += 8;
    }

    score = Math.min(Math.max(score, 60), 96);

    const pInterestName = riasecNames[pInterest] || pInterest;
    const sInterestName = riasecNames[studentCodes[0]] || studentCodes[0];

    const sharedStrengths = interestMatched
      ? `Cả Ba Mẹ và con đều nhận thấy thế mạnh nổi trội ở nhóm ${pInterestName}. Đây là nền tảng vững chắc nhất để cùng định hướng.`
      : `Ba Mẹ nhận thấy con say mê ở mảng ${pInterestName}, trong khi con đang tự khám phá nhiều hơn ở mảng ${sInterestName}. Cả hai góc nhìn đều là mảnh ghép giá trị.`;

    const perceptualGap = (pPriority === 'financial_safety')
      ? `Ba Mẹ đặc biệt chú trọng sự an toàn tài chính và việc làm ổn định, trong khi con có xu hướng muốn sống trọn vẹn với đam mê và trải nghiệm mới.`
      : (pPriority === 'global')
      ? `Gia đình mong muốn con có cơ hội hội nhập quốc tế, trong khi con đang cần thời gian xây dựng sự tự tin với năng lực nội tại.`
      : `Cả nhà đều chung mong muốn con tự lập, nhưng cần thống nhất về lộ trình từng bước để không tạo áp lực quá tải.`;

    const areasOfAgreement = [
      sharedStrengths,
      "Cả hai thế hệ đều hướng tới sự phát triển độc lập, hạnh phúc lâu dài và năng lực tự chủ của con.",
      "Thống nhất tìm kiếm môi trường đào tạo chất lượng, minh bạch chi phí và cơ hội việc làm thực tế."
    ];

    const areasRequiringDiscussion = [
      perceptualGap,
      "Cân đối giữa nguyện vọng thử sức với ngành nghề mới và yêu cầu an toàn tài chính của gia đình.",
      "Thống nhất kỳ vọng về thời gian học tập, mức độ đầu tư và phương án dự phòng khi thị trường thay đổi."
    ];

    const conversationStarters = [
      {
        tag: "Về sự an toàn & Cơ hội",
        question: `“Ba Mẹ thấy con có tiềm năng ở ${pInterestName}. Con nghĩ sao nếu chúng mình cùng tìm hiểu các ngành vừa có thu nhập ổn định vừa được làm đúng sở thích này?”`
      },
      {
        tag: "Về cách vượt qua áp lực",
        question: `“Khi gặp bài toán khó hoặc bài tập phức tạp, con thích Ba Mẹ đồng hành hỗ trợ hay để con tự do mày mò thử nghiệm trước?”`
      },
      {
        tag: "Thử nghiệm cuối tuần",
        question: `“Cuối tuần này, Ba Mẹ cùng con dành 60 phút làm một Thử nghiệm nhỏ (Mini Experiment) trong báo cáo Orion để cả nhà cùng kiểm chứng nhé?”`
      }
    ];

    return {
      score, // Giữ nội bộ cho test/tính toán, giao diện hiển thị Bản đồ góc nhìn định tính
      sharedStrengths,
      perceptualGap,
      areasOfAgreement,
      areasRequiringDiscussion,
      conversationStarters
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
