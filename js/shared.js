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
  
  function addMusicTile(imagePath, songName, artist, musicId) {
    const grid = document.querySelector('.music-grid');
    const tile = document.createElement('div');
    tile.className = 'music-tile';
    tile.style.backgroundImage = `url('${coverUrl}')`;
    tile.setAttribute('data-music-id', musicId);
    tile.innerHTML = `
      <div class="song-info">
        <div class="lyrics-scroll">${lyrics}</div>
        <div class="artist">${artist}</div>
      </div>
      <div class="play-btn" data-music-id="${musicId}">
        <svg viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z"/>
        </svg>
      </div>
    `;
    grid.appendChild(tile);
  }
  
  // 添加一个周杰伦的音乐方块
  addMusicTile(
    'images/liangyao.png',  // 封面图片路径
    '七里香',              // 歌曲名称
    '周杰伦',              // 歌手名称
    '386538'               // 网易云音乐ID
  );
  
  // 添加一个林俊杰的音乐方块
  addMusicTile(
    'images/sansuiz.png',  
    '她说',                
    '林俊杰',              
    '386976'               
  );
});

// 添加在文件末尾
const tiles = document.querySelectorAll('.music-tile');

tiles.forEach(tile => {
  tile.addEventListener('mousemove', (e) => {
    const rect = tile.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const angleX = (y - centerY) / 20;
    const angleY = (centerX - x) / 20;
    
    tile.style.setProperty('--mouse-x', `${angleY}deg`);
    tile.style.setProperty('--mouse-y', `${angleX}deg`);
  });
  
  tile.addEventListener('mouseleave', () => {
    tile.style.removeProperty('--mouse-x');
    tile.style.removeProperty('--mouse-y');
  });
});

// 在事件监听后添加调试输出
tiles.forEach((tile, index) => {
  console.log(`方块${index}事件绑定状态:`, 
    tile.hasEventListener('mousemove'), 
    tile.hasEventListener('mouseleave')
  );
});

// 播放器容器
const playerContainer = document.createElement('div');
playerContainer.id = 'music-player';
document.body.appendChild(playerContainer);

// 为所有播放按钮添加点击事件
document.querySelectorAll('.play-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const musicId = this.getAttribute('data-music-id');
    playerContainer.innerHTML = `
      <iframe 
        frameborder="no" 
        border="0" 
        marginwidth="0" 
        marginheight="0" 
        width="330" 
        height="86" 
        src="https://music.163.com/outchain/player?type=2&id=${musicId}&auto=1&height=66">
      </iframe>
    `;
  });
});