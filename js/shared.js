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


// 随机初始化标签参数
function initTags() {
  const tags = document.querySelectorAll('.tag');
  tags.forEach(tag => {
    // 随机参数
    tag.style.setProperty('--duration', 8 + Math.random() * 4); // 8-12秒
    tag.style.setProperty('--delay', Math.random() * 12); // 0-12秒延迟
    tag.style.setProperty('--start-x', Math.random() * 100 + 'vw'); // 随机起始位置
    tag.style.setProperty('--x-offset', (Math.random() - 0.5) * 20 + 'vw'); // 随机水平偏移
  });
}

// 鼠标避让效果
document.addEventListener('mousemove', (e) => {
  const tags = document.querySelectorAll('.tag');
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  
  tags.forEach(tag => {
    const rect = tag.getBoundingClientRect();
    const tagX = rect.left + rect.width / 2;
    const tagY = rect.top + rect.height / 2;
    
    // 计算与鼠标的距离
    const distance = Math.sqrt(Math.pow(mouseX - tagX, 2) + Math.pow(mouseY - tagY, 2));
    
    if (distance < 150) { // 避让半径150px
      const angle = Math.atan2(tagY - mouseY, tagX - mouseX);
      const force = (150 - distance) / 3;
      
      tag.style.transform = `translateX(calc(var(--start-x) + var(--x-offset) + ${Math.cos(angle) * force}px)) 
                           translateY(calc(var(--current-y) + ${Math.sin(angle) * force}px)) 
                           rotate(var(--rotation))`;
    }
  });
});

// 初始化
window.addEventListener('load', initTags);