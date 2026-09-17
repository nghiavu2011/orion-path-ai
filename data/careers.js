// Dữ liệu ngành nghề và thị trường lao động Orion Path AI
// Chuẩn hóa theo nguyên tắc minh bạch: mô hình tác vụ nghề nghiệp, đánh giá AI định tính, không bịa đặt số liệu.

const CAREERS_DATABASE = [
  {
    id: "ai_ml_engineer",
    name: "Kỹ sư Trí tuệ Nhân tạo (AI/ML Engineer)",
    riasec: ["I", "R"],
    desc: "Nghiên cứu, huấn luyện các mô hình học máy (Machine Learning), xử lý ngôn ngữ tự nhiên (NLP) và thị giác máy tính để giải quyết các bài toán tự động hóa thông minh.",
    signalBase: "Phù hợp với học sinh có tư duy phân tích toán học mạnh (I) và yêu thích kỹ thuật thực hành (R).",
    whatYouActuallyDo: "Đọc tài liệu nghiên cứu giải thuật, chuẩn bị và làm sạch tập dữ liệu lớn, viết mã huấn luyện mô hình học máy (Python, PyTorch), đo lường độ chính xác và triển khai mô hình lên hệ thống thực tế.",
    typicalTasks: [
      "Tiền xử lý và làm sạch dữ liệu huấn luyện (Data preprocessing)",
      "Huấn luyện và tinh chỉnh siêu tham số mô hình Machine Learning/Deep Learning",
      "Đánh giá độ hội tụ và độ chính xác của mô hình trên tập kiểm thử",
      "Đóng gói mô hình thành API phục vụ sản phẩm người dùng cuối",
      "Theo dõi và khắc phục hiện tượng trôi dữ liệu (Data drift) khi vận hành thực tế"
    ],
    skills: {
      foundation: ["Đại số tuyến tính & Xác suất thống kê", "Tư duy giải thuật cơ bản", "Tiếng Anh đọc tài liệu kỹ thuật"],
      working: ["Lập trình Python, SQL & thư viện Pandas/NumPy", "Huấn luyện mô hình Scikit-Learn/PyTorch", "Sử dụng Git & công cụ quản lý phiên bản mã nguồn"],
      strong: ["Kiến trúc mạng Neural sâu (Transformer, CNN)", "Tối ưu hóa tài nguyên phần cứng GPU/TPU", "Đạo đức AI & Kiểm định thiên kiến dữ liệu (Bias)"]
    },
    evidenceStudentCanBuild: [
      "Kho mã nguồn GitHub chứa 1 dự án phân loại ảnh hoặc chatbot mini tự xây dựng",
      "Bài viết tóm tắt ngắn về nguyên lý hoạt động của một mô hình AI phổ biến",
      "Chứng chỉ hoàn thành khóa học Python/Machine Learning cơ bản từ nền tảng uy tín (Coursera, Kaggle)"
    ],
    entryRoutes: [
      { type: "Đại học chính quy", name: "Khoa học Máy tính / Trí tuệ Nhân tạo (ĐH Bách Khoa, ĐHQG, FPT, Sư phạm Kỹ thuật)" },
      { type: "Cao đẳng & Đào tạo nghề", name: "Lập trình ứng dụng / Kỹ sư Dữ liệu (FPT Polytechnic, Aptech)" },
      { type: "Tự học & Thực chiến", name: "Tham gia thi đấu Kaggle, đóng góp dự án mã nguồn mở và thực tập sớm" }
    ],
    pathways: [
      { type: "Đại học chính quy", name: "Khoa học Máy tính / Trí tuệ Nhân tạo (ĐH Bách Khoa, ĐHQG, FPT, Sư phạm Kỹ thuật)" },
      { type: "Cao đẳng & Đào tạo nghề", name: "Lập trình ứng dụng / Kỹ sư Dữ liệu (FPT Polytechnic, Aptech)" },
      { type: "Tự học & Thực chiến", name: "Tham gia thi đấu Kaggle, đóng góp dự án mã nguồn mở và thực tập sớm" }
    ],
    adjacentCareers: ["Data Scientist", "Data Engineer", "MLOps Engineer", "Software Engineer", "AI Product Specialist"],
    salary: {
      range: "Thu nhập thay đổi đáng kể theo kinh nghiệm, địa phương và doanh nghiệp. Xem nguồn dữ liệu.",
      source: "Báo cáo thị trường IT Việt Nam & Báo cáo Hướng dẫn Tiền lương",
      verified: true
    },
    laborDemand: "Nhu cầu tuyển dụng tăng trưởng cao (FPT, Viettel, VinAI, FDI)",
    aiExposure: "Cao",
    humanAdvantage: "Cao",
    transformationDirection: "AI đẩy nhanh khâu viết mã lặp lại; năng lực con người tập trung vào việc đặt đúng bài toán nghiệp vụ, thiết kế kiến trúc mới và kiểm soát an toàn/đạo đức mô hình.",
    evidenceConfidence: "Cao",
    dataUpdated: "2026-Q1",
    aiAdaptability: "Là người trực tiếp kiến tạo và tối ưu hóa hệ thống AI",
    aiReplacementRisk: "Thấp",
    humanCoreSkill: "Tư duy trừu tượng toán học & Kiểm định đạo đức thuật toán",
    aiSynergyTip: "Dùng AI để sinh mã kiểm thử và tài liệu hóa; tập trung năng lực vào kiến trúc mô hình và giải thuật mới.",
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
    whatYouActuallyDo: "Lập trình mô tả phần cứng (Verilog/VHDL), mô phỏng hoạt động logic của mạch tích hợp trên máy tính, chạy kiểm thử vi mạch vật lý và làm việc cùng nhà máy bán dẫn để sản xuất vi mạch chuẩn xác.",
    typicalTasks: [
      "Viết mã mô tả kiến trúc logic phần cứng bằng SystemVerilog/VHDL",
      "Chạy mô phỏng kiểm thử chức năng và thời gian truyền tín hiệu trên phần mềm EDA",
      "Phân tích tiêu thụ điện năng và diện tích chip (Power, Performance, Area - PPA)",
      "Định tuyến vật lý (Place and Route) các cổng logic trên tấm bán dẫn",
      "Phối hợp đo kiểm vi mạch thực tế sau khi đúc tại xưởng (Post-silicon validation)"
    ],
    skills: {
      foundation: ["Vật lý bán dẫn & Điện tử cơ bản", "Đại số Boole & Mạch logic số", "Đọc hiểu tiếng Anh chuyên ngành kỹ thuật"],
      working: ["Lập trình Verilog/SystemVerilog", "Sử dụng công cụ mô phỏng EDA (ModelSim, Cadence, Synopsys)", "Kỹ năng phân tích dạng sóng tín hiệu"],
      strong: ["Thiết kế kiến trúc vi mạch số/tương tự chuyên sâu", "Kiểm chuẩn chất lượng chip chuẩn quốc tế", "Tối ưu hóa tiêu thụ năng lượng ở mức nano-mét"]
    },
    evidenceStudentCanBuild: [
      "Mô hình mạch logic số hoặc mạch cộng đã mô phỏng thành công trên Tinkercad/Logisim",
      "Báo cáo phân tích cấu tạo và chức năng của một vi điều khiển phổ biến (Arduino, ESP32)",
      "Giải thưởng các cuộc thi khoa học kỹ thuật (STEM/Robotics) cấp trường hoặc tỉnh"
    ],
    entryRoutes: [
      { type: "Đại học chính quy", name: "Kỹ thuật Điện tử - Viễn thông / Thiết kế Vi mạch (ĐH Bách Khoa HN/TP.HCM, ĐH Công nghệ ĐHQGHN)" },
      { type: "Cao đẳng kỹ thuật", name: "Kỹ thuật Điện tử ứng dụng / Cơ điện tử (CĐ Nghề Bách Khoa, CĐ Cao Thắng)" },
      { type: "Chương trình chuyên biệt", name: "Khóa đào tạo nhân lực bán dẫn quốc gia hợp tác cùng Synopsys/Cadence" }
    ],
    pathways: [
      { type: "Đại học chính quy", name: "Kỹ thuật Điện tử - Viễn thông / Thiết kế Vi mạch (ĐH Bách Khoa HN/TP.HCM, ĐH Công nghệ ĐHQGHN)" },
      { type: "Cao đẳng kỹ thuật", name: "Kỹ thuật Điện tử ứng dụng / Cơ điện tử (CĐ Nghề Bách Khoa, CĐ Cao Thắng)" },
      { type: "Chương trình chuyên biệt", name: "Khóa đào tạo nhân lực bán dẫn quốc gia hợp tác cùng Synopsys/Cadence" }
    ],
    adjacentCareers: ["Hardware Engineer", "Embedded Systems Engineer", "FPGA Engineer", "Firmware Engineer", "Semiconductor Test Engineer"],
    salary: {
      range: "Thu nhập thay đổi đáng kể theo kinh nghiệm, địa phương và doanh nghiệp. Xem nguồn dữ liệu.",
      source: "Khảo sát Ngành Bán dẫn & Báo cáo Hướng dẫn Tiền lương",
      verified: true
    },
    laborDemand: "Được Chính phủ Việt Nam ưu tiên chiến lược đến năm 2030 (hợp tác Intel, Synopsys, Marvell, Amkor)",
    aiExposure: "Vừa",
    humanAdvantage: "Cao",
    transformationDirection: "AI đóng vai trò tối ưu hóa bố trí linh kiện và tăng tốc kiểm thử mô phỏng; quyết định phê duyệt kiến trúc và tính an toàn vật lý tuyệt đối thuộc về kỹ sư con người.",
    evidenceConfidence: "Cao",
    dataUpdated: "2026-Q1",
    aiAdaptability: "Rất cao (thiết kế vi mạch vật lý đòi hỏi kiểm chứng thực nghiệm nghiêm ngặt)",
    aiReplacementRisk: "Rất thấp",
    humanCoreSkill: "Thiết kế vi mạch vật lý & Kiểm thử thực nghiệm phần cứng",
    aiSynergyTip: "Phối hợp công cụ EDA tích hợp AI để tối ưu layout mạch nhưng con người giữ quyền quyết định dung sai và an toàn.",
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
    whatYouActuallyDo: "Phỏng vấn người dùng để hiểu khó khăn khi sử dụng phần mềm, phác thảo luồng điều hướng (Wireframe), thiết kế giao diện chi tiết bằng Figma và kiểm tra độ dễ dùng với người thật.",
    typicalTasks: [
      "Phỏng vấn người dùng thực và tổng hợp bản đồ hành trình người dùng (User Journey)",
      "Phác thảo cấu trúc thông tin và bố cục khung dây (Wireframe/Prototype)",
      "Xây dựng hệ thống thiết kế (Design System) gồm màu sắc, nút bấm, kiểu chữ nhất quán",
      "Thực hiện kiểm thử mức độ tiện dụng (Usability Testing) và quan sát phản xạ người dùng",
      "Phối hợp với đội ngũ kỹ sư phần mềm để đảm bảo giao diện hiển thị đúng thiết kế"
    ],
    skills: {
      foundation: ["Cảm quan thẩm mỹ & Nguyên lý thị giác cơ bản", "Tư duy thấu cảm và lắng nghe", "Giao tiếp và diễn đạt ý tưởng mạch lạc"],
      working: ["Thành thạo công cụ thiết kế giao diện Figma", "Hiểu cấu trúc luồng người dùng và UX Research", "Nắm vững nguyên lý tương tác web và di động"],
      strong: ["Xây dựng Design System quy mô lớn", "Phân tích dữ liệu hành vi người dùng (A/B testing, Heatmap)", "Thiết kế tiếp cận phổ quát (Accessibility WCAG)"]
    },
    evidenceStudentCanBuild: [
      "Hồ sơ portfolio Figma chứa 1 bản thiết kế lại (redesign) ứng dụng phổ biến với lý do cải tiến rõ ràng",
      "Bộ nghiên cứu nhỏ quan sát 3 bạn cùng lớp sử dụng một website trường học và đề xuất giải pháp",
      "Bản phác thảo ý tưởng ứng dụng giải quyết một vấn đề trong đời sống học đường"
    ],
    entryRoutes: [
      { type: "Đại học chính quy", name: "Thiết kế Đồ họa / Tương tác Đa phương tiện / Mỹ thuật Ứng dụng (ĐH Kiến trúc, Mỹ thuật CN, RMIT, FPT)" },
      { type: "Học viện thực hành", name: "Khóa đào tạo chuyên sâu UI/UX thực chiến (ColorME, Green Academy, Arena Multimedia)" },
      { type: "Tự học qua dự án", name: "Xây dựng portfolio cá nhân thực tế, tham gia cộng đồng thiết kế và thực tập từ vị trí Junior" }
    ],
    pathways: [
      { type: "Đại học chính quy", name: "Thiết kế Đồ họa / Tương tác Đa phương tiện / Mỹ thuật Ứng dụng (ĐH Kiến trúc, Mỹ thuật CN, RMIT, FPT)" },
      { type: "Học viện thực hành", name: "Khóa đào tạo chuyên sâu UI/UX thực chiến (ColorME, Green Academy, Arena Multimedia)" },
      { type: "Tự học qua dự án", name: "Xây dựng portfolio cá nhân thực tế, tham gia cộng đồng thiết kế và thực tập từ vị trí Junior" }
    ],
    adjacentCareers: ["Product Designer", "UX Researcher", "Graphic Designer", "Visual Designer", "Product Manager"],
    salary: {
      range: "Thu nhập thay đổi đáng kể theo kinh nghiệm, địa phương và doanh nghiệp. Xem nguồn dữ liệu.",
      source: "Báo cáo tuyển dụng Công nghệ & Báo cáo Hướng dẫn Tiền lương",
      verified: true
    },
    laborDemand: "Khá cao trong các công ty công nghệ, ngân hàng số và thương mại điện tử",
    aiExposure: "Cao",
    humanAdvantage: "Cao",
    transformationDirection: "AI giảm thời gian vẽ các biến thể giao diện cơ bản; giá trị cốt lõi của nhà thiết kế chuyển dịch sang việc nghiên cứu tâm lý người dùng, bản sắc thương hiệu và tính nhân văn.",
    evidenceConfidence: "Cao",
    dataUpdated: "2026-Q1",
    aiAdaptability: "Khá (AI hỗ trợ vẽ nhưng cần con người thấu cảm trải nghiệm người dùng)",
    aiReplacementRisk: "Trung bình",
    humanCoreSkill: "Thấu cảm tâm lý người dùng sâu & Bản sắc thẩm mỹ riêng biệt",
    aiSynergyTip: "Dùng AI tạo nhanh moodboard, biến thể layout; dành thời gian trực tiếp phỏng vấn người dùng thực.",
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
    whatYouActuallyDo: "Viết câu truy vấn trích xuất dữ liệu từ kho, xử lý các ô trống hoặc số liệu sai lệch, vẽ biểu đồ báo cáo và trình bày các điểm cần cải thiện cho đội ngũ kinh doanh.",
    typicalTasks: [
      "Thu thập và kiểm tra tính toàn vẹn của dữ liệu từ nhiều nguồn khác nhau",
      "Viết truy vấn SQL để lọc và tổng hợp số liệu kinh doanh",
      "Xây dựng bảng hiển thị trực quan (Dashboard) tự động trên Tableau/Power BI",
      "Phân tích nguyên nhân biến động doanh thu, chi phí hoặc hành vi người dùng",
      "Thuyết trình báo cáo phân tích cho các bộ phận nghiệp vụ không am hiểu kỹ thuật"
    ],
    skills: {
      foundation: ["Toán thống kê mô tả", "Tư duy logic số học", "Tính cẩn thận, ngăn nắp và trung thực với số liệu"],
      working: ["Thành thạo bảng tính Google Sheets / Excel nâng cao", "Viết câu truy vấn dữ liệu SQL", "Sử dụng công cụ trực quan hóa Power BI hoặc Tableau"],
      strong: ["Lập trình phân tích dữ liệu Python/R", "Hiểu sâu bản chất nghiệp vụ kinh tế và vận hành", "Nghệ thuật kể chuyện bằng số liệu (Data Storytelling)"]
    },
    evidenceStudentCanBuild: [
      "Bảng tính Google Sheets phân tích một bộ dữ liệu thực tế (chi tiêu cá nhân, điểm số, xu hướng âm nhạc) kèm biểu đồ",
      "Dashboard tương tác mini chia sẻ trên Power BI Service hoặc Looker Studio",
      "Chứng chỉ hoàn thành chương trình Phân tích Dữ liệu Google (Google Data Analytics Professional Certificate)"
    ],
    entryRoutes: [
      { type: "Đại học chính quy", name: "Khoa học Dữ liệu / Hệ thống Thông tin Quản lý / Thống kê Kinh tế (ĐH Kinh tế Quốc dân, Ngoại thương, ĐHQG)" },
      { type: "Cao đẳng & Chứng chỉ", name: "Chứng chỉ Phân tích Dữ liệu Google / Coursera / CĐ Kinh tế" },
      { type: "Chuyển ngành từ Kinh tế/Toán", name: "Tự trau dồi SQL và trực quan hóa dữ liệu để ứng tuyển vị trí thực tập phân tích" }
    ],
    pathways: [
      { type: "Đại học chính quy", name: "Khoa học Dữ liệu / Hệ thống Thông tin Quản lý / Thống kê Kinh tế (ĐH Kinh tế Quốc dân, Ngoại thương, ĐHQG)" },
      { type: "Cao đẳng & Chứng chỉ", name: "Chứng chỉ Phân tích Dữ liệu Google / Coursera / CĐ Kinh tế" },
      { type: "Chuyển ngành từ Kinh tế/Toán", name: "Tự trau dồi SQL và trực quan hóa dữ liệu để ứng tuyển vị trí thực tập phân tích" }
    ],
    adjacentCareers: ["Business Intelligence Analyst", "Product Analyst", "Operations Analyst", "Marketing Data Analyst", "Data Scientist"],
    salary: {
      range: "Thu nhập thay đổi đáng kể theo kinh nghiệm, địa phương và doanh nghiệp. Xem nguồn dữ liệu.",
      source: "Vietnam Salary Guide & Báo cáo Hướng dẫn Tiền lương",
      verified: true
    },
    laborDemand: "Ổn định và rộng khắp mọi ngành nghề (Bán lẻ, Ngân hàng, Y tế, Giáo dục)",
    aiExposure: "Cao",
    humanAdvantage: "Vừa",
    transformationDirection: "AI thay thế việc trích xuất và lọc số liệu thủ công; nhà phân tích chuyển sang vai trò cố vấn chiến lược, phát hiện bất thường và diễn giải ý nghĩa thương mại của dữ liệu.",
    evidenceConfidence: "Cao",
    dataUpdated: "2026-Q1",
    aiAdaptability: "Khá (AI viết SQL nhanh nhưng con người cần giải thích ý nghĩa kinh doanh)",
    aiReplacementRisk: "Trung bình",
    humanCoreSkill: "Thấu hiểu ngữ cảnh kinh doanh & Ra quyết định chiến lược",
    aiSynergyTip: "Dùng AI viết câu lệnh SQL và làm sạch bảng tính nhanh gấp 5 lần; con người đóng vai trò phiên dịch số liệu thành hành động.",
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
    whatYouActuallyDo: "Đến nhà máy hoặc vùng sản xuất đo lường nguồn phát thải và mức dùng năng lượng, đối chiếu với tiêu chuẩn môi trường quốc tế, soạn thảo báo cáo phát triển bền vững và đào tạo văn hóa xanh cho doanh nghiệp.",
    typicalTasks: [
      "Khảo sát thực địa và thu thập dữ liệu tiêu thụ điện, nước, rác thải tại doanh nghiệp",
      "Tính toán phát thải khí nhà kính (Phạm vi 1, 2, 3) theo tiêu chuẩn GHG Protocol",
      "Đối chiếu quy định xuất khẩu xanh của thị trường châu Âu (CBAM, CSRD) và Mỹ",
      "Lập kế hoạch giảm phát thải và chuyển đổi năng lượng tái tạo",
      "Soạn thảo Báo cáo Phát triển Bền vững (ESG Report) định kỳ hàng năm cho công ty niêm yết"
    ],
    skills: {
      foundation: ["Kiến thức khoa học môi trường & Địa lý sinh thái", "Quan tâm đến biến đổi khí hậu và trách nhiệm xã hội", "Năng lực đọc hiểu văn bản pháp lý"],
      working: ["Phương pháp kiểm kê khí nhà kính và đo đếm dấu chân carbon", "Đọc hiểu tiêu chuẩn ESG quốc tế (GRI, SASB, ISSB)", "Tiếng Anh chuyên ngành chính sách và môi trường"],
      strong: ["Kiểm toán carbon chuyên nghiệp và đàm phán chuỗi cung ứng xanh", "Tư vấn chiến lược tài chính xanh (Green Finance/Carbon Credits)", "Kỹ năng đối thoại đa phương với chính quyền và cộng đồng địa phương"]
    },
    evidenceStudentCanBuild: [
      "Báo cáo dự án kiểm toán rác thải hoặc dấu chân carbon tại gia đình/trường học trong 1 tuần",
      "Bài phân tích về quy định giảm phát thải carbon CBAM của châu Âu ảnh hưởng thế nào đến hàng hóa Việt Nam",
      "Giấy chứng nhận tham gia chiến dịch tình nguyện hoặc dự án môi trường cộng đồng"
    ],
    entryRoutes: [
      { type: "Đại học chính quy", name: "Quản lý Tài nguyên Môi trường / Kinh tế Phát triển / Khoa học Môi trường (ĐH Bách Khoa, ĐHQG, ĐH Kinh tế TP.HCM)" },
      { type: "Du học & Học bổng", name: "Chương trình Cử nhân/Thạc sĩ Kinh tế Xanh và Sustainability tại Bắc Âu, Đức, Úc" },
      { type: "Chuyển giao từ Kỹ thuật/Luật", name: "Học bổ sung các chứng chỉ kiểm định ESG quốc tế và tham gia bộ phận tuân thủ doanh nghiệp" }
    ],
    pathways: [
      { type: "Đại học chính quy", name: "Quản lý Tài nguyên Môi trường / Kinh tế Phát triển / Khoa học Môi trường (ĐH Bách Khoa, ĐHQG, ĐH Kinh tế TP.HCM)" },
      { type: "Du học & Học bổng", name: "Chương trình Cử nhân/Thạc sĩ Kinh tế Xanh và Sustainability tại Bắc Âu, Đức, Úc" },
      { type: "Chuyển giao từ Kỹ thuật/Luật", name: "Học bổ sung các chứng chỉ kiểm định ESG quốc tế và tham gia bộ phận tuân thủ doanh nghiệp" }
    ],
    adjacentCareers: ["Environmental Consultant", "Climate Risk Analyst", "Sustainability Communications Manager", "Green Finance Analyst", "Renewable Energy Project Manager"],
    salary: {
      range: "Thu nhập thay đổi đáng kể theo kinh nghiệm, địa phương và doanh nghiệp. Xem nguồn dữ liệu.",
      source: "Khảo sát Việc làm Xanh & Báo cáo Hướng dẫn Tiền lương",
      verified: true
    },
    laborDemand: "Tăng trưởng nhanh do yêu cầu kiểm toán carbon từ thị trường Mỹ và EU",
    aiExposure: "Thấp",
    humanAdvantage: "Cao",
    transformationDirection: "AI hỗ trợ tính toán mô hình dự báo phát thải; toàn bộ khâu thu thập hiện trường, đàm phán chính sách và thúc đẩy con người hành động cần tương tác trực tiếp của chuyên viên.",
    evidenceConfidence: "Vừa",
    dataUpdated: "2026-Q1",
    aiAdaptability: "Rất cao (đòi hỏi khảo sát thực địa, thấu cảm cộng đồng và đàm phán chính sách)",
    aiReplacementRisk: "Rất thấp",
    humanCoreSkill: "Khảo sát thực địa sinh thái & Đàm phán chính sách đa phương",
    aiSynergyTip: "Ứng dụng AI mô hình hóa dữ liệu phát thải khí nhà kính; trực tiếp dẫn dắt các chương trình cộng đồng và văn hóa doanh nghiệp.",
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
    whatYouActuallyDo: "Trực tiếp thăm khám người bệnh, lắng nghe mô tả triệu chứng, thực hiện các kỹ thuật thăm khám lâm sàng, giải thích bệnh án và lên phác đồ điều trị, chăm sóc hồi phục.",
    typicalTasks: [
      "Thăm khám lâm sàng, hỏi bệnh sử và đánh giá thể trạng người bệnh",
      "Chỉ định và đọc kết quả xét nghiệm, chẩn đoán hình ảnh (X-quang, MRI)",
      "Thực hiện các thủ thuật y khoa, kê đơn thuốc và theo dõi đáp ứng điều trị",
      "Tư vấn và giải thích tường tận phác đồ điều trị cho bệnh nhân và thân nhân",
      "Phối hợp hội chẩn liên chuyên khoa và trực cấp cứu xử lý tình huống khẩn cấp"
    ],
    skills: {
      foundation: ["Nền tảng Sinh học, Hóa học vững vàng", "Lòng trắc ẩn và y đức sâu sắc", "Sức khỏe thể chất dẻo dai và kiên trì"],
      working: ["Kỹ năng giao tiếp và lắng nghe người bệnh thấu cảm", "Quy trình vô khuẩn và thao tác sơ cấp cứu, kỹ thuật điều dưỡng chuẩn", "Khả năng giữ bình tĩnh dưới áp lực cao"],
      strong: ["Năng lực chẩn đoán lâm sàng biện chứng chính xác", "Thao tác phẫu thuật/thủ thuật y tế tinh tế", "Cập nhật liên tục y văn và phác đồ điều trị quốc tế"]
    },
    evidenceStudentCanBuild: [
      "Chứng nhận hoàn thành khóa tập huấn Sơ cấp cứu (CPR/First Aid) từ Hội Chữ Thập Đỏ",
      "Nhật ký hoạt động tình nguyện tại các cơ sở bảo trợ xã hội hoặc trung tâm y tế",
      "Bài nghiên cứu tổng quan ngắn về một vấn đề sức khỏe học đường (cận thị, dinh dưỡng, stress)"
    ],
    entryRoutes: [
      { type: "Đại học chính quy dài hạn", name: "Bác sĩ Đa khoa / Y học Cổ truyền / Răng Hàm Mặt (ĐH Y Hà Nội, ĐH Y Dược TP.HCM - 6 năm + 18 tháng thực hành cấp chứng chỉ hành nghề)" },
      { type: "Cử nhân / Cao đẳng Y tế", name: "Điều dưỡng / Kỹ thuật Phục hồi Chức năng (ĐH Y tế Công cộng, CĐ Y tế - cơ hội làm việc tại Nhật/Đức)" },
      { type: "Đào tạo liên tục", name: "Chương trình Bác sĩ nội trú, Chuyên khoa 1 và tu nghiệp quốc tế" }
    ],
    pathways: [
      { type: "Đại học chính quy dài hạn", name: "Bác sĩ Đa khoa / Y học Cổ truyền / Răng Hàm Mặt (ĐH Y Hà Nội, ĐH Y Dược TP.HCM - 6 năm + 18 tháng thực hành cấp chứng chỉ hành nghề)" },
      { type: "Cử nhân / Cao đẳng Y tế", name: "Điều dưỡng / Kỹ thuật Phục hồi Chức năng (ĐH Y tế Công cộng, CĐ Y tế - cơ hội làm việc tại Nhật/Đức)" },
      { type: "Đào tạo liên tục", name: "Chương trình Bác sĩ nội trú, Chuyên khoa 1 và tu nghiệp quốc tế" }
    ],
    adjacentCareers: ["Clinical Nurse", "Medical Technologist", "Public Health Specialist", "Healthcare Administrator", "Biomedical Researcher"],
    salary: {
      range: "Thu nhập thay đổi đáng kể theo kinh nghiệm, địa phương và doanh nghiệp. Xem nguồn dữ liệu.",
      source: "Báo cáo Khảo sát Y tế & Báo cáo Hướng dẫn Tiền lương",
      verified: true
    },
    laborDemand: "Nhu cầu vĩnh viễn, thiếu hụt điều dưỡng và bác sĩ chất lượng cao",
    aiExposure: "Thấp",
    humanAdvantage: "Cao",
    transformationDirection: "AI đóng vai trò trợ lý đọc nhanh phim chụp và gợi ý tương tác thuốc; bác sĩ và điều dưỡng con người nắm giữ trọn vẹn trách nhiệm quyết định, chăm sóc và trao truyền sự an tâm cho người bệnh.",
    evidenceConfidence: "Cao",
    dataUpdated: "2026-Q1",
    aiAdaptability: "Đặc biệt an toàn trước làn sóng AI (sự ấm áp, y đức và thao tác lâm sàng của con người không thể thay thế)",
    aiReplacementRisk: "Rất thấp",
    humanCoreSkill: "Y đức, lòng trắc ẩn chạm tới bệnh nhân & Thao tác lâm sàng tinh tế",
    aiSynergyTip: "Sử dụng AI hỗ trợ đọc chẩn đoán hình ảnh và tra cứu dược học; dành trọn tâm trí cho việc an ủi và điều trị bệnh nhân.",
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
