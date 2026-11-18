/* Service worker tự gỡ — app đã bỏ chế độ offline từ v2.5.0.
   Máy nào còn service worker của bản cũ: trình duyệt kiểm tra cập nhật file này khi mở app,
   nhận bản tự gỡ → xóa toàn bộ bộ nhớ đệm, gỡ đăng ký và tải lại trang từ mạng.
   Giữ file này ít nhất vài tháng để mọi máy đã cài bản cũ kịp tự gỡ. */
self.addEventListener("install", function () { self.skipWaiting(); });
self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (keys) { return Promise.all(keys.map(function (k) { return caches.delete(k); })); })
      .then(function () { return self.registration.unregister(); })
      .then(function () { return self.clients.matchAll({ type: "window" }); })
      .then(function (clients) { clients.forEach(function (c) { try { c.navigate(c.url); } catch (err) {} }); })
  );
});
