let notesData = [];
let currentTag = null;

document.addEventListener('DOMContentLoaded', async () => {
  const notebooks = document.querySelectorAll('.notebook');
  const notesPanel = document.querySelector('.notes-panel');
  const closeBtn = document.querySelector('.close-btn');
  const notesHeader = document.querySelector('.notes-header');
  const pageCount = document.querySelector('.page-count');
  const lastReadDate = document.querySelector('.last-read-date');
  const notesList = document.querySelector('.notes-list');

  async function loadYAMLData() {
    try {
      const response = await fetch('_data/notes.yml');
      const yamlText = await response.text();
      notesData = parseYAML(yamlText);
      initNotebookCounts();
    } catch (error) {
      console.error('加载YAML数据失败:', error);
    }
  }

  function parseYAML(yamlText) {
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

  await loadYAMLData();

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
