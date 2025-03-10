// 创建菜单容器
const menu = document.createElement('div');
menu.className = 'context-menu';

// 菜单项配置
const items = [
  { name: '🔄 刷新页面', action: () => location.reload() },
  { name: '🏠 返回首页', action: () => location.href = '/' },
  { name: '🔍 站内搜索', action: () => alert('搜索功能开发中') },
  { name: '📝 留言板', action: () => location.href = '/liuyan.html' }
];

// 构建菜单项
items.forEach(item => {
  const div = document.createElement('div');
  div.className = 'context-menu-item';
  div.textContent = item.name;
  div.addEventListener('click', item.action);
  menu.appendChild(div);
});

// 添加到页面
document.body.appendChild(menu);

// 右键事件监听
document.addEventListener('contextmenu', e => {
  e.preventDefault();
  
  // 定位菜单
  menu.style.display = 'block';
  menu.style.left = `${e.pageX}px`;
  menu.style.top = `${e.pageY}px`;
  
  // 点击外部关闭
  const closeMenu = () => {
    menu.style.display = 'none';
    document.removeEventListener('click', closeMenu);
  };
  document.addEventListener('click', closeMenu);
});

// 暗色模式适配
const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
function updateMenuStyle() {
  menu.style.backgroundColor = darkModeMediaQuery.matches 
    ? 'rgba(0,0,0,0.9)' 
    : 'rgba(255,255,255,0.95)';
}
darkModeMediaQuery.addListener(updateMenuStyle);
updateMenuStyle();