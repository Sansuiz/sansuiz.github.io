// 瀑布流布局函数
function createMasonryGallery() {
  const container = document.querySelector('.gallery-container');
  container.innerHTML = '';
  
  // 从YAML加载数据
  fetch('/_data/gallery.yml')
    .then(response => response.text())
    .then(text => {
      // 这里需要添加YAML解析逻辑
      const galleryData = jsyaml.load(text);
      
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