let messagesHtml = '';
    if (t.messages && Array.isArray(t.messages)) {
      t.messages.forEach(m => {
        const mClass = m.author === 'user' ? 'amsg-user' : 'amsg-admin';
        const mTime = m.time ? new Date(m.time).toLocaleTimeString('ru-RU', {hour: '2-digit', minute:'2-digit'}) : '';
        messagesHtml += `
          <div class="admin-chat-msg ${mClass}">
            ${m.text || ''}
            <span class="admin-msg-time">${mTime}</span>
          </div>
        `;
      });
    } else if (t.message) {
      const mTime = t.createdAt ? new Date(t.createdAt).toLocaleTimeString('ru-RU', {hour: '2-digit', minute:'2-digit'}) : '';
      messagesHtml += `
        <div class="admin-chat-msg amsg-user">
          ${t.message}
          <span class="admin-msg-time">${mTime}</span>
        </div>
      `;
    }
