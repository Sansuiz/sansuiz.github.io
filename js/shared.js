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

// 在文件底部添加
window.addEventListener('load', function() {
  new fullpage('#fullpage', {
    scrollingSpeed: 1000,
    navigation: true,
    navigationPosition: 'right',
    credits: { enabled: false }
  });
});