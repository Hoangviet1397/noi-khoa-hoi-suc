# Có gì mới

Số phiên bản và nội dung này cũng hiển thị trong app (chân trang → "Có gì mới").
Khi phát hành bản mới: sửa `APP_VERSION`, `APP_DATE` và thêm mục vào `CHANGELOG` ở đầu phần script trong `index.html`
rồi cập nhật file này. (Lưu ý: từ v2.5.0 app đã bỏ chế độ offline — không còn service worker.)

## v2.7.0 — 18/11/2026 — Module kháng sinh: wizard 5 bước + thuốc thay thế + dọn link hscc.vn

- **Wizard 5 bước thay toàn bộ page kháng sinh:** một câu hỏi một màn hình, đáp án là nút bấm lớn (không checkbox): ① hội chứng (7 thẻ lớn) → ② mức độ nặng → ③ dị ứng penicillin (bắt buộc, không mặc định) → ④ cây hỏi nguy cơ MRSA/ESBL v2.6.1 → ⑤ thận/gan (chỉ hỏi khi cần chỉnh liều, lấy sẵn từ Hồ sơ ca) → kết quả: phác đồ kinh nghiệm + bảng “Liều từng thuốc” + giải thích “vì sao dùng thuốc này” + thuốc thay thế. Thanh tiến trình “Bước X/5” + dải tóm tắt dính (chạm để nhảy về sửa; đổi đáp án thì tính lại và hiện rõ điều đã đổi). Bảng liều chỉ hiện sau khi chốt phác đồ.
- **Sửa 3 lỗi v2.6.1:** (a) nhánh “Có cả hai” quay lại/sửa/làm lại được; “Xóa dữ liệu đã lưu” đặt lại được cây kháng sinh; (b) dòng “đã mở khóa” chỉ hiện khi thực sự đã mở khóa; (c) bộ đếm “Đã trả lời N câu” khớp đúng số câu đã trả lời.
- **Dọn sạch link hscc.vn:** thay bằng nguồn gốc — Rumack 1975 (DOI 10.1542/peds.55.6.871), EXTRIP 2014 (DOI 10.3109/15563650.2014.946994), Eddleston Lancet 2008 (PMC2493390), Hướng dẫn Bộ Y tế QĐ 3610/QĐ-BYT (31/08/2015), Hội HSCC&CĐ VN 2020 (giữ trích dẫn dạng text, bỏ link) — hoặc bỏ link khi không xác định được nguồn gốc.
- **Thuốc thay thế:** 36 kháng sinh/kháng nấm trong bảng liều (thêm Aztreonam, Ertapenem, Cefotaxime, Ceftazidime, Nitrofurantoin, Fosfomycin, Cephalexin, Moxifloxacin, Meropenem–Vaborbactam); mỗi thuốc chính có 1–2 thuốc thay thế cùng phổ theo đúng guideline đã trích dẫn cho phác đồ đó, kèm liều đầy đủ đã chỉnh theo thận/gan; thuốc thay thế cũng bị gạch khi không dùng được cho bệnh nhân (dị ứng/ESBL).

## v2.6.1 — 18/11/2026 — Module kháng sinh: bước ③ làm lại kiểu cây phác đồ

- **Cây hỏi nguy cơ kháng thuốc thay 2 checklist:** bước ③ của module kháng sinh giờ hỏi từng bước, một câu một thẻ (giống phác đồ cây): tiền sử nhiễm/mang MRSA hoặc ESBL → nằm viện/ICU/dưỡng lão 90 ngày → kháng sinh phổ rộng gần đây → sonde tiểu/thủ thuật xâm lấn → lọc máu/vết thương mạn/viêm phổi nặng. Mỗi yếu tố chỉ hỏi đúng một lần — sửa đúng điểm Việt chê ở v2.6.0 (câu nằm viện và dùng kháng sinh bị hỏi lặp 2–3 lần ở cả 2 checklist, khó dùng trên điện thoại).
- **Rẽ nhánh:** tiền sử "Có cả hai" thì chốt luôn cả hai nguy cơ cao; "Có ESBL" thì bỏ qua câu sonde tiểu; "Có MRSA" thì bỏ qua câu lọc máu/vết thương. Các câu đã trả lời xếp thành danh sách, chạm để quay lại sửa; có nút làm lại từ đầu. Kết luận hiện rõ cả hai nguy cơ cùng lý do.
- **Quy tắc giữ như v2.6.0:** 1 yếu tố "Có" là cao, toàn "Không" mới thấp, có "Không biết" là "chưa rõ"; "Không biết" không bao giờ tính là thấp; "chưa rõ" mặc định theo mức nặng nhẹ (nặng phủ rộng chờ cấy, nhẹ dùng phác đồ chuẩn).
- **Sửa lỗi đường tắt "Tôi đã biết nguy cơ":** trước đây vào đường tắt app giữ nguy cơ cũ (mặc định THẤP) trước khi người dùng chọn — nay vào đường tắt thì trống, phải bấm Cao hoặc Thấp mới tính.
- **Kiểm tra:** test harness 4.151 kiểm tra đều đạt (thêm hồi quy cây hỏi v2.6.1: rẽ nhánh, 1 Có → cao, Không biết → chưa rõ, khóa, đường tắt không mặc định).

## v2.6.0 — 18/11/2026 — Bản tin kiểu Feed (30 bài, ảnh minh hoạ) + checklist nguy cơ MRSA/ESBL

- **Bản tin làm lại kiểu Feed:** 30 bài Nghiên cứu mới mới nhất (thêm 20 bài), thẻ bài có ảnh minh hoạ lớn phía trên, tiêu đề tiếng Việt, tóm tắt 2–3 câu, nguồn + ngày đăng, huy hiệu “Mới” cho bài chưa đọc; sắp xếp nghiêm theo ngày xuất bản, mới nhất lên đầu. Chạm thẻ mở toàn văn và đánh dấu đã đọc; giữ nguyên lọc theo chuyên mục, tìm kiếm và đánh dấu đã đọc.
- **Thêm 5 nguồn tạp chí mới** (xác minh RSS/PubMed lấy được thật ngày 18/11/2026): BMJ (RSS trực tiếp), Annals of Internal Medicine, Critical Care, Intensive Care Medicine, CHEST (qua PubMed E-utilities — RSS trực tiếp của 4 tạp chí này trả 403/404/500). Tổng 9 nguồn cùng NEJM, JAMA, The Lancet, European Heart Journal.
- **Ảnh minh hoạ cho từng bài:** 3 bài Critical Care dùng hình Fig. 1 của chính bài báo (media.springernature.com — link ổn định, không hết hạn); các bài khác dùng ảnh minh hoạ theo chủ đề do app tự vẽ (gradient + nhãn chủ đề), ghi rõ “Ảnh minh hoạ”. Thêm trường `img` vào schema mục feed và ghi chú schema trong repo (ghi chú trước `FEED` trong `index.html`) để bộ cập nhật định kỳ thêm bài có ảnh đúng chuẩn.
- **Module kháng sinh — checklist nguy cơ MRSA/ESBL:** thay 2 câu hỏi trừu tượng bằng checklist yếu tố nguy cơ cụ thể, mỗi yếu tố Có / Không / Không biết (MRSA: từng nhiễm/mang MRSA, nằm viện/dưỡng lão/lọc máu 90 ngày qua, dùng kháng sinh gần đây, vết thương mạn/tổn thương da; ESBL: từng nhiễm/mang ESBL, nằm viện/dưỡng lão 90 ngày qua, dùng cephalosporin/fluoroquinolon gần đây, sonde tiểu, nhiễm trùng tiểu tái phát). Câu “từng nhiễm/mang” kèm gợi ý tra cứu: kết quả cấy cũ, giấy ra viện, hỏi người nhà, hệ thống xét nghiệm của bệnh viện. App tự tính nguy cơ và hiện lý do; 1 tick “Có” là cao, toàn “Không” mới là thấp, còn lại là “chưa rõ”. “Không biết” không bao giờ tính là thấp: nhiễm trùng nặng thì phủ rộng chờ cấy rồi hạ thang (nghi MRSA thêm vancomycin/linezolid, nghi ESBL dùng meropenem), nhiễm trùng nhẹ thì dùng phác đồ chuẩn kèm nhắc xem lại khi có cấy. Nút “Tôi đã biết nguy cơ” cho chọn thẳng cao/thấp. Phác đồ kinh nghiệm và bảng “Liều từng thuốc” vẫn khóa cho tới khi nguy cơ được xác định; cách gạch thuốc không dùng được giữ như v2.0.2. Không đổi liều thuốc hay nội dung guideline.
- **Kiểm tra:** test harness 4.122 kiểm tra đều đạt (thêm hồi quy feed v2.6.0 và checklist MRSA/ESBL); kiểm tra smoke render feed: 30 thẻ, mới nhất lên đầu, đủ nhãn ảnh/huy hiệu.

## v2.5.1 — 18/11/2026 — Khóa 3 áp dụng cho bảng liều + sửa link #/tin-tuc

- **Khóa 3 (dị ứng / MRSA / ESBL) áp dụng thật cho cả bảng liều:** trước đây phác đồ kinh nghiệm đã khóa khi chưa trả lời 3 câu an toàn, nhưng bảng "Liều từng thuốc" vẫn hiện liều từng thuốc. Nay bảng liều cũng khóa cho tới khi trả lời đủ dị ứng penicillin, nguy cơ MRSA và nguy cơ ESBL — sau đó mới gạch thuốc không dùng được như phác đồ.
- **Sửa lỗi điều hướng:** mở `#/tin-tuc` trước đây quay về trang chủ — nay `#/tin-tuc` mở đúng trang Bản tin như `#/feed`.

## v2.5.0 — 18/11/2026 — Bỏ chế độ offline

- **Bỏ chế độ offline:** gỡ service worker lưu app vào máy và bỏ nút "⬇ Tải file offline (dự phòng)". App luôn tải bản mới nhất mỗi lần mở (cần mạng), tránh trường hợp dùng nhầm bản cũ khi liều / phác đồ đã được sửa.
- `sw.js` thay bằng bản **tự gỡ**: máy đã cài bản cũ, ở lần mở kế tiếp có mạng, tự xóa toàn bộ bộ nhớ đệm, gỡ service worker và tải lại trang mới. index.html cũng chủ động gỡ đăng ký và xóa bộ nhớ đệm cũ. Giữ file `sw.js` này vài tháng để mọi máy kịp tự gỡ.
- **Giữ nút thêm vào màn hình chính:** vẫn có icon mở 1 chạm như app (cần mạng). Sửa toàn bộ chữ "dùng được khi mất mạng" trong app, hướng dẫn, manifest, README, PRIVACY / TERMS / DISCLAIMER.

## v2.4.0 — 18/11/2026 — Sổ tay thuốc: 273 thuốc

- **Thêm 191 thuốc nội khoa thông dụng tại Việt Nam** (từ 82 lên 273), mỗi thuốc đủ: biệt dược (tìm được bằng tên thương mại), chỉ định, liều người lớn (kèm chỉnh liều thận / gan khi cần), cách dùng, chống chỉ định – thận trọng, tác dụng phụ – theo dõi, thai kỳ, và nút mở công cụ / phác đồ liên quan.
- **Đợt bổ sung thứ hai (98 thuốc):** nitrat, trimetazidine, captopril, methyldopa, hydralazine, valsartan, irbesartan, candesartan, propranolol, esmolol, fenofibrate, ezetimibe, fondaparinux, prasugrel, milrinone, torasemide, isoprenaline; glimepiride, linagliptin, vildagliptin, acarbose, pioglitazone, semaglutide, insulin degludec / detemir; famotidine, sucralfate, bismuth (phác đồ 4 thuốc diệt H. pylori), Buscopan, No-Spa, Smecta, Oresol, loperamide, ursodeoxycholic, Hepa-Merz, silibinin, macrogol, mesalazine; montelukast, ambroxol; amoxicillin, cephalexin, teicoplanin, **thuốc lao hàng 1 (INH, rifampicin, pyrazinamide, ethambutol)**, itraconazole, micafungin, albendazole, **artesunate, DHA-piperaquine, primaquine**, **tenofovir, entecavir**, valacyclovir, ganciclovir, **TLD (HIV)**, **fosfomycin tĩnh mạch** (Fosmicin, Infectofos — phối hợp cho vi khuẩn đa kháng); carbamazepine (nhắc HLA-B*15:02), pregabalin, amitriptyline, sertraline, mirtazapine, olanzapine, risperidone, donepezil, Madopar, betahistine; chlorpheniramine, diphenhydramine, cetirizine, fexofenadine, hydroxychloroquine, IVIg; acid folic, vitamin B12, sắt uống, G-CSF, **PCC, idarucizumab**, desmopressin; fludrocortisone, calcitriol, calci + vitamin D3, EPO, sevelamer, tamsulosin, acetazolamide; **NaCl 0,9%, Ringer lactat, Glucose 5%, gelatin**; nhũ dịch lipid 20%, huyết thanh kháng nọc rắn, fomepizole, calci folinat, dantrolene, sugammadex, paracetamol + codein. Bộ lọc Sổ tay thêm nhóm "Dị ứng – miễn dịch".
- **Module kháng sinh làm lại cho dễ dùng** (trước dài ~23.700 px ≈ 30 màn hình điện thoại): 3 bước rõ ràng — ① hội chứng, ② CrCl / gan / mức độ, ③ dị ứng – MRSA – ESBL; dòng "Đang tính cho…" dính trên đầu khi cuộn; phác đồ kinh nghiệm lên trước bảng liều; mỗi thuốc chỉ hiện **liều đúng mức CrCl đang chọn**, chạm để xem liều nạp, mọi mức CrCl, chỉnh theo gan, lưu ý; 7 nguyên tắc an toàn thu thành 1 dòng (chạm để mở).
- **Tim mạch:** bisoprolol, metoprolol, carvedilol, amlodipine, nifedipine, perindopril, enalapril, losartan, telmisartan, sacubitril/valsartan, spironolactone, hydrochlorothiazide, indapamide, atorvastatin, rosuvastatin, digoxin, warfarin, acenocoumarol, diltiazem, verapamil, adenosine, ivabradine, urapidil, labetalol, levosimendan.
- **Đái tháo đường:** metformin, gliclazide, sitagliptin, empagliflozin, dapagliflozin, insulin glargine, insulin aspart / lispro, insulin hỗn hợp 30/70.
- **Hô hấp:** budesonide/formoterol, salmeterol/fluticasone, tiotropium, budesonide khí dung, aminophylline / theophylline.
- **Tiêu hóa – gan, huyết học:** omeprazole, metoclopramide, ondansetron, domperidone, lactulose, rifaximin, albumin 20%; vitamin K1, acid tranexamic, protamine, sắt sucrose.
- **Thần kinh – tâm thần:** haloperidol, quetiapine, phenobarbital, mannitol, nimodipine, thiamine, gabapentin.
- **Điện giải, gút, giảm đau, gây mê:** natri bicarbonat, glucose ưu trương, Kalimate, allopurinol (nhắc xét nghiệm HLA-B*58:01), colchicine; ibuprofen, diclofenac, ketorolac, celecoxib, nefopam, ketamine, lidocaine, rocuronium, succinylcholine.
- **Kháng sinh – kháng virus – kháng nấm:** oseltamivir, acyclovir, cefuroxime, cefixime, cefoperazone/sulbactam, ceftazidime (kèm liều melioidosis), ertapenem, moxifloxacin, tigecycline, fosfomycin, nitrofurantoin, amphotericin B (kèm Talaromyces), voriconazole.
- **Nội tiết, giải độc:** thiamazole, PTU, levothyroxine; flumazenil, than hoạt, xanh methylen, deferoxamine, hydroxocobalamin, kháng thể kháng digoxin.

## v2.3.0 — 18/11/2026 — Nối cây kiến thức, 3 công cụ + 4 phác đồ cây

- **Cây kiến thức:** hơn 35 mục 🆕 thực ra đã có công cụ / phác đồ trong app nhưng chưa được nối — nay đổi sang ✅ và có liên kết mở thẳng (HEART Pathway, hen, dengue, phản vệ, SOFA-2, NEWS2/MEWS, thở máy bảo vệ phổi, CRRT, DKA/HHS, nhịp nhanh / chậm, phospho hữu cơ, paraquat, methanol, rắn cắn, paracetamol, opioid…).
- **ADD-RS + D-dimer** — bóc tách động mạch chủ (Nazerian, Circulation 2018 — ADvISED): ADD-RS ≥ 2 chụp CTA ngay; ≤ 1 + D-dimer < 500 ng/mL loại trừ (bỏ sót ~0,3%).
- **CPOT** — đánh giá đau ở bệnh nhân không nói được (Gélinas 2006; ngưỡng > 2 theo các nghiên cứu thẩm định).
- **VIS** — chỉ số vận mạch – tăng co bóp (Gaies 2010), quy đổi vasopressin đv/phút theo cân nặng.
- **Phác đồ cây:** ngộ độc salicylate (kiềm hóa nước tiểu, chỉ định lọc máu EXTRIP 2015); ngộ độc thuốc tim mạch (calci, glucagon, insulin liều cao 1 đv/kg rồi 0,5–1 đv/kg/giờ, lipid 20% 1,5 mL/kg; DigiFab theo nhãn FDA: cấp chưa rõ lượng 20 lọ, mạn 6 lọ; bicarbonate khi QRS > 100 ms với chống trầm cảm 3 vòng); viêm màng ngoài tim – chèn ép tim (ESC); yếu cơ cấp — Guillain-Barré, cơn nhược cơ (quy tắc 20/30/40, IVIg / thay huyết tương, thuốc cần tránh).

## v2.2.0 — 18/11/2026 — 20 thang điểm + 2 phác đồ cây từ Cây kiến thức

Nâng các mục 🆕 trong Cây kiến thức toàn bộ thành công cụ tương tác (tính ngay khi chọn, có màu mức nguy cơ, diễn giải và hướng xử trí, nguồn gốc):
- **Hồi sức – cấp cứu:** ESI phân loại cấp cứu 5 mức (ESI v5); SIC — rối loạn đông máu do nhiễm trùng (Iba 2017).
- **Ung bướu – huyết học:** Hội chứng ly giải u Cairo–Bishop (kèm cảnh báo rasburicase chống chỉ định khi thiếu G6PD); MASCC sốt giảm bạch cầu hạt; Khorana huyết khối do ung thư (ASCO 2023).
- **Nhiễm trùng:** LRINEC viêm cân mạc hoại tử; Thwaites lao màng não vs vi khuẩn (Thwaites 2002, phát triển tại TP.HCM).
- **Tiêu hóa:** Oakland xuất huyết tiêu hóa dưới; Tokyo TG18 phân độ viêm đường mật cấp.
- **Thuyên tắc phổi:** YEARS (D-dimer ngưỡng 1000 / 500), Bova (PE huyết động ổn), Hestia (điều trị ngoại trú).
- **Hô hấp:** RAPID nhiễm trùng màng phổi, GAP xơ phổi vô căn, FACED giãn phế quản, Epworth buồn ngủ ban ngày.
- **Đợt 2 (đối chiếu bài gốc trước khi làm):** Duke-ISCVID 2023 viêm nội tâm mạc (Fowler, CID 2023 — chắc chắn / có thể / bác bỏ); SAPS II tiên lượng tử vong ICU (Le Gall, JAMA 1993 — kiểm chứng với bản MIMIC-IV); SLEDAI-2K hoạt động lupus (Gladman 2002 — 24 mục, tổng trọng số 105); ISS mức độ nặng chấn thương (Baker 1974). Phác đồ cây: **suy thượng thận cấp** (hydrocortisone 100 mg → 200 mg/24 giờ, liều stress, quy tắc ngày ốm — Endocrine Society 2016, Society for Endocrinology) và **ngộ độc CO / khói cháy — cyanide** (oxy 100%, hydroxocobalamin 5 g, tiêu chí oxy cao áp — ACEP, nhãn Cyanokit).
- Không đưa vào: **PPS** (bản quyền Victoria Hospice, không cho sửa đổi); **APACHE IV** (hệ số độc quyền).
- **An toàn:** chưa chọn đủ các mục thì không hiện kết luận (ô chọn mặc định "— Chọn —"); công cụ chỉ gồm tiêu chí tick (Hestia, Bova, ly giải u, Tokyo) phải tick "Đã rà đủ các tiêu chí" mới ra kết quả — tránh kết luận "ngoại trú" / "loại trừ" khi chưa nhập gì.
- Cây kiến thức: các mục trên đổi 🆕 → ✅ và có liên kết mở thẳng công cụ. Công cụ được thêm vào chuyên ngành tương ứng trên trang chủ.

## v2.1.1 — 18/11/2026 — Bản tin: 5 nghiên cứu mới

- **ECPR tiền viện ở ngừng tim ngoài viện ≤50 tuổi (OnScene, NEJM 2026):** đội trực thăng có khả năng ECPR giúp 40% sống tới khi ra viện so với 20% chăm sóc thường quy (OR 2,72); kết cục thần kinh tốt sau 6 tháng 36% so với 13%. Nghiên cứu quan sát, chưa phải thử nghiệm ngẫu nhiên.
- **Tiêu huyết khối qua catheter ở thuyên tắc phổi nguy cơ trung bình-cao (PRAGUE-26, NEJM 2026):** alteplase qua catheter + chống đông giảm biến cố chính trong 7 ngày xuống 0,7% so với 6,8% chỉ chống đông (RR 0,10), không tăng chảy máu chung; xuất huyết nội sọ 2 ca so với 0.
- **Kháng sinh toàn thân ngắn ≤7 ngày sau mổ nhiễm trùng chỉnh hình (SOLARIO, NEJM 2026):** không thua kém dài ≥4 tuần về thất bại điều trị sau 12 tháng (11,1% so với 14,1%), ít triệu chứng do thuốc hơn (17,2% so với 45,2% tới tuần 6). Chỉ áp dụng khi có đặt chất mang kháng sinh tại chỗ trong mổ.
- **Bỏ aspirin, chỉ prasugrel sau PCI tiên phát STEMI (PREMIUM, NEJM 2026):** không chứng minh được không thua kém DAPT về tử vong/đột quỵ/nhồi máu cơ tim sau 12 tháng (11,0% so với 8,5%; HR 1,34), dù chảy máu lớn ít hơn (5,6% so với 8,4%).
- **Hạ huyết áp tâm thu về <120 mmHg ở đái tháo đường type 2 (OPTIMAL-DIABETES, NEJM 2026):** không giảm biến cố tim mạch chính so với đích <140 mmHg sau 4 năm (6,0% so với 6,7%; HR 0,90; p=0,20).

## v2.1.0 — 18/11/2026 — Gọn giao diện

- **Hồ sơ ca thu gọn thành 1 dòng** trên cùng: hiện tóm tắt (vd "65 tuổi • 70 kg • CrCl 25 • phản vệ PNC") và giờ tự xóa; chạm để mở form, nút "✓ Xong — thu gọn". Chỉ hiện ở trang chủ và các công cụ dùng hồ sơ (vận mạch, DKA, kháng sinh, FIB-4, dinh dưỡng, CRRT, dịch). Trước đây form 8 ô chiếm gần nửa màn hình ở **mọi** trang, kể cả Cài đặt.
- **Bỏ hàng nút Cấp cứu / Hồi sức / Tra cứu / Đêm:** trùng chức năng với hàng lọc nhóm ngay trên (có cả nút "Hồi sức" thứ hai) và nút 🌓 đổi giao diện; "Đêm" chỉ là bật chế độ tối.
- **Bỏ tiêu đề lớn lặp** "Nội khoa & Hồi sức" (đã có trên thanh trên) — ô tìm kiếm lên ngay đầu trang; dòng chuyên ngành chuyển xuống trên danh sách công cụ.
- **Nút ❓ hướng dẫn** ở góc trên; **thẻ "Cách dùng nhanh"** 4 bước cho lần đầu mở (bấm "Đã hiểu" để ẩn). Hướng dẫn đầy đủ thêm mục Hồ sơ ca, sửa mục cỡ chữ / báo lỗi theo giao diện hiện tại (trước còn nhắc nút A đã bỏ).

## v2.0.3 — 18/11/2026 — Sửa số liệu lâm sàng

- **SOFA-2 viết lại theo đúng Bảng 2 bài gốc** (Ranzani et al., JAMA 2025; DOI 10.1001/jama.2025.20516). Bản trước dùng ngưỡng SOFA cũ cho cả 6 cơ quan. Nay: hô hấp PaO₂/FiO₂ > 300 / ≤ 300 / ≤ 225 / ≤ 150 + hỗ trợ / ≤ 75 + hỗ trợ hoặc ECMO (kèm ngưỡng SpO₂/FiO₂ 300 / 250 / 200 / 120); tim mạch theo tổng liều noradrenaline + adrenaline 0,2 / 0,4 µg/kg/phút và thuốc phối hợp, hỗ trợ cơ học = 4; gan bilirubin 1,2 / 3,0 / 6,0 / 12 mg/dL; thận creatinin 1,2 / 2,0 / 3,5 mg/dL hoặc nước tiểu, lọc máu = 4; tiểu cầu 150 / 100 / 80 / 50; não GCS 15 / 13–14 / 9–12 / 6–8 / 3–5, thuốc mê sảng = 1. Ghi đúng tác giả (Ranzani, không phải Moreno); bỏ ước tính tử vong mượn từ SOFA cũ.
- **Osmolal gap:** mặc định đơn vị mmol/L như xét nghiệm Việt Nam (2×Na + glucose + urê + ethanol), vẫn chọn được mg/dL; cảnh báo khi giá trị glucose không hợp đơn vị. Bản trước chỉ nhận mg/dL nên nhập mmol/L ra gap cao giả, báo nhầm ngộ độc methanol.
- **MELD 3.0:** creatinin chặn tối đa **3,0 mg/dL** và lọc máu tính 3,0 (bản trước 4,0 theo MELD cũ); albumin chặn 1,5–3,5 g/dL; nhập được µmol/L – g/L.
- **Rumack–Matthew:** nhập được µmol/L (÷ 6,62 ra mg/L).
- **NFS / Lille:** tự nhận albumin nhập nhầm đơn vị (NFS cần g/dL, Lille cần g/L) và ghi rõ đã quy đổi.
- **HEART Pathway:** tiêu đề kết quả không còn mâu thuẫn nội dung khi chưa xác nhận ECG; troponin lúc vào và 3 giờ theo bản gốc (Mahler 2015); troponin thay đổi ≥ 3 ng/L không xếp nguy cơ thấp.
- **ASPECTS:** 6–10 = đủ tiêu chuẩn hình ảnh cho lấy huyết khối chuẩn; 3–5 = lõi lớn, vẫn có lợi ở bệnh nhân chọn lọc (SELECT2, ANGEL-ASPECT, RESCUE-Japan LIMIT); 0–2 = bằng chứng hạn chế. Bản trước gọi ASPECTS ≤ 7 là "lõi lớn" và tô đỏ.
- **WFNS:** GCS 15 luôn là độ 1 (thiếu sót vận động chỉ tính ở GCS 13–14).
- **AIMS65:** tỉ lệ tử vong theo nghiên cứu gốc (0,3 / 1,2 / 5,3 / 10,3 / 16,5 / 24,5%).
- **Dinh dưỡng ICU:** suy thận cấp chưa lọc máu không còn hạn chế protein 0,8–1,0 — nay 1,0–1,3 g/kg/ngày; CRRT tới 1,7 g/kg/ngày; năng lượng 20–25 kcal/kg (ESPEN 2021).
- **Suy tim HFrEF:** nhắc ngừng ACE-I ít nhất 36 giờ trước liều ARNI đầu.
- **Bản tin:** bỏ dòng "cập nhật mỗi ngày" vì app không tự tải bài mới — bài được đóng gói theo từng phiên bản.

## v2.0.2 — 18/11/2026 — 5 khóa an toàn chặn thật

Rà soát mã v2.0.1 cho thấy 3/5 khóa an toàn chỉ là hình thức (chọn gì cũng ra cùng phác đồ, ô xác nhận được tick sẵn). Sửa:
- **(a) MAP:** bắt buộc nhập MAP với **mọi thuốc vận mạch / tăng co bóp** (noradrenaline, adrenaline, dopamine, dobutamine, vasopressin, phenylephrine), không chỉ noradrenaline. Sửa lỗi MAP < 65 không tô đỏ kết quả (biến mức cảnh báo bị gán lại về 0) và lỗi đổi thuốc khi đang khóa không cập nhật cách pha. Noradrenaline ≥ 0,25 µg/kg/phút → gợi ý vasopressin + hydrocortisone (SSC 2021). Dobutamine với MAP < 65 → cảnh báo cần vận mạch trước.
- **(b) DKA:** câu hỏi suy tim / suy thận nay **bắt buộc** (trước đây mặc định "Không"). Ceton, HCO₃⁻, pH dùng để **phân độ DKA nhẹ – vừa – nặng** (đồng thuận ADA/EASD/JBDS 2024), cảnh báo khi ceton < 3 hoặc không đủ toan, gợi ý ICU khi nặng / ceton > 6 / HCO₃⁻ < 5 / K⁺ < 3,5.
- **(c) Dị ứng penicillin / MRSA:** dị ứng có 4 mức (không / nhẹ / phản vệ / SJS–TEN–DRESS). Phác đồ kinh nghiệm **gạch ngang thuốc không dùng được** (penicillin; thêm cephalexin khi phản vệ; mọi beta-lactam trừ aztreonam khi SJS/TEN/DRESS) và hiện khung **"Phác đồ đã điều chỉnh"** cho từng hội chứng. MRSA cao → thêm vancomycin / linezolid; MRSA thấp trong nhiễm trùng huyết chưa rõ ổ → gạch vancomycin (SSC 2021). Bảng liều đánh dấu ⛔ thuốc không dùng được. Nguồn: AAAAI/ACAAI Drug Allergy Practice Parameter 2022.
- **(d) ESBL:** bắt buộc trả lời và áp dụng cho **mọi hội chứng** (trước chỉ HAP/VAP và chỉ hiện chữ). Nguy cơ cao → gạch ceftriaxone, cefepime, piperacillin–tazobactam, ampicillin–sulbactam, amoxicillin–clavulanate; khuyến nghị meropenem / ertapenem (MERINO; IDSA AMR Guidance 2024). ESBL + SJS/TEN/DRESS → hướng dẫn phương án không beta-lactam và hội chẩn.
- **(e) SOFA / SOFA-2:** ô "vận mạch ≥ 1 giờ" **không còn tick sẵn**; chưa xác nhận thì điểm tim mạch tính tạm = 1 và kết quả ghi "(tạm)".
- **Hồ sơ ca:** nút Xóa ca xóa luôn cân nặng, tuổi, CrCl, gan, dị ứng, MRSA, ESBL đã tự điền sang các công cụ; ca mới ghi đè giá trị tự điền cũ (trước đây bệnh nhân sau có thể bị tính theo cân nặng bệnh nhân trước). Tự điền cân nặng thêm cho dinh dưỡng, CRRT, dịch.
- Bỏ các dòng ghi chú nội bộ ("lỗi đã soi ở v0.5.0", "SOFA tụt 14→11") khỏi màn hình người dùng.

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
