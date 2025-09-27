/**
 * 获取并显示最新笔记的功能
 */
export function fetchLatestNote() {
  // 检查是否支持fetch API
  if (!window.fetch) {
    console.error('浏览器不支持fetch API');
    return;
  }

  // 获取笔记容器
  const noteContainer = document.getElementById('latestNoteContainer');
  if (!noteContainer) {
    console.error('找不到笔记容器元素');
    return;
  }

  // 显示加载状态
  noteContainer.innerHTML = '<div class="blur-card loading-message">加载中...</div>';

  // 发送请求获取笔记XML
  fetch('https://blog.sansuiz.cn/notes.xml')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(xmlText => {
      try {
        // 解析XML内容
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        
        // 获取所有笔记条目
        const items = xmlDoc.querySelectorAll('item');
        if (items.length > 0) {
          // 获取最新的一条笔记
          const latestItem = items[0];
          const title = latestItem.querySelector('title')?.textContent || '无标题笔记';
          const description = latestItem.querySelector('description')?.textContent || '';
          
          // 清理描述文本中的HTML标签
          const cleanDescription = description.replace(/<[^>]*>/g, '').trim();
          
          // 创建模糊卡片
          noteContainer.innerHTML = '';
          
          const noteCard = document.createElement('div');
          noteCard.className = 'blur-card';
          
          const noteLink = document.createElement('a');
          noteLink.href = 'https://blog.sansuiz.cn/notes/'; // 固定链接地址
          noteLink.target = '_blank';
          noteLink.rel = 'noopener noreferrer';
          
          // 添加标题
          const noteTitle = document.createElement('div');
          noteTitle.className = 'note-title';
          noteTitle.textContent = title;
          
          // 添加描述
          if (cleanDescription) {
            const noteDesc = document.createElement('div');
            noteDesc.className = 'note-description';
            noteDesc.textContent = cleanDescription;
            noteLink.appendChild(noteDesc);
          }
          
          noteLink.appendChild(noteTitle);
          noteCard.appendChild(noteLink);
          noteContainer.appendChild(noteCard);
        } else {
          noteContainer.innerHTML = '<div class="blur-card error-message">暂无笔记</div>';
        }
      } catch (error) {
        console.error('解析XML失败:', error);
        noteContainer.innerHTML = '<div class="blur-card error-message">笔记解析失败</div>';
      }
    })
    .catch(err => {
      console.error('获取最新笔记失败:', err);
      // 在出错时显示提示信息
      noteContainer.innerHTML = '<div class="blur-card error-message">无法加载最新笔记</div>';
    });
}