# ORION PATH AI — ĐỀ NGHỊ NÂNG CẤP TÍNH NĂNG (BENCHMARK TỪ HỆ THỐNG PHHS)

> **Mục tiêu**: Nâng cấp trải nghiệm người dùng, giảm tỷ lệ bỏ cuộc (drop-off) và hiện thực hóa tính năng "Cầu nối gia đình" trong `app.html` và `index.html` của Orion Path AI dựa trên phân tích thực tế từ hệ thống MindX PHHS Gate.
> **Phương châm Ponytail**: Tối giản, không phụ thuộc thư viện ngoài, ưu tiên Native Web APIs (HTML5, LocalStorage, Vanilla JS), viết ít code nhất nhưng mang lại giá trị chuyển đổi cao nhất.

---

## 1. BỔ SUNG CHẾ ĐỘ "ĐÁNH GIÁ NHANH 3 PHÚT" (FAST-TRACK ONBOARDING)

### 1.1. Vấn đề thực tế
* Hiện tại ở `app.html`, học sinh phải qua Bước 1 (nhập điểm tất cả các môn học) rồi tới 30 câu RIASEC. Rào cản quá cao khiến nhiều phụ huynh và học sinh truy cập lần đầu bỏ dở giữa chừng.

### 1.2. Yêu cầu triển khai
* Tại **Màn hình 1 (Screen 1)** hoặc ngay đầu luồng, bổ sung nút chuyển đổi 2 chế độ:
  1. **Chế độ Nhanh (3 Phút - Fast-Track)**: Dành cho người muốn xem nhanh thiên hướng bản thân và bản đồ sao sơ bộ.
  2. **Chế độ Chuyên Sâu (Deep Dive - Mặc định)**: Nhập điểm học tập chi tiết, tổ hợp môn xét tuyển đại học.
* **Luồng Fast-Track**:
  * Chỉ cần nhập: Tên + Khối lớp (Lớp 9, 10, 11, 12).
  * Làm **5 câu hỏi tình huống phản xạ nhanh** đo lường 4 trục:
    * *Trục 1: Phân tích & Logic* (Khi gặp bài toán hóc búa).
    * *Trục 2: Sáng tạo & Hành động* (Khi có ý tưởng mới).
    * *Trục 3: Công nghệ & Tự động hóa* (Cách dùng AI/Internet để học).
    * *Trục 4: Giao tiếp & Thích ứng* (Làm việc nhóm hoặc thay đổi kế hoạch).
  * Chuyển thẳng tới Màn hình Kết quả (Screen 5) với bản đồ sao sơ bộ.
  * Hiển thị banner gợi ý: *"Bạn muốn kết quả chính xác 100% với điểm thi và trường ĐH thực tế? → Bổ sung điểm số học tập ngay"*.

---

## 2. HIỆN THỰC HÓA "CẦU NỐI GIA ĐÌNH" (PARENT-CHILD ALIGNMENT)

### 2.1. Vấn đề thực tế
* Trên Landing Page (`index.html`), Orion có mục *"Cầu nối gia đình"* rất ấn tượng, nhưng trong ứng dụng (`app.html`), mới chỉ có học sinh tự trả lời; phụ huynh hoàn toàn đứng ngoài cuộc.

### 2.2. Yêu cầu triển khai
* Tại **Bảng điều khiển (Screen 5)**, trong phần Cầu Nối Gia Đình:
  * Thêm nút hành động nổi bật: **"Mời Ba/Mẹ đánh giá nhanh 3 câu để mở khóa Thước Đo Đồng Điệu"**.
  * Cung cấp 2 lựa chọn:
    1. *Làm trực tiếp*: Mở một Mini Modal ngay trên máy để ba/mẹ trả lời trong 60 giây.
    2. *Chia sẻ qua Zalo/SMS*: Sinh link nhanh kèm mã hồ sơ (ví dụ: `app.html?parent_mode=true&ref=ORION-1024`).
* **Bộ 3 câu hỏi nhanh dành cho Phụ huynh**:
  1. **Quan sát sở thích**: *"Ba mẹ thấy con say mê và chủ động nhất khi làm việc gì?"* (Kỹ thuật/máy tính; Tìm tòi/nghiên cứu; Vẽ/sáng tạo nội dung; Kết nối/giúp đỡ người khác; Kinh doanh/lãnh đạo; Ngăn nắp/kế hoạch).
  2. **Quan sát phản ứng**: *"Khi con gặp một bài toán khó hoặc thất bại, con thường làm gì?"* (Tự mày mò sửa lỗi; Tìm công cụ/AI hỗ trợ; Hỏi người lớn; Dễ nản lòng và né tránh).
  3. **Ưu tiên của gia đình**: *"Kỳ vọng lớn nhất của ba mẹ cho con đường tương lai của con là gì?"* (An toàn tài chính & việc làm ổn định; Con được sống đúng đam mê; Có cơ hội ra quốc tế/du học; Tự lập và phát triển bản thân).
* **Kết quả hiển thị (The Alignment Scorecard)**:
  * Hiển thị thanh đo: **Mức độ thấu cảm giữa Ba Mẹ và Con (ví dụ: 85% Đồng điệu)**.
  * Nêu rõ: *Điểm chung lớn nhất* và *Khoảng lệch nhận thức cần lắng nghe*.
  * Tích hợp 3 thẻ **"Gợi ý chủ đề đối thoại gia đình" (Conversation Starter Cards)** giúp cả nhà có cớ ngồi lại nói chuyện nhẹ nhàng, không phán xét.

---

## 3. BỔ SUNG CHỈ SỐ "SẴN SÀNG KỶ NGUYÊN AI" (AI RESILIENCE INDEX)

### 3.1. Vấn đề thực tế
* RIASEC (Holland Codes) là khung từ thập niên 1970. Nỗi lo lắng lớn nhất của phụ huynh hiện nay là ngành học của con có bị AI thay thế hoặc đào thải hay không.

### 3.2. Yêu cầu triển khai
* Bổ sung một chỉ số trực quan vào mỗi thẻ nghề nghiệp trong **Career Galaxy**:
  * **Mức độ rủi ro bị AI tự động hóa (AI Replacement Risk)**: Thấp / Trung bình / Cao.
  * **Kỹ năng con người giữ vai trò cốt lõi**: Nêu rõ 1–2 kỹ năng AI không thể thay thế trong nghề đó (ví dụ: Tư duy phản biện, Trí tuệ cảm xúc EQ, Đạo đức nghề nghiệp, Khả năng kết nối thực địa).
  * **Chỉ số AI Synergy**: Gợi ý con nên phối hợp với AI thế nào để tạo lợi thế cạnh tranh trong nghề đó thay vì sợ hãi.

---

## 4. CHIẾN LƯỢC VALUE-FIRST: LƯU HỒ SƠ & CHIA SẺ KHÔNG CẦN PASSWORD

### 4.1. Bài học từ MindX
* MindX bắt buộc nhập SĐT ngay tại cửa (`/assessment/gate`) trước khi làm bài, gây tỷ lệ thoát trang lớn và tạo cảm giác "bị xin lead".
* Orion Path AI cần giữ nguyên tắc **"Trao giá trị trước, xin thông tin sau" (Value-First)**.

### 4.2. Yêu cầu triển khai
* Cho học sinh và phụ huynh xem kết quả, biểu đồ sao và các thử nghiệm hành động hoàn toàn miễn phí.
* Tại chân trang báo cáo, đặt hộp thoại tiện ích nhẹ nhàng:
  * *"Lưu lại kết quả này để theo dõi sự tiến bộ của bạn sau 3 tháng"*.
  * Input: Họ tên + Số điện thoại phụ huynh/học sinh.
  * Hành động:
    * Lưu tự động toàn bộ trạng thái vào `localStorage` (`orion_profile_cache_v1`).
    * Tạo nút: **"Sao chép link kết quả"** hoặc **"Mở Zalo gửi cho Ba Mẹ"** kèm nội dung tóm tắt đẹp mắt.

---

## 5. CHECKLIST TRIỂN KHAI CHO DEV

- [ ] `app.html`: Thêm toggle chuyển đổi Fast-Track (3 phút) vs Chuyên sâu ở Screen 1.
- [ ] `app.html`: Tạo modal/section 3 câu hỏi trắc nghiệm phụ huynh cho tính năng Cầu nối gia đình.
- [ ] `assets/js/test_engine.js`: Thêm thuật toán tính toán độ đồng điệu giữa câu trả lời của con và phụ huynh (Parent-Child Alignment Gap).
- [ ] `app.html` & `data/`: Bổ sung thuộc tính `ai_resilience` và `automation_risk` vào danh sách nghề nghiệp mục tiêu.
- [ ] Lưu trữ: Tích hợp `localStorage` để tự động khôi phục dữ liệu khi người dùng vô tình tải lại trang.
- [ ] Đảm bảo giữ vững triết lý: Không bói toán, không dán nhãn, định hướng bằng bằng chứng và thử nghiệm nhỏ.
