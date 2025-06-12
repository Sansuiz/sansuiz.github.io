// 公共JavaScript库加载
import 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
import './mouse.js';

// 初始化公共组件
window.addEventListener('DOMContentLoaded', () => {
  // 鼠标指针初始化
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);
  
  // 横向画廊导航
  const track = document.querySelector('.gallery-track');
  const slides = Array.from(document.querySelectorAll('.gallery-slide'));
  const nextBtn = document.querySelector('.next');
  const prevBtn = document.querySelector('.prev');
  
  let currentIndex = 0;
  
  function updateGallery() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  }
  
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateGallery();
  });
  
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateGallery();
  });
});