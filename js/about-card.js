document.addEventListener('DOMContentLoaded', function() {
  const card = document.querySelector('.card');
  
  if (card) {
    card.addEventListener('click', function() {
      card.classList.toggle('flipped');
    });
  }
});
