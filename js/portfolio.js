// 作品集页面交互功能

// 作品集数据
const portfolioData = {
  categories: [
    {
      id: "cards",
      title: "卡片作品",
      description: "各种卡片设计作品",
      cover: "/images/tu/cards/20241215-w.jpg",
      images: [
        "/images/tu/cards/20141019-lx.jpg",
        "/images/tu/cards/20141103-yxq.jpg",
        "/images/tu/cards/20150308-lx.jpg",
        "/images/tu/cards/20150627-wky.jpg",
        "/images/tu/cards/20150628-wky.jpg",
        "/images/tu/cards/20150629-wky.jpg",
        "/images/tu/cards/20150927-wwl.jpg",
        "/images/tu/cards/20160601-lml.jpg",
        "/images/tu/cards/20160601-wy.jpg",
        "/images/tu/cards/20160602-wj.jpg",
        "/images/tu/cards/20160603-wj.jpg",
        "/images/tu/cards/20160610-hkh-back.jpg",
        "/images/tu/cards/20160610-ly-back.jpg",
        "/images/tu/cards/20160610-mk.jpg",
        "/images/tu/cards/20160610-yh.jpg",
        "/images/tu/cards/20240229-w.jpg",
        "/images/tu/cards/20240415-y.jpg",
        "/images/tu/cards/202408-w.jpg",
        "/images/tu/cards/20241027-w.jpg",
        "/images/tu/cards/20241123-w.jpg",
        "/images/tu/cards/20241215-w.jpg",
        "/images/tu/cards/20250112-w.jpg",
        "/images/tu/cards/20250119-w.jpg",
        "/images/tu/cards/20250518-w.jpg",
        "/images/tu/cards/20250531-q.jpg"
      ]
    },
    {
      id: "letters",
      title: "信件作品",
      description: "信件设计作品",
      cover: "/images/tu/letters/letter.jpg",
      images: [
        "/images/tu/letters/20141019-lx.jpg",
        "/images/tu/letters/20150308-lx.jpg",
        "/images/tu/letters/20160602-why-back.jpg",
        "/images/tu/letters/letter.jpg"
      ]
    },
    {
      id: "music",
      title: "音乐作品",
      description: "音乐相关设计作品",
      cover: "/images/tu/music/anxin.png",
      images: [
        "/images/tu/music/anxin.png",
        "/images/tu/music/haishanghua.png",
        "/images/tu/music/sinian.png",
        "/images/tu/music/yaxiya.png"
      ]
    },
    {
      id: "other",
      title: "其他作品",
      description: "其他类型的设计作品",
      cover: "/images/tu/chuyi.png",
      images: [
        "/images/tu/chuyi.png",
        "/images/tu/he.png",
        "/images/tu/huanxi.png",
        "/images/tu/jie.png",
        "/images/tu/meihao.png",
        "/images/tu/qianshou.gif",
        "/images/tu/qieyi.gif",
        "/images/tu/shiwu.png",
        "/images/tu/shiwu2.png",
        "/images/tu/wang.png",
        "/images/tu/xi.png",
        "/images/tu/yu.gif",
        "/images/tu/zhao.png"
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
  const modalTitle = document.querySelector('.modal-title');
  const pageContainer = document.querySelector('.book-page-container');
  
  // 设置模态框标题
  modalTitle.textContent = category.title;
  
  // 渲染书页
  renderPages(pageContainer, category.images);
  
  // 显示模态框
  modal.style.display = 'block';
  
  // 初始化翻页控制
  initPageControls(category.images.length);
}

// 渲染书页
function renderPages(container, images) {
  container.innerHTML = '';
  
  images.forEach((image, index) => {
    const page = document.createElement('div');
    page.className = `page page-front ${index === 0 ? 'active' : ''}`;
    page.setAttribute('data-page', index);
    
    page.innerHTML = `
      <img src="${image}" alt="Page ${index + 1}">
    `;
    
    container.appendChild(page);
  });
}

// 初始化翻页控制
function initPageControls(totalPages) {
  let currentPage = 0;
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const pages = document.querySelectorAll('.page');
  
  // 更新按钮状态
  updateButtonState();
  
  // 上一页按钮点击事件
  prevBtn.addEventListener('click', () => {
    if (currentPage > 0) {
      flipPage(currentPage, currentPage - 1);
      currentPage--;
      updateButtonState();
    }
  });
  
  // 下一页按钮点击事件
  nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages - 1) {
      flipPage(currentPage, currentPage + 1);
      currentPage++;
      updateButtonState();
    }
  });
  
  // 更新按钮状态
  function updateButtonState() {
    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage === totalPages - 1;
    
    prevBtn.style.opacity = currentPage === 0 ? '0.5' : '1';
    nextBtn.style.opacity = currentPage === totalPages - 1 ? '0.5' : '1';
  }
  
  // 翻页动画
  function flipPage(fromPage, toPage) {
    const from = pages[fromPage];
    const to = pages[toPage];
    
    from.classList.add('flipped');
    to.classList.remove('flipped');
    to.classList.add('active');
    
    // 移除其他页面的活动状态
    pages.forEach((page, index) => {
      if (index !== toPage) {
        page.classList.remove('active');
      }
    });
  }
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
