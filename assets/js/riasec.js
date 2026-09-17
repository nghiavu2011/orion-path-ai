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
  // Realistic (R) - Kỹ thuật & Thực hành (5 câu)
  { id: 1, text: "Thích tháo lắp, sửa chữa các thiết bị điện tử hoặc đồ dùng cơ khí trong nhà", category: "R" },
  { id: 2, text: "Thích tìm hiểu nguyên lý hoạt động của máy tính, robot hoặc động cơ", category: "R" },
  { id: 3, text: "Thích tham gia các hoạt động lắp ráp mô hình, mộc, điện hoặc cơ khí thực hành", category: "R" },
  { id: 4, text: "Thích làm việc với các công cụ đo đạc, thiết bị kỹ thuật ngoài thực địa hơn là ngồi bàn giấy", category: "R" },
  { id: 5, text: "Thích vận động thể chất, làm việc ngoài trời hoặc điều khiển máy móc kỹ thuật", category: "R" },

  // Investigative (I) - Nghiên cứu & Khám phá (5 câu)
  { id: 6, text: "Thích giải các bài toán khó hoặc câu đố đòi hỏi suy luận logic và phân tích", category: "I" },
  { id: 7, text: "Tò mò đọc các tài liệu khoa học, khám phá vũ trụ, công nghệ mới hoặc sinh học", category: "I" },
  { id: 8, text: "Thích thực hiện các thí nghiệm khoa học và quan sát để tìm ra quy luật tự nhiên", category: "I" },
  { id: 9, text: "Thích tự học lập trình, phân tích dữ liệu trên máy tính để kiểm chứng giả thuyết", category: "I" },
  { id: 10, text: "Thích đặt câu hỏi 'Tại sao?' và đào sâu nghiên cứu bản chất vấn đề đến cùng", category: "I" },

  // Artistic (A) - Nghệ thuật & Sáng tạo (5 câu)
  { id: 11, text: "Thích vẽ tranh, thiết kế đồ họa, chụp ảnh hoặc quay dựng video sáng tạo", category: "A" },
  { id: 12, text: "Thích viết văn, sáng tác thơ/truyện, viết kịch bản hoặc chơi nhạc cụ", category: "A" },
  { id: 13, text: "Thích thiết kế giao diện ứng dụng, trang trí không gian hoặc phối đồ phong cách riêng", category: "A" },
  { id: 14, text: "Có xu hướng tìm giải pháp độc đáo, tự do biểu đạt ý tưởng thay vì đi theo lối mòn", category: "A" },
  { id: 15, text: "Thích thưởng thức và cảm thụ các tác phẩm điện ảnh, mỹ thuật, âm nhạc hoặc văn học", category: "A" },

  // Social (S) - Xã hội & Giáo dục (5 câu)
  { id: 16, text: "Thích lắng nghe, động viên và chia sẻ với bạn bè khi họ gặp khó khăn trong học tập", category: "S" },
  { id: 17, text: "Hứng thú với việc giảng giải, kèm cặp bài vở cho người khác hiểu bài", category: "S" },
  { id: 18, text: "Thích tham gia các câu lạc bộ tình nguyện, thiện nguyện và hoạt động vì cộng đồng", category: "S" },
  { id: 19, text: "Thích làm việc trong môi trường tập thể, nơi mọi người thấu cảm và chăm sóc lẫn nhau", category: "S" },
  { id: 20, text: "Quan tâm đến các vấn đề xã hội, sức khỏe con người và mong muốn giúp ích cho cộng đồng", category: "S" },

  // Enterprising (E) - Kinh doanh & Quản lý (5 câu)
  { id: 21, text: "Thích đứng ra điều phối nhóm, phân chia công việc hoặc khởi xướng một kế hoạch mới", category: "E" },
  { id: 22, text: "Hứng thú với việc học cách kinh doanh, bán hàng, đàm phán hoặc quản lý ngân sách", category: "E" },
  { id: 23, text: "Tự tin thuyết phục người khác đồng thuận với quan điểm hay ý tưởng của mình", category: "E" },
  { id: 24, text: "Thích tham gia các cuộc thi tranh biện, thuyết trình trước đám đông hoặc tổ chức sự kiện", category: "E" },
  { id: 25, text: "Thích đặt ra các mục tiêu tham vọng và dẫn dắt đội ngũ cùng vượt qua thử thách", category: "E" },

  // Conventional (C) - Quy củ & Tổ chức (5 câu)
  { id: 26, text: "Thích sắp xếp góc học tập, tài liệu và dữ liệu một cách khoa học, ngăn nắp", category: "C" },
  { id: 27, text: "Cẩn thận kiểm tra lại bài làm để đảm bảo không sót lỗi chính tả, số liệu hay format", category: "C" },
  { id: 28, text: "Thích làm việc với các bảng tính Excel/Sheets, theo dõi tiến độ công việc theo danh sách", category: "C" },
  { id: 29, text: "Cảm thấy thoải mái khi làm theo quy trình, kế hoạch đã định sẵn thay vì thay đổi đột ngột", category: "C" },
  { id: 30, text: "Có tính kỷ luật cao, luôn hoàn thành đúng hạn các nhiệm vụ được giao theo tiêu chuẩn rõ ràng", category: "C" }
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
