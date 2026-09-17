# Hệ Thống Phân Loại Vấn Đề (Issue Taxonomy) & Quy Tắc Xử Lý — Orion Path AI

## 1. Nguyên Tắc Cốt Lõi (Core Principle)
Không sửa sản phẩm theo cảm tính hoặc chỉ vì một người dùng duy nhất bày tỏ sở thích cá nhân. Mọi quan sát từ đợt thử nghiệm người dùng thực tế phải được phân loại chuẩn hóa theo mức độ nghiêm trọng (Severity) và tần suất lặp lại (Frequency) trước khi đưa vào hàng đợi xử lý.

---

## 2. Thang Phân Loại Mức Độ Nghiêm Trọng (Severity Levels)

### 🔴 P0 — Critical (Lỗi nghiêm trọng cấp bách)
- **Định nghĩa:** Lỗi khiến người dùng bị chặn đứng hoàn toàn không thể hoàn thành hành trình cốt lõi, gây mất dữ liệu, rò rỉ quyền riêng tư, hoặc hành vi phá hủy không thể đảo ngược.
- **Ví dụ điển hình:**
  - Không thể bấm chuyển từ Bước 1 sang Bước 2 hoặc đơ cứng toàn bộ trang.
  - Mất dữ liệu hồ sơ hoặc thử nghiệm đã lưu sau khi làm mới trang.
  - Nút "Xóa dữ liệu của tôi" xóa nhầm dữ liệu hệ thống hoặc lộ thông tin cá nhân.
  - Vỡ hoàn toàn giao diện khiến các nút CTA bị che khuất không thể ấn được trên màn hình mobile.
- **Hành động:** **DỪNG KIỂM THỬ ĐỂ SỬA NGAY LẬP TỨC** sau khi tái hiện được lỗi. Chạy lại kiểm thử hồi quy trước khi tiếp tục phiên tiếp theo.

---

### 🟠 P1 — Major Blocker (Rào cản khả dụng lớn)
- **Định nghĩa:** Người dùng vẫn tương tác được nhưng gặp trở ngại nhận thức hoặc chức năng lớn, làm sai lệch nghiêm trọng mục đích sản phẩm hoặc khiến tính năng cốt lõi không phát huy được giá trị.
- **Ví dụ điển hình:**
  - Nhiều học sinh liên tiếp không thể tìm thấy hoặc không hiểu khối "BƯỚC TIẾP THEO CỦA EM" trên bảng điều khiển.
  - Học sinh có xu hướng hiểu nhầm có hệ thống rằng Orion là "AI phán bảo em bắt buộc phải theo nghề X".
  - Không thể mở hoặc hoàn thành bài Thử nghiệm Nghề nghiệp (Career Experiment).
  - Bản Đồ Góc Nhìn Gia Đình gây xung đột hoặc hiểu lầm nghiêm trọng giữa cha mẹ và con cái (ví dụ: cha mẹ dùng thông tin để ép buộc con).
- **Hành động:** Ghi nhận và phân tích nguyên nhân gốc rễ. **BẮT BUỘC SỬA TRƯỚC KHI MỞ RỘNG BETA**, nhưng không sửa vội vã ngay giữa đợt thử nếu chưa có đủ dữ liệu lặp lại.

---

### 🟡 P2 — Usability Friction (Ma sát khả dụng vừa phải)
- **Định nghĩa:** Các điểm gây ngập ngừng, khó hiểu cục bộ, câu chữ dài dòng hoặc nhầm lẫn nhỏ nhưng người dùng vẫn tự vượt qua được mà không cần can thiệp.
- **Ví dụ điển hình:**
  - Thuật ngữ môn học hoặc giá trị cá nhân khiến học sinh mất hơn 15 giây để suy nghĩ.
  - Chữ quá nhỏ hoặc độ tương phản màu hơi mờ ở một số ghi chú chân trang.
  - Người dùng bấm nhầm tab phụ nhưng tự bấm lại đúng ngay sau đó.
- **Hành động:** **KHÔNG SỬA NGAY sau 1 báo cáo đơn lẻ.** Gom nhóm theo dõi xu hướng (Pattern). Nếu có từ 3 người dùng trở lên gặp cùng vấn đề, đưa vào kế hoạch tinh chỉnh tinh gọn (Lean Refinement).

---

### ⚪ P3 — Subjective Preference (Sở thích cá nhân / Góp ý mở rộng)
- **Định nghĩa:** Các ý kiến mang tính thẩm mỹ chủ quan, mong muốn mở rộng tính năng ngoài phạm vi cốt lõi (scope creep), hoặc câu nói "giá như có thêm...".
- **Ví dụ điển hình:**
  - *"Em thích màu nền tím hơn màu xanh."*
  - *"Em muốn web có thêm nhạc nền thiên hà phát tự động."*
  - *"Em muốn có bảng xếp hạng bạn bè cùng làm bài."*
- **Hành động:** **KHÔNG COI ĐÂY LÀ LỖI (NOT A DEFECT).** Ghi nhận vào kho ý tưởng tương lai, bảo vệ nguyên tắc thiết kế tối giản (Ponytail Methodology / YAGNI).

---

## 3. Quy Tắc Quyết Định Dựa Trên Bằng Chứng (Evidence Rule)

| Số lượng báo cáo độc lập | Phân loại trạng thái | Quyết định hành động |
|:---|:---|:---|
| **1 báo cáo duy nhất** | Ghi nhận quan sát (Single Observation) | Ghi vào nhật ký. Chưa thay đổi bất kỳ dòng mã nào. |
| **2 báo cáo độc lập tương đồng** | Xu hướng tiềm năng (Potential Pattern) | Gắn cờ (Flag) theo dõi đặc biệt trong các phiên thử tiếp theo. |
| **3 báo cáo trở lên có cùng điểm nghẽn** | Tín hiệu khả dụng rõ ràng (Meaningful Usability Signal) | Xác nhận điểm ma sát thật. Đưa vào Báo cáo tổng hợp Pilot để xem xét sửa đổi có hệ thống. |
| **Bất kỳ lỗi P0 nào (kỹ thuật / bảo mật)** | Lỗi khẩn cấp (Emergency Defect) | Tái hiện -> Sửa ngay -> Chạy test kiểm thử -> Triển khai lại. |

---

## 4. Bảng Tra Cứu Danh Mục Vấn Đề (Issue Categories)
Khi nhập liệu vào bảng tổng hợp `08_FEEDBACK_MASTER.csv`, sử dụng các danh mục chuẩn hóa sau:
1. `LANDING_COMPREHENSION`: Nhận thức trang chủ và thông điệp giá trị.
2. `PROFILE_CREATION`: Điền thông tin hồ sơ, điểm số, giá trị cá nhân.
3. `RIASEC_INTERPRETATION`: Hiểu và diễn giải kết quả sở thích RIASEC.
4. `HYPOTHESIS_CREDIBILITY`: Mức độ thuyết phục và độ tin cậy của gợi ý nghề.
5. `NEXT_ACTION_DISCOVERY`: Khả năng phát hiện và hiểu khối "Bước tiếp theo của em".
6. `EXPERIMENT_ENGAGEMENT`: Mức độ tương tác và hiểu bản chất bài thử nghiệm nghề.
7. `REFLECTION_DEPTH`: Độ sâu và cảm xúc khi trả lời câu hỏi phản tư.
8. `FAMILY_FACILITATION`: Khả năng hỗ trợ đối thoại cha mẹ và con cái.
9. `TECHNICAL_UI_BUG`: Lỗi kỹ thuật hiển thị, tương thích thiết bị, phím bấm.
10. `PRIVACY_CONCERN`: Băn khoăn về bảo mật và an toàn dữ liệu.
