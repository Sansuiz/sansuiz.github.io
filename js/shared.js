// 公共JavaScript库加载
import 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
import './mouse.js';

// 初始化公共组件
window.addEventListener('DOMContentLoaded', () => {
  // 鼠标指针初始化
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);

  // 画廊交互
  let startY;
  const gallery = document.querySelector('.gallery-container');
  const threshold = 100; // 滑动阈值
  
  window.addEventListener('touchstart', (e) => {
    startY = e.touches[0].clientY;
  });
  
  window.addEventListener('touchmove', (e) => {
    if (!startY) return;
    
    const y = e.touches[0].clientY;
    const diff = startY - y;
    
    if (diff > threshold && !gallery.classList.contains('active')) {
      gallery.classList.add('active');
    } else if (diff < -threshold && gallery.classList.contains('active')) {
      gallery.classList.remove('active');
    }
  });
  
  // 鼠标滚轮交互
  window.addEventListener('wheel', (e) => {
    if (e.deltaY > 50 && !gallery.classList.contains('active')) {
      gallery.classList.add('active');
    } else if (e.deltaY < -50 && gallery.classList.contains('active')) {
      gallery.classList.remove('active');
    }
  });
});