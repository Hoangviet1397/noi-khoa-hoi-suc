# Công cụ Nội khoa & Hồi sức

Thang điểm, máy tính lâm sàng, liều thuốc ICU, kháng sinh và phác đồ cấp cứu cho bác sĩ nội khoa và hồi sức.

**Mở app:** https://hoangviet1397.github.io/noi-khoa-hoi-suc/ — cài vào màn hình chính để dùng offline.
**Phiên bản hiện tại:** v0.7.0 (17/11/2026) — xem [CHANGELOG.md](CHANGELOG.md).

## Nội dung
- **52 công cụ**: SOFA, qSOFA, NEWS2, APACHE II, mNUTRIC, kê đơn dinh dưỡng ICU, CRRT, dịch hồi sức, quy đổi opioid; GCS, RASS, CAM-ICU, NIHSS, ICH score, ABCD², FOUR; P/F – ARDS, ROX, IBW/Vt, khí máu động mạch, cơ học thở máy, PSI/PORT; eGFR & Cockcroft–Gault, Anion Gap, AKI KDIGO, điều chỉnh natri, FENa/FEUrea, bù K/Mg; MAP/Shock Index/Lactate, CHA₂DS₂-VA & HAS-BLED, HEART, QTc, GRACE, liều DOAC; CURB-65, Child–Pugh & MELD, Wells PE, BMI/BSA, Glasgow–Blatchford, BISAP, Maddrey, Padua, Caprini, DKA, quy đổi corticoid; suy tim HFrEF, GRACE.
- **Bộ tính liều truyền thuốc ICU — 17 thuốc**: vận mạch (noradrenaline, adrenaline, dobutamine, dopamine, vasopressin, phenylephrine), an thần – giảm đau (propofol, midazolam, fentanyl, morphine, dexmedetomidine), insulin, heparin, nicardipine, nitroglycerin, amiodarone, furosemide.
- **3 checklist tại giường**: Sepsis giờ đầu, VAP bundle, SAT/SBT cai máy.
- **20 phác đồ dạng cây quyết định**: Hồi sức (sốc nhiễm trùng, ngừng tuần hoàn, suy hô hấp cấp, tăng kali), Cấp cứu (phản vệ, toan ceton, hạ đường huyết, đột quỵ cấp, trạng thái động kinh, hội chứng vành cấp, suy tim cấp, xuất huyết tiêu hóa trên, cơn hen cấp, đợt cấp COPD), Chống độc (tiếp cận chung & thuốc giải độc, paracetamol, phospho hữu cơ, opioid, methanol, rắn cắn).
- **Tra cứu thuốc**: gõ biệt dược hoặc hoạt chất thông dụng tại Việt Nam (82 hoạt chất) để biết hoạt chất và mở công cụ liên quan.
- **📖 Sổ tay thuốc**: hướng dẫn sử dụng rút gọn 82 thuốc (chỉ định, liều, cách pha – dùng, chống chỉ định, tác dụng phụ, thai kỳ).
- **📰 Bản tin**: mẹo tại giường 60 giây, cập nhật hướng dẫn, ca lâm sàng ôn tập có đáp án, cảnh báo thuốc — lọc theo chuyên mục, tìm kiếm, đánh dấu đã đọc, đọc offline.
- **Module kháng sinh**: khuyến cáo kinh nghiệm theo hội chứng + liều theo CrCl, chức năng gan và mức độ bệnh cho 27 kháng sinh / kháng nấm.

## Nguyên tắc
- Mọi tính toán chạy trên máy, không gửi dữ liệu bệnh nhân đi đâu.
- Mỗi công cụ ghi nguồn tham khảo và ngày rà soát nội dung.
- Chỉ hỗ trợ quyết định — không thay thế đánh giá lâm sàng và phác đồ của bệnh viện.

## Báo lỗi / góp ý
Dùng nút **⚑** trong từng công cụ hoặc **💬 Báo lỗi / Góp ý** ở trang chủ — app mở sẵn GitHub Issue theo mẫu. Không ghi thông tin định danh bệnh nhân.

## Phát triển
- Một file `index.html` (HTML + CSS + JS), `sw.js` (offline), `manifest.webmanifest` và icon.
- Phát hành bản mới: sửa `APP_VERSION`, `APP_DATE`, `CHANGELOG` ở đầu script trong `index.html` (service worker tự lấy phiên bản), cập nhật `CHANGELOG.md` và README.
- Kiểm thử: `node tests/run-tests.js` — kiểm tra các ca tính liều truyền thuốc và tính toàn vẹn của cây phác đồ.
- Kế hoạch: [docs/ROADMAP-GIAI-DOAN-2-3.md](docs/ROADMAP-GIAI-DOAN-2-3.md). GitHub là bản chính.
