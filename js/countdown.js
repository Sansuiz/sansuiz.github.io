document.addEventListener('DOMContentLoaded', () => {
  fetch('/data/days.yml')
    .then(res => res.text())
    .then(yaml => {
      const events = jsyaml.load(yaml).events;
      const container = document.querySelector('.countdown-content');
      
      events.forEach(event => {
        const eventDate = event.lunar ? dayjs(event.lunar).lunar() : dayjs(event.date);
        const today = dayjs();
        let diffDays = eventDate.diff(today, 'day');
        let yearText = '';

        if(event.is_birthday) {
          const nextYearDate = eventDate.add(1, 'year');
          if(today.isAfter(eventDate)) {
            diffDays = nextYearDate.diff(today, 'day');
            yearText = nextYearDate.year();
          } else {
            yearText = eventDate.year();
          }
        }

        const card = document.createElement('div');
        card.className = 'event-card';
        
        card.innerHTML = `
          <h3 class="event-title">${event.title}</h3>
          <p class="event-description">${event.description}${event.lunar ? `<span class="lunar-mark">农历${event.lunar.format('YYYY-MM-DD')}</span>` : ''}</p>
          <div class="date-progress">
            <div class="progress-bar" style="width: ${Math.min(100, Math.abs(diffDays))}%"></div>
          </div>
          <div class="days-counter">
            <span class="days-number ${diffDays < 0 ? 'past-day' : 'future-day'}">
              ${Math.abs(diffDays)}天
              ${event.is_birthday ? `<span class="year-mark">${yearText}</span>` : ''}
            </span>
            <span>${event.is_birthday ? (diffDays < 0 ? '距离明年生日' : '生日倒计时') : (diffDays < 0 ? '已过去' : '还剩')}</span>
          </div>
        `;
        
        container.appendChild(card);
      });
    })
    .catch(err => console.error('加载数据失败:', err));
});