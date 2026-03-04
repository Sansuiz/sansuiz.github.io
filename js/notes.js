let currentTag = null;

document.addEventListener('DOMContentLoaded', () => {
  const notebooks = document.querySelectorAll('.notebook');
  const notesPanel = document.querySelector('.notes-panel');
  const closeBtn = document.querySelector('.close-btn');
  const notesHeader = document.querySelector('.notes-header');
  const pageCount = document.querySelector('#page-count-display');
  const lastReadDate = document.querySelector('#last-read-display');
  const notesList = document.querySelector('#notes-list-container');

  function applyNotebookCovers() {
    notebooks.forEach(notebook => {
      const tag = notebook.dataset.tag;
      const notebookConfig = notebooksData.find(nb => nb.tag === tag);
      const body = notebook.querySelector('.notebook-body');
      
      if (notebookConfig && notebookConfig.cover) {
        body.style.backgroundImage = `url(${notebookConfig.cover})`;
      }
    });
  }

  function initNotebookCounts() {
    notebooks.forEach(notebook => {
      const tag = notebook.dataset.tag;
      const count = notesData.filter(note => note.tag === tag).length;
      const countEl = notebook.querySelector('.notebook-count');
      countEl.textContent = count;
    });
  }

  function updateCardEffects() {
    const cards = document.querySelectorAll('.note-card');
    const scrollTop = notesList.scrollTop;
    const listHeight = notesList.clientHeight;

    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const listRect = notesList.getBoundingClientRect();
      const cardTop = rect.top - listRect.top;
      
      if (cardTop < 60) {
        const progress = Math.max(0, Math.min(1, cardTop / 60));
        const scale = 0.95 + (progress * 0.05);
        const opacity = 0.7 + (progress * 0.3);
        const translateY = (1 - progress) * -5;
        
        card.style.transform = `translateY(${translateY}px) scale(${scale})`;
        card.style.opacity = opacity;
        card.style.zIndex = Math.floor(1000 - cardTop);
      } else {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.opacity = '1';
        card.style.zIndex = '1';
      }
    });
  }

  function renderNotes(tag) {
    const filteredNotes = notesData.filter(note => note.tag === tag);
    notesList.innerHTML = '';
    
    filteredNotes.forEach(note => {
      const card = document.createElement('div');
      card.className = 'note-card';
      card.innerHTML = `
        <div class="note-header">
          <div class="note-date">${note.date}</div>
          <div class="note-dot"></div>
        </div>
        <hr class="note-divider">
        <div class="note-title">${note.title}</div>
        <div class="note-content">${note.content}</div>
      `;
      notesList.appendChild(card);
    });

    pageCount.textContent = `${filteredNotes.length} Page`;
    if (filteredNotes.length > 0) {
      lastReadDate.textContent = filteredNotes[0].date;
    } else {
      lastReadDate.textContent = '-';
    }

    notesHeader.className = 'notes-header';
    notesHeader.classList.add(`tag-${tag}`);
    
    notesList.scrollTop = 0;
    
    setTimeout(() => {
      updateCardEffects();
    }, 50);
  }

  try {
    applyNotebookCovers();
    initNotebookCounts();
    console.log('笔记本配置加载成功:', notebooksData);
    console.log('笔记数据加载成功:', notesData);
  } catch (error) {
    console.error('初始化失败:', error);
  }

  notebooks.forEach(notebook => {
    notebook.addEventListener('click', () => {
      currentTag = notebook.dataset.tag;
      renderNotes(currentTag);
      notesPanel.classList.add('active');
    });
  });

  closeBtn.addEventListener('click', () => {
    notesPanel.classList.remove('active');
  });

  notesPanel.addEventListener('click', (e) => {
    if (e.target === notesPanel) {
      notesPanel.classList.remove('active');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && notesPanel.classList.contains('active')) {
      notesPanel.classList.remove('active');
    }
  });

  let ticking = false;
  notesList.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateCardEffects();
        ticking = false;
      });
      ticking = true;
    }
  });
});
