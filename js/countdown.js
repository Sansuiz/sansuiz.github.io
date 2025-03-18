document.addEventListener('DOMContentLoaded', () => {
  fetch('/data/days.yml')
    .then(res => res.text())
    .then(yaml => {
      const events = jsyaml.load(yaml).events;
      // 创建分类导航
const categoryNav = document.createElement('nav');
categoryNav.className = 'category-nav';

// 获取所有分类
const categories = [...new Set(events.map(e => e.category))];

// 生成分类按钮
categories.forEach(category => {
  const button = document.createElement('button');
  button.className = 'category-filter';
  button.dataset.category = category;
  button.textContent = category;
  categoryNav.appendChild(button);
});

// 创建分类容器
const categoryWrapper = document.createElement('div');
categoryWrapper.className = 'category-wrapper';

// 插入导航和容器
container.appendChild(categoryNav);
container.appendChild(categoryWrapper);

// 按分类分组显示
events.reduce((groups, event) => {
  const category = event.category || '其他';
  if (!groups[category]) {
    groups[category] = [];
    
    // 创建分类标题
    const categorySection = document.createElement('section');
    categorySection.className = 'category-group';
    categorySection.innerHTML = `<h2 class="category-title">${category}</h2>`;
    categoryWrapper.appendChild(categorySection);
  }
  
  // 创建事件卡片
  const eventDate = dayjs(event.date);
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
        
        // 添加到对应分类容器
  const lastGroup = categoryWrapper.lastElementChild;
  lastGroup.appendChild(card);
      });
    })
    .catch(err => console.error('加载数据失败:', err));
});