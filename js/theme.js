document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.createElement('button');
  themeToggle.id = 'theme-toggle';
  themeToggle.innerHTML = '🌓';
  themeToggle.style = 'position:fixed;top:1rem;right:1rem;z-index:9999;font-size:1.5rem;background:none;border:none;cursor:pointer;opacity:0.8;transition:opacity 0.3s';
  
  document.body.prepend(themeToggle);

  const currentTheme = localStorage.getItem('theme') || 'system';
  if (currentTheme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');

  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
    themeToggle.innerHTML = isDark ? '🌞' : '🌙';
  });

  // 系统主题变化监听
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (localStorage.getItem('theme') === 'system') {
      document.documentElement.removeAttribute('data-theme');
    }
  });
});