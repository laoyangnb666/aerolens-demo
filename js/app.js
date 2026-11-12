/* ========================================
   AeroLens · 云端相册 — Main Application
   Three.js 3D Earth (Orbital style) + Drone Photo Markers + GSAP
   ======================================== */

(function () {
  'use strict';

  // ========================================
  // 新用户空相册模式：来自注册流程的首次登录 (?empty=1)
  // 清空预置照片与航线，地球无标记，图集显示引导文案
  // ========================================
  var EMPTY_ALBUM = false;
  try {
    EMPTY_ALBUM = new URLSearchParams(window.location.search).get('empty') === '1';
  } catch (e) { /* 旧浏览器忽略 */ }
  if (EMPTY_ALBUM) {
    if (typeof PHOTO_DATA !== 'undefined' && PHOTO_DATA && PHOTO_DATA.length) {
      PHOTO_DATA.splice(0, PHOTO_DATA.length);
    }
    if (typeof FLIGHT_ARCS !== 'undefined' && FLIGHT_ARCS && FLIGHT_ARCS.length) {
      FLIGHT_ARCS.splice(0, FLIGHT_ARCS.length);
    }
  }

  // ========================================
  // Three.js Scene Variables (Orbital Earth)
  // ========================================
  let scene, camera, renderer, earthMesh, cloudsMesh, controls, sunLight;
  let rotationSpeed = 0.001;
  let isAtmosEnabled = true;
  let isMarkersEnabled = true;
  let autoRotate = true;
  let isFlying = false; // 飞行动画进行中时暂停地球自转，保证目标点稳定居中
  let activePhoto = null;
  let markerOverlay = null; // HTML overlay for photo markers
  let markers = []; // { photo, element, vector3 }

  // ========================================
  // DOM References
  // ========================================
  const dom = {
    container: document.getElementById('canvas-container'),
    loading: document.getElementById('loadingOverlay'),
    gallery: document.getElementById('photoGallery'),
    detailPanel: document.getElementById('detailPanel'),
    detailContent: document.getElementById('detailContent'),
    detailClose: document.getElementById('detailClose'),
    searchInput: document.getElementById('searchInput'),
    hoverTooltip: document.getElementById('hoverTooltip'),
    photoCount: document.getElementById('photoCount'),
    locationCount: document.getElementById('locationCount'),
    flightCount: document.getElementById('flightCount'),
    speedInput: document.getElementById('rotation-speed'),
    lightInput: document.getElementById('sun-intensity'),
    atmosToggle: document.getElementById('atmos-toggle'),
    markersToggle: document.getElementById('markers-toggle'),
    speedVal: document.getElementById('speed-val'),
    lightVal: document.getElementById('light-val'),
    resetBtn: document.getElementById('reset-view'),
    autoRotateBtn: document.getElementById('auto-rotate-btn'),
    coordDisplay: document.getElementById('coord-display'),
    topBar: document.getElementById('topBar'),
    sidebar: document.getElementById('sidebar'),
  };

  // ========================================
  // i18n 中英双语（与产品页/登录页共享 aerolens-lang 偏好）
  // ========================================
  var I18N = {
    zh: {
      'app.title': 'AeroLens · 云端相册 — AI 无人机三维地球',
      'app.loading': '正在建立轨道链接',
      'app.brandSub': '云端相册 · LIVE',
      'app.statPhotos': '照片', 'app.statLocations': '地点', 'app.statFlights': '航线',
      'app.gallery': '航拍图集', 'app.upload': '上传',
      'app.collapseGallery': '收起图集，查看完整地球', 'app.expandGallery': '展开图集', 'app.galleryShort': '图集',
      'app.fAll': '全部', 'app.fCity': '城市', 'app.fNature': '自然', 'app.fCoast': '海岸', 'app.fUploaded': '我的上传',
      'app.searchPh': '搜索照片地点...',
      'app.sysOk': '系统正常 · 信号良好',
      'app.displaySettings': '显示设置', 'app.rotation': '旋转速度', 'app.sunlight': '阳光强度',
      'app.clouds': '大气云层', 'app.markers': '照片标记',
      'app.resetView': '重置视角', 'app.autoRotate': '自动旋转', 'app.pauseRotate': '暂停旋转',
      'app.pickHint': '点击地球表面选择拍摄位置', 'app.cancel': '取消',
      'app.uploadTitle': '上传航拍照片', 'app.dropHint': '点击选择图片或拖拽到此处', 'app.dropFormats': '支持 JPG / PNG / WebP',
      'app.fTitle': '标题', 'app.titlePh': '给这张照片起个名字',
      'app.fLocation': '拍摄位置', 'app.notLocated': '未定位', 'app.locPh': '搜索城市，如：上海 / Paris',
      'app.pickBtnTitle': '在地球上点选位置', 'app.pickOnGlobe': '地球点选', 'app.coordWait': '经纬度：等待定位',
      'app.fCategory': '类别', 'app.catCity': '城市', 'app.catNature': '自然', 'app.catCoast': '海岸',
      'app.fDesc': '描述', 'app.descPh': '描述这张照片的故事...',
      'app.addToAlbum': '添加到相册',
      'app.noResults': '未找到匹配的照片',
      'app.emptyAlbum': '相册为空 — 上传你的第一张航拍照片',
      'app.tagCity': '城市', 'app.tagNature': '自然', 'app.tagCoast': '海岸',
      'app.dCatCity': '城市航拍', 'app.dCatNature': '自然风光', 'app.dCatCoast': '海岸线', 'app.dCatDefault': '航拍',
      'app.dParams': '拍摄参数', 'app.dAltitude': '飞行高度', 'app.dDrone': '无人机', 'app.dAperture': '光圈',
      'app.dShutter': '快门', 'app.dResolution': '分辨率', 'app.dGps': 'GPS 坐标', 'app.dDesc': '拍摄描述',
      'app.dTags': '标签', 'app.dFly': '飞往此位置',
      'app.customLoc': '自定义位置', 'app.coordPrefix': '经纬度：', 'app.pickedOnGlobe': '已在地球上点选', 'app.located': '已定位',
      'app.noCityMatch': '没有匹配的城市，试试「地球点选」',
      'app.notImage': '请选择图片文件', 'app.tooLarge': '图片不能超过 10MB',
      'app.gpsRead': '已从照片读取 GPS', 'app.noGps': '未检测到 GPS，请搜索地名或点选地球',
      'app.userUpload': '用户上传', 'app.userPhoto': '用户上传的照片', 'app.tagUpload': '上传',
      'app.drone': '无人机', 'app.droneBtnTitle': '连接无人机，实时同步照片',
      'app.droneTitle': '连接无人机 · 实时同步',
      'app.droneGuide': '用 USB 连接无人机 / SD 卡 / 遥控器，选择照片文件夹后自动同步到地球',
      'app.droneFormats': '支持 JPG 照片 · 仅导入含 GPS 的照片',
      'app.dronePick': '选择无人机文件夹 (DCIM)', 'app.droneAutoSync': '自动同步新照片',
      'app.dronePoll': '每 5 秒检查一次文件夹', 'app.droneLogTitle': '同步日志',
      'app.droneNotConnected': '未连接', 'app.droneListening': '监听中', 'app.droneScanning': '扫描中…',
      'app.droneDisconnect': '断开连接', 'app.droneSyncedCount': '已同步 {n} 张',
      'app.droneNoFsApi': '当前浏览器不支持文件夹访问，请使用 Edge / Chrome 打开',
      'app.droneConnectedLog': '已连接「{name}」，开始扫描',
      'app.droneFoundNew': '发现 {n} 张新照片，开始导入',
      'app.droneNoNew': '文件夹无新增照片',
      'app.droneImportProgress': '导入中 {i}/{n}：{name}',
      'app.droneImported': '本轮已导入 {n} 张照片',
      'app.droneSkipped': '{n} 张照片无 GPS / 无法解码，已跳过',
      'app.droneDisconnected': '已断开无人机连接',
      'app.droneSyncSource': '无人机同步', 'app.tagDrone': '无人机同步',
      'app.droneSyncDesc': '由无人机实时同步到地球相册',
      'app.logout': '退出', 'app.logoutConfirm': '确认退出？',
      'app.loggedOut': '已退出登录',
      'app.dPoem': 'AI 诗篇', 'app.poemTitle': 'AI 诗篇 · 为这张照片作诗',
      'app.poemAnalyzing': '正在凝视照片…', 'app.poemComposing': '正在落笔成诗…',
      'app.poemZh': '中文诗', 'app.poemEn': 'English Verse',
      'app.poemBasedOn': '灵感来源', 'app.poemClose': '关闭', 'app.poemCopy': '复制诗歌', 'app.poemCopied': '已复制',
    },
    en: {
      'app.title': 'AeroLens · Cloud Atlas — AI Drone 3D Earth',
      'app.loading': 'Establishing orbital link',
      'app.brandSub': 'Cloud Atlas · LIVE',
      'app.statPhotos': 'Photos', 'app.statLocations': 'Locations', 'app.statFlights': 'Routes',
      'app.gallery': 'Aerial Atlas', 'app.upload': 'Upload',
      'app.collapseGallery': 'Collapse gallery to view the full globe', 'app.expandGallery': 'Expand gallery', 'app.galleryShort': 'Atlas',
      'app.fAll': 'All', 'app.fCity': 'City', 'app.fNature': 'Nature', 'app.fCoast': 'Coast', 'app.fUploaded': 'My Uploads',
      'app.searchPh': 'Search photos or places...',
      'app.sysOk': 'All systems nominal · signal strong',
      'app.displaySettings': 'Display', 'app.rotation': 'Rotation Speed', 'app.sunlight': 'Sunlight',
      'app.clouds': 'Cloud Layer', 'app.markers': 'Photo Markers',
      'app.resetView': 'Reset View', 'app.autoRotate': 'Auto Rotate', 'app.pauseRotate': 'Pause Rotation',
      'app.pickHint': 'Click the globe surface to set the capture location', 'app.cancel': 'Cancel',
      'app.uploadTitle': 'Upload Aerial Photo', 'app.dropHint': 'Click to select an image or drag it here', 'app.dropFormats': 'Supports JPG / PNG / WebP',
      'app.fTitle': 'Title', 'app.titlePh': 'Name this photo',
      'app.fLocation': 'Capture Location', 'app.notLocated': 'Not located', 'app.locPh': 'Search a city, e.g. Shanghai / Paris',
      'app.pickBtnTitle': 'Pick a location on the globe', 'app.pickOnGlobe': 'Pick on Globe', 'app.coordWait': 'LatLng: awaiting location',
      'app.fCategory': 'Category', 'app.catCity': 'City', 'app.catNature': 'Nature', 'app.catCoast': 'Coast',
      'app.fDesc': 'Description', 'app.descPh': 'Tell the story behind this photo...',
      'app.addToAlbum': 'Add to Atlas',
      'app.noResults': 'No matching photos',
      'app.emptyAlbum': 'Album is empty — upload your first aerial photo',
      'app.tagCity': 'City', 'app.tagNature': 'Nature', 'app.tagCoast': 'Coast',
      'app.dCatCity': 'City Aerial', 'app.dCatNature': 'Nature', 'app.dCatCoast': 'Coastline', 'app.dCatDefault': 'Aerial',
      'app.dParams': 'Capture Specs', 'app.dAltitude': 'Altitude', 'app.dDrone': 'Drone', 'app.dAperture': 'Aperture',
      'app.dShutter': 'Shutter', 'app.dResolution': 'Resolution', 'app.dGps': 'GPS Coordinates', 'app.dDesc': 'Description',
      'app.dTags': 'Tags', 'app.dFly': 'Fly to Location',
      'app.customLoc': 'Custom location', 'app.coordPrefix': 'LatLng: ', 'app.pickedOnGlobe': 'Picked on globe', 'app.located': 'Located',
      'app.noCityMatch': 'No matching city — try "Pick on Globe"',
      'app.notImage': 'Please choose an image file', 'app.tooLarge': 'Image must be under 10MB',
      'app.gpsRead': 'GPS read from photo', 'app.noGps': 'No GPS found — search a place or pick on the globe',
      'app.userUpload': 'User Upload', 'app.userPhoto': 'User uploaded photo', 'app.tagUpload': 'Upload',
      'app.drone': 'Drone', 'app.droneBtnTitle': 'Connect drone & sync photos live',
      'app.droneTitle': 'Connect Drone · Live Sync',
      'app.droneGuide': 'Connect the drone / SD card / RC via USB, pick the photo folder and photos sync onto the globe automatically',
      'app.droneFormats': 'JPG photos only · photos without GPS are skipped',
      'app.dronePick': 'Pick Drone Folder (DCIM)', 'app.droneAutoSync': 'Auto sync new photos',
      'app.dronePoll': 'Checks the folder every 5s', 'app.droneLogTitle': 'Sync Log',
      'app.droneNotConnected': 'Not connected', 'app.droneListening': 'Listening', 'app.droneScanning': 'Scanning…',
      'app.droneDisconnect': 'Disconnect', 'app.droneSyncedCount': '{n} synced',
      'app.droneNoFsApi': 'This browser cannot access folders — please use Edge / Chrome',
      'app.droneConnectedLog': 'Connected to "{name}", scanning',
      'app.droneFoundNew': 'Found {n} new photo(s), importing',
      'app.droneNoNew': 'No new photos in folder',
      'app.droneImportProgress': 'Importing {i}/{n}: {name}',
      'app.droneImported': 'Imported {n} photo(s)',
      'app.droneSkipped': '{n} photo(s) skipped — no GPS / undecodable',
      'app.droneDisconnected': 'Drone disconnected',
      'app.droneSyncSource': 'Drone Sync', 'app.tagDrone': 'Drone Sync',
      'app.droneSyncDesc': 'Synced live from the drone to the Cloud Atlas',
      'app.logout': 'Sign out', 'app.logoutConfirm': 'Confirm?',
      'app.loggedOut': 'Signed out',
      'app.dPoem': 'AI Poem', 'app.poemTitle': 'AI Poem · Composed for this photo',
      'app.poemAnalyzing': 'Gazing at the photo…', 'app.poemComposing': 'Writing verses…',
      'app.poemZh': '中文诗', 'app.poemEn': 'English Verse',
      'app.poemBasedOn': 'Inspired by', 'app.poemClose': 'Close', 'app.poemCopy': 'Copy Poem', 'app.poemCopied': 'Copied',
    }
  };

  var COUNTRY_EN = {
    '中国': 'China', '中国台湾': 'Taiwan, China', '日本': 'Japan', '韩国': 'South Korea', '泰国': 'Thailand',
    '新加坡': 'Singapore', '马来西亚': 'Malaysia', '印度尼西亚': 'Indonesia', '菲律宾': 'Philippines',
    '越南': 'Vietnam', '柬埔寨': 'Cambodia', '印度': 'India', '尼泊尔': 'Nepal', '中国/尼泊尔': 'China/Nepal',
    '阿联酋': 'UAE', '卡塔尔': 'Qatar', '土耳其': 'Türkiye', '以色列': 'Israel', '俄罗斯': 'Russia',
    '英国': 'UK', '法国': 'France', '意大利': 'Italy', '西班牙': 'Spain', '葡萄牙': 'Portugal',
    '荷兰': 'Netherlands', '比利时': 'Belgium', '德国': 'Germany', '瑞士': 'Switzerland', '奥地利': 'Austria',
    '捷克': 'Czechia', '匈牙利': 'Hungary', '希腊': 'Greece', '丹麦': 'Denmark', '瑞典': 'Sweden',
    '挪威': 'Norway', '芬兰': 'Finland', '冰岛': 'Iceland', '美国': 'USA', '加拿大': 'Canada',
    '墨西哥': 'Mexico', '巴西': 'Brazil', '阿根廷': 'Argentina', '智利/阿根廷': 'Chile/Argentina',
    '智利': 'Chile', '秘鲁': 'Peru', '厄瓜多尔': 'Ecuador', '埃及': 'Egypt', '南非': 'South Africa',
    '肯尼亚': 'Kenya', '摩洛哥': 'Morocco', '非洲': 'Africa', '赞比亚/津巴布韦': 'Zambia/Zimbabwe',
    '澳大利亚': 'Australia', '新西兰': 'New Zealand', '斐济': 'Fiji', '马尔代夫': 'Maldives', '极地': 'Polar'
  };

  var lang = 'zh';
  var bootDone = false;

  try { lang = localStorage.getItem('aerolens-lang') || 'zh'; } catch (e) { /* 隐私模式忽略 */ }
  if (lang !== 'zh' && lang !== 'en') lang = 'zh';

  function t(key) {
    return (I18N[lang] && I18N[lang][key]) || I18N.zh[key] || '';
  }

  // 照片字段按当前语言取值（英文字段缺失时回退中文）
  function phTitle(p) { return (lang === 'en' && p.titleEn) ? p.titleEn : p.title; }
  function phLoc(p) { return (lang === 'en' && p.locationEn) ? p.locationEn : p.location; }
  function phDesc(p) { return (lang === 'en' && p.descEn) ? p.descEn : (p.description || ''); }
  function phTags(p) { return (lang === 'en' && p.tagsEn) ? p.tagsEn : (p.tags || []); }
  function phDrone(p) { return (lang === 'en' && p.droneModelEn) ? p.droneModelEn : p.droneModel; }
  function phRes(p) { return (lang === 'en' && p.resolutionEn) ? p.resolutionEn : p.resolution; }

  function categoryTag(cat) {
    return cat === 'city' ? t('app.tagCity') : cat === 'nature' ? t('app.tagNature') : t('app.tagCoast');
  }

  function categoryLabel(cat) {
    return cat === 'city' ? t('app.dCatCity')
      : cat === 'nature' ? t('app.dCatNature')
        : cat === 'coast' ? t('app.dCatCoast') : t('app.dCatDefault');
  }

  // 城市建议条目的显示文案（含国家），按语言取中英文
  function cityLabel(c) {
    var name = lang === 'en' ? (c.en || c.name) : c.name;
    var country = lang === 'en' ? (COUNTRY_EN[c.country] || c.country) : c.country;
    return name + ' · ' + country;
  }

  // 搜索匹配：中英文字段都参与，英文模式下也能用中文关键词搜到
  function matchSearch(p, q) {
    var hay = [p.title, p.location, (p.tags || []).join(' ')];
    if (p.titleEn) hay.push(p.titleEn);
    if (p.locationEn) hay.push(p.locationEn);
    if (p.tagsEn) hay.push(p.tagsEn.join(' '));
    return hay.some(function (s) { return String(s).toLowerCase().includes(q); });
  }

  function updateAutoRotateBtn() {
    if (!dom.autoRotateBtn) return;
    dom.autoRotateBtn.innerHTML = autoRotate
      ? '<iconify-icon icon="lucide:pause" width="14"></iconify-icon><span>' + t('app.pauseRotate') + '</span>'
      : '<iconify-icon icon="lucide:play" width="14"></iconify-icon><span>' + t('app.autoRotate') + '</span>';
  }

  // 上传弹窗中随语言变化的动态状态文案（未定位时重置坐标提示）
  function refreshUploadTexts() {
    var coordEl = document.getElementById('locCoord');
    if (coordEl && !coordEl.classList.contains('set')) {
      coordEl.textContent = t('app.coordWait');
    }
  }

  function rerenderGalleryCurrentFilter() {
    var activeFilter = document.querySelector('.filter-btn.active');
    var filter = activeFilter ? activeFilter.dataset.filter : 'all';
    var filtered;
    if (filter === 'all') filtered = [...PHOTO_DATA];
    else if (filter === 'uploaded') filtered = PHOTO_DATA.filter(p => p.uploaded);
    else filtered = PHOTO_DATA.filter(p => p.category === filter);
    var q = (dom.searchInput.value || '').toLowerCase().trim();
    if (q) filtered = filtered.filter(p => matchSearch(p, q));
    renderGallery(filtered);
  }

  function applyLang(next) {
    lang = next;
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.title = t('app.title');
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const val = t(el.getAttribute('data-i18n'));
      if (val) el.textContent = val;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder')));
    });
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      el.setAttribute('title', t(el.getAttribute('data-i18n-title')));
    });
    document.querySelectorAll('.lang-btn').forEach(b =>
      b.classList.toggle('active', b.getAttribute('data-lang') === lang));
    updateAutoRotateBtn();
    refreshUploadTexts();
    // 首次加载时 boot 还会统一渲染图集，这里只在切换语言时重渲染
    if (bootDone) {
      rerenderGalleryCurrentFilter();
      if (activePhoto && dom.detailPanel.classList.contains('visible')) {
        showDetailPanel(activePhoto);
      }
    }
    try { localStorage.setItem('aerolens-lang', lang); } catch (e2) { /* 隐私模式忽略 */ }
  }

  // ========================================
  // Initialize Three.js Scene (from Orbital Earth)
  // ========================================
  function init() {
    const container = dom.container;

    // Scene
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030303, 0.02);

    // Camera
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 2.5;

    // Renderer
    // alpha:false + 不透明 clearColor，避免 iframe/预览环境下透明背景被渲染为纯黑
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, preserveDrawingBuffer: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x050507, 1);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x6a7280, 0.85);
    scene.add(ambientLight);

    sunLight = new THREE.DirectionalLight(0xffffff, 1.8);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    // Rim light for cinematic look
    const rimLight = new THREE.SpotLight(0x4f46e5, 2.5);
    rimLight.position.set(-5, 5, -2);
    rimLight.lookAt(0, 0, 0);
    scene.add(rimLight);

    // Create Earth, Stars
    createEarth();
    createStars();

    // Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    controls.minDistance = 1.5;
    controls.maxDistance = 10;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.45;

    // Create HTML overlay for photo markers
    createMarkerOverlay();

    // Event listeners
    window.addEventListener('resize', onWindowResize, false);
    setupUIListeners();
    setupSidebarToggle();

    // Hide loading after textures load
    runLoadingSequence();
  }

  // ========================================
  // Loading Sequence — Planet Jumping 风格
  // 0→100 计数器 → logo 飞到左上角 → overlay 淡出
  // ========================================
  function runLoadingSequence() {
    var loadingValue = document.getElementById('loadingValue');
    var loadingCount = document.getElementById('loadingCount');
    var loadingLogo = document.getElementById('loadingLogo');
    var loadingLabel = document.getElementById('loadingLabel');
    var overlay = document.getElementById('loadingOverlay');
    var progress = 0;
    var duration = 2400; // 与原 2.5s 接近
    var startTime = null;

    function ease(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function tick(timestamp) {
      if (!startTime) startTime = timestamp;
      var elapsed = timestamp - startTime;
      var t = Math.min(1, elapsed / duration);
      progress = Math.round(ease(t) * 100);
      if (loadingValue) loadingValue.textContent = progress;

      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        finish();
      }
    }

    function finish() {
      if (loadingValue) loadingValue.textContent = 100;

      // 计数器模糊上升消失
      if (loadingCount) loadingCount.classList.add('is-leaving');

      // 加载文字淡出
      if (loadingLabel) {
        loadingLabel.style.transition = 'opacity .4s ease';
        loadingLabel.style.opacity = '0';
      }

      // logo 飞到左上角 header 槽位
      if (loadingLogo) loadingLogo.classList.add('is-docked');

      // 750ms 后移除计数器
      setTimeout(function () {
        if (loadingCount) loadingCount.remove();
        if (loadingLabel) loadingLabel.remove();
      }, 750);

      // 1.2s 后：logo 淡出（header 已有品牌区），overlay 淡出
      setTimeout(function () {
        if (loadingLogo) loadingLogo.classList.add('is-settled');
        hideLoading();
        playEntranceAnimations();
      }, 1200);

      // 2s 后彻底移除 overlay
      setTimeout(function () {
        if (overlay) overlay.style.display = 'none';
      }, 2000);
    }

    requestAnimationFrame(tick);
  }

  // ========================================
  // Create Earth (from Orbital Earth)
  // ========================================
  function createEarth() {
    const geometry = new THREE.SphereGeometry(1, 64, 64);

    // 贴图加载失败的 fallback：程序化生成简易地球贴图（蓝海洋 + 绿大陆）
    // 这样在 file:// 协议下（CORS 禁止加载本地图片）地球也不会是纯黑
    function makeFallbackEarthTexture() {
      const w = 1024, h = 512;
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      // 海洋底色：深蓝渐变
      const oceanGrad = ctx.createLinearGradient(0, 0, 0, h);
      oceanGrad.addColorStop(0, '#0a3a5c');
      oceanGrad.addColorStop(0.5, '#0e4d75');
      oceanGrad.addColorStop(1, '#0a3a5c');
      ctx.fillStyle = oceanGrad;
      ctx.fillRect(0, 0, w, h);
      // 大陆斑块：用噪声生成不规则形状
      const blobs = [
        { x: 0.15, y: 0.35, r: 0.10 },  // 北美
        { x: 0.20, y: 0.55, r: 0.07 },  // 南美
        { x: 0.50, y: 0.32, r: 0.09 },  // 欧洲
        { x: 0.55, y: 0.55, r: 0.11 },  // 非洲
        { x: 0.70, y: 0.35, r: 0.13 },  // 亚洲
        { x: 0.82, y: 0.70, r: 0.06 },  // 澳洲
        { x: 0.95, y: 0.35, r: 0.05 },  // 太平洋岛
      ];
      blobs.forEach(b => {
        const cx = b.x * w, cy = b.y * h, r = b.r * w;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        grad.addColorStop(0, '#2d6b3a');
        grad.addColorStop(0.6, '#1f4d2a');
        grad.addColorStop(0.85, '#143a1f');
        grad.addColorStop(1, 'rgba(10,58,92,0)');
        ctx.fillStyle = grad;
        // 用不规则形状绘制
        ctx.beginPath();
        const points = 12;
        for (let i = 0; i <= points; i++) {
          const a = (i / points) * Math.PI * 2;
          const jitter = 0.7 + Math.random() * 0.5;
          const px = cx + Math.cos(a) * r * jitter;
          const py = cy + Math.sin(a) * r * jitter * 0.7;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
      });
      // 极地白冰
      const polarGrad = ctx.createLinearGradient(0, 0, 0, h * 0.12);
      polarGrad.addColorStop(0, 'rgba(240,245,250,0.85)');
      polarGrad.addColorStop(1, 'rgba(240,245,250,0)');
      ctx.fillStyle = polarGrad;
      ctx.fillRect(0, 0, w, h * 0.12);
      const polarGrad2 = ctx.createLinearGradient(0, h * 0.88, 0, h);
      polarGrad2.addColorStop(0, 'rgba(240,245,250,0)');
      polarGrad2.addColorStop(1, 'rgba(240,245,250,0.85)');
      ctx.fillStyle = polarGrad2;
      ctx.fillRect(0, h * 0.88, w, h * 0.12);
      return new THREE.CanvasTexture(canvas);
    }

    const fallbackTex = makeFallbackEarthTexture();
    let texLoadFailed = false;
    const manager = new THREE.LoadingManager();
    manager.onError = function (url) {
      console.warn('[Earth] 贴图加载失败，切换到程序化 fallback：', url);
      texLoadFailed = true;
      // 任一贴图失败即切换全部到 fallback
      material.map = fallbackTex;
      material.bumpMap = null;
      material.specularMap = null;
      material.needsUpdate = true;
    };
    const loader = new THREE.TextureLoader(manager);

    const material = new THREE.MeshPhongMaterial({
      map: loader.load('vendor/textures/earth_atmos.jpg'),
      bumpMap: loader.load('vendor/textures/earth_bump.png'),
      bumpScale: 0.06,
      specularMap: loader.load('vendor/textures/earth_specular.png'),
      specular: new THREE.Color(0x2a2a2a),
      shininess: 14,
    });

    earthMesh = new THREE.Mesh(geometry, material);
    scene.add(earthMesh);

    // 云层：程序化生成 alpha 贴图（无外部依赖），作为地球子节点随地球一同旋转
    const cloudGeometry = new THREE.SphereGeometry(1.012, 64, 64);
    const cloudMaterial = new THREE.MeshPhongMaterial({
      map: makeCloudTexture(),
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    cloudsMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
    earthMesh.add(cloudsMesh);
  }

  // ========================================
  // 程序化云层 alpha 贴图（分形值噪声）
  // ========================================
  function makeCloudTexture() {
    const w = 1024, h = 512;
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    const image = ctx.createImageData(w, h);

    function grid(n) {
      const g = new Float32Array(n * n);
      for (let i = 0; i < g.length; i++) g[i] = Math.random();
      return g;
    }
    function sample(g, n, u, v) {
      const x = u * n, y = v * n;
      const xi = Math.floor(x), yi = Math.floor(y);
      const fx = x - xi, fy = y - yi;
      const x0 = ((xi % n) + n) % n, y0 = ((yi % n) + n) % n;
      const x1 = (x0 + 1) % n, y1 = (y0 + 1) % n;
      const sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
      const a = g[y0 * n + x0], b = g[y0 * n + x1];
      const c = g[y1 * n + x0], d = g[y1 * n + x1];
      return (a + (b - a) * sx) * (1 - sy) + (c + (d - c) * sx) * sy;
    }

    const layers = [[4, 0.50], [8, 0.26], [16, 0.14], [32, 0.07], [64, 0.03]];
    const grids = layers.map(l => grid(l[0]));

    for (let y = 0; y < h; y++) {
      const v = y / h;
      const bandFade = 1 - Math.pow(Math.abs(v * 2 - 1), 2.4); // 两极稀薄
      for (let x = 0; x < w; x++) {
        const u = x / w;
        let n = 0;
        for (let i = 0; i < layers.length; i++) n += sample(grids[i], layers[i][0], u, v) * layers[i][1];
        let a = (n - 0.54) * 3.4 * bandFade;
        a = a < 0 ? 0 : a > 1 ? 1 : a;
        const idx = (y * w + x) * 4;
        image.data[idx] = 255;
        image.data[idx + 1] = 255;
        image.data[idx + 2] = 255;
        image.data[idx + 3] = Math.round(a * 235);
      }
    }
    ctx.putImageData(image, 0, 0);
    return new THREE.CanvasTexture(canvas);
  }

  // ========================================
  // Create Stars (from Orbital Earth)
  // ========================================
  function createStars() {
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.02,
      transparent: true,
      opacity: 0.8,
    });

    const starVertices = [];
    for (let i = 0; i < 2000; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      if (Math.abs(x) + Math.abs(y) + Math.abs(z) > 5) {
        starVertices.push(x, y, z);
      }
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
  }

  // ========================================
  // Create HTML Marker Overlay
  // ========================================
  function createMarkerOverlay() {
    markerOverlay = document.createElement('div');
    markerOverlay.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:5;';
    dom.container.appendChild(markerOverlay);

    // Create markers for each photo
    PHOTO_DATA.forEach(photo => {
      const markerEl = document.createElement('div');
      markerEl.className = 'photo-marker';
      markerEl.dataset.photoId = photo.id;
      markerEl.innerHTML = `
        <div class="photo-marker-pulse"></div>
        <div class="photo-marker-pin">
          <img src="${photo.thumbUrl}" alt="${phTitle(photo)}"
               onerror="this.style.display='none';this.parentNode.classList.add('thumb-failed')" />
        </div>
      `;

      markerEl.addEventListener('click', (e) => {
        e.stopPropagation();
        selectPhoto(photo);
      });

      markerEl.addEventListener('mouseenter', (e) => {
        showHoverTooltip(photo, e);
      });
      markerEl.addEventListener('mousemove', (e) => positionTooltip(e));
      markerEl.addEventListener('mouseleave', () => hideHoverTooltip());

      markerOverlay.appendChild(markerEl);

      // Calculate 3D position on globe
      const pos = latLngToVector3(photo.lat, photo.lng, 1.01);
      markers.push({ photo, element: markerEl, vector3: pos });
    });
  }

  // ========================================
  // Convert lat/lng to 3D vector on sphere
  // ========================================
  function latLngToVector3(lat, lng, radius) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = (radius * Math.sin(phi) * Math.sin(theta));
    const y = (radius * Math.cos(phi));
    return new THREE.Vector3(x, y, z);
  }

  // ========================================
  // Update Marker Positions (project 3D → 2D screen)
  // ========================================
  function updateMarkerPositions() {
    if (!markers.length || !camera) return;

    const rect = renderer.domElement.getBoundingClientRect();
    const halfWidth = rect.width / 2;
    const halfHeight = rect.height / 2;

    // 第一遍：投影到屏幕，收集可见标记
    const visible = [];
    markers.forEach(m => {
      // Clone the position and apply earthMesh rotation
      const worldPos = m.vector3.clone();
      worldPos.applyMatrix4(earthMesh.matrixWorld);

      // Check if marker is on the visible side (facing camera)
      const markerToCamera = new THREE.Vector3().subVectors(camera.position, worldPos).normalize();
      const dot = worldPos.clone().normalize().dot(markerToCamera);

      if (dot <= 0.0 || !isMarkersEnabled) {
        m.element.style.display = 'none';
        return;
      }

      // Project to screen
      const screenPos = worldPos.clone();
      screenPos.project(camera);
      visible.push({
        m: m,
        x: (screenPos.x * halfWidth) + halfWidth,
        y: -(screenPos.y * halfHeight) + halfHeight,
        opacity: Math.min(1, dot * 2),
        fixed: m.element.classList.contains('active'),
      });
    });

    // 第二遍：屏幕空间去重叠 —— 经纬度相近的照片会投影到几乎同一点，
    // 用迭代斥力把它们推开，避免堆成一团；选中的标记固定不动。
    const MIN_DIST = 34;
    for (let iter = 0; iter < 6; iter++) {
      let moved = false;
      for (let i = 0; i < visible.length; i++) {
        for (let j = i + 1; j < visible.length; j++) {
          const a = visible[i];
          const b = visible[j];
          let dx = b.x - a.x;
          let dy = b.y - a.y;
          let d = Math.sqrt(dx * dx + dy * dy);
          if (d >= MIN_DIST) continue;
          if (d < 0.001) { dx = 1; dy = 0; d = 1; } // 完全重合时取默认方向
          const ux = dx / d;
          const uy = dy / d;
          const overlap = MIN_DIST - d;
          if (a.fixed && b.fixed) continue;
          if (a.fixed) {
            b.x += ux * overlap; b.y += uy * overlap;
          } else if (b.fixed) {
            a.x -= ux * overlap; a.y -= uy * overlap;
          } else {
            a.x -= ux * overlap / 2; a.y -= uy * overlap / 2;
            b.x += ux * overlap / 2; b.y += uy * overlap / 2;
          }
          moved = true;
        }
      }
      if (!moved) break;
    }

    // 应用最终位置
    visible.forEach(v => {
      v.m.element.style.display = 'block';
      v.m.element.style.left = v.x + 'px';
      v.m.element.style.top = v.y + 'px';
      v.m.element.style.opacity = v.opacity;
    });
  }

  // ========================================
  // Photo Selection
  // ========================================
  function selectPhoto(photo) {
    activePhoto = photo;

    // 窄屏：选中照片时自动收起图集，保证地球上的标记不被遮挡
    if (window.innerWidth <= 1024 && typeof window.setSidebarCollapsed === 'function') {
      window.setSidebarCollapsed(true);
    }

    // Update marker active states
    document.querySelectorAll('.photo-marker').forEach(m => {
      m.classList.toggle('active', m.dataset.photoId === photo.id);
    });

    // Update gallery
    document.querySelectorAll('.photo-card').forEach(c => {
      c.classList.toggle('active', c.dataset.photoId === photo.id);
    });

    const activeCard = dom.gallery.querySelector(`.photo-card[data-photo-id="${photo.id}"]`);
    if (activeCard) {
      activeCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Fly camera to location
    flyToLocation(photo);

    // Show detail panel
    showDetailPanel(photo);
  }

  // ========================================
  // Fly to Location (animate camera)
  // ========================================
  function flyToLocation(photo) {
    // 地球绕 Y 轴旋转 ry 后，让该点落到 +Z 子午线上并正对相机。
    // 由 latLngToVector3 的球面映射 theta = (lng+180)°，可得 ry = 90° - theta。
    const theta = ((photo.lng + 180) * Math.PI) / 180;
    let targetRy = Math.PI / 2 - theta;

    // 取与当前自转角最接近的等价角，避免多转整圈
    const currentRy = earthMesh.rotation.y;
    targetRy += Math.round((currentRy - targetRy) / (Math.PI * 2)) * Math.PI * 2;

    // 相机终点：方位固定在 +Z，按目标纬度抬高，保持观察距离
    const latRad = (photo.lat * Math.PI) / 180;
    const dist = THREE.MathUtils.clamp(camera.position.length(), 1.8, 3.2);
    const camTarget = new THREE.Vector3(0, Math.sin(latRad), Math.cos(latRad)).multiplyScalar(dist);

    isFlying = true;
    controls.autoRotate = false;

    const startRy = currentRy;
    const startCam = camera.position.clone();
    const state = { t: 0 };

    gsap.to(state, {
      t: 1,
      duration: 1.4,
      ease: 'power2.inOut',
      onUpdate: function () {
        const t = state.t;
        earthMesh.rotation.y = startRy + (targetRy - startRy) * t;
        camera.position.lerpVectors(startCam, camTarget, t);
        camera.lookAt(0, 0, 0);
        controls.update();
      },
      onComplete: function () {
        earthMesh.rotation.y = targetRy;
        camera.position.copy(camTarget);
        camera.lookAt(0, 0, 0);
        controls.update();
        isFlying = false;
        // 选中照片期间保持锁定，关闭详情面板后再恢复自动旋转
      },
    });
  }

  // ========================================
  // Detail Panel
  // ========================================
  function showDetailPanel(photo) {
    dom.detailContent.innerHTML = `
      <img class="detail-hero" src="${photo.heroUrl}" alt="${phTitle(photo)}"
           onerror="this.style.display='none';this.parentNode.classList.add('img-failed')" />
      <div class="detail-body">
        <span class="detail-category">${categoryLabel(photo.category)}</span>
        <h2 class="detail-title">${phTitle(photo)}</h2>
        <p class="detail-subtitle">${phLoc(photo)}</p>

        <div class="detail-section">
          <div class="detail-section-title">${t('app.dParams')}</div>
          <div class="detail-grid">
            <div class="detail-cell">
              <div class="detail-cell-label">${t('app.dAltitude')}</div>
              <div class="detail-cell-value gold">${photo.altitude}m</div>
            </div>
            <div class="detail-cell">
              <div class="detail-cell-label">${t('app.dDrone')}</div>
              <div class="detail-cell-value" style="font-size:11px;">${phDrone(photo)}</div>
            </div>
            <div class="detail-cell">
              <div class="detail-cell-label">ISO</div>
              <div class="detail-cell-value accent">${photo.iso}</div>
            </div>
            <div class="detail-cell">
              <div class="detail-cell-label">${t('app.dAperture')}</div>
              <div class="detail-cell-value accent">${photo.fStop}</div>
            </div>
            <div class="detail-cell">
              <div class="detail-cell-label">${t('app.dShutter')}</div>
              <div class="detail-cell-value accent">${photo.shutterSpeed}</div>
            </div>
            <div class="detail-cell">
              <div class="detail-cell-label">${t('app.dResolution')}</div>
              <div class="detail-cell-value" style="font-size:11px;">${phRes(photo)}</div>
            </div>
          </div>
        </div>

        <div class="detail-section">
          <div class="detail-section-title">${t('app.dGps')}</div>
          <div class="detail-coords">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            ${photo.lat.toFixed(4)}°, ${photo.lng.toFixed(4)}°
          </div>
        </div>

        <div class="detail-section">
          <div class="detail-section-title">${t('app.dDesc')}</div>
          <p class="detail-description">${phDesc(photo)}</p>
        </div>

        <div class="detail-section">
          <div class="detail-section-title">${t('app.dTags')}</div>
          <div class="detail-tags">
            ${phTags(photo).map(tag => `<span class="detail-tag">${tag}</span>`).join('')}
          </div>
        </div>

        <div class="detail-actions-row">
          <button class="detail-fly-btn" onclick="window.__aeroLens.flyToActive()">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 2L2 22" />
              <path d="M14 2h8v8" />
              <path d="M2 14v8h8" />
            </svg>
            ${t('app.dFly')}
          </button>
          <button class="detail-fly-btn poem-btn" id="poemBtn">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            ${t('app.dPoem')}
          </button>
        </div>
      </div>
    `;

    dom.detailPanel.classList.add('visible');

    // AI 诗篇按钮：分析当前照片并弹出双语诗歌
    var poemBtn = document.getElementById('poemBtn');
    if (poemBtn) poemBtn.addEventListener('click', function () { openPoemModal(photo); });

    gsap.from(dom.detailContent.children, {
      y: 25,
      opacity: 0,
      duration: 0.4,
      stagger: 0.05,
      ease: 'power2.out',
    });
  }

  function hideDetailPanel() {
    dom.detailPanel.classList.remove('visible');
    activePhoto = null;
    document.querySelectorAll('.photo-marker').forEach(m => m.classList.remove('active'));
    document.querySelectorAll('.photo-card').forEach(c => c.classList.remove('active'));
    // 取消选中后恢复自动旋转
    if (autoRotate) controls.autoRotate = true;
  }

  // ========================================
  // Gallery Rendering
  // ========================================
  let galleryFirstRender = true;

  function renderGallery(data) {
    dom.gallery.innerHTML = '';

    if (data.length === 0) {
      // 区分「整个相册为空」（新用户）与「当前筛选/搜索无结果」
      var emptyMsg = PHOTO_DATA.length === 0 ? t('app.emptyAlbum') : t('app.noResults');
      dom.gallery.innerHTML = '<div style="text-align:center;padding:30px 20px;color:var(--text-muted);font-size:12px;">' + emptyMsg + '</div>';
      return;
    }

    data.forEach((photo, i) => {
      const card = document.createElement('div');
      card.className = 'photo-card';
      card.dataset.photoId = photo.id;
      card.dataset.category = photo.category;

      card.innerHTML = `
        <img class="photo-thumb" src="${photo.thumbUrl}" alt="${phTitle(photo)}" loading="lazy"
             onerror="this.style.visibility='hidden';this.parentNode.classList.add('img-failed')" />
        <div class="photo-card-info">
          <div>
            <div class="photo-card-title">${phTitle(photo)}</div>
            <div class="photo-card-location">${phLoc(photo)}</div>
          </div>
          <div class="photo-card-meta">
            <span class="meta-tag">${categoryTag(photo.category)}</span>
            <span class="meta-alt">${photo.altitude}m</span>
          </div>
        </div>
      `;

      card.addEventListener('click', () => selectPhoto(photo));
      dom.gallery.appendChild(card);

      // 仅首次渲染播放入场动画。切换筛选/搜索时直接显示，
      // 避免 tween 被打断后残留 opacity:0 / transform 导致卡片发虚或错位。
      if (galleryFirstRender) {
        gsap.fromTo(card,
          { x: -24, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.32,
            delay: Math.min(i * 0.03, 0.3),
            ease: 'power2.out',
            clearProps: 'transform,opacity',
            overwrite: 'auto',
            onInterrupt: () => gsap.set(card, { clearProps: 'transform,opacity' }),
          });
      }
    });

    galleryFirstRender = false;
  }

  // ========================================
  // Hover Tooltip
  // ========================================
  function showHoverTooltip(photo, e) {
    dom.hoverTooltip.innerHTML = `<div style="font-weight:500;">${phTitle(photo)}</div><div style="font-size:10px;color:var(--text-secondary);margin-top:2px;">${phLoc(photo)} · ${photo.altitude}m</div>`;
    dom.hoverTooltip.classList.add('visible');
    positionTooltip(e);
  }

  function positionTooltip(e) {
    dom.hoverTooltip.style.left = (e.clientX + 14) + 'px';
    dom.hoverTooltip.style.top = (e.clientY + 14) + 'px';
  }

  function hideHoverTooltip() {
    dom.hoverTooltip.classList.remove('visible');
  }

  // ========================================
  // Stats
  // ========================================
  function updateStats() {
    const uniqueLocations = new Set(PHOTO_DATA.map(p => p.location));
    animateCounter(dom.photoCount, PHOTO_DATA.length);
    animateCounter(dom.locationCount, uniqueLocations.size);
    animateCounter(dom.flightCount, FLIGHT_ARCS.length);
  }

  function animateCounter(el, target) {
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 1.5,
      ease: 'power2.out',
      onUpdate: () => { el.textContent = Math.floor(obj.val); },
      onComplete: () => { el.textContent = target; },
    });
  }

  // ========================================
  // Loading
  // ========================================
  function hideLoading() {
    dom.loading.classList.add('hidden');
    setTimeout(() => { dom.loading.style.display = 'none'; }, 600);
  }

  // ========================================
  // GSAP Entrance Animations
  // ========================================
  function playEntranceAnimations() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    const sidebarHidden = document.body.classList.contains('sidebar-collapsed');

    tl.from(dom.topBar, { y: -60, opacity: 0, duration: 0.5, clearProps: 'transform,opacity' }, 0)
      .from('footer', { y: 80, opacity: 0, duration: 0.5, clearProps: 'transform,opacity' }, 0.3)
      .from('.stats-bar > div', { y: 20, opacity: 0, duration: 0.3, stagger: 0.1, clearProps: 'transform,opacity' }, 0.5);

    // 已收起的侧边栏不做入场动画，否则会被强行拉回再滑出
    if (!sidebarHidden) {
      tl.from(dom.sidebar, { x: -320, opacity: 0, duration: 0.6, clearProps: 'transform,opacity' }, 0.2);
    }
  }

  // ========================================
  // Sidebar 折叠（窄屏默认收起，避免图集盖住地球）
  // ========================================
  function setupSidebarToggle() {
    var sidebar = dom.sidebar;
    var toggleBtn = document.getElementById('sidebarToggle');
    var reopenBtn = document.getElementById('sidebarReopen');
    if (!sidebar) return;

    function setCollapsed(collapsed) {
      sidebar.classList.toggle('collapsed', collapsed);
      document.body.classList.toggle('sidebar-collapsed', collapsed);
    }
    window.setSidebarCollapsed = setCollapsed;

    if (toggleBtn) toggleBtn.addEventListener('click', function () { setCollapsed(true); });
    if (reopenBtn) reopenBtn.addEventListener('click', function () { setCollapsed(false); });

    // 窄屏（预览面板/手机）默认收起，让地球占据主要视野
    setCollapsed(window.innerWidth <= 1024);
  }

  // ========================================
  // UI Listeners (Orbital Earth controls)
  // ========================================
  function setupUIListeners() {
    // Speed slider
    dom.speedInput.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      rotationSpeed = val * 0.0001;
      controls.autoRotateSpeed = val * 0.045;
      dom.speedVal.innerText = (val / 10).toFixed(1) + 'x';
    });

    // Light slider
    dom.lightInput.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value) / 100;
      sunLight.intensity = val * 1.8;
      dom.lightVal.innerText = Math.round(val * 100) + '%';
    });

    // Atmosphere toggle
    dom.atmosToggle.addEventListener('change', (e) => {
      isAtmosEnabled = e.target.checked;
      if (cloudsMesh) cloudsMesh.visible = isAtmosEnabled;
    });

    // Markers toggle
    dom.markersToggle.addEventListener('change', (e) => {
      isMarkersEnabled = e.target.checked;
      if (markerOverlay) {
        markerOverlay.style.display = isMarkersEnabled ? 'block' : 'none';
      }
    });

    // Reset view
    dom.resetBtn.addEventListener('click', () => {
      controls.reset();
      rotationSpeed = 0.001;
      dom.speedInput.value = 10;
      dom.speedVal.innerText = '1.0x';
      sunLight.intensity = 1.8;
      dom.lightInput.value = 100;
      dom.lightVal.innerText = '100%';
      hideDetailPanel();
    });

    // Auto-rotate button
    dom.autoRotateBtn.addEventListener('click', () => {
      autoRotate = !autoRotate;
      controls.autoRotate = autoRotate;
      updateAutoRotateBtn();
    });

    // 语言切换（与产品页/登录页共享 aerolens-lang 偏好）
    document.querySelectorAll('.lang-btn').forEach(b =>
      b.addEventListener('click', () => applyLang(b.getAttribute('data-lang'))));

    // Detail close
    dom.detailClose.addEventListener('click', hideDetailPanel);

    // Search
    dom.searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const filtered = PHOTO_DATA.filter(p => !q || matchSearch(p, q));
      renderGallery(filtered);
    });

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        let filtered;
        if (filter === 'all') filtered = [...PHOTO_DATA];
        else if (filter === 'uploaded') filtered = PHOTO_DATA.filter(p => p.uploaded);
        else filtered = PHOTO_DATA.filter(p => p.category === filter);
        renderGallery(filtered);
      });
    });

    // Control Deck 折叠/展开
    var deckToggle = document.getElementById('controlDeckToggle');
    var deckEl = document.getElementById('controlDeck');
    if (deckToggle && deckEl) {
      deckToggle.addEventListener('click', function () {
        deckEl.classList.toggle('collapsed');
      });
    }

    // Upload modal
    setupUploadModal();
    setupDroneSync();
    setupLogout();
    setupPoemModal();

    // ESC closes detail & upload modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        var um = document.getElementById('uploadModal');
        if (um && um.classList.contains('visible')) {
          um.classList.remove('visible');
        } else {
          hideDetailPanel();
        }
      }
    });
  }

  // ========================================
  // Upload Modal — 上传照片逻辑
  // ========================================
  function setupUploadModal() {
    var uploadBtn = document.getElementById('uploadBtn');
    var modal = document.getElementById('uploadModal');
    var closeBtn = document.getElementById('uploadCloseBtn');
    var dropZone = document.getElementById('uploadDropZone');
    var fileInput = document.getElementById('uploadFileInput');
    var preview = document.getElementById('uploadPreview');
    var previewImg = document.getElementById('uploadPreviewImg');
    var form = document.getElementById('uploadForm');
    var titleInput = document.getElementById('uploadTitle');
    var locationInput = document.getElementById('uploadLocation');
    var categorySelect = document.getElementById('uploadCategory');
    var descInput = document.getElementById('uploadDesc');
    var submitBtn = document.getElementById('uploadSubmitBtn');
    var hintEl = document.getElementById('locHint');
    var coordEl = document.getElementById('locCoord');
    var suggestEl = document.getElementById('locSuggest');
    var pickBtn = document.getElementById('uploadPickOnGlobe');
    var pickHint = document.getElementById('globePickHint');
    var pickCancel = document.getElementById('globePickCancel');

    if (!uploadBtn || !modal) return;

    var currentImageData = null;
    var locState = { lat: null, lng: null, name: '' };

    // ---------- 位置状态 ----------
    function setHint(text, cls) {
      hintEl.textContent = text;
      hintEl.className = 'loc-hint' + (cls ? ' ' + cls : '');
    }

    function setLocation(lat, lng, name, source) {
      locState.lat = lat;
      locState.lng = lng;
      var label = name;
      if (!label) {
        var near = nearestCity(lat, lng);
        if (near) {
          var nearName = lang === 'en' ? (near[1] || near[0]) : near[0];
          var nearCountry = lang === 'en' ? (COUNTRY_EN[near[2]] || near[2]) : near[2];
          label = nearName + ' · ' + nearCountry;
        } else {
          label = t('app.customLoc');
        }
      }
      locState.name = label;
      locationInput.value = label;
      coordEl.textContent = t('app.coordPrefix') + lat.toFixed(4) + '°, ' + lng.toFixed(4) + '°';
      coordEl.classList.add('set');
      if (source === 'globe') setHint(t('app.pickedOnGlobe'), 'ok');
      else setHint(t('app.located'), 'ok');
      hideSuggest();
      validateForm();
    }

    function clearLocation() {
      locState.lat = null;
      locState.lng = null;
      locState.name = '';
      coordEl.textContent = t('app.coordWait');
      coordEl.classList.remove('set');
    }

    // ---------- 城市搜索建议 ----------
    function hideSuggest() {
      suggestEl.classList.remove('visible');
      suggestEl.innerHTML = '';
    }

    function renderSuggest(list) {
      if (!list.length) {
        suggestEl.innerHTML = '<div class="loc-suggest-empty">' + t('app.noCityMatch') + '</div>';
        suggestEl.classList.add('visible');
        return;
      }
      suggestEl.innerHTML = list.map(function (c, i) {
        var nm = lang === 'en' ? (c.en || c.name) : c.name;
        var co = lang === 'en' ? (COUNTRY_EN[c.country] || c.country) : c.country;
        return '<div class="loc-suggest-item" data-idx="' + i + '">' +
          '<span>' + nm + '</span>' +
          '<span class="loc-suggest-country">' + co + '</span>' +
          '</div>';
      }).join('');
      suggestEl.classList.add('visible');
      suggestEl.querySelectorAll('.loc-suggest-item').forEach(function (el) {
        // mousedown 只用于阻止输入框失焦（否则列表会先被隐藏），真正选中放在 click 上
        el.addEventListener('mousedown', function (e) { e.preventDefault(); });
        el.addEventListener('click', function (e) {
          e.preventDefault();
          var c = list[parseInt(el.dataset.idx, 10)];
          if (c) setLocation(c.lat, c.lng, cityLabel(c), 'search');
        });
      });
    }

    locationInput.addEventListener('input', function () {
      var kw = locationInput.value.trim();
      if (!kw) { hideSuggest(); clearLocation(); validateForm(); return; }
      renderSuggest(searchCities(kw));
    });

    locationInput.addEventListener('focus', function () {
      var kw = locationInput.value.trim();
      if (kw && locState.lat === null) renderSuggest(searchCities(kw));
    });

    locationInput.addEventListener('blur', function () {
      setTimeout(hideSuggest, 220);
    });

    locationInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        var list = searchCities(locationInput.value.trim(), 1);
        if (list.length) setLocation(list[0].lat, list[0].lng, cityLabel(list[0]), 'search');
      }
    });

    // ---------- 在地球上点选 ----------
    var picking = false;

    function startPicking() {
      picking = true;
      modal.classList.remove('visible');
      document.body.classList.add('globe-picking');
      pickHint.classList.add('visible');
    }

    function stopPicking() {
      picking = false;
      document.body.classList.remove('globe-picking');
      pickHint.classList.remove('visible');
    }

    pickBtn.addEventListener('click', startPicking);
    pickCancel.addEventListener('click', function () {
      stopPicking();
      modal.classList.add('visible');
    });

    // 地球点击 → 反算经纬度
    renderer.domElement.addEventListener('click', function (e) {
      if (!picking || !earthMesh) return;
      var rect = renderer.domElement.getBoundingClientRect();
      var ndc = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );
      var ray = new THREE.Raycaster();
      ray.setFromCamera(ndc, camera);
      var hits = ray.intersectObject(earthMesh, false);
      if (!hits.length) return;
      // 世界坐标 → 地球局部坐标（抵消自转）
      var local = earthMesh.worldToLocal(hits[0].point.clone());
      var r = local.length();
      if (r < 0.9) return; // 点到球体内部（如云层遮挡），忽略
      var phi = Math.acos(THREE.MathUtils.clamp(local.y / r, -1, 1));
      var theta = Math.atan2(local.z, -local.x);
      var lat = 90 - (phi * 180) / Math.PI;
      var lng = (theta * 180) / Math.PI - 180;
      while (lng < -180) lng += 360;
      while (lng > 180) lng -= 360;

      stopPicking();
      modal.classList.add('visible');
      setLocation(lat, lng, null, 'globe');
    });

    // ---------- 打开 / 关闭 ----------
    uploadBtn.addEventListener('click', function () {
      modal.classList.add('visible');
    });

    function closeModal() {
      stopPicking();
      modal.classList.remove('visible');
      resetUpload();
    }
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });

    function resetUpload() {
      currentImageData = null;
      preview.style.display = 'none';
      form.style.display = 'none';
      dropZone.style.display = 'flex';
      fileInput.value = '';
      titleInput.value = '';
      locationInput.value = '';
      descInput.value = '';
      categorySelect.value = 'city';
      clearLocation();
      hideSuggest();
      setHint(t('app.notLocated'), '');
      submitBtn.disabled = true;
    }

    // ---------- 文件选择 ----------
    dropZone.addEventListener('click', function () {
      fileInput.click();
    });

    dropZone.addEventListener('dragover', function (e) {
      e.preventDefault();
      dropZone.classList.add('dragover');
    });
    dropZone.addEventListener('dragleave', function () {
      dropZone.classList.remove('dragover');
    });
    dropZone.addEventListener('drop', function (e) {
      e.preventDefault();
      dropZone.classList.remove('dragover');
      var file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    });

    fileInput.addEventListener('change', function (e) {
      var file = e.target.files[0];
      if (file) handleFile(file);
    });

    function handleFile(file) {
      if (!file.type.startsWith('image/')) {
        setHint(t('app.notImage'), '');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setHint(t('app.tooLarge'), '');
        return;
      }

      var bufReader = new FileReader();
      bufReader.onload = function (ev) {
        var gps = parseExifGps(ev.target.result);

        var urlReader = new FileReader();
        urlReader.onload = function (ev2) {
          currentImageData = ev2.target.result;
          previewImg.src = currentImageData;
          dropZone.style.display = 'none';
          preview.style.display = 'block';
          form.style.display = 'block';
          if (!titleInput.value) titleInput.value = file.name.replace(/\.[^.]+$/, '');

          if (gps) {
            setLocation(gps.lat, gps.lng, null, 'exif');
            setHint(t('app.gpsRead'), 'exif');
          } else if (locState.lat === null) {
            setHint(t('app.noGps'), '');
          }
          validateForm();
        };
        urlReader.readAsDataURL(file);
      };
      bufReader.readAsArrayBuffer(file);
    }

    // ---------- 表单验证 ----------
    function validateForm() {
      var titleOk = titleInput.value.trim().length > 0;
      var locOk = locState.lat !== null && locState.lng !== null;
      submitBtn.disabled = !(titleOk && locOk);
    }

    titleInput.addEventListener('input', validateForm);

    // ---------- 提交 ----------
    submitBtn.addEventListener('click', function () {
      if (submitBtn.disabled || !currentImageData || locState.lat === null) return;

      var newPhoto = {
        id: 'u' + Date.now(),
        title: titleInput.value.trim(),
        titleEn: titleInput.value.trim(),
        location: locState.name || t('app.customLoc'),
        locationEn: locState.name || t('app.customLoc'),
        category: categorySelect.value,
        lat: locState.lat,
        lng: locState.lng,
        altitude: 0,
        droneModel: t('app.userUpload'),
        droneModelEn: t('app.userUpload'),
        timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
        resolution: t('app.userUpload'),
        resolutionEn: t('app.userUpload'),
        iso: 0,
        fStop: '-',
        shutterSpeed: '-',
        description: descInput.value.trim() || t('app.userPhoto'),
        descEn: descInput.value.trim() || t('app.userPhoto'),
        tags: [t('app.tagUpload')],
        tagsEn: [t('app.tagUpload')],
        thumbUrl: currentImageData,
        heroUrl: currentImageData,
        uploaded: true,
      };

      PHOTO_DATA.push(newPhoto);
      addMarkerForPhoto(newPhoto);

      var activeFilter = document.querySelector('.filter-btn.active');
      var filter = activeFilter ? activeFilter.dataset.filter : 'all';
      var filtered;
      if (filter === 'all') filtered = [...PHOTO_DATA];
      else if (filter === 'uploaded') filtered = PHOTO_DATA.filter(p => p.uploaded);
      else filtered = PHOTO_DATA.filter(p => p.category === filter);
      renderGallery(filtered);

      var uniqueLocations = new Set(PHOTO_DATA.map(p => p.location));
      dom.photoCount.textContent = PHOTO_DATA.length;
      dom.locationCount.textContent = uniqueLocations.size;

      // 折叠设置面板，避免遮住新照片标记
      var deck = document.getElementById('controlDeck');
      if (deck) deck.classList.add('collapsed');

      selectPhoto(newPhoto);
      closeModal();
    });
  }

  // ========================================
  // AI Poem — 大模型双语诗歌生成
  // 由本地服务（server.py）转发到百度千帆 deepseek-v4.1-flash-1017 成诗，
  // 网络失败、超时或返回不可解析时，回退到本地意象拼装（composePoem）。
  // ========================================
  var POEM_AI = {
    endpoint: '/api/poem',
    timeout: 22000
  };

  // 从照片提取"分析特征"：时刻 / 光线 / 意象 / 场景 / 视角
  function analyzePhoto(photo) {
    var hour = 12;
    var m = String(photo.timestamp || '').match(/(\d{1,2}):(\d{2})/);
    if (m) hour = parseInt(m[1], 10);
    var timeSlot, timeEn;
    if (hour < 8) { timeSlot = '晨曦初染'; timeEn = 'first light'; }
    else if (hour < 11) { timeSlot = '上午清朗'; timeEn = 'late morning'; }
    else if (hour < 14) { timeSlot = '正午天光'; timeEn = 'midday'; }
    else if (hour < 17) { timeSlot = '午后斜阳'; timeEn = 'afternoon sun'; }
    else if (hour < 20) { timeSlot = '暮色四合'; timeEn = 'dusk'; }
    else { timeSlot = '夜色未眠'; timeEn = 'nightfall'; }

    var cat = photo.category;
    var scene, sceneEn;
    if (cat === 'city') { scene = '城市肌理'; sceneEn = 'the fabric of the city'; }
    else if (cat === 'coast') { scene = '海陆交界'; sceneEn = 'where sea meets land'; }
    else { scene = '自然旷野'; sceneEn = 'the open wild'; }

    // 标签 → 意象词（中英对应，最多取 3 个）
    var IMG_MAP = {
      '纪念碑': ['石碑', 'the stone stele'], '湖景': ['湖光', 'the lake'], '广场': ['广场', 'the plaza'],
      '俯瞰': ['俯瞰', 'the overhead view'], '城市天际线': ['天际线', 'the skyline'], '阴天': ['低云', 'low clouds'],
      '楼群': ['楼群', 'towering blocks'], '远景': ['远景', 'the far distance'],
      '花坛': ['花坛', 'the flower bed'], '俯拍': ['俯瞰', 'the top-down gaze'], '三角梅': ['三角梅', 'bougainvillea'],
      '纹理': ['石纹', 'paved textures'], '人像': ['身影', 'a figure'], '合影': ['并肩', 'shoulder to shoulder'],
      '花墙': ['花墙', 'the flowering wall'], '青春': ['少年', 'youth'], '手势': ['手势', 'a raised hand'],
      '特写': ['特写', 'the close frame'], '背影': ['背影', 'a back turned'], '抓拍': ['抓拍', 'a candid blink'],
      '手机摄影': ['方寸镜头', 'a phone lens'], '城市天际': ['天际线', 'the skyline'],
      '日落': ['落日', 'the setting sun'], '日出': ['日出', 'sunrise'], '海港': ['海港', 'the harbour'],
      '山脉': ['山脊', 'the ridgeline'], '雪景': ['积雪', 'the snow'], '云海': ['云海', 'a sea of clouds'],
      '海洋': ['海洋', 'the ocean'], '沙漠': ['沙海', 'the dunes'], '城市天際線': ['天际线', 'the skyline'],
    };
    var tags = (lang === 'en' && photo.tagsEn ? photo.tagsEn : photo.tags) || [];
    var images = [];
    tags.forEach(function (tg) {
      if (IMG_MAP[tg]) images.push(IMG_MAP[tg]);
    });
    if (!images.length) {
      images.push(cat === 'city' ? ['天际线', 'the skyline'] : cat === 'coast' ? ['潮线', 'the tide line'] : ['山湖', 'mountain and lake']);
    }
    images = images.slice(0, 3);

    var height = photo.altitude || 0;
    var angle, angleEn;
    if (height >= 300) { angle = '三百米之上'; angleEn = 'three hundred meters above'; }
    else if (height >= 100) { angle = '百米高空'; angleEn = 'a hundred meters up'; }
    else if (height >= 30) { angle = '低空掠过'; angleEn = 'skimming low'; }
    else { angle = '贴地悬停'; angleEn = 'hovering close'; }

    return { timeSlot: timeSlot, timeEn: timeEn, scene: scene, sceneEn: sceneEn, images: images, angle: angle, angleEn: angleEn, height: height };
  }

  // 确定性伪随机：同照片永远得到同一首诗
  function seededRand(seedStr) {
    var h = 2166136261;
    for (var i = 0; i < seedStr.length; i++) {
      h ^= seedStr.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return function () {
      h ^= h << 13; h ^= h >>> 17; h ^= h << 5;
      return ((h >>> 0) % 1000) / 1000;
    };
  }

  function pick(arr, r) { return arr[Math.floor(r() * arr.length) % arr.length]; }

  // 生成 { zh: [4 行], en: [4 行], title }
  function composePoem(photo) {
    var a = analyzePhoto(photo);
    var r = seededRand(photo.id + (photo.title || '') + (photo.lat || 0));

    var img1 = a.images[0], img2 = a.images[a.images.length > 1 ? 1 : 0];
    var place = phLoc(photo).split('·')[0].trim();
    var placeEn = (photo.locationEn || photo.location).split('·')[0].trim();

    // 中文四行：起（时间）— 承（意象）— 转（场景）— 合（落点）
    var zhL1 = pick([a.timeSlot + '，' + a.angle, a.angle + '，' + a.timeSlot, a.timeSlot + '的风掠过' + a.angle], r);
    var zhL2 = pick([
      img1[0] + '在云影里舒展',
      img1[0] + '与' + img2[0] + '擦肩',
      '一束光落在' + img1[0] + '上',
      img1[0] + '正被天空轻轻翻译',
    ], r);
    var zhL3 = pick([
      a.scene + '在快门开合之间',
      '每一寸' + a.scene + '都屏住呼吸',
      a.scene + '收拢它所有的细节',
    ], r);
    var zhL4 = pick([
      '把' + place + '收进一个方框里',
      '为' + place + '留下一枚飞行的注脚',
      '便再没有错过' + place + '的这一秒',
    ], r);

    // 英文四行：与中文逐行呼应
    var enL1 = pick([
      'In ' + a.timeEn + ', ' + a.angleEn + ',',
      a.angleEn + ' where ' + a.timeEn + ' drifts,',
      'The ' + a.timeEn + ' wind, ' + a.angleEn + ',',
    ], r);
    var enL2 = pick([
      img1[1] + ' unfolds in the cloud shadows,',
      img1[1] + ' brushes past ' + img2[1] + ',',
      'A shaft of light rests on ' + img1[1] + ',',
      img1[1] + ' being softly translated by the sky,',
    ], r);
    var enL3 = pick([
      'and ' + a.sceneEn + ' holds its breath,',
      'every inch of ' + a.sceneEn + ' gathers its details,',
      'the shutter opens — ' + a.sceneEn + ' exhales,',
    ], r);
    var enL4 = pick([
      'keeping ' + placeEn + ' inside a small square of light.',
      'a footnote of flight for ' + placeEn + '.',
      'so this second of ' + placeEn + ' is never lost.',
    ], r);

    return { zh: [zhL1, zhL2, zhL3, zhL4], en: [enL1, enL2, enL3, enL4] };
  }

  // 组装给大模型的照片信息
  function buildPoemPrompt(photo) {
    var info = {
      title: phTitle(photo),
      place: phLoc(photo),
      category: photo.category || '',
      tags: (lang === 'en' && photo.tagsEn ? photo.tagsEn : photo.tags) || [],
      time: photo.timestamp || '',
      altitude: photo.altitude || 0
    };
    return '你是航拍影像诗人。根据下面这张航拍照片的信息，写一首中文四行短诗和一首对应的英文四行短诗。\n' +
      '要求：中文每行不超过 16 字，英文每行不超过 14 个单词；要有画面感与情绪，中文偏古风或文艺，英文自然流畅；' +
      '不要出现“照片”“摄影”“构图”等元描述；中英两版意象要互相呼应。\n' +
      '只输出 JSON，不要代码块，不要任何解释：{"zh":["","","",""],"en":["","","",""]}\n' +
      '照片信息：' + JSON.stringify(info);
  }

  // 从模型回复中解析诗歌 JSON（容忍 ```json 包裹与额外文字）
  function parsePoemJSON(text) {
    if (!text) return null;
    var s = String(text).trim().replace(/^```(?:json)?/i, '').replace(/```$/, '').trim();
    var m = s.match(/\{[\s\S]*\}/);
    if (m) s = m[0];
    try {
      var o = JSON.parse(s);
      var zh = Array.isArray(o.zh) ? o.zh.map(String).filter(function (x) { return x.trim(); }) : [];
      var en = Array.isArray(o.en) ? o.en.map(String).filter(function (x) { return x.trim(); }) : [];
      if (zh.length >= 2 && en.length >= 2) return { zh: zh.slice(0, 4), en: en.slice(0, 4) };
    } catch (e) { /* 落到本地兜底 */ }
    return null;
  }

  // 请求模型成诗；失败/超时统一返回 null
  function requestPoem(photo) {
    return new Promise(function (resolve) {
      var settled = false;
      var timer = setTimeout(function () {
        if (!settled) { settled = true; resolve(null); }
      }, POEM_AI.timeout);

      fetch(POEM_AI.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: buildPoemPrompt(photo) }],
          temperature: 0.9,
          max_tokens: 900,
          reasoning_effort: 'minimal'
        })
      }).then(function (res) { return res.json(); })
        .then(function (data) {
          if (settled) return;
          settled = true;
          clearTimeout(timer);
          var msg = data && data.choices && data.choices[0] && data.choices[0].message;
          resolve(parsePoemJSON(msg && msg.content));
        })
        .catch(function () {
          if (settled) return;
          settled = true;
          clearTimeout(timer);
          resolve(null);
        });
    });
  }

  // ---------- 诗歌弹窗 ----------
  function openPoemModal(photo) {
    var modal = document.getElementById('poemModal');
    if (!modal) return;

    // 分析阶段：两段动态提示（分析 → 成诗），真实等待模型返回
    var stageEl = document.getElementById('poemStage');
    var bodyEl = document.getElementById('poemBody');
    var metaEl = document.getElementById('poemMeta');
    modal.classList.add('visible');
    bodyEl.style.display = 'none';
    metaEl.textContent = '';
    stageEl.style.display = 'flex';
    document.getElementById('poemStageText').textContent = t('app.poemAnalyzing');

    var started = Date.now();
    var composingTimer = setTimeout(function () {
      document.getElementById('poemStageText').textContent = t('app.poemComposing');
    }, 900);

    requestPoem(photo).then(function (poem) {
      clearTimeout(composingTimer);
      var wait = Math.max(0, 700 - (Date.now() - started));
      setTimeout(function () {
        document.getElementById('poemStageText').textContent = t('app.poemComposing');
        setTimeout(function () {
          renderPoem(photo, poem || composePoem(photo));
        }, 350);
      }, wait);
    });
  }

  function renderPoem(photo, poem) {
    var stageEl = document.getElementById('poemStage');
    var bodyEl = document.getElementById('poemBody');
    var metaEl = document.getElementById('poemMeta');

    stageEl.style.display = 'none';
    bodyEl.style.display = 'block';
    metaEl.textContent = t('app.poemBasedOn') + ' · ' + phTitle(photo) + ' · ' + phLoc(photo) + ' · ' + (photo.altitude || 0) + 'm';

    document.getElementById('poemZhText').innerHTML = poem.zh.map(function (l) { return '<span class="poem-line">' + l + '</span>'; }).join('');
    document.getElementById('poemEnText').innerHTML = poem.en.map(function (l) { return '<span class="poem-line">' + l + '</span>'; }).join('');

    // 逐行浮现
    gsap.fromTo('#poemBody .poem-line',
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.22, ease: 'power2.out', clearProps: 'transform,opacity' });

    // 复制按钮（每次渲染重绑）
    var copyBtn = document.getElementById('poemCopyBtn');
    if (copyBtn) {
      copyBtn.onclick = function () {
        var text = '《' + phTitle(photo) + '》\n\n' + poem.zh.join('\n') + '\n\n' + poem.en.join('\n') +
          '\n\n— AeroLens · ' + phLoc(photo);
        try {
          navigator.clipboard.writeText(text).then(function () {
            copyBtn.textContent = t('app.poemCopied');
            setTimeout(function () { copyBtn.textContent = t('app.poemCopy'); }, 1600);
          });
        } catch (e) { /* 隐私模式忽略 */ }
      };
    }
  }

  function setupPoemModal() {
    var modal = document.getElementById('poemModal');
    if (!modal) return;
    document.getElementById('poemCloseBtn').addEventListener('click', function () {
      modal.classList.remove('visible');
    });
    modal.addEventListener('click', function (e) {
      if (e.target === modal) modal.classList.remove('visible');
    });
  }

  // ========================================
  // Logout — 顶栏用户区 + 退出登录（两步确认防误触）
  // ========================================
  function setupLogout() {
    var zone = document.getElementById('userZone');
    var btn = document.getElementById('logoutBtn');
    if (!zone || !btn) return;

    // 显示当前用户（来自登录/注册时记住的邮箱）
    var email = '';
    try { email = localStorage.getItem('aerolens_user') || ''; } catch (e) { /* 隐私模式忽略 */ }
    var emailEl = document.getElementById('userEmail');
    var avatar = document.getElementById('userAvatar');
    if (email) {
      emailEl.textContent = email;
      avatar.textContent = email.charAt(0).toUpperCase();
    } else {
      emailEl.style.display = 'none';
      avatar.textContent = 'A';
    }
    zone.style.display = 'flex';

    // 两步确认：第一次点击进入待确认状态（3.5 秒内再点才退出）
    var label = btn.querySelector('span');
    var armed = false;
    var disarmTimer = null;

    function disarm() {
      armed = false;
      btn.classList.remove('confirm');
      label.textContent = t('app.logout');
      if (disarmTimer) { clearTimeout(disarmTimer); disarmTimer = null; }
    }

    btn.addEventListener('click', function () {
      if (!armed) {
        armed = true;
        btn.classList.add('confirm');
        label.textContent = t('app.logoutConfirm');
        disarmTimer = setTimeout(disarm, 3500);
        return;
      }
      disarm();
      try { localStorage.removeItem('aerolens_user'); } catch (e) { /* 忽略 */ }
      var target = 'login.html?loggedout=1';
      if (window.aerolensNavigate) window.aerolensNavigate(target);
      else window.location.href = target;
    });
  }

  // ========================================
  // Drone Sync — 无人机实时同步（USB 挂载文件夹轮询）
  // 通过 File System Access API 选择无人机 SD 卡 / 遥控器的 DCIM 文件夹，
  // 周期扫描新增 JPG，读取 EXIF GPS 后自动落到地球；无 GPS 的照片跳过。
  // ========================================
  function setupDroneSync() {
    var droneBtn = document.getElementById('droneBtn');
    var modal = document.getElementById('droneModal');
    var closeBtn = document.getElementById('droneCloseBtn');
    var pickBtn = document.getElementById('dronePickFolderBtn');
    var pickZone = document.getElementById('dronePickZone');
    var connectedBox = document.getElementById('droneConnected');
    var folderNameEl = document.getElementById('droneFolderName');
    var disconnectBtn = document.getElementById('droneDisconnectBtn');
    var autoToggle = document.getElementById('droneAutoToggle');
    var statusDot = document.getElementById('droneStatusDot');
    var statusText = document.getElementById('droneStatusText');
    var syncCountEl = document.getElementById('droneSyncCount');
    var logEl = document.getElementById('droneLog');

    if (!droneBtn || !modal) return;

    var POLL_INTERVAL = 5000;
    var MAX_SCAN = 400;      // 单次扫描文件数上限，防止误选整个硬盘时卡死
    var dirHandle = null;    // 当前连接的文件夹句柄
    var pollTimer = null;
    var importing = false;
    var autoSync = true;
    var syncCount = 0;
    var seen = new Set();    // 已导入照片指纹 name:size:lastModified

    // ---------- 弹窗开关 ----------
    droneBtn.addEventListener('click', function () {
      modal.classList.add('visible');
    });
    function closeModal() {
      modal.classList.remove('visible'); // 关闭弹窗不停止后台轮询
    }
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });

    // ---------- 日志 ----------
    function logDrone(msg, cls) {
      if (!logEl) return;
      var time = new Date().toTimeString().slice(0, 8);
      var item = document.createElement('div');
      item.className = 'drone-log-item' + (cls ? ' ' + cls : '');
      item.innerHTML = '<span class="drone-log-time">' + time + '</span><span></span>';
      item.lastChild.textContent = msg;
      logEl.prepend(item);
      while (logEl.children.length > 30) logEl.removeChild(logEl.lastChild);
    }

    // ---------- 状态条 ----------
    function setStatus(text, connected) {
      statusText.textContent = text;
      statusDot.classList.toggle('on', !!connected);
    }

    function setSyncCount(n) {
      syncCountEl.textContent = n > 0 ? t('app.droneSyncedCount').replace('{n}', n) : '';
    }

    // ---------- 递归收集 JPG 文件 ----------
    async function collectJpgs(handle, out, depth) {
      if (depth > 3 || out.length >= MAX_SCAN) return;
      try {
        for await (var entry of handle.values()) {
          if (out.length >= MAX_SCAN) return;
          if (entry.kind === 'directory') {
            await collectJpgs(entry, out, depth + 1);
          } else if (entry.kind === 'file' && /\.(jpe?g)$/i.test(entry.name)) {
            out.push(entry);
          }
        }
      } catch (e) { /* 子目录读取失败（权限/占用）则跳过 */ }
    }

    // ---------- 选择无人机文件夹 ----------
    pickBtn.addEventListener('click', async function () {
      if (!window.showDirectoryPicker) {
        logDrone(t('app.droneNoFsApi'), 'err');
        return;
      }
      var handle;
      try {
        handle = await window.showDirectoryPicker({ mode: 'read' });
      } catch (e) {
        return; // 用户取消
      }
      disconnect(false); // 若已连接旧文件夹，先静默断开
      dirHandle = handle;
      seen.clear();
      syncCount = 0;
      setSyncCount(0);
      enterConnectedState();
      logDrone(t('app.droneConnectedLog').replace('{name}', handle.name), 'ok');
      syncNow(true);
    });

    function enterConnectedState() {
      pickZone.style.display = 'none';
      connectedBox.style.display = 'flex';
      folderNameEl.textContent = dirHandle.name;
      setStatus(t('app.droneListening'), true);
      droneBtn.classList.add('syncing');
      restartPolling();
    }

    // ---------- 断开 ----------
    disconnectBtn.addEventListener('click', function () { disconnect(true); });

    function disconnect(announce) {
      if (pollTimer) { clearInterval(pollTimer); pollTimer = null; }
      dirHandle = null;
      pickZone.style.display = 'flex';
      connectedBox.style.display = 'none';
      setStatus(t('app.droneNotConnected'), false);
      droneBtn.classList.remove('syncing');
      if (announce) logDrone(t('app.droneDisconnected'), 'warn');
    }

    // ---------- 自动同步轮询 ----------
    autoToggle.addEventListener('change', function () {
      autoSync = autoToggle.checked;
      if (dirHandle) restartPolling();
    });

    function restartPolling() {
      if (pollTimer) { clearInterval(pollTimer); pollTimer = null; }
      if (dirHandle && autoSync) {
        pollTimer = setInterval(function () { syncNow(false); }, POLL_INTERVAL);
      }
    }

    // ---------- 扫描并导入新照片 ----------
    async function syncNow(first) {
      if (!dirHandle || importing) return;
      importing = true;
      if (first) setStatus(t('app.droneScanning'), true);
      try {
        var entries = [];
        await collectJpgs(dirHandle, entries, 0);

        var newFiles = [];
        for (var i = 0; i < entries.length; i++) {
          try {
            var file = await entries[i].getFile();
            var key = file.name + ':' + file.size + ':' + file.lastModified;
            if (!seen.has(key)) newFiles.push({ file: file, key: key });
          } catch (e) { /* 文件被占用（无人机正在写入）跳过 */ }
        }

        if (!newFiles.length) {
          if (first) {
            logDrone(t('app.droneNoNew'), 'warn');
            setStatus(t('app.droneListening'), true);
          }
          return;
        }

        logDrone(t('app.droneFoundNew').replace('{n}', newFiles.length), 'ok');

        var imported = 0, skipped = 0;
        for (var n = 0; n < newFiles.length; n++) {
          var item = newFiles[n];
          logDrone(t('app.droneImportProgress')
            .replace('{i}', n + 1).replace('{n}', newFiles.length)
            .replace('{name}', item.file.name));
          var ok = await importDronePhoto(item.file, item.key);
          if (ok) imported++; else skipped++;
        }

        if (imported > 0) {
          rerenderGalleryCurrentFilter();
          updateStats();
          logDrone(t('app.droneImported').replace('{n}', imported), 'ok');
        }
        if (skipped > 0) {
          logDrone(t('app.droneSkipped').replace('{n}', skipped), 'warn');
        }
        setSyncCount(syncCount);
        setStatus(t('app.droneListening'), true);
      } finally {
        importing = false;
      }
    }

    // ---------- 导入单张照片 ----------
    async function importDronePhoto(file, key) {
      try {
        var buf = await file.arrayBuffer();
        var meta = parseExifGps(buf);
        if (!meta) return false; // 无 GPS / 非 JPEG，跳过

        var shot = await downscalePhoto(file, 1280);
        if (!shot) return false;

        // GPS → 最近城市自动命名
        var locName;
        var near = nearestCity(meta.lat, meta.lng);
        if (near) {
          var nm = lang === 'en' ? (near[1] || near[0]) : near[0];
          var co = lang === 'en' ? (COUNTRY_EN[near[2]] || near[2]) : near[2];
          locName = nm + ' · ' + co;
        } else {
          locName = t('app.customLoc');
        }

        var title = file.name.replace(/\.[^.]+$/, '');
        var droneModel = (meta.make || meta.model)
          ? ((meta.make || '') + ' ' + (meta.model || '')).trim()
          : t('app.droneSyncSource');
        var tagSync = t('app.tagDrone');
        var now = new Date();
        var resolution = shot.width + '×' + shot.height;

        var newPhoto = {
          id: 'd' + now.getTime() + '_' + Math.floor(Math.random() * 1e4),
          title: title, titleEn: title,
          location: locName, locationEn: locName,
          category: 'city',
          lat: meta.lat, lng: meta.lng,
          altitude: meta.altitude || 0,
          droneModel: droneModel, droneModelEn: droneModel,
          timestamp: meta.dateTime || now.toISOString().slice(0, 16).replace('T', ' '),
          resolution: resolution, resolutionEn: resolution,
          iso: meta.iso || 0,
          fStop: meta.fStop || '-',
          shutterSpeed: meta.shutter || '-',
          description: t('app.droneSyncDesc'), descEn: t('app.droneSyncDesc'),
          tags: [tagSync], tagsEn: [tagSync],
          thumbUrl: shot.dataUrl, heroUrl: shot.dataUrl,
          uploaded: true,
          droneSync: true,
        };

        seen.add(key);
        syncCount++;
        PHOTO_DATA.push(newPhoto);
        addMarkerForPhoto(newPhoto);
        logDrone('+' + title + ' → ' + locName, 'ok');
        return true;
      } catch (e) {
        return false;
      }
    }

    // ---------- 大图降采样为缩略图（避免 12MB 原图 base64 撑爆内存） ----------
    function downscalePhoto(file, maxSize) {
      return new Promise(function (resolve) {
        var url = URL.createObjectURL(file);
        var img = new Image();
        img.onload = function () {
          var w0 = img.naturalWidth, h0 = img.naturalHeight;
          var scale = Math.min(1, maxSize / Math.max(w0, h0));
          var w = Math.max(1, Math.round(w0 * scale));
          var h = Math.max(1, Math.round(h0 * scale));
          var canvas = document.createElement('canvas');
          canvas.width = w; canvas.height = h;
          try {
            canvas.getContext('2d').drawImage(img, 0, 0, w, h);
            var dataUrl = canvas.toDataURL('image/jpeg', 0.82);
            URL.revokeObjectURL(url);
            resolve({ dataUrl: dataUrl, width: w0, height: h0 });
          } catch (e) {
            URL.revokeObjectURL(url);
            resolve(null);
          }
        };
        img.onerror = function () {
          URL.revokeObjectURL(url);
          resolve(null);
        };
        img.src = url;
      });
    }
  }

  // 找出距离给定坐标最近的城市（用于给点选位置自动命名）
  function nearestCity(lat, lng) {
    var best = null;
    var bestD = Infinity;
    for (var i = 0; i < CITY_DB.length; i++) {
      var c = CITY_DB[i];
      var dLat = c[3] - lat;
      var dLng = c[4] - lng;
      if (dLng > 180) dLng -= 360;
      if (dLng < -180) dLng += 360;
      var cosLat = Math.cos((lat * Math.PI) / 180);
      var d = dLat * dLat + dLng * dLng * cosLat * cosLat;
      if (d < bestD) { bestD = d; best = c; }
    }
    return best;
  }

  // 从 JPEG 的 EXIF 中解析 GPS 经纬度及拍摄元信息；解析不到 GPS 返回 null
  // 返回 { lat, lng, make, model, altitude, iso, fStop, shutter, dateTime }
  function parseExifGps(buffer) {
    try {
      var view = new DataView(buffer);
      if (view.byteLength < 4 || view.getUint16(0, false) !== 0xFFD8) return null;

      var len = view.byteLength;
      var offset = 2;
      while (offset + 4 < len) {
        if (view.getUint8(offset) !== 0xFF) { offset++; continue; }
        var marker = view.getUint8(offset + 1);

        // APP1 (EXIF)
        if (marker === 0xE1) {
          var exifStart = offset + 4;
          if (exifStart + 6 > len) return null;
          if (view.getUint32(exifStart, false) !== 0x45786966) {
            offset += 2 + view.getUint16(offset + 2, false);
            continue;
          }
          var tiff = exifStart + 6;
          var little = view.getUint16(tiff, false) === 0x4949;

          // IFD0 → 找 GPS IFD 指针 (tag 0x8825) / Exif IFD 指针 (0x8769) / 机型信息
          var ifd0 = tiff + view.getUint32(tiff + 4, little);
          var entries = view.getUint16(ifd0, little);
          var gpsPtr = 0, exifPtr = 0, make = '', model = '';
          for (var i = 0; i < entries; i++) {
            var e = ifd0 + 2 + i * 12;
            if (e + 12 > len) break;
            var tag0 = view.getUint16(e, little);
            if (tag0 === 0x8825) gpsPtr = tiff + view.getUint32(e + 8, little);
            else if (tag0 === 0x8769) exifPtr = tiff + view.getUint32(e + 8, little);
            else if (tag0 === 0x010F) make = readAscii(view, e, little, tiff);
            else if (tag0 === 0x0110) model = readAscii(view, e, little, tiff);
          }

          // GPS IFD
          var lat = null, lng = null, altitude = 0;
          if (gpsPtr && gpsPtr + 2 <= len) {
            var gCount = view.getUint16(gpsPtr, little);
            var latRef = 'N', lngRef = 'E', latVal = null, lngVal = null, altRef = 0, altVal = null;
            for (var j = 0; j < gCount; j++) {
              var ge = gpsPtr + 2 + j * 12;
              if (ge + 12 > len) break;
              var tag = view.getUint16(ge, little);
              var valOff = tiff + view.getUint32(ge + 8, little);
              if (tag === 1) latRef = String.fromCharCode(view.getUint8(ge + 8));
              else if (tag === 3) lngRef = String.fromCharCode(view.getUint8(ge + 8));
              else if (tag === 5) altRef = view.getUint8(ge + 8);
              else if (tag === 2 && valOff + 24 <= len) latVal = readDms(view, valOff, little);
              else if (tag === 4 && valOff + 24 <= len) lngVal = readDms(view, valOff, little);
              else if (tag === 6 && valOff + 8 <= len) altVal = readRational1(view, ge, little, tiff);
            }
            if (latVal !== null && lngVal !== null) {
              lat = latRef === 'S' ? -latVal : latVal;
              lng = lngRef === 'W' ? -lngVal : lngVal;
              if (altRef === 1 && altVal !== null) altVal = -altVal;
              altitude = altVal !== null && isFinite(altVal) ? Math.round(altVal) : 0;
            }
          }

          // Exif IFD → 快门 / 光圈 / ISO / 拍摄时间
          var shutter = '-', fStop = '-', iso = 0, dateTime = '';
          if (exifPtr && exifPtr + 2 <= len) {
            var xCount = view.getUint16(exifPtr, little);
            for (var k = 0; k < xCount; k++) {
              var xe = exifPtr + 2 + k * 12;
              if (xe + 12 > len) break;
              var tagX = view.getUint16(xe, little);
              if (tagX === 0x829A) {
                var sec = readRational1(view, xe, little, tiff);
                shutter = fmtShutter(sec);
              } else if (tagX === 0x829D) {
                var fn = readRational1(view, xe, little, tiff);
                fStop = fn > 0 && isFinite(fn) ? 'f/' + fn.toFixed(1) : '-';
              } else if (tagX === 0x8827) {
                iso = view.getUint16(xe + 8, little);
              } else if (tagX === 0x9003) {
                dateTime = fmtExifDate(readAscii(view, xe, little, tiff));
              }
            }
          }

          if (lat === null || lng === null) return null;
          if (!isFinite(lat) || !isFinite(lng)) return null;
          if (lat === 0 && lng === 0) return null;
          if (Math.abs(lat) > 90 || Math.abs(lng) > 180) return null;
          return {
            lat: lat, lng: lng, altitude: altitude,
            make: make, model: model,
            iso: iso, fStop: fStop, shutter: shutter, dateTime: dateTime
          };
        }

        // 无长度字段的标记
        if ((marker >= 0xD0 && marker <= 0xD9) || marker === 0x01) {
          offset += 2;
        } else {
          var segLen = view.getUint16(offset + 2, false);
          if (segLen <= 0) return null;
          offset += 2 + segLen;
        }
      }
      return null;
    } catch (err) {
      return null;
    }
  }

  // 读取 EXIF 的度分秒有理数 → 十进制度
  function readDms(view, offset, little) {
    try {
      var d = view.getUint32(offset, little) / view.getUint32(offset + 4, little);
      var m = view.getUint32(offset + 8, little) / view.getUint32(offset + 12, little);
      var s = view.getUint32(offset + 16, little) / view.getUint32(offset + 20, little);
      var v = d + m / 60 + s / 3600;
      return isFinite(v) ? v : null;
    } catch (e) {
      return null;
    }
  }

  // 读取 EXIF ASCII 字段（Make / Model / 时间等），值 ≤4 字节时内联存储
  function readAscii(view, entry, little, tiffStart) {
    try {
      var count = view.getUint32(entry + 4, little);
      if (count <= 1 || count > 128) return '';
      var off = count <= 4 ? entry + 8 : tiffStart + view.getUint32(entry + 8, little);
      if (off + count > view.byteLength) return '';
      var s = '';
      for (var i = 0; i < count - 1; i++) {
        var ch = view.getUint8(off + i);
        if (ch === 0) break;
        s += String.fromCharCode(ch);
      }
      return s.trim();
    } catch (e) {
      return '';
    }
  }

  // 读取单个 RATIONAL 值
  function readRational1(view, entry, little, tiffStart) {
    try {
      var off = tiffStart + view.getUint32(entry + 8, little);
      if (off + 8 > view.byteLength) return 0;
      var num = view.getUint32(off, little), den = view.getUint32(off + 4, little);
      return den ? num / den : 0;
    } catch (e) {
      return 0;
    }
  }

  // 快门秒数 → '1/250s' / '2s'
  function fmtShutter(sec) {
    if (!sec || !isFinite(sec) || sec <= 0) return '-';
    if (sec >= 1) return (Math.round(sec * 10) / 10) + 's';
    return '1/' + Math.round(1 / sec) + 's';
  }

  // EXIF 时间 '2024:05:01 10:20:30' → '2024-05-01 10:20'
  function fmtExifDate(s) {
    if (!s || s.length < 16) return '';
    return s.slice(0, 10).replace(/:/g, '-') + s.slice(10, 16);
  }

  // 为新照片添加地球标记
  function addMarkerForPhoto(photo) {
    if (!markerOverlay) return;
    var markerEl = document.createElement('div');
    markerEl.className = 'photo-marker';
    markerEl.dataset.photoId = photo.id;
    markerEl.innerHTML =
      '<div class="photo-marker-pulse"></div>' +
      '<div class="photo-marker-pin"><img src="' + photo.thumbUrl + '" alt="' + phTitle(photo) + '" /></div>';

    markerEl.addEventListener('click', function (e) {
      e.stopPropagation();
      selectPhoto(photo);
    });
    markerEl.addEventListener('mouseenter', function (e) {
      showHoverTooltip(photo, e);
    });
    markerEl.addEventListener('mousemove', function (e) {
      positionTooltip(e);
    });
    markerEl.addEventListener('mouseleave', function () {
      hideHoverTooltip();
    });

    markerOverlay.appendChild(markerEl);

    var pos = latLngToVector3(photo.lat, photo.lng, 1.01);
    markers.push({ photo: photo, element: markerEl, vector3: pos });
  }

  // ========================================
  // Resize
  // ========================================
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  // ========================================
  // Animate (from Orbital Earth + marker updates)
  // ========================================
  function animate() {
    requestAnimationFrame(animate);

    // 自转：飞行中或已选中照片时暂停，保证目标点稳定居中
    if (earthMesh && !isFlying && !activePhoto) {
      earthMesh.rotation.y += rotationSpeed;
    }
    // 云层为地球子节点，只做轻微相对漂移
    if (cloudsMesh && !isFlying && !activePhoto) {
      cloudsMesh.rotation.y += rotationSpeed * 0.12;
    }

    controls.update();

    // Update marker screen positions
    updateMarkerPositions();

    // Update coordinate display（相机正对的球面经纬度，扣除地球自转）
    if (dom.coordDisplay) {
      const dir = camera.position.clone().normalize();
      const lat = (Math.asin(THREE.MathUtils.clamp(dir.y, -1, 1)) * 180) / Math.PI;
      const ry = earthMesh ? earthMesh.rotation.y : 0;
      const theta = Math.atan2(dir.z, -dir.x) - ry;
      const lon = ((((theta * 180) / Math.PI + 360) % 360)) - 180;
      dom.coordDisplay.textContent = `LAT ${lat.toFixed(4)}° • LON ${lon.toFixed(4)}°`;
    }

    renderer.render(scene, camera);
  }

  // ========================================
  // Public API
  // ========================================
  window.__aeroLens = {
    flyToActive() {
      if (activePhoto) flyToLocation(activePhoto);
    },
    _parseExif(buffer) {
      return parseExifGps(buffer);
    },
    _diag() {
      var earthMat = earthMesh && earthMesh.material;
      var map = earthMat && earthMat.map;
      var cloudMap = cloudsMesh && cloudsMesh.material && cloudsMesh.material.map;
      var gl = renderer ? renderer.getContext() : null;
      return {
        cameraPos: camera ? camera.position.toArray().map(function(n){return n.toFixed(3)}) : null,
        earthRotY: earthMesh ? earthMesh.rotation.y.toFixed(4) : null,
        cloudParent: cloudsMesh ? (cloudsMesh.parent === earthMesh ? 'earthMesh' : 'other') : null,
        mapLoaded: map ? (map.image && map.image.complete && map.image.naturalWidth > 0) : false,
        mapSize: map && map.image ? [map.image.naturalWidth, map.image.naturalHeight] : null,
        cloudMapSize: cloudMap && cloudMap.image ? [cloudMap.image.width, cloudMap.image.height] : null,
        sunIntensity: sunLight ? sunLight.intensity : null,
        earthVisible: earthMesh ? earthMesh.visible : null,
        cloudVisible: cloudsMesh ? cloudsMesh.visible : null,
        contextLost: gl ? gl.isContextLost() : 'no gl',
      };
    },
  };

  // ========================================
  // Boot
  // ========================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      applyLang(lang);
      init();
      renderGallery(PHOTO_DATA);
      updateStats();
      animate();
      bootDone = true;
    });
  } else {
    applyLang(lang);
    init();
    renderGallery(PHOTO_DATA);
    updateStats();
    animate();
    bootDone = true;
  }
})();
