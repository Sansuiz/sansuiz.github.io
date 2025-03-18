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
        
        // 生成标签云
      const allTags = [...new Set(events.flatMap(e => e.tags || []))];
      const tagCloud = document.querySelector('.tag-cloud');
      tagCloud.innerHTML = allTags.map(tag => 
        `<div class="tag">#${tag}</div>`
      ).join('');

      // 添加标签点击事件
      tagCloud.addEventListener('click', (e) => {
        if (e.target.classList.contains('tag')) {
          document.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));
          e.target.classList.add('active');
          const selectedTag = e.target.textContent.replace('#','');
          filterCards(selectedTag);
        }
      });

      // 卡片过滤函数
      const filterCards = (tag) => {
        document.querySelectorAll('.event-card').forEach(card => {
          card.style.display = tag && !card.dataset.tags.includes(tag) ? 'none' : 'block';
        });
      };

      events.forEach(event => {
        const eventDate = dayjs(event.date);
        const today = dayjs();
        const diffDays = eventDate.diff(today, 'day');
        
        const card = document.createElement('div');
        card.className = 'event-card';
        card.dataset.tags = event.tags?.join(',') || '';
        
        card.innerHTML = `
          <h3 class="event-title">${event.title}</h3>
          ${event.tags?.length ? `<div class="event-tags">${event.tags.map(t => `#${t}`).join(' ')}</div>` : ''}
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