# Có gì mới

Số phiên bản và nội dung này cũng hiển thị trong app (chân trang → "Có gì mới").
Khi phát hành bản mới: sửa `APP_VERSION`, `APP_DATE` và thêm mục vào `CHANGELOG` ở đầu phần script trong `index.html`
(service worker tự đặt tên bộ nhớ đệm theo `APP_VERSION`), rồi cập nhật file này.

## v2.0.1 — 18/11/2026 — Sửa SOFA-2 không tính điểm

- **Sửa lỗi SOFA-2 không tính điểm trên trình duyệt thật (kiểm chứng live 18/11/2026, 4/5 mục PASS, riêng SOFA-2 FAIL):** chọn đủ 6 hệ cơ quan (kỳ vọng 11/24) mà khung kết quả vẫn hiện “— / Nhập số liệu để xem kết quả”. Nguyên nhân: panel dùng `resHTML("sofa2")` (ô kết quả có id `sofa2`) trong khi hàm tính gọi `setRes("res-sofa2")` — ô kết quả không tồn tại nên kết quả bị bỏ lặng, không báo lỗi. Harness kiểm thử cũ không bắt được vì DOM giả lập tự tạo element cho mọi id.
- **Cùng lỗi ở cả 8 công cụ mới v2.0.0 — sửa hết:** SOFA-2, MEWS, Rumack–Matthew, MELD 3.0, HEART Pathway, Osmolal gap, CIWA-Ar, ASPECTS — ô kết quả đổi sang id `res-…` đúng quy ước của mọi công cụ cũ. Thêm nút “Tính …” thật cho 8 công cụ mới và tự tính ngay khi mở app (như các công cụ cũ: SOFA-2 mở ra hiện 0/24).
- **Kiểm thử:** 64 ca đều đạt (43 ca cũ + 21 ca hồi quy mới), gồm kiểm tra chuỗi panel thực render ra có `id="res-…"`, ca live SOFA-2 11/24, và mô phỏng đổi select kích hoạt listener `change` mà không gọi hàm tính trực tiếp. Chạy cùng 21 ca mới lên bản v2.0.0 cũ thì 18 ca FAIL đúng như kỳ vọng — chứng tỏ test mới bắt được lỗi. 4 block `<script>` đều qua `node --check`. Refs #1.

## v2.0.0 — 18/11/2026 — "Trợ lý trực"
- **16 mục mới (10 công cụ + 6 phác đồ cây):** SOFA-2, MEWS, Rumack–Matthew + NAC, MELD 3.0, HEART Pathway, Osmolal gap, CIWA-Ar, ASPECTS, Tìm theo hội chứng, Cây kiến thức toàn bộ (34 nhánh + 4 nhánh Nền tảng & Kinh điển, tra cứu có cấu trúc); phác đồ cây mới: ngộ độc paraquat, ngộ độc phosphua nhôm, sốt xuất huyết nặng, ngộ độc nấm/cá nóc/mật cá trắm, bundle ABCDEF (PADIS 2025), HAP/VAP — khóa ESBL. Tổng: **91 công cụ • 41 phác đồ (132 mục)**.
- **Hồ sơ ca zero-data:** chỉ sống trong RAM, KHÔNG ghi localStorage cho dữ liệu bệnh nhân, tự xóa sau 15 phút không chạm/khi khóa màn hình, nút Xóa ca 1 chạm. Chỉ nhập tuổi, cân nặng, eGFR/CrCl, gan, dị ứng penicillin, nguy cơ MRSA/ESBL, thai — KHÔNG nhập tên, ngày sinh đầy đủ, CCCD, mã bệnh án. Tự điền cân nặng/CrCl/gan vào mọi bảng điểm và tự chỉnh liều theo thận/gan/cân nặng.
- **5 khóa an toàn — chặn thật, không chỉ cảnh báo chữ** (sửa đúng 5 lỗi đã soi ở v0.5.0, Issue #1): (a) MAP/noradrenalin — không nhập MAP thì không cho tính, MAP 58 báo đỏ dưới mục tiêu ≥ 65; (b) Kali/DKA — không nhập ceton/HCO₃/Na hiệu chỉnh, không hỏi suy tim/thận thì không cho tính insulin/truyền dịch; suy tim/thận → dịch 10 mL/kg thay vì 15–20; (c) Dị ứng/MRSA — kháng sinh kinh nghiệm không hiện liều nếu chưa chọn dị ứng penicillin và nguy cơ MRSA; (d) ESBL — nhánh HAP/VAP nguy cơ cao ép chọn meropenem, chọn pip-tazo/cefepime thì chặn và ghi rõ MERINO; (e) SOFA — khoảng vận mạch phải duy trì ≥ 1 giờ (checkbox), chưa đủ 1 giờ thì cảnh báo nguồn sai số từng làm SOFA tụt 14→11; thêm SOFA-2 song song SOFA cũ.
- **Cập nhật guideline mới:** SSC 2026 (NEWS2/MEWS thay qSOFA sàng lọc, kháng sinh 1h/3h, beta-lactam truyền kéo dài), GOLD 2026 (chỉ cần ≥ 1 đợt cấp vừa/nặng → nhóm E; mepolizumab), AHA CPR 2025 (sốc điện rung nhĩ ≥ 200 J ngay từ đầu), ATS CAP 2025 (kháng sinh < 5 ngày, tối thiểu 3 ngày nếu ổn định), ESC AF 2024 (CHA₂DS₂-VA), AHA/ASA đột quỵ 2025 (tenecteplase 0,25 mg/kg ngang hàng alteplase).
- **Tìm theo hội chứng:** gõ tiếng Việt không dấu cũng ra (vd "kho tho", "dau nguc", "sot giam tieu cau") → chẩn đoán phân biệt, bảng điểm, phác đồ, thuốc.
- **Chống độc Việt Nam:** phospho hữu cơ/carbamate, paraquat, methanol/ethylene glycol (fomepizole, EXTRIP), phosphua nhôm, rắn cắn (huyết thanh kháng nọc IVAC), dengue nặng (WHO/BYT), nấm/cá nóc/mật cá trắm, bảng giải độc 16 dòng và bảng EXTRIP. Nguồn tham khảo Việt Nam hscc.vn (Hồi Sức Cấp Cứu 4.0) — chỉ dẫn link tới bài miễn phí (Paracetamol, Rumack–Matthew, Bảng điểm Atropin, Kháng sinh ICU theo Hội HSCC&CĐ VN 2020), KHÔNG sao chép nội dung VIP và KHÔNG sao chép code.
- **Cây kiến thức toàn bộ:** 4 lĩnh vực, 34 nhánh + 4 nhánh Nền tảng & Kinh điển (Harrison 21e, Goldfrank 11e, ATLS 10th, Tintinalli 9e), 12 thay đổi lớn 2024–2026, bảng giải độc 16 dòng, bảng EXTRIP, mục "Chưa xác minh được". Các mục P1/P2 chưa làm máy tính tương tác có trong cây dạng tra cứu có cấu trúc (định nghĩa, bảng điểm/protocol chính, liều nguyên tắc, nguồn + năm), ghi rõ sẽ nâng lên tương tác ở đợt sau.
- **Pháp lý trong app:** màn hình xác nhận "Tôi là nhân viên y tế" lúc mở lần đầu; trang Disclaimer/Điều khoản/Bảo mật/Giấy phép trong Cài đặt (từ bộ file pháp lý v2.0 — LICENSE MIT + phụ lục miễn trừ y khoa, TERMS.md, DISCLAIMER.md, PRIVACY.md; bản nháp cần luật sư y tế rà lại); chân trang ghi phiên bản 2.0.0 + ngày rà soát; banner cảnh báo nếu nội dung quá 12 tháng chưa rà lại. Không tracker, không quảng cáo, không font/script ngoài.
- **Giao diện:** 3 chế độ Cấp cứu (đỏ) / Hồi sức (xanh) / Tra cứu, chế độ đêm, giữ PWA offline hoàn toàn, giữ thứ tự 5 tab dưới (Trang chủ, Phác đồ, Kháng sinh, Bản tin, Cài đặt).
- **Kiểm thử:** 43 ca kiểm thử tự động đều đạt (harness Node + DOM giả lập, `test_v200.js`): FIB-4 2,03, PERC 0/8, STOP-BANG 0/8, noradrenalin 22,5 mL/giờ + MAP 58 báo đỏ + khóa khi thiếu MAP, SOFA-2 (RRT, mê sảng), MEWS, Rumack–Matthew (dưới/trên vạch), MELD 3.0 (nam 17/nữ 18), HEART Pathway, Osmolal gap 30, CIWA-Ar, ASPECTS, SOFA 14 + khóa vận mạch, DKA (khóa + insulin 6 mL/giờ + Na hiệu chỉnh 140,5 + dịch suy tim 600 mL), khóa kháng sinh dị ứng/MRSA, khóa ESBL (MERINO), GOLD 2026 nhóm E, hồ sơ ca zero-data (không ghi localStorage), cổng nhân viên y tế, định tuyến `#/sofa2`. 4 block `<script>` đều qua `node --check`. 2 DOI ban đầu bị sai đã sửa sau khi kiểm chứng Crossref (CIWA-Ar → 10.1111/j.1360-0443.1989.tb00737.x; ASPECTS → 10.1016/S0140-6736(00)02237-6); IDSA HAP/VAP 2016 DOI 10.1093/cid/ciw353 đã kiểm chứng. Link hscc.vn trả 200 nhưng trang có Cloudflare Turnstile nên máy tự động chỉ thấy trang xác minh — link vẫn là URL bài viết chính thức do hscc.vn công bố.
- **Chưa làm được / cần kiểm chứng thêm:** các mục P1/P2 trong cây kiến thức chỉ ở dạng tra cứu (chưa phải máy tính tương tác); KDIGO AKI/AKD 2026 bản cuối, ESC PE cập nhật, hướng dẫn BYT Việt Nam toàn văn, ERC 2025 chưa kiểm chứng bản chính; chưa kiểm chứng trên trình duyệt thật (không có Chromium trong môi trường build) — cần kiểm chứng live trên điện thoại sau khi đẩy GitHub Pages (đặc biệt khóa 2/3/5 và nút sao chép/tải file pháp lý trên prototype v2.0 vẫn đang chờ Việt bấm thử).

## v1.0.0 — 18/11/2026
- Thêm 10 công cụ: GOLD (phân nhóm COPD), Geneva sửa đổi (thuyên tắc phổi), Wells DVT, AIMS65 (xuất huyết tiêu hoá trên), Lille (viêm gan rượu), NAFLD Fibrosis Score, Barthel (ADL), Braden (nguy cơ loét tì đè), 4AT (sàng lọc mê sảng), STOP-BANG (ngưng thở khi ngủ).
- Thêm 5 phác đồ: hạ kali máu, hạ natri máu, nhịp chậm (ACLS), xuất huyết tiêu hoá dưới, nhiễm trùng tiểu — kháng sinh và thuốc ghi rõ liều.
- Tổng: 81 công cụ • 35 phác đồ (116 mục); 1.902 kiểm tra đều đạt.

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
