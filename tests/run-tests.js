// Kiểm thử tính toán & dữ liệu — chạy: node tests/run-tests.js
// Đọc trực tiếp index.html (không cần thư viện), kiểm tra:
//  1) Bộ tính liều truyền thuốc ICU: mọi ca kiểm tra tính tay (ex) khớp công thức, 2 chiều liều ↔ mL/giờ.
//  2) Phác đồ dạng cây: không có nút thiếu, nhánh cụt, nút không tới được, liên kết hỏng.
//  3) Checklist và đăng ký công cụ: mọi công cụ có bảng điều khiển tương ứng.
//  4) Tra cứu thuốc và Sổ tay thuốc: liên kết, từ khóa, hướng dẫn đủ mục.
//  6) v2.5.1 hồi quy: bảng liều khóa khi chưa trả lời đủ 3 câu an toàn; #/tin-tuc mở Bản tin.
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
const panels = new Set([...html.matchAll(/P\.(\w+)\s*=\s*head\(/g)].map(m => m[1]));
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

// 6) v2.5.1 hồi quy: khóa 3 áp dụng cho bảng liều + alias #/tin-tuc → Bản tin
// 6a) Điều hướng: #/tin-tuc mở Bản tin như #/feed, hash lạ vẫn về trang chủ
const ctx4 = { location: { hash: "" }, $: id => (id === "panel-feed" ? {} : null), showSettings: () => { ctx4.shown = "settings"; }, showHome: () => { ctx4.shown = "home"; }, showTool: id => { ctx4.shown = id; }, go: () => {} };
vm.createContext(ctx4);
vm.runInContext(grab("function route(){", "window.addEventListener('hashchange',route);"), ctx4);
ctx4.location.hash = "#/tin-tuc"; vm.runInContext("route()", ctx4);
ok(ctx4.shown === "feed", "#/tin-tuc phải mở Bản tin (feed), nhận: " + ctx4.shown);
ctx4.location.hash = "#/feed"; vm.runInContext("route()", ctx4);
ok(ctx4.shown === "feed", "#/feed phải mở Bản tin, nhận: " + ctx4.shown);
ctx4.location.hash = "#/khong-co"; vm.runInContext("route()", ctx4);
ok(ctx4.shown === "home", "hash lạ phải về trang chủ, nhận: " + ctx4.shown);
// 6b) Bảng liều khóa khi chưa trả lời đủ 3 câu an toàn (dị ứng / MRSA / ESBL)
const abxEls = {};
function abxEl() { return { innerHTML: "", textContent: "", value: "", style: {}, dataset: {}, classList: { toggle() {}, add() {}, remove() {} }, addEventListener() {}, querySelectorAll() { return []; }, querySelector() { return null; } }; }
const ctx5 = { norm: ctx3.norm, SYNDROMES: [["all", "Tất cả hội chứng"], ["cap", "Viêm phổi cộng đồng (CAP)"], ["hap", "Viêm phổi bệnh viện / VAP"], ["uti", "Nhiễm trùng tiết niệu"], ["abd", "Nhiễm trùng ổ bụng"], ["skin", "Da – mô mềm"], ["men", "Viêm màng não"], ["sepsis", "Nhiễm trùng huyết không rõ ổ"]], ABX: [{ n: "Ceftriaxone", g: "Cephalosporin", syn: ["cap"], tdm: false, d: { b90: "1–2 g IV mỗi 24h", b60: "1–2 g IV mỗi 24h", b30: "1 g IV mỗi 24h", b15: "1 g IV mỗi 24h", blt: "1 g IV mỗi 24h", hd: "1 g IV mỗi 24h" }, load: "2 g", liver: "không chỉnh", note: "thử" }], $: id => (abxEls[id] || (abxEls[id] = abxEl())) };
vm.createContext(ctx5);
vm.runInContext(grab("var abxState={", "// ============ v2.0.0: Ho so ca zero-data (RAM-only) ============"), ctx5);
function abxListHTML() { return abxEls["abx_list"] ? abxEls["abx_list"].innerHTML : ""; }
vm.runInContext("renderAbx()", ctx5);
ok(abxListHTML().includes("ĐÃ KHÓA") && !abxListHTML().includes("Ceftriaxone"), "Bảng liều phải khóa khi chưa trả lời dị ứng/MRSA/ESBL");
vm.runInContext("abxState.allergy='none'; abxState.mrsa=null; abxState.esbl='no'; renderAbx()", ctx5);
ok(abxListHTML().includes("ĐÃ KHÓA"), "Bảng liều phải khóa khi mới trả lời 2/3 câu an toàn");
vm.runInContext("abxState.mrsa='no'; renderAbx()", ctx5);
ok(abxListHTML().includes("Ceftriaxone") && abxListHTML().includes("1–2 g IV mỗi 24h") && !abxListHTML().includes("ĐÃ KHÓA"), "Bảng liều phải hiện khi trả lời đủ 3 câu an toàn");
vm.runInContext("abxState.esbl='yes'; renderAbx()", ctx5);
ok(abxListHTML().includes("abx-ban") && abxListHTML().includes("Không phủ ESBL chắc chắn"), "ESBL cao: Ceftriaxone trong bảng liều phải bị đánh dấu không dùng được");
console.log("Hồi quy v2.5.1: khóa bảng liều + alias #/tin-tuc");

console.log(fail ? `\n❌ ${fail} lỗi, ${pass} đạt` : `\n✅ Tất cả ${pass} kiểm tra đều đạt`);
process.exit(fail ? 1 : 0);
