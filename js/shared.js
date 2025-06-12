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
  // 分页完全切换功能
  // 滚动分页导航
  const sections = document.querySelectorAll('.page-section');
  const navDots = document.querySelectorAll('.nav-dot');
  
  // 滚动时更新导航点状态
  window.addEventListener('scroll', () => {
    const currentPos = window.scrollY + window.innerHeight/2;
    
    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (currentPos >= sectionTop && currentPos <= sectionBottom) {
        navDots.forEach(dot => dot.classList.remove('active'));
        navDots[index].classList.add('active');
      }
    });
  });
  
  // 点击导航点跳转
  navDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const targetSection = document.getElementById(dot.dataset.section);
      
      window.scrollTo({
        top: targetSection.offsetTop,
        behavior: 'smooth'
      });
    });
  });
  let currentIndex = 0;
  let isAnimating = false;
  
  // 初始化显示第一页
  showSection(0);
  
  // 鼠标滚轮事件
  window.addEventListener('wheel', (e) => {
    if (isAnimating) return;
    
    if (e.deltaY > 0) {
      // 向下滚动，切换到下一页
      if (currentIndex < sections.length - 1) {
        showSection(currentIndex + 1);
      }
    } else {
      // 向上滚动，切换到上一页
      if (currentIndex > 0) {
        showSection(currentIndex - 1);
      }
    }
  });
  
  // 点击导航点跳转
  navDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      if (!isAnimating && index !== currentIndex) {
        showSection(index);
      }
    });
  });
  
  function showSection(index) {
    isAnimating = true;
    
    // 隐藏当前页
    sections[currentIndex].classList.remove('active');
    navDots[currentIndex].classList.remove('active');
    
    // 显示目标页
    sections[index].classList.add('active');
    navDots[index].classList.add('active');
    
    currentIndex = index;
    
    setTimeout(() => {
      isAnimating = false;
    }, 500);
  }
});