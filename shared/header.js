/* DLS TOOL HUB shared header v1.1. Standalone; no dependency on the tool scripts. */
(function () {
  'use strict';
  const ROOT = 'https://dai3gamechu.github.io/';
  const links = {
    event: ROOT+'dls_tool_hub/', daily: ROOT+'daily_mission_tool/',
    tower: ROOT+'watchtower_route_calculator/', tc: ROOT+'tc_calculator/',
    cement: ROOT+'ir_watchtower_calculator/', store: ROOT+'sim_ir_store/',
    mission: ROOT+'mission_guide/'
  };
  const host = document.getElementById('dls-global-header');
  if (!host) return;
  const page = host.dataset.tool || 'event';
  const item = (key, label) => `<a class="dls-gh-link" href="${links[key]}"${page === key ? ' aria-current="page"' : ''}>${label}</a>`;
  const dropItem = (key, label) => `<a href="${links[key]}"${page === key ? ' aria-current="page"' : ''}>${label}</a>`;
  const group = (title, entries) => `<details class="dls-gh-group"><summary>${title} ▾</summary><div class="dls-gh-drop">${entries.map(([key,label])=>dropItem(key,label)).join('')}</div></details>`;
  const navContents = () => item('event','イベント') + item('daily','日課') +
    group('トップ司令官', [['tc','TC計算ツール']]) +
    group('群島', [['tower','見張り台ルート計算']]) +
    group('孤島・同盟リーグ', [
      ['tower','見張り台ルート計算'],
      ['cement','IR見張り台計算'],
      ['store','IRストア交換シミュレーター'],
      ['mission','ミッション一覧']
    ]);
  host.innerHTML = `<div class="dls-gh-inner">
    <div class="dls-gh-top">
      <a class="dls-gh-brand" href="${links.event}" aria-label="DLS TOOL HUB | だい3ゲームch ホーム">
        <span class="dls-gh-brand-title">DLS TOOL HUB</span><span class="dls-gh-brand-sub">だい3ゲームch</span>
      </a>
      <div class="dls-gh-actions">
        <button class="dls-gh-iconbtn" id="dls-theme-toggle" type="button" aria-label="テーマを切り替える" title="テーマを切り替える">☀</button>
        <button class="dls-gh-iconbtn dls-gh-mobile" id="dls-menu-toggle" type="button" aria-label="メニューを開く" aria-expanded="false" aria-controls="dls-mobile-nav">☰</button>
      </div>
    </div>
    <nav class="dls-gh-nav" aria-label="ツールナビゲーション">${navContents()}</nav>
    <nav class="dls-gh-mobile-nav" id="dls-mobile-nav" aria-label="スマホ用ツールナビゲーション">${navContents()}</nav>
  </div>`;
  // Keep the existing Ver.0.8 theme storage key for backward compatibility.
  let theme = 'dark';
  try { theme = localStorage.getItem('dls-theme-v1') === 'light' ? 'light' : 'dark'; } catch (_) {}
  const themeButton = host.querySelector('#dls-theme-toggle');
  function applyTheme(value) {
    theme = value === 'light' ? 'light' : 'dark';
    document.body.dataset.theme = theme;
    themeButton.textContent = theme === 'dark' ? '☀' : '☾';
    themeButton.setAttribute('aria-label', theme === 'dark' ? 'ライトテーマに切り替える' : 'ダークグレーテーマに切り替える');
    themeButton.title = themeButton.getAttribute('aria-label');
    try { localStorage.setItem('dls-theme-v1', theme); } catch (_) {}
  }
  applyTheme(theme);
  themeButton.addEventListener('click', () => applyTheme(theme === 'dark' ? 'light' : 'dark'));
  const menuButton = host.querySelector('#dls-menu-toggle');
  const mobileNav = host.querySelector('#dls-mobile-nav');
  menuButton.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
    menuButton.textContent = isOpen ? '✕' : '☰';
  });
  // Close other open categories while retaining click/touch/keyboard support.
  host.querySelectorAll('.dls-gh-group').forEach(detail => {
    detail.addEventListener('toggle', () => {
      if (detail.open) host.querySelectorAll('.dls-gh-group').forEach(other => { if (other !== detail) other.open = false; });
    });
  });
  const footer = document.getElementById('dls-global-footer');
  if (footer) footer.textContent = 'DLS TOOL HUB | だい3ゲームch · 非公式ファンツール';
})();
