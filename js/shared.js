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

// 在文件适当位置添加
let startY = 0;
let endY = 0;

document.addEventListener('touchstart', (e) => {
  startY = e.touches[0].clientY;
}, {passive: true});

document.addEventListener('touchend', (e) => {
  endY = e.changedTouches[0].clientY;
  const diffY = startY - endY;
  
  // 滑动距离阈值
  if (Math.abs(diffY) > 50) {
    if (diffY > 0) {
      // 向上滑动，切换到下一页
      navigateToNextSection();
    } else {
      // 向下滑动，切换到上一页
      navigateToPrevSection();
    }
  }
}, {passive: true});

function navigateToNextSection() {
  // 实现切换到下一页的逻辑
  // ...
}

function navigateToPrevSection() {
  // 实现切换到上一页的逻辑
  // ...
}