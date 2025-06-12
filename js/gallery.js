document.addEventListener('DOMContentLoaded', function() {
  const toggleButton = document.createElement('button');
  toggleButton.className = 'gallery-toggle';
  toggleButton.textContent = '查看相册';
  document.querySelector('header').appendChild(toggleButton);

  toggleButton.addEventListener('click', function() {
    document.querySelector('.content-view').classList.add('hidden');
    document.querySelector('.gallery-view').classList.add('visible');
  });

  document.querySelector('.back-button').addEventListener('click', function() {
    document.querySelector('.content-view').classList.remove('hidden');
    document.querySelector('.gallery-view').classList.remove('visible');
  });
});