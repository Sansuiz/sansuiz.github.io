let notesData = [
  {
    title: "20260124 - 糟糕的我",
    date: "2026.1.24",
    tag: "生活",
    content: "送完宝儿，就找了两家KFC，结果都没有可以给笔记本充电的地方，真是可惜。\n最终还是回到了招商局这边，选择了星巴克。\n坐下来再让自己的思绪缓一缓。"
  },
  {
    title: "20260123 - 生命诚可贵",
    date: "2026.1.23",
    tag: "生活",
    content: "今天又是新的一天，要好好生活，好好爱自己。\n生命中的每一个时刻都值得珍惜。"
  },
  {
    title: "20260122 - 项目总结",
    date: "2026.1.22",
    tag: "工作",
    content: "今天完成了年度项目总结报告。\n回顾过去一年的工作，收获颇丰，也有很多需要改进的地方。"
  },
  {
    title: "20260121 - 代码重构",
    date: "2026.1.21",
    tag: "工作",
    content: "重构了核心模块的代码，提高了代码的可读性和可维护性。\n团队协作非常顺利。"
  },
  {
    title: "20260120 - 阅读心得",
    date: "2026.1.20",
    tag: "心流",
    content: "今天阅读了《心流》这本书，收获很大。\n心流状态是一种完全沉浸在当前活动中的体验，时间仿佛静止了。"
  },
  {
    title: "20260119 - 冥想练习",
    date: "2026.1.19",
    tag: "心流",
    content: "完成了30分钟的冥想练习。\n感受到了内心的平静与专注。"
  }
];

let notebooksData = [
  { tag: "生活", cover: "" },
  { tag: "工作", cover: "" },
  { tag: "心流", cover: "" }
];

let currentTag = null;

document.addEventListener('DOMContentLoaded', async () => {
  const notebooks = document.querySelectorAll('.notebook');
  const notesPanel = document.querySelector('.notes-panel');
  const closeBtn = document.querySelector('.close-btn');
  const notesHeader = document.querySelector('.notes-header');
  const pageCount = document.querySelector('.page-count');
  const lastReadDate = document.querySelector('.last-read-date');
  const notesList = document.querySelector('.notes-list');

  async function loadYAMLFile(filePath) {
    try {
      const response = await fetch(filePath);
      return await response.text();
    } catch (error) {
      console.log(`加载文件 ${filePath} 失败，使用默认数据:`, error);
      return null;
    }
  }

  function parseNotebooksYAML(yamlText) {
    const notebooks = [];
    const lines = yamlText.split('\n');
    let currentNotebook = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trimEnd();
      
      if (line.startsWith('- tag:')) {
        if (currentNotebook) {
          notebooks.push(currentNotebook);
        }
        currentNotebook = {
          tag: line.replace('- tag:', '').trim().replace(/^["']|["']$/g, '')
        };
      } else if (currentNotebook && line.startsWith('  cover:')) {
        currentNotebook.cover = line.replace('cover:', '').trim().replace(/^["']|["']$/g, '');
      }
    }

    if (currentNotebook) {
      notebooks.push(currentNotebook);
    }

    return notebooks;
  }

  function parseNotesYAML(yamlText) {
    const notes = [];
    const lines = yamlText.split('\n');
    let currentNote = null;
    let inContent = false;
    let contentLines = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmedLine = line.trim();

      if (line.startsWith('- title:')) {
        if (currentNote) {
          if (contentLines.length > 0) {
            currentNote.content = contentLines.join('\n').trim();
            contentLines = [];
          }
          notes.push(currentNote);
        }
        currentNote = {
          title: line.replace('- title:', '').trim().replace(/^["']|["']$/g, '')
        };
        inContent = false;
      } else if (currentNote && line.startsWith('  date:')) {
        currentNote.date = line.replace('  date:', '').trim().replace(/^["']|["']$/g, '');
      } else if (currentNote && line.startsWith('  tag:')) {
        currentNote.tag = line.replace('  tag:', '').trim().replace(/^["']|["']$/g, '');
      } else if (currentNote && line.startsWith('  content:')) {
        inContent = true;
      } else if (inContent && (line.startsWith('    ') || line.startsWith('  '))) {
        contentLines.push(line.trim());
      } else if (inContent && trimmedLine === '') {
        contentLines.push('');
      }
    }

    if (currentNote) {
      if (contentLines.length > 0) {
        currentNote.content = contentLines.join('\n').trim();
      }
      notes.push(currentNote);
    }

    return notes;
  }

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
  }

  applyNotebookCovers();
  initNotebookCounts();

  try {
    const notebooksYamlText = await loadYAMLFile('_data/notebooks.yml');
    if (notebooksYamlText) {
      const parsedNotebooks = parseNotebooksYAML(notebooksYamlText);
      if (parsedNotebooks.length > 0) {
        notebooksData = parsedNotebooks;
        applyNotebookCovers();
      }
    }
  } catch (e) {
    console.log('使用默认笔记本配置');
  }

  try {
    const notesYamlText = await loadYAMLFile('_data/notes.yml');
    if (notesYamlText) {
      const parsedNotes = parseNotesYAML(notesYamlText);
      if (parsedNotes.length > 0) {
        notesData = parsedNotes;
        initNotebookCounts();
      }
    }
  } catch (e) {
    console.log('使用默认笔记数据');
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
});
