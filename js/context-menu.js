// 创建菜单容器
const menu = document.createElement('div');
menu.className = 'context-menu';

// 菜单项配置
const items = [
  { name: '♾️ 刷新页面', action: () => location.reload() },
  { name: '🌿 返回首页', action: () => location.href = '/' },
  { name: '🍵 博客友人', action: () => location.href = '/friends/' },
  { name: '🪢 备注留言', action: () => window.open('https://f.wps.cn/g/hQQzfcZC/', '_blank') },
  { name: '🗞️ 三歳文集', action: () => window.open('https://buyivi.xyz/wenji/', '_blank') },
  { name: '🎫 SANSUIZ', action: () => window.open('https://bento.me/sansuiz', '_blank') },
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
  // 添加视口坐标定位和边界检测
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const menuWidth = menu.offsetWidth;
  const menuHeight = menu.offsetHeight;
  
  let leftPos = e.clientX + 8;
  let topPos = e.clientY + 8;
  
  // 防止右侧溢出
  if (leftPos + menuWidth > viewportWidth) {
    leftPos = viewportWidth - menuWidth - 8;
  }
  
  // 防止底部溢出
  if (topPos + menuHeight > viewportHeight) {
    topPos = viewportHeight - menuHeight - 8;
  }
  
  menu.style.left = `${leftPos}px`;
  menu.style.top = `${topPos}px`;
  
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