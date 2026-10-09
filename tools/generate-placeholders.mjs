/**
 * generate-placeholders.mjs
 * ---------------------------------------------------------------------------
 * 生成站点所需的全部 SVG 占位图（blueprint / 工程图风格）。
 * 目的：站点在没有真实照片之前也能完整跑起来、且视觉统一。
 *
 * 用法： node tools/generate-placeholders.mjs
 * 输出： assets/img/*.svg
 *
 * 【替换真实照片】把 HTML 里的 src="assets/img/xxx.svg" 换成 xxx.jpg 即可，
 * 宽高比例建议保持一致（页面里已用 aspect-[] 锁定比例，不会跳动）。
 * ---------------------------------------------------------------------------
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'assets', 'img');
mkdirSync(OUT, { recursive: true });

/* ---------- 配色（与 style.css / tailwind.config.js 保持一致） ---------- */
const C = {
  navy: '#1a365d',
  navyD: '#0e2340',
  navyM: '#2a5084',
  navyL: '#8baed8',
  accent: '#ed8936',
  accentD: '#c05621',
  paper: '#f7fafc',
  white: '#ffffff',
  ink: '#2d3748',
  muted: '#94a3b8',
  line: '#cbd5e1',
  grid: '#dbe7f5',
};
const FD = 'font-family="Barlow Condensed, Inter, Helvetica, Arial, sans-serif"';
const FB = 'font-family="Inter, Helvetica, Arial, sans-serif"';

/* ---------- 小工具 ---------- */
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const t = (x, y, s, o = {}) => {
  s = esc(s);
  const {
    size = 14, fill = C.ink, weight = 600, anchor = 'start',
    ls = 0, opacity = 1, box = false, family = FD,
  } = o;
  return `<text x="${x}" y="${y}" ${family} font-size="${size}" fill="${fill}" font-weight="${weight}" text-anchor="${anchor}" letter-spacing="${ls}" opacity="${opacity}"${box ? ' paint-order="stroke" stroke="#ffffff" stroke-width="4" stroke-linejoin="round"' : ''}>${s}</text>`;
};
const rect = (x, y, w, h, o = {}) => {
  const { fill = 'none', stroke = C.navy, sw = 2, dash = '', rx = 0, opacity = 1 } = o;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" rx="${rx}"${dash ? ` stroke-dasharray="${dash}"` : ''} opacity="${opacity}" />`;
};
const line = (x1, y1, x2, y2, o = {}) => {
  const { stroke = C.navy, sw = 1, dash = '', opacity = 1 } = o;
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${sw}"${dash ? ` stroke-dasharray="${dash}"` : ''} opacity="${opacity}" />`;
};
const circle = (cx, cy, r, o = {}) => {
  const { fill = 'none', stroke = C.navy, sw = 2 } = o;
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" />`;
};
const arrow = (x, y, dir, color = C.navy) => {
  const s = 5;
  const p = { left: `${x},${y} ${x + s},${y - s * 0.6} ${x + s},${y + s * 0.6}`,
    right: `${x},${y} ${x - s},${y - s * 0.6} ${x - s},${y + s * 0.6}`,
  }[dir];
  return `<polygon points="${p}" fill="${color}" />`;
};
/** 水平尺寸标注线 */
const dimH = (x1, x2, y, label, color = C.navy, size = 13) =>
  line(x1, y, x2, y, { stroke: color, sw: 1 }) +
  arrow(x1, y, 'left', color) + arrow(x2, y, 'right', color) +
  line(x1, y - 12, x1, y + 12, { stroke: color, sw: 0.8, opacity: 0.6 }) +
  line(x2, y - 12, x2, y + 12, { stroke: color, sw: 0.8, opacity: 0.6 }) +
  t((x1 + x2) / 2, y - 8, label, { size, fill: color, anchor: 'middle', ls: 1, box: true, weight: 700 });
/** 垂直尺寸标注线 */
const dimV = (x, y1, y2, label, color = C.navy, size = 13) =>
  line(x, y1, x, y2, { stroke: color, sw: 1 }) +
  arrow(x, y1, 'left', color) + arrow(x, y2, 'right', color) +
  `<g transform="translate(${x - 8},${(y1 + y2) / 2}) rotate(-90)">${t(0, 0, label, { size, fill: color, anchor: 'middle', ls: 1, box: true, weight: 700 })}</g>`;

/* ---------- 统一外框 ---------- */
function frame(w, h, tiles, body, bg = C.paper) {
  const tile = `<pattern id="tile" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="${C.grid}" stroke-width="1"/></pattern>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img">
<defs>${tile}${tiles || ''}</defs>
<rect width="${w}" height="${h}" fill="${bg}"/>
<rect width="${w}" height="${h}" fill="url(#tile)"/>
${body}
</svg>`;
}
/** 尺寸角标（工程图常见的裁切十字） */
const cornerMarks = (w, h) =>
  [[24, 24, 1, 1], [w - 24, 24, -1, 1], [24, h - 24, 1, -1], [w - 24, h - 24, -1, -1]]
    .map(([x, y, dx, dy]) => line(x - 10 * dx, y, x + 10 * dx, y, { stroke: C.muted, sw: 1 }) + line(x, y - 10 * dy, x, y + 10 * dy, { stroke: C.muted, sw: 1 })).join('');
/** 右下角“占位图”水印 */
const placeholderTag = (w, h, label = 'PLACEHOLDER · 替换为实拍图') =>
  `<g opacity="0.55">${t(w - 26, h - 22, label, { size: 11, fill: C.muted, anchor: 'end', ls: 1, weight: 600, family: FB })}</g>`;

/* ===========================================================================
 * 产品数据（页面里的参数以 HTML 表格为准，这里只用于画图）
 * ========================================================================= */
const MODELS = [
  { key: '20ft', title: '20FT EXPANDABLE', sub: '2 Bedrooms · 1 Bath', closed: '5900 × 2260 × 2480 mm', open: '5900 × 6300 mm', area: '37.2 m²', panels: 3,
    rooms: [
      { x: 0, y: 0, w: 2.6, h: 3.1, label: 'BEDROOM 1', area: '9.1 m²' },
      { x: 2.6, y: 0, w: 2.7, h: 3.1, label: 'BATH + LAUNDRY', area: '7.6 m²' },
      { x: 0, y: 3.1, w: 2.3, h: 3.2, label: 'KITCHEN', area: '7.4 m²' },
      { x: 2.3, y: 3.1, w: 3.0, h: 3.2, label: 'LIVING / DINING', area: '9.6 m²' },
    ] },
  { key: '30ft', title: '30FT EXPANDABLE', sub: '3 Bedrooms · 1 Bath', closed: '9000 × 2260 × 2480 mm', open: '9000 × 6300 mm', area: '56.7 m²', panels: 3,
    rooms: [
      { x: 0, y: 0, w: 3.0, h: 3.1, label: 'BEDROOM 1', area: '9.3 m²' },
      { x: 3.0, y: 0, w: 3.0, h: 3.1, label: 'BEDROOM 2', area: '9.3 m²' },
      { x: 6.0, y: 0, w: 3.0, h: 3.1, label: 'BEDROOM 3', area: '9.3 m²' },
      { x: 0, y: 3.1, w: 2.4, h: 3.2, label: 'KITCHEN', area: '7.7 m²' },
      { x: 2.4, y: 3.1, w: 4.0, h: 3.2, label: 'LIVING / DINING', area: '12.8 m²' },
      { x: 6.4, y: 3.1, w: 2.6, h: 3.2, label: 'BATHROOM', area: '8.3 m²' },
    ] },
  { key: '40ft', title: '40FT EXPANDABLE', sub: '3 Bedrooms · 2 Bath', closed: '11800 × 2260 × 2480 mm', open: '11800 × 6300 mm', area: '74.3 m²', panels: 4,
    rooms: [
      { x: 0, y: 0, w: 3.0, h: 3.1, label: 'MASTER BEDROOM', area: '9.3 m²' },
      { x: 3.0, y: 0, w: 3.0, h: 3.1, label: 'BEDROOM 2', area: '9.3 m²' },
      { x: 6.0, y: 0, w: 2.8, h: 3.1, label: 'BEDROOM 3', area: '8.7 m²' },
      { x: 8.8, y: 0, w: 3.0, h: 3.1, label: 'BATHROOM 1', area: '9.3 m²' },
      { x: 0, y: 3.1, w: 3.4, h: 3.2, label: 'KITCHEN', area: '10.9 m²' },
      { x: 3.4, y: 3.1, w: 4.6, h: 3.2, label: 'LIVING / DINING', area: '14.7 m²' },
      { x: 8.0, y: 3.1, w: 2.3, h: 3.2, label: 'BATH 2 / STORE', area: '7.4 m²' },
    ] },
  { key: 'cabin', title: 'APPLE CABIN', sub: 'Studio · Capsule House', closed: '5800 × 2200 × 2500 mm', open: '5800 × 2200 mm', area: '12.8 m²', panels: 1,
    rooms: [
      { x: 0, y: 0, w: 4.1, h: 2.2, label: 'STUDIO / LIVING', area: '9.0 m²' },
      { x: 4.1, y: 0, w: 1.7, h: 2.2, label: 'BATH', area: '3.8 m²' },
    ] },
];

/* ===========================================================================
 * 1. 产品立视图（Front Elevation）
 * ========================================================================= */
function elevation(m) {
  const W = 800, H = 560;
  const bx = 84, by = 150, bw = 632, bh = 258;          // 展开后外轮廓
  const pw = bw / m.panels;                              // 每块折叠板宽
  let body = '';

  // 地面
  body += line(48, by + bh, W - 48, by + bh, { stroke: C.navy, sw: 3 });
  body += `<g opacity="0.5">` + Array.from({ length: 26 }, (_, i) =>
    line(52 + i * 28, by + bh, 40 + i * 28, by + bh + 22, { stroke: C.navyL, sw: 1.2 })).join('') + `</g>`;

  // 屋体
  body += rect(bx, by, bw, bh, { fill: C.white, stroke: C.navy, sw: 3 });
  // 屋顶压条
  body += rect(bx - 8, by - 14, bw + 16, 14, { fill: C.navy, stroke: 'none' });
  // 地基钢梁
  body += rect(bx, by + bh, bw, 16, { fill: C.navyM, stroke: 'none' });

  // 折叠缝 + 折叠板标识
  for (let i = 1; i < m.panels; i++) {
    const x = bx + pw * i;
    body += line(x, by, x, by + bh, { stroke: C.accent, sw: 2, dash: '9 6' });
  }
  for (let i = 0; i < m.panels; i++) {
    body += t(bx + pw * i + pw / 2, by + bh + 44, `PANEL ${i + 1}`, { size: 12, fill: C.muted, anchor: 'middle', ls: 1 });
  }

  // 门（居中）
  const dw = 74, dh = 168, dx = bx + bw / 2 - dw / 2, dy = by + bh - dh;
  body += rect(dx, dy, dw, dh, { fill: C.paper, stroke: C.navy, sw: 2.4 });
  body += line(dx + dw - 14, dy + 12, dx + dw - 14, dy + dh - 12, { stroke: C.muted, sw: 2 });
  body += circle(dx + dw - 22, dy + dh / 2 + 26, 3, { fill: C.navy, stroke: 'none' });
  body += `<g transform="translate(${dx + dw / 2 + 30},${dy + dh - 30})">${t(0, 0, 'ENTRY 900', { size: 11, fill: C.muted, anchor: 'middle' })}</g>`;

  // 窗
  const winY = by + 62, winH = 96;
  m.panels > 1 && [-1, 1].forEach((s) => {
    const wx = bx + bw / 2 + s * (pw * 0.85) - 46;
    body += rect(wx, winY, 92, winH, { fill: '#eef5fd', stroke: C.navy, sw: 2.2 });
    body += line(wx + 46, winY, wx + 46, winY + winH, { stroke: C.navy, sw: 1.4 });
    body += line(wx, winY + winH / 2, wx + 92, winY + winH / 2, { stroke: C.navy, sw: 1.4 });
  });
  if (m.panels === 1) { // 苹果舱：整面落地玻璃 + 圆角
    body += rect(bx + 34, by + 46, 190, 168, { fill: '#eaf3fd', stroke: C.navy, sw: 2.4, rx: 10 });
    body += line(bx + 34 + 63, by + 46, bx + 34 + 63, by + 214, { stroke: C.navy, sw: 1.4 });
    body += line(bx + 34 + 126, by + 46, bx + 34 + 126, by + 214, { stroke: C.navy, sw: 1.4 });
  }

  // 底部总尺寸线
  body += dimH(bx, bx + bw, by + bh + 96, m.open.replace(/ mm/, ''), C.navy, 14);
  // 右侧高度尺寸
  body += dimV(bx + bw + 46, by, by + bh, '2480 mm', C.accentD, 13);
  // 顶部展开方向提示（居中，避开卡片左上角的角标）
  body += `<g opacity="0.85">${t(bx + bw / 2, 50, '◀  EXPANDS 2.8×  IN 30 MINUTES  ▶', { size: 15, fill: C.accent, anchor: 'middle', ls: 2, weight: 700 })}</g>`;

  // 型号标题条放在底部 —— 卡片/图库的角标在左上角，标题放顶部会被压住
  body += `<rect x="0" y="${H - 56}" width="${W}" height="56" fill="${C.navy}"/>`;
  body += t(28, H - 22, m.title, { size: 23, fill: C.white, ls: 1.6 });
  body += t(W - 28, H - 22, `${m.area}   ·   ${m.sub}`, { size: 15, fill: C.navyL, anchor: 'end', ls: 0.5, family: FB });

  body += cornerMarks(W, H);
  return frame(W, H, '', body);
}

/* ===========================================================================
 * 2. 户型图（Floor Plan）
 * ========================================================================= */
function floorPlan(m) {
  const W = 800, H = 560;
  const [tw, th] = m.area.startsWith('12') ? [5.8, 2.2] : [Number(m.open.split('×')[0]) / 1000, 6.3];
  const scale = Math.min(620 / tw, 340 / th);
  const ox = (W - tw * scale) / 2, oy = 96;
  const X = (v) => ox + v * scale, Y = (v) => oy + v * scale;
  let body = '';

  // 房间
  m.rooms.forEach((r) => {
    const x = X(r.x), y = Y(r.y), w = r.w * scale, h = r.h * scale;
    body += rect(x, y, w, h, { fill: C.white, stroke: C.navy, sw: 2.2 });
    body += t(x + w / 2, y + h / 2 - 4, r.label, { size: 13, fill: C.navy, anchor: 'middle', ls: 0.5 });
    body += t(x + w / 2, y + h / 2 + 16, r.area, { size: 12, fill: C.accentD, anchor: 'middle', family: FB });
  });

  // 折叠外墙（虚线，表示可展开部分）
  body += rect(X(0) - 26, Y(0), 26, th * scale, { fill: 'none', stroke: C.accent, sw: 3, dash: '10 6', rx: 2 });
  body += rect(X(tw) - 0, Y(0), 26, th * scale, { fill: 'none', stroke: C.accent, sw: 3, dash: '10 6', rx: 2 });
  body += `<g transform="translate(${X(0) - 13},${Y(0) + th * scale / 2}) rotate(-90)">${t(0, 0, 'FOLD', { size: 11, fill: C.accentD, anchor: 'middle', ls: 2, weight: 700 })}</g>`;
  body += `<g transform="translate(${X(tw) + 13},${Y(0) + th * scale / 2}) rotate(-90)">${t(0, 0, 'FOLD', { size: 11, fill: C.accentD, anchor: 'middle', ls: 2, weight: 700 })}</g>`;

  // 尺寸标注
  body += dimH(X(0), X(tw), Y(th) + 52, `${tw * 1000} mm`, C.navy, 14);
  body += dimV(X(0) - 62, Y(0), Y(th), `${th * 1000} mm`, C.navy, 13);

  // 底部标题条（左上角留给卡片角标）
  body += `<rect x="0" y="${H - 56}" width="${W}" height="56" fill="${C.navy}"/>`;
  body += t(28, H - 22, `${m.title}  ·  FLOOR PLAN`, { size: 22, fill: C.white, ls: 1.4 });
  body += t(W - 28, H - 22, `${tw * 1000} × ${th * 1000} mm   ·   ${m.area}`, { size: 15, fill: C.navyL, anchor: 'end', ls: 0.5, family: FB });
  return frame(W, H, '', body);
}

/* ===========================================================================
 * 3. 室内实景占位图
 * ========================================================================= */
const INTERIORS = [
  { key: 'living', label: 'LIVING AREA', sub: 'Sofa · TV wall · 2.8 m ceiling' },
  { key: 'kitchen', label: 'KITCHEN / DINING', sub: 'L-shaped cabinet · induction hob' },
  { key: 'bedroom', label: 'MASTER BEDROOM', sub: '1.8 m bed · wardrobe · AC' },
  { key: 'bathroom', label: 'BATHROOM', sub: 'Shower · WC · vanity · water heater' },
];
function interior(it) {
  const W = 800, H = 600;
  const grad = `<linearGradient id="ig" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fdf6ec"/><stop offset="1" stop-color="#e8eef6"/></linearGradient>
    <linearGradient id="iw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff8ea"/><stop offset="1" stop-color="#ffe7c2"/></linearGradient>`;
  let b = '';
  b += `<rect x="0" y="0" width="${W}" height="${H}" fill="url(#ig)"/>`;
  // 墙 / 地面分割
  b += `<rect x="0" y="0" width="${W}" height="430" fill="#f2f6fb"/>`;
  b += `<rect x="0" y="430" width="${W}" height="170" fill="#dbe4ee"/>`;
  b += line(0, 430, W, 430, { stroke: C.navyL, sw: 2, opacity: 0.6 });
  // 顶板
  b += `<rect x="0" y="0" width="${W}" height="26" fill="#e6ecf4"/>`;
  b += line(0, 26, W, 26, { stroke: C.navyL, sw: 2, opacity: 0.6 });
  // 窗
  b += `<rect x="470" y="96" width="250" height="250" rx="6" fill="url(#iw)" stroke="${C.navyM}" stroke-width="4"/>`;
  b += line(595, 96, 595, 346, { stroke: C.navyM, sw: 2.5 });
  b += line(470, 221, 720, 221, { stroke: C.navyM, sw: 2.5 });

  // 家具剪影（按房间类型）
  const shapes = {
    living: `<rect x="120" y="300" width="230" height="92" rx="12" fill="${C.navyM}" opacity="0.85"/><rect x="120" y="272" width="230" height="34" rx="10" fill="${C.navy}" opacity="0.9"/><rect x="400" y="120" width="46" height="180" rx="6" fill="${C.navy}" opacity="0.75"/><rect x="160" y="404" width="150" height="12" rx="6" fill="${C.navy}" opacity="0.3"/>`,
    kitchen: `<rect x="90" y="250" width="300" height="26" fill="${C.navy}" opacity="0.9"/><rect x="90" y="276" width="300" height="120" fill="${C.navyM}" opacity="0.8"/><rect x="140" y="196" width="120" height="16" fill="${C.accent}" opacity="0.9"/><rect x="90" y="56" width="300" height="72" fill="${C.navy}" opacity="0.85"/>`,
    bedroom: `<rect x="110" y="272" width="280" height="130" rx="10" fill="${C.white}" stroke="${C.navyM}" stroke-width="3"/><rect x="110" y="272" width="280" height="42" rx="10" fill="${C.navy}" opacity="0.9"/><rect x="150" y="256" width="70" height="34" rx="6" fill="${C.paper}" stroke="${C.navyM}" stroke-width="2.5"/><rect x="248" y="256" width="70" height="34" rx="6" fill="${C.paper}" stroke="${C.navyM}" stroke-width="2.5"/><rect x="410" y="190" width="60" height="212" fill="${C.navyM}" opacity="0.75"/>`,
    bathroom: `<rect x="100" y="330" width="180" height="72" rx="8" fill="${C.white}" stroke="${C.navyM}" stroke-width="3"/><rect x="320" y="300" width="110" height="102" rx="8" fill="${C.navyM}" opacity="0.8"/><rect x="110" y="120" width="90" height="120" rx="40" fill="${C.accent}" opacity="0.55"/><rect x="430" y="360" width="220" height="14" rx="7" fill="${C.navy}" opacity="0.45"/>`,
  };
  b += shapes[it.key] || '';

  // 角标与说明
  b += `<rect x="0" y="${H - 66}" width="${W}" height="66" fill="${C.navy}" opacity="0.94"/>`;
  b += t(30, H - 28, it.label, { size: 24, fill: C.white, ls: 1.5 });
  b += t(W - 30, H - 28, it.sub, { size: 14, fill: C.navyL, anchor: 'end', family: FB });
  return frame(W, H, grad, b, '#eef2f8');
}

/* ===========================================================================
 * 4. 工厂 / 实力占位图
 * ========================================================================= */
const FACTORY = [
  { key: 'workshop', label: 'MAIN WORKSHOP · 52,000 m²', icon: 'roof' },
  { key: 'line', label: 'AUTOMATIC PRODUCTION LINE', icon: 'line' },
  { key: 'yard', label: 'CONTAINER YARD · STOCK & LOADING', icon: 'yard' },
  { key: 'qc', label: 'QC & PRE-SHIPMENT INSPECTION', icon: 'qc' },
];
function factory(f) {
  const W = 800, H = 600;
  const grad = `<linearGradient id="fg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#16294a"/><stop offset="1" stop-color="#0b1a2f"/></linearGradient>
    <pattern id="fgrid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#ffffff" stroke-width="0.6" opacity="0.07"/></pattern>`;
  let b = '';
  b += `<rect width="${W}" height="${H}" fill="url(#fg)"/><rect width="${W}" height="${H}" fill="url(#fgrid)"/>`;
  // 厂房桁架
  b += `<g opacity="0.5" stroke="${C.navyL}" stroke-width="2">`;
  for (let i = 0; i <= 12; i++) b += line(i * 68, 120, i * 68 + 34, 74, { stroke: C.navyL, sw: 1.6, opacity: 0.5 });
  b += line(0, 120, W, 120, { stroke: C.navyL, sw: 2, opacity: 0.6 }) + line(0, 74, W, 74, { stroke: C.navyL, sw: 2, opacity: 0.35 });
  b += `</g>`;
  if (f.icon === 'roof' || f.icon === 'qc') { // 钢结构骨架
    b += `<g opacity="0.45" stroke="${C.accent}" stroke-width="2.5">`;
    for (let i = 0; i < 4; i++) b += rect(90 + i * 165, 250, 130, 250, { fill: 'none', stroke: C.accent, sw: 2, opacity: 0.4 });
    b += `</g>`;
  }
  if (f.icon === 'line') { // 自动生产线
    b += `<rect x="60" y="400" width="680" height="34" fill="${C.navyM}" opacity="0.85"/>`;
    for (let i = 0; i < 7; i++) b += `<rect x="${86 + i * 96}" y="360" width="64" height="40" rx="4" fill="${C.accent}" opacity="${0.35 + i * 0.06}"/>`;
    b += `<rect x="300" y="180" width="200" height="120" rx="6" fill="${C.navyM}" opacity="0.7"/>`;
  }
  if (f.icon === 'yard') { // 堆场 + 龙门吊
    b += `<rect x="70" y="180" width="20" height="290" fill="${C.accent}" opacity="0.8"/><rect x="700" y="180" width="20" height="290" fill="${C.accent}" opacity="0.8"/><rect x="60" y="160" width="680" height="18" fill="${C.accent}" opacity="0.9"/>`;
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++)
      b += rect(120 + i * 200, 440 - j * 92, 170, 82, { fill: C.navyM, stroke: C.navyL, sw: 1.5, opacity: 0.55 + j * 0.12 });
  }
  if (f.icon === 'qc') { // 检测
    b += circle(400, 330, 96, { fill: 'none', stroke: C.accent, sw: 5 });
    b += `<polyline points="352,332 386,366 452,296" fill="none" stroke="${C.accent}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>`;
    for (let i = 0; i < 4; i++) b += line(120 + i * 180, 470, 180 + i * 180, 470, { stroke: C.navyL, sw: 3, opacity: 0.4 });
  }
  b += `<rect x="0" y="${H - 84}" width="${W}" height="84" fill="#000000" opacity="0.35"/>`;
  b += t(34, H - 34, f.label, { size: 22, fill: C.white, ls: 1.2 });
  b += t(W - 34, H - 48, 'FACTORY', { size: 12, fill: C.navyL, anchor: 'end', ls: 3, weight: 700 });
  b += t(W - 34, H - 28, '替换为实拍照片 (1600×1200)', { size: 12, fill: C.navyL, anchor: 'end', family: FB, opacity: 0.8 });
  return frame(W, H, grad, b, C.navyD);
}

/* ===========================================================================
 * 5. 客户案例占位图
 * ========================================================================= */
const PROJECTS = [
  { key: 'au', country: 'AUSTRALIA', city: 'Granny flat · Sydney NSW', model: '30FT EXPANDABLE', use: 'Granny Flat', hue: '#1e4a86' },
  { key: 'us', country: 'UNITED STATES', city: 'Backyard ADU · Austin TX', model: '20FT EXPANDABLE', use: 'ADU / Backyard', hue: '#25507f' },
  { key: 'nz', country: 'NEW ZEALAND', city: 'Holiday cabin · Queenstown', model: 'APPLE CABIN', use: 'Hospitality', hue: '#17517a' },
  { key: 'sa', country: 'SAUDI ARABIA', city: 'Labour camp · Riyadh', model: '40FT EXPANDABLE', use: 'Site Camp', hue: '#3d4a7a' },
  { key: 'af', country: 'NIGERIA', city: 'Staff housing · Lagos', model: '40FT EXPANDABLE', use: 'Staff Housing', hue: '#1f4f6e' },
  { key: 'cl', country: 'CHILE', city: 'Site office · Antofagasta', model: '30FT EXPANDABLE', use: 'Site Office', hue: '#2c4a72' },
  { key: 'ph', country: 'PHILIPPINES', city: 'Resort units · Cebu', model: 'APPLE CABIN', use: 'Resort / Rental', hue: '#1a5273' },
  { key: 'de', country: 'GERMANY', city: 'Student housing · Leipzig', model: '20FT EXPANDABLE', use: 'Multi-unit', hue: '#234a6b' },
  { key: 'ke', country: 'KENYA', city: 'Clinic annex · Nairobi', model: '30FT EXPANDABLE', use: 'Medical / Public', hue: '#2b5378' },
];
function project(p) {
  const W = 800, H = 600;
  const grad = `<linearGradient id="pg" x1="0" y1="0" x2="0.4" y2="1"><stop offset="0" stop-color="${p.hue}"/><stop offset="1" stop-color="#0b1a2f"/></linearGradient>
    <pattern id="pgrid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="#ffffff" stroke-width="0.6" opacity="0.06"/></pattern>
    <linearGradient id="psky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></linearGradient>`;
  let b = '';
  b += `<rect width="${W}" height="${H}" fill="url(#pg)"/><rect width="${W}" height="${H}" fill="url(#pgrid)"/>`;
  b += `<circle cx="640" cy="130" r="180" fill="url(#psky)"/>`;
  // 地平线
  b += `<rect x="0" y="452" width="${W}" height="148" fill="#000000" opacity="0.28"/>`;
  b += line(0, 452, W, 452, { stroke: '#ffffff', sw: 1.5, opacity: 0.25 });
  // 房体剪影
  const bw = 400, bh = 150, bx = (W - bw) / 2, by = 452 - bh;
  b += `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" fill="#ffffff" opacity="0.94"/>`;
  b += `<rect x="${bx - 10}" y="${by - 14}" width="${bw + 20}" height="14" fill="#ffffff" opacity="0.7"/>`;
  b += `<rect x="${bx + 46}" y="${by + 46}" width="86" height="66" fill="${p.hue}" opacity="0.9"/>`;
  b += `<rect x="${bx + 168}" y="${by + 46}" width="86" height="66" fill="${p.hue}" opacity="0.9"/>`;
  b += `<rect x="${bx + 300}" y="${by + 30}" width="66" height="120" fill="${C.accent}"/>`;
  b += `<rect x="${bx - 4}" y="${by + bh}" width="${bw + 8}" height="12" fill="#ffffff" opacity="0.5"/>`;
  // 地面草坪/沙地
  for (let i = 0; i < 30; i++) b += line(10 + i * 27, 470, 3 + i * 27, 486, { stroke: '#ffffff', sw: 1.6, opacity: 0.18 });
  // 信息条
  b += `<rect x="0" y="${H - 104}" width="${W}" height="104" fill="#000000" opacity="0.5"/>`;
  b += `<rect x="0" y="${H - 104}" width="6" height="104" fill="${C.accent}"/>`;
  b += t(34, H - 62, p.country, { size: 26, fill: C.white, ls: 2 });
  b += t(34, H - 36, p.city, { size: 14, fill: C.navyL, family: FB });
  b += t(W - 34, H - 62, p.model, { size: 15, fill: C.accent, anchor: 'end', ls: 1.5 });
  b += t(W - 34, H - 36, p.use, { size: 13, fill: C.navyL, anchor: 'end', family: FB });
  return frame(W, H, grad, b, p.hue);
}

/* ===========================================================================
 * 6. 博客头图
 * ========================================================================= */
const POSTS = [
  { key: 'shipping', label: 'EXPANDABLE HOUSE SHIPPING COSTS', tag: 'BUYER GUIDE', accent: '#ed8936' },
  { key: 'install', label: '30-MINUTE INSTALLATION EXPLAINED', tag: 'INSTALLATION', accent: '#8baed8' },
  { key: 'granny', label: 'GRANNY FLAT RULES IN AUSTRALIA', tag: 'COMPLIANCE', accent: '#f6a44b' },
  { key: 'adu', label: 'ADU PERMITS FOR US HOMEOWNERS', tag: 'COMPLIANCE', accent: '#8baed8' },
  { key: 'compare', label: 'CONTAINER HOUSE VS TINY HOME', tag: 'COMPARISON', accent: '#ed8936' },
  { key: 'maintain', label: 'LIFESPAN & MAINTENANCE', tag: 'TECHNICAL', accent: '#f6a44b' },
];
function blogThumb(p) {
  const W = 800, H = 450;
  const grad = `<linearGradient id="bg1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1a365d"/><stop offset="1" stop-color="#0e2340"/></linearGradient>
    <pattern id="bgrid" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M28 0H0V28" fill="none" stroke="#ffffff" stroke-width="0.6" opacity="0.08"/></pattern>`;
  let b = `<rect width="${W}" height="${H}" fill="url(#bg1)"/><rect width="${W}" height="${H}" fill="url(#bgrid)"/>`;
  // 装饰：工程线稿
  b += rect(90, 170, 620, 160, { fill: 'none', stroke: p.accent, sw: 3, opacity: 0.55 });
  b += line(330, 170, 330, 330, { stroke: p.accent, sw: 2, dash: '10 8', opacity: 0.5 });
  b += line(500, 170, 500, 330, { stroke: p.accent, sw: 2, dash: '10 8', opacity: 0.5 });
  b += t(400, 92, p.tag, { size: 15, fill: p.accent, anchor: 'middle', ls: 4, weight: 700 });
  // 注：此处原先有左上角「杰诚 JOURNAL」刊头标记，已移除。
  // 原因：博客卡片左上角有 .card-badge 角标（如「FEATURED」）会盖住它；
  //      且特色卡片的图片是 lg:h-full + cover 裁切，左右各裁掉约 150 viewBox 单位，
  //      挪到右上角同样会被裁掉。该标记不承载信息，直接删掉最稳。
  b += `<rect x="0" y="${H - 84}" width="${W}" height="84" fill="#000000" opacity="0.42"/>`;
  // 标题按词换行
  const words = p.label.split(' ');
  const lines = [];
  let cur = '';
  words.forEach((w) => { if ((cur + ' ' + w).trim().length > 34) { lines.push(cur.trim()); cur = w; } else cur += ' ' + w; });
  lines.push(cur.trim());
  // 底部标题改为居中：博客「特色卡片」的图片是半个卡片宽 + 满高，cover 裁切会切掉两侧，
  // 左对齐（原先 x=40）会导致标题开头被切掉（显示成「DABLE HOUSE SHIPPING COSTS」）。
  lines.slice(0, 2).forEach((l, i) => { b += t(400, H - 46 + i * 30, l, { size: 24, fill: C.white, ls: 1.2, anchor: 'middle' }); });
  return frame(W, H, grad, b, '#1a365d');
}

/* ===========================================================================
 * 7. Hero 蓝图
 * ========================================================================= */
function hero() {
  const W = 1600, H = 900;
  const grad = `<linearGradient id="hg" x1="0" y1="0" x2="0.6" y2="1"><stop offset="0" stop-color="#173154"/><stop offset="1" stop-color="#08131f"/></linearGradient>
    <pattern id="hgrid" width="50" height="50" patternUnits="userSpaceOnUse"><path d="M50 0H0V50" fill="none" stroke="#ffffff" stroke-width="0.8" opacity="0.07"/></pattern>
    <pattern id="hgrid2" width="250" height="250" patternUnits="userSpaceOnUse"><path d="M250 0H0V250" fill="none" stroke="#ffffff" stroke-width="1.2" opacity="0.06"/></pattern>`;
  let b = `<rect width="${W}" height="${H}" fill="url(#hg)"/><rect width="${W}" height="${H}" fill="url(#hgrid)"/><rect width="${W}" height="${H}" fill="url(#hgrid2)"/>`;
  b += `<circle cx="1240" cy="180" r="330" fill="#ffffff" opacity="0.035"/>`;
  b += `<circle cx="1240" cy="180" r="220" fill="none" stroke="#ed8936" stroke-width="1.5" opacity="0.25"/>`;
  // 主图：展开房立视
  const bx = 210, by = 420, bw = 720, bh = 210, pw = bw / 3;
  b += `<g opacity="0.95">`;
  b += line(90, by + bh + 28, W - 90, by + bh + 28, { stroke: C.navyL, sw: 2, opacity: 0.5 });
  b += `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" fill="#ffffff" opacity="0.06" stroke="#ffffff" stroke-width="3" stroke-opacity="0.85"/>`;
  b += `<rect x="${bx - 10}" y="${by - 16}" width="${bw + 20}" height="16" fill="#ffffff" opacity="0.5"/>`;
  for (let i = 1; i < 3; i++) b += line(bx + pw * i, by, bx + pw * i, by + bh, { stroke: C.accent, sw: 2.5, dash: '12 9' });
  b += `<rect x="${bx + 300}" y="${by + 40}" width="86" height="170" fill="#ed8936" opacity="0.85"/>`;
  b += `<rect x="${bx + 120}" y="${by + 60}" width="130" height="92" fill="#8baed8" opacity="0.5"/>`;
  b += `<rect x="${bx + 470}" y="${by + 60}" width="130" height="92" fill="#8baed8" opacity="0.5"/>`;
  b += `</g>`;
  b += dimH(bx, bx + bw, by + bh + 92, '6300 mm  EXPANDED', C.accent, 17);
  b += dimV(bx - 60, by, by + bh, '2480 mm', C.navyL, 15);
  // 标注引线
  b += `<g opacity="0.7">${line(bx + bw + 30, by + 40, bx + bw + 150, by - 40, { stroke: C.accent, sw: 1.5 })}${t(bx + bw + 158, by - 44, '95% PRE-ASSEMBLED IN FACTORY', { size: 15, fill: C.accent, ls: 1.5 })}</g>`;
  b += `<g opacity="0.7">${line(bx + 40, by + bh, bx + 40, by + bh + 200, { stroke: C.navyL, sw: 1.5 })}${t(bx + 48, by + bh + 220, 'SHIPPING VOLUME 1/5 OF ASSEMBLED', { size: 15, fill: C.navyL, ls: 1.5 })}</g>`;
  // 图纸抬头（只保留底部一行，顶部标题在窄屏会被裁切成残句，故去掉）
  b += line(64, H - 46, W - 64, H - 46, { stroke: C.navyL, sw: 1, opacity: 0.4 });
  b += t(64, H - 24, '杰诚 HOUSE · MODULAR BUILDING SYSTEMS', { size: 15, fill: C.navyL, ls: 3 });
  b += t(W - 64, H - 24, 'www.example-containerhouse.com', { size: 15, fill: C.accent, ls: 2, anchor: 'end' });
  return frame(W, H, grad, b, '#0e2340');
}

/* ===========================================================================
 * 8. 视频封面
 * ========================================================================= */
function videoPoster() {
  const W = 1280, H = 720;
  const grad = `<linearGradient id="vg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1b3a63"/><stop offset="1" stop-color="#0a1728"/></linearGradient>
    <pattern id="vgrid" width="44" height="44" patternUnits="userSpaceOnUse"><path d="M44 0H0V44" fill="none" stroke="#ffffff" stroke-width="0.7" opacity="0.07"/></pattern>`;
  let b = `<rect width="${W}" height="${H}" fill="url(#vg)"/><rect width="${W}" height="${H}" fill="url(#vgrid)"/>`;
  b += `<g stroke="#8baed8" stroke-width="2" opacity="0.32">`;
  for (let i = 0; i <= 10; i++) b += line(i * 128, 560, i * 128 + 64, 420, { stroke: '#8baed8', sw: 1.6, opacity: 0.3 });
  b += `</g>`;
  b += `<rect x="0" y="560" width="${W}" height="160" fill="#000000" opacity="0.25"/>`;
  for (let i = 0; i < 4; i++) b += rect(120 + i * 260, 380, 200, 180, { fill: '#ffffff', stroke: '#ffffff', sw: 1.5, opacity: 0.14 });
  b += circle(640, 330, 78, { fill: '#ed8936', stroke: 'none' });
  b += `<polygon points="614,292 614,368 686,330" fill="#ffffff"/>`;
  b += t(640, 470, 'FACTORY TOUR · 3 MIN', { size: 20, fill: '#ffffff', anchor: 'middle', ls: 4 });
  b += t(640, 500, '替换为你的 YouTube 视频嵌入代码', { size: 15, fill: '#8baed8', anchor: 'middle', family: FB });
  return frame(W, H, grad, b, '#0a1728');
}

/* ===========================================================================
 * 9. Logo 备用（页面内用 inline SVG，这里给一份文件版）
 * ========================================================================= */
function logo() {
  const W = 360, H = 96;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
<rect x="6" y="26" width="52" height="38" fill="none" stroke="${C.navy}" stroke-width="4"/>
<path d="M0 26 L32 4 L64 26" fill="none" stroke="${C.accent}" stroke-width="4" stroke-linejoin="round"/>
<line x1="23" y1="26" x2="23" y2="64" stroke="${C.navy}" stroke-width="3" stroke-dasharray="5 4"/>
<line x1="41" y1="26" x2="41" y2="64" stroke="${C.navy}" stroke-width="3" stroke-dasharray="5 4"/>
${t(78, 46, '杰诚 HOUSE', { size: 26, fill: C.navy, ls: 1.5 })}
${t(78, 68, 'EXPANDABLE CONTAINER HOUSE', { size: 12, fill: C.muted, ls: 1.6 })}
</svg>`;
}

/* ---------- 输出 ---------- */
const files = {
  'logo.svg': logo(),
  'hero-blueprint.svg': hero(),
  'video-poster.svg': videoPoster(),
};
MODELS.forEach((m) => { files[`product-${m.key}.svg`] = elevation(m); files[`floorplan-${m.key}.svg`] = floorPlan(m); });
INTERIORS.forEach((it) => { files[`interior-${it.key}.svg`] = interior(it); });
FACTORY.forEach((f) => { files[`factory-${f.key}.svg`] = factory(f); });
PROJECTS.forEach((p) => { files[`project-${p.key}.svg`] = project(p); });
POSTS.forEach((p) => { files[`blog-${p.key}.svg`] = blogThumb(p); });

let n = 0;
for (const [name, svg] of Object.entries(files)) {
  writeFileSync(join(OUT, name), svg);
  n++;
}
console.log(`✔ generated ${n} SVG placeholders -> ${OUT}`);
