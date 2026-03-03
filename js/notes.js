const notebooksData = [
  {
    category: "literature",
    title: "Literature",
    cover_color: "#e74c3c",
    notes: [
      {
        title: "20260124 - 糟糕的我",
        date: "2026.1.24",
        content: `送完宝儿，就找了两家KFC，结果都没有可以给笔记本充电的地方，真是可惜。
最终还是回到了招商局这边，选择了星巴克。
坐下来再让自己的思绪缓一缓。`
      },
      {
        title: "20260123 - 生命诚可贵",
        date: "2026.1.23",
        content: `今天又是新的一天，要好好生活，好好爱自己。
生命中的每一个时刻都值得珍惜。`
      }
    ]
  },
  {
    category: "work",
    title: "Work",
    cover_color: "#3498db",
    notes: [
      {
        title: "20260201 - 项目进度",
        date: "2026.2.1",
        content: `今天完成了项目的第一阶段开发。
接下来需要进行测试和优化。`
      },
      {
        title: "20260128 - 会议记录",
        date: "2026.1.28",
        content: `上午的团队会议讨论了新的需求。
需要尽快整理出技术方案。`
      }
    ]
  },
  {
    category: "personal",
    title: "Personal",
    cover_color: "#27ae60",
    notes: [
      {
        title: "20260215 - 生日愿望",
        date: "2026.2.15",
        content: `又长大一岁了。
希望今年能实现自己的小目标。`
      }
    ]
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const notebooksGrid = document.getElementById('notebooksGrid');
  const notesPanel = document.getElementById('notesPanel');
  const closeBtn = document.getElementById('closeBtn');
  const notesHeader = document.getElementById('notesHeader');
  const pageCount = document.getElementById('pageCount');
  const lastReadDate = document.getElementById('lastReadDate');
  const notesList = document.getElementById('notesList');

  function createNotebook(notebook) {
    const container = document.createElement('div');
    container.className = 'notebook-container';

    const notebookEl = document.createElement('div');
    notebookEl.className = 'notebook';
    notebookEl.style.background = `linear-gradient(135deg, ${notebook.cover_color} 0%, ${adjustColor(notebook.cover_color, -30)} 50%, ${notebook.cover_color} 100%)`;

    notebookEl.innerHTML = `
      <div class="notebook-top">
        <div class="notebook-title">/ ${notebook.title}</div>
        <div class="notebook-count">${notebook.notes.length}</div>
      </div>
      <div class="notebook-body" style="background: ${notebook.cover_color}">
        <div class="notebook-vertical-title">${notebook.title}</div>
      </div>
    `;

    notebookEl.addEventListener('click', () => openNotebook(notebook));
    container.appendChild(notebookEl);
    return container;
  }

  function adjustColor(color, amount) {
    const hex = color.replace('#', '');
    const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
    const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
    const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }

  function openNotebook(notebook) {
    const headerGradient = `linear-gradient(135deg, ${notebook.cover_color} 0%, ${adjustColor(notebook.cover_color, -30)} 50%, ${notebook.cover_color} 100%)`;
    notesHeader.style.background = headerGradient;

    pageCount.textContent = `${notebook.notes.length} Page`;
    if (notebook.notes.length > 0) {
      lastReadDate.textContent = notebook.notes[0].date;
    } else {
      lastReadDate.textContent = '-';
    }

    renderNotes(notebook.notes, notebook.cover_color);
    notesPanel.classList.add('active');
  }

  function renderNotes(notes, coverColor) {
    notesList.innerHTML = '';
    notes.forEach(note => {
      const card = document.createElement('div');
      card.className = 'note-card';
      card.innerHTML = `
        <div class="note-header">
          <div class="note-date">${note.date}</div>
          <div class="note-dot" style="background: ${coverColor}; box-shadow: 0 0 15px ${coverColor}80;"></div>
        </div>
        <hr class="note-divider">
        <div class="note-title">${note.title}</div>
        <div class="note-content">${note.content}</div>
      `;
      notesList.appendChild(card);
    });
  }

  notebooksData.forEach(notebook => {
    notebooksGrid.appendChild(createNotebook(notebook));
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
});
