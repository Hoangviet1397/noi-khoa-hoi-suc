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


// 7) v2.6.0 hồi quy Bản tin: 30 mục, sắp xếp mới nhất lên đầu, trường ảnh, nguồn mới
const ctx6 = {}; vm.createContext(ctx6);
vm.runInContext(grab("var FEED_TOPICS={", "var feedState="), ctx6);
const FEED = vm.runInContext("FEED", ctx6), FEED_TOPICS = vm.runInContext("FEED_TOPICS", ctx6);
const feedDate = vm.runInContext("feedDate", ctx6), feedSorted = vm.runInContext("feedSorted", ctx6);
console.log("Bản tin v2.6.0: " + FEED.length + " mục");
ok(FEED.length === 30, "Bản tin phải giữ đúng 30 mục Nghiên cứu mới nhất, nhận: " + FEED.length);
ok(new Set(FEED.map(f => f.id)).size === FEED.length, "ID mục feed phải duy nhất");
FEED.forEach(f => {
  ok(f.id && /^\d{2}\/\d{2}\/\d{4}$/.test(f.d) && f.c === "Nghiên cứu mới" && f.t && f.s && f.body && f.src && /^https?:\/\//.test(f.url), f.id + ": thiếu trường bắt buộc hoặc sai định dạng (d/c/t/s/body/src/url)");
  ok(f.img, f.id + ": thiếu trường ảnh img");
  ok(f.img.indexOf("http") === 0 || FEED_TOPICS[f.img], f.id + ": img phải là URL https hoặc khóa chủ đề trong FEED_TOPICS, nhận: " + f.img);
  if (f.tool) ok(toolIds.has(f.tool), f.id + ": liên kết công cụ không tồn tại: " + f.tool);
});
const sorted = feedSorted();
ok(sorted.length === FEED.length, "feedSorted() phải trả đủ 30 mục");
for (let i = 0; i + 1 < sorted.length; i++) ok(feedDate(sorted[i]) >= feedDate(sorted[i + 1]), "feedSorted() phải mới nhất lên đầu: " + sorted[i].id + " (" + sorted[i].d + ") trước " + sorted[i + 1].id + " (" + sorted[i + 1].d + ")");
const srcs = new Set(FEED.map(f => f.src));
["BMJ 2026", "Annals of Internal Medicine 2026", "Critical Care 2026", "Intensive Care Medicine 2026", "CHEST 2026"].forEach(s => ok(srcs.has(s), "Bản tin thiếu nguồn mới: " + s));
ok(FEED.filter(f => f.img.indexOf("http") === 0).every(f => f.img.indexOf("https://media.springernature.com/") === 0), "Ảnh bài gốc phải dùng link ổn định media.springernature.com");
ok(html.includes("feedSorted().filter"), "renderFeed phải dùng feedSorted() để sắp xếp mới nhất lên đầu");
ok(html.includes('class="feedcard"') && html.includes('class="feedimg"'), "Thẻ feed phải có ảnh lớn phía trên (feedcard/feedimg)");
console.log("Hồi quy v2.6.0 Bản tin: 30 mục, mới nhất lên đầu, ảnh + nguồn mới");

// 8) v2.6.0 hồi quy checklist nguy cơ MRSA/ESBL
const abxRiskFromChk = vm.runInContext("abxRiskFromChk", ctx5), abxRiskEff = vm.runInContext("abxRiskEff", ctx5);
const abxCardBan = vm.runInContext("abxCardBan", ctx5);
function resetRisk() { vm.runInContext("abxState.mrsaChk={}; abxState.esblChk={}; abxState.mrsaMode='chk'; abxState.esblMode='chk'; abxState.mrsa=null; abxState.esbl=null; abxState.sev='severe';", ctx5); }
resetRisk();
ok(abxRiskFromChk("mrsa").risk === null, "MRSA: chưa tick yếu tố nào thì nguy cơ chưa xác định");
vm.runInContext("abxState.mrsaChk={prior:'yes'};", ctx5);
ok(abxRiskFromChk("mrsa").risk === "yes", "MRSA: chỉ cần 1 tick Có (từng nhiễm/mang) là nguy cơ cao, dù chưa tick hết");
vm.runInContext("abxState.mrsaChk={prior:'no',hosp:'no',abx:'no',wound:'no'};", ctx5);
ok(abxRiskFromChk("mrsa").risk === "no", "MRSA: toàn Không mới là nguy cơ thấp");
vm.runInContext("abxState.mrsaChk={prior:'no',hosp:'dk',abx:'no',wound:'no'};", ctx5);
ok(abxRiskFromChk("mrsa").risk === "unk", "MRSA: có Không biết + còn lại Không thì là chưa rõ, không được tính thấp");
vm.runInContext("abxState.mrsaChk={prior:'no',hosp:'no'};", ctx5);
ok(abxRiskFromChk("mrsa").risk === null, "MRSA: mới tick một phần, chưa có Có, thì chưa xác định (không mở khóa)");
vm.runInContext("abxState.esblChk={prior:'no',hosp:'no',ceph:'no',cath:'dk',uti:'no'};", ctx5);
ok(abxRiskFromChk("esbl").risk === "unk", "ESBL: 5 yếu tố, 1 Không biết (sonde tiểu) thì là chưa rõ");
// Mặc định theo mức nặng nhẹ khi "chưa rõ"
vm.runInContext("abxState.mrsa='unk'; abxState.esbl='unk'; abxState.sev='severe';", ctx5);
ok(abxRiskEff("mrsa") === "yes" && abxRiskEff("esbl") === "yes", "Chưa rõ + nhiễm trùng nặng: mặc định phủ rộng (hiệu lực = cao)");
vm.runInContext("abxState.sev='mild';", ctx5);
ok(abxRiskEff("mrsa") === "no" && abxRiskEff("esbl") === "no", "Chưa rõ + nhiễm trùng nhẹ: mặc định phác đồ chuẩn (hiệu lực = thấp)");
vm.runInContext("abxState.sev='shock';", ctx5);
ok(abxCardBan({ n: "Ceftriaxone", g: "Cephalosporin" }).includes("ESBL"), "Chưa rõ ESBL + sốc: Ceftriaxone trong bảng liều phải bị đánh dấu không phủ ESBL");
vm.runInContext("abxState.sev='mild';", ctx5);
ok(abxCardBan({ n: "Ceftriaxone", g: "Cephalosporin" }) === "", "Chưa rõ ESBL + nhẹ: Ceftriaxone không bị đánh dấu");
// Khóa: "chưa rõ" (đã trả lời đủ) thì mở khóa; chưa xác định thì vẫn khóa
vm.runInContext("abxState.allergy='none'; abxState.mrsa='unk'; abxState.esbl='unk'; abxState.sev='severe'; renderAbx()", ctx5);
ok(abxListHTML().includes("Ceftriaxone") && !abxListHTML().includes("ĐÃ KHÓA"), "Bảng liều phải mở khi nguy cơ đã xác định (kể cả chưa rõ)");
vm.runInContext("abxState.mrsa=null; renderAbx()", ctx5);
ok(abxListHTML().includes("ĐÃ KHÓA"), "Bảng liều phải khóa khi nguy cơ MRSA chưa xác định");
// Đường tắt: chọn thẳng cao/thấp
vm.runInContext("abxState.mrsaMode='direct'; abxState.mrsa='yes'; abxState.esbl='no'; abxState.allergy='none'; renderAbx()", ctx5);
ok(abxRiskEff("mrsa") === "yes" && !abxListHTML().includes("ĐÃ KHÓA"), "Đường tắt “Tôi đã biết nguy cơ”: chọn thẳng Cao thì mở khóa và hiệu lực = cao");
console.log("Hồi quy v2.6.0 MRSA/ESBL: checklist, chưa rõ, mặc định theo mức nặng nhẹ, đường tắt");

console.log(fail ? `\n❌ ${fail} lỗi, ${pass} đạt` : `\n✅ Tất cả ${pass} kiểm tra đều đạt`);
process.exit(fail ? 1 : 0);
