/* ========================================
   AeroLens · Page Transition v2
   丝滑双向流：面板从右推入覆盖 → 跳转 → 新页面向左滑出
   关键改进：
   1. 本脚本在 <head> 同步执行 —— 带 flag 进入新页面时，
      覆盖层在任何绘制发生之前就已就位，杜绝新页面闪现
   2. 方向流：入从右、出向左，页面像横向轨道一样推进
   3. 中央品牌标记淡入淡出，自然遮住新页面的加载耗时
   4. 覆盖 270ms 即跳转（最后 30ms 与卸载重叠），缩短总耗时
   ======================================== */

(function () {
  'use strict';

  var KEY = 'aerolens_pt';
  var NAVIGATE_AFTER = 270; // 覆盖动画 300ms，进行到 90% 时跳转
  var CLEAN_AFTER = 620;    // 揭示动画 480ms + 余量后移除 DOM

  var MARK_HTML =
    '<div class="pt-mark"><span class="pt-dot"></span><span class="pt-word">AEROLENS</span></div>';

  function makeOverlay(covering) {
    var el = document.createElement('div');
    el.id = 'aerolens-transition';
    el.innerHTML = MARK_HTML;
    if (covering) el.classList.add('is-covering');
    // head 阶段 body 尚不存在，挂到 documentElement 上（fixed 定位不受影响）
    (document.body || document.documentElement).appendChild(el);
    return el;
  }

  /* ---------- 1) 新页面进入：同步铺覆盖层，DOM 就绪后向左滑出 ---------- */
  var incoming = false;
  try { incoming = sessionStorage.getItem(KEY) === '1'; } catch (e) { /* 隐私模式 */ }

  if (incoming) {
    try { sessionStorage.removeItem(KEY); } catch (e2) { /* 忽略 */ }
    var overlay = makeOverlay(true);

    var reveal = function () {
      // 双 rAF 确保浏览器先绘制出「已覆盖」的首帧，再触发滑出过渡
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          overlay.classList.add('is-leaving');
        });
      });
      setTimeout(function () {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      }, CLEAN_AFTER);
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', reveal);
    } else {
      reveal();
    }
  }

  /* ---------- 2) 旧页面离开：拦截链接，面板从右推入后跳转 ---------- */
  function navigateTo(url) {
    // 已有覆盖层在跑，直接跳转避免卡死
    if (document.getElementById('aerolens-transition')) {
      window.location.href = url;
      return;
    }
    var el = makeOverlay(false);
    el.offsetWidth; // 强制 reflow，确保 transition 生效
    requestAnimationFrame(function () {
      el.classList.add('is-covering');
    });
    setTimeout(function () {
      try { sessionStorage.setItem(KEY, '1'); } catch (e) { /* 隐私模式 */ }
      window.location.href = url;
    }, NAVIGATE_AFTER);
    // 安全兜底：若导航因异常未发生，3s 后自动移除覆盖层防卡死
    setTimeout(function () {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 3000);
  }

  // 暴露给 JS 驱动的跳转（login.js / register.js / app.js）
  window.aerolensNavigate = navigateTo;

  /* ---------- 拦截内部 <a> 链接 ---------- */
  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest ? e.target.closest('a') : null;
    if (!a) return;
    var href = a.getAttribute('href');
    if (!href) return;
    if (href.charAt(0) === '#' || href.indexOf('javascript:') === 0) return;
    if (a.target === '_blank') return;
    // 仅同源内部页面才走过渡
    try {
      var url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return;
    } catch (err) { return; }

    e.preventDefault();
    navigateTo(href);
  }, true);

  /* ---------- 3) BFCache 返回（浏览器后退）时清理残留 ---------- */
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      try { sessionStorage.removeItem(KEY); } catch (err) { /* 忽略 */ }
      var el = document.getElementById('aerolens-transition');
      if (el && el.parentNode) el.parentNode.removeChild(el);
    }
  });
})();
