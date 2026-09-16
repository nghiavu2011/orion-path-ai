// Module Sàng Lọc Sở Thích Nghề Nghiệp RIASEC (riasec.js)
// Định danh chuẩn xác: "Bài sàng lọc sở thích nghề nghiệp dựa trên mô hình RIASEC (Holland)"
// Tuyệt đối không gọi là "tính cách bẩm sinh", "định mệnh" hay "chẩn đoán tâm lý".
// Thuật toán tính điểm hoàn toàn bằng JavaScript xác định (deterministic), không để AI bí mật chỉnh sửa.

const RIASEC_CATEGORIES = {
  R: {
    code: 'R',
    name: 'Kỹ thuật & Thực hành (Realistic)',
    shortName: 'Kỹ thuật & Thực hành',
    desc: 'Yêu thích làm việc trực tiếp với máy móc, công cụ, thiết bị điện tử, phần cứng hoặc hoạt động thể chất ngoài trời.'
  },
  I: {
    code: 'I',
    name: 'Nghiên cứu & Khám phá (Investigative)',
    shortName: 'Nghiên cứu & Khám phá',
    desc: 'Thích quan sát, tìm hiểu quy luật, giải đố logic, làm việc với dữ liệu hoặc thí nghiệm khoa học.'
  },
  A: {
    code: 'A',
    name: 'Nghệ thuật & Sáng tạo (Artistic)',
    shortName: 'Nghệ thuật & Sáng tạo',
    desc: 'Có cảm hứng với thẩm mỹ, thiết kế thị giác, âm nhạc, viết lách, kịch nghệ và biểu đạt bản thân phi khuôn mẫu.'
  },
  S: {
    code: 'S',
    name: 'Xã hội & Giáo dục (Social)',
    shortName: 'Xã hội & Giáo dục',
    desc: 'Thích giúp đỡ, giảng giải, chăm sóc sức khỏe, tham gia hoạt động thiện nguyện và kết nối cộng đồng.'
  },
  E: {
    code: 'E',
    name: 'Kinh doanh & Quản lý (Enterprising)',
    shortName: 'Kinh doanh & Quản lý',
    desc: 'Thích dẫn dắt đội ngũ, thuyết phục người khác, lập kế hoạch kinh doanh và hướng đến các mục tiêu thách thức.'
  },
  C: {
    code: 'C',
    name: 'Quy củ & Tổ chức (Conventional)',
    shortName: 'Quy củ & Tổ chức',
    desc: 'Thích sự rõ ràng, ngăn nắp, làm việc chi tiết với số liệu, biểu mẫu, quy trình và hệ thống có thứ tự.'
  }
};

const RIASEC_QUESTIONS = [
  { id: 1, text: "Thích tháo lắp, sửa chữa các thiết bị điện tử hoặc đồ dùng trong nhà", category: "R" },
  { id: 2, text: "Thích tìm hiểu nguyên lý hoạt động của máy tính, robot hoặc động cơ", category: "R" },
  { id: 3, text: "Thích giải các bài toán khó hoặc câu đố đòi hỏi suy luận logic", category: "I" },
  { id: 4, text: "Tò mò đọc các tài liệu khoa học, khám phá vũ trụ hoặc công nghệ mới", category: "I" },
  { id: 5, text: "Thích vẽ tranh, thiết kế đồ họa, chụp ảnh hoặc quay dựng video", category: "A" },
  { id: 6, text: "Thích viết văn, sáng tác thơ/truyện hoặc chơi nhạc cụ", category: "A" },
  { id: 7, text: "Thích lắng nghe, động viên bạn bè khi họ gặp khó khăn trong học tập", category: "S" },
  { id: 8, text: "Hứng thú với việc tham gia các hoạt động tình nguyện hoặc hướng dẫn người khác", category: "S" },
  { id: 9, text: "Thích đứng ra điều phối nhóm hoặc khởi xướng một kế hoạch mới", category: "E" },
  { id: 10, text: "Hứng thú với việc học cách kinh doanh, bán hàng hoặc đàm phán", category: "E" },
  { id: 11, text: "Thích sắp xếp góc học tập, tài liệu học tập một cách khoa học, ngăn nắp", category: "C" },
  { id: 12, text: "Cẩn thận kiểm tra lại bài làm để đảm bảo không sót lỗi chính tả hay số liệu", category: "C" }
];

function calculateRiasecFromForm(formElement) {
  const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  RIASEC_QUESTIONS.forEach(q => {
    const checked = formElement.querySelector(`input[name="riasec_q_${q.id}"]:checked`);
    if (checked) {
      const val = parseInt(checked.value, 10) || 0;
      scores[q.category] += val;
    }
  });
  return scores;
}

if (typeof window !== 'undefined') {
  window.RIASEC_CATEGORIES = RIASEC_CATEGORIES;
  window.RIASEC_QUESTIONS = RIASEC_QUESTIONS;
  window.calculateRiasecFromForm = calculateRiasecFromForm;
}
if (typeof global !== 'undefined') {
  global.RIASEC_CATEGORIES = RIASEC_CATEGORIES;
  global.RIASEC_QUESTIONS = RIASEC_QUESTIONS;
  global.calculateRiasecFromForm = calculateRiasecFromForm;
}
