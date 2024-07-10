document.addEventListener('DOMContentLoaded', () => {
    const carouselItems = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');
  
    const backgrounds = [
      'url("lungs.gif")',
      'url("cancer.gif")',
      'url("covid.gif")'
    ];
  
    let currentIndex = 0;
  
    function goToSlide(index) {
      carouselItems[currentIndex].classList.remove('active');
      indicators[currentIndex].classList.remove('active');
  
      currentIndex = index;
  
      carouselItems[currentIndex].classList.add('active');
      indicators[currentIndex].classList.add('active');
      document.body.style.backgroundImage = backgrounds[currentIndex];
    }
  
    function showPrevSlide() {
      const newIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
      goToSlide(newIndex);
    }
  
    function showNextSlide() {
      const newIndex = (currentIndex + 1) % carouselItems.length;
      goToSlide(newIndex);
    }
  
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        goToSlide(index);
      });
    });
  
    prevButton.addEventListener('click', showPrevSlide);
    nextButton.addEventListener('click', showNextSlide);
  
    goToSlide(0); // Initialize carousel
    const selectImageButtons = document.querySelectorAll('.select-image-button');
  
  selectImageButtons.forEach(button => {
    button.addEventListener('click', function() {
      const form = this.nextElementSibling;
      form.style.display = form.style.display === 'none' ? 'block' : 'none';
    });
  });
  });