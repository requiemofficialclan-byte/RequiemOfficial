
function escapeHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const BLACKLIST_TAG_INFO = {
  'Доксинг': 'Публикация чужих личных данных без согласия',
  'Токсичность': 'Оскорбления, токс, провокации и конфликты',
  'Спам': 'Флуд, реклама, массовые однотипные сообщения',
  'Альт-аккаунты': 'Обход мута или бана через другой аккаунт',
  'Гостинг': 'Выход из войса при разборе или игнор администрации',
  'Перманент': 'В ЧС без срока — апелляция возможна через 30 дней'
};

const BLACKLIST_TAG_SLUG = {
  'Доксинг': 'dox',
  'Токсичность': 'toxic',
  'Спам': 'spam',
  'Альт-аккаунты': 'alt',
  'Гостинг': 'ghost',
  'Перманент': 'perm'
};

const NEWS_CATEGORY_INFO = {
  'Обновление': 'Изменения на сайте, сервере или в правилах',
  'Набор': 'Открыт или закрыт набор в клан',
  'Событие': 'Турниры, ивенты, совместные игры',
  'Важное': 'Срочные объявления для всех участников'
};

const NEWS_CATEGORY_SLUG = {
  'Обновление': 'update',
  'Набор': 'recruit',
  'Событие': 'event',
  'Важное': 'important'
};

function getBlacklistTagSlug(tag) {
  return BLACKLIST_TAG_SLUG[tag] || 'unknown';
}

function getNewsCategorySlug(category) {
  return NEWS_CATEGORY_SLUG[category] || 'unknown';
}

function renderLegendList(items, title, hint, type) {
  const rows = Object.entries(items).map(([name, desc]) => {
    const slug = type === 'blacklist' ? getBlacklistTagSlug(name) : getNewsCategorySlug(name);
    const cls = type === 'blacklist'
      ? `legend-tag tag-${slug}`
      : `legend-tag cat-${slug}`;
    const dataAttr = type === 'blacklist'
      ? `data-bl-filter="${escapeHtml(name)}"`
      : `data-news-filter="${escapeHtml(name)}"`;
    return `<div style="display:flex;gap:0.75rem;align-items:flex-start;padding:0.55rem 0;border-bottom:1px solid var(--border);">
      <button type="button" class="${cls} legend-tag-btn" ${dataAttr} title="${escapeHtml(desc)}">${escapeHtml(name)}</button>
      <span style="font-size:0.85rem;color:var(--text-secondary);line-height:1.5;">${escapeHtml(desc)}</span>
    </div>`;
  }).join('');
  return `
    <h2 class="card-title" style="margin-bottom:0.35rem;">${escapeHtml(title)}</h2>
    ${hint ? `<p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:1rem;line-height:1.55;">${escapeHtml(hint)}</p>` : ''}
    <div>${rows}</div>`;
}

function renderBlacklistFilterBar(activeTag) {
  const allBtn = `<button type="button" class="filter-tag${activeTag === 'all' ? ' active' : ''}" data-bl-filter="all">Все</button>`;
  const tags = Object.entries(BLACKLIST_TAG_INFO).map(([name, desc]) => {
    const slug = getBlacklistTagSlug(name);
    return `<button type="button" class="filter-tag tag-${slug}${activeTag === name ? ' active' : ''}" data-bl-filter="${escapeHtml(name)}" title="${escapeHtml(desc)}">${escapeHtml(name)}</button>`;
  }).join('');
  return `<div class="filter-tags" id="blacklistFilters">${allBtn}${tags}</div>`;
}

function renderNewsFilterBar(activeCategory) {
  const allBtn = `<button type="button" class="filter-tag${activeCategory === 'all' ? ' active' : ''}" data-news-filter="all">Все</button>`;
  const cats = Object.entries(NEWS_CATEGORY_INFO).map(([name, desc]) => {
    const slug = getNewsCategorySlug(name);
    return `<button type="button" class="filter-tag cat-${slug}${activeCategory === name ? ' active' : ''}" data-news-filter="${escapeHtml(name)}" title="${escapeHtml(desc)}">${escapeHtml(name)}</button>`;
  }).join('');
  return `<div class="filter-tags" id="newsFilters">${allBtn}${cats}</div>`;
}

function formatBlacklistTag(tag) {
  const desc = BLACKLIST_TAG_INFO[tag] || '';
  const slug = getBlacklistTagSlug(tag);
  const cls = `tag tag-${slug}${desc ? '' : ' tag-unknown'}`;
  return `<button type="button" class="${cls}" data-bl-filter="${escapeHtml(tag)}" title="${escapeHtml(desc || 'Неизвестный тег')}">${escapeHtml(tag)}</button>`;
}

function formatNewsCategory(category) {
  const desc = NEWS_CATEGORY_INFO[category] || '';
  const slug = getNewsCategorySlug(category);
  const cls = `category cat-${slug}${desc ? '' : ' category-unknown'}`;
  return `<button type="button" class="${cls}" data-news-filter="${escapeHtml(category || '')}" title="${escapeHtml(desc || 'Неизвестная категория')}">${escapeHtml(category || 'Без категории')}</button>`;
}

function bindBlacklistFilters(onFilter) {
  if (bindBlacklistFilters.ready) return;
  bindBlacklistFilters.ready = true;
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-bl-filter]');
    if (!btn) return;
    onFilter(btn.getAttribute('data-bl-filter'));
  });
}

function bindNewsFilters(onFilter) {
  
  if (bindNewsFilters.ready) return;
  bindNewsFilters.ready = true;
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-news-filter]');
    if (!btn) return;
    onFilter(btn.getAttribute('data-news-filter'));
  });
}

function setActiveFilterButtons(attr, value) {
  document.querySelectorAll(`[${attr}]`).forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute(attr) === value);
  });
}

(function() {
  const pb = document.getElementById('progressBar');
  const st = document.getElementById('scrollTop');
  if (!pb && !st) return;
  window.addEventListener('scroll', () => {
    const s = document.documentElement.scrollTop;
    const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (pb) pb.style.width = (h > 0 ? s / h * 100 : 0) + '%';
    if (st) s > 300 ? st.classList.add('visible') : st.classList.remove('visible');
  });
  if (st) st.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();
