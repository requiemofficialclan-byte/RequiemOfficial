// ===== ОБЩИЕ ФУНКЦИИ ДЛЯ ВСЕХ СТРАНИЦ REQUIEM =====

// Функция для установки активной ссылки в навигации
function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Функция для показа уведомлений
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = 'notification';
  
  const icons = {
    'success': '✅',
    'error': '❌',
    'warning': '⚠️',
    'info': 'ℹ️'
  };
  
  notification.innerHTML = `
    <div style="display: flex; align-items: center; gap: 10px;">
      <span style="font-size: 1.2rem;">${icons[type] || icons.info}</span>
      <span>${message}</span>
    </div>
  `;
  
  document.body.appendChild(notification);
  notification.style.display = 'block';
  
  // Автоматически скрыть через 4 секунды
  setTimeout(() => {
    notification.style.animation = 'slideIn 0.3s ease reverse';
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

// Функция для подсветки текущего элемента в таблице
function highlightTableRows() {
  const tables = document.querySelectorAll('.table');
  
  tables.forEach(table => {
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach(row => {
      row.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(255,255,255,0.05)';
      });
      
      row.addEventListener('mouseleave', function() {
        this.style.background = '';
      });
    });
  });
}

// Функция для анимации появления элементов
function animateOnScroll() {
  const elements = document.querySelectorAll('.fade-in, .slide-in');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  
  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
}

// Функция для обновления Discord статуса
function updateDiscordStatus() {
  const statusElements = document.querySelectorAll('.discord-status');
  
  if (statusElements.length > 0) {
    statusElements.forEach(el => {
      el.innerHTML = `
        <div class="status-box">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
            <span class="pulse" style="display: inline-block; width: 12px; height: 12px; background: var(--success); border-radius: 50%;"></span>
            <span style="color: var(--success); font-weight: 500; font-size: 1.1rem;">Онлайн • 127 активных</span>
          </div>
          <div style="color: var(--muted); font-size: 0.9rem;">
            Сервер: <strong style="color: var(--text);">Requiem</strong> • 
            <a href="https://discord.gg/u769kvpCT5" target="_blank" style="color: var(--accent); text-decoration: none; font-weight: 500;">
              Присоединиться →
            </a>
          </div>
        </div>
      `;
    });
  }
}

// Функция для таймера обратного отсчёта
function setupCountdown() {
  const countdownElements = document.querySelectorAll('.countdown-timer');
  
  if (countdownElements.length > 0) {
    const countdownDate = new Date('March 20, 2026 23:59:59').getTime();
    
    function updateAllCountdowns() {
      const now = new Date().getTime();
      const distance = countdownDate - now;
      
      if (distance < 0) {
        countdownElements.forEach(el => {
          el.innerHTML = '<div style="color: var(--danger); font-size: 1.5rem; font-weight: bold;">Набор закрыт</div>';
        });
        return;
      }
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      
      countdownElements.forEach(el => {
        el.innerHTML = `
          <div style="font-size: 3rem; font-weight: bold; color: var(--danger); margin-bottom: 0.5rem; line-height: 1;">
            ${days < 10 ? '0' + days : days}
          </div>
          <div style="color: var(--muted); font-size: 1rem; margin-bottom: 1.5rem;">
            дней до 20 марта 2026
          </div>
          <a href="join.html" class="btn btn-primary">
            📝 Подать заявку сейчас
          </a>
        `;
      });
    }
    
    updateAllCountdowns();
    setInterval(updateAllCountdowns, 60000);
  }
}

// Инициализация всех функций при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
  // Устанавливаем активную ссылку в навигации
  setActiveNav();
  
  // Обновляем статус Discord
  updateDiscordStatus();
  
  // Настраиваем таймер обратного отсчёта
  setupCountdown();
  
  // Подсвечиваем строки в таблицах
  highlightTableRows();
  
  // Анимация при скролле
  animateOnScroll();
  
  // Добавляем обработчики для всех кнопок
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      if (this.getAttribute('href') === '#') {
        e.preventDefault();
        showNotification('Функция в разработке', 'info');
      }
    });
  });
  
  // Добавляем эффект для карточек
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
});