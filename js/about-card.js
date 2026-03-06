document.addEventListener('DOMContentLoaded', function() {
  const card = document.querySelector('.card');
  
  if (card) {
    card.addEventListener('click', function(e) {
      if (e.target.closest('.site-link-icon')) {
        return;
      }
      if (!e.target.closest('.timeline-container')) {
        card.classList.toggle('flipped');
      }
    });
  }
});
