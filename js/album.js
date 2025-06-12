document.addEventListener('DOMContentLoaded', function() {
  // 筛选功能
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const filter = this.dataset.filter;
      
      // 更新按钮状态
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      // 筛选图片
      const items = document.querySelectorAll('.album-item');
      items.forEach(item => {
        if (filter === 'all' || item.dataset.tags.includes(filter)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
  
  // 图片查看功能
  const albumLinks = document.querySelectorAll('.album-link');
  const viewer = document.querySelector('.album-viewer');
  const viewerImage = viewer.querySelector('.viewer-image');
  const viewerTitle = viewer.querySelector('.viewer-title');
  const viewerDesc = viewer.querySelector('.viewer-desc');
  const viewerDate = viewer.querySelector('.viewer-date');
  const viewerClose = viewer.querySelector('.viewer-close');
  
  albumLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      viewerImage.src = this.dataset.src;
      viewerTitle.textContent = this.dataset.title;
      viewerDesc.textContent = this.dataset.desc;
      viewerDate.textContent = this.dataset.date;
      
      viewer.style.display = 'flex';
    });
  });
  
  viewerClose.addEventListener('click', function() {
    viewer.style.display = 'none';
  });
  
  viewer.addEventListener('click', function(e) {
    if (e.target === viewer) {
      viewer.style.display = 'none';
    }
  });
});