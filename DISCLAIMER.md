# Tuyên bố miễn trừ y khoa — Công cụ Nội khoa & Hồi sức

**Phiên bản:** v2.0 (bản nháp)
**Ngày:** 18/11/2026
**Repo:** Hoangviet1397/noi-khoa-hoi-suc

> **Đọc trước khi dùng. Đây là bản nháp. Cần luật sư y tế rà lại trước khi phát hành rộng. Văn bản này không phải là tư vấn pháp lý hay tư vấn y khoa cho một bệnh nhân cụ thể.**

## 1. Ứng dụng không phải là thiết bị y tế

Ứng dụng “Công cụ Nội khoa & Hồi sức” là tài liệu tham khảo giáo dục dành cho nhân viên y tế. Ứng dụng không phải là thiết bị y tế, không thực hiện chẩn đoán, không kê đơn và không điều trị bệnh.

Ứng dụng không thay thế:
- phán đoán lâm sàng của bác sĩ điều trị;
- phác đồ, quy trình của bệnh viện nơi người dùng làm việc;
- tờ hướng dẫn sử dụng thuốc của nhà sản xuất;
- tư vấn trực tiếp của Trung tâm Chống độc hay bác sĩ chuyên khoa trong trường hợp khẩn cấp.

## 2. Bác sĩ chịu trách nhiệm cuối cùng

Quyết định chẩn đoán và điều trị cuối cùng thuộc về bác sĩ điều trị, người trực tiếp thăm khám bệnh nhân. Tác giả và những người đóng góp cho ứng dụng không chịu trách nhiệm về quyết định điều trị của người dùng.

Nếu kết quả trong ứng dụng mâu thuẫn với tình trạng thực tế của bệnh nhân, với phác đồ bệnh viện hay với hướng dẫn sử dụng thuốc, người dùng phải ưu tiên tình trạng thực tế, phác đồ bệnh viện và hướng dẫn sử dụng thuốc.

## 3. Không bảo đảm tính chính xác hay cập nhật

Các bảng điểm, phác đồ, liều thuốc và gợi ý trong ứng dụng được cung cấp “nguyên trạng” (AS IS), kèm nguồn guideline và ngày rà soát. Y khoa thay đổi liên tục. Tác giả không bảo đảm nội dung luôn chính xác, đầy đủ hay cập nhật tại thời điểm người dùng tra cứu.

Người dùng phải kiểm chứng lại trước khi dùng tại giường bệnh:
- liều, đường dùng, chống chỉ định, tương tác thuốc;
- nguồn guideline và năm ban hành;
- ngày rà soát ghi trong từng mục;
- chức năng thận, gan, dị ứng, thai kỳ và thuốc đang dùng của bệnh nhân.

## 4. Ngày hết hạn rà soát 12 tháng

4.1. Mỗi mục nội dung y khoa có ngày rà soát. Hạn rà soát là **12 tháng** kể từ ngày đó.
4.2. Quá hạn mà chưa rà lại, ứng dụng sẽ hiển thị cảnh báo “nội dung này chưa rà lại”. Người dùng phải kiểm chứng lại với guideline hiện hành trước khi dùng nội dung quá hạn.
4.3. Khi guideline mới thay thế bản cũ (ví dụ SSC 2026 thay SSC 2021, CHA₂DS₂-VA thay CHA₂DS₂-VASc, MASLD thay NAFLD), ứng dụng cập nhật và ghi rõ trong changelog. Bản offline đã tải về máy không tự cập nhật — người dùng phải kiểm tra phiên bản mới nhất.

## 5. Quy trình thu hồi và cảnh báo phiên bản

5.1. Nếu phát hiện nội dung sai, chủ dự án sẽ sửa trong phiên bản mới, ghi vào changelog và, khi thiết bị có mạng, hiển thị cảnh báo phiên bản trong ứng dụng.
5.2. Vì không thể thu hồi file offline đã tải về máy người dùng, cảnh báo phiên bản và changelog là biện pháp chính. Người dùng có trách nhiệm kiểm tra phiên bản mới nhất trước khi dùng cho bệnh nhân.
5.3. Người dùng phát hiện lỗi phải báo qua nút “Báo lỗi / Góp ý” trong ứng dụng hoặc GitHub Issue, **không kèm thông tin bệnh nhân**. Xem TERMS.md mục 13 và PRIVACY.md.

## 6. Giới hạn của tính năng AI (v2.0)

6.1. Tính năng AI trong v2.0 (nếu được bật) chỉ tìm kiếm và trích nguồn guideline từ nội dung đã có trong ứng dụng. AI không tự chẩn đoán, không tự kê đơn và không ra quyết định điều trị.
6.2. AI có thể sai, có thể trích sai nguồn, có thể đưa ra liều hay khuyến cáo không phù hợp với bệnh nhân cụ thể. Mọi kết quả do AI đưa ra phải được con người kiểm chứng lại với nguồn gốc và với tình trạng bệnh nhân trước khi dùng.
6.3. Không nhập thông tin định danh bệnh nhân vào tính năng AI. Chỉ dùng các thông tin đã ẩn danh theo đúng thiết kế Hồ sơ ca trong v2.0 (xem PRIVACY.md).

## 7. Hồ sơ ca trong v2.0 — chỉ là dữ liệu tạm trên máy

Thanh Hồ sơ ca trong v2.0 chỉ sống trong bộ nhớ tạm (RAM) của thiết bị, tự xóa sau 15 phút không tương tác hoặc khi khóa màn hình. Ứng dụng không yêu cầu và không cho phép nhập tên, số CCCD hay mã bệnh án. Chỉ nhập các thông tin cần để tính liều: tuổi, cân nặng, eGFR/CrCl, chức năng gan, dị ứng, nguy cơ MRSA/ESBL, thai kỳ. Xem PRIVACY.md.

## 8. Trường hợp khẩn cấp

Ứng dụng không thay thế cấp cứu. Trong trường hợp khẩn cấp:
- Gọi cấp cứu **115**.
- Ngộ độc: gọi Trung tâm Chống độc — Bệnh viện Bạch Mai — và làm theo hướng dẫn trực tiếp của trung tâm.
- Ngừng tim, sốc, đột quỵ: xử trí theo quy trình cấp cứu tại chỗ, không chờ tra cứu ứng dụng.

## 9. Đối tượng sử dụng

Ứng dụng chỉ dành cho nhân viên y tế. Ứng dụng không dành cho bệnh nhân hay người nhà để tự chẩn đoán hay tự điều trị. Nếu bạn không phải nhân viên y tế, hãy hỏi ý kiến bác sĩ.

## 10. Giới hạn trách nhiệm

Trong phạm vi tối đa mà pháp luật Việt Nam cho phép, tác giả và những người đóng góp không chịu trách nhiệm đối với bất kỳ thiệt hại nào phát sinh từ việc sử dụng hoặc không sử dụng được ứng dụng. Xem LICENSE Phụ lục A và TERMS.md mục 10.

---

*Bản nháp v2.0 — 18/11/2026. Cần luật sư y tế rà lại trước khi phát hành rộng.*
