let currentTag = null;

document.addEventListener('DOMContentLoaded', () => {
  const notebooks = document.querySelectorAll('.notebook');
  const answersPanel = document.querySelector('.notes-panel');
  const closeBtn = document.querySelector('.close-btn');
  const answersHeader = document.querySelector('.notes-header');
  const pageCount = document.querySelector('#page-count-display');
  const lastReadDate = document.querySelector('#last-read-display');
  const answersList = document.querySelector('#notes-list-container');

  function applyNotebookCovers() {
    notebooks.forEach(notebook => {
      const tag = notebook.dataset.tag;
      const notebookConfig = answerNotebooksData.find(nb => nb.tag === tag);
      const body = notebook.querySelector('.notebook-body');
      
      if (notebookConfig && notebookConfig.cover) {
        body.style.backgroundImage = `url(${notebookConfig.cover})`;
      }
    });
  }

  function initNotebookCounts() {
    notebooks.forEach(notebook => {
      const tag = notebook.dataset.tag;
      const count = answersData.filter(answer => answer.tag === tag).length;
      const countEl = notebook.querySelector('.notebook-count');
      countEl.textContent = count;
    });
  }

  function renderAnswers(tag) {
    const filteredAnswers = answersData.filter(answer => answer.tag === tag);
    answersList.innerHTML = '';
    
    filteredAnswers.forEach(answer => {
      const card = document.createElement('div');
      card.className = 'note-card';
      
      let dotHtml = '';
      if (answer.logo) {
        dotHtml = `<div class="note-dot" style="background-image: url('${answer.logo}'); background-color: transparent;"></div>`;
      } else {
        dotHtml = `<div class="note-dot"></div>`;
      }
      
      card.innerHTML = `
        <div class="note-header">
          <div class="note-date">${answer.date}</div>
          ${dotHtml}
        </div>
        <hr class="note-divider">
        <div class="note-title">${answer.title}</div>
        <div class="note-content">${answer.content}</div>
      `;
      answersList.appendChild(card);
    });

    pageCount.textContent = `${filteredAnswers.length} Page`;
    if (filteredAnswers.length > 0) {
      lastReadDate.textContent = filteredAnswers[0].date;
    } else {
      lastReadDate.textContent = '-';
    }

    answersHeader.className = 'notes-header';
    answersHeader.classList.add(`tag-${tag}`);
  }

  try {
    applyNotebookCovers();
    initNotebookCounts();
    console.log('笔记本配置加载成功:', answerNotebooksData);
    console.log('回答数据加载成功:', answersData);
  } catch (error) {
    console.error('初始化失败:', error);
  }

  notebooks.forEach(notebook => {
    notebook.addEventListener('click', () => {
      currentTag = notebook.dataset.tag;
      renderAnswers(currentTag);
      answersPanel.classList.add('active');
    });
  });

  closeBtn.addEventListener('click', () => {
    answersPanel.classList.remove('active');
  });

  answersPanel.addEventListener('click', (e) => {
    if (e.target === answersPanel) {
      answersPanel.classList.remove('active');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && answersPanel.classList.contains('active')) {
      answersPanel.classList.remove('active');
    }
  });
});
