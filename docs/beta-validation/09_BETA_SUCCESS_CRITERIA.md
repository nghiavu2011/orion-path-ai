# Tiêu Chuẩn Đánh Giá Thành Công Đợt Thử Nghiệm Beta (Beta Success Criteria) — Orion Path AI

> [!NOTE]
> **Tuyên bố về bản chất chỉ số:** Các tiêu chuẩn dưới đây là **ngưỡng quyết định vận hành sản phẩm (Working Product Decision Thresholds)** trong phạm vi đợt thử nghiệm giới hạn (10–20 học sinh + phụ huynh), **TUYỆT ĐỐI KHÔNG** được tuyên bố hay quảng bá như những khẳng định giá trị khoa học / tâm trắc học có giá trị thống kê diện rộng (Scientific Validation Claims).

---

## 1. Bảng Ngưỡng Thành Công Định Lượng & Định Tính

| Lĩnh vực kiểm chứng | Chỉ số đo lường (Metric) | Ngưỡng mục tiêu (Pilot Target) | Phương pháp đo lường | Ý nghĩa quyết định |
|:---|:---|:---:|:---|:---|
| **1. Nhận thức Trang chủ (Landing Comprehension)** | Tỷ lệ học sinh tự hiểu đúng mục đích sản phẩm sau 20–30 giây quan sát đầu tiên mà không cần giải thích. | **≥ 80%** (≥ 8/10 hoặc ≥ 16/20 học sinh) | Ghi âm / ghi chép nguyên văn câu trả lời cho câu hỏi: *"Orion giúp em làm gì?"*. | Đảm bảo định vị sản phẩm là "khám phá & thử nghiệm thực tế" chứ không bị hiểu nhầm là bói toán / luyện thi. |
| **2. Tự hoàn thành hành trình (Journey Completion)** | Tỷ lệ học sinh tự đi hết luồng từ Hồ sơ -> RIASEC -> Bảng điều khiển -> Thử nghiệm mà không cần người điều phối can thiệp. | **≥ 80%** | Nhật ký quan sát `06_OBSERVATION_LOG_TEMPLATE.md` (mục Assistance Required = False). | Đảm bảo tính khả dụng (Usability) của giao diện người dùng và luồng thông tin không có rào cản chặn đứng. |
| **3. Khả năng phát hiện hành động (Next Action Discoverability)** | Tỷ lệ học sinh tự nhận ra khối "BƯỚC TIẾP THEO CỦA EM" và bấm nút CTA trong vòng 5–10 giây khi vào Bảng điều khiển. | **≥ 80%** | Đo thời gian bằng đồng hồ bấm giờ từ lúc bảng điều khiển hiển thị đến khi học sinh tương tác với khối. | Đảm bảo học sinh không bị ngợp thông tin giữa quá nhiều biểu đồ và biết chính xác việc mình nên làm tiếp theo. |
| **4. Hiểu đúng Giả thiết nghề (Career Hypothesis Comprehension)** | Tỷ lệ học sinh nhận thức đúng: các gợi ý nghề là "giả thiết cần kiểm chứng", không phải "AI phán nghề bắt buộc phải theo". | **≥ 80%** | Phỏng vấn sau khi xem giả thiết và khảo sát độ tự chủ (Agency ≥ 4/5 trong Phiếu 04). | Giữ vững nguyên tắc đạo đức cốt lõi: bảo vệ quyền tự quyết (Student Agency) của học sinh. |
| **5. Hiểu bản chất Thử nghiệm nghề (Career Experiment Comprehension)** | Tỷ lệ học sinh giải thích được bài thử nghiệm nghề giúp kiểm chứng khía cạnh gì trong thực tế (cảm xúc, độ kiên nhẫn, độ khó). | **≥ 70%** | Câu hỏi: *"Em nghĩ bài mini-project này giúp kiểm chứng điều gì?"*. | Xác nhận học sinh hiểu triết lý "Học qua trải nghiệm - Bằng chứng từ hành động thực tế có giá trị hơn bài trắc nghiệm". |
| **6. Quyền tự quyết của học sinh (Student Agency)** | Tỷ lệ học sinh đồng ý hoặc rất đồng ý với khẳng định: *"Tôi cảm thấy mình là người quyết định, không phải AI quyết định thay tôi"*. | **≥ 85%** | Câu hỏi số 4 trong Phiếu khảo sát học sinh `04_STUDENT_FEEDBACK_FORM.md`. | Tránh biến Orion thành một "cỗ máy áp đặt số phận" gây ức chế tâm lý lứa tuổi dậy thì. |
| **7. Giá trị kết nối gia đình (Family Dialogue Value)** | Tỷ lệ phụ huynh tham gia có thể nêu được ít nhất một chủ đề hoặc câu hỏi mới muốn trao đổi cùng con sau khi xem kết quả. | **≥ 75%** (≥ 6/8 phụ huynh tham gia) | Câu hỏi mở mấu chốt trong Phiếu khảo sát phụ huynh `05_PARENT_FEEDBACK_FORM.md`. | Đo lường hiệu quả thực tế của Bản Đồ Góc Nhìn Gia Đình trong việc khơi thông giao tiếp thế hệ. |

---

## 2. Ngưỡng Quyết Định Sau Đợt Thử Nghiệm (Post-Pilot Decision Gates)

Dựa trên kết quả thực tế thu thập từ 10–20 học sinh và phụ huynh, hội đồng sản phẩm sẽ ra 1 trong 3 quyết định:

### 🟢 CỔNG XANH (GREEN GATE) — Đạt chuẩn mở rộng (Scale Beta)
- **Điều kiện:**
  - 0 lỗi P0, tối đa 1 lỗi P1 (đã có phương án khắc phục rõ ràng).
  - Đạt ít nhất 6 trên 7 chỉ số mục tiêu ở Bảng 1.
- **Hành động tiếp theo:** Giữ nguyên kiến trúc cốt lõi, triển khai mở rộng cho quy mô 50–100 học sinh tại các trường THPT đối tác.

---

### 🟡 CỔNG VÀNG (AMBER GATE) — Tinh chỉnh có trọng tâm (Targeted Refinement)
- **Điều kiện:**
  - Có 1–2 lỗi P1 hoặc có 2–3 chỉ số không đạt ngưỡng mục tiêu (nằm trong khoảng 60% – 79%).
- **Hành động tiếp theo:**
  - KHÔNG viết lại toàn bộ sản phẩm.
  - Áp dụng Cổng thay đổi sản phẩm (Product Change Gate - File 10) để chỉ tinh chỉnh chính xác các điểm ma sát có bằng chứng lặp lại (≥ 3 người dùng gặp phải).
  - Chạy lại kiểm thử với 5 học sinh mới để xác nhận điểm ma sát đã được giải tỏa.

---

### 🔴 CỔNG ĐỎ (RED GATE) — Dừng xem xét lại mô hình nhận thức (Cognitive Model Pivot)
- **Điều kiện:**
  - Xuất hiện lỗi P0 không thể khắc phục nhanh.
  - Hoặc dưới 50% học sinh hiểu được mục đích sản phẩm / hiểu sai có hệ thống rằng Orion là "AI bói nghề phán quyết số phận".
  - Hoặc đa số phụ huynh cảm thấy bị áp đặt và gia tăng căng thẳng với con.
- **Hành động tiếp theo:** Dừng triển khai công khai, họp chuyên gia giáo dục và tâm lý học đường để định hình lại ngôn ngữ truyền tải và cơ chế tương tác trước khi tiếp tục.
