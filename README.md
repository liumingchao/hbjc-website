# Expandable Container House — 外贸独立站

纯静态多页面站点：**原生 HTML + Tailwind CSS（已编译）+ 原生 JavaScript**，无框架、无运行时依赖。
参考结构来自 hbtygbhouse.com，按需求做了 10 项改进（见文末对照表）。

---

## 1. 快速开始

```bash
# 本地预览（任选一个）
npm run serve            # http://localhost:5173
python3 -m http.server 5173
```

直接双击 `index.html` 也能看，但**建议用本地服务器**，否则部分浏览器会限制 JS 读取本地文件。

```bash
# 只在改了 HTML 里的 class、或改了 tailwind.config.js 之后需要跑
npm install              # 首次
npm run build:css        # 重新编译 assets/css/tailwind.css
npm run watch:css        # 开发时持续监听
```

> 站点已经内置编译好的 `assets/css/tailwind.css`（约 20 KB），**不依赖外网 CDN**，国内打开也快。
> Google Fonts 是唯一的外部请求，被墙时会自动回退到系统字体，不影响布局。

---

## 2. 目录结构

```
├── index.html                       首页（Hero / 卖点 / 价格区间 / 产品 / 工厂数据 / 案例 / 流程 / 评价 / 博客预览 / 询盘）
├── products.html                    产品列表（筛选 + 8 个产品卡 + 四款型号对比表 + 选型助手）
├── product-20ft-expandable.html     产品详情（图库 / 参数表 / 户型图 / 室内实景 / 安装步骤 / 定制选项 / FAQ / 询盘）
├── product-30ft-expandable.html     同上，30FT
├── product-40ft-expandable.html     同上，40FT
├── product-apple-cabin.html         同上，苹果舱
├── about.html                       关于我们（工厂 / 产能 / 认证 / 团队 / 视频 / 里程碑）
├── projects.html                    客户案例（9 个案例 + 筛选 + 里雅得项目拆解）
├── contact.html                     联系（表单 / 联系方式 / 询盘分派 / FAQ / Google 地图）
├── blog.html                        博客列表（置顶文 + 分类筛选 + 6 篇占位文章 + 订阅）
├── blog-post.html                   单篇文章模板（含正文排版样式示例）
│
├── favicon.ico                      ← 站点图标（16/32/48 多尺寸，必须放根目录）
│
├── assets/
│   ├── css/
│   │   ├── tailwind.css             ← 编译产物，不要手改
│   │   ├── tailwind.src.css         ← Tailwind 入口（@tailwind 指令）
│   │   └── style.css                ← 所有自定义组件样式（手写，带中文注释，共 14 段）
│   ├── js/
│   │   ├── site-config.js           ← 【改这个文件就能改全站联系方式】
│   │   └── main.js                  ← 全站交互（10 个模块，靠 data-* 自动挂载）
│   └── img/                         ← 占位图按用途分类，见下方「图片目录」
│       ├── icons/                   品牌与站点图标
│       │   ├── logo.svg             导航/页脚 logo 的文件版（页面内用的是 inline SVG）
│       │   ├── favicon.svg          可缩放站点图标（房子）
│       │   └── apple-touch-icon.png iOS 桌面图标（180×180）
│       ├── home/                    仅首页用的图（hero 蓝图）
│       ├── products/                ★ 每个商品一个独立目录
│       │   ├── 20ft-expandable/     cover / floorplan / interior-×4 / factory
│       │   ├── 30ft-expandable/     同上
│       │   ├── 40ft-expandable/     同上
│       │   ├── apple-cabin/         同上
│       │   ├── flat-pack/           只有 cover（没有详情页）
│       │   ├── detachable/          只有 cover
│       │   ├── ablution/            只有 cover
│       │   └── site-office/         只有 cover
│       ├── factory/                 工厂与实力图（about + 首页共用）
│       ├── projects/                客户案例（9 张，文件名 = 国家代码）
│       └── blog/                    博客头图（文件名 = 文章 slug）
│
├── tools/
│   ├── generate-placeholders.mjs    ← 生成 assets/img 下的全部占位图（按分类输出）
│   ├── generate-product-pages.mjs   ← 生成 4 个产品详情页（结构一致，只有参数不同）
│   └── make-favicon.py              ← 生成根目录 favicon.ico + apple-touch-icon.png
│
├── tailwind.config.js               品牌色 / 字体 / 阴影
└── package.json
```

### 图片目录（重要）

**核心原则：一个商品 = 一个目录，改一个商品的图绝不会影响别的商品。**

| 想做的事 | 怎么做 |
|---|---|
| 换某一张图 | 直接覆盖 `assets/img/` 下的同名文件。想用 jpg 就顺手改 HTML 里的后缀 |
| 换某个商品的实拍图 | 只动 `assets/img/products/<型号>/` 里的文件，其他型号不受影响 |
| **加一个新商品** | ① 新建 `assets/img/products/<新型号>/`，放 `cover.svg`（列表卡用）+ 需要的话 `floorplan.svg`、`interior-*.svg`、`factory.svg`；② 在 `products.html` 复制一张产品卡，把 `src` 指到新目录 |
| 重新生成占位图 | `node tools/generate-placeholders.mjs`（会按同样的目录结构重写全部 56 张） |
| 重新生成图标 | `python3 tools/make-favicon.py` |

> 为什么要按商品分目录：改造前 8 个产品卡只有 4 张图、4 个产品详情页的室内图完全共用 ——
> 换一张 20ft 的实景照，30ft / 40ft / 苹果舱三个页面会跟着一起变。现在每个型号目录独立，
> 目前 4 个折叠型号的室内图内容还是一样的（占位图本来就只有一套），但**已经解耦**，可以逐个替换。


---

## 3. 最常改的五件事

### ① 联系方式 / 品牌名 / WhatsApp 号码

只改 **`assets/js/site-config.js`** 一个文件，全站生效：

| 字段 | 说明 |
|---|---|
| `whatsapp` | 纯数字、国家码开头，如 `8613800000000`。用于右下角悬浮按钮、移动端底部条、所有 WhatsApp 链接（预填消息也在这一处） |
| `phone` / `phoneHref` | 展示用 / `tel:` 用 |
| `email` | 展示 + `mailto:` |
| `addressFull` / `addressShort` | 页脚 / 联系页 |
| `mapEmbedUrl` | Google Maps → 搜地址 → 分享 → 嵌入地图 → 复制 `src` |
| `brandName` / `brandFullName` | 导航 logo 文字 / 页脚公司全称 |
| `formEndpoint` | 为 **空** 时表单走本地演示（只做校验、不发送）；填 Formspree / Getform / 自建接口地址即可真发 |

> HTML 里所有联系方式都写成了 `data-site="phone"` 这类占位 + 兜底文字，JS 加载后用配置覆盖；
> 即使 JS 被禁用，页面也不会显示空白。

### ② 配色 / 字体

- 颜色：`tailwind.config.js` 的 `colors.brand`（深蓝）与 `colors.accent`（橙），
  以及 `assets/css/style.css` 顶部的 `:root` CSS 变量（两处一起改才彻底）。改完跑 `npm run build:css`。
- 字体：`tailwind.config.js` 的 `fontFamily`。数字/型号用的是 `Barlow Condensed`，正文 `Inter`。

### ③ 换图片

把 `assets/img/*.svg` 换成同名 `.jpg` / `.webp`，再把 HTML 里的 `src` 后缀改掉即可。
所有图片容器都用 `aspect-[4/3]` / `aspect-[16/9]` 锁了比例，**换图不会导致布局跳动**。

占位图是脚本生成的工程蓝图风格，不是随机乱图 —— 你可以直接留着当"技术图纸"，也可以全部替换。
重新生成：`npm run images`

### ④ 加产品 / 案例 / 博客文章

| 要加什么 | 怎么做 |
|---|---|
| 产品卡（列表页） | 复制 `products.html` 里任意一个 `<article data-cat="...">`，改图 / 参数 / 链接。新分类要同步加一个按钮 `data-filter="xxx"` |
| 产品详情页 | 改 `tools/generate-product-pages.mjs` 里的 `MODELS` 数据后重跑；或直接复制一个 `product-*.html` 手改（**注意：手改后再跑脚本会被覆盖**）|
| 案例 | 复制 `projects.html` 里的 `<article data-cat="...">` |
| 博客文章 | 复制 `blog-post.html` 另存新文件，替换 `<title>` / `<meta>` / `.prose-blog` 里的正文；再在 `blog.html` 复制一张卡片 |

### ⑤ 表单接真实后端

静态站没有后端。`site-config.js` 的 `formEndpoint` 填上即可：

```js
formEndpoint: 'https://formspree.io/f/xxxxxxx',   // 或自建接口
formMethod: 'POST',
```

已内置：前端校验（必填 / 邮箱 / 最小长度）、蜜罐字段 `_hp` 防机器人、提交中禁用按钮、成功提示、失败提示。
表单里会带 `product` / `source` 隐藏字段，方便你在邮箱里区分每个页面的询盘来源。

---

## 4. 已实现的 10 项需求对照

| # | 需求 | 实现位置 |
|---|---|---|
| 1 | WhatsApp 右下角悬浮按钮 | `main.js` 的 `injectWhatsApp()` 注入 → `style.css` 第 07 段。带脉冲动画、悬浮咨询小卡（3 条预填话术）、移动端自动上移避开底部操作条 |
| 2 | 导航栏固定「Request Quote」按钮 | 所有页面 `.site-header`（`position: sticky`），按钮在移动端也常驻，不藏在汉堡菜单里 |
| 3 | 每个产品页底部询盘表单 CTA | 4 个 `product-*.html` 的最后一节 `#inquiry`，型号已预填进隐藏字段和下拉框 |
| 4 | 首页价格区间展示 | 首页 `#pricing` 段：**Starting from $4,500** + 四型号价格表 + 影响价格的 4 个变量 |
| 5 | 客户案例 / Projects 页 | `projects.html`：9 个案例（国家 / 型号 / 用途 / 年份 / 结果），支持分类筛选，含里雅得 24 单元项目拆解 |
| 6 | 产品详情页六大板块 | 参数表 / 户型图（含 3 个备选布局）/ 内部实景 / 安装步骤（6 步时间轴）/ 定制选项（颜色·保温·卫浴·电气·外挂）/ 价格区间 |
| 7 | 首页博客预览区 | 首页第 10 段「Buyer guides」3 张卡片 → `blog.html` 完整列表 + `blog-post.html` 文章模板 |
| 8 | 配色 | 主色 `#1a365d`、点缀 `#ed8936`，工业风：蓝图网格底纹、窄体数字字体、工程图占位图、斜纹装饰条 |
| 9 | 响应式 | 已在 1440 / 1024 / 768 / 390 / 375 下实测无横向溢出；移动端底部有 WhatsApp + 询价固定操作条 |
| 10 | 页面清单 | Home / Products / Product Detail(×4) / About / Projects / Contact / Blog / Blog Post |

---

## 5. 上线前必做清单

- [ ] `site-config.js`：换 WhatsApp 号、电话、邮箱、地址、`siteUrl`、`mapEmbedUrl`
- [x] **品牌名已设为 `杰诚 HOUSE`**（公司全称 `杰诚 Modular House Co., Ltd.`）。如需再改，全局替换这两个词即可：共 11 个页面、`assets/js/site-config.js`、两个生成脚本、`assets/img/icons/logo.svg` 与 `assets/img/home/hero-blueprint.svg`
- [ ] **替换全部占位内容**：价格（$4,500 等）、工厂数据（16 年 / 52,000 m² / 5,000 台）、认证名称、案例国家与客户评价 —— 这些是按行业常识写的演示数据，**必须换成你们自己的真实数据**，否则对外承诺会有法律风险
- [ ] 产品参数（尺寸 / 荷载 / 材料）逐个核对，替换成实际生产规格
- [ ] 图片换成实拍照片（建议 WebP，单张 < 200 KB；按 `assets/img/products/<型号>/` 分目录逐个替换）
- [ ] 表单 `formEndpoint` 接上真实接口并测一次
- [ ] 每页的 `canonical` / `og:url` / `og:image` 换成真实域名
- [ ] 把 `assets/img/icons/logo.svg` 和根目录 `favicon.ico` 换成真实 logo（导航和页脚里的 logo 是 inline SVG，需同步改）

## 6. 其他说明

- **SEO 已预埋**：每页 title / description / canonical / OG 标签；首页有 `Organization` 结构化数据；产品页有 `Product`（含价格区间）与 `FAQPage` 结构化数据。
- **`meta description` 全部控制在 160 字符以内**（Google 约在 155–160 字符处截断，超长会被改写或截断，反而显示不出想要的文案）。
  首页那条目前是 171 字符，属有意保留的版本，介意的话可自行压到 160 以内。
- **站点图标**：根目录 `favicon.ico`（16/32/48）+ `assets/img/icons/favicon.svg` + `apple-touch-icon.png`。
  `favicon.ico` 必须在站点根目录，浏览器才会默认请求到；只给 SVG 图标的话 Safari 不认，标签页会空白。
- **无障碍**：跳转链接、`aria-current`、`aria-expanded`、FAQ 用 `<button>` + `aria-expanded`，表单 label 全部关联。
- **打印**：`@media print` 已隐藏导航、悬浮按钮和底部操作条。
- **减少动效**：`prefers-reduced-motion` 下关闭全部动画。
- **`node_modules` 只在本地编译 CSS 时用到，部署时不需要上传**。
