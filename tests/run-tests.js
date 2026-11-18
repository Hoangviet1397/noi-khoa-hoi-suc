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

console.log(fail ? `\n❌ ${fail} lỗi, ${pass} đạt` : `\n✅ Tất cả ${pass} kiểm tra đều đạt`);
process.exit(fail ? 1 : 0);
