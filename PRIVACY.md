# Chính sách bảo mật — Công cụ Nội khoa & Hồi sức

**Phiên bản:** v2.0 (bản nháp)
**Ngày:** 18/11/2026
**Repo:** Hoangviet1397/noi-khoa-hoi-suc

> **Lưu ý:** Đây là bản nháp. Cần luật sư y tế rà lại trước khi phát hành rộng. Văn bản này không phải là tư vấn pháp lý.

## 1. Nguyên tắc chung: không thu thập dữ liệu bệnh nhân

Ứng dụng “Công cụ Nội khoa & Hồi sức” được thiết kế theo nguyên tắc **không thu thập dữ liệu cá nhân và dữ liệu sức khỏe của bệnh nhân**.

Cụ thể:
- Ứng dụng **không có tài khoản, không có máy chủ lưu trữ dữ liệu người dùng**.
- Ứng dụng **không thu thập, không lưu lên máy chủ, không chia sẻ và không bán** dữ liệu bệnh nhân.
- Mọi tính toán (bảng điểm, liều thuốc, phác đồ) chỉ thực hiện **trên thiết bị của người dùng**.

Chính sách này áp dụng cho cả bản PWA cài trên màn hình chính và bản file HTML offline đã tải về máy.

## 2. Hồ sơ ca trong v2.0 — chỉ sống trong RAM, tự xóa

2.1. Thanh Hồ sơ ca trong v2.0 chỉ lưu trong bộ nhớ tạm (RAM) của thiết bị trong phiên làm việc, **tự xóa sau 15 phút không tương tác hoặc khi khóa màn hình**. Người dùng cũng có thể bấm nút “Xóa ca” để xóa ngay.
2.2. Ứng dụng **không yêu cầu và không cho phép nhập** thông tin định danh bệnh nhân: tên, ngày sinh đầy đủ, số CCCD, mã bệnh án, địa chỉ, số điện thoại.
2.3. Chỉ nhập các thông tin cần để tính liều: tuổi, cân nặng, eGFR/CrCl, chức năng gan, dị ứng, nguy cơ MRSA/ESBL, thai kỳ. Các thông tin này không được gửi đi đâu, không được lưu lâu dài và không được đồng bộ lên cloud.
2.4. Người dùng không được dùng Hồ sơ ca để lưu danh sách bệnh nhân hay hồ sơ bệnh án.

## 3. Không tracker, không quảng cáo, không tài nguyên ngoài

3.1. Ứng dụng **không dùng tracker, không dùng công cụ phân tích hành vi, không có quảng cáo**.
3.2. Ứng dụng **không tải font, script hay hình ảnh từ máy chủ ngoài** trong quá trình sử dụng chính. Ứng dụng dùng font hệ thống và tự chứa trong một file / gói PWA, để dùng được offline và để không gửi yêu cầu mạng không cần thiết.
3.3. Ngoại lệ duy nhất: mục Bản tin tải bài nghiên cứu mới qua RSS từ các tạp chí (NEJM, JAMA, Lancet, European Heart Journal) khi thiết bị có mạng và khi người dùng mở mục Bản tin. Việc tải RSS này không gửi dữ liệu bệnh nhân đi. Người dùng có thể không mở mục Bản tin.
3.4. Mã QR chia sẻ ứng dụng được tạo ngay trên thiết bị, không gọi API ngoài.

## 4. Góp ý và báo lỗi — không được chứa thông tin bệnh nhân

4.1. Khi gửi góp ý qua nút “Báo lỗi / Góp ý” trong ứng dụng hoặc qua GitHub Issue, người dùng **không được gửi thông tin bệnh nhân** (tên, ngày sinh, mã bệnh án, số liệu gắn với một bệnh nhân cụ thể có thể định danh).
4.2. Chỉ gửi: tên công cụ / phác đồ, số liệu đã ẩn danh dùng để tái hiện lỗi (nếu cần), kết quả hiển thị và kết quả mong đợi, phiên bản ứng dụng.
4.3. Nếu góp ý có chứa thông tin bệnh nhân, chủ dự án sẽ **xóa nội dung đó** và nhắc người gửi gửi lại bản đã ẩn danh. Chủ dự án không chịu trách nhiệm về thông tin bệnh nhân do người dùng tự ý đăng lên kênh công khai.
4.4. Địa chỉ email liên hệ sẽ được bổ sung trước khi phát hành rộng; hiện tại liên hệ qua GitHub Issue của repo.

## 5. Dữ liệu nào ứng dụng có lưu trên máy?

Ứng dụng có thể lưu trên thiết bị của người dùng, chỉ ở trên máy đó:
- phiên bản ứng dụng và ngày cập nhật nội dung;
- tùy chọn hiển thị (ví dụ chế độ tối, tab đã chọn);
- bài nghiên cứu đã đọc trong mục Bản tin (chỉ lưu trạng thái đã đọc, không lưu dữ liệu bệnh nhân).

Người dùng có thể xóa toàn bộ dữ liệu này bằng cách xóa bộ nhớ / gỡ cài đặt PWA trên thiết bị.

## 6. Căn cứ pháp lý tham chiếu

Chính sách này được soạn có tham chiếu tới:
- **Nghị định 13/2023/NĐ-CP** về bảo vệ dữ liệu cá nhân — dữ liệu sức khỏe là dữ liệu cá nhân nhạy cảm, cần được bảo vệ đặc biệt. Vì ứng dụng không thu thập dữ liệu sức khỏe của bệnh nhân lên máy chủ, ứng dụng tránh được phần lớn nghĩa vụ thu thập và xử lý dữ liệu nhạy cảm. Người dùng vẫn phải tuân thủ Nghị định này khi tự xử lý dữ liệu bệnh nhân ngoài ứng dụng.
- **Nghị định 98/2021/NĐ-CP** về quản lý trang thiết bị y tế — ứng dụng được định vị là tài liệu tham khảo giáo dục cho nhân viên y tế, không phải thiết bị y tế, không chẩn đoán hay điều trị thay bác sĩ. Xem DISCLAIMER.md mục 1 và TERMS.md mục 2.
- **Luật Khám bệnh, chữa bệnh 2023 (Luật số 15/2023/QH15)** — bác sĩ chịu trách nhiệm về quyết định khám chữa bệnh của mình; ứng dụng không thay thế trách nhiệm đó.

Danh sách trên chỉ là tham chiếu. Nếu pháp luật thay đổi hay khi phát hành rộng, cần rà lại chính sách này.

## 7. Bảo mật thiết bị — trách nhiệm của người dùng

Vì dữ liệu Hồ sơ ca chỉ ở trên máy, người dùng phải tự bảo vệ thiết bị của mình:
- đặt khóa màn hình (PIN / vân tay / khuôn mặt);
- không cho người khác mượn máy khi đang mở Hồ sơ ca;
- không chụp màn hình phần Hồ sơ ca để gửi qua nhóm chat;
- xóa ca ngay sau khi hết ca trực.

## 8. Quyền của người dùng

Vì ứng dụng không thu thập dữ liệu cá nhân lên máy chủ, không có dữ liệu cá nhân nào trên máy chủ để yêu cầu truy cập, chỉnh sửa hay xóa. Dữ liệu lưu trên máy do người dùng tự quản lý và tự xóa theo mục 5.

Nếu người dùng gửi góp ý có chứa dữ liệu cá nhân của chính mình, người dùng có thể yêu cầu xóa góp ý đó qua GitHub Issue.

## 9. Thay đổi chính sách

Chính sách này có thể được cập nhật theo từng phiên bản. Bản đang hiển thị trong ứng dụng là bản áp dụng cho phiên bản đó. Ngày và phiên bản được ghi ở đầu văn bản.

## 10. Liên hệ

Liên hệ về bảo mật qua GitHub Issue của repo Hoangviet1397/noi-khoa-hoi-suc. **Không gửi thông tin bệnh nhân.** Địa chỉ email liên hệ sẽ được bổ sung trước khi phát hành rộng.

---

*Bản nháp v2.0 — 18/11/2026. Cần luật sư y tế rà lại trước khi phát hành rộng.*
