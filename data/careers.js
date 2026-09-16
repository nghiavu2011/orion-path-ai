// Dữ liệu ngành nghề và thị trường lao động Orion Path AI
// Chuẩn hóa theo nguyên tắc minh bạch: không bịa đặt số liệu lương, cung cấp nguồn đối chiếu.

const CAREERS_DATABASE = [
  {
    id: "ai_ml_engineer",
    name: "Kỹ sư Trí tuệ Nhân tạo (AI/ML Engineer)",
    riasec: ["I", "R"],
    desc: "Nghiên cứu, huấn luyện các mô hình học máy (Machine Learning), xử lý ngôn ngữ tự nhiên (NLP) và thị giác máy tính để giải quyết các bài toán tự động hóa thông minh.",
    signalBase: "Phù hợp với học sinh có tư duy phân tích toán học mạnh (I) và yêu thích kỹ thuật thực hành (R).",
    pathways: [
      { type: "Đại học", name: "Khoa học Máy tính / Trí tuệ Nhân tạo (ĐH Bách Khoa, ĐHQG, FPT, Sư phạm Kỹ thuật)" },
      { type: "Cao đẳng / Chứng chỉ", name: "Lập trình viên Quốc tế / Chứng chỉ Kỹ sư Dữ liệu & AI (FPT Polytechnic, Aptech)" }
    ],
    salary: {
      range: "18 - 45 triệu VNĐ/tháng (khởi điểm - 3 năm kinh nghiệm)",
      source: "Báo cáo thị trường IT Việt Nam TopDev & VietnamWorks 2024-2025",
      verified: true
    },
    laborDemand: "Nhu cầu tuyển dụng tăng trưởng cao (FPT, Viettel, VinAI, FDI)",
    aiAdaptability: "Là người trực tiếp kiến tạo và tối ưu hóa hệ thống AI",
    settleStrategy: "Tập trung tại các trung tâm công nghệ cao: Khu CNC Hòa Lạc (HN), Khu CNC TP.HCM, Khu CVPM Quang Trung, Đà Nẵng.",
    evidenceSignals: ["Tư duy Toán - Tin vượt trội", "Thích giải đố thuật toán", "Kiên nhẫn debug lỗi logic"],
    potentialConflicts: ["Áp lực ngồi máy tính thời gian dài", "Công nghệ thay đổi rất nhanh đòi hỏi tự học liên tục", "Cần nền tảng Toán giải tích & xác suất tốt"],
    unknownsToTest: [
      "Em đã từng tự viết code một chương trình nhỏ chưa?",
      "Em có cảm thấy hào hứng hay kiệt sức khi ngồi dò lỗi code suốt 2 tiếng?",
      "Em có muốn theo đuổi hướng nghiên cứu thuật toán sâu hay ứng dụng sản phẩm?"
    ],
    recommendedExperiment: {
      id: "exp_ai_chatbot",
      title: "Xây dựng Trợ lý ảo Mini bằng Python trong 90 phút",
      duration: "90 phút",
      type: "Mini Project",
      objective: "Trải nghiệm cảm giác viết mã nguồn, gọi API trí tuệ nhân tạo và xử lý logic phản hồi thực tế."
    }
  },
  {
    id: "chip_design_engineer",
    name: "Kỹ sư Thiết kế Vi mạch & Bán dẫn (IC Design)",
    riasec: ["R", "I"],
    desc: "Thiết kế mạch tích hợp (ASIC/FPGA), kiểm thử chức năng vi mạch bán dẫn phần cứng phục vụ thiết bị thông minh, ô tô điện và viễn thông.",
    signalBase: "Định hướng trọng điểm quốc gia, cực kỳ phù hợp với học sinh đam mê Vật lý, Toán và phần cứng điện tử.",
    pathways: [
      { type: "Đại học", name: "Kỹ thuật Điện tử - Viễn thông / Thiết kế Vi mạch (ĐH Bách Khoa HN/TP.HCM, ĐH Công nghệ ĐHQGHN)" },
      { type: "Cao đẳng / Đào tạo nghề cao", name: "Kỹ thuật Điện tử ứng dụng (CĐ Nghề Bách Khoa, CĐ Cao Thắng)" }
    ],
    salary: {
      range: "15 - 40 triệu VNĐ/tháng (kỹ sư mới tốt nghiệp đến 3 năm)",
      source: "Khảo sát Hiệp hội Bán dẫn Đông Nam Á (SEMI) & NIC Việt Nam 2024",
      verified: true
    },
    laborDemand: "Được Chính phủ Việt Nam ưu tiên chiến lược đến năm 2030 (hợp tác Intel, Synopsys, Marvell, Amkor)",
    aiAdaptability: "Rất cao (thiết kế vi mạch vật lý đòi hỏi kiểm chứng thực nghiệm nghiêm ngặt)",
    settleStrategy: "Trung tâm R&D bán dẫn tại Khu CNC TP.HCM, Hà Nội, Bắc Ninh, Đà Nẵng.",
    evidenceSignals: ["Yêu thích môn Vật lý & Điện tử", "Tỉ mỉ, cẩn thận với từng chi tiết nhỏ", "Thích tìm hiểu cấu tạo phần cứng"],
    potentialConflicts: ["Thời gian đào tạo chuyên sâu kéo dài", "Yêu cầu độ chính xác tuyệt đối (lỗi thiết kế chip tốn kém triệu USD)", "Cần tiếng Anh chuyên ngành cao"],
    unknownsToTest: [
      "Em có hứng thú với cấu trúc linh kiện bán dẫn và mạch logic số không?",
      "Mức độ tỉ mỉ và khả năng kiên trì lặp lại các bước kiểm thử của em ra sao?"
    ],
    recommendedExperiment: {
      id: "exp_logic_gate",
      title: "Mô phỏng cổng logic và mạch cộng số trên Tinkercad",
      duration: "60 phút",
      type: "Mô phỏng thực hành",
      objective: "Hiểu nguyên lý cơ bản của mạch bán dẫn thông qua phần mềm mô phỏng mạch điện tử trực quan miễn phí."
    }
  },
  {
    id: "ui_ux_designer",
    name: "Chuyên viên Thiết kế Trải nghiệm Sản phẩm Số (UI/UX Designer)",
    riasec: ["A", "I"],
    desc: "Nghiên cứu hành vi người dùng, vẽ luồng trải nghiệm (wireframe, user journey) và thiết kế giao diện ứng dụng di động, web trực quan, thẩm mỹ.",
    signalBase: "Giao thoa hoàn hảo giữa tư duy sáng tạo nghệ thuật (A) và nghiên cứu tâm lý thấu cảm (I/S).",
    pathways: [
      { type: "Đại học", name: "Thiết kế Đồ họa / Tương tác Đa phương tiện (ĐH Mỹ thuật Công nghiệp, Kiến trúc, RMIT, FPT)" },
      { type: "Đào tạo thực chiến / Khóa học nghề", name: "Học viện Thiết kế Thực hành (ColorME, Green Academy, Arena Multimedia)" }
    ],
    salary: {
      range: "12 - 35 triệu VNĐ/tháng",
      source: "Báo cáo tuyển dụng UX Việt Nam 2024 (VietnamWorks)",
      verified: true
    },
    laborDemand: "Khá cao trong các công ty công nghệ, ngân hàng số và thương mại điện tử",
    aiAdaptability: "Khá (AI hỗ trợ vẽ nhưng cần con người thấu cảm trải nghiệm người dùng)",
    settleStrategy: "Làm việc tại các đô thị lớn hoặc làm việc từ xa (Remote/Freelance toàn cầu).",
    evidenceSignals: ["Cảm quan thẩm mỹ tốt", "Thường xuyên để ý vì sao một ứng dụng dễ hoặc khó dùng", "Thích phác thảo ý tưởng bằng hình ảnh"],
    potentialConflicts: ["Phải lắng nghe phản biện từ khách hàng và lập trình viên", "Cần cân bằng giữa cái đẹp và tính tiện dụng kỹ thuật"],
    unknownsToTest: [
      "Em có thích việc lắng nghe người khác nhận xét về bản thiết kế của mình không?",
      "Em đã thử sử dụng Figma hay phần mềm vẽ thiết kế bao giờ chưa?"
    ],
    recommendedExperiment: {
      id: "exp_figma_app",
      title: "Thiết kế lại màn hình ứng dụng yêu thích trên Figma trong 60 phút",
      duration: "60 phút",
      type: "Portfolio Challenge",
      objective: "Làm quen với công cụ Figma chuẩn quốc tế và trải nghiệm tư duy sắp xếp bố cục thân thiện với người dùng."
    }
  },
  {
    id: "data_analyst",
    name: "Chuyên viên Phân tích Dữ liệu (Data Analyst)",
    riasec: ["I", "C"],
    desc: "Thu thập, làm sạch dữ liệu kinh doanh và chuyển đổi các con số khô khan thành biểu đồ trực quan (Dashboard), đề xuất giải pháp phát triển doanh nghiệp.",
    signalBase: "Phù hợp với học sinh mạnh về tư duy tổ chức dữ liệu ngăn nắp (C) và tò mò khám phá quy luật (I).",
    pathways: [
      { type: "Đại học", name: "Khoa học Dữ liệu / Hệ thống Thông tin Quản lý (ĐH Kinh tế Quốc dân, Ngoại thương, ĐHQG)" },
      { type: "Cao đẳng / Chứng chỉ thực tế", name: "Chứng chỉ Phân tích Dữ liệu chuyên nghiệp Google / Coursera / CĐ Kinh tế" }
    ],
    salary: {
      range: "12 - 32 triệu VNĐ/tháng",
      source: "Vietnam Salary Guide Adecco 2024",
      verified: true
    },
    laborDemand: "Ổn định và rộng khắp mọi ngành nghề (Bán lẻ, Ngân hàng, Y tế, Giáo dục)",
    aiAdaptability: "Khá (AI viết SQL nhanh nhưng con người cần giải thích ý nghĩa kinh doanh)",
    settleStrategy: "Trọng điểm tại các văn phòng công ty đa quốc gia, ngân hàng tại Hà Nội và TP.HCM.",
    evidenceSignals: ["Thích làm việc với bảng tính Excel", "Thích tìm bằng chứng xác thực trước khi kết luận", "Ngăn nắp, yêu thích tính chuẩn xác"],
    potentialConflicts: ["Công việc đòi hỏi xử lý dữ liệu lớn lặp lại", "Phải thuyết trình giải thích số liệu cho người không rành kỹ thuật"],
    unknownsToTest: [
      "Em có cảm thấy thú vị khi tìm ra một xu hướng ẩn sau một bảng số liệu không?",
      "Mức độ kiên nhẫn khi xử lý các dữ liệu bị thiếu hoặc sai lệch?"
    ],
    recommendedExperiment: {
      id: "exp_data_sheet",
      title: "Phân tích xu hướng âm nhạc Spotify bằng Google Sheets",
      duration: "60 phút",
      type: "Mini Project",
      objective: "Tự tạo biểu đồ và rút ra 3 phát hiện thú vị từ bộ dữ liệu bài hát thực tế."
    }
  },
  {
    id: "esg_sustainability_specialist",
    name: "Chuyên viên Phát triển Bền vững & Kinh tế Xanh (ESG Specialist)",
    riasec: ["I", "S"],
    desc: "Đo lường tác động môi trường, phát thải carbon và tư vấn doanh nghiệp chuyển đổi xanh, tuân thủ các tiêu chuẩn phát triển bền vững quốc tế.",
    signalBase: "Ngành nghề đón đầu xu thế toàn cầu, kết hợp giữa tình yêu môi trường/cộng đồng (S) và năng lực nghiên cứu chính sách (I).",
    pathways: [
      { type: "Đại học", name: "Quản lý Tài nguyên Môi trường / Kinh tế Phát triển (ĐH Bách Khoa, ĐHQG, ĐH Kinh tế TP.HCM)" },
      { type: "Du học / Học bổng", name: "Học bổng các nước Bắc Âu / Đức / Úc chuyên ngành Sustainability" }
    ],
    salary: {
      range: "15 - 38 triệu VNĐ/tháng (vị trí doanh nghiệp xuất khẩu/FDI)",
      source: "Khảo sát Xu hướng Việc làm Xanh PwC Việt Nam 2024",
      verified: true
    },
    laborDemand: "Tăng trưởng nhanh do yêu cầu kiểm toán carbon từ thị trường Mỹ và EU",
    aiAdaptability: "Rất cao (đòi hỏi khảo sát thực địa, thấu cảm cộng đồng và đàm phán chính sách)",
    settleStrategy: "Doanh nghiệp sản xuất xuất khẩu tại Bình Dương, Đồng Nai, Hải Phòng, Hà Nội.",
    evidenceSignals: ["Quan tâm đến biến đổi khí hậu và rác thải nhựa", "Thích các hoạt động tình nguyện xã hội", "Học tốt môn Địa lý, Sinh học hoặc Hóa học"],
    potentialConflicts: ["Thị trường Việt Nam còn mới, cần thời gian để doanh nghiệp vừa và nhỏ thích nghi", "Nhiều thủ tục văn bản pháp lý"],
    unknownsToTest: [
      "Em có sẵn sàng tham gia các chuyến khảo sát thực địa tại các nhà máy hoặc vùng sinh thái không?",
      "Khả năng nghiên cứu các báo cáo chính sách quốc tế bằng tiếng Anh của em thế nào?"
    ],
    recommendedExperiment: {
      id: "exp_carbon_audit",
      title: "Kiểm toán 'Dấu chân Carbon' của gia đình em trong 1 tuần",
      duration: "75 phút",
      type: "Dự án thực tế",
      objective: "Sử dụng công cụ tính toán phát thải, tìm hiểu nguồn năng lượng tiêu thụ và lập kế hoạch giảm 10% chi phí điện cho gia đình."
    }
  },
  {
    id: "healthcare_practitioner",
    name: "Bác sĩ / Chuyên viên Y tế Chăm sóc Sức khỏe",
    riasec: ["S", "I"],
    desc: "Thăm khám, chẩn đoán, điều trị và chăm sóc phục hồi sức khỏe thể chất và tinh thần cho người bệnh.",
    signalBase: "Thiên hướng phụng sự xã hội (S) và tư duy khoa học y sinh sâu sắc (I).",
    pathways: [
      { type: "Đại học chính quy dài hạn", name: "Bác sĩ Đa khoa / Răng Hàm Mặt (ĐH Y Hà Nội, ĐH Y Dược TP.HCM - 6 năm)" },
      { type: "Cử nhân / Cao đẳng Y tế", name: "Điều dưỡng / Kỹ thuật Phục hồi chức năng (4 năm ĐH hoặc 3 năm Cao đẳng, cơ hội làm việc tại Nhật/Đức)" }
    ],
    salary: {
      range: "12 - 50 triệu VNĐ/tháng (tùy tuyến bệnh viện, phòng khám tư nhân và thâm niên)",
      source: "Báo cáo mức lương ngành Y tế Việt Nam 2024",
      verified: true
    },
    laborDemand: "Nhu cầu vĩnh viễn, thiếu hụt điều dưỡng và bác sĩ chất lượng cao",
    aiAdaptability: "Đặc biệt an toàn trước làn sóng AI (sự ấm áp, y đức và thao tác lâm sàng của con người không thể thay thế)",
    settleStrategy: "Bệnh viện công lập và quốc tế trên toàn quốc; cơ hội định cư theo diện nhân lực y tế.",
    evidenceSignals: ["Lòng trắc ẩn, quan tâm sâu sắc tới nỗi đau của người khác", "Chăm chỉ, chịu được áp lực học tập bền bỉ", "Mạnh về môn Sinh học và Hóa học"],
    potentialConflicts: ["Thời gian đào tạo dài (6 năm ĐH + 18 tháng thực hành)", "Trực đêm và áp lực cứu người rất cao", "Học phí khối Y Dược tự chủ đang tăng nhanh"],
    unknownsToTest: [
      "Em có bị sợ máu hoặc ngần ngại khi tiếp xúc với môi trường bệnh viện không?",
      "Gia đình em có sẵn sàng đồng hành hỗ trợ tài chính cho một chặng đường học tập 6-8 năm không?"
    ],
    recommendedExperiment: {
      id: "exp_first_aid",
      title: "Học và thực hành Kỹ năng Sơ cấp cứu CPR cơ bản",
      duration: "90 phút",
      type: "Kỹ năng thực hành",
      objective: "Hoàn thành video hướng dẫn sơ cấp cứu của Hội Chữ Thập Đỏ và kiểm tra cảm xúc khi thực hành thao tác cứu người trên mô hình/gối."
    }
  }
];

if (typeof window !== 'undefined') {
  window.CAREERS_DATABASE = CAREERS_DATABASE;
}
if (typeof global !== 'undefined') {
  global.CAREERS_DATABASE = CAREERS_DATABASE;
}
