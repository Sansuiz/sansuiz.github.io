document.addEventListener('DOMContentLoaded', function() {
  const card = document.querySelector('.card');
  const scrollContainer = document.querySelector('.personal-mbti-scroll');
  
  if (card) {
    card.addEventListener('click', function() {
      card.classList.toggle('flipped');
    });
  }
  
  if (scrollContainer) {
    let currentIndex = 0;
    const items = scrollContainer.querySelectorAll('.personal-mbti');
    const totalItems = items.length - 1;
    
    setInterval(function() {
      currentIndex++;
      if (currentIndex > totalItems) {
        scrollContainer.style.transition = 'none';
        scrollContainer.style.transform = 'translateY(0)';
        currentIndex = 0;
        setTimeout(() => {
          scrollContainer.style.transition = 'transform 0.5s ease';
        }, 50);
      } else {
        scrollContainer.style.transform = `translateY(-${currentIndex * 3}rem)`;
      }
    }, 2500);
  }
});
