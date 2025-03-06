---
layout: default
title: 关于
head: |
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.css">
---

<div class="about-container">
  <!-- 固定板块 -->
  <section class="profile-section">
    <img src="/assets/avatar.jpg" class="profile-avatar" alt="头像">
    <h1 class="profile-name">您的姓名</h1>
    <p class="profile-title">创意开发者 & 数字艺术家</p>
  </section>

  <!-- 作品模块 -->
  <section class="works-section">
    <h2>作品集</h2>
    <div class="works-grid" id="worksContainer">
      {% for work in site.data.works %}
      <div class="work-card">
        <img src="{{ work.image }}" alt="{{ work.title }}">
        <div class="work-title">{{ work.title }}</div>
      </div>
      {% endfor %}
    </div>
  </section>

  <!-- 社交链接 -->
  <section class="social-section">
    <h2>找到我</h2>
    <div class="social-links" id="socialContainer">
      {% for social in site.data.socials %}
      <a href="{{ social.link }}" class="social-card" target="_blank">
        <img src="{{ social.icon }}" alt="{{ social.platform }}">
        <span>{{ social.platform }}</span>
      </a>
      {% endfor %}
    </div>
  </section>
</div>

<style>
.profile-section {
  text-align: center;
  margin-bottom: 3rem;
}

.profile-avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.draggable-section {
  margin: 2rem 0;
  padding: 1.5rem;
  background: rgba(255,255,255,0.9);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.works-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  touch-action: none;
}

.work-card {
  position: relative;
  cursor: grab;
  transition: transform 0.2s;
}

.work-card:active {
  cursor: grabbing;
}

.social-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.social-card {
  display: flex;
  align-items: center;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.08);
  transition: transform 0.2s;
}

/* 拖拽效果 */
.sortable-ghost {
  opacity: 0.5;
  background: #f8f8f8;
}

.work-card,
.social-card {
  cursor: move;
  transition: transform 0.2s, box-shadow 0.2s;
}

.work-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
</style>

<script src="https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js"></script>
<script>
document.addEventListener('DOMContentLoaded', () => {
  // 作品拖拽功能
  new Sortable(document.getElementById('worksContainer'), {
    animation: 150,
    ghostClass: 'dragging-ghost',
    handle: '.work-card'
  });

  // 社交卡片拖拽功能
  new Sortable(document.getElementById('socialContainer'), {
    animation: 150,
    ghostClass: 'dragging-ghost',
    handle: '.social-card'
  });
});
</script>