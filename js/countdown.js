document.addEventListener('DOMContentLoaded', () => {
  fetch('/data/days.yml')
    .then(res => res.text())
    .then(yaml => {
      const events = jsyaml.load(yaml).events;
      const container = document.querySelector('.countdown-content');
      
      events.forEach(event => {
        const eventDate = dayjs(event.date);
        const today = dayjs();
        const diffDays = eventDate.diff(today, 'day');
        
        const card = document.createElement('div');
        card.className = 'event-card';
        
        card.innerHTML = `
          <h3 class="event-title">${event.title}</h3>
          <p class="event-description">${event.description}</p>
          <div class="date-progress">
            <div class="progress-bar" style="width: ${Math.min(100, Math.abs(diffDays))}%"></div>
          </div>
          <div class="days-counter">
            <span class="days-number ${diffDays < 0 ? 'past-day' : 'future-day'}">
              ${Math.abs(diffDays)}天
            </span>
            <span>${diffDays < 0 ? '已过去' : '还剩'}</span>
          </div>
        `;
        
        container.appendChild(card);
      });
    })
    .catch(err => console.error('加载数据失败:', err));
});