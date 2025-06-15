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
  

  function addMusicTile(imageUrl, songName, artist, linkUrl) {
    const tile = document.createElement('div');
    tile.className = 'music-tile';
    tile.style.backgroundImage = `url(${imageUrl})`;
    
    // 添加点击跳转
    tile.addEventListener('click', () => {
      window.open(linkUrl, '_blank');
    });
  
    const songInfo = document.createElement('div');
    songInfo.className = 'song-info';
    
    document.querySelector('.music-grid').appendChild(tile);
  }
  
  // 添加一个周杰伦的音乐方块
  addMusicTile(
    'images/liangyao.png',  // 封面图片路径
    '七里香',              // 歌曲名称
    '周杰伦',              // 歌手名称
    'https://music.163.com/song?id=386538' // 网易云音乐链接
  );
  
  // 添加一个林俊杰的音乐方块
  addMusicTile(
    'images/tu/music/haishanghua.png',  
    '是这般柔情的你',                
    '海上花-蔡琴',              
    'https://music.163.com/#/song?id=209873'               
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

window.addEventListener('touchmove', () => {}, { passive: true });