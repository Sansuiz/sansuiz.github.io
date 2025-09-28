// 从XML订阅源获取最新笔记
// 带超时的fetch函数
function fetchWithTimeout(resource, options = {}) {
  const { timeout = 8000 } = options;
  
  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
      reject(new Error(`请求超时: ${timeout}ms`));
    }, timeout);
    
    fetch(resource, {
      ...options,
      signal: controller.signal
    })
      .then(response => {
        clearTimeout(timeoutId);
        if (!response.ok) {
          throw new Error(`网络响应错误: ${response.status}`);
        }
        resolve(response);
      })
      .catch(error => {
        clearTimeout(timeoutId);
        reject(error);
      });
  });
}

export async function fetchLatestNote() {
  // 设置默认加载状态
  const noteContainer = document.getElementById('latestNoteContainer');
  if (noteContainer) {
    noteContainer.innerHTML = '<div class="blur-card"><div class="loading-message">加载最新笔记...</div></div>';
  }
  
  try {
    // 使用带超时的fetch
    const response = await fetchWithTimeout('https://blog.sansuiz.cn/notes.xml', { timeout: 8000 });
    const text = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, 'text/xml');
    
    // 获取第一个item（最新的笔记）
    const firstItem = xmlDoc.querySelector('item');
    if (!firstItem) {
      throw new Error('未找到笔记内容');
    }
    
    // 提取标题和描述
    const title = firstItem.querySelector('title')?.textContent || '无标题笔记';
    let description = firstItem.querySelector('description')?.textContent || '';
    
    // 清理描述中的HTML标签，只保留纯文本
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = description;
    description = tempDiv.textContent || tempDiv.innerText || '';
    
    // 限制描述长度，最多显示100个字符
    if (description.length > 100) {
      description = description.substring(0, 100) + '...';
    }
    
    // 创建笔记内容HTML，链接固定指向便签主页
    const noteHTML = `
      <a href="https://blog.sansuiz.cn/notes/" target="_blank" rel="noopener noreferrer">
        <div class="note-title">${title}</div>
        <div class="note-description">${description}</div>
      </a>
    `;
    
    // 更新DOM
    if (noteContainer) {
      noteContainer.innerHTML = `<div class="blur-card">${noteHTML}</div>`;
    }
    
  } catch (error) {
    console.error('获取最新笔记失败:', error);
    // 仅在控制台显示错误，不在页面上显示错误信息，避免影响用户体验
    if (noteContainer) {
      // 可以选择不显示任何内容，或者显示一个非常轻微的提示
      // 这里选择不显示任何错误信息，保持页面整洁
      noteContainer.innerHTML = '';
      // 如果想要显示加载失败的提示，可以使用下面的代码
      // noteContainer.innerHTML = '<div class="blur-card"><div class="error-message">最新笔记加载失败</div></div>';
    }
  }
}