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


// 7) v2.6.0 hồi quy Bản tin (bỏ giới hạn 30 mục, phân trang Xem thêm): không giới hạn số mục, sắp xếp mới nhất lên đầu, trường ảnh, nguồn mới
const ctx6 = {}; vm.createContext(ctx6);
vm.runInContext(grab("var FEED_TOPICS={", "function renderFeed(){"), ctx6);
const FEED = vm.runInContext("FEED", ctx6), FEED_TOPICS = vm.runInContext("FEED_TOPICS", ctx6);
const feedDate = vm.runInContext("feedDate", ctx6), feedSorted = vm.runInContext("feedSorted", ctx6);
console.log("Bản tin v2.6.0: " + FEED.length + " mục");
ok(FEED.length > 30, "Bản tin không còn giới hạn 30 mục (giữ toàn bộ bài đã khôi phục), nhận: " + FEED.length);
ok(new Set(FEED.map(f => f.url)).size === FEED.length, "URL bài trong feed phải duy nhất (không trùng bài)");
ok(new Set(FEED.map(f => f.id)).size === FEED.length, "ID mục feed phải duy nhất");
FEED.forEach(f => {
  ok(f.id && /^\d{2}\/\d{2}\/\d{4}$/.test(f.d) && (f.c === "Nghiên cứu mới" || f.c === "Tổng quan") && f.t && f.s && f.body && f.src && /^https?:\/\//.test(f.url), f.id + ": thiếu trường bắt buộc hoặc sai định dạng (d/c/t/s/body/src/url)");
  ok(f.img, f.id + ": thiếu trường ảnh img");
  ok(f.img.indexOf("http") === 0 || FEED_TOPICS[f.img], f.id + ": img phải là URL https hoặc khóa chủ đề trong FEED_TOPICS, nhận: " + f.img);
  if (f.tool) ok(toolIds.has(f.tool), f.id + ": liên kết công cụ không tồn tại: " + f.tool);
});
const sorted = feedSorted();
ok(sorted.length === FEED.length, "feedSorted() phải trả đủ mọi mục");
for (let i = 0; i + 1 < sorted.length; i++) ok(feedDate(sorted[i]) >= feedDate(sorted[i + 1]), "feedSorted() phải mới nhất lên đầu: " + sorted[i].id + " (" + sorted[i].d + ") trước " + sorted[i + 1].id + " (" + sorted[i + 1].d + ")");
const srcs = new Set(FEED.map(f => f.src));
["BMJ 2026", "Annals of Internal Medicine 2026", "Critical Care 2026", "Intensive Care Medicine 2026", "CHEST 2026"].forEach(s => ok(srcs.has(s), "Bản tin thiếu nguồn mới: " + s));
ok(FEED.filter(f => f.img.indexOf("http") === 0).every(f => f.img.indexOf("https://media.springernature.com/") === 0), "Ảnh bài gốc phải dùng link ổn định media.springernature.com");
ok(html.includes("feedSorted().filter"), "renderFeed phải dùng feedSorted() để sắp xếp mới nhất lên đầu");
ok(html.includes('class="feedcard"') && html.includes('class="feedimg"'), "Thẻ feed phải có ảnh lớn phía trên (feedcard/feedimg)");
const feedState = vm.runInContext("feedState", ctx6);
ok(feedState.n === 30, "Phân trang Bản tin: ban đầu hiện 30 bài, nhận: " + feedState.n);
ok(feedSorted().slice(0, feedState.n).length === 30, "Phân trang: trang đầu hiện đúng 30 bài mới nhất");
ok(feedSorted().slice(0, feedState.n + 30).length === 60, "Phân trang: bấm Xem thêm 1 lần hiện 60 bài");
ok(html.includes('data-feedmore') && html.includes('Xem thêm'), "renderFeed phải có nút Xem thêm");
ok(html.includes('Đang hiện '), "renderFeed phải hiện dòng đếm số bài đang hiện");
ok(html.includes('feedState.n=(feedState.n||30)+30'), "Nút Xem thêm phải tăng số bài hiện thêm 30");
ok(!html.includes('Giữ tối đa 30 mục'), "Không còn quy tắc giới hạn 30 mục trong code");
console.log("Hồi quy v2.6.0 Bản tin: không giới hạn số mục, phân trang Xem thêm, mới nhất lên đầu, ảnh + nguồn mới");

// 8) v2.6.1 hồi quy cây hỏi nguy cơ MRSA/ESBL (thay 2 checklist v2.6.0)
const abxRiskFromTree = vm.runInContext("abxRiskFromTree", ctx5), abxRiskEff = vm.runInContext("abxRiskEff", ctx5);
const abxRiskNext = vm.runInContext("abxRiskNext", ctx5), abxRiskDone = vm.runInContext("abxRiskDone", ctx5);
const abxCardBan = vm.runInContext("abxCardBan", ctx5);
function setTree(ans, path) { vm.runInContext("abxState.riskMode='tree'; abxState.riskAns=" + JSON.stringify(ans) + "; abxState.riskPath=" + JSON.stringify(path) + "; abxState.sev='severe'; abxRiskSync();", ctx5); }
function riskOf(kind) { return vm.runInContext("abxState." + kind, ctx5); }
function treeHTML() { return abxEls["abx_risk_tree"] ? abxEls["abx_risk_tree"].innerHTML : ""; }
// Rẽ nhánh: mỗi câu chỉ hỏi một lần, câu không còn liên quan thì bỏ qua
vm.runInContext("abxState.riskAns={q1:'both'};", ctx5);
ok(abxRiskNext("q1") === null, "Rẽ nhánh: q1 Có cả hai thì chốt luôn, bỏ qua q2–q5");
vm.runInContext("abxState.riskAns={q1:'esbl'};", ctx5);
ok(abxRiskNext("q3") === "q5", "Rẽ nhánh: q1 Có ESBL thì sau q3 bỏ qua q4 (sonde tiểu chỉ ảnh hưởng ESBL), sang q5");
vm.runInContext("abxState.riskAns={q1:'mrsa'};", ctx5);
ok(abxRiskNext("q4") === null, "Rẽ nhánh: q1 Có MRSA thì sau q4 bỏ qua q5 (chỉ ảnh hưởng MRSA), tới kết luận");
vm.runInContext("abxState.riskAns={q1:'no'};", ctx5);
ok(abxRiskNext("q1") === "q2" && abxRiskNext("q3") === "q4" && abxRiskNext("q4") === "q5" && abxRiskNext("q5") === null, "Rẽ nhánh: q1 Không thì đi đủ 5 câu theo thứ tự q1→q2→q3→q4→q5");
// Chưa trả lời gì thì chưa xác định
setTree({}, ["q1"]);
ok(riskOf("mrsa") === null && riskOf("esbl") === null, "Cây hỏi: chưa trả lời câu nào thì cả hai nguy cơ đều chưa xác định");
ok(abxRiskDone() === false, "Cây hỏi: chưa trả lời thì chưa tới kết luận");
// q1 Có MRSA thì MRSA cao ngay, ESBL chưa xác định
setTree({ q1: "mrsa" }, ["q1", "q2"]);
ok(riskOf("mrsa") === "yes" && riskOf("esbl") === null, "Cây hỏi: q1 Có MRSA thì MRSA cao ngay, ESBL chưa xác định cho tới khi hỏi xong");
// Đường đi đầy đủ: toàn Không → cả hai thấp
setTree({ q1: "no", q2: "no", q3: "no", q4: "no", q5: "no" }, ["q1", "q2", "q3", "q4", "q5"]);
ok(riskOf("mrsa") === "no" && riskOf("esbl") === "no", "Cây hỏi: toàn Không → cả hai nguy cơ thấp");
ok(abxRiskDone() === true, "Cây hỏi: trả lời đủ 5 câu thì tới kết luận");
// 1 Có ở q2 (nằm viện) → cả hai cao
setTree({ q1: "no", q2: "yes", q3: "no", q4: "no", q5: "no" }, ["q1", "q2", "q3", "q4", "q5"]);
ok(riskOf("mrsa") === "yes" && riskOf("esbl") === "yes", "Cây hỏi: nằm viện 90 ngày qua (Có) → cả hai nguy cơ cao");
// q4 chỉ ảnh hưởng ESBL
setTree({ q1: "no", q2: "no", q3: "no", q4: "yes", q5: "no" }, ["q1", "q2", "q3", "q4", "q5"]);
ok(riskOf("mrsa") === "no" && riskOf("esbl") === "yes", "Cây hỏi: sonde tiểu (Có) chỉ làm ESBL cao, MRSA vẫn thấp");
// q5 chỉ ảnh hưởng MRSA
setTree({ q1: "no", q2: "no", q3: "no", q4: "no", q5: "yes" }, ["q1", "q2", "q3", "q4", "q5"]);
ok(riskOf("mrsa") === "yes" && riskOf("esbl") === "no", "Cây hỏi: lọc máu/vết thương/viêm phổi nặng (Có) chỉ làm MRSA cao, ESBL vẫn thấp");
// Có MRSA ở q1 → chốt MRSA cao, bỏ qua q5
setTree({ q1: "mrsa", q2: "no", q3: "no", q4: "no" }, ["q1", "q2", "q3", "q4"]);
ok(riskOf("mrsa") === "yes" && riskOf("esbl") === "no", "Cây hỏi: q1 Có MRSA → MRSA cao, ESBL thấp (bỏ qua q5)");
ok(abxRiskDone() === true, "Cây hỏi: q1 Có MRSA + trả lời đủ q2–q4 thì tới kết luận");
// Có ESBL ở q1 → chốt ESBL cao, bỏ qua q4
setTree({ q1: "esbl", q2: "no", q3: "no", q5: "no" }, ["q1", "q2", "q3", "q5"]);
ok(riskOf("mrsa") === "no" && riskOf("esbl") === "yes", "Cây hỏi: q1 Có ESBL → ESBL cao, MRSA thấp (bỏ qua q4)");
ok(abxRiskDone() === true, "Cây hỏi: q1 Có ESBL + trả lời đủ q2,q3,q5 thì tới kết luận");
// Có cả hai ở q1 → cả hai cao, không cần câu sau
setTree({ q1: "both" }, ["q1"]);
ok(riskOf("mrsa") === "yes" && riskOf("esbl") === "yes", "Cây hỏi: q1 Có cả hai → cả hai nguy cơ cao");
ok(abxRiskDone() === true, "Cây hỏi: q1 Có cả hai thì tới kết luận ngay");
// Không biết ở q1 → cả hai chưa rõ
setTree({ q1: "dk", q2: "no", q3: "no", q4: "no", q5: "no" }, ["q1", "q2", "q3", "q4", "q5"]);
ok(riskOf("mrsa") === "unk" && riskOf("esbl") === "unk", "Cây hỏi: Không biết tiền sử + còn lại Không → cả hai chưa rõ, không được tính thấp");
// Không biết ở q2 → cả hai chưa rõ
setTree({ q1: "no", q2: "dk", q3: "no", q4: "no", q5: "no" }, ["q1", "q2", "q3", "q4", "q5"]);
ok(riskOf("mrsa") === "unk" && riskOf("esbl") === "unk", "Cây hỏi: Không biết nằm viện + còn lại Không → cả hai chưa rõ");
// Không biết ở q4 → chỉ ESBL chưa rõ
setTree({ q1: "no", q2: "no", q3: "no", q4: "dk", q5: "no" }, ["q1", "q2", "q3", "q4", "q5"]);
ok(riskOf("mrsa") === "no" && riskOf("esbl") === "unk", "Cây hỏi: Không biết sonde tiểu → chỉ ESBL chưa rõ, MRSA thấp");
// Mới trả lời một phần, chưa có Có → chưa xác định (không mở khóa)
setTree({ q1: "no", q2: "no" }, ["q1", "q2", "q3"]);
ok(riskOf("mrsa") === null && riskOf("esbl") === null, "Cây hỏi: mới trả lời một phần, chưa có Có, thì chưa xác định");
ok(abxRiskDone() === false, "Cây hỏi: chưa trả lời hết thì chưa tới kết luận");
// Lý do hiển thị: kết luận phải nêu đúng yếu tố gây cao / chưa rõ
setTree({ q1: "no", q2: "yes", q3: "no", q4: "no", q5: "no" }, ["q1", "q2", "q3", "q4", "q5"]);
vm.runInContext("renderAbxRisk();", ctx5);
ok(treeHTML().includes("Nguy cơ MRSA: CAO") && treeHTML().includes("nằm viện / ICU / dưỡng lão trong 90 ngày qua"), "Cây hỏi: kết luận MRSA cao phải nêu đúng lý do (nằm viện 90 ngày)");
// Giao diện cây: bước 1 hiện câu tiền sử; đi hết cây hiện kết luận + danh sách câu đã trả lời có nút quay lại
vm.runInContext("abxState.riskMode='tree'; abxState.riskAns={}; abxState.riskPath=['q1']; abxState.mrsa=null; abxState.esbl=null; renderAbxRisk();", ctx5);
ok(treeHTML().includes("Bước 1") && treeHTML().includes("Từng nhiễm hoặc mang MRSA hoặc ESBL chưa?"), "Cây hỏi: bước 1 hiện câu tiền sử MRSA/ESBL");
setTree({ q1: "no", q2: "no", q3: "no", q4: "no", q5: "no" }, ["q1", "q2", "q3", "q4", "q5"]);
vm.runInContext("renderAbxRisk();", ctx5);
ok(treeHTML().includes("Kết luận") && treeHTML().includes("Nguy cơ MRSA: THẤP") && treeHTML().includes("Nguy cơ ESBL: THẤP"), "Cây hỏi: đi hết cây (toàn Không) hiện kết luận cả hai THẤP");
ok(treeHTML().includes('data-back="0"') && treeHTML().includes("➜ Không"), "Cây hỏi: các câu đã trả lời hiện trong danh sách, chạm để quay lại sửa");
// Chưa rõ + nhiễm trùng nặng thì hiện hướng dẫn phủ rộng
setTree({ q1: "dk", q2: "no", q3: "no", q4: "no", q5: "no" }, ["q1", "q2", "q3", "q4", "q5"]);
vm.runInContext("renderAbxRisk();", ctx5);
ok(treeHTML().includes("CHƯA RÕ") && treeHTML().includes("phủ rộng chờ kết quả cấy"), "Cây hỏi: Không biết tiền sử → kết luận CHƯA RÕ kèm hướng dẫn phủ rộng khi nhiễm trùng nặng");
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
// Đường tắt "Tôi đã biết nguy cơ": vào đường tắt phải trống, không mặc định THẤP (lỗi v2.6.0)
vm.runInContext("abxState.riskMode='tree'; abxState.riskAns={q1:'no',q2:'no',q3:'no',q4:'no',q5:'no'}; abxState.riskPath=['q1','q2','q3','q4','q5']; abxRiskSync();", ctx5);
ok(riskOf("mrsa") === "no" && riskOf("esbl") === "no", "Cây hỏi xong (toàn Không) thì cả hai thấp");
vm.runInContext("abxState.riskMode='direct'; abxState.mrsa=null; abxState.esbl=null; renderAbxRisk();", ctx5);
ok(treeHTML().includes("Chưa chọn đủ") && !treeHTML().includes('class="on"'), "Đường tắt: mới vào thì chưa chọn gì, không được mặc định THẤP, phải hiện 'Chưa chọn đủ'");
vm.runInContext("abxState.mrsa='yes'; abxState.esbl='no'; renderAbxRisk();", ctx5);
ok(treeHTML().includes('class="on"') && treeHTML().includes("(chọn thẳng, không qua cây hỏi)"), "Đường tắt: chọn Cao cho MRSA thì nút Cao sáng lên, kết quả ghi rõ chọn thẳng");
vm.runInContext("abxState.allergy='none'; renderAbx()", ctx5);
ok(abxRiskEff("mrsa") === "yes" && !abxListHTML().includes("ĐÃ KHÓA"), "Đường tắt: chọn thẳng Cao thì mở khóa và hiệu lực = cao");
// Cấu trúc: một khung cây hỏi duy nhất, không còn 2 khung checklist riêng
ok(html.includes('id="abx_risk_tree"'), "Bước ③ phải dùng một khung cây hỏi duy nhất (abx_risk_tree)");
ok(!html.includes('id="abx_risk_mrsa"') && !html.includes('id="abx_risk_esbl"'), "Không còn 2 khung checklist MRSA/ESBL riêng");
ok(html.includes("abxRiskNext") && html.includes("abxRiskFromTree"), "Cây hỏi phải có hàm rẽ nhánh abxRiskNext và tính nguy cơ abxRiskFromTree");
ok(html.includes("Tôi đã biết nguy cơ"), "Cây hỏi giữ nút đường tắt 'Tôi đã biết nguy cơ'");
console.log("Hồi quy v2.6.1 cây hỏi MRSA/ESBL: rẽ nhánh, 1 Có → cao, Không biết → chưa rõ, khóa, đường tắt không mặc định");



// 9) v2.7.0 hồi quy wizard kháng sinh 5 bước + sửa 3 lỗi v2.6.1 + dọn hscc.vn + thuốc thay thế
const abxWizPick = vm.runInContext("abxWizPick", ctx5), abxWizGo = vm.runInContext("abxWizGo", ctx5), abxWizNext = vm.runInContext("abxWizNext", ctx5);
const abxRiskBackTo = vm.runInContext("abxRiskBackTo", ctx5), abxReset = vm.runInContext("abxReset", ctx5);
const ABX_ALT = vm.runInContext("ABX_ALT", ctx5), EMP = vm.runInContext("EMP", ctx5);
const ABX3 = vm.runInContext("ABX", ctx3);
const readme = fs.readFileSync(path.join(__dirname, "..", "README.md"), "utf8");
function wizState() { return vm.runInContext("({syn:abxState.syn,sev:abxState.sev,allergy:abxState.allergy,mrsa:abxState.mrsa,esbl:abxState.esbl,wstep:abxState.wstep,wmax:abxState.wmax,wchanged:abxState.wchanged})", ctx5); }
function wizHTML(id) { return abxEls[id] ? abxEls[id].innerHTML : ""; }
function wizText(id) { return abxEls[id] ? abxEls[id].textContent : ""; }
// Cấu trúc wizard: 5 bước + thanh tiến trình + dải tóm tắt dính + màn hình kết quả riêng
ok(html.includes("ABX_WIZ_SYN") && html.includes("abxWizPick") && html.includes("abxWizGo") && html.includes("abxWizNext") && html.includes("renderAbxWizard"), "Wizard phải có ABX_WIZ_SYN, abxWizPick/Go/Next và renderAbxWizard");
ok(html.includes('id="abx_wizbar"') && html.includes('id="abx_wizsum"') && html.includes('id="abx_wizcard"') && html.includes('id="abx_result"') && html.includes('id="abx_why"') && html.includes('id="abx_alt"'), "Panel kháng sinh phải có thanh tiến trình, dải tóm tắt, thẻ câu hỏi, màn hình kết quả, hộp 'vì sao' và hộp thuốc thay thế");
ok(html.includes("Bước") && html.includes("/5") && html.includes("position:sticky"), "Thanh tiến trình phải hiện Bước X/5; dải tóm tắt phải dính (sticky)");
ok(!html.includes('id="abx_syn"') && !html.includes('id="abx_sev"') && !html.includes('id="abx_allergy"'), "Không còn khung chọn hội chứng / mức độ / dị ứng cũ trong panel (đã chuyển vào wizard)");
// Đi hết wizard 5 bước: CAP nặng, không dị ứng, nguy cơ thấp → mở khóa, có phác đồ + bảng liều + vì sao + thuốc thay thế
vm.runInContext("abxReset(); renderAbx();", ctx5);
let s = wizState();
ok(s.wstep === 1 && s.syn === null && s.sev === null && s.allergy === null, "Wizard bắt đầu ở bước 1, chưa chọn gì (không mặc định)");
ok(wizHTML("abx_wizcard").includes("Ổ nhiễm trùng là gì?"), "Bước 1 hỏi hội chứng bằng thẻ lớn");
vm.runInContext("abxWizPick(1,'syn','cap');", ctx5);
s = wizState();
ok(s.syn === "cap" && s.wstep === 2, "Bước 1: chọn Viêm phổi cộng đồng thì sang bước 2");
ok(wizHTML("abx_wizcard").includes("Mức độ nặng?"), "Bước 2 hỏi mức độ nặng");
vm.runInContext("abxWizPick(2,'sev','severe');", ctx5);
s = wizState();
ok(s.sev === "severe" && s.wstep === 3, "Bước 2: chọn Nặng thì sang bước 3");
ok(wizHTML("abx_wizcard").includes("Dị ứng penicillin?"), "Bước 3 hỏi dị ứng penicillin");
vm.runInContext("abxWizPick(3,'allergy','none');", ctx5);
s = wizState();
ok(s.allergy === "none" && s.wstep === 4, "Bước 3: chọn Không dị ứng thì sang bước 4");
ok(wizHTML("abx_wizcard").includes("Nguy cơ kháng thuốc?") && wizHTML("abx_risk_tree").includes("Từng nhiễm hoặc mang MRSA hoặc ESBL chưa?"), "Bước 4 dùng lại cây hỏi nguy cơ MRSA/ESBL");
setTree({ q1: "no", q2: "no", q3: "no", q4: "no", q5: "no" }, ["q1", "q2", "q3", "q4", "q5"]);
ok(riskOf("mrsa") === "no" && riskOf("esbl") === "no", "Bước 4: toàn Không → cả hai nguy cơ thấp");
vm.runInContext("abxWizNext(5);", ctx5);
s = wizState();
ok(s.wstep === 5, "Bước 4 xong thì sang bước 5 (thận/gan)");
ok(wizHTML("abx_wizcard").includes("Chức năng thận / gan?"), "Bước 5 hỏi chức năng thận/gan");
// Thêm Cefotaxime (thuốc thay thế của Ceftriaxone) vào ABX của ctx5 để kiểm tra hộp thuốc thay thế
vm.runInContext("ABX.push({n:'Cefotaxime',g:'Cephalosporin',syn:['cap'],tdm:false,d:{b90:'1–2 g mỗi 8h',b60:'1–2 g mỗi 8h',b30:'1 g mỗi 8h',b15:'1 g mỗi 12h',blt:'1 g mỗi 12h',hd:'1 g mỗi 12h'},load:'1–2 g',liver:'không chỉnh',note:'thử'});", ctx5);
vm.runInContext("abxWizNext(6); renderAbx();", ctx5);
s = wizState();
ok(s.wstep === 6, "Bước 5 xong thì sang màn hình kết quả");
ok(!abxListHTML().includes("ĐÃ KHÓA") && abxListHTML().includes("Ceftriaxone"), "Kết quả: bảng liều mở khóa, hiện Ceftriaxone");
ok(wizHTML("abx_emp").includes("Viêm phổi cộng đồng") && !wizHTML("abx_emp").includes("ĐÃ KHÓA"), "Kết quả: phác đồ kinh nghiệm CAP hiện, không còn khóa");
ok(wizHTML("abx_why").includes("Vì sao dùng thuốc này") && wizHTML("abx_why").includes("Nhiễm trùng nặng"), "Kết quả: giải thích 'vì sao dùng thuốc này' nêu đúng mức độ nặng");
ok(wizHTML("abx_alt").includes("Nếu không có") && wizHTML("abx_alt").includes("Cefotaxime"), "Kết quả: hộp thuốc thay thế nêu Cefotaxime thay Ceftriaxone kèm liều");
// Nhảy về sửa giữa chừng rồi tính lại (kèm dòng "đã đổi")
vm.runInContext("abxWizGo(2);", ctx5);
s = wizState();
ok(s.wstep === 2, "Dải tóm tắt: chạm câu đã trả lời thì nhảy về đúng bước đó");
vm.runInContext("abxWizPick(2,'sev','mild');", ctx5);
s = wizState();
ok(s.wstep === 3 && s.wchanged.includes("Đã đổi") && s.wchanged.includes("Nặng") && s.wchanged.includes("Nhẹ"), "Đổi mức độ Nặng → Nhẹ thì tính lại và ghi rõ điều đã đổi");
ok(s.allergy === null && s.mrsa === null && s.esbl === null, "Đổi đáp án giữa chừng thì các bước sau bị xóa để trả lời lại (không giữ đáp án cũ sai ngữ cảnh)");
// Trả lời lại các bước sau rồi về kết quả: dòng "Đã đổi" còn hiện trên màn hình kết quả
vm.runInContext("abxWizPick(3,'allergy','none');", ctx5);
setTree({ q1: "no", q2: "no", q3: "no", q4: "no", q5: "no" }, ["q1", "q2", "q3", "q4", "q5"]);
// setTree() đặt lại sev='severe' (mặc định của mục 8) — trả về 'mild' để kiểm tra tính lại theo mức nhẹ
vm.runInContext("abxState.sev='mild';", ctx5);
vm.runInContext("abxWizNext(5); abxWizNext(6); renderAbx();", ctx5);
ok(wizText("abx_changed").includes("Đã đổi") && wizText("abx_changed").includes("Nặng"), "Màn hình kết quả hiện rõ dòng 'Đã đổi' sau khi sửa giữa chừng");
ok(wizHTML("abx_why").includes("Nhiễm trùng nhẹ"), "Sau khi đổi sang Nhẹ, giải thích 'vì sao' tính lại theo mức nhẹ");
// Lỗi (a): nhánh "Có cả hai" — quay lại/sửa/làm lại được
vm.runInContext("abxReset(); abxState.riskMode='tree'; abxState.riskAns={q1:'both'}; abxState.riskPath=['q1']; abxRiskSync(); renderAbxRisk();", ctx5);
ok(abxRiskDone() === true && riskOf("mrsa") === "yes" && riskOf("esbl") === "yes", "Nhánh Có cả hai: cả hai nguy cơ cao, tới kết luận ngay");
ok(treeHTML().includes('data-back="0"') && treeHTML().includes("data-risk-reset"), "Lỗi (a): nhánh Có cả hai phải có nút quay lại câu q1 và nút Làm lại từ đầu");
vm.runInContext("abxRiskBackTo(0);", ctx5);
ok(JSON.stringify(vm.runInContext("abxState.riskAns", ctx5)) === "{}" && abxRiskDone() === false && riskOf("mrsa") === null, "Lỗi (a): chạm q1 ở nhánh Có cả hai thì mở lại câu hỏi — đáp án q1 bị xóa, chưa tới kết luận");
vm.runInContext("abxState.riskAns={q1:'both'}; abxState.riskPath=['q1']; abxRiskSync(); abxReset();", ctx5);
s = wizState();
ok(s.wstep === 1 && s.syn === null && s.allergy === null && JSON.stringify(vm.runInContext("abxState.riskAns", ctx5)) === "{}", "Lỗi (a): Làm lại từ đầu (abxReset) đặt lại toàn bộ wizard + cây hỏi về bước 1");
ok(html.includes("abxReset();location.reload()"), "Lỗi (a): 'Xóa dữ liệu đã lưu' phải gọi abxReset() trước khi tải lại trang");
// Lỗi (b): dòng "đã mở khóa" chỉ hiện khi thực sự đã mở khóa
vm.runInContext("abxState.riskMode='tree'; abxState.riskAns={q1:'no',q2:'no',q3:'no',q4:'no',q5:'no'}; abxState.riskPath=['q1','q2','q3','q4','q5']; abxState.allergy=null; abxRiskSync(); renderAbxRisk();", ctx5);
ok(!treeHTML().includes("đã mở khóa"), "Lỗi (b): chưa chọn dị ứng thì kết luận cây hỏi không được ghi 'đã mở khóa'");
vm.runInContext("abxState.allergy='none'; renderAbxRisk();", ctx5);
ok(treeHTML().includes("đã mở khóa"), "Lỗi (b): đã chọn dị ứng + nguy cơ xong thì kết luận mới ghi 'đã mở khóa'");
ok(html.includes('abxUnlocked()?"Kết quả ở ô bên dưới'), "Lỗi (b): dòng 'đã mở khóa' phải nằm trong điều kiện abxUnlocked()");
// Lỗi (c): bộ đếm "Đã trả lời N câu" khớp đúng số câu đã trả lời
vm.runInContext("abxState.riskMode='tree'; abxState.riskAns={q1:'no',q2:'no',q3:'no'}; abxState.riskPath=['q1','q2']; abxRiskSync(); renderAbxRisk();", ctx5);
ok(treeHTML().includes("Đã trả lời 2 câu"), "Lỗi (c): bộ đếm chỉ đếm câu trong đường đi hiện tại (2), không đếm đáp án thừa ngoài đường đi (3)");
vm.runInContext("abxState.riskAns={q1:'no',q2:'no'}; abxState.riskPath=['q1','q2','q3']; abxRiskSync(); renderAbxRisk();", ctx5);
ok(treeHTML().includes("Đã trả lời 2 câu"), "Lỗi (c): mới trả lời 2/5 câu thì bộ đếm ghi 2 câu");
ok(!html.includes("Object.keys(abxState.riskAns).length"), "Lỗi (c): không còn đếm bằng Object.keys(riskAns)");
// Đường tắt không mặc định (giữ nguyên v2.6.1)
ok(html.includes('abxState.riskMode="direct";abxState.mrsa=null;abxState.esbl=null;'), "Đường tắt 'Tôi đã biết nguy cơ' phải xóa nguy cơ cũ, không mặc định");
// Dọn hscc.vn
ok(!html.includes("hscc.vn"), "Không còn chuỗi hscc.vn trong index.html");
ok(!readme.includes("https://hscc.vn") && !readme.includes("Nguồn tham khảo hscc.vn"), "README không còn link hscc.vn hay dẫn hscc.vn làm nguồn (chỉ còn ghi chú đã dọn trong mục v2.7.0)");
ok(html.includes("doi.org/10.3109/15563650.2014.946994") && html.includes("pmc.ncbi.nlm.nih.gov/articles/PMC2493390"), "Link hscc.vn đã thay bằng nguồn gốc: EXTRIP 2014 và Eddleston Lancet 2008 (PMC)");
// Thuốc thay thế: mọi thuốc thay thế đều có trong bảng liều, có đủ liều, truy được về guideline đã trích dẫn
const NEW_DRUGS = ["Aztreonam", "Ertapenem", "Cefotaxime", "Ceftazidime", "Nitrofurantoin", "Fosfomycin", "Cephalexin", "Moxifloxacin", "Meropenem–Vaborbactam", "Cefmetazole", "Cefamandole", "Cefotiam"];
console.log("Thuốc thay thế v2.7.0: " + ABX3.length + " kháng sinh/kháng nấm trong bảng liều");
ok(ABX3.length === 39, "Bảng liều phải có 39 kháng sinh/kháng nấm (36 cũ + 3 mới), nhận: " + ABX3.length);
NEW_DRUGS.forEach(n => {
  const a = ABX3.find(x => x.n === n);
  ok(!!a, "Bảng liều thiếu thuốc mới: " + n);
  if (a) ["b90", "b60", "b30", "b15", "blt", "hd"].forEach(b => ok(a.d && a.d[b] && a.d[b].length > 0, n + ": thiếu liều mức " + b));
});
// v2.7.9: 3 kháng sinh mới có alias + hội chứng; TMP-SMX tìm được bằng "TMP-SMX"
["Cefmetazole", "Cefamandole", "Cefotiam"].forEach(n => {
  const a = ABX3.find(x => x.n === n);
  ok(a && a.alias && a.alias.length > 0, n + ": thiếu alias (biệt dược) để tìm bằng tên thương mại");
  ok(a && a.syn && a.syn.length > 0, n + ": thiếu hội chứng (syn) — thuốc không hiện trong bảng liều theo hội chứng");
});
const tmpsmx = ABX3.find(x => x.n === "Trimethoprim–Sulfamethoxazole");
ok(tmpsmx && tmpsmx.alias && tmpsmx.alias.includes("TMP-SMX"), "TMP-SMX: thiếu alias TMP-SMX trong bảng liều");
ok(html.includes('(a.alias||"")'), "Ô tìm trong bảng liều phải tra cả alias (biệt dược / viết tắt)");
["Cefmetazole", "Cefamandole", "Cefotiam"].forEach(n => {
  const d = DRUGDB.find(x => x.g === n);
  ok(!!d, "Sổ tay: thiếu mục " + n);
  ok(d && d.b && d.b.length > 0, n + ": thiếu biệt dược trong Sổ tay");
  ok(d && d.t.some(x => x[0] === "abx"), n + ": chưa liên kết module kháng sinh");
});
ok(DRUGDB.some(d => d.g === "Cefotiam" && d.b.includes("Fotimyd")), "Sổ tay: Cefotiam phải có biệt dược Fotimyd");
ok(DRUGDB.some(d => d.g === "Cefamandole" && d.b.includes("Mandol")), "Sổ tay: Cefamandole phải có biệt dược Mandol");
ok(DRUGDB.some(d => d.g === "Cefmetazole" && d.b.includes("Zefazone")), "Sổ tay: Cefmetazole phải có biệt dược Zefazone");
const tmpdb = DRUGDB.find(d => d.g === "Sulfamethoxazole + trimethoprim (cotrimoxazole)");
ok(tmpdb && tmpdb.b.includes("TMP-SMX"), "Sổ tay: TMP-SMX phải có alias TMP-SMX trong biệt dược");
Object.keys(EMP).forEach(k => {
  ok(EMP[k].drugs && EMP[k].drugs.length > 0, "Phác đồ " + k + " phải có danh sách thuốc chính (drugs)");
  (EMP[k].drugs || []).forEach(dn => ok(ABX3.some(a => a.n === dn), "Phác đồ " + k + ": thuốc chính không có trong bảng liều: " + dn));
});
Object.keys(ABX_ALT).forEach(dn => {
  ok(ABX3.some(a => a.n === dn), "ABX_ALT: thuốc chính không có trong bảng liều: " + dn);
  ABX_ALT[dn].forEach(a => {
    const alt = ABX3.find(x => x.n === a.n);
    ok(!!alt, "ABX_ALT: thuốc thay thế không có trong bảng liều: " + a.n + " (thay " + dn + ")");
    if (alt) ["b90", "b60", "b30", "b15", "blt", "hd"].forEach(b => ok(alt.d && alt.d[b] && alt.d[b].length > 0, "Thuốc thay thế " + a.n + ": thiếu liều mức " + b));
    ok(a.src && /IDSA|SSC|EAU|Tokyo|ATS/.test(a.src), "ABX_ALT: thuốc thay thế " + a.n + " phải ghi rõ guideline nguồn đã trích dẫn trong app, nhận: " + a.src);
    ok(a.why && a.why.length > 5, "ABX_ALT: thuốc thay thế " + a.n + " thiếu giải thích ngắn");
  });
});
// Ceftazidime/Cefotaxime/Cephalexin không phủ ESBL; Ceftazidime–Avibactam thì có phủ
vm.runInContext("abxState.esbl='yes'; abxState.sev='severe';", ctx5);
["Cefotaxime", "Ceftazidime", "Cephalexin", "Cefmetazole", "Cefamandole", "Cefotiam"].forEach(n => ok(abxCardBan({ n, g: "Cephalosporin" }).includes("ESBL"), "ESBL cao: " + n + " phải bị đánh dấu không phủ ESBL"));
ok(abxCardBan({ n: "Ceftazidime–Avibactam", g: "Cephalosporin" }) === "", "ESBL cao: Ceftazidime–Avibactam vẫn phủ ESBL (avibactam), không được đánh dấu");
ok(abxCardBan({ n: "Meropenem–Vaborbactam", g: "Carbapenem" }) === "", "ESBL cao: Meropenem–Vaborbactam vẫn phủ ESBL, không được đánh dấu");
// v2.7.5: Sgarbossa — tiêu chuẩn Smith-modified trên LBBB / nhịp máy tạo nhịp
// Tĩnh: đăng ký, bảng điều khiển, id ô kết quả khớp hàm tính (bài học v2.0.1), link phác đồ STEMI, nguồn DOI
ok(html.includes('{id:"sgarbossa",icon:"🫀",cat:"timmach"'), "Sgarbossa: chưa đăng ký trong TOOLS (nhóm Tim mạch – sốc)");
ok(html.includes('P.sgarbossa=head('), "Sgarbossa: chưa có bảng điều khiển P.sgarbossa");
ok(html.includes('resHTML("res-sgarbossa")') && html.includes('setRes("res-sgarbossa"'), "Sgarbossa: id ô kết quả res-sgarbossa phải khớp id hàm tính ghi vào");
ok(html.includes('segHTML("sg_conc"') && html.includes('segHTML("sg_dep"'), "Sgarbossa: thiếu 2 câu Có/Không (đồng hướng ≥ 1 mm; chênh xuống V1–V3)");
ok(html.includes('numHTML("sg_ste"') && html.includes('numHTML("sg_s"'), "Sgarbossa: thiếu 2 ô số tiêu chuẩn ngược hướng (ST chênh lên, độ sâu sóng S)");
ok(html.includes('sgarbossa:calcSgarbossa'), "Sgarbossa: chưa gắn vào bảng tự tính (M map) để tính khi đổi số liệu");
ok(html.includes('#/px_acs'), "Sgarbossa: kết quả dương phải link tới phác đồ Hội chứng vành cấp (px_acs)");
["10.1056/NEJM199602223340801","10.1016/j.annemergmed.2012.07.119","10.1016/j.ahj.2015.09.005","10.1093/eurheartj/ehad191"].forEach(d => ok(html.includes(d), "Sgarbossa: thiếu DOI đã kiểm chứng " + d));
const sgKw = (html.match(/\{id:"sgarbossa"[^}]*kw:"([^"]*)"/) || [])[1] || "";
ok(/sgarbossa/.test(sgKw) && /lbbb/.test(sgKw) && /block nhanh trai/.test(sgKw), "Sgarbossa: từ khóa phải tìm được bằng 'Sgarbossa', 'LBBB', 'block nhánh trái', nhận: " + sgKw);
ok(toolIds.size === 176, "Tổng công cụ đăng ký phải là 176 (163 cũ + 13 phác đồ ngộ độc mới), nhận: " + toolIds.size);
ok((html.match(/cat:"phacdo"/g) || []).length === 60, "Số phác đồ phải là 60 (47 cũ + 13 phác đồ ngộ độc mới)");
// Bảng điều khiển render được thật (chạy các helper chuỗi + gán P.sgarbossa trong vm)
const ctxP = { P: {} };
vm.createContext(ctxP);
vm.runInContext(grab("/* ============ Build detail panels ============ */", "var P={};"), ctxP);
vm.runInContext(grab("function segHTML(id,label,opts){", "function sumChecks"), ctxP);
vm.runInContext("var P={};", ctxP);
vm.runInContext(grab("/* ---------- Sgarbossa ---------- */", "function calcSgarbossa(){"), ctxP);
const sgPanel = vm.runInContext("P.sgarbossa", ctxP);
ok(typeof sgPanel === "string" && sgPanel.includes('id="res-sgarbossa"'), "Sgarbossa: bảng điều khiển render ra ô kết quả res-sgarbossa");
ok(sgPanel.includes('onclick="calcSgarbossa()"') && sgPanel.includes('id="sg_conc"') && sgPanel.includes('id="sg_dep"') && sgPanel.includes('id="sg_ste"') && sgPanel.includes('id="sg_s"'), "Sgarbossa: bảng render đủ nút Tính + 2 câu Có/Không + 2 ô số");
// Động: chạy calcSgarbossa thật trong vm với DOM giả (ô nhập + nút đoạn Có/Không + setRes ghi lại)
const ctxS = { console };
let sgInputs = {}, sgSegs = {}, lastRes = null;
ctxS.$ = (id) => (id in sgInputs ? { value: sgInputs[id] } : null);
ctxS.document = { querySelector: (sel) => { const m = sel.match(/^#(\w+) button\.on$/); if (!m) return null; const v = sgSegs[m[1]]; return v == null ? null : { dataset: { v } }; } };
ctxS.setRes = (id, big, interp, lv) => { lastRes = { id, big, interp, lv }; };
vm.createContext(ctxS);
vm.runInContext(grab("function num(id){", "/* ============ Tool registry"), ctxS);
vm.runInContext(grab("function calcSgarbossa(){", "/* ---------- Delta pCO2 (Pv-aCO2) ---------- */"), ctxS);
function runSg(conc, dep, ste, s) {
  sgSegs = { sg_conc: conc, sg_dep: dep };
  sgInputs = {};
  if (ste != null) sgInputs.sg_ste = String(ste);
  if (s != null) sgInputs.sg_s = String(s);
  lastRes = null;
  vm.runInContext("calcSgarbossa();", ctxS);
  return lastRes;
}
let r;
r = runSg("yes", "no", null, null);
ok(r && r.id === "res-sgarbossa" && /DƯƠNG TÍNH/.test(r.big) && /5\/10/.test(r.big), "Sgarbossa (a): chỉ ST chênh lên đồng hướng → Smith dương, điểm gốc 5/10");
ok(r && r.lv === 3 && /px_acs/.test(r.interp), "Sgarbossa (a): dương tính → mức khẩn + link phác đồ STEMI");
r = runSg("no", "yes", null, null);
ok(r && /DƯƠNG TÍNH/.test(r.big) && /3\/10/.test(r.big), "Sgarbossa (b): chỉ ST chênh xuống V1–V3 → Smith dương, điểm gốc 3/10");
r = runSg("no", "no", 2, 12);
ok(r && /ÂM TÍNH/.test(r.big) && /0\/10/.test(r.big) && /17%/.test(r.interp), "Sgarbossa (c): ST ngược 2mm/S 12mm (tỉ số 0,17) → Smith âm, điểm gốc 0");
r = runSg("no", "no", 4, 10);
ok(r && /DƯƠNG TÍNH/.test(r.big) && /0\/10/.test(r.big), "Sgarbossa (d): ST ngược 4mm/S 10mm (tỉ số 0,40) → Smith DƯƠNG nhưng điểm gốc 0");
ok(r && /40%/.test(r.interp), "Sgarbossa (d): kết quả ghi rõ tỉ số ST/S 40%");
r = runSg("no", "no", 6, 30);
ok(r && /ÂM TÍNH/.test(r.big) && /2\/10/.test(r.big), "Sgarbossa (e): ST ngược 6mm/S 30mm (tỉ số 0,20) → Smith âm, điểm gốc 2 (dưới ngưỡng)");
ok(r && /chưa đạt ngưỡng Smith/.test(r.interp), "Sgarbossa (e): ghi rõ ST ngược đủ điểm gốc nhưng chưa đạt ngưỡng Smith");
r = runSg("no", "no", null, null);
ok(r && /ÂM TÍNH/.test(r.big) && /không loại trừ/.test(r.interp), "Sgarbossa (f): tất cả âm → âm tính + cảnh báo không loại trừ NMCT");
// Hồi quy v2.7.5b (bài học v2.0.1 — lỗi SOFA-2): Sgarbossa phải tự tính lúc load trang với mặc định,
// không để ô kết quả trống "—" khi mới mở panel (2 câu mặc định "Không", 2 ô số trống → âm tính + cảnh báo)
ok(/addEventListener\("load",function\(\)\{try\{[^}]*calcSgarbossa\(\);/.test(html), "Sgarbossa (load): hàm tính phải có trong danh sách tính lúc load trang");
ok(sgPanel.includes('data-v="no" class="on">Không'), "Sgarbossa (load): mặc định khi mở panel phải là 'Không' ở cả 2 câu");
r = runSg("no", "no", null, null);
ok(r && r.id === "res-sgarbossa", "Sgarbossa (load): mở panel với mặc định → setRes phải ghi vào res-sgarbossa (không còn '—')");
ok(r && /ÂM TÍNH/.test(r.big) && /0\/10/.test(r.big) && /không loại trừ/.test(r.interp), "Sgarbossa (load): mặc định → âm tính 0/10 + cảnh báo không loại trừ NMCT");
console.log("Hồi quy v2.7.5 Sgarbossa: đăng ký + bảng điều khiển + 6 ca tính (a)–(f)");
// v2.7.8: Delta pCO2 (Pv-aCO2) — khoảng chênh pCO2 tĩnh mạch trung tâm – động mạch
// Tĩnh: đăng ký, bảng điều khiển, id ô kết quả khớp hàm tính (bài học v2.0.1), link phác đồ sốc nhiễm trùng, nguồn DOI
ok(html.includes('{id:"deltapco2",icon:"💨",cat:"timmach"'), "Delta pCO2: chưa đăng ký trong TOOLS (nhóm Tim mạch – sốc)");
ok(html.includes('P.deltapco2=head('), "Delta pCO2: chưa có bảng điều khiển P.deltapco2");
ok(html.includes('resHTML("res-deltapco2")') && html.includes('setRes("res-deltapco2"'), "Delta pCO2: id ô kết quả res-deltapco2 phải khớp id hàm tính ghi vào");
ok(html.includes('id="dp_pa"') && html.includes('value="40"') && html.includes('id="dp_pv"') && html.includes('value="45"'), "Delta pCO2: 2 ô chính phải có mặc định PaCO2 40 / PvCO2 45");
ok(html.includes('numHTML("dp_hb"') && html.includes('numHTML("dp_sao2"') && html.includes('numHTML("dp_svo2"'), "Delta pCO2: thiếu 3 ô tùy chọn cho tỉ số (Hb, SaO2, ScvO2)");
ok(html.includes('deltapco2:calcDeltaPCO2'), "Delta pCO2: chưa gắn vào bảng tự tính (M map) để tính khi đổi số liệu");
ok(html.includes('#/px_sepsis'), "Delta pCO2: kết quả giãn rộng phải link tới phác đồ Sốc nhiễm trùng (px_sepsis)");
["10.1007/s00134-008-1199-0","10.1007/s00134-015-3720-6","10.1097/CCM.0b013e318275cece","10.1186/s13054-015-0858-0"].forEach(d => ok(html.includes(d), "Delta pCO2: thiếu DOI đã kiểm chứng " + d));
const dpKw = (html.match(/\{id:"deltapco2"[^}]*kw:"([^"]*)"/) || [])[1] || "";
ok(/delta pco2/.test(dpKw) && /pvaco2/.test(dpKw) && /soc nhiem trung/.test(dpKw), "Delta pCO2: từ khóa phải tìm được bằng 'delta pco2', 'pvaco2', 'sốc nhiễm trùng', nhận: " + dpKw);
// Bảng điều khiển render được thật (chạy các helper chuỗi + gán P.deltapco2 trong vm)
const ctxDp = { P: {} };
vm.createContext(ctxDp);
vm.runInContext(grab("/* ============ Build detail panels ============ */", "var P={};"), ctxDp);
vm.runInContext(grab("function segHTML(id,label,opts){", "function sumChecks"), ctxDp);
vm.runInContext("var P={};", ctxDp);
vm.runInContext(grab("/* ---------- Delta pCO2 (Pv-aCO2) ---------- */", "function calcDeltaPCO2(){"), ctxDp);
const dpPanel = vm.runInContext("P.deltapco2", ctxDp);
ok(typeof dpPanel === "string" && dpPanel.includes('id="res-deltapco2"'), "Delta pCO2: bảng điều khiển render ra ô kết quả res-deltapco2");
ok(dpPanel.includes('onclick="calcDeltaPCO2()"') && dpPanel.includes('id="dp_pa"') && dpPanel.includes('id="dp_pv"') && dpPanel.includes('id="dp_hb"') && dpPanel.includes('id="dp_sao2"') && dpPanel.includes('id="dp_svo2"'), "Delta pCO2: bảng render đủ nút Tính + 2 ô chính + 3 ô tỉ số");
// Động: chạy calcDeltaPCO2 thật trong vm với DOM giả (ô nhập + setRes ghi lại)
const ctxD = { console };
let dpInputs = {}, dpLast = null;
ctxD.$ = (id) => (id in dpInputs ? { value: dpInputs[id] } : null);
ctxD.setRes = (id, big, interp, lv) => { dpLast = { id, big, interp, lv }; };
vm.createContext(ctxD);
vm.runInContext(grab("function num(id){", "/* ============ Tool registry"), ctxD);
vm.runInContext(grab("function calcDeltaPCO2(){", "/* ---------- DOAC ---------- */"), ctxD);
function runDp(pa, pv, hb, sao2, svo2) {
  dpInputs = {};
  if (pa != null) dpInputs.dp_pa = String(pa);
  if (pv != null) dpInputs.dp_pv = String(pv);
  if (hb != null) dpInputs.dp_hb = String(hb);
  if (sao2 != null) dpInputs.dp_sao2 = String(sao2);
  if (svo2 != null) dpInputs.dp_svo2 = String(svo2);
  dpLast = null;
  vm.runInContext("calcDeltaPCO2();", ctxD);
  return dpLast;
}
r = runDp(40, 45);
ok(r && r.id === "res-deltapco2" && /ΔpCO2 = 5 mmHg/.test(r.big) && /Bình thường/.test(r.big), "Delta pCO2 (a): mặc định 40/45 → gap 5 mmHg, bình thường");
ok(r && r.lv === 0, "Delta pCO2 (a): gap bình thường → mức 0");
r = runDp(40, 48);
ok(r && /ΔpCO2 = 8 mmHg/.test(r.big) && /Giãn rộng/.test(r.big), "Delta pCO2 (b): 40/48 → gap 8 mmHg, giãn rộng");
ok(r && r.lv === 2 && /px_sepsis/.test(r.interp), "Delta pCO2 (b): giãn rộng → mức 2 + link phác đồ Sốc nhiễm trùng");
r = runDp(45, 42);
ok(r && /-3 mmHg/.test(r.big) && /Âm/.test(r.big) && /Lấy lại khí máu/.test(r.interp), "Delta pCO2 (c): 45/42 → gap âm, cảnh báo lấy lại mẫu");
ok(r && r.lv === 1, "Delta pCO2 (c): gap âm → mức 1");
r = runDp(40, 48, 10, 98, 70);
ok(r && /2,13/.test(r.interp) && /yếm khí/.test(r.interp), "Delta pCO2 (d): gap 8 + Hb 10, SaO2 98, ScvO2 70 → tỉ số 2,13 > 1,4, gợi ý yếm khí");
r = runDp(40, 44, 12, 98, 75);
ok(r && /1,08/.test(r.interp) && /≤ 1,4/.test(r.interp), "Delta pCO2 (e): gap 4 + Hb 12, SaO2 98, ScvO2 75 → tỉ số 1,08 ≤ 1,4");
r = runDp(40, 45, 8, 98, 75);
ok(r && r.lv === 2 && /2,03/.test(r.interp), "Delta pCO2 (f): gap 5 bình thường nhưng tỉ số 2,03 > 1,4 → nâng mức 2");
r = runDp(null, null);
ok(r && r.big === "—" && /Nhập PaCO2/.test(r.interp), "Delta pCO2 (g): chưa nhập số → '—' + nhắc nhập");
// Hồi quy v2.7.8 (bài học v2.0.1): Delta pCO2 phải tự tính lúc load trang với mặc định,
// không để ô kết quả trống "—" khi mới mở panel (PaCO2 40, PvCO2 45 → gap 5, bình thường)
ok(/addEventListener\("load",function\(\)\{try\{[^}]*calcDeltaPCO2\(\);/.test(html), "Delta pCO2 (load): hàm tính phải có trong danh sách tính lúc load trang");
r = runDp(40, 45);
ok(r && r.id === "res-deltapco2", "Delta pCO2 (load): mở panel với mặc định → setRes phải ghi vào res-deltapco2 (không còn '—')");
ok(r && /Bình thường/.test(r.big) && /5 mmHg/.test(r.big), "Delta pCO2 (load): mặc định → gap 5 mmHg, bình thường");
console.log("Hồi quy v2.7.8 Delta pCO2: đăng ký + bảng điều khiển + 7 ca tính (a)–(g)");
// v2.7.6: Trang chủ — nhóm gấp lại thay vì trải 162 thẻ
ok(html.includes('class="grp-list"') && html.includes("data-grp=") && html.includes("data-grpall="), "Trang chủ v2.7.6: có danh sách nhóm gấp lại + nút Xem đủ");
ok(/items\.slice\(0,6\)\.map\(toolCard\)/.test(html), "Trang chủ v2.7.6: nhóm mở chỉ hiện 6 thẻ đầu");
ok(/store\("nkhs_opengrp"\)/.test(html), "Trang chủ v2.7.6: nhớ nhóm mở trong nkhs_opengrp");
ok(/"nkhs_seen_ver","nkhs_opengrp"\]\.forEach/.test(html), "Xóa dữ liệu đã lưu phải xóa cả nkhs_opengrp");
console.log("Hồi quy v2.7.6 Trang chủ: nhóm gấp lại");
// Phiên bản v2.7.9
ok(html.includes('APP_VERSION="2.8.0"'), "APP_VERSION phải là 2.8.0");
// v2.8.0: 13 phác đồ ngộ độc mới
["px_metformin","px_benzo","px_corrosive","px_theo","px_lithium","px_valproate","px_bee","px_inh","px_glyphosate","px_ironlead","px_hydrocarbon","px_su","px_rare"].forEach(id => {
  ok(toolIds.has(id), "v2.8.0: thiếu đăng ký TOOLS cho " + id);
  ok(PROTO.some(p => p.id === id), "v2.8.0: thiếu cây phác đồ " + id);
});
["px_metformin","px_theo","px_lithium","px_valproate"].forEach(id => ok(html.includes(id + ":[[") , "v2.8.0: thiếu nguồn SOURCES cho " + id));
ok(DRUGDB.some(d => d.g === "Pyridoxine"), "v2.8.0: Sổ tay thiếu Pyridoxine");
ok(MONO["Pyridoxine"] && MONO["Pyridoxine"].dose && MONO["Pyridoxine"].dose.length > 10, "v2.8.0: Sổ tay Pyridoxine thiếu liều");
console.log("Hồi quy v2.7.0 wizard kháng sinh: đi hết 5 bước, sửa giữa chừng, lỗi (a)(b)(c), hscc.vn, thuốc thay thế");

console.log(fail ? `\n❌ ${fail} lỗi, ${pass} đạt` : `\n✅ Tất cả ${pass} kiểm tra đều đạt`);
process.exit(fail ? 1 : 0);
