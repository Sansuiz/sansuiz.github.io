// 监听鼠标滚轮事件
window.addEventListener('wheel', function(e) {
  if (e.deltaY > 0) {
    // 向下滚动 - 显示画廊
    document.querySelector('.container').style.opacity = '0';
    document.querySelector('.gallery-container').style.display = 'block';
  } else {
    // 向上滚动 - 显示文本
    document.querySelector('.container').style.opacity = '1';
    document.querySelector('.gallery-container').style.display = 'none';
  }
});