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
  
  // 添加触摸事件处理
  let startY = 0;
  let endY = 0;
  
  document.addEventListener('touchstart', (e) => {
    startY = e.touches[0].clientY;
  }, {passive: true});
  
  document.addEventListener('touchend', (e) => {
    endY = e.changedTouches[0].clientY;
    const diffY = startY - endY;
    
    // 滑动距离阈值，可根据需要调整
    const threshold = 50;
    
    if (Math.abs(diffY) > threshold) {
      if (diffY > 0) {
        // 向上滑动，切换到下一个页面
        navigateToNextSection();
      } else {
        // 向下滑动，切换到上一个页面
        navigateToPrevSection();
      }
    }
  }, {passive: true});
  
  function navigateToNextSection() {
    // 实现切换到下一个页面的逻辑
    // ... existing navigation code ...
  }
  
  function navigateToPrevSection() {
    // 实现切换到上一个页面的逻辑
    // ... existing navigation code ...
  }
});

// 音乐数据数组
const musicList = [
  {
    id: '歌曲ID1',
    cover: '/images/sansuiz-di.png',
    title: '歌曲名称1',
    artist: '歌手1'
  },
  {
    id: '歌曲ID2',
    cover: '/images/liangyao.png',
    title: '歌曲名称2',
    artist: '歌手2'
  }
  // 可以继续添加更多音乐
];

// 初始化音乐方块
function initMusicGrid() {
  const grid = document.querySelector('.music-grid');
  if (!grid) return;

  musicList.forEach(music => {
    grid.appendChild(createMusicSquare(music));
  });
}

// 创建音乐方块
function createMusicSquare(music) {
  const square = document.createElement('div');
  square.className = 'music-square';
  square.dataset.songId = music.id;
  
  square.innerHTML = `
    <div class="music-cover" style="background-image: url('${music.cover}')">
      <button class="play-btn">▶</button>
    </div>
    <div class="music-info">
      <h3>${music.title}</h3>
      <p>${music.artist}</p>
    </div>
  `;
  
  return square;
}

// 播放音乐
function playMusic(songId) {
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.src = `https://music.163.com/outchain/player?type=2&id=${songId}&auto=1&height=66`;
  document.body.appendChild(iframe);
}

// 事件委托处理播放按钮点击
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('play-btn')) {
    e.stopPropagation();
    const songId = e.target.closest('.music-square').dataset.songId;
    playMusic(songId);
  } else if (e.target.classList.contains('music-square')) {
    const songId = e.target.dataset.songId;
    playMusic(songId);
  }
});

// 页面加载完成后初始化
if (document.readyState !== 'loading') {
  initMusicGrid();
} else {
  document.addEventListener('DOMContentLoaded', initMusicGrid);
}