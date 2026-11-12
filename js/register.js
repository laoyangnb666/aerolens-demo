/* ========================================
   AeroLens · Register logic
   i18n / 密码强度 / 显隐 / 一致性校验 / 提交跳转
   ======================================== */

(function () {
  'use strict';

  var form = document.getElementById('registerForm');
  var username = document.getElementById('username');
  var email = document.getElementById('email');
  var password = document.getElementById('password');
  var password2 = document.getElementById('password2');
  var toggle = document.getElementById('togglePassword');
  var eyeIcon = document.getElementById('eyeIcon');
  var agree = document.getElementById('agree');
  var submit = document.getElementById('submitBtn');
  var submitText = document.getElementById('submitText');
  var strengthFill = document.getElementById('strengthFill');
  var strengthText = document.getElementById('strengthText');
  var matchHint = document.getElementById('matchHint');

  /* ---------- i18n 中英双语（与登录页共享 aerolens-lang 偏好） ---------- */
  var I18N = {
    zh: {
      'reg.docTitle': 'AeroLens · 创建账号 — AI 无人机云端相册',
      'reg.visualTag': '航拍视界', 'reg.freeJoin': '免费加入',
      'reg.title': '创建账号', 'reg.subtitle': '加入 AeroLens，开始管理你的航拍影像。',
      'reg.username': '用户名', 'reg.email': '邮箱', 'reg.password': '密码', 'reg.password2': '确认密码',
      'reg.pwdPh': '至少 6 位', 'reg.pwd2Ph': '再次输入密码',
      'reg.ariaToggle': '显示或隐藏密码',
      'reg.weak': '弱', 'reg.medium': '中', 'reg.strong': '强', 'reg.veryStrong': '极强',
      'reg.matchOk': '两次输入一致', 'reg.matchBad': '两次输入不一致',
      'reg.agree': '我已阅读并同意', 'reg.terms': '服务条款',
      'reg.submit': '创建账号', 'reg.creating': '创建中…',
      'reg.hasAccount': '已有账号？', 'reg.backLogin': '返回登录',
      'reg.trial': '免费 30 天试用',
    },
    en: {
      'reg.docTitle': 'AeroLens · Create Account — AI Drone Cloud Atlas',
      'reg.visualTag': 'Aerial Vision', 'reg.freeJoin': 'Free to join',
      'reg.title': 'Create Account', 'reg.subtitle': 'Join AeroLens and start managing your aerial imagery.',
      'reg.username': 'Username', 'reg.email': 'Email', 'reg.password': 'Password', 'reg.password2': 'Confirm Password',
      'reg.pwdPh': 'At least 6 characters', 'reg.pwd2Ph': 'Re-enter your password',
      'reg.ariaToggle': 'Show or hide password',
      'reg.weak': 'Weak', 'reg.medium': 'Fair', 'reg.strong': 'Strong', 'reg.veryStrong': 'Very strong',
      'reg.matchOk': 'Passwords match', 'reg.matchBad': 'Passwords do not match',
      'reg.agree': 'I have read and agree to the ', 'reg.terms': 'Terms of Service',
      'reg.submit': 'Create Account', 'reg.creating': 'Creating…',
      'reg.hasAccount': 'Already have an account?', 'reg.backLogin': 'Sign in',
      'reg.trial': 'Free 30-day trial',
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
    document.title = t('reg.docTitle');
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var val = t(el.getAttribute('data-i18n'));
      if (val) el.textContent = val;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder')));
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
    });
    document.querySelectorAll('.lang-btn').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-lang') === lang);
    });
    // 提交按钮随状态切换（创建中… / 创建账号）
    if (!submit.classList.contains('loading')) submitText.textContent = t('reg.submit');
    // 强度 / 一致性提示即时重译
    updateStrength();
    updateMatch();
    try { localStorage.setItem('aerolens-lang', lang); } catch (e2) { /* 隐私模式忽略 */ }
  }

  // 首次应用语言：在 STRENGTH / updateStrength 定义之后调用（见下方）
  document.querySelectorAll('.lang-btn').forEach(function (b) {
    b.addEventListener('click', function () { applyLang(b.getAttribute('data-lang')); });
  });

  /* ---------- 入场 ---------- */
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      document.body.classList.add('ready');
    });
  });

  /* ---------- 密码显隐 ---------- */
  toggle.addEventListener('click', function () {
    var hidden = password.type === 'password';
    password.type = hidden ? 'text' : 'password';
    password2.type = hidden ? 'text' : 'password';
    eyeIcon.setAttribute('icon', hidden ? 'lucide:eye-off' : 'lucide:eye');
  });

  /* ---------- 密码强度 ---------- */
  // 返回 0~4：0 空 / 1 弱 / 2 中 / 3 强 / 4 极强
  function scorePwd(p) {
    if (!p) return 0;
    var s = 0;
    if (p.length >= 6) s++;
    if (p.length >= 10) s++;
    if (/[A-Z]/.test(p) && /[a-z]/.test(p)) s++;
    if (/\d/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return Math.min(4, s);
  }

  var STRENGTH = [
    { w: '0%', c: 'transparent', k: 'reg.weak', tc: '#94a3b8' },
    { w: '25%', c: '#f87171', k: 'reg.weak', tc: '#f87171' },
    { w: '50%', c: '#fbbf24', k: 'reg.medium', tc: '#fbbf24' },
    { w: '75%', c: '#34d399', k: 'reg.strong', tc: '#34d399' },
    { w: '100%', c: '#22d3ee', k: 'reg.veryStrong', tc: '#22d3ee' }
  ];

  function updateStrength() {
    var s = scorePwd(password.value);
    var info = STRENGTH[s];
    strengthFill.style.width = info.w;
    strengthFill.style.background = info.c;
    strengthText.textContent = t(info.k); // 空密码也显示"弱"基线
    strengthText.style.color = info.tc;
  }

  /* ---------- 一致性 ---------- */
  function updateMatch() {
    if (!password2.value) {
      matchHint.classList.add('hidden');
      return;
    }
    if (password2.value === password.value) {
      matchHint.textContent = t('reg.matchOk');
      matchHint.style.color = '#34d399';
      matchHint.classList.remove('hidden');
    } else {
      matchHint.textContent = t('reg.matchBad');
      matchHint.style.color = '#f87171';
      matchHint.classList.remove('hidden');
    }
  }

  /* ---------- 校验 ---------- */
  function validate() {
    var uOk = (username.value || '').trim().length >= 2;
    var eOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((email.value || '').trim());
    var pOk = (password.value || '').length >= 6;
    var p2Ok = password2.value === password.value && pOk;
    var aOk = agree.checked;
    submit.disabled = !(uOk && eOk && pOk && p2Ok && aOk);
  }

  username.addEventListener('input', validate);
  email.addEventListener('input', validate);
  password.addEventListener('input', function () { updateStrength(); updateMatch(); validate(); });
  password2.addEventListener('input', function () { updateMatch(); validate(); });
  agree.addEventListener('change', validate);
  validate();
  updateStrength();
  applyLang(lang); // STRENGTH/updateStrength 已定义，可安全调用

  /* ---------- 提交 ---------- */
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    submit.classList.add('loading');
    submitText.textContent = t('reg.creating');
    eyeIcon.setAttribute('icon', 'lucide:loader-2');
    eyeIcon.classList.add('spin');

    try {
      // 保存账号信息，登录页可回填
      localStorage.setItem('aerolens_user', email.value.trim());
      localStorage.setItem('aerolens_registered', '1');
    } catch (e2) { /* 隐私模式忽略 */ }

    // 模拟注册成功 → 回到登录页
    setTimeout(function () {
      if (window.aerolensNavigate) window.aerolensNavigate('login.html?registered=1');
      else window.location.href = 'login.html?registered=1';
    }, 1100);
  });

  /* ---------- 键盘：回车提交 ---------- */
  [username, email, password, password2].forEach(function (el) {
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !submit.disabled) {
        e.preventDefault();
        form.requestSubmit ? form.requestSubmit() : form.dispatchEvent(new Event('submit', { cancelable: true }));
      }
    });
  });
})();
