// Dữ liệu tuyển sinh & lộ trình giáo dục Việt Nam (Chương trình THPT Mới - Kỳ thi 2025–2026+)
// Phân định rõ: Lộ trình 4 năm (Lớp 9-12), Môn học THPT vs Tổ hợp xét tuyển ĐH, Dữ liệu có phiên bản & nguồn đối chiếu.

const EDUCATION_DATABASE = {
  examName: "Kỳ thi tốt nghiệp THPT",
  curriculum: "Chương trình THPT Mới (áp dụng kỳ thi 2025–2026+)",
  version: "2026-Q1",
  verifiedDate: "2026-03",

  // 1. LỘ TRÌNH 4 NĂM PHỔ THÔNG (CHƯƠNG TRÌNH MỚI)
  highSchoolProgression: [
    {
      grade: "Lớp 9",
      stage: "Định hướng chuyển cấp",
      objective: "Khám phá sở thích & Lựa chọn nhóm môn học lựa chọn vào lớp 10",
      actions: [
        "Làm bài sàng lọc sở thích nghề nghiệp RIASEC để nhận biết thiên hướng ban đầu",
        "Đối chiếu năng lực học tập THCS với các môn thế mạnh",
        "Tìm hiểu các cụm chuyên đề lựa chọn của trường THPT mục tiêu (Tự nhiên, Xã hội hay Công nghệ/Nghệ thuật)"
      ]
    },
    {
      grade: "Lớp 10",
      stage: "Xây dựng nền tảng",
      objective: "Củng cố phương pháp học tập mới và thích nghi với chương trình THPT mới",
      actions: [
        "Hoàn thành tốt các môn học bắt buộc và 4 môn lựa chọn đã đăng ký",
        "Tham gia các câu lạc bộ học thuật, ngoại khóa hoặc hoạt động trải nghiệm hướng nghiệp",
        "Bắt đầu tích lũy học bạ học kỳ 1 và học kỳ 2 (ảnh hưởng đến xét tuyển học bạ sớm)"
      ]
    },
    {
      grade: "Lớp 11",
      stage: "Khám phá chuyên sâu & Thử nghiệm",
      objective: "Kiểm chứng các giả thiết nghề nghiệp bằng hành động thực tế",
      actions: [
        "Thực hiện 2–3 Thử nghiệm nghề nghiệp (Career Experiments / Mini-projects 60–90 phút)",
        "Thi thử đánh giá tư duy (TSA Bách Khoa) hoặc ôn luyện chứng chỉ ngoại ngữ (IELTS/SAT/VSTEP)",
        "Cùng gia đình thảo luận bản đồ định hướng và năng lực tài chính gia đình"
      ]
    },
    {
      grade: "Lớp 12",
      stage: "Chiến lược tuyển sinh",
      objective: "Tối ưu hóa cơ hội trúng tuyển đa phương thức",
      actions: [
        "Tham gia các đợt thi Đánh giá Năng lực (HSA/APT) hoặc Đánh giá Tư duy (TSA) từ tháng 3 - tháng 5",
        "Nộp hồ sơ xét tuyển sớm bằng chứng chỉ quốc tế và học bạ THPT",
        "Hoàn thành Kỳ thi tốt nghiệp THPT và đăng ký thứ tự nguyện vọng thông minh trên cổng Bộ GD&ĐT"
      ]
    }
  ],

  // 2. MÔN HỌC THPT CHƯƠNG TRÌNH MỚI (KHÔNG PHẢI TỔ HỢP ĐẠI HỌC)
  thptCurriculum: {
    compulsorySubjects: [
      "Ngữ văn", "Toán", "Ngoại ngữ 1 (Tiếng Anh...)", "Lịch sử",
      "Giáo dục thể chất", "Giáo dục quốc phòng và an ninh",
      "Hoạt động trải nghiệm, hướng nghiệp", "Nội dung giáo dục của địa phương"
    ],
    electiveGroups: [
      {
        groupName: "Khoa học Tự nhiên",
        subjects: ["Vật lí", "Hóa học", "Sinh học"],
        note: "Dành cho học sinh định hướng Kỹ thuật, Công nghệ, Y Dược, Khoa học dữ liệu."
      },
      {
        groupName: "Khoa học Xã hội",
        subjects: ["Địa lí", "Giáo dục kinh tế và pháp luật"],
        note: "Dành cho học sinh định hướng Kinh tế, Luật, Báo chí, Khoa học xã hội & Nhân văn."
      },
      {
        groupName: "Công nghệ & Nghệ thuật",
        subjects: ["Tin học", "Công nghệ", "Âm nhạc", "Mỹ thuật"],
        note: "Dành cho học sinh định hướng Thiết kế sản phẩm, Công nghệ ứng dụng, Đa phương tiện."
      }
    ],
    clarificationNote: "Lưu ý: Môn học THPT là các môn học sinh theo học tại trường cấp 3 theo chương trình mới. Khác với các mã A00, A01, D01... vốn là 'Tổ hợp môn xét tuyển Đại học'."
  },

  // 3. TỔ HỢP MÔN XÉT TUYỂN ĐẠI HỌC
  subjectCombinations: {
    "A00": {
      name: "Toán, Vật lý, Hóa học",
      type: "Tổ hợp xét tuyển Kỹ thuật & Tự nhiên truyền thống",
      majors: "Kỹ thuật Cơ khí, Điện tử, Xây dựng, Hóa dầu, Bán dẫn, Khoa học Vật liệu",
      suitability: "Học sinh có tư duy định lượng vững, yêu thích phân tích các quy luật vật lý và phản ứng chất."
    },
    "A01": {
      name: "Toán, Vật lý, Tiếng Anh",
      type: "Tổ hợp xét tuyển Kỹ thuật, Công nghệ & Ngoại ngữ",
      majors: "Khoa học Máy tính, Trí tuệ Nhân tạo, Vi mạch Bán dẫn, Kỹ thuật Hàng không, Tự động hóa",
      suitability: "Lựa chọn cho kỷ nguyên số: phối hợp giữa tư duy logic toán lý và năng lực hội nhập tiếng Anh."
    },
    "D01": {
      name: "Toán, Ngữ văn, Tiếng Anh",
      type: "Tổ hợp xét tuyển Kinh tế, Quản trị, Truyền thông & Ngoại ngữ",
      majors: "Kinh tế Đối ngoại, Quản trị Kinh doanh, Truyền thông Đa phương tiện, Luật Kinh tế, Tài chính - Ngân hàng",
      suitability: "Độ phủ tuyển sinh rộng nhất, phù hợp với học sinh có khả năng giao tiếp, viết lách và tư duy số học linh hoạt."
    },
    "D07": {
      name: "Toán, Hóa học, Tiếng Anh",
      type: "Tổ hợp xét tuyển Ứng dụng Công nghệ Sinh học & Hóa dược",
      majors: "Công nghệ Sinh học, Kỹ thuật Hóa học, Logistics và Quản lý Chuỗi Cung Ứng, Khoa học Dữ liệu",
      suitability: "Tổ hợp thay thế linh hoạt cho A00 và A01, giảm tải môn Vật lý nếu học sinh yêu thích Hóa học."
    },
    "B00": {
      name: "Toán, Hóa học, Sinh học",
      type: "Tổ hợp xét tuyển Y sinh & Sức khỏe",
      majors: "Y Đa khoa, Răng Hàm Mặt, Dược học, Thú y, Nông nghiệp Công nghệ cao",
      suitability: "Dành riêng cho học sinh kiên trì, đam mê phụng sự y khoa và khám phá thế giới sinh học."
    },
    "C00": {
      name: "Ngữ văn, Lịch sử, Địa lý",
      type: "Tổ hợp xét tuyển Khoa học Xã hội & Nhân văn",
      majors: "Báo chí - Truyền thông, Quan hệ Quốc tế, Tâm lý học, Xã hội học, Du lịch & Khách sạn",
      suitability: "Học sinh có lòng thấu cảm xã hội sâu sắc, khả năng lập luận ngôn từ và trí nhớ xã hội tốt."
    },
    "C01": {
      name: "Ngữ văn, Toán, Vật lý",
      type: "Tổ hợp xét tuyển Kỹ thuật, Kiến trúc & Đồ họa",
      majors: "Kiến trúc, Thiết kế Nội thất, Quy hoạch Đô thị, Kỹ thuật Công trình, Quản lý Xây dựng",
      suitability: "Phối hợp giữa cảm thụ không gian thẩm mỹ của Ngữ văn với tư duy hình học và cơ học của Toán - Lý."
    },
    "D14": {
      name: "Ngữ văn, Lịch sử, Tiếng Anh",
      type: "Tổ hợp xét tuyển Ngoại giao, Quốc tế học & Luật",
      majors: "Quan hệ Quốc tế, Luật Quốc tế, Ngôn ngữ học, Đông phương học, Báo chí Đa phương tiện",
      suitability: "Thế mạnh xã hội và ngoại ngữ sắc bén, phù hợp với các nghề làm việc trong môi trường đa quốc gia."
    },
    "D15": {
      name: "Ngữ văn, Địa lý, Tiếng Anh",
      type: "Tổ hợp xét tuyển Địa lý kinh tế, Du lịch & Dịch vụ",
      majors: "Quản trị Dịch vụ Du lịch & Lữ hành, Địa lý Kinh tế, Bất động sản, Quản lý Đô thị, Ngôn ngữ Anh",
      suitability: "Tư duy không gian văn hóa kết hợp kỹ năng tiếng Anh năng động và khả năng giao tiếp cởi mở."
    },
    "A02": {
      name: "Toán, Vật lý, Sinh học",
      type: "Tổ hợp xét tuyển Kỹ thuật Y sinh & Công nghệ Môi trường",
      majors: "Kỹ thuật Y sinh, Công nghệ Sinh học, Kỹ thuật Môi trường, Nông nghiệp Thông minh",
      suitability: "Dành cho học sinh đam mê công nghệ ứng dụng trong sự sống và chăm sóc sức khỏe."
    }
  },

  // 4. CÁC PHƯƠNG THỨC XÉT TUYỂN (CÓ METADATA PHIÊN BẢN & NGUỒN)
  admissionMethods: [
    {
      id: "method_tsa",
      name: "Thi Đánh giá Tư duy (TSA - ĐH Bách Khoa Hà Nội)",
      description: "Đánh giá tư duy Toán học, Tư duy Đọc hiểu và Tư duy Khoa học/Giải quyết vấn đề. Được hơn 40 trường ĐH kỹ thuật và kinh tế công nhận.",
      targetYear: "Lớp 11 - Lớp 12",
      tip: "Nên tham gia thi thử từ học kỳ 2 lớp 11 để làm quen với dạng đề trắc nghiệm tư duy.",
      version: {
        year: 2026,
        institution: "ĐH Bách Khoa Hà Nội",
        source: "Đề án Tuyển sinh Bách Khoa Hà Nội",
        verifiedDate: "2026-03",
        sourceUrl: "https://tsa.hust.edu.vn",
        status: "Chính thức"
      }
    },
    {
      id: "method_hsa_apt",
      name: "Thi Đánh giá Năng lực (HSA - ĐHQGHN & APT - ĐHQG-HCM)",
      description: "Kỳ thi đánh giá năng lực học sinh phổ thông với bài thi tổng hợp. Rất phổ biến cho các trường ĐH phía Bắc và phía Nam.",
      targetYear: "Lớp 12",
      tip: "Học sinh giữ vững học bạ tốt và luyện đề các đợt thi sớm từ tháng 3 đến tháng 5.",
      version: {
        year: 2026,
        institution: "ĐHQG Hà Nội & ĐHQG TP.HCM",
        source: "Cổng Thông tin Khảo thí ĐHQG",
        verifiedDate: "2026-03",
        sourceUrl: "https://cet.vnu.edu.vn",
        status: "Chính thức"
      }
    },
    {
      id: "method_ielts_combo",
      name: "Xét tuyển kết hợp Chứng chỉ Quốc tế (IELTS / SAT / VSTEP)",
      description: "Quy đổi chứng chỉ tiếng Anh (IELTS 6.0+ hoặc SAT 1200+) kết hợp với điểm thi tốt nghiệp hoặc học bạ.",
      targetYear: "Lớp 10 - Lớp 11",
      tip: "Nên hoàn thành mục tiêu chứng chỉ trước tháng 12 năm lớp 12 để không bị dồn áp lực.",
      version: {
        year: 2026,
        institution: "Bộ GD&ĐT & Các trường ĐH tự chủ",
        source: "Quy chế Tuyển sinh Đại học",
        verifiedDate: "2026-03",
        sourceUrl: "https://moet.gov.vn",
        status: "Quy chuẩn chung"
      }
    },
    {
      id: "method_thpt_exam",
      name: "Điểm Kỳ thi tốt nghiệp THPT",
      description: "Phương thức xét tuyển truyền thống theo tổ hợp 3 môn. Bộ GD&ĐT quy định chung theo đợt đăng ký nguyện vọng quốc gia.",
      targetYear: "Tháng 6 - Tháng 7 lớp 12",
      tip: "Đóng vai trò điều kiện tốt nghiệp bắt buộc và là cơ hội xét tuyển công bằng trên toàn quốc.",
      version: {
        year: 2026,
        institution: "Bộ Giáo dục và Đào tạo",
        source: "Quy chế Thi tốt nghiệp THPT 2026",
        verifiedDate: "2026-03",
        sourceUrl: "https://moet.gov.vn",
        status: "Quy chế quốc gia"
      }
    }
  ],

  // 5. LỘ TRÌNH ĐÀO TẠO SAU THPT (ĐA CON ĐƯỜNG)
  educationPathways: [
    {
      type: "Đại học Chính quy",
      duration: "3.5 - 6 năm",
      orientation: "Nghiên cứu chuyên sâu, lý thuyết nền tảng vững chắc kết hợp ứng dụng",
      costRange: "18 - 80 triệu VNĐ/năm (tùy trường công lập hay tự chủ)",
      suitableFor: "Học sinh có học lực Khá/Giỏi, định hướng làm việc tại các tập đoàn lớn, nghiên cứu hoặc quản lý cấp cao."
    },
    {
      type: "Cao đẳng Thực hành / Nghề chất lượng cao",
      duration: "2 - 3 năm",
      orientation: "70% thời lượng thực hành tay nghề, ra trường đi làm sớm, có thể liên thông ĐH",
      costRange: "12 - 30 triệu VNĐ/năm",
      suitableFor: "Học sinh muốn học nhanh - làm ngay, giảm gánh nặng tài chính cho cha mẹ, chú trọng kỹ năng thực chiến."
    },
    {
      type: "Chương trình Liên kết Quốc tế / Du học",
      duration: "3 - 4 năm (2+2 hoặc 3+1)",
      orientation: "Học tại Việt Nam kết hợp chuyển tiếp nước ngoài, bằng cấp quốc tế",
      costRange: "80 - 250 triệu VNĐ/năm",
      suitableFor: "Gia đình có ngân sách đầu tư giáo dục tốt, học sinh có khả năng ngoại ngữ và thích nghi văn hóa cao."
    },
    {
      type: "Học nghề Chuyên môn & Khởi nghiệp",
      duration: "6 tháng - 1.5 năm",
      orientation: "Đào tạo các nghề chuyên biệt (Lập trình web, Thiết kế đồ họa, Nghệ thuật ẩm thực, Kỹ thuật ô tô)",
      costRange: "15 - 45 triệu VNĐ trọn khóa",
      suitableFor: "Học sinh thích hành động trực tiếp, có ý chí tự lập sớm và muốn nhanh chóng tích lũy vốn sống."
    }
  ]
};

if (typeof window !== 'undefined') {
  window.EDUCATION_DATABASE = EDUCATION_DATABASE;
}
if (typeof global !== 'undefined') {
  global.EDUCATION_DATABASE = EDUCATION_DATABASE;
}
