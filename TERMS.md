# Điều khoản sử dụng — Công cụ Nội khoa & Hồi sức

**Phiên bản:** v2.0 (bản nháp)
**Ngày:** 18/11/2026
**Repo:** Hoangviet1397/noi-khoa-hoi-suc
**Áp dụng cho:** webapp PWA chạy offline trên GitHub Pages, tính toán hoàn toàn trên thiết bị người dùng.

> **Lưu ý:** Đây là bản nháp. Cần luật sư y tế rà lại trước khi phát hành rộng. Văn bản này không phải là tư vấn pháp lý.

## English summary (short)

This app is an educational reference for healthcare professionals only. It does not diagnose, prescribe, or treat, and it does not replace clinical judgment or your hospital's protocols. You must verify every dose, contraindication, source, and review date before use at the bedside. The software is provided “as is”, without warranty. Use is at your own risk. See DISCLAIMER.md and PRIVACY.md for the full terms in Vietnamese.

---

## 1. Đối tượng sử dụng

1.1. Ứng dụng chỉ dành cho **nhân viên y tế** (bác sĩ, điều dưỡng và nhân viên y tế khác trong phạm vi hành nghề của mình).
1.2. Ứng dụng **không dành cho bệnh nhân, người nhà bệnh nhân hay công chúng** để tự chẩn đoán, tự điều trị hay tự dùng thuốc.
1.3. Khi mở ứng dụng lần đầu và sau mỗi lần cập nhật phiên bản lớn, người dùng phải xác nhận: “Tôi là nhân viên y tế. Tôi đã đọc Điều khoản sử dụng và Tuyên bố miễn trừ y khoa của phiên bản này.” Nếu không xác nhận, không được sử dụng các công cụ tính toán và phác đồ.

## 2. Mục đích sử dụng — giáo dục và tham khảo

2.1. Ứng dụng cung cấp bảng điểm, công cụ tính toán, phác đồ dạng cây, tra cứu thuốc/kháng sinh và bản tin nghiên cứu mới, nhằm hỗ trợ tra cứu nhanh tại giường bệnh.
2.2. Ứng dụng **không chẩn đoán, không kê đơn, không ra quyết định điều trị thay bác sĩ**. Mọi gợi ý, kể cả gợi ý từ tính năng AI tìm kiếm/trích nguồn (nếu có), chỉ là tài liệu tham khảo.
2.3. Tính năng AI (v2.0) chỉ tìm và trích nguồn guideline, không tự chẩn đoán hay tự kê đơn. Con người quyết định cuối cùng. AI có thể sai; xem DISCLAIMER.md mục 6.

## 3. Chấp nhận đúng phiên bản

3.1. Mỗi phiên bản có số phiên bản và ngày phát hành hiển thị ở chân trang, ví dụ v2.0 — 18/11/2026.
3.2. Người dùng phải kiểm tra mình đang dùng phiên bản mới nhất trước khi áp dụng cho bệnh nhân. Bản offline đã tải về máy không tự cập nhật.
3.3. Nội dung y khoa có ngày hết hạn rà soát 12 tháng kể từ ngày rà soát ghi trong từng mục. Quá hạn mà chưa rà lại, ứng dụng sẽ hiện cảnh báo. Người dùng phải kiểm chứng lại trước khi dùng nội dung quá hạn.

## 4. Nghĩa vụ kiểm chứng của người dùng

Trước khi áp dụng bất kỳ kết quả nào, người dùng phải tự kiểm chứng:
- (a) liều, đường dùng, chống chỉ định và tương tác thuốc;
- (b) nguồn guideline và năm ban hành ghi trong từng mục;
- (c) ngày rà soát của mục đó;
- (d) tình trạng cụ thể của bệnh nhân: tuổi, cân nặng, chức năng thận (eGFR/CrCl), chức năng gan, dị ứng, thai kỳ, thuốc đang dùng;
- (e) phác đồ của bệnh viện nơi mình làm việc và tờ hướng dẫn sử dụng thuốc của nhà sản xuất.

Nếu có bất kỳ điểm nào mâu thuẫn, ưu tiên phác đồ bệnh viện và hướng dẫn sử dụng thuốc.

## 5. Các khóa an toàn trong v2.0 — không được bỏ qua

Ứng dụng v2.0 có 5 khóa an toàn: (1) MAP / noradrenalin, (2) kali / DKA, (3) dị ứng / MRSA, (4) ESBL, (5) SOFA. Các khóa này yêu cầu nhập đủ thông tin bắt buộc trước khi hiện kết quả. Người dùng không được tìm cách vượt qua, tắt hay làm sai lệch các khóa an toàn này.

## 6. Những việc bị cấm

- Dùng ứng dụng để khám, chẩn đoán hay kê đơn từ xa cho bệnh nhân.
- Nhập, lưu hay gửi thông tin định danh bệnh nhân (tên, ngày sinh đầy đủ, số CCCD, mã bệnh án, địa chỉ, số điện thoại) vào ứng dụng, vào mục Góp ý hay lên GitHub Issue.
- Sao chép, phát hành lại nội dung y khoa của ứng dụng dưới danh nghĩa bệnh viện hay cơ quan y tế.
- Dùng ứng dụng cho mục đích thương mại, quảng cáo thuốc hay thu phí người dùng khi chưa có thỏa thuận bằng văn bản với chủ dự án.
- Can thiệp, đảo ngược hay làm sai lệch kết quả tính toán, nguồn và ngày rà soát.

## 7. Không liên quan tới bệnh viện

7.1. Dự án này là dự án cá nhân, phi thương mại của chủ repo Vũ Hoàng Việt, không phải sản phẩm hay phát ngôn chính thức của Bệnh viện Kiến An hay bất kỳ cơ sở y tế nào.
7.2. Không được dùng tên, logo hay danh nghĩa của Bệnh viện Kiến An hay bất kỳ bệnh viện nào để quảng bá, chứng thực hay bảo chứng cho ứng dụng.

## 8. Nội dung, cập nhật và thu hồi

8.1. Nội dung được rà soát theo guideline đã dẫn nguồn. Khi guideline mới thay thế bản cũ, chủ dự án cập nhật và ghi rõ bản cũ đã thay thế trong changelog.
8.2. Nếu phát hiện nội dung sai, chủ dự án sẽ sửa trong phiên bản mới, ghi vào changelog và, khi có mạng, hiển thị cảnh báo phiên bản trong ứng dụng. Vì bản offline đã tải về không tự cập nhật, người dùng có trách nhiệm kiểm tra phiên bản mới nhất.
8.3. Trong trường hợp khẩn cấp về ngộ độc, gọi Trung tâm Chống độc — Bệnh viện Bạch Mai — và cấp cứu 115. Ứng dụng không thay thế tư vấn chống độc trực tiếp.

## 9. Sở hữu trí tuệ

9.1. Mã nguồn được cấp phép theo LICENSE (MIT + Phụ lục miễn trừ y khoa).
9.2. Nội dung y khoa là tóm tắt có dẫn nguồn, không sao chép nguyên văn toàn bộ guideline có bản quyền. Khi sử dụng lại, phải giữ nguồn và ngày rà soát.

## 10. Giới hạn trách nhiệm

10.1. Ứng dụng được cung cấp “nguyên trạng” (AS IS), không bảo hành dưới bất kỳ hình thức nào.
10.2. Trong phạm vi tối đa mà pháp luật Việt Nam cho phép, chủ dự án và những người đóng góp không chịu trách nhiệm đối với thiệt hại phát sinh từ việc sử dụng ứng dụng. Xem LICENSE Phụ lục A và DISCLAIMER.md.
10.3. Bác sĩ điều trị chịu trách nhiệm cuối cùng về quyết định điều trị cho bệnh nhân của mình.

## 11. Bảo mật

Ứng dụng không thu thập, không lưu lên máy chủ và không chia sẻ dữ liệu bệnh nhân. Tính toán chỉ thực hiện trên thiết bị người dùng. Xem PRIVACY.md.

## 12. Thay đổi điều khoản và luật áp dụng

12.1. Điều khoản này có thể được cập nhật theo từng phiên bản. Bản đang hiển thị trong ứng dụng là bản áp dụng cho phiên bản đó.
12.2. Điều khoản này được hiểu và áp dụng theo pháp luật Việt Nam. Mọi tranh chấp sẽ được giải quyết theo pháp luật Việt Nam.
12.3. Nếu một điều khoản bị coi là vô hiệu, các điều khoản còn lại vẫn có hiệu lực.

## 13. Liên hệ và góp ý

Góp ý về lỗi tính toán hay nội dung: dùng nút “Báo lỗi / Góp ý” trong ứng dụng hoặc GitHub Issue của repo. **Không gửi thông tin bệnh nhân trong góp ý.** Thông tin có chứa dữ liệu bệnh nhân sẽ bị xóa. Địa chỉ email liên hệ sẽ được bổ sung trước khi phát hành rộng; hiện tại liên hệ qua GitHub Issue.

---

*Bản nháp v2.0 — 18/11/2026. Cần luật sư y tế rà lại trước khi phát hành rộng.*
