# Công cụ Nội khoa & Hồi sức — v2.0.1 "Trợ lý trực"

Thang điểm, máy tính lâm sàng, liều thuốc ICU, kháng sinh và phác đồ cấp cứu cho bác sĩ nội khoa và hồi sức — nay có hồ sơ ca zero-data, 5 khóa an toàn chặn thật, tìm theo hội chứng, cây kiến thức toàn bộ và module chống độc Việt Nam.

**Mở app:** https://hoangviet1397.github.io/noi-khoa-hoi-suc/ — thêm vào màn hình chính để mở nhanh như app (cần mạng).
**Phiên bản hiện tại:** v2.7.6 (19/11/2026) — xem [CHANGELOG.md](CHANGELOG.md).

## Có gì mới ở v2.7.5

- **Công cụ mới — Sgarbossa (nhồi máu cơ tim trên LBBB / nhịp máy tạo nhịp):** tiêu chuẩn Smith-modified làm kết quả chính — dương khi có bất kỳ 1 trong 3: ST chênh lên đồng hướng ≥ 1 mm; ST chênh xuống đồng hướng ≥ 1 mm ở V1–V3; ST chênh lên ngược hướng ≥ 1 mm kèm tỉ số ST/S ≥ 25% (nhập ST chênh lên và độ sâu sóng S, app tự tính tỉ số). Thang điểm gốc Sgarbossa hiện kèm (≥ 3 rất đặc hiệu nhưng độ nhạy chỉ ~36%). Dương tính → xử trí như STEMI, liên kết thẳng tới phác đồ Hội chứng vành cấp; âm tính không loại trừ nhồi máu — vẫn theo dõi troponin + ECG nối tiếp.

## Có gì mới ở v2.7.4

- **Bản tin — 1 nghiên cứu mới (CHEST 2026):** dự đoán nguy cơ tim mạch do xơ vữa kém chính xác hơn ở người suy giảm chức năng hô hấp — trong 26.523 người, nhóm suy giảm hô hấp có tỉ lệ biến cố tim mạch lớn cao gấp đôi (14% so với 7%; HR hiệu chỉnh 1,25) nhưng thang điểm PCE dự đoán kém hơn (AUC 0,740 so với 0,792); thêm hô hấp ký và khó thở chỉ cải thiện rất ít.

## Có gì mới ở v2.7.3

- **Bản tin — 1 nghiên cứu mới (Eur Heart J 2026):** tử vong do bệnh tim thiếu máu cục bộ — nữ vẫn cao hơn nam ở nhiều nước Tây Âu (GBD 2023): tử vong chuẩn hoá theo tuổi giảm 15,9% ở nam và 23,5% ở nữ giai đoạn 2013–2023, nhưng tỉ lệ tử vong trên tỉ lệ hiện mắc vẫn cao hơn đáng kể ở nữ tại Áo, Pháp, Hy Lạp, Israel, Ý và Tây Ban Nha.

## Có gì mới ở v2.7.2

- **Bản tin — 1 nghiên cứu mới (NEJM 2026):** pelacarsen hạ Lp(a) mạnh nhưng không giảm biến cố tim mạch (Lp(a)HORIZON) — biến cố chính 12,3% so với 12,1% placebo (HR 1,02) sau trung vị 4,7 năm.

## Có gì mới ở v2.7.1

- **Bản tin — 1 nghiên cứu mới (Critical Care 2026):** protein theo cân nặng hiệu chỉnh ở bệnh nhân ICU thừa cân/béo phì — protein 4 ngày đầu dưới ~0,45 g/kg/ngày liên quan tử vong trong ICU cao hơn (ở mức 0 g/kg/ngày, nguy cơ cao hơn khoảng 38%).

## Có gì mới ở v2.7.0
- **Module kháng sinh làm lại thành wizard 5 bước:** thay toàn bộ trang dài bằng wizard một câu hỏi một màn hình (thẻ bấm lớn, không checkbox): ① hội chứng (7 thẻ lớn: phổi cộng đồng/bệnh viện, tiết niệu, ổ bụng, da–mô mềm, màng não, nhiễm trùng huyết) → ② mức độ nặng → ③ dị ứng penicillin (bắt buộc, không mặc định) → ④ cây hỏi nguy cơ MRSA/ESBL (giữ nguyên cây v2.6.1) → ⑤ thận/gan (chỉ hỏi khi cần chỉnh liều, lấy sẵn từ Hồ sơ ca) → kết quả: phác đồ kinh nghiệm + bảng “Liều từng thuốc” + giải thích “vì sao dùng thuốc này” + thuốc thay thế cho từng thuốc chính. Thanh tiến trình “Bước X/5” + dải tóm tắt dính (chạm để nhảy về sửa; đổi đáp án thì tính lại và hiện rõ điều đã đổi). Bảng liều chỉ hiện sau khi chốt phác đồ.
- **Sửa 3 lỗi v2.6.1:** (a) nhánh “Có cả hai” nay quay lại/sửa/làm lại được (trước đây chạm câu đã trả lời không mở lại, nút làm lại biến mất, “Xóa dữ liệu đã lưu” cũng không đặt lại được); (b) dòng “đã mở khóa” chỉ hiện khi thực sự đã mở khóa; (c) bộ đếm “Đã trả lời N câu” khớp đúng số câu đã trả lời.
- **Dọn sạch link hscc.vn:** hscc.vn chỉ là trang trung gian, không phải nguồn dẫn chứng — toàn bộ link hscc.vn đã thay bằng nguồn gốc (Rumack 1975, EXTRIP 2014, Eddleston Lancet 2008/PMC, Hướng dẫn Bộ Y tế QĐ 3610/QĐ-BYT, Hội HSCC&CĐ VN 2020) hoặc bỏ khi không xác định được nguồn gốc.
- **Thuốc thay thế cho phác đồ kháng sinh:** 36 kháng sinh/kháng nấm trong bảng liều (thêm Aztreonam, Ertapenem, Cefotaxime, Ceftazidime, Nitrofurantoin, Fosfomycin, Cephalexin, Moxifloxacin, Meropenem–Vaborbactam); mỗi thuốc chính trong phác đồ có 1–2 thuốc thay thế cùng phổ theo đúng guideline đã trích dẫn (vd meropenem → imipenem–cilastatin, vancomycin → linezolid, piperacillin–tazobactam → cefepime + metronidazol), kèm liều đầy đủ đã chỉnh theo thận/gan. Phác đồ nào guideline không liệt kê thuốc thay thế thì để trống, không bịa thêm.

## Có gì mới ở v2.6.1
- **Module kháng sinh — bước ③ làm lại kiểu cây phác đồ:** thay 2 checklist checkbox ở v2.6.0 (câu nằm viện và dùng kháng sinh bị hỏi lặp 2–3 lần) bằng cây hỏi từng bước, một câu một thẻ: tiền sử nhiễm/mang MRSA hoặc ESBL → nằm viện/ICU/dưỡng lão 90 ngày → kháng sinh phổ rộng gần đây → sonde tiểu/thủ thuật xâm lấn → lọc máu/vết thương mạn/viêm phổi nặng; mỗi yếu tố chỉ hỏi đúng một lần. Rẽ nhánh: "Có cả hai" chốt luôn cả hai cao; "Có ESBL" bỏ qua câu sonde tiểu; "Có MRSA" bỏ qua câu lọc máu/vết thương. Câu đã trả lời xếp thành danh sách, chạm để quay lại sửa; có nút làm lại từ đầu. Kết luận hiện rõ cả hai nguy cơ cùng lý do; quy tắc giữ như v2.6.0 ("Không biết" không bao giờ tính là thấp; "chưa rõ" mặc định theo mức nặng nhẹ).
- **Sửa lỗi đường tắt "Tôi đã biết nguy cơ":** trước đây vào đường tắt app giữ nguy cơ cũ (mặc định THẤP) trước khi người dùng chọn — nay vào đường tắt thì trống, phải bấm Cao hoặc Thấp mới tính.

## Có gì mới ở v2.6.0
- **Bản tin làm lại kiểu Feed:** 30 bài Nghiên cứu mới mới nhất (thêm 20 bài), thẻ bài có ảnh minh hoạ lớn phía trên, tiêu đề tiếng Việt, tóm tắt 2–3 câu, nguồn + ngày đăng, huy hiệu “Mới” cho bài chưa đọc; sắp xếp nghiêm theo ngày xuất bản, mới nhất lên đầu. Chạm thẻ mở toàn văn và đánh dấu đã đọc (giữ nguyên lọc, tìm kiếm, đánh dấu đã đọc).
- **Thêm 5 nguồn tạp chí mới** (xác minh RSS/PubMed lấy được thật ngày 18/11/2026): BMJ (RSS trực tiếp 27+ bài), Annals of Internal Medicine, Critical Care, Intensive Care Medicine, CHEST (qua PubMed E-utilities — RSS trực tiếp của 4 tạp chí này trả 403/404/500). Cùng NEJM, JAMA, The Lancet, European Heart Journal: tổng 9 nguồn.
- **Ảnh minh hoạ:** 3 bài Critical Care dùng hình Fig. 1 của chính bài báo (media.springernature.com — link ổn định); các bài khác dùng ảnh minh hoạ theo chủ đề do app tự vẽ (gradient + nhãn chủ đề), luôn ghi rõ “Ảnh minh hoạ”, không giả làm hình của bài báo. Trang NEJM/JAMA/Lancet/EHJ/Annals/BMJ/CHEST/ICM chặn tải trang nên không lấy được og:image — khi nào lấy được thì ghi URL vào trường `img` (xem schema trong ghi chú trước `FEED` trong `index.html`).
- **Module kháng sinh — checklist nguy cơ MRSA/ESBL:** thay 2 câu hỏi trừu tượng “Nguy cơ MRSA cao hay thấp?” / “Nguy cơ ESBL cao hay thấp?” bằng checklist yếu tố nguy cơ cụ thể, mỗi yếu tố chọn Có / Không / Không biết (MRSA 4 yếu tố, ESBL 5 yếu tố; câu “từng nhiễm/mang” kèm gợi ý tra cứu cấy cũ, giấy ra viện, hỏi người nhà, hệ thống xét nghiệm). App tự tính nguy cơ và hiện lý do; 1 tick “Có” là cao, toàn “Không” mới là thấp, còn lại là “chưa rõ”. “Không biết” không bao giờ tính là thấp: nhiễm trùng nặng thì phủ rộng chờ cấy rồi hạ thang (nghi MRSA thêm vancomycin/linezolid, nghi ESBL dùng meropenem), nhiễm trùng nhẹ thì dùng phác đồ chuẩn kèm nhắc xem lại khi có cấy. Nút “Tôi đã biết nguy cơ” cho chọn thẳng cao/thấp. Phác đồ kinh nghiệm và bảng “Liều từng thuốc” vẫn khóa cho tới khi nguy cơ được xác định.

## Sửa ở v2.0.1
- **SOFA-2 không tính điểm trên trình duyệt thật — đã sửa:** kiểm chứng live 18/11/2026 thấy chọn đủ 6 hệ (kỳ vọng 11/24) mà kết quả vẫn “—”. Nguyên nhân: panel dùng ô kết quả id `sofa2` nhưng hàm tính ghi vào id `res-sofa2` (không tồn tại) nên kết quả bị bỏ lặng. Sửa cho cả 8 công cụ mới v2.0.0 (SOFA-2, MEWS, Rumack–Matthew, MELD 3.0, HEART Pathway, Osmolal gap, CIWA-Ar, ASPECTS): ô kết quả đổi sang id `res-…` đúng quy ước cũ, thêm nút “Tính …” thật và tự tính ngay khi mở app.

## Nội dung mới ở v2.0.0
- **Hồ sơ ca zero-data:** thanh Hồ sơ ca trên trang chủ — chỉ sống trong RAM, tự xóa sau 15 phút không chạm/khi khóa màn hình, nút Xóa ca 1 chạm. Chỉ nhập tuổi, cân nặng, eGFR/CrCl, gan, dị ứng penicillin, nguy cơ MRSA/ESBL, thai. KHÔNG nhập tên, ngày sinh đầy đủ, CCCD, mã bệnh án. Tự điền vào mọi bảng điểm và tự chỉnh liều theo thận/gan/cân nặng.
- **5 khóa an toàn (chặn thật):** MAP/noradrenalin (không nhập MAP thì không cho tính; MAP 58 báo đỏ dưới mục tiêu ≥ 65); Kali/DKA (không nhập ceton/HCO₃/Na hiệu chỉnh, không hỏi suy tim/thận thì không cho tính; suy tim/thận → dịch 10 mL/kg); Dị ứng/MRSA (kháng sinh kinh nghiệm khóa tới khi chọn đủ); ESBL (HAP/VAP nguy cơ cao ép meropenem, chặn pip-tazo/cefepime kèm MERINO); SOFA (khoảng vận mạch ≥ 1 giờ + SOFA-2 song song).
- **10 công cụ mới:** SOFA-2, MEWS, Rumack–Matthew + NAC, MELD 3.0, HEART Pathway, Osmolal gap, CIWA-Ar, ASPECTS, Tìm theo hội chứng, Cây kiến thức toàn bộ.
- **6 phác đồ cây mới:** ngộ độc paraquat, ngộ độc phosphua nhôm, sốt xuất huyết nặng, ngộ độc nấm/cá nóc/mật cá trắm, bundle ABCDEF (PADIS 2025), HAP/VAP — khóa ESBL.
- **Cây kiến thức toàn bộ:** 4 lĩnh vực, 34 nhánh + 4 nhánh Nền tảng & Kinh điển, 12 thay đổi lớn 2024–2026, bảng giải độc 16 dòng, bảng EXTRIP, mục "Chưa xác minh được". Các mục P1/P2 chưa làm máy tính tương tác có trong cây dạng tra cứu có cấu trúc, ghi rõ sẽ nâng lên tương tác ở đợt sau.
- **Chống độc Việt Nam:** phospho hữu cơ, paraquat, methanol/ethylene glycol, phosphua nhôm, rắn cắn (IVAC), dengue nặng, nấm/cá nóc/mật cá trắm. Nguồn gốc: Hướng dẫn Bộ Y tế (QĐ 3610/QĐ-BYT), Trung tâm Chống độc Bạch Mai, Eddleston Lancet 2008, EXTRIP — không dẫn qua trang trung gian.
- **Pháp lý:** màn hình xác nhận "Tôi là nhân viên y tế" lúc mở lần đầu; Disclaimer/Điều khoản/Bảo mật/Giấy phép trong Cài đặt; banner cảnh báo khi nội dung quá 12 tháng chưa rà lại. Bộ file pháp lý (LICENSE MIT + phụ lục miễn trừ y khoa, TERMS.md, DISCLAIMER.md, PRIVACY.md) là bản nháp cần luật sư y tế rà lại.
- **Giao diện:** 3 chế độ Cấp cứu (đỏ) / Hồi sức (xanh) / Tra cứu, chế độ đêm, nút to dùng một tay, thêm được vào màn hình chính (không còn chế độ offline từ v2.5.0).

## Nội dung (giữ nguyên từ v1.0.0)
- **91 công cụ • 41 phác đồ (132 mục)**: SOFA, SOFA-2, qSOFA, NEWS2, MEWS, APACHE II, mNUTRIC, kê đơn dinh dưỡng ICU, CRRT, dịch hồi sức, quy đổi opioid; GCS, RASS, CAM-ICU, NIHSS, ASPECTS, ICH score, ABCD², FOUR; P/F – ARDS, ROX, IBW/Vt, khí máu động mạch, cơ học thở máy, PSI/PORT; eGFR & Cockcroft–Gault, Anion Gap, AKI KDIGO, điều chỉnh natri, FENa/FEUrea, bù K/Mg; MAP/Shock Index/Lactate, CHA₂DS₂-VA & HAS-BLED, HEART, HEART Pathway, QTc, GRACE, TIMI, liều DOAC; CURB-65, Child–Pugh & MELD 3.0, Wells PE, Geneva, PERC, sPESI, BMI/BSA, Glasgow–Blatchford, Rockall, AIMS65, BISAP, Ranson, Maddrey, Lille, FIB-4 & APRI, NAFLD Fibrosis Score, Padua, Caprini, DKA, quy đổi corticoid; suy tim HFrEF, 4Ts, ISTH DIC, PLASMIC, Burch-Wartofsky, CPIS, Hunt-Hess & WFNS, BODE, ECOG, Charlson, CFS, 4AT, STOP-BANG, Barthel, Braden.
- **Bộ tính liều truyền thuốc ICU — 17 thuốc**: vận mạch (noradrenaline, adrenaline, dobutamine, dopamine, vasopressin, phenylephrine), an thần – giảm đau (propofol, midazolam, fentanyl, morphine, dexmedetomidine), insulin, heparin, nicardipine, nitroglycerin, amiodarone, furosemide.
- **3 checklist tại giường**: Sepsis giờ đầu, VAP bundle, SAT/SBT cai máy.
- **41 phác đồ dạng cây quyết định**: hồi sức, cấp cứu, chống độc (xem trong app, tab Phác đồ).
- **Tra cứu thuốc**: gõ biệt dược hoặc hoạt chất thông dụng tại Việt Nam (82 hoạt chất) để biết hoạt chất và mở công cụ liên quan.
- **📖 Sổ tay thuốc**: hướng dẫn sử dụng rút gọn 273 thuốc (chỉ định, liều, cách pha – dùng, chống chỉ định, tác dụng phụ, thai kỳ).
- **📰 Bản tin**: 30 nghiên cứu mới nhất kiểu Feed (thẻ có ảnh minh hoạ, mới nhất lên đầu) từ NEJM, JAMA, The Lancet, European Heart Journal, BMJ, Annals of Internal Medicine, Critical Care, Intensive Care Medicine và CHEST — cập nhật theo từng phiên bản app.
- **Module kháng sinh**: wizard 5 bước (hội chứng → mức độ nặng → dị ứng penicillin → cây hỏi nguy cơ MRSA/ESBL → thận/gan) + khuyến cáo kinh nghiệm theo hội chứng + liều theo CrCl, chức năng gan và mức độ bệnh cho 36 kháng sinh / kháng nấm — khóa dị ứng penicillin/MRSA và khóa ESBL; mỗi thuốc chính có thuốc thay thế cùng phổ kèm liều đầy đủ.

## Nguyên tắc
- Mọi tính toán chạy trên máy, không gửi dữ liệu bệnh nhân đi đâu. Hồ sơ ca chỉ sống trong RAM và tự xóa sau 15 phút.
- Mỗi công cụ ghi nguồn tham khảo và ngày rà soát nội dung; DOI kiểm chứng qua Crossref.
- Chỉ hỗ trợ quyết định — không thay thế đánh giá lâm sàng và phác đồ của bệnh viện.

## Báo lỗi / góp ý
Dùng nút **⚑** trong từng công cụ hoặc **💬 Báo lỗi / Góp ý** ở trang chủ — app mở sẵn GitHub Issue theo mẫu. Không ghi thông tin định danh bệnh nhân.

## Phát triển
- Một file `index.html` (HTML + CSS + JS), `sw.js` (bản tự gỡ service worker cũ — không còn offline), `manifest.webmanifest` và icon.
- Phát hành bản mới: sửa `APP_VERSION`, `APP_DATE`, `CHANGELOG` ở đầu script trong `index.html` (service worker tự lấy phiên bản), cập nhật `CHANGELOG.md` và README.
- Kiểm thử v2.0.1: `node test_v200.js` (harness Node + DOM giả lập, 64 ca — đều đạt, gồm 21 ca hồi quy v2.0.1) và `node --check` cho từng block `<script>`. Kiểm thử v1.0.0: `node tests/run-tests.js`.
- Kế hoạch: [docs/ROADMAP-GIAI-DOAN-2-3.md](docs/ROADMAP-GIAI-DOAN-2-3.md). GitHub là bản chính.

## Hạn chế đã biết (v2.0.1)
- Các mục P1/P2 trong cây kiến thức chỉ ở dạng tra cứu có cấu trúc, chưa phải máy tính tương tác.
- KDIGO AKI/AKD 2026 bản cuối, ESC PE cập nhật, hướng dẫn BYT Việt Nam toàn văn và ERC 2025 chưa kiểm chứng bản chính.
- Chưa kiểm chứng trên trình duyệt thật trong môi trường build (không có Chromium) — cần kiểm chứng live trên điện thoại sau khi đẩy GitHub Pages, đặc biệt SOFA-2 (ca 11/24) và 7 công cụ mới còn lại.
