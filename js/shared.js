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


// 配置您的RSS订阅源链接
const RSS_FEED_URL = 'https://blog.sansuiz.cn/notes.xml';

// 获取并显示最新RSS内容
async function fetchLatestRSS() {
  try {
    // 使用RSS解析服务（示例使用rss2json.com）
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_FEED_URL)}`);
    const data = await response.json();
    
    if(data.items && data.items.length > 0) {
      const latestItem = data.items[0];
      document.querySelector('.rss-title').textContent = latestItem.title;
      document.querySelector('.rss-content').textContent = latestItem.description;
      document.querySelector('.rss-date').textContent = new Date(latestItem.pubDate).toLocaleDateString();
    }
  } catch (error) {
    console.error('获取RSS内容失败:', error);
    document.querySelector('.rss-content').textContent = '无法加载最新内容';
  }
}

// 页面加载时获取数据
window.addEventListener('DOMContentLoaded', fetchLatestRSS);

// 在RSS内容加载后添加Markdown渲染
function loadRSSContent(data) {
  const rssContainer = document.querySelector('.page-section#about .rss-card');
  if (data.items && data.items.length > 0) {
    const latestItem = data.items[0];
    rssContainer.innerHTML = `
      <div class="rss-content">
        ${marked.parse(latestItem.description)}
      </div>
    `;
  }
}