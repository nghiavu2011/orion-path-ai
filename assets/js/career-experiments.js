// Hệ thống Thử nghiệm Nghề nghiệp Thực tế (career-experiments.js)
// "Học qua trải nghiệm - Bằng chứng từ hành động thực tế có giá trị hơn bài trắc nghiệm ban đầu."
// 4 giai đoạn vòng đời (Section 17): NOT STARTED -> IN PROGRESS -> COMPLETED -> REFLECTION

const EXPERIMENT_REPOSITORY = {
  "exp_ai_chatbot": {
    id: "exp_ai_chatbot",
    careerName: "Kỹ sư Trí tuệ Nhân tạo (AI/ML Engineer)",
    relatedCareerHypothesis: "Kỹ sư Trí tuệ Nhân tạo (AI/ML Engineer)",
    title: "Xây dựng Trợ lý ảo Mini bằng Python trong 90 phút",
    duration: "90 phút",
    estimatedDuration: "90 phút",
    type: "Mini Project",
    objective: "Tự tay viết mã nguồn, gọi API trí tuệ nhân tạo và xử lý logic hội thoại đơn giản.",
    instructions: [
      "Bước 1: Mở Google Colab (trình duyệt miễn phí, không cần cài đặt phần mềm).",
      "Bước 2: Viết một đoạn mã Python 15 dòng để gửi câu hỏi đến một mô hình ngôn ngữ.",
      "Bước 3: Thử nghiệm sửa prompt để bot trả lời theo các phong cách khác nhau (nghiêm túc, hài hước).",
      "Bước 4: Thử cố tình tạo 1 lỗi cú pháp và tự tìm cách sửa (debug) trong 15 phút."
    ]
  },
  "exp_logic_gate": {
    id: "exp_logic_gate",
    careerName: "Kỹ sư Thiết kế Vi mạch & Bán dẫn (IC Design)",
    relatedCareerHypothesis: "Kỹ sư Thiết kế Vi mạch & Bán dẫn (IC Design)",
    title: "Mô phỏng cổng logic và mạch cộng số trên Tinkercad",
    duration: "60 phút",
    estimatedDuration: "60 phút",
    type: "Mô phỏng thực hành",
    objective: "Hiểu nguyên lý cấu tạo phần cứng bán dẫn và bảng chân trị logic (AND, OR, NOT).",
    instructions: [
      "Bước 1: Truy cập trang Tinkercad Circuits (miễn phí của Autodesk).",
      "Bước 2: Lắp một mạch gồm pin 9V, công tắc bấm và đèn LED.",
      "Bước 3: Sử dụng một chip logic 74HC08 (cổng AND) để tạo mạch yêu cầu bấm đồng thời 2 công tắc mới sáng đèn.",
      "Bước 4: Quan sát dòng điện và ghi chú lại sự khác nhau giữa cổng AND và cổng OR."
    ]
  },
  "exp_figma_app": {
    id: "exp_figma_app",
    careerName: "Chuyên viên Thiết kế Trải nghiệm (UI/UX Designer)",
    relatedCareerHypothesis: "Chuyên viên Thiết kế Trải nghiệm (UI/UX Designer)",
    title: "Thiết kế lại màn hình ứng dụng yêu thích trên Figma",
    duration: "60 phút",
    estimatedDuration: "60 phút",
    type: "Portfolio Challenge",
    objective: "Làm quen với tư duy bố cục, phân cấp thị giác (visual hierarchy) và sự thấu cảm người dùng.",
    instructions: [
      "Bước 1: Chụp ảnh màn hình 1 ứng dụng em hay dùng (như Spotify, TikTok, Shopee).",
      "Bước 2: Mở Figma.com trên trình duyệt, kéo ảnh chụp vào.",
      "Bước 3: Vẽ lại các khối nút bấm, ô chữ và icon với kích thước phù hợp ngón tay cái.",
      "Bước 4: Thay đổi màu sắc và sắp xếp lại 1 tính năng mà em thấy chưa thuận tiện."
    ]
  },
  "exp_data_sheet": {
    id: "exp_data_sheet",
    careerName: "Chuyên viên Phân tích Dữ liệu (Data Analyst)",
    relatedCareerHypothesis: "Chuyên viên Phân tích Dữ liệu (Data Analyst)",
    title: "Phân tích xu hướng âm nhạc Spotify bằng Google Sheets",
    duration: "60 phút",
    estimatedDuration: "60 phút",
    type: "Mini Project",
    objective: "Làm quen với thao tác lọc dữ liệu, tính giá trị trung bình và vẽ biểu đồ kết luận xu hướng.",
    instructions: [
      "Bước 1: Mở một bảng tính Google Sheets mẫu về Top 50 bài hát năm 2024.",
      "Bước 2: Dùng hàm =AVERAGE() và =SORT() để tìm thời lượng bài hát phổ biến nhất.",
      "Bước 3: Vẽ biểu đồ cột so sánh độ phổ biến giữa các thể loại nhạc (Pop, Hip-hop, Indie).",
      "Bước 4: Viết 3 gạch đầu dòng kết luận để tư vấn cho một ca sĩ trẻ."
    ]
  },
  "exp_carbon_audit": {
    id: "exp_carbon_audit",
    careerName: "Chuyên viên Kinh tế Xanh & Bền vững (ESG Specialist)",
    relatedCareerHypothesis: "Chuyên viên Kinh tế Xanh & Bền vững (ESG Specialist)",
    title: "Kiểm toán 'Dấu chân Carbon' của gia đình em trong 1 tuần",
    duration: "75 phút",
    estimatedDuration: "75 phút",
    type: "Dự án thực tế",
    objective: "Đo lường mức độ phát thải gián tiếp và lập kế hoạch giảm tiêu thụ năng lượng.",
    instructions: [
      "Bước 1: Xem hóa đơn tiền điện tháng gần nhất của gia đình.",
      "Bước 2: Sử dụng công cụ tính phát thải trực tuyến (Carbon Footprint Calculator).",
      "Bước 3: Liệt kê 3 thiết bị tiêu tốn điện nhiều nhất trong nhà.",
      "Bước 4: Thảo luận cùng cha mẹ về 1 thay đổi nhỏ để tiết kiệm 10% điện năng tháng tới."
    ]
  },
  "exp_first_aid": {
    id: "exp_first_aid",
    careerName: "Bác sĩ / Chuyên viên Y tế Chăm sóc Sức khỏe",
    relatedCareerHypothesis: "Bác sĩ / Chuyên viên Y tế Chăm sóc Sức khỏe",
    title: "Học và thực hành Kỹ năng Sơ cấp cứu CPR cơ bản",
    duration: "90 phút",
    estimatedDuration: "90 phút",
    type: "Kỹ năng thực hành",
    objective: "Kiểm tra phản ứng tâm lý khi đối diện với tình huống cấp cứu và chăm sóc sức khỏe.",
    instructions: [
      "Bước 1: Xem video hướng dẫn quy chuẩn sơ cứu ép tim ngoài lồng ngực (CPR) của Hội Chữ Thập Đỏ.",
      "Bước 2: Thực hành nhịp ép tim 100-120 lần/phút trên một chiếc gối cứng trong 2 phút.",
      "Bước 3: Đo mạch đập cổ tay của chính em hoặc người thân.",
      "Bước 4: Tự quan sát cảm xúc: Em cảm thấy căng thẳng lo âu hay bình tĩnh, tập trung?"
    ]
  },
  "exp_interview_pro": {
    id: "exp_interview_pro",
    careerName: "Trải nghiệm chung cho mọi ngành nghề",
    relatedCareerHypothesis: "Trải nghiệm chung cho mọi ngành nghề",
    title: "Phỏng vấn 1 người đi trước trong ngành (Informational Interview)",
    duration: "60 phút",
    estimatedDuration: "60 phút",
    type: "Phỏng vấn thực địa",
    objective: "Hiểu thực tế một ngày làm việc điển hình và những khó khăn không có trong sách vở.",
    instructions: [
      "Bước 1: Chọn 1 người anh/chị/người quen đang làm công việc em tò mò.",
      "Bước 2: Hẹn gặp hoặc gọi điện 20-30 phút với 5 câu hỏi chuẩn bị trước.",
      "Bước 3: Hỏi về: Một ngày điển hình, điều làm họ nản lòng nhất, và kỹ năng quan trọng nhất.",
      "Bước 4: Ghi lại 3 điều bất ngờ nhất mà em vừa học được."
    ]
  }
};

class CareerExperimentManager {
  constructor() {
    this.storageKey = 'orion_career_experiments_state';
    this.state = this.loadState();
  }

  loadState() {
    try {
      if (typeof localStorage === 'undefined') return {};
      const raw = localStorage.getItem(this.storageKey);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  saveState() {
    try {
      if (typeof localStorage === 'undefined') return;
      localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    } catch (e) {
      console.warn("Could not persist experiments state", e);
    }
  }

  getExperiment(id) {
    return EXPERIMENT_REPOSITORY[id] || null;
  }

  /**
   * Trả về trạng thái chuẩn hóa: 'NOT STARTED' | 'IN PROGRESS' | 'COMPLETED' | 'REFLECTION'
   * @param {string} id 
   */
  getExperimentStatus(id) {
    if (!this.state[id]) return 'NOT STARTED';
    const s = this.state[id].status;
    if (s === 'in_progress' || s === 'IN PROGRESS') return 'IN PROGRESS';
    if (s === 'reflection' || s === 'REFLECTION') return 'REFLECTION';
    if (s === 'completed' || s === 'COMPLETED') return 'COMPLETED';
    return 'NOT STARTED';
  }

  /**
   * Chuyển trạng thái sang IN PROGRESS (Section 17)
   * @param {string} id 
   */
  startExperiment(id) {
    if (!this.state[id]) {
      this.state[id] = {
        id,
        status: 'IN PROGRESS',
        startedAt: new Date().toISOString(),
        reflection: null,
        completedAt: null,
        completionDate: null
      };
    } else {
      this.state[id].status = 'IN PROGRESS';
      if (!this.state[id].startedAt) {
        this.state[id].startedAt = new Date().toISOString();
      }
    }
    this.saveState();
  }

  /**
   * Đặt trạng thái sang REFLECTION (đang điền phản tư)
   * @param {string} id 
   */
  openReflectionStage(id) {
    if (!this.state[id]) {
      this.startExperiment(id);
    }
    this.state[id].status = 'REFLECTION';
    this.saveState();
  }

  /**
   * Lưu 6 câu hỏi phản tư và đánh dấu COMPLETED (Section 17)
   * @param {string} id 
   * @param {object} reflectionAnswers 
   */
  saveReflection(id, reflectionAnswers) {
    const now = new Date().toISOString();
    if (!this.state[id]) {
      this.state[id] = { id, startedAt: now };
    }
    this.state[id].status = 'COMPLETED';
    this.state[id].completedAt = now;
    this.state[id].completionDate = now.split('T')[0];
    this.state[id].reflection = reflectionAnswers;
    this.saveState();
  }

  /**
   * Lấy chi tiết thử nghiệm đầy đủ bao gồm định nghĩa + trạng thái
   * @param {string} id 
   */
  getExperimentFull(id) {
    const base = this.getExperiment(id);
    if (!base) return null;
    const userState = this.state[id] || { status: 'NOT STARTED', reflection: null, completedAt: null };
    return {
      ...base,
      ...userState,
      status: this.getExperimentStatus(id)
    };
  }

  getCompletedList() {
    const list = [];
    Object.keys(this.state).forEach(id => {
      if (this.getExperimentStatus(id) === 'COMPLETED') {
        const exp = this.getExperiment(id);
        if (exp) {
          list.push({ ...exp, ...this.state[id] });
        }
      }
    });
    return list;
  }
}

if (typeof window !== 'undefined') {
  window.EXPERIMENT_REPOSITORY = EXPERIMENT_REPOSITORY;
  window.CareerExperimentManager = CareerExperimentManager;
  window.careerExperimentManager = new CareerExperimentManager();
}
if (typeof global !== 'undefined') {
  global.EXPERIMENT_REPOSITORY = EXPERIMENT_REPOSITORY;
  global.CareerExperimentManager = CareerExperimentManager;
  global.careerExperimentManager = new CareerExperimentManager();
}
