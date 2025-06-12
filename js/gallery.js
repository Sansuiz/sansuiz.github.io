// 加载相册数据并初始化画廊
fetch('/_data/gallery.yml')
  .then(response => response.text())
  .then(text => {
    const galleryData = jsyaml.load(text);
    initGallery(galleryData);
  });

function initGallery(data) {
  const gallery = document.getElementById('gallery');
  const mainContent = document.querySelector('main');
  
  // 渲染相册内容
  data.albums.forEach(album => {
    const albumEl = document.createElement('div');
    albumEl.className = 'gallery-album';
    albumEl.innerHTML = `
      <h2>${album.title}</h2>
      <p>${album.description}</p>
      <div class="gallery-images">
        ${album.images.map(img => 
          `<img src="${img.path}" alt="${img.caption}" title="${img.caption}">`
        ).join('')}
      </div>
    `;
    gallery.appendChild(albumEl);
  });

  // 鼠标滚动事件
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > lastScroll) {
      // 向下滚动
      const opacity = 1 - Math.min(currentScroll / 300, 1);
      mainContent.style.opacity = opacity;
      
      if (currentScroll > 500) {
        gallery.classList.add('active');
      }
    } else {
      // 向上滚动
      gallery.classList.remove('active');
      mainContent.style.opacity = 1;
    }
    
    lastScroll = currentScroll;
  });
}