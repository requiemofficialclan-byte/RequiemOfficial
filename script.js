// Безопасный вывод текста в HTML
function escapeHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Прогресс бар + кнопка наверх
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
