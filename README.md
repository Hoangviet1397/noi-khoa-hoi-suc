# Công cụ Nội khoa & Hồi sức — v2.0.1 "Trợ lý trực"

Thang điểm, máy tính lâm sàng, liều thuốc ICU, kháng sinh và phác đồ cấp cứu cho bác sĩ nội khoa và hồi sức — nay có hồ sơ ca zero-data, 5 khóa an toàn chặn thật, tìm theo hội chứng, cây kiến thức toàn bộ và module chống độc Việt Nam.

**Mở app:** https://hoangviet1397.github.io/noi-khoa-hoi-suc/ — cài vào màn hình chính để dùng offline.
**Phiên bản hiện tại:** v2.0.1 (18/11/2026) — xem [CHANGELOG.md](CHANGELOG.md).

## Sửa ở v2.0.1
- **SOFA-2 không tính điểm trên trình duyệt thật — đã sửa:** kiểm chứng live 18/11/2026 thấy chọn đủ 6 hệ (kỳ vọng 11/24) mà kết quả vẫn “—”. Nguyên nhân: panel dùng ô kết quả id `sofa2` nhưng hàm tính ghi vào id `res-sofa2` (không tồn tại) nên kết quả bị bỏ lặng. Sửa cho cả 8 công cụ mới v2.0.0 (SOFA-2, MEWS, Rumack–Matthew, MELD 3.0, HEART Pathway, Osmolal gap, CIWA-Ar, ASPECTS): ô kết quả đổi sang id `res-…` đúng quy ước cũ, thêm nút “Tính …” thật và tự tính ngay khi mở app.

## Nội dung mới ở v2.0.0
- **Hồ sơ ca zero-data:** thanh Hồ sơ ca trên trang chủ — chỉ sống trong RAM, tự xóa sau 15 phút không chạm/khi khóa màn hình, nút Xóa ca 1 chạm. Chỉ nhập tuổi, cân nặng, eGFR/CrCl, gan, dị ứng penicillin, nguy cơ MRSA/ESBL, thai. KHÔNG nhập tên, ngày sinh đầy đủ, CCCD, mã bệnh án. Tự điền vào mọi bảng điểm và tự chỉnh liều theo thận/gan/cân nặng.
- **5 khóa an toàn (chặn thật):** MAP/noradrenalin (không nhập MAP thì không cho tính; MAP 58 báo đỏ dưới mục tiêu ≥ 65); Kali/DKA (không nhập ceton/HCO₃/Na hiệu chỉnh, không hỏi suy tim/thận thì không cho tính; suy tim/thận → dịch 10 mL/kg); Dị ứng/MRSA (kháng sinh kinh nghiệm khóa tới khi chọn đủ); ESBL (HAP/VAP nguy cơ cao ép meropenem, chặn pip-tazo/cefepime kèm MERINO); SOFA (khoảng vận mạch ≥ 1 giờ + SOFA-2 song song).
- **10 công cụ mới:** SOFA-2, MEWS, Rumack–Matthew + NAC, MELD 3.0, HEART Pathway, Osmolal gap, CIWA-Ar, ASPECTS, Tìm theo hội chứng, Cây kiến thức toàn bộ.
- **6 phác đồ cây mới:** ngộ độc paraquat, ngộ độc phosphua nhôm, sốt xuất huyết nặng, ngộ độc nấm/cá nóc/mật cá trắm, bundle ABCDEF (PADIS 2025), HAP/VAP — khóa ESBL.
- **Cây kiến thức toàn bộ:** 4 lĩnh vực, 34 nhánh + 4 nhánh Nền tảng & Kinh điển, 12 thay đổi lớn 2024–2026, bảng giải độc 16 dòng, bảng EXTRIP, mục "Chưa xác minh được". Các mục P1/P2 chưa làm máy tính tương tác có trong cây dạng tra cứu có cấu trúc, ghi rõ sẽ nâng lên tương tác ở đợt sau.
- **Chống độc Việt Nam:** phospho hữu cơ, paraquat, methanol/ethylene glycol, phosphua nhôm, rắn cắn (IVAC), dengue nặng, nấm/cá nóc/mật cá trắm. Nguồn tham khảo hscc.vn — chỉ dẫn link bài miễn phí, KHÔNG sao chép nội dung VIP.
- **Pháp lý:** màn hình xác nhận "Tôi là nhân viên y tế" lúc mở lần đầu; Disclaimer/Điều khoản/Bảo mật/Giấy phép trong Cài đặt; banner cảnh báo khi nội dung quá 12 tháng chưa rà lại. Bộ file pháp lý (LICENSE MIT + phụ lục miễn trừ y khoa, TERMS.md, DISCLAIMER.md, PRIVACY.md) là bản nháp cần luật sư y tế rà lại.
- **Giao diện:** 3 chế độ Cấp cứu (đỏ) / Hồi sức (xanh) / Tra cứu, chế độ đêm, nút to dùng một tay, PWA offline hoàn toàn.

## Nội dung (giữ nguyên từ v1.0.0)
- **91 công cụ • 41 phác đồ (132 mục)**: SOFA, SOFA-2, qSOFA, NEWS2, MEWS, APACHE II, mNUTRIC, kê đơn dinh dưỡng ICU, CRRT, dịch hồi sức, quy đổi opioid; GCS, RASS, CAM-ICU, NIHSS, ASPECTS, ICH score, ABCD², FOUR; P/F – ARDS, ROX, IBW/Vt, khí máu động mạch, cơ học thở máy, PSI/PORT; eGFR & Cockcroft–Gault, Anion Gap, AKI KDIGO, điều chỉnh natri, FENa/FEUrea, bù K/Mg; MAP/Shock Index/Lactate, CHA₂DS₂-VA & HAS-BLED, HEART, HEART Pathway, QTc, GRACE, TIMI, liều DOAC; CURB-65, Child–Pugh & MELD 3.0, Wells PE, Geneva, PERC, sPESI, BMI/BSA, Glasgow–Blatchford, Rockall, AIMS65, BISAP, Ranson, Maddrey, Lille, FIB-4 & APRI, NAFLD Fibrosis Score, Padua, Caprini, DKA, quy đổi corticoid; suy tim HFrEF, 4Ts, ISTH DIC, PLASMIC, Burch-Wartofsky, CPIS, Hunt-Hess & WFNS, BODE, ECOG, Charlson, CFS, 4AT, STOP-BANG, Barthel, Braden.
- **Bộ tính liều truyền thuốc ICU — 17 thuốc**: vận mạch (noradrenaline, adrenaline, dobutamine, dopamine, vasopressin, phenylephrine), an thần – giảm đau (propofol, midazolam, fentanyl, morphine, dexmedetomidine), insulin, heparin, nicardipine, nitroglycerin, amiodarone, furosemide.
- **3 checklist tại giường**: Sepsis giờ đầu, VAP bundle, SAT/SBT cai máy.
- **41 phác đồ dạng cây quyết định**: hồi sức, cấp cứu, chống độc (xem trong app, tab Phác đồ).
- **Tra cứu thuốc**: gõ biệt dược hoặc hoạt chất thông dụng tại Việt Nam (82 hoạt chất) để biết hoạt chất và mở công cụ liên quan.
- **📖 Sổ tay thuốc**: hướng dẫn sử dụng rút gọn 82 thuốc (chỉ định, liều, cách pha – dùng, chống chỉ định, tác dụng phụ, thai kỳ).
- **📰 Bản tin**: Nghiên cứu mới từ RSS của NEJM, JAMA, The Lancet và European Heart Journal, cập nhật mỗi ngày.
- **Module kháng sinh**: khuyến cáo kinh nghiệm theo hội chứng + liều theo CrCl, chức năng gan và mức độ bệnh cho 27 kháng sinh / kháng nấm — nay có khóa dị ứng penicillin/MRSA và khóa ESBL.

## Nguyên tắc
- Mọi tính toán chạy trên máy, không gửi dữ liệu bệnh nhân đi đâu. Hồ sơ ca chỉ sống trong RAM và tự xóa sau 15 phút.
- Mỗi công cụ ghi nguồn tham khảo và ngày rà soát nội dung; DOI kiểm chứng qua Crossref.
- Chỉ hỗ trợ quyết định — không thay thế đánh giá lâm sàng và phác đồ của bệnh viện.

## Báo lỗi / góp ý
Dùng nút **⚑** trong từng công cụ hoặc **💬 Báo lỗi / Góp ý** ở trang chủ — app mở sẵn GitHub Issue theo mẫu. Không ghi thông tin định danh bệnh nhân.

## Phát triển
- Một file `index.html` (HTML + CSS + JS), `sw.js` (offline), `manifest.webmanifest` và icon.
- Phát hành bản mới: sửa `APP_VERSION`, `APP_DATE`, `CHANGELOG` ở đầu script trong `index.html` (service worker tự lấy phiên bản), cập nhật `CHANGELOG.md` và README.
- Kiểm thử v2.0.1: `node test_v200.js` (harness Node + DOM giả lập, 64 ca — đều đạt, gồm 21 ca hồi quy v2.0.1) và `node --check` cho từng block `<script>`. Kiểm thử v1.0.0: `node tests/run-tests.js`.
- Kế hoạch: [docs/ROADMAP-GIAI-DOAN-2-3.md](docs/ROADMAP-GIAI-DOAN-2-3.md). GitHub là bản chính.

## Hạn chế đã biết (v2.0.1)
- Các mục P1/P2 trong cây kiến thức chỉ ở dạng tra cứu có cấu trúc, chưa phải máy tính tương tác.
- KDIGO AKI/AKD 2026 bản cuối, ESC PE cập nhật, hướng dẫn BYT Việt Nam toàn văn và ERC 2025 chưa kiểm chứng bản chính.
- Link hscc.vn trả 200 nhưng trang có Cloudflare Turnstile nên máy tự động chỉ thấy trang xác minh — link vẫn là URL bài viết chính thức.
- Chưa kiểm chứng trên trình duyệt thật trong môi trường build (không có Chromium) — cần kiểm chứng live trên điện thoại sau khi đẩy GitHub Pages, đặc biệt SOFA-2 (ca 11/24) và 7 công cụ mới còn lại.
