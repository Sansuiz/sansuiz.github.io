// 作品集页面交互功能

// 作品集数据
const portfolioData = {
  categories: [
    {
      id: "cards",
      title: "卡片作品",
      description: "各种卡片设计作品",
      cover: "/images/tu/cards/20241215-w.jpg",
      items: [
        {
          type: "image",
          date: "2024.12.15",
          content: "/images/tu/cards/20241215-w.jpg",
          status: ["active", "", "", "", "", "active"]
        },
        {
          type: "image",
          date: "2024.11.23",
          content: "/images/tu/cards/20241123-w.jpg",
          status: ["active"]
        },
        {
          type: "text",
          date: "2024.10.27",
          content: "这是一张卡片设计作品，展示了创意设计的魅力。",
          status: ["active", "", "", "", "", "active"]
        }
      ]
    },
    {
      id: "letters",
      title: "信件作品",
      description: "信件设计作品",
      cover: "/images/tu/letters/letter.jpg",
      items: [
        {
          type: "image",
          date: "2016.06.02",
          content: "/images/tu/letters/20160602-why-back.jpg",
          status: ["active"]
        },
        {
          type: "text",
          date: "2015.03.08",
          content: "这是一封精心设计的信件，表达了真挚的情感。",
          status: ["active", "", "", "", "", "active"]
        }
      ]
    },
    {
      id: "music",
      title: "音乐作品",
      description: "音乐相关设计作品",
      cover: "/images/tu/music/anxin.png",
      items: [
        {
          type: "image",
          date: "2024.01.01",
          content: "/images/tu/music/anxin.png",
          status: ["active"]
        },
        {
          type: "image",
          date: "2024.01.01",
          content: "/images/tu/music/haishanghua.png",
          status: ["active", "", "", "", "", "active"]
        },
        {
          type: "text",
          date: "2024.01.01",
          content: "音乐与设计的完美结合，创造出独特的视觉体验。",
          status: ["active"]
        }
      ]
    },
    {
      id: "other",
      title: "其他作品",
      description: "其他类型的设计作品",
      cover: "/images/tu/chuyi.png",
      items: [
        {
          type: "image",
          date: "2024.01.01",
          content: "/images/tu/chuyi.png",
          status: ["active", "", "", "", "", "active"]
        },
        {
          type: "text",
          date: "2024.01.01",
          content: "这是其他类型的设计作品，展示了多样化的创作风格。",
          status: ["active"]
        }
      ]
    }
  ]
};

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
  // 渲染书籍网格
  renderBooks(portfolioData.categories);
});

// 渲染书籍网格
function renderBooks(categories) {
  const booksGrid = document.querySelector('.books-grid');
  booksGrid.innerHTML = '';
  
  categories.forEach(category => {
    const bookItem = document.createElement('div');
    bookItem.className = 'book-item';
    bookItem.setAttribute('data-category', category.id);
    
    bookItem.innerHTML = `
      <div class="book-cover">
        <img src="${category.cover}" alt="${category.title}">
        <div class="book-count">${category.items.length}</div>
      </div>
      <div class="book-info">
        <h3 class="book-title">${category.title}</h3>
        <p class="book-description">${category.description}</p>
      </div>
    `;
    
    bookItem.addEventListener('click', () => openBookModal(category));
    booksGrid.appendChild(bookItem);
  });
}

// 打开书籍模态框
function openBookModal(category) {
  const modal = document.getElementById('bookModal');
  const pageCount = document.querySelector('.page-count');
  const modalBody = document.querySelector('.modal-body');
  
  // 设置页面数量
  pageCount.textContent = category.items.length;
  
  // 渲染内容
  renderContent(modalBody, category.items);
  
  // 显示模态框
  modal.style.display = 'block';
}

// 渲染内容
function renderContent(container, items) {
  container.innerHTML = '';
  
  items.forEach(item => {
    const contentItem = document.createElement('div');
    contentItem.className = 'content-item';
    
    // 生成状态点
    const statusDots = item.status.map(dot => 
      `<div class="status-dot ${dot}"></div>`
    ).join('');
    
    if (item.type === 'text') {
      contentItem.innerHTML = `
        <div class="content-date">
          <span>${item.date}</span>
          <div class="status-dots">${statusDots}</div>
        </div>
        <div class="content-text">${item.content}</div>
      `;
    } else if (item.type === 'image') {
      contentItem.innerHTML = `
        <div class="content-date">
          <span>${item.date}</span>
          <div class="status-dots">${statusDots}</div>
        </div>
        <img src="${item.content}" alt="Content image" class="content-image">
      `;
    }
    
    container.appendChild(contentItem);
  });
}

// 关闭模态框
function closeModal() {
  const modal = document.getElementById('bookModal');
  modal.style.display = 'none';
}

// 点击模态框外部关闭
window.onclick = function(event) {
  const modal = document.getElementById('bookModal');
  if (event.target == modal) {
    closeModal();
  }
}
