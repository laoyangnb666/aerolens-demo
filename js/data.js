/* ========================================
   AeroLens · 云端相册 — Photo Data
   AI 无人机航拍摄影数据
   默认相册：重庆两江产业园 实拍航拍
   ======================================== */

const PHOTO_DATA = [
  {
    id: 'lj01',
    title: '碑立湖山',
    location: '重庆两江产业园 · 中国',
    category: 'nature',
    lat: 29.7102,
    lng: 106.6188,
    altitude: 90,
    droneModel: 'DJI Mavic 3 Pro',
    timestamp: '2026-10-12 15:32',
    resolution: '1908×2268',
    iso: 100,
    fStop: 'f/2.8',
    shutterSpeed: '1/500s',
    description: '正午俯瞰产业园纪念广场，石碑静立于花坛中央，一侧碧湖如镜、步道蜿蜒。两个白色的身影从碑前走过，为庄重的几何构图添了一笔轻盈。',
    tags: ['纪念碑', '湖景', '广场', '俯瞰'],
    titleEn: 'Monument by the Lake',
    locationEn: 'Liangjiang Industrial Park · China',
    descEn: 'A noon overview of the memorial plaza: a stone stele standing amid flower beds, a mirror-like lake curving alongside. Two white figures pass beneath it, a light stroke across the solemn geometry.',
    tagsEn: ['Monument', 'Lake', 'Plaza', 'Top-down'],
  },
  {
    id: 'lj02',
    title: '云下新城',
    location: '重庆两江产业园 · 中国',
    category: 'city',
    lat: 29.7088,
    lng: 106.6241,
    altitude: 120,
    droneModel: 'DJI Air 3',
    timestamp: '2026-10-12 16:08',
    resolution: '1908×2268',
    iso: 200,
    fStop: 'f/4.0',
    shutterSpeed: '1/320s',
    description: '厚重的云层压向地平线，山城楼宇在阴天里层层叠叠铺向远方。灰蓝的色调下，产业园与主城天际线融为一体，安静而辽阔。',
    tags: ['城市天际线', '阴天', '楼群', '远景'],
    titleEn: 'City Under Clouds',
    locationEn: 'Liangjiang Industrial Park · China',
    descEn: 'Heavy clouds press toward the horizon as the mountain city stacks itself layer upon layer into the distance. In muted grey-blue tones, the industrial park merges with the skyline — quiet and vast.',
    tagsEn: ['Skyline', 'Overcast', 'Buildings', 'Panorama'],
  },
  {
    id: 'lj03',
    title: '花径俯瞰',
    location: '重庆两江产业园 · 中国',
    category: 'city',
    lat: 29.7095,
    lng: 106.6203,
    altitude: 35,
    droneModel: 'DJI Mavic 3 Pro',
    timestamp: '2026-10-12 16:41',
    resolution: '1908×2268',
    iso: 100,
    fStop: 'f/2.8',
    shutterSpeed: '1/400s',
    description: '超低空垂直俯拍广场花坛，三角梅沿着池壁开成一条玫红的花河。石板上的菱形纹理与花带交错，两位少年在花径两端遥遥相望。',
    tags: ['花坛', '俯拍', '三角梅', '纹理'],
    titleEn: 'Blossom Crossing',
    locationEn: 'Liangjiang Industrial Park · China',
    descEn: 'An ultra-low vertical top-down of the plaza flower beds: bougainvillea runs along the pool edge like a river of rose. Diamond paving meets the blossom band as two figures gaze across at each other.',
    tagsEn: ['Flower Bed', 'Top-down', 'Bougainvillea', 'Texture'],
  },
  {
    id: 'lj04',
    title: '双影花坛',
    location: '重庆两江产业园 · 中国',
    category: 'city',
    lat: 29.7096,
    lng: 106.6200,
    altitude: 12,
    droneModel: 'DJI Mavic 3 Pro',
    timestamp: '2026-10-12 16:43',
    resolution: '1908×2268',
    iso: 100,
    fStop: 'f/2.8',
    shutterSpeed: '1/350s',
    description: '贴地航拍两位少年在花坛前合影：一人举镜记录，一人叉腰而立。盛放的三角梅铺满背景，白衫与玫红在灰色石板上格外明亮。',
    tags: ['人像', '合影', '花墙', '青春'],
    titleEn: 'Two by the Blossoms',
    locationEn: 'Liangjiang Industrial Park · China',
    descEn: 'A ground-hugging aerial of two friends by the flower bed — one raising a camera, one standing hands on hips. Bougainvillea in full bloom fills the frame behind their white shirts.',
    tagsEn: ['Portrait', 'Together', 'Flower Wall', 'Youth'],
  },
  {
    id: 'lj05',
    title: '静立广场',
    location: '重庆两江产业园 · 中国',
    category: 'city',
    lat: 29.7097,
    lng: 106.6198,
    altitude: 8,
    droneModel: 'DJI Air 3',
    timestamp: '2026-10-12 16:46',
    resolution: '1908×2268',
    iso: 100,
    fStop: 'f/2.8',
    shutterSpeed: '1/300s',
    description: '正面贴近拍摄：白衣少年静立于广场中央，身后花墙盛放。他抬手比出一个轻快的手势，仿佛在向整座产业园问好。',
    tags: ['人像', '花墙', '手势', '特写'],
    titleEn: 'Standing in the Plaza',
    locationEn: 'Liangjiang Industrial Park · China',
    descEn: 'A close frontal frame: a figure in white stands at the center of the plaza before a flowering wall, lifting a hand in a cheerful gesture — a hello to the whole park.',
    tagsEn: ['Portrait', 'Flower Wall', 'Gesture', 'Close-up'],
  },
  {
    id: 'lj06',
    title: '定格瞬间',
    location: '重庆两江产业园 · 中国',
    category: 'city',
    lat: 29.7094,
    lng: 106.6206,
    altitude: 10,
    droneModel: 'DJI Air 3',
    timestamp: '2026-10-12 16:49',
    resolution: '1908×2268',
    iso: 100,
    fStop: 'f/2.8',
    shutterSpeed: '1/320s',
    description: '从背后抓拍举着手机的拍摄者：花墙在前，他在后。无人机悬停在半空，替他记下了这个正在记录风景的身影。',
    tags: ['背影', '抓拍', '手机摄影', '花坛'],
    titleEn: 'Capturing the Moment',
    locationEn: 'Liangjiang Industrial Park · China',
    descEn: 'A rear-frame of a photographer raising his phone — blossoms ahead, him behind. The hovering drone quietly records the one recording the view.',
    tagsEn: ['From Behind', 'Candid', 'Phoneography', 'Flower Bed'],
  },
];

// 图片资源已下载到本地 vendor/photos/，每张照片有 thumb(square) 和 hero(16:9) 两个文件
// 命名规则：{id}_thumb.jpg / {id}_hero.jpg
// 改用本地加载，避免依赖远程 AI 文生图接口（该接口仅 Trae 内网可达，外部浏览器无法访问）

const IMG_DIR = 'vendor/photos';

// Enrich photo data with local image URLs
// ?v=2 用于强制浏览器刷新缓存（此前缓存过"生成中"占位图）
PHOTO_DATA.forEach(p => {
  p.thumbUrl = `${IMG_DIR}/${p.id}_thumb.jpg?v=2`;
  p.heroUrl = `${IMG_DIR}/${p.id}_hero.jpg?v=2`;
});

// ========================================
// City Location Database — 用于上传照片时按地名定位
// 格式: [中文名, 英文/拼音(小写), 国家/地区, 纬度, 经度]
// ========================================
const CITY_DB = [
  ['香港', 'hong kong', '中国', 22.3193, 114.1694],
  ['上海', 'shanghai', '中国', 31.2304, 121.4737],
  ['北京', 'beijing', '中国', 39.9042, 116.4074],
  ['广州', 'guangzhou', '中国', 23.1291, 113.2644],
  ['深圳', 'shenzhen', '中国', 22.5431, 114.0579],
  ['成都', 'chengdu', '中国', 30.5728, 104.0668],
  ['重庆', 'chongqing', '中国', 29.5630, 106.5516],
  ['杭州', 'hangzhou', '中国', 30.2741, 120.1551],
  ['西安', 'xian', '中国', 34.3416, 108.9398],
  ['南京', 'nanjing', '中国', 32.0603, 118.7969],
  ['武汉', 'wuhan', '中国', 30.5928, 114.3055],
  ['苏州', 'suzhou', '中国', 31.2989, 120.5853],
  ['天津', 'tianjin', '中国', 39.3434, 117.3616],
  ['长沙', 'changsha', '中国', 28.2282, 112.9388],
  ['青岛', 'qingdao', '中国', 36.0671, 120.3826],
  ['厦门', 'xiamen', '中国', 24.4798, 118.0894],
  ['昆明', 'kunming', '中国', 24.8801, 102.8329],
  ['大连', 'dalian', '中国', 38.9140, 121.6147],
  ['哈尔滨', 'harbin', '中国', 45.8038, 126.5350],
  ['拉萨', 'lhasa', '中国', 29.6520, 91.1721],
  ['乌鲁木齐', 'urumqi', '中国', 43.8256, 87.6168],
  ['三亚', 'sanya', '中国', 18.2528, 109.5119],
  ['桂林', 'guilin', '中国', 25.2736, 110.2900],
  ['张家界', 'zhangjiajie', '中国', 29.1170, 110.4790],
  ['台北', 'taipei', '中国台湾', 25.0330, 121.5654],
  ['高雄', 'kaoshiung', '中国台湾', 22.6273, 120.3014],
  ['澳门', 'macau', '中国', 22.1987, 113.5439],
  ['东京', 'tokyo', '日本', 35.6762, 139.6503],
  ['大阪', 'osaka', '日本', 34.6937, 135.5023],
  ['京都', 'kyoto', '日本', 35.0116, 135.7681],
  ['札幌', 'sapporo', '日本', 43.0618, 141.3545],
  ['富士山', 'mount fuji', '日本', 35.3606, 138.7274],
  ['冲绳', 'okinawa', '日本', 26.3344, 127.8056],
  ['首尔', 'seoul', '韩国', 37.5665, 126.9780],
  ['釜山', 'busan', '韩国', 35.1796, 129.0756],
  ['济州岛', 'jeju', '韩国', 33.4996, 126.5312],
  ['曼谷', 'bangkok', '泰国', 13.7563, 100.5018],
  ['普吉岛', 'phuket', '泰国', 7.8804, 98.3923],
  ['清迈', 'chiang mai', '泰国', 18.7883, 98.9853],
  ['新加坡', 'singapore', '新加坡', 1.3521, 103.8198],
  ['吉隆坡', 'kuala lumpur', '马来西亚', 3.1390, 101.6869],
  ['巴厘岛', 'bali', '印度尼西亚', -8.4095, 115.1889],
  ['雅加达', 'jakarta', '印度尼西亚', -6.2088, 106.8456],
  ['马尼拉', 'manila', '菲律宾', 14.5995, 120.9842],
  ['河内', 'hanoi', '越南', 21.0278, 105.8342],
  ['胡志明市', 'ho chi minh', '越南', 10.8231, 106.6297],
  ['金边', 'phnom penh', '柬埔寨', 11.5564, 104.9282],
  ['新德里', 'new delhi', '印度', 28.6139, 77.2090],
  ['孟买', 'mumbai', '印度', 19.0760, 72.8777],
  ['加德满都', 'kathmandu', '尼泊尔', 27.7172, 85.3240],
  ['珠穆朗玛峰', 'mount everest', '中国/尼泊尔', 27.9881, 86.9250],
  ['迪拜', 'dubai', '阿联酋', 25.2048, 55.2708],
  ['阿布扎比', 'abu dhabi', '阿联酋', 25.2854, 51.5310],
  ['多哈', 'doha', '卡塔尔', 25.2854, 51.5310],
  ['伊斯坦布尔', 'istanbul', '土耳其', 41.0082, 28.9784],
  ['卡帕多奇亚', 'cappadocia', '土耳其', 38.6431, 34.8289],
  ['耶路撒冷', 'jerusalem', '以色列', 31.7683, 35.2137],
  ['莫斯科', 'moscow', '俄罗斯', 55.7558, 37.6173],
  ['圣彼得堡', 'saint petersburg', '俄罗斯', 59.9311, 30.3609],
  ['伦敦', 'london', '英国', 51.5074, -0.1278],
  ['爱丁堡', 'edinburgh', '英国', 55.9533, -3.1883],
  ['巴黎', 'paris', '法国', 48.8566, 2.3522],
  ['尼斯', 'nice', '法国', 43.7102, 7.2620],
  ['罗马', 'rome', '意大利', 41.9028, 12.4964],
  ['威尼斯', 'venice', '意大利', 45.4408, 12.3155],
  ['米兰', 'milan', '意大利', 45.4642, 9.1900],
  ['佛罗伦萨', 'florence', '意大利', 43.7696, 11.2558],
  ['巴塞罗那', 'barcelona', '西班牙', 41.3851, 2.1734],
  ['马德里', 'madrid', '西班牙', 40.4168, -3.7038],
  ['里斯本', 'lisbon', '葡萄牙', 38.7223, -9.1393],
  ['阿姆斯特丹', 'amsterdam', '荷兰', 52.3676, 4.3517],
  ['布鲁塞尔', 'brussels', '比利时', 50.8503, 4.3517],
  ['柏林', 'berlin', '德国', 52.5200, 13.4050],
  ['慕尼黑', 'munich', '德国', 48.1351, 11.5820],
  ['法兰克福', 'frankfurt', '德国', 50.1109, 8.6821],
  ['苏黎世', 'zurich', '瑞士', 47.3769, 8.5417],
  ['因特拉肯', 'interlaken', '瑞士', 46.6863, 7.8632],
  ['日内瓦', 'geneva', '瑞士', 46.2044, 6.1432],
  ['维也纳', 'vienna', '奥地利', 48.2082, 16.3738],
  ['布拉格', 'prague', '捷克', 50.0755, 14.4378],
  ['布达佩斯', 'budapest', '匈牙利', 47.4979, 19.0402],
  ['雅典', 'athens', '希腊', 37.9838, 23.7275],
  ['圣托里尼', 'santorini', '希腊', 36.3932, 25.4615],
  ['哥本哈根', 'copenhagen', '丹麦', 55.6761, 12.5683],
  ['斯德哥尔摩', 'stockholm', '瑞典', 59.3293, 18.0686],
  ['奥斯陆', 'oslo', '挪威', 59.9139, 10.7522],
  ['特罗姆瑟', 'tromso', '挪威', 69.6492, 18.9553],
  ['卑尔根', 'bergen', '挪威', 60.3913, 5.3221],
  ['赫尔辛基', 'helsinki', '芬兰', 60.1699, 24.9384],
  ['雷克雅未克', 'reykjavik', '冰岛', 64.1466, -21.9426],
  ['纽约', 'new york', '美国', 40.7128, -74.0060],
  ['洛杉矶', 'los angeles', '美国', 34.0522, -118.2437],
  ['旧金山', 'san francisco', '美国', 37.7749, -122.4194],
  ['拉斯维加斯', 'las vegas', '美国', 36.1699, -115.1398],
  ['芝加哥', 'chicago', '美国', 41.8781, -87.6298],
  ['西雅图', 'seattle', '美国', 47.6062, -122.3321],
  ['迈阿密', 'miami', '美国', 25.7617, -80.1918],
  ['华盛顿', 'washington', '美国', 38.9072, -77.0369],
  ['波士顿', 'boston', '美国', 42.3601, -71.0589],
  ['夏威夷', 'hawaii', '美国', 21.3069, -157.8583],
  ['大峡谷', 'grand canyon', '美国', 36.0544, -112.1401],
  ['黄石公园', 'yellowstone', '美国', 44.4280, -110.5885],
  ['多伦多', 'toronto', '加拿大', 43.6532, -79.3832],
  ['温哥华', 'vancouver', '加拿大', 49.2827, -123.1207],
  ['蒙特利尔', 'montreal', '加拿大', 45.5017, -73.5673],
  ['班夫', 'banff', '加拿大', 51.1784, -115.5708],
  ['墨西哥城', 'mexico city', '墨西哥', 19.4326, -99.1332],
  ['坎昆', 'cancun', '墨西哥', 21.1619, -86.8515],
  ['里约热内卢', 'rio de janeiro', '巴西', -22.9068, -43.1729],
  ['圣保罗', 'sao paulo', '巴西', -23.5505, -46.6333],
  ['亚马逊雨林', 'amazon', '巴西', -3.4653, -62.2159],
  ['布宜诺斯艾利斯', 'buenos aires', '阿根廷', -34.6037, -58.3816],
  ['巴塔哥尼亚', 'patagonia', '智利/阿根廷', -50.0000, -73.0000],
  ['圣地亚哥', 'santiago', '智利', -33.4489, -70.6693],
  ['利马', 'lima', '秘鲁', -12.0464, -77.0428],
  ['马丘比丘', 'machu picchu', '秘鲁', -13.1631, -72.5450],
  ['基多', 'quito', '厄瓜多尔', -0.1807, -78.4678],
  ['加拉帕戈斯', 'galapagos', '厄瓜多尔', -0.9538, -90.9656],
  ['开罗', 'cairo', '埃及', 30.0444, 31.2357],
  ['卢克索', 'luxor', '埃及', 25.6872, 32.6396],
  ['开普敦', 'cape town', '南非', -33.9249, 18.4241],
  ['约翰内斯堡', 'johannesburg', '南非', -26.2041, 28.0473],
  ['内罗毕', 'nairobi', '肯尼亚', -1.2921, 36.8219],
  ['马赛马拉', 'maasai mara', '肯尼亚', -1.4061, 35.0080],
  ['卡萨布兰卡', 'casablanca', '摩洛哥', 33.5731, -7.5898],
  ['马拉喀什', 'marrakesh', '摩洛哥', 31.6295, -7.9811],
  ['撒哈拉沙漠', 'sahara', '非洲', 23.4162, 25.6628],
  ['维多利亚瀑布', 'victoria falls', '赞比亚/津巴布韦', -17.9243, 25.8572],
  ['悉尼', 'sydney', '澳大利亚', -33.8688, 151.2093],
  ['墨尔本', 'melbourne', '澳大利亚', -37.8136, 144.9631],
  ['布里斯班', 'brisbane', '澳大利亚', -27.4698, 153.0251],
  ['珀斯', 'perth', '澳大利亚', -31.9505, 115.8605],
  ['大堡礁', 'great barrier reef', '澳大利亚', -18.2871, 147.6992],
  ['乌鲁鲁', 'uluru', '澳大利亚', -25.3444, 131.0369],
  ['奥克兰', 'auckland', '新西兰', -36.8485, 174.7633],
  ['皇后镇', 'queenstown', '新西兰', -45.0312, 168.6626],
  ['基督城', 'christchurch', '新西兰', -43.5321, 172.6362],
  ['斐济', 'fiji', '斐济', -17.7134, 178.0650],
  ['马尔代夫', 'maldives', '马尔代夫', 3.2028, 73.2207],
  ['北极', 'arctic', '极地', 78.2232, 15.6267],
  ['南极', 'antarctica', '极地', -75.2500, 0.0000],
];

// 按关键词搜索城市（中文名 / 英文名 / 国家），返回最多 limit 条
function searchCities(keyword, limit = 6) {
  const k = String(keyword || '').trim().toLowerCase();
  if (!k) return [];
  const scored = [];
  for (const c of CITY_DB) {
    const name = c[0].toLowerCase();
    const en = c[1];
    const country = c[2].toLowerCase();
    let score = -1;
    if (name === k || en === k) score = 100;
    else if (name.startsWith(k) || en.startsWith(k)) score = 80;
    else if (name.includes(k)) score = 60;
    else if (en.includes(k)) score = 50;
    else if (country.includes(k)) score = 30;
    if (score > 0) scored.push({ city: c, score });
  }
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map(s => ({
    name: s.city[0],
    en: s.city[1],
    country: s.city[2],
    lat: s.city[3],
    lng: s.city[4],
  }));
}

// Build flight path arcs (产业园内环线，连接相邻照片)
const FLIGHT_ARCS = [
  { id: 'a1', start: PHOTO_DATA[0], end: PHOTO_DATA[1], color: '#00d4ff' },   // 纪念碑 -> 天际线
  { id: 'a2', start: PHOTO_DATA[1], end: PHOTO_DATA[2], color: '#7c5cff' },   // 天际线 -> 花径
  { id: 'a3', start: PHOTO_DATA[2], end: PHOTO_DATA[3], color: '#00d4ff' },   // 花径 -> 合影
  { id: 'a4', start: PHOTO_DATA[3], end: PHOTO_DATA[4], color: '#ffd166' },   // 合影 -> 静立
  { id: 'a5', start: PHOTO_DATA[4], end: PHOTO_DATA[5], color: '#7c5cff' },   // 静立 -> 抓拍
  { id: 'a6', start: PHOTO_DATA[5], end: PHOTO_DATA[0], color: '#ff6b9d' },   // 抓拍 -> 纪念碑（闭环）
];
