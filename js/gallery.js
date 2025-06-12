// 图片数据
const galleryData = [
  {
    title: '自然风光',
    url: '/images/tu/cards/nature.jpg',
    description: '美丽的自然景观',
    date: '2025-06-15'
  },
  {
    title: '城市建筑',
    url: '/images/tu/cards/city.jpg',
    description: '现代城市建筑',
    date: '2025-06-10'
  },
  {
    title: '人物肖像',
    url: '/images/tu/cards/portrait.jpg',
    description: '生动的人物表情',
    date: '2025-06-05'
  }
  // 可以继续添加更多图片
];

// 瀑布流布局函数
function createMasonryGallery() {
  const container = document.querySelector('.gallery-container');
  container.innerHTML = '';
  
  galleryData.forEach(image => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.innerHTML = `
      <img src="${image.url}" alt="${image.title}" loading="lazy">
      <div class="gallery-info">
        <h3>${image.title}</h3>
        <p>${image.description}</p>
        <time>${image.date}</time>
      </div>
    `;
    container.appendChild(item);
  });
}

// 页面加载完成后初始化画廊
document.addEventListener('DOMContentLoaded', () => {
  createMasonryGallery();
  
  // 监听窗口大小变化，重新布局
  window.addEventListener('resize', () => {
    createMasonryGallery();
  });
});