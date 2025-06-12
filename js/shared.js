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
  const sections = document.querySelectorAll('.page-section');
  const navDots = document.querySelectorAll('.nav-dot');
  let currentIndex = 0;
  let isScrolling = false;
  
  // 初始化显示第一页
  showSection(0);
  
  // 鼠标滚轮事件
  window.addEventListener('wheel', (e) => {
    if (isScrolling) return;
    
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
  }, { passive: false });
  
  // 点击导航点跳转
  navDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      if (!isScrolling && index !== currentIndex) {
        showSection(index);
      }
    });
  });
  
  function showSection(index) {
    isScrolling = true;
    
    // 更新导航点状态
    navDots[currentIndex].classList.remove('active');
    navDots[index].classList.add('active');
    
    // 平滑滚动到目标页
    window.scrollTo({
      top: sections[index].offsetTop,
      behavior: 'smooth'
    });
    
    currentIndex = index;
    
    setTimeout(() => {
      isScrolling = false;
    }, 1000);
  }
  
  // 监听滚动结束
  window.addEventListener('scroll', () => {
    if (!isScrolling) {
      const scrollPosition = window.scrollY + window.innerHeight/2;
      
      sections.forEach((section, index) => {
        if (scrollPosition >= section.offsetTop && 
            scrollPosition < section.offsetTop + section.offsetHeight) {
          if (index !== currentIndex) {
            navDots[currentIndex].classList.remove('active');
            navDots[index].classList.add('active');
            currentIndex = index;
          }
        }
      });
    }
  });
});