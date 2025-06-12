// 公共JavaScript库加载
import 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
import './mouse.js';

// 初始化公共组件
window.addEventListener('DOMContentLoaded', () => {
  // 鼠标指针初始化
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);
  
  // 滚动分页功能
  const pages = document.querySelectorAll('.page');
  const navLinks = document.querySelectorAll('.nav a');
  let currentPage = 0;
  
  // 初始化
  function initPages() {
    pages.forEach((page, index) => {
      if (index === 0) {
        page.classList.add('active');
      } else {
        page.style.transform = `translateY(${100 * index}vh)`;
      }
    });
  }
  
  // 滚动事件
  window.addEventListener('wheel', (e) => {
    if (e.deltaY > 0 && currentPage < pages.length - 1) {
      // 向下滚动
      currentPage++;
    } else if (e.deltaY < 0 && currentPage > 0) {
      // 向上滚动
      currentPage--;
    } else {
      return;
    }
    
    updatePages();
    updateNav();
  });
  
  // 更新页面显示
  function updatePages() {
    pages.forEach((page, index) => {
      if (index === currentPage) {
        page.classList.add('active');
        page.style.transform = 'translateY(0)';
      } else if (index < currentPage) {
        page.classList.remove('active');
        page.style.transform = 'translateY(-100vh)';
      } else {
        page.classList.remove('active');
        page.style.transform = `translateY(100vh)`;
      }
    });
  }
  
  // 更新导航状态
  function updateNav() {
    navLinks.forEach((link, index) => {
      if (index === currentPage) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
  
  // 初始化
  initPages();
});