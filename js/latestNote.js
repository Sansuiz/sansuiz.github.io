// 获取并解析最新笔记
async function fetchLatestNote() {
  const container = document.getElementById('latestNoteContainer');
  
  if (!container) {
    console.error('未找到笔记容器');
    return;
  }
  
  container.innerHTML = '<div class="loading-message">加载中...</div>';
  
  try {
    // 由于跨域限制，我们使用代理服务来获取XML内容
    // 这里使用了cors-anywhere的公共代理，实际部署时建议使用自己的代理
    const proxyUrl = 'https://api.allorigins.win/raw?url=';
    const targetUrl = 'https://blog.sansuiz.cn/notes.xml';
    const response = await fetch(proxyUrl + encodeURIComponent(targetUrl));
    
    if (!response.ok) {
      throw new Error(`HTTP错误! 状态码: ${response.status}`);
    }
    
    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
    
    // 获取最新的笔记条目
    const latestItem = xmlDoc.querySelector('item');
    
    if (!latestItem) {
      throw new Error('未找到笔记条目');
    }
    
    // 提取标题和内容
    const title = latestItem.querySelector('title')?.textContent || '无标题';
    const content = latestItem.querySelector('description')?.textContent || '无内容';
    const link = latestItem.querySelector('link')?.textContent || 'https://blog.sansuiz.cn/notes/';
    
    // 创建笔记卡片
    const noteCard = document.createElement('div');
    noteCard.className = 'blur-card';
    
    noteCard.innerHTML = `
      <a href="${link}" target="_blank" rel="noopener noreferrer">
        <div class="note-title">${title}</div>
        <div class="note-description">${content}</div>
      </a>
    `;
    
    // 清除加载状态并添加笔记卡片
    container.innerHTML = '';
    container.appendChild(noteCard);
    
  } catch (error) {
    console.error('获取最新笔记失败:', error);
    container.innerHTML = `<div class="error-message">加载失败: ${error.message}</div>`;
  }
}

// 导出函数以便在其他地方调用
export { fetchLatestNote };