// 公共JavaScript库加载
import 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
import './mouse.js';

// 初始化公共组件
window.addEventListener('DOMContentLoaded', () => {
  // 鼠标指针初始化
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);
  
  // 分页导航功能
  const sections = document.querySelectorAll('.page-section');
  const navDots = document.querySelectorAll('.nav-dot');
  let isScrolling = false;
  
  // 滚动时更新导航点状态
  // 更新后的滚动检测
  window.addEventListener('scroll', () => {
    if (isScrolling) return;
    
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    
    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + windowHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        navDots.forEach(dot => dot.classList.remove('active'));
        navDots[index].classList.add('active');
      }
    });
  });
  
  // 点击导航点跳转到对应页面
  navDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const targetSection = document.getElementById(dot.dataset.section);
      isScrolling = true;
      
      window.scrollTo({
        top: targetSection.offsetTop,
        behavior: 'smooth'
      });
      
      setTimeout(() => {
        isScrolling = false;
      }, 1000);
    });
  });
});