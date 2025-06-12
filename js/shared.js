// 公共JavaScript库加载
import 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
import './mouse.js';

// 初始化公共组件
window.addEventListener('DOMContentLoaded', () => {
  // 鼠标指针初始化
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);
});

window.addEventListener('wheel', (e) => {
  if (e.deltaY > 0) {
    document.getElementById('page1').style.display = 'none';
    document.getElementById('page2').style.display = 'block';
  } else {
    document.getElementById('page1').style.display = 'block';
    document.getElementById('page2').style.display = 'none';
  }
});