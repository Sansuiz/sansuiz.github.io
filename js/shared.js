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
  const mainContent = document.querySelector('.container');
  const gallery = document.getElementById('gallery-container');
  
  if (window.scrollY > 100) {
    mainContent.style.opacity = 1 - (window.scrollY - 100) / 200;
    gallery.style.display = 'block';
    gallery.style.opacity = (window.scrollY - 100) / 200;
  } else {
    mainContent.style.opacity = 1;
    gallery.style.display = 'none';
  }
});