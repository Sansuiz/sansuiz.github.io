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
  

  // 全局音频播放器
  const audioPlayer = new Audio();
  let currentPlayingTile = null;
  
  function addMusicTile(imageUrl, songName, artist, audioPath) {
    const tile = document.createElement('div');
    tile.className = 'music-tile';
    tile.style.backgroundImage = `url(${imageUrl})`;
    
    // 添加播放/暂停功能
    tile.addEventListener('click', () => {
      if (currentPlayingTile === tile) {
        // 点击正在播放的方块：暂停
        if (!audioPlayer.paused) {
          audioPlayer.pause();
          tile.classList.remove('playing');
        } else {
          audioPlayer.play();
          tile.classList.add('playing');
        }
      } else {
        // 点击新方块：停止当前播放，开始新播放
        if (currentPlayingTile) {
          currentPlayingTile.classList.remove('playing');
        }
        
        audioPlayer.src = audioPath;
        audioPlayer.play();
        tile.classList.add('playing');
        currentPlayingTile = tile;
      }
    });
  
    const songInfo = document.createElement('div');
    songInfo.className = 'song-info';
    
    const nameEl = document.createElement('div');
    nameEl.className = 'song-name';
    nameEl.textContent = songName;
    
    const artistEl = document.createElement('div');
    artistEl.className = 'artist';
    artistEl.textContent = artist;
    
    songInfo.appendChild(nameEl);
    songInfo.appendChild(artistEl);
    tile.appendChild(songInfo);
    
    document.querySelector('.music-grid').appendChild(tile);
  }
  
  // 添加一个罗大佑的音乐方块
  addMusicTile(
    'images/tu/music/sinian.png', 
    '《思念》', 
    '萧瑟的风雨中你走在我身旁', 
    'audio/sinian.mp3' // 音频文件路径
  );
  
  // 添加一个蔡琴的音乐方块
  addMusicTile(
    'images/tu/music/haishanghua.png',  
    '《海上花》',                
    '是这般柔情的你',              
    'audio/haishanghua.mp3'               
  );

  // 添加一个罗大佑的音乐方块
  addMusicTile(
    'images/tu/music/yaxiya.png',  
    '《亚细亚的孤儿》',                
    '多少人在追寻那解不开的问题',              
    'audio/yaxiya.mp3'               
  );

  // 添加一个周华健的音乐方块
  addMusicTile(
    'images/tu/music/anxin.png',  
    '《安心》',                
    '光阴倒退但这决定都照样不变',              
    'audio/anxin.mp3'               
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

function handleScroll(e) {
  const aboutSection = document.getElementById('about');
  if (aboutSection && isElementInViewport(aboutSection)) {
    const masonry = aboutSection.querySelector('.masonry');
    const isAtBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
    
    // 如果在about区域且未滚动到底部，阻止默认滚动
    if (!isAtBottom && masonry && (window.innerHeight + window.scrollY) < (masonry.offsetTop + masonry.offsetHeight)) {
      e.preventDefault();
      window.scrollBy(0, 100); // 自定义滚动步长
      return false;
    }
  }
}

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// 添加平滑滚动
document.addEventListener('wheel', handleScroll, { passive: false });
document.addEventListener('touchmove', function(e) {
  // 你的滑动处理逻辑
}, { passive: true });