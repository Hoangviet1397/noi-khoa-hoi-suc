# Có gì mới

Số phiên bản và nội dung này cũng hiển thị trong app (chân trang → "Có gì mới").
Khi phát hành bản mới: sửa `APP_VERSION`, `APP_DATE` và thêm mục vào `CHANGELOG` ở đầu phần script trong `index.html`
(service worker tự đặt tên bộ nhớ đệm theo `APP_VERSION`), rồi cập nhật file này.

## v0.4.0 — 17/11/2026
- **Tra cứu theo tên thuốc**: gõ biệt dược hoặc hoạt chất thông dụng tại Việt Nam (82 hoạt chất: kháng sinh, kháng nấm, vận mạch, an thần, opioid, insulin, chống đông, kháng tiểu cầu, tiêu sợi huyết, corticoid, thuốc cấp cứu & giải độc) — mục "💊 Thuốc" ghi biệt dược → hoạt chất và mở thẳng công cụ liên quan: module kháng sinh lọc sẵn thuốc, bộ tính liều truyền chọn sẵn thuốc, hoặc phác đồ. Tên thuốc cũng được thêm vào từ khóa tìm kiếm của các công cụ.
- **Hướng dẫn sử dụng** trong app: nút ❓ ở trang chủ (tô nổi lần đầu) và ở chân trang.

## v0.3.1 — 17/11/2026
- Dùng như app thật: tắt phóng to bằng hai ngón / chạm đúp (kể cả Safari iOS), không cuộn ngang, không nảy khi kéo quá mép trang, không bật menu nhấn giữ trên nút. Thêm nút **Cỡ chữ** (A / A+ / A++) trên thanh tiêu đề và trong ⚙️ Cài đặt app thay cho phóng to bằng tay.
- Sửa lỗi trang bị cuộn ngang trên điện thoại: bảng rộng chỉ cuộn bên trong khung riêng (`.tblwrap`), bảng quy đổi corticoid gọn còn 3 cột, chế độ "Toàn bộ cây" giảm thụt lề và cho xuống dòng, thêm `overflow-x: clip` cho toàn trang. Đã kiểm tra toàn bộ công cụ, phác đồ và hộp thoại ở bề rộng 320, 360, 375 px.

## v0.3.0 — 17/11/2026 (Giai đoạn 2 + 3, Issue #1)
- **Bộ tính liều truyền thuốc ICU — 17 thuốc** (`#/vaso`): noradrenaline, adrenaline, dobutamine, dopamine, vasopressin, phenylephrine; propofol, midazolam, fentanyl, morphine, dexmedetomidine; insulin, heparin; nicardipine, nitroglycerin, amiodarone, furosemide. Liều ↔ mL/giờ theo cân nặng và cách pha, tổng liều/24 giờ, thời gian dùng hết một bơm, cảnh báo vượt khoảng thường dùng / ngưỡng tối đa, cảnh báo BMI > 30 kèm tùy chọn cân nặng hiệu chỉnh, liều nạp heparin / amiodarone. Mỗi thuốc hiển thị công thức, 2 ca kiểm tra tính tay, đường truyền và nguồn.
- **3 checklist tại giường**: Sepsis giờ đầu (đồng hồ giờ 0, cảnh báo quá 1 giờ chưa có kháng sinh), VAP bundle, SAT/SBT cai máy (tự kết luận đạt / thất bại). Lưu tạm trong phiên, sao chép tóm tắt vào bệnh án, không lưu thông tin định danh.
- **5 phác đồ cây mới** (tổng 20): hội chứng vành cấp STEMI/NSTEMI, suy tim cấp, xuất huyết tiêu hóa trên, cơn hen cấp, đợt cấp COPD. Rà soát tăng kali máu (thêm glucose dự phòng hạ đường huyết khi glucose trước điều trị < 7 mmol/L). Nút trong cây có thể mở thẳng một công cụ.
- **Sản phẩm dùng chung**: nút Báo lỗi / Góp ý (trang chủ, chân trang và trong từng công cụ) mở GitHub Issue có mẫu sẵn; hiển thị phiên bản + "Có gì mới"; nút Chia sẻ app với mã QR nhúng sẵn (dùng được offline).
- `tests/run-tests.js`: kiểm thử tự động các ca tính liều và tính toàn vẹn của cây phác đồ.

## v0.2.0 — 17/11/2026
- Sửa PWA (service worker, manifest, icon tách khỏi data URI) — cài được và chạy offline.
- Rà soát lâm sàng toàn bộ; 45 công cụ, 27 kháng sinh / kháng nấm, 15 phác đồ cây; giao diện mới.

## v0.1.0 — 11/2026
- Bản đầu tiên: 19 công cụ, module kháng sinh theo chức năng thận – gan.
