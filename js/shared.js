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


function loadFragments() {
  const fragments = [
    { date: "2023-05-01", content: "公园野餐", emoji: "🌳" },
    { date: "2023-06-15", content: "新书入手", emoji: "📚" }
  ];
  
  const container = document.querySelector('.fragments-container');
  if(container) {
    fragments.forEach(item => {
      const card = document.createElement('div');
      card.className = 'fragment-card';
      card.innerHTML = `
        <div class="fragment-emoji">${item.emoji}</div>
        <div class="fragment-date">${item.date}</div>
        <div class="fragment-content">${item.content}</div>
      `;
      container.appendChild(card);
    });
  }
}

// 确保只在about页面加载碎片
if(window.location.pathname.includes('about')) {
  window.addEventListener('DOMContentLoaded', loadFragments);
}