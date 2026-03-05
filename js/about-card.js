
document.addEventListener('DOMContentLoaded', function() {
  const card = document.querySelector('.card');
  
  if (card) {
    card.addEventListener('click', function() {
      this.classList.toggle('flipped');
    });
    
    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.classList.toggle('flipped');
      }
    });
    
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', '点击翻转名片');
  }
});
