let notesData = [];
let notebooksData = [];
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
      console.error(`加载文件 ${filePath} 失败:`, error);
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
    let contentBuffer = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trimEnd();
      
      if (line.startsWith('- title:')) {
        if (currentNote) {
          if (contentBuffer.length > 0) {
            currentNote.content = contentBuffer.join('\n').trim();
            contentBuffer = [];
          }
          notes.push(currentNote);
        }
        currentNote = {
          title: line.replace('- title:', '').trim().replace(/^["']|["']$/g, '')
        };
        inContent = false;
      } else if (currentNote && line.startsWith('  date:')) {
        currentNote.date = line.replace('date:', '').trim().replace(/^["']|["']$/g, '');
      } else if (currentNote && line.startsWith('  tag:')) {
        currentNote.tag = line.replace('tag:', '').trim().replace(/^["']|["']$/g, '');
      } else if (currentNote && line.startsWith('  content:')) {
        inContent = true;
        const contentStart = line.replace('content:', '').trim();
        if (contentStart.startsWith('|')) {
        } else if (contentStart) {
          contentBuffer.push(contentStart.replace(/^["']|["']$/g, ''));
        }
      } else if (inContent && (line.startsWith('    ') || line.startsWith('  '))) {
        contentBuffer.push(line.trim());
      } else if (inContent && line === '') {
        contentBuffer.push('');
      }
    }

    if (currentNote) {
      if (contentBuffer.length > 0) {
        currentNote.content = contentBuffer.join('\n').trim();
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

  const notebooksYamlText = await loadYAMLFile('_data/notebooks.yml');
  if (notebooksYamlText) {
    notebooksData = parseNotebooksYAML(notebooksYamlText);
    applyNotebookCovers();
  }

  const notesYamlText = await loadYAMLFile('_data/notes.yml');
  if (notesYamlText) {
    notesData = parseNotesYAML(notesYamlText);
    initNotebookCounts();
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
