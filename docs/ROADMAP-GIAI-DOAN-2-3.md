# Giai đoạn 2 + 3 — Công cụ Nội khoa & Hồi sức

> Ghi chú phối hợp Muse + Claude — 17/11/2026
> Bản hiện tại trên GitHub Pages là bản chính: 45 công cụ, 27 kháng sinh/kháng nấm,
> 15 phác đồ dạng cây, commit 6344d54 (Claude Opus 5.5).
> Bản webapp trong Muse (artifact `cong-cu-noi-khoa-hoi-suc`) đã cũ hơn — KHÔNG dùng
> bản đó để ghi đè lên repo này. Mọi thay đổi code làm trên repo này, test trên
> GitHub Pages, Muse rà soát qua Issue/PR.

## Giai đoạn 2 — Thuốc ICU và phác đồ dùng hàng ngày

### 2A. Bộ tính liều thuốc ICU (ưu tiên cao nhất)
Mỗi thuốc có cùng một mẫu giao diện: nhập cân nặng (kg, mặc định dùng cân nặng
thực tế, có cảnh báo khi BMI > 30 thì cân nhắc cân nặng hiệu chỉnh), liều đích,
nồng độ pha sẵn ở khoa, rồi tính ra tốc độ ml/giờ, tổng liều/ngày, và khoảng
chuẩn bị. Ghi rõ nguồn và giới hạn liều.

- Vận mạch / tăng co bóp: noradrenalin, adrenalin, dobutamin, dopamin,
  vasopressin, phenylephrin. Tính ml/h theo mcg/kg/phút và nồng độ pha.
  Cảnh báo liều tối đa, đường truyền (tĩnh mạch trung tâm vs ngoại vi),
  theo dõi huyết áp/MAP mục tiêu.
- An thần / giảm đau: propofol, midazolam, fentanyl, morphin, dexmedetomidin.
  Tính theo kg/giờ, cảnh báo RASS mục tiêu, thời gian truyền kéo dài.
- Insulin truyền (DKA / kiểm soát đường huyết ICU), heparin truyền,
  và các thuốc truyền thường dùng khác ở hồi sức.
- Dịch và điện giải: mở rộng phần đã có (bù K/Mg, điều chỉnh natri, DKA)
  thành bộ tính dịch hồi sức theo cân nặng và tình trạng sốc.

Tiêu chí nghiệm thu: mỗi thuốc có ít nhất 2 ca kiểm thử tính tay
(ví dụ: BN 60 kg, noradrenalin 0,1 mcg/kg/phút, pha 4 mg/50 ml → 4,5 ml/h),
hiển thị công thức và nguồn tham khảo ngay dưới kết quả.

### 2B. Checklist bundle tại giường
- Sepsis bundle 1 giờ (Surviving Sepsis Campaign 2021): cấy máu, lactate,
  kháng sinh, dịch 30 ml/kg, vận mạch khi MAP < 65.
- VAP bundle, cai máy thở / SBT, sedation vacation + SAT/SBT.
- Mỗi checklist có ô tick, lưu tạm trong phiên làm việc, nút sao chép
  tóm tắt để dán vào bệnh án. Không lưu thông tin định danh bệnh nhân.

### 2C. Thêm phác đồ dạng cây
STEMI / NSTEMI, suy tim cấp, xuất huyết tiêu hoá trên, hen / COPD cấp,
tăng kali máu nặng (đã có 1 phần thì rà soát lại). Cùng định dạng cây
quyết định như 15 phác đồ đã có, có nút quay lại từng bước.

## Giai đoạn 3 — Thành sản phẩm dùng chung

### 3A. Phản hồi và phiên bản
- Nút "Báo lỗi / Góp ý" trong app, mở sẵn GitHub Issue của repo
  `Hoangviet1397/noi-khoa-hoi-suc` với mẫu điền sẵn (tên công cụ, số liệu
  nhập, kết quả sai, ảnh chụp màn hình nếu có). Không gửi dữ liệu bệnh
  nhân lên server.
- Hiển thị phiên bản và ngày cập nhật ở chân trang (ví dụ: v0.3 — 17/11/2026),
  kèm cửa sổ "Có gì mới" (changelog) liệt kê thay đổi từng phiên bản.
  Thêm file `VERSION` hoặc trường version trong code để lần sau chỉ sửa 1 chỗ.

### 3B. Chia sẻ nhanh
- Nút "Chia sẻ app" ở trang chủ: sao chép link
  https://hoangviet1397.github.io/noi-khoa-hoi-suc/ và hiện mã QR của link
  đó, tạo QR ngay trên máy (không gọi API ngoài, để dùng được offline).
- Giữ nguyên PWA đã làm: cài vào màn hình chính, mở offline như app.
  Kiểm thử cài đặt trên iPhone (Safari → Chia sẻ → Thêm vào Màn hình chính)
  và Android (Chrome → Cài đặt ứng dụng).

### 3C. Nguyên tắc không đổi
- Mọi tính toán chạy trên máy, không gửi dữ liệu bệnh nhân đi đâu.
- Mỗi công cụ ghi nguồn tham khảo và ngày cập nhật nội dung.
- Disclaimer ở chân trang: chỉ hỗ trợ quyết định, không thay thế đánh giá
  lâm sàng và phác đồ của bệnh viện.

## Cách làm việc
1. Claude làm code local, commit lên `main`, kiểm tra trên GitHub Pages.
2. Muse rà soát lại công thức/liều qua Issue, không sửa trực tiếp file
   `index.html` trên repo nếu chưa thống nhất.
3. Mỗi lần xong một mục 2A/2B/2C thì cập nhật README (số công cụ, số thuốc)
   và changelog, tăng số phiên bản.
