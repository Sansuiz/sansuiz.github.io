// 从XML订阅源获取最新笔记
export async function fetchLatestNote() {
  try {
    const response = await fetch('https://blog.sansuiz.cn/notes.xml');
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
    
    // 获取链接
    const link = firstItem.querySelector('link')?.textContent || '#';
    
    // 创建笔记内容HTML，链接固定指向便签主页
    const noteHTML = `
      <a href="https://blog.sansuiz.cn/notes/" target="_blank" rel="noopener noreferrer">
        <div class="note-title">${title}</div>
        <div class="note-description">${description}</div>
      </a>
    `;
    
    // 更新DOM
    const noteContainer = document.getElementById('latestNoteContainer');
    if (noteContainer) {
      noteContainer.innerHTML = `<div class="blur-card">${noteHTML}</div>`;
    }
    
  } catch (error) {
    console.error('获取最新笔记失败:', error);
    const noteContainer = document.getElementById('latestNoteContainer');
    if (noteContainer) {
      noteContainer.innerHTML = '<div class="error-message">加载最新笔记失败</div>';
    }
  }
}