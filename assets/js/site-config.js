/* ===========================================================================
 * site-config.js —— 全站唯一的配置入口（改这一个文件，全站生效）
 * ---------------------------------------------------------------------------
 * ⚠️ 上线前必改：whatsapp / phone / email / address / mapEmbedUrl / siteUrl
 * 这些值会被 main.js 读取，用于生成 WhatsApp 悬浮按钮、悬浮询价条、表单默认值等。
 * ========================================================================= */
window.SITE_CONFIG = {
  /* ---- 品牌 ---- */
  brandName: '杰诚 HOUSE',
  brandFullName: '杰诚 Modular House Co., Ltd.', // 公司全称（页脚 / SEO）
  tagline: 'Expandable Container House Manufacturer',

  /* ---- 联系方式（替换成你自己的） ---- */
  /** WhatsApp 号码：纯数字，国家码开头，不要 + 和空格。例：8613800000000 */
  whatsapp: '8613800000000',
  /** WhatsApp 默认预填消息，{page} 会被替换成当前页面标题 */
  whatsappMessage: 'Hi, I am interested in your expandable container house. Please send me the price list and catalogue.',
  phone: '+86 138 0000 0000',
  phoneHref: '+8613800000000',
  email: 'sales@example-containerhouse.com',
  emailHref: 'sales@example-containerhouse.com',
  addressShort: 'Shijiazhuang, Hebei, China',
  addressFull: 'No. 88 Industrial Road, Zhengding District, Shijiazhuang, Hebei Province, China 050800',
  /** 工厂参观 / 办公时间（页脚展示用） */
  hours: 'Mon – Sat  08:30 – 18:00 (GMT+8)',

  /* ---- Google 地图嵌入（替换为你工厂的 embed 地址） ----
   * 取法：Google Maps → 搜到工厂位置 → 分享 → 嵌入地图 → 复制 iframe 的 src
   * 下面这条是不需要 API Key 的通用查询写法，可直接改 ?q= 后面的地点 */
  mapEmbedUrl:
    'https://www.google.com/maps?q=Zhengding%20District%2C%20Shijiazhuang%2C%20Hebei%2C%20China&output=embed',

  /* ---- 站点 ---- */
  siteUrl: 'https://www.example-containerhouse.com',
  /** 首页 / 询盘表单的价格起点，用于「Starting from」模块和结构化数据 */
  startingPrice: 4500,
  currency: 'USD',

  /* ---- 表单提交 ----
   * 纯静态站没有后端。三选一：
   * 1) 换成 Formspree / Getform 等第三方地址（把 endpoint 填进去，method 保持 POST）
   * 2) 用 Cloudflare Workers / 自己服务器写个接口
   * 3) 先留空，表单会走本地演示模式（不真正发送，只提示成功）
   */
  formEndpoint: '', // 例：'https://formspree.io/f/xxxxxxx'
  formMethod: 'POST',
};
