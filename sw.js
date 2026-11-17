/* Service worker — Công cụ Nội khoa & Hồi sức
   Cache-first cho toàn bộ app: cài / mở lần đầu có mạng là các lần sau
   mở được ngay cả khi mất mạng hoàn toàn. Khi có mạng trở lại, bản mới
   được tải nền và thay cache ở lần mở kế tiếp. */
var CACHE = "noi-khoa-hoi-suc-v10";
var CORE = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./apple-touch-icon.png"
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      return Promise.all(CORE.map(function (u) {
        return c.add(u).catch(function () { /* thiếu 1 file không chặn cài đặt */ });
      }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        if (k !== CACHE) return caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var url;
  try { url = new URL(req.url); } catch (err) { return; }
  if (url.origin !== self.location.origin) return;

  if (req.mode === "navigate") {
    /* Điều hướng: ưu tiên mạng để nhận bản mới, rớt mạng thì dùng cache */
    e.respondWith(
      fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put("./index.html", copy); });
        return res;
      }).catch(function () {
        return caches.match("./index.html", { ignoreSearch: true })
          .then(function (hit) { return hit || caches.match("./", { ignoreSearch: true }); });
      })
    );
    return;
  }

  /* Tài nguyên tĩnh: cache-first, cập nhật nền */
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then(function (hit) {
      var net = fetch(req).then(function (res) {
        if (res && res.status === 200) {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(req, copy); });
        }
        return res;
      }).catch(function () { return hit; });
      return hit || net;
    })
  );
});
