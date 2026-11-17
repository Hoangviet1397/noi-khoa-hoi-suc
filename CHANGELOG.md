# Có gì mới

Số phiên bản và nội dung này cũng hiển thị trong app (chân trang → "Có gì mới").
Khi phát hành bản mới: sửa `APP_VERSION`, `APP_DATE` và thêm mục vào `CHANGELOG` ở đầu phần script trong `index.html`
(service worker tự đặt tên bộ nhớ đệm theo `APP_VERSION`), rồi cập nhật file này.

## v0.9.2 — 18/11/2026
- Phác đồ viêm phổi (HAP/VAP nguy cơ cao): thêm lưu ý ESBL — nguy cơ ESBL cao thì chọn meropenem, vì piperacillin–tazobactam và cefepime không phủ ESBL chắc chắn (thử nghiệm MERINO).

## v0.9.1 — 18/11/2026
- Phác đồ viêm phổi ghi rõ phác đồ kháng sinh cụ thể kèm liều (CAP nhẹ / nhập viện / nặng ICU, HAP/VAP nguy cơ thấp / cao) thay vì chỉ ghi tên nhóm thuốc, kèm liên kết tới module kháng sinh.
- Các bảng điểm dạng tick chọn (PERC, sPESI, Wells, CURB-65, qSOFA, SOFA, Ranson, Charlson, TIMI, 4Ts, DIC, PLASMIC, Burch-Wartofsky, CPIS, Hunt-Hess, BODE, ECOG, Rockall…) giờ tính sẵn ngay khi mở công cụ, không còn hiện ô trống chờ bấm.

## v0.9.0 — 18/11/2026
- Thêm 10 bảng điểm chuyên sâu: TIMI (hội chứng vành cấp không ST chênh), 4Ts (giảm tiểu cầu do heparin), ISTH DIC (đông máu rải rác), PLASMIC (TTP), Burch-Wartofsky (cơn bão giáp), CPIS (viêm phổi thở máy), Hunt-Hess & WFNS (xuất huyết dưới nhện), BODE (tiên lượng COPD), ECOG (tình trạng toàn thân), Rockall (xuất huyết tiêu hoá trên). Tổng 71 công cụ • 30 phác đồ (101 mục).
- Thêm 5 phác đồ cây: tăng áp lực thẩm thấu (HHS), viêm màng não, huyết khối tĩnh mạch sâu (DVT), tổn thương thận cấp (gói KDIGO), nhịp nhanh theo ACLS.
- Mọi mục mới đều có nguồn kèm link kiểm chứng (4 DOI gốc được thay bằng tài liệu tương đương đã kiểm chứng qua Crossref: 4Ts, BODE, nhịp nhanh ACLS, DIC).

## v0.8.0 — 18/11/2026
- Thêm 8 công cụ: PERC (loại trừ thuyên tắc phổi), sPESI (tiên lượng thuyên tắc phổi), FIB-4 & APRI (xơ hóa gan), Ranson (viêm tụy cấp), tiêu chuẩn Light (tràn dịch màng phổi), Centor/McIsaac (viêm họng liên cầu), Charlson (bệnh đồng mắc), CFS (thang suy yếu lâm sàng). Tổng 61 công cụ • 25 phác đồ (86 mục).
- Thêm 5 phác đồ cây: thuyên tắc phổi, rung nhĩ, tăng huyết áp cấp cứu, ARDS, viêm phổi (CAP/HAP/VAP, đánh giá lại 48–72h).
- Mọi mục mới đều có nguồn kèm link kiểm chứng (4 DOI gốc được thay bằng tài liệu tương đương đã kiểm chứng qua Crossref: PERC, sPESI, Centor, Ranson).

## v0.7.3 — 17/11/2026
- Đổi vị trí 2 tab dưới: Bản tin lên trước Cài đặt (Trang chủ, Phác đồ, Kháng sinh, Bản tin, Cài đặt) cho dễ thấy, đúng thứ tự đã mô tả.

## v0.7.2 — 17/11/2026
- Sửa lỗi nút Cài đặt ở thanh dưới điện thoại: bấm vào chỉ sáng nút mà không mở trang Cài đặt (thiếu nhánh xử lý trong bộ điều hướng). Giờ bấm Cài đặt mở đúng trang Cài đặt.

## v0.7.1 — 17/11/2026
- Sửa lỗi hiển thị trang chủ: các mục theo chuyên ngành bị xếp thành dải dọc hẹp, chữ chồng lên nhau (do lưới ngoài ôm lưới trong). Trang chủ giờ xếp các mục chồng lên nhau đúng như thiết kế.

## v0.7.0 — 17/11/2026
- **Thiết kế lại theo phong cách iOS:** tiêu đề lớn, thanh tìm kiếm dính trên đầu khi cuộn, thẻ công cụ bo góc 16px, bóng mờ nhẹ, font hệ thống.
- **Chọn chuyên ngành ngay lần mở đầu:** Hồi sức – Cấp cứu, Tim mạch, Thận – Tiết niệu, Nội tiết – Chuyển hoá, Hô hấp, Tiêu hoá – Gan mật, Thần kinh, Nội tổng quát — trang chủ đưa công cụ của chuyên ngành bạn lên đầu, vẫn tìm được toàn bộ 73 công cụ.
- **Thanh dưới còn 5 tab:** Trang chủ, Phác đồ, Kháng sinh, Bản tin, Cài đặt. Mục Đã ghim chuyển thành một mục trên trang chủ.
- **Trang Cài đặt riêng:** đổi chuyên ngành, cỡ chữ (Nhỏ/Vừa/Lớn/Rất lớn), xóa dữ liệu đã lưu, phiên bản + nhật ký thay đổi, chia sẻ app, mã QR, báo lỗi/góp ý, hướng dẫn sử dụng, cài app offline.
- **Nguồn kèm link cho mọi mục:** mỗi công cụ (73), phác đồ cây (20), checklist và module kháng sinh đều có dòng "Nguồn:" với link tới hướng dẫn/bài báo gốc (DOI hoặc trang chính thức) để kiểm chứng; Sổ tay thuốc (82 thuốc) mỗi thuốc có link nhãn FDA qua DailyMed.

## v0.6.4 — 17/11/2026
- Sửa chữ sót ở trang Bản tin: phần giới thiệu và tiêu đề còn ghi chuyên mục cũ và cập nhật mỗi tuần — nay ghi đúng chỉ còn Nghiên cứu mới, cập nhật mỗi ngày.

## v0.6.3 — 17/11/2026
- **Bản tin gọn lại chỉ còn Nghiên cứu mới:** bỏ 12 mục biên tập cũ (mẹo tại giường, cập nhật hướng dẫn, ca lâm sàng, cảnh báo thuốc), chỉ giữ bài nghiên cứu mới từ RSS của NEJM, JAMA, The Lancet và European Heart Journal. Cập nhật mỗi ngày một lần.

## v0.6.2 — 17/11/2026
- **Bản tin thêm chuyên mục Nghiên cứu mới từ RSS:** 5 bài đầu tiên — prasugrel so với ticagrelor trong ACS (NEJM), PEPPER dự phòng VTE sau thay khớp (NEJM), pelacarsen hạ Lp(a) thất bại pha 3 (JAMA), insulin nền efsitora mỗi tuần (JAMA), mười điều răn ESC 2025 về viêm cơ tim/màng ngoài tim (Eur Heart J). Bài mới được cập nhật mỗi tuần từ RSS của NEJM, JAMA, The Lancet và European Heart Journal (qua PubMed).

## v0.6.1 — 17/11/2026
- **Bản tin làm lại như feed bài báo:** mỗi mục có toàn văn (chạm thẻ hoặc nút Đọc tiếp để mở rộng), tên nguồn và nút “🔗 Đọc bản gốc” dẫn tới toàn văn hướng dẫn gốc để kiểm chứng: SSC 2021, Sepsis-3 (JAMA 2016), KDIGO 2024, ESC 2023, định nghĩa ARDS toàn cầu 2023, ESPEN 2023, nhãn thuốc Merrem (FDA), hướng dẫn vancomycin ASHP/IDSA 2020, ADA Standards of Care 2024. Chạm vào thẻ tin cũng đánh dấu đã đọc.

## v0.6.0 — 17/11/2026
- **🥗 Kê đơn dinh dưỡng ICU** (`#/nutri`): năng lượng 20–25 kcal/kg/ngày và protein 1,2–2 g/kg/ngày theo ESPEN 2023 / ASPEN–SCCM, điều chỉnh theo béo phì (dùng IBW), suy thận chưa lọc máu (protein 0,8–1,0), đang lọc máu/CRRT, suy gan (không hạn chế protein khi có bệnh não gan), bỏng, suy dinh dưỡng; tốc độ nuôi ăn qua sonde mL/giờ theo nồng độ sữa 1,0 / 1,2 / 1,5 kcal/mL; cảnh báo hội chứng nuôi ăn lại (bắt đầu 5–10 kcal/kg/ngày khi nguy cơ cao, thiamine, theo dõi phosphat/K⁺/Mg²⁺).
- **🩸 CRRT — Lọc máu liên tục** (`#/crrt`): liều effluent 20–25 mL/kg/giờ theo KDIGO, ra tổng effluent mL/giờ và tốc độ dịch thay thế / dịch lọc theo phương thức CVVH, CVVHD, CVVHDF; gợi ý chống đông citrate vùng (theo dõi Ca ion hóa, tỉ lệ Ca toàn phần/Ca ion hóa) / heparin / không chống đông; nhắc thời điểm kháng sinh và nút mở module kháng sinh.
- **❤️ Suy tim HFrEF** (`#/hfref`): bộ bốn thuốc nền ARNI (hoặc ACE-I), beta-blocker, MRA, SGLT2i với liều khởi đầu – liều đích theo ESC 2021/2023, tự đánh dấu HOÃN khi HA < 100, nhịp tim < 55, K⁺ > 5,0–5,5 hoặc eGFR < 30; chỉnh lợi tiểu theo mức ứ dịch và theo dõi K/creatinin.
- **📰 Bản tin** (`#/feed`): mẹo tại giường 60 giây, cập nhật hướng dẫn, ca lâm sàng ôn tập có đáp án, cảnh báo thuốc — 12 mục đóng gói sẵn trong app, đọc offline; lọc theo chuyên mục, tìm kiếm, đánh dấu đã đọc (lưu trên máy); thêm nút Bản tin ở thanh điều hướng dưới và trang chủ.

## v0.5.1 — 17/11/2026 (sửa lỗi do Muse rà soát, Refs #1)
- **Meropenem: khoảng CrCl không còn chồng lấn.** Trước đây CrCl 26–29 xuất hiện ở cả hai nhóm (26–50 và 15–29), CrCl 10–25 lấn sang nhóm <15. Nay: CrCl 30–50 liều đủ (1–2 g) mỗi 12 giờ; CrCl 26–29 liều đủ mỗi 12 giờ; CrCl 15–25 nửa liều (0,5–1 g) mỗi 12 giờ.
- **Thanh điều hướng dưới không còn che nút cuối trang:** tăng khoảng đệm dưới trang thêm 76 px để thanh điều hướng và thanh kết quả nổi không che nút cuối trang trên điện thoại.
- **Cây Hội chứng vành cấp thêm nút Tính GRACE:** ở cả hai bước phân tầng NSTE-ACS, bấm nút là mở thẳng máy tính GRACE thay vì chỉ là chữ thường.

## v0.5.0 — 17/11/2026
- **📖 Sổ tay thuốc** (`#/drugbook`): hướng dẫn sử dụng rút gọn cho 82 thuốc — chỉ định, liều người lớn, cách pha – cách dùng, chống chỉ định – thận trọng, tác dụng phụ – theo dõi – thuốc giải, thai kỳ. Kháng sinh tự lấy liều theo CrCl / lọc máu và lưu ý gan từ module kháng sinh; thuốc truyền tự lấy khoảng liều, cách pha, đường truyền từ bộ tính liều — số liệu thống nhất trong toàn app. Nút "📖 Cách dùng" trong kết quả tìm thuốc; nhóm "Kháng sinh" đổi tên thành "Thuốc – kháng sinh".

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
