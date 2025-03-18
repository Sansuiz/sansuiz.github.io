document.addEventListener('DOMContentLoaded', () => {
  dayjs.extend(dayjs_plugin_lunar);
  fetch('/data/days.yml').catch(err => {
    console.error('网络请求失败:', err);
    throw err;
  })
    .then(res => res.text())
    .then(yaml => {
      try {
    const events = jsyaml.load(yaml).events;
  } catch(e) {
    console.error('YAML解析错误:', e);
    throw e;
  }
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
        
        const nextDate = getNextBirthday(event);
        const progressWidth = Math.min(100, Math.abs(diffDays)/365*100);
        
        card.innerHTML = `
          <h3 class="event-title">${event.title}</h3>
          <p class="event-description">${event.description}</p>
          <div class="next-date">
            下次公历：${nextDate.format('YYYY年MM月DD日')}
          </div>
          <div class="date-progress">
            <div class="progress-bar" style="width: ${progressWidth}%"></div>
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
    .catch(err => {
  console.error('加载数据失败:', err);
  document.querySelector('.countdown-content').innerHTML = `<p class='error'>数据加载失败，请检查控制台</p>`;
});
});


function parseDate(dateStr, isLunar) {
  if(isLunar) {
    const currentYear = dayjs().year();
    let lunarDate = dayjs().lunar().year(currentYear).month(dayjs(dateStr, 'MM-DD').month()).date(dayjs(dateStr, 'MM-DD').date());
    
    // 如果日期已过则使用下一年
    if(lunarDate.isBefore(dayjs())) {
      lunarDate = lunarDate.add(1, 'year').lunar();
    }
    return lunarDate;
  }
  return dayjs(`${currentYear}-${dateStr}`).isBefore(dayjs()) ?
    dayjs(`${currentYear}-${dateStr}`).add(1, 'year') :
    dayjs(`${currentYear}-${dateStr}`);
}

function getNextBirthday(event) {
  let baseDate = parseDate(event.date, event.lunar);
  console.log('基准日期:', baseDate.format('YYYY-MM-DD'), '是否农历:', event.lunar);
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