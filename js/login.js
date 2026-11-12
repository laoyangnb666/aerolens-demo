/* ========================================
   AeroLens · Login logic
   密码显隐 / 表单校验 / 提交跳转
   ======================================== */

(function () {
  'use strict';

  var form = document.getElementById('loginForm');
  var email = document.getElementById('email');
  var password = document.getElementById('password');
  var toggle = document.getElementById('togglePassword');
  var eyeIcon = document.getElementById('eyeIcon');
  var submit = document.getElementById('submitBtn');
  var submitText = document.getElementById('submitText');
  var remember = document.getElementById('remember');

  /* ---------- i18n 中英双语（与产品页共享 aerolens-lang 偏好） ---------- */
  var I18N = {
    zh: {
      'doc.title': 'AeroLens · 登录 — AI 无人机云端相册',
      'login.visualTag': '航拍视界',
      'login.visualLayout': '1:1 布局',
      'login.welcome': '欢迎回来',
      'login.subtitle': '登录以继续访问你的云端航拍相册。',
      'login.account': '邮箱或用户名',
      'login.password': '密码',
      'login.forgot': '忘记密码？',
      'login.remember': '记住我',
      'login.help': '需要帮助？',
      'login.submit': '登录',
      'login.verifying': '验证中…',
      'login.noAccount': '还没有账号？',
      'login.createAccount': '创建账号',
      'login.encryption': '端到端加密',
      'login.sync': '毫秒级同步',
      'login.tagline1': 'AI 无人机 · 三维地球云端相册',
      'login.tagline2': '每张照片都标注在它被拍摄的坐标上',
      'login.registered': '账号创建成功，请登录',
      'login.loggedOut': '已退出登录',
      'login.ariaToggle': '显示或隐藏密码',
      'login.altVisual': '航拍视角',
      'login.serverFailTitle': '无法自动启动本地服务器',
      'login.serverFailMsg': '请在弹窗中点「允许」打开 AeroLens Launcher；或手动双击 launcher.bat 启动服务器后重试。'
    },
    en: {
      'doc.title': 'AeroLens · Sign In — AI Drone Cloud Atlas',
      'login.visualTag': 'Aerial Vision',
      'login.visualLayout': '1:1 Layout',
      'login.welcome': 'Welcome back',
      'login.subtitle': 'Sign in to continue to your aerial cloud album.',
      'login.account': 'Email or username',
      'login.password': 'Password',
      'login.forgot': 'Forgot password?',
      'login.remember': 'Remember me',
      'login.help': 'Need help?',
      'login.submit': 'Sign In',
      'login.verifying': 'Verifying…',
      'login.noAccount': "Don't have an account?",
      'login.createAccount': 'Create account',
      'login.encryption': 'End-to-end encrypted',
      'login.sync': 'Millisecond sync',
      'login.tagline1': 'AI Drone · 3D Earth Cloud Atlas',
      'login.tagline2': 'Every photo pinned to where it was captured',
      'login.registered': 'Account created. Please sign in.',
      'login.loggedOut': 'You have been signed out.',
      'login.ariaToggle': 'Show or hide password',
      'login.altVisual': 'Aerial view',
      'login.serverFailTitle': 'Unable to start local server',
      'login.serverFailMsg': 'Please click "Allow" in the popup to open AeroLens Launcher, or manually run launcher.bat and try again.'
    }
  };

  var lang = 'zh';
  try { lang = localStorage.getItem('aerolens-lang') || 'zh'; } catch (e) { /* 隐私模式忽略 */ }
  if (lang !== 'zh' && lang !== 'en') lang = 'zh';

  function t(key) {
    return (I18N[lang] && I18N[lang][key]) || I18N.zh[key] || '';
  }

  function applyLang(next) {
    lang = next;
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.title = t('doc.title');
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var val = t(el.getAttribute('data-i18n'));
      if (val) el.textContent = val;
    });
    document.querySelectorAll('.lang-btn').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-lang') === lang);
    });
    // 提交按钮文案随状态切换（验证中… / 登录）
    submitText.textContent = t(submit.classList.contains('loading') ? 'login.verifying' : 'login.submit');
    toggle.setAttribute('aria-label', t('login.ariaToggle'));
    var visualImg = document.querySelector('.login-visual img');
    if (visualImg) visualImg.setAttribute('alt', t('login.altVisual'));
    try { localStorage.setItem('aerolens-lang', lang); } catch (e2) { /* 隐私模式忽略 */ }
  }

  applyLang(lang);

  document.querySelectorAll('.lang-btn').forEach(function (b) {
    b.addEventListener('click', function () { applyLang(b.getAttribute('data-lang')); });
  });

  /* ---------- 入场 ---------- */
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      document.body.classList.add('ready');
    });
  });

  /* ---------- 提示条：注册成功 / 已退出登录 ---------- */
  var params = new URLSearchParams(window.location.search);
  var bannerMsg = null, bannerIcon = 'lucide:check-circle';
  if (params.get('registered') === '1') {
    bannerMsg = t('login.registered');
  } else if (params.get('loggedout') === '1') {
    bannerMsg = t('login.loggedOut');
    bannerIcon = 'lucide:log-out';
  }
  if (bannerMsg) {
    var banner = document.createElement('div');
    banner.className = 'fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-xl border border-sky-400/30 bg-sky-500/15 px-4 py-2.5 text-sm text-sky-100 backdrop-blur-md shadow-[0_0_30px_rgba(56,189,248,0.35)]';
    banner.innerHTML = '<iconify-icon icon="' + bannerIcon + '" width="16"></iconify-icon><span></span>';
    banner.lastChild.textContent = bannerMsg;
    document.body.appendChild(banner);
    // 自动移除脚本依赖：iconify-icon 是 web component，innerHTML 设置后自动渲染
    setTimeout(function () {
      banner.style.transition = 'opacity .6s ease, transform .6s ease';
      banner.style.opacity = '0';
      banner.style.transform = 'translate(-50%, -8px)';
      setTimeout(function () { banner.remove(); }, 600);
    }, 3000);
  }

  /* ---------- 密码显隐 ---------- */
  toggle.addEventListener('click', function () {
    var hidden = password.type === 'password';
    password.type = hidden ? 'text' : 'password';
    eyeIcon.setAttribute('icon', hidden ? 'lucide:eye-off' : 'lucide:eye');
  });

  /* ---------- 记住我：回填 ---------- */
  try {
    var saved = localStorage.getItem('aerolens_user');
    if (saved) {
      email.value = saved;
      remember.checked = true;
    }
  } catch (e) { /* 隐私模式忽略 */ }

  /* ---------- 校验 ---------- */
  function validate() {
    var emailOk = (email.value || '').trim().length > 2;
    var pwdOk = (password.value || '').length >= 6;
    submit.disabled = !(emailOk && pwdOk);
  }

  email.addEventListener('input', validate);
  password.addEventListener('input', validate);
  validate();

  /* ---------- 提交 ---------- */
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    submit.classList.add('loading');
    submitText.textContent = t('login.verifying');
    eyeIcon.setAttribute('icon', 'lucide:loader-2');
    eyeIcon.classList.add('spin');

    try {
      if (remember.checked) {
        localStorage.setItem('aerolens_user', email.value.trim());
      } else {
        localStorage.removeItem('aerolens_user');
      }
    } catch (e2) { /* 忽略 */ }

    // 模拟鉴权 → 进入三维地球相册
    // 来自注册流程的新用户首次登录，进入空相册（只有地球，无照片）
    // 老用户登录则进入已有图集
    var isNewUser = params.get('registered') === '1';
    var target = isNewUser ? 'index.html?empty=1' : 'index.html';

    // 判断当前是否已在本地服务器上下文（http://localhost:8765）
    var onServer = location.protocol === 'http:' &&
                   (location.hostname === 'localhost' || location.hostname === '127.0.0.1') &&
                   location.port === '8765';

    // 判断是否部署在静态演示站点（如 GitHub Pages）：
    // 页面本身已是 https 部署环境，无需本地服务器，直接进入相册
    // （AI 诗歌会自动回退到内置本地成诗模式）
    var isDeployed = location.protocol === 'https:' &&
                     location.hostname !== 'localhost' && location.hostname !== '127.0.0.1';

    if (onServer || isDeployed) {
      // 直接跳转
      setTimeout(function () {
        if (window.aerolensNavigate) window.aerolensNavigate(target);
        else window.location.href = target;
      }, 900);
    } else {
      // 不在服务器上下文（file:// 或其他端口），通过自定义协议触发 launcher.bat 启动服务器
      // 需要先双击 launcher.bat 一次注册 aerolens:// 协议
      triggerLauncherAndJump(target);
    }
  });

  /* ---------- 触发自定义协议启动本地服务器，并轮询跳转 ---------- */
  function triggerLauncherAndJump(target) {
    // 用隐藏 iframe 触发自定义协议，避免页面跳转
    var launcherFrame = document.createElement('iframe');
    launcherFrame.style.display = 'none';
    launcherFrame.src = 'aerolens://start';
    document.body.appendChild(launcherFrame);

    var serverBase = 'http://localhost:8765/';
    var startTime = Date.now();
    var timeoutMs = 15000; // 最长等待 15 秒（用户需要在浏览器弹窗中点"允许"）

    function pollServer() {
      fetch(serverBase, { mode: 'no-cors', cache: 'no-cache' })
        .then(function () {
          // 服务器已启动，跳转到服务器地址
          setTimeout(function () {
            if (launcherFrame && launcherFrame.parentNode) launcherFrame.parentNode.removeChild(launcherFrame);
            window.location.href = serverBase + target;
          }, 400);
        })
        .catch(function () {
          if (Date.now() - startTime > timeoutMs) {
            // 超时：用户可能没装协议，或没点"允许"
            if (launcherFrame && launcherFrame.parentNode) launcherFrame.parentNode.removeChild(launcherFrame);
            submit.classList.remove('loading');
            submitText.textContent = t('login.submit');
            eyeIcon.setAttribute('icon', 'lucide:eye');
            eyeIcon.classList.remove('spin');
            showServerFailHint();
          } else {
            setTimeout(pollServer, 600);
          }
        });
    }
    // 略延迟后开始轮询，给协议触发 + 服务器启动一点时间
    setTimeout(pollServer, 800);
  }

  /* ---------- 服务器启动失败提示（非 alert，更友好） ---------- */
  function showServerFailHint() {
    var existing = document.getElementById('serverFailHint');
    if (existing) existing.remove();

    var hint = document.createElement('div');
    hint.id = 'serverFailHint';
    hint.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);z-index:60;' +
      'max-width:420px;width:calc(100% - 32px);padding:14px 18px;border-radius:12px;' +
      'background:rgba(15,23,42,0.92);border:1px solid rgba(248,113,113,0.4);' +
      'backdrop-filter:blur(12px);color:#fecaca;font-size:13px;line-height:1.6;' +
      'box-shadow:0 10px 30px rgba(0,0,0,0.4),0 0 20px rgba(248,113,113,0.25);';
    hint.innerHTML =
      '<div style="display:flex;align-items:flex-start;gap:10px;">' +
        '<iconify-icon icon="lucide:server-off" width="18" style="flex-shrink:0;margin-top:1px;color:#fca5a5;"></iconify-icon>' +
        '<div>' +
          '<div style="font-weight:600;margin-bottom:4px;color:#fee2e2;">' + t('login.serverFailTitle') + '</div>' +
          '<div>' + t('login.serverFailMsg') + '</div>' +
        '</div>' +
        '<button type="button" onclick="this.parentNode.parentNode.remove()" style="flex-shrink:0;background:none;border:none;color:#fca5a5;cursor:pointer;font-size:18px;padding:0 0 0 8px;line-height:1;">×</button>' +
      '</div>';
    document.body.appendChild(hint);
  }

  /* ---------- 键盘：回车提交 ---------- */
  [email, password].forEach(function (el) {
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !submit.disabled) {
        e.preventDefault();
        form.requestSubmit ? form.requestSubmit() : form.dispatchEvent(new Event('submit', { cancelable: true }));
      }
    });
  });
})();