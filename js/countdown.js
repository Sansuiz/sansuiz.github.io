document.addEventListener('DOMContentLoaded', () => {
  fetch('/data/days.yml')
    .then(res => res.text())
    .then(yaml => {
      const events = jsyaml.load(yaml).events;
      const container = document.querySelector('.countdown-content');
      
      events.forEach(event => {
        const eventDate = dayjs(event.date);
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
        card.className = 'event-card' + (event.lunar ? ' lunar-card' : '');
        
        card.innerHTML = `
          <h3 class="event-title">${event.title}</h3>
          <p class="event-description">${event.description}</p>
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


function parseDate(dateStr, isLunar) {
  if(isLunar) {
    const currentYear = dayjs().year();
    const lunarDate = dayjs(dateStr).lunar().year(currentYear).format('YYYY-MM-DD');
    return dayjs(lunarDate).isBefore(dayjs()) ? 
      dayjs(dateStr).lunar().year(currentYear + 1) : 
      dayjs(lunarDate);
  }
  return dayjs(`${dayjs().year()}-${dayjs(dateStr).format('MM-DD')}`).isBefore(dayjs()) ?
    dayjs(dateStr).add(1, 'year') :
    dayjs(`${dayjs().year()}-${dayjs(dateStr).format('MM-DD')}`);
}

function getNextBirthday(event) {
  let baseDate = parseDate(event.date, event.lunar);
  if (event.is_birthday) {
    const now = dayjs();
    let nextDate = baseDate.year(now.year());
    if (nextDate.isBefore(now, 'day')) {
      nextDate = nextDate.add(1, 'year');
    }
    return nextDate;
  }
  return baseDate;
}

// 替换原有事件处理逻辑
targetDate = getNextBirthday(event);

// 在日期显示处添加农历角标
const lunarMark = event.lunar ? '<span class="lunar-mark">(农历)</span>' : '';