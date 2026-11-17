// Kiểm thử tính toán & dữ liệu — chạy: node tests/run-tests.js
// Đọc trực tiếp index.html (không cần thư viện), kiểm tra:
//  1) Bộ tính liều truyền thuốc ICU: mọi ca kiểm tra tính tay (ex) khớp công thức, 2 chiều liều ↔ mL/giờ.
//  2) Phác đồ dạng cây: không có nút thiếu, nhánh cụt, nút không tới được, liên kết hỏng.
//  3) Checklist và đăng ký công cụ: mọi công cụ có bảng điều khiển tương ứng.
const fs = require("fs"), path = require("path"), vm = require("vm");
const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
function grab(startMarker, endMarker) {
  const i = html.indexOf(startMarker); if (i < 0) throw new Error("Không tìm thấy: " + startMarker);
  const j = html.indexOf(endMarker, i); if (j < 0) throw new Error("Không tìm thấy: " + endMarker);
  return html.slice(i, j);
}
let fail = 0, pass = 0;
function ok(cond, msg) { if (cond) pass++; else { fail++; console.log("  ✗ " + msg); } }

// 1) Truyền thuốc
const ctx = {}; vm.createContext(ctx);
vm.runInContext(grab("var IV_DRUGS=[", "var ivState=") , ctx);
const drugs = vm.runInContext("IV_DRUGS", ctx);
console.log("Bộ tính liều truyền thuốc: " + drugs.length + " thuốc");
drugs.forEach(d => {
  ok(d.ex && d.ex.length >= 2, d.n + ": cần ≥ 2 ca kiểm tra");
  ok(d.lo < d.hi && d.hi <= d.max, d.n + ": khoảng liều lo < hi ≤ max");
  ok(d.src && d.line && d.note, d.n + ": thiếu nguồn / đường truyền / ghi chú");
  d.ex.forEach(e => {
    const [kg, dose, amt, vol, want] = e;
    const rate = ctx.ivRate(d, kg, dose, amt, vol);
    ok(Math.abs(Math.round(rate * 10) / 10 - want) < 0.051, `${d.n}: ${kg} kg, ${dose} → ${rate.toFixed(2)} mL/giờ (mong đợi ${want})`);
    const back = ctx.ivDose(d, kg, rate, amt, vol);
    ok(Math.abs(back - dose) < 1e-9, `${d.n}: quy đổi ngược mL/giờ → liều`);
  });
});

// 2) Phác đồ cây
const ctx2 = { P: {}, head: () => "", $: () => null }; vm.createContext(ctx2);
vm.runInContext(grab("var PROTO=[", "var TREE_STATE="), ctx2);
const PROTO = vm.runInContext("PROTO", ctx2);
const toolIds = new Set([...html.matchAll(/\{id:"([\w-]+)",icon:/g)].map(m => m[1]));
console.log("Phác đồ dạng cây: " + PROTO.length);
PROTO.forEach(p => {
  const seen = new Set(), stack = [p.start];
  while (stack.length) {
    const id = stack.pop(); if (seen.has(id)) continue; seen.add(id);
    const n = p.nodes[id]; ok(!!n, p.id + ": thiếu nút " + id); if (!n) continue;
    if (n.end) { ok(n.lv >= 0 && n.lv <= 3 && n.t, p.id + ": nút kết thúc " + id + " thiếu mức / tiêu đề"); continue; }
    ok(n.o && n.o.length, p.id + ": nhánh cụt " + id);
    (n.o || []).forEach(o => { if (o[1][0] === "@") ok(toolIds.has(o[1].slice(1)), p.id + ": liên kết hỏng " + o[1]); else stack.push(o[1]); });
  }
  Object.keys(p.nodes).forEach(k => ok(seen.has(k), p.id + ": nút không tới được " + k));
  ok(toolIds.has(p.id), p.id + ": chưa đăng ký trong TOOLS");
});

// 3) Mọi công cụ đều có bảng điều khiển
const panels = new Set([...html.matchAll(/P\.(\w+)=head\(/g)].map(m => m[1]));
PROTO.forEach(p => panels.add(p.id));
["ck_sepsis", "ck_vap", "ck_sbt", "abx"].forEach(x => panels.add(x));
toolIds.forEach(id => ok(panels.has(id), "Công cụ " + id + " chưa có bảng điều khiển"));
console.log("Công cụ đăng ký: " + toolIds.size);

// 4) Tra cứu thuốc: mọi liên kết trỏ tới công cụ có thật; từ khóa kháng sinh lọc ra thuốc; mã thuốc truyền tồn tại
const ctx3 = { norm: s => (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d"), TOOLS: [...toolIds].map(id => ({ id, kw: "" })) };
vm.createContext(ctx3);
vm.runInContext(grab("var DRUGDB=[", "DRUGDB.forEach(function(d){d.h="), ctx3);
vm.runInContext(grab("var ABX=[", "var abxState="), ctx3);
const DRUGDB = vm.runInContext("DRUGDB", ctx3), ABX = vm.runInContext("ABX", ctx3);
const ivKeys = new Set(drugs.map(d => d.k));
console.log("Tra cứu thuốc: " + DRUGDB.length + " hoạt chất");
// 5) Sổ tay thuốc: mỗi hoạt chất có hướng dẫn sử dụng đủ mục chính, không có mục thừa
vm.runInContext(grab("var MONO={", "/* ---------- Sổ tay thuốc (giao diện) ---------- */"), ctx3);
const MONO = vm.runInContext("MONO", ctx3);
DRUGDB.forEach(d => {
  const m = MONO[d.g]; ok(!!m, "Sổ tay: thiếu hướng dẫn cho " + d.g); if (!m) return;
  ["ind", "use", "ci", "ae"].forEach(k => ok(m[k] && m[k].length > 10, "Sổ tay: " + d.g + " thiếu mục " + k));
  const hasDose = !!m.dose || d.t.some(x => x[0] === "abx") || d.t.some(x => x[0] === "vaso" && x[1]);
  ok(hasDose, "Sổ tay: " + d.g + " không có thông tin liều");
});
Object.keys(MONO).forEach(k => ok(DRUGDB.some(d => d.g === k), "Sổ tay: mục thừa không khớp hoạt chất nào: " + k));
console.log("Sổ tay thuốc: " + Object.keys(MONO).length + " hướng dẫn");
DRUGDB.forEach(d => {
  ok(d.t.length > 0, d.g + ": chưa liên kết công cụ nào");
  d.t.forEach(x => {
    ok(toolIds.has(x[0]), d.g + ": công cụ không tồn tại " + x[0]);
    if (x[0] === "abx") ok(ABX.some(a => ctx3.norm(a.n + " " + a.g).includes(ctx3.norm(x[1]))), d.g + ": từ khóa kháng sinh không khớp thuốc nào: " + x[1]);
    if (x[0] === "vaso" && x[1]) ok(ivKeys.has(x[1]), d.g + ": mã thuốc truyền không tồn tại " + x[1]);
  });
});

console.log(fail ? `\n❌ ${fail} lỗi, ${pass} đạt` : `\n✅ Tất cả ${pass} kiểm tra đều đạt`);
process.exit(fail ? 1 : 0);
