const notesData = [
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
];

document.addEventListener('DOMContentLoaded', () => {
  const notebook = document.querySelector('.notebook');
  const notesPanel = document.querySelector('.notes-panel');
  const closeBtn = document.querySelector('.close-btn');
  const notebookCount = document.querySelector('.notebook-count');
  const pageCount = document.querySelector('.page-count');
  const lastReadDate = document.querySelector('.last-read-date');
  const notesList = document.querySelector('.notes-list');

  notebookCount.textContent = notesData.length;
  pageCount.textContent = `${notesData.length} Page`;
  if (notesData.length > 0) {
    lastReadDate.textContent = notesData[0].date;
  }

  function renderNotes() {
    notesList.innerHTML = '';
    notesData.forEach(note => {
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
  }

  renderNotes();

  notebook.addEventListener('click', () => {
    notesPanel.classList.add('active');
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
