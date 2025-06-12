// 公共JavaScript库加载
import 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
import './mouse.js';

// 初始化公共组件
window.addEventListener('DOMContentLoaded', () => {
  // 鼠标指针初始化
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);
});

window.addEventListener('scroll', function() {
  const scrollY = window.scrollY || window.pageYOffset;
  const mainContent = document.querySelector('.container');
  const gallery = document.getElementById('gallery-container');
  
  if (scrollY > 100) {
    const opacity = 1 - Math.min((scrollY - 100) / 200, 1);
    mainContent.style.opacity = opacity;
    mainContent.style.pointerEvents = opacity < 0.3 ? 'none' : 'auto';
    
    gallery.style.display = 'block';
    gallery.style.opacity = 1 - opacity;
  } else {
    mainContent.style.opacity = 1;
    mainContent.style.pointerEvents = 'auto';
    gallery.style.display = 'none';
  }
});