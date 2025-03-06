document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.note-card');
  let currentIndex = 0;
  let isScrolling = false;

  // 滚轮事件监听
  document.querySelector('.tag-scroll-container').addEventListener('wheel', (e) => {
    if (isScrolling) return;
    
    const delta = Math.sign(e.deltaY);
    const prevIndex = currentIndex;
    
    currentIndex = Math.max(0, Math.min(cards.length - 1, currentIndex + delta));
    
    if (currentIndex !== prevIndex) {
      isScrolling = true;
      
      // 移除旧卡片激活状态
      cards[prevIndex].classList.remove('active');
      
      // 应用新卡片状态
      cards[currentIndex].classList.add('active');
      cards[currentIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // 重置滚动锁定
      setTimeout(() => {
        isScrolling = false;
      }, 800);
    }
  });

  // 初始化首张卡片状态
  cards[0].classList.add('active');
});