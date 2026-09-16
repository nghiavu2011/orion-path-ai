// Dữ liệu tuyển sinh & lộ trình giáo dục Việt Nam (Cập nhật theo Chương trình GDPT 2018)
// Sử dụng thuật ngữ chuẩn xác: "Kỳ thi tốt nghiệp THPT", không dùng thuật ngữ cũ.

const EDUCATION_DATABASE = {
  examName: "Kỳ thi tốt nghiệp THPT",
  curriculum: "Chương trình Giáo dục phổ thông 2018",
  subjectCombinations: {
    "A00": {
      name: "Toán, Vật lý, Hóa học",
      type: "Khoa học Tự nhiên truyền thống",
      majors: "Kỹ thuật Cơ khí, Điện tử, Xây dựng, Hóa dầu, Bán dẫn, Khoa học Vật liệu",
      suitability: "Học sinh có tư duy định lượng vững, yêu thích phân tích các quy luật vật lý và phản ứng chất."
    },
    "A01": {
      name: "Toán, Vật lý, Tiếng Anh",
      type: "Khoa học Tự nhiên & Ngoại ngữ Hiện đại",
      majors: "Khoa học Máy tính, Trí tuệ Nhân tạo, Vi mạch Bán dẫn, Kỹ thuật Hàng không, Tự động hóa",
      suitability: "Lựa chọn vàng cho kỷ nguyên số: phối hợp giữa tư duy logic toán lý và năng lực hội nhập tiếng Anh."
    },
    "D01": {
      name: "Toán, Ngữ văn, Tiếng Anh",
      type: "Toàn diện Tự nhiên - Xã hội - Ngoại ngữ",
      majors: "Kinh tế Đối ngoại, Quản trị Kinh doanh, Truyền thông Đa phương tiện, Luật Kinh tế, Tài chính - Ngân hàng",
      suitability: "Độ phủ tuyển sinh rộng nhất, phù hợp với học sinh có khả năng giao tiếp, viết lách và tư duy số học linh hoạt."
    },
    "D07": {
      name: "Toán, Hóa học, Tiếng Anh",
      type: "Ứng dụng Công nghệ Sinh học & Hóa dược",
      majors: "Công nghệ Sinh học, Kỹ thuật Hóa học, Logistics và Quản lý Chuỗi Cung Ứng, Khoa học Dữ liệu",
      suitability: "Tổ hợp thay thế linh hoạt cho A00 và A01, giảm tải môn Vật lý nếu học sinh yêu thích Hóa học."
    },
    "B00": {
      name: "Toán, Hóa học, Sinh học",
      type: "Y sinh & Sức khỏe",
      majors: "Y Đa khoa, Răng Hàm Mặt, Dược học, Thú y, Nông nghiệp Công nghệ cao",
      suitability: "Dành riêng cho học sinh kiên trì, đam mê phụng sự y khoa và khám phá thế giới sinh học."
    },
    "C00": {
      name: "Ngữ văn, Lịch sử, Địa lý",
      type: "Khoa học Xã hội & Nhân văn",
      majors: "Báo chí - Truyền thông, Quan hệ Quốc tế, Tâm lý học, Xã hội học, Du lịch & Khách sạn",
      suitability: "Học sinh có lòng thấu cảm xã hội sâu sắc, khả năng lập luận ngôn từ và trí nhớ xã hội tốt."
    }
  },
  admissionMethods: [
    {
      id: "method_tsa",
      name: "Thi Đánh giá Tư duy (TSA - ĐH Bách Khoa Hà Nội)",
      description: "Đánh giá tư duy Toán học, Tư duy Đọc hiểu và Tư duy Khoa học/Giải quyết vấn đề. Được hơn 40 trường ĐH kỹ thuật và kinh tế công nhận.",
      targetYear: "Lớp 11 - Lớp 12",
      tip: "Nên tham gia thi thử từ học kỳ 2 lớp 11 để làm quen với dạng đề trắc nghiệm tư duy."
    },
    {
      id: "method_hsa_apt",
      name: "Thi Đánh giá Năng lực (HSA - ĐHQGHN & APT - ĐHQG-HCM)",
      description: "Kỳ thi đánh giá năng lực học sinh phổ thông với bài thi tổng hợp. Rất phổ biến cho các trường ĐH phía Bắc và phía Nam.",
      targetYear: "Lớp 12",
      tip: "Học sinh giữ vững học bạ tốt và luyện đề các đợt thi sớm từ tháng 3 đến tháng 5."
    },
    {
      id: "method_ielts_combo",
      name: "Xét tuyển kết hợp Chứng chỉ Quốc tế (IELTS / SAT / VSTEP)",
      description: "Quy đổi chứng chỉ tiếng Anh (IELTS 6.0+ hoặc SAT 1200+) kết hợp với điểm thi tốt nghiệp hoặc học bạ.",
      targetYear: "Lớp 10 - Lớp 11",
      tip: "Nên hoàn thành mục tiêu chứng chỉ trước tháng 12 năm lớp 12 để không bị dồn áp lực."
    },
    {
      id: "method_thpt_exam",
      name: "Điểm Kỳ thi tốt nghiệp THPT",
      description: "Phương thức xét tuyển truyền thống theo tổ hợp 3 môn. Bộ GD&ĐT quy định chung theo đợt đăng ký nguyện vọng quốc gia.",
      targetYear: "Tháng 6 - Tháng 7 lớp 12",
      tip: "Đóng vai trò điều kiện tốt nghiệp bắt buộc và là cơ hội xét tuyển công bằng trên toàn quốc."
    }
  ],
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
