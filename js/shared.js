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
  
  // 整页滚动切换
  let currentPage = 0;
  let isScrolling = false;
  
  window.addEventListener('wheel', (e) => {
    if (isScrolling) return;
    
    isScrolling = true;
    
    // 判断滚动方向
    if (e.deltaY > 0 && currentPage < sections.length - 1) {
      currentPage++;
    } else if (e.deltaY < 0 && currentPage > 0) {
      currentPage--;
    }
    
    // 隐藏所有页面
    sections.forEach(section => section.classList.remove('active'));
    
    // 显示当前页面
    sections[currentPage].classList.add('active');
    
    // 更新导航点状态
    navDots.forEach(dot => dot.classList.remove('active'));
    navDots[currentPage].classList.add('active');
    
    // 滚动到当前页面
    window.scrollTo({
      top: sections[currentPage].offsetTop,
      behavior: 'smooth'
    });
    
    setTimeout(() => {
      isScrolling = false;
    }, 1000);
  });
  
  // 点击导航点跳转
  navDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentPage = index;
      
      sections.forEach(section => section.classList.remove('active'));
      sections[currentPage].classList.add('active');
      
      window.scrollTo({
        top: sections[currentPage].offsetTop,
        behavior: 'smooth'
      });
    });
  });
});