/**
 * MYROSKIT — Theme Cache
 * Apply this script in <head> (before any CSS) on every page.
 * It reads the saved theme from localStorage and writes CSS variables
 * to :root immediately, preventing any flash of the default theme.
 *
 * Usage: <script src="theme.js"></script>
 */

(function () {
  const STORAGE_KEY      = 'myroskit_theme';
  const FRONTER_TINT_KEY = 'myroskit_fronter_tint';

  // ─── Theme definitions ────────────────────────────────────────────────────
  const THEMES = {
    default: {
      label: 'Void',
      description: 'The original dark charcoal',
      preview: ['#0d0d0f', '#6b6f76', '#f2f3f5'],
      vars: {
        '--bg-primary':        '#0d0d0f',
        '--bg-secondary':      'rgba(28, 29, 32, 0.65)',
        '--bg-tertiary':       'rgba(33, 34, 38, 0.6)',
        '--bg-hover':          'rgba(38, 39, 44, 0.75)',
        '--bg-input':          'rgba(15, 15, 17, 0.6)',
        '--accent':            '#6b6f76',
        '--accent-hover':      '#55585e',
        '--accent-rgb':        '107, 111, 118',
        '--green':             '#23a559',
        '--text-primary':      '#f2f3f5',
        '--text-secondary':    '#b5bac1',
        '--text-muted':        '#80848e',
        '--border':            'rgba(255, 255, 255, 0.08)',
        '--border-subtle':     'rgba(255, 255, 255, 0.04)',
        '--nav-active-bg':     '#1e1f22',
        '--nav-active-border': 'rgba(255,255,255,0.14)',
        '--shadow':            '0 8px 40px rgba(0,0,0,0.6)',
        '--tag-bg':            '#404249',
      }
    },

    midnight: {
      label: 'Midnight',
      description: 'Deep navy with indigo accents',
      preview: ['#090d1a', '#5b6dd4', '#e8eaf6'],
      vars: {
        '--bg-primary':        '#090d1a',
        '--bg-secondary':      'rgba(14, 20, 40, 0.72)',
        '--bg-tertiary':       'rgba(18, 26, 52, 0.65)',
        '--bg-hover':          'rgba(24, 34, 66, 0.8)',
        '--bg-input':          'rgba(8, 12, 26, 0.65)',
        '--accent':            '#5b6dd4',
        '--accent-hover':      '#4a5abf',
        '--accent-rgb':        '91, 109, 212',
        '--green':             '#3dbf7a',
        '--text-primary':      '#e8eaf6',
        '--text-secondary':    '#9da8d8',
        '--text-muted':        '#606a9a',
        '--border':            'rgba(91, 109, 212, 0.15)',
        '--border-subtle':     'rgba(91, 109, 212, 0.07)',
        '--nav-active-bg':     '#111830',
        '--nav-active-border': 'rgba(91,109,212,0.35)',
        '--shadow':            '0 8px 40px rgba(0,0,0,0.7)',
        '--tag-bg':            '#1e2a52',
      }
    },

    rose: {
      label: 'Rose',
      description: 'Warm dark with dusty rose',
      preview: ['#120a0e', '#c4607a', '#f5e6ea'],
      vars: {
        '--bg-primary':        '#120a0e',
        '--bg-secondary':      'rgba(30, 16, 22, 0.7)',
        '--bg-tertiary':       'rgba(38, 20, 28, 0.65)',
        '--bg-hover':          'rgba(48, 26, 36, 0.8)',
        '--bg-input':          'rgba(14, 8, 11, 0.65)',
        '--accent':            '#c4607a',
        '--accent-hover':      '#ad4f68',
        '--accent-rgb':        '196, 96, 122',
        '--green':             '#4aba7e',
        '--text-primary':      '#f5e6ea',
        '--text-secondary':    '#c9a0ae',
        '--text-muted':        '#8a6070',
        '--border':            'rgba(196, 96, 122, 0.14)',
        '--border-subtle':     'rgba(196, 96, 122, 0.06)',
        '--nav-active-bg':     '#1e0f16',
        '--nav-active-border': 'rgba(196,96,122,0.3)',
        '--shadow':            '0 8px 40px rgba(0,0,0,0.65)',
        '--tag-bg':            '#3d1e28',
      }
    },

    forest: {
      label: 'Forest',
      description: 'Mossy green, deep and earthy',
      preview: ['#090e0b', '#4a8c62', '#dff0e6'],
      vars: {
        '--bg-primary':        '#090e0b',
        '--bg-secondary':      'rgba(13, 22, 16, 0.7)',
        '--bg-tertiary':       'rgba(17, 28, 21, 0.65)',
        '--bg-hover':          'rgba(22, 36, 27, 0.8)',
        '--bg-input':          'rgba(8, 13, 10, 0.65)',
        '--accent':            '#4a8c62',
        '--accent-hover':      '#3a7350',
        '--accent-rgb':        '74, 140, 98',
        '--green':             '#5dc98a',
        '--text-primary':      '#dff0e6',
        '--text-secondary':    '#91b89e',
        '--text-muted':        '#567862',
        '--border':            'rgba(74, 140, 98, 0.14)',
        '--border-subtle':     'rgba(74, 140, 98, 0.06)',
        '--nav-active-bg':     '#0e1a12',
        '--nav-active-border': 'rgba(74,140,98,0.3)',
        '--shadow':            '0 8px 40px rgba(0,0,0,0.65)',
        '--tag-bg':            '#1a3322',
      }
    },

    dusk: {
      label: 'Dusk',
      description: 'Warm amber in the dark',
      preview: ['#0f0b06', '#c8883a', '#f7ede0'],
      vars: {
        '--bg-primary':        '#0f0b06',
        '--bg-secondary':      'rgba(26, 20, 12, 0.7)',
        '--bg-tertiary':       'rgba(34, 26, 15, 0.65)',
        '--bg-hover':          'rgba(44, 33, 18, 0.8)',
        '--bg-input':          'rgba(13, 10, 6, 0.65)',
        '--accent':            '#c8883a',
        '--accent-hover':      '#b07230',
        '--accent-rgb':        '200, 136, 58',
        '--green':             '#4db87a',
        '--text-primary':      '#f7ede0',
        '--text-secondary':    '#c8a882',
        '--text-muted':        '#8a6e48',
        '--border':            'rgba(200, 136, 58, 0.14)',
        '--border-subtle':     'rgba(200, 136, 58, 0.06)',
        '--nav-active-bg':     '#1c150a',
        '--nav-active-border': 'rgba(200,136,58,0.3)',
        '--shadow':            '0 8px 40px rgba(0,0,0,0.65)',
        '--tag-bg':            '#3d2a10',
      }
    },

    light: {
      label: 'Paper',
      description: 'Clean light mode for bright spaces',
      preview: ['#f4f4f6', '#5b6dd4', '#14151a'],
      vars: {
        '--bg-primary':        '#f4f4f6',
        '--bg-secondary':      'rgba(255, 255, 255, 0.75)',
        '--bg-tertiary':       'rgba(240, 241, 244, 0.8)',
        '--bg-hover':          'rgba(230, 231, 236, 0.9)',
        '--bg-input':          'rgba(248, 248, 250, 0.85)',
        '--accent':            '#5b6dd4',
        '--accent-hover':      '#4a5abf',
        '--accent-rgb':        '91, 109, 212',
        '--green':             '#1e9e5a',
        '--text-primary':      '#14151a',
        '--text-secondary':    '#42454e',
        '--text-muted':        '#7a7d88',
        '--border':            'rgba(0, 0, 0, 0.1)',
        '--border-subtle':     'rgba(0, 0, 0, 0.05)',
        '--nav-active-bg':     '#eaebed',
        '--nav-active-border': 'rgba(0,0,0,0.15)',
        '--shadow':            '0 8px 40px rgba(0,0,0,0.12)',
        '--tag-bg':            '#d8d9df',
      }
    },
  };

  // ─── Apply base theme ─────────────────────────────────────────────────────
  function applyTheme(themeId) {
    const theme = THEMES[themeId] || THEMES.default;
    const root = document.documentElement;
    for (const [prop, val] of Object.entries(theme.vars)) {
      root.style.setProperty(prop, val);
    }
    let navStyle = document.getElementById('mk-theme-nav');
    if (!navStyle) {
      navStyle = document.createElement('style');
      navStyle.id = 'mk-theme-nav';
      document.head.appendChild(navStyle);
    }
    navStyle.textContent = `
      .nav-tab.active {
        background: ${theme.vars['--nav-active-bg']} !important;
        border-color: ${theme.vars['--nav-active-border']} !important;
        color: var(--text-primary) !important;
      }
    `;
  }

  // ─── Color math ───────────────────────────────────────────────────────────
  function hexToRgb(hex) {
    const h = hex.replace('#', '');
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    return isNaN(r) ? null : { r, g, b };
  }

  function rgbToHex({ r, g, b }) {
    return '#' + [r, g, b].map(c => Math.round(c).toString(16).padStart(2, '0')).join('');
  }

  function lerpRgb(a, b, t) {
    return {
      r: a.r + (b.r - a.r) * t,
      g: a.g + (b.g - a.g) * t,
      b: a.b + (b.b - a.b) * t,
    };
  }

  // Ease in-out cubic
  function easeInOut(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  function darkenRgb({ r, g, b }, amount) {
    return {
      r: Math.max(0, r - amount),
      g: Math.max(0, g - amount),
      b: Math.max(0, b - amount),
    };
  }

  // Build all the CSS var values from an rgb object at time t
  function buildTintFrame(rgb) {
    const rStr = `${Math.round(rgb.r)}, ${Math.round(rgb.g)}, ${Math.round(rgb.b)}`;
    const hex   = rgbToHex(rgb);
    const hoverRgb = darkenRgb(rgb, 22);
    const hover = rgbToHex(hoverRgb);
    return { rgb, rStr, hex, hover };
  }

  // Write the computed tint frame to the DOM
  function writeTintFrame({ rgb, rStr, hex, hover }) {
    const root = document.documentElement;
    root.style.setProperty('--accent',            hex);
    root.style.setProperty('--accent-hover',      hover);
    root.style.setProperty('--accent-rgb',        rStr);
    root.style.setProperty('--border',            `rgba(${rStr}, 0.18)`);
    root.style.setProperty('--border-subtle',     `rgba(${rStr}, 0.08)`);
    root.style.setProperty('--nav-active-border', `rgba(${rStr}, 0.4)`);
    root.style.setProperty('--tag-bg',            `rgba(${rStr}, 0.18)`);

    // nav-active-bg
    let navStyle = document.getElementById('mk-theme-nav');
    if (!navStyle) {
      navStyle = document.createElement('style');
      navStyle.id = 'mk-theme-nav';
      document.head.appendChild(navStyle);
    }
    navStyle.textContent = `
      .nav-tab.active {
        background: rgba(${rStr}, 0.12) !important;
        border-color: rgba(${rStr}, 0.4) !important;
        color: var(--text-primary) !important;
      }
    `;

    // Background tint overlay
    let tintStyle = document.getElementById('mk-fronter-tint');
    if (!tintStyle) {
      tintStyle = document.createElement('style');
      tintStyle.id = 'mk-fronter-tint';
      document.head.appendChild(tintStyle);
    }
    tintStyle.textContent = `
      body::before {
        content: '';
        position: fixed;
        inset: 0;
        background: rgba(${rStr}, 0.06);
        pointer-events: none;
        z-index: 0;
      }
      .info-card, .content-box, .member-card, .group-card,
      .settings-section, .new-group-box, .log-switch-box,
      .modal, .modal-box, .location-card, .hs-card {
        box-shadow: inset 0 0 0 9999px rgba(${rStr}, 0.07) !important;
      }
    `;
  }

  // ─── Transition engine ────────────────────────────────────────────────────
  const FADE_DURATION = 650; // ms

  let _currentRgb   = null; // the rgb we're currently showing
  let _targetRgb    = null; // the rgb we're animating toward
  let _animStart    = null;
  let _animFromRgb  = null;
  let _rafId        = null;

  function cancelAnim() {
    if (_rafId !== null) {
      cancelAnimationFrame(_rafId);
      _rafId = null;
    }
  }

  function animateTo(targetRgb, immediate) {
    cancelAnim();
    _targetRgb = targetRgb;

    if (immediate || !_currentRgb) {
      // Snap instantly (first load or tint just enabled)
      _currentRgb = targetRgb;
      writeTintFrame(buildTintFrame(targetRgb));
      return;
    }

    // Start a smooth fade from the current color to the new one
    _animFromRgb = { ..._currentRgb };
    _animStart   = null;

    function step(ts) {
      if (_animStart === null) _animStart = ts;
      const elapsed = ts - _animStart;
      const t = Math.min(elapsed / FADE_DURATION, 1);
      const eased = easeInOut(t);

      const interp = lerpRgb(_animFromRgb, _targetRgb, eased);
      writeTintFrame(buildTintFrame(interp));

      if (t < 1) {
        _rafId = requestAnimationFrame(step);
      } else {
        // Animation done — snap to exact target
        _currentRgb = _targetRgb;
        writeTintFrame(buildTintFrame(_currentRgb));
        _rafId = null;
      }
    }

    _rafId = requestAnimationFrame(step);
  }

  // ─── Fronter color reading ────────────────────────────────────────────────
  function getFronterHex() {
    try {
      const raw = sessionStorage.getItem('pk_cache');
      if (!raw) return null;
      const cache = JSON.parse(raw);
      const fl = Array.isArray(cache.fronter)
        ? cache.fronter
        : (cache.fronter ? [cache.fronter] : []);
      const fronter = fl[0];
      const raw_color = fronter && fronter.color ? fronter.color.replace('#', '') : null;
      if (!raw_color || !/^[0-9a-fA-F]{6}$/.test(raw_color)) return null;
      return '#' + raw_color;
    } catch { return null; }
  }

  // ─── Main tint apply (called on poll + explicit refresh) ─────────────────
  function applyFronterTint(immediate) {
    if (!isFronterTintEnabled()) return;
    const hex = getFronterHex();
    if (!hex) return;
    const rgb = hexToRgb(hex);
    if (!rgb) return;

    // Only animate if the color actually changed
    const same = _currentRgb &&
      Math.abs(_currentRgb.r - rgb.r) < 1 &&
      Math.abs(_currentRgb.g - rgb.g) < 1 &&
      Math.abs(_currentRgb.b - rgb.b) < 1;

    if (!same) animateTo(rgb, immediate);
  }

  function clearFronterTint() {
    cancelAnim();
    _currentRgb = null;
    _targetRgb  = null;
    // Re-apply base theme to reset all overridden vars
    applyTheme(localStorage.getItem(STORAGE_KEY) || 'default');
    const tintStyle = document.getElementById('mk-fronter-tint');
    if (tintStyle) tintStyle.textContent = '';
  }

  function isFronterTintEnabled() {
    return localStorage.getItem(FRONTER_TINT_KEY) === 'true';
  }

  // ─── Public API ───────────────────────────────────────────────────────────
  window.MKTheme = {
    THEMES,

    get current() {
      return localStorage.getItem(STORAGE_KEY) || 'default';
    },

    get fronterTint() {
      return isFronterTintEnabled();
    },

    set(themeId) {
      if (!THEMES[themeId]) return;
      localStorage.setItem(STORAGE_KEY, themeId);
      applyTheme(themeId);
      if (isFronterTintEnabled()) applyFronterTint(true);
      window.dispatchEvent(new CustomEvent('mkthemechange', { detail: { themeId } }));
    },

    apply() {
      applyTheme(this.current);
      // Snap immediately on initial page load — no animation
      if (isFronterTintEnabled()) applyFronterTint(true);
    },

    setFronterTint(enabled) {
      localStorage.setItem(FRONTER_TINT_KEY, enabled ? 'true' : 'false');
      if (enabled) {
        applyFronterTint(true); // snap on first enable
      } else {
        clearFronterTint();
      }
      window.dispatchEvent(new CustomEvent('mkfrontertintchange', { detail: { enabled } }));
    },

    // Called after a switch is logged — animate to the new fronter's color
    refreshFronterColor() {
      if (isFronterTintEnabled()) {
        // Small delay so the cache has been written before we read it
        setTimeout(() => applyFronterTint(false), 80);
      }
    },
  };

  // Apply on script load
  window.MKTheme.apply();

  // ─── Live fronter poll — works on every page ─────────────────────────────
  // Polls the PluralKit API directly every 15s so any page picks up fronter
  // changes without needing its own boot() fetch.

  const PK_API  = 'https://api.pluralkit.me/v2';
  const POLL_MS = 15000;

  let _lastFronterId = null;
  let _tintPoll      = null;
  let _pollBusy      = false;

  // Seed _lastFronterId from cache so the very first poll doesn't false-fire
  function seedLastFronterId() {
    try {
      const raw = sessionStorage.getItem('pk_cache');
      if (!raw) return;
      const cache = JSON.parse(raw);
      const fl = Array.isArray(cache.fronter)
        ? cache.fronter
        : (cache.fronter ? [cache.fronter] : []);
      _lastFronterId = fl[0] ? fl[0].id : null;
    } catch {}
  }

  async function pollFronterFromAPI() {
    if (!isFronterTintEnabled()) return;
    if (_pollBusy) return;

    const token = sessionStorage.getItem('pk_token');
    if (!token) return;

    _pollBusy = true;
    try {
      const swRes = await fetch(`${PK_API}/systems/@me/switches?limit=1`, {
        headers: { Authorization: token }
      });
      if (!swRes.ok) { _pollBusy = false; return; }
      const switches = await swRes.json();

      const sw = switches[0];
      const memberIds = sw && sw.members
        ? sw.members.map(x => typeof x === 'string' ? x : x.id)
        : [];
      const newFronterId = memberIds[0] || null;

      // No change — nothing to do
      if (newFronterId === _lastFronterId) { _pollBusy = false; return; }
      _lastFronterId = newFronterId;

      if (!newFronterId) {
        // Switched to no fronter
        _pollBusy = false;
        window.dispatchEvent(new CustomEvent('mkfronterchanged'));
        return;
      }

      // Fetch the new fronter member to get their color
      const mRes = await fetch(`${PK_API}/members/${newFronterId}`, {
        headers: { Authorization: token }
      });
      if (!mRes.ok) { _pollBusy = false; return; }
      const member = await mRes.json();

      // Patch pk_cache so the rest of the app stays consistent
      try {
        const raw = sessionStorage.getItem('pk_cache');
        const cache = raw ? JSON.parse(raw) : {};
        if (cache.members && Array.isArray(cache.members)) {
          const idx = cache.members.findIndex(m => m.id === member.id);
          if (idx >= 0) cache.members[idx] = member;
          else cache.members.push(member);
        }
        cache.fronter = [member];
        sessionStorage.setItem('pk_cache', JSON.stringify(cache));
      } catch {}

      // Animate to the new color
      applyFronterTint(false);

      // Notify any open UI (settings pill, fronter card, etc.)
      window.dispatchEvent(new CustomEvent('mkfronterchanged'));

    } catch { /* network error — silent */ }

    _pollBusy = false;
  }

  function startTintPoll() {
    if (_tintPoll) return;
    seedLastFronterId();
    // Immediate kick so the color is right on first enable
    pollFronterFromAPI();
    _tintPoll = setInterval(pollFronterFromAPI, POLL_MS);
  }

  function stopTintPoll() {
    clearInterval(_tintPoll);
    _tintPoll = null;
  }

  if (isFronterTintEnabled()) startTintPoll();

  window.addEventListener('mkfrontertintchange', (e) => {
    if (e.detail.enabled) startTintPoll();
    else stopTintPoll();
  });

})();
