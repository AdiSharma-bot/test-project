const htmlReferences = {
  carouselBtns: document.querySelectorAll("[data-carousel-btn]"),
  carouselTrack: document.querySelector(".carousel-track"),
  allImgs: document.querySelectorAll("img"),
  portfolioSection: document.querySelector(".portfolio"),
};
document.addEventListener("DOMContentLoaded", () => {
  htmlReferences.allImgs.forEach((img) => {
    img.loading = "lazy";
  });
});
let index = 0;
function moveSlide() {
  const track = htmlReferences.carouselTrack;
  const slides = Array.from(track.children);
  const carouselBtns = Array.from(htmlReferences.carouselBtns);
  const totalSlides = slides.length;
  let visibleSlides = 3;
  const maxIndex = totalSlides - visibleSlides;
  const prevBtn = carouselBtns.find(
    (btn) => btn.dataset.carouselBtn === "prev"
  );
  const nextBtn = carouselBtns.find(
    (btn) => btn.dataset.carouselBtn === "next"
  );
  function updateSlidePosition() {
    const style = window.getComputedStyle(slides[0]);
    const gap = parseFloat(style.marginRight) || 88;
    const slideWidth = slides[0].getBoundingClientRect().width;
    const realWidth = slideWidth + gap;
    const offset = realWidth * index;
    let centeredIndex = index + 1;
    track.style.transform = `translateX(-${offset}px)`;
    slides.forEach((slide) => slide.classList.remove("scale"));
    slides[centeredIndex].classList.add("scale");
  }

  nextBtn.addEventListener("click", () => {
    if (index < totalSlides - 1) {
      index++;
    } else {
      index = 0; // loop
    }
    updateSlidePosition();
  });

  prevBtn.addEventListener("click", () => {
    if (index > 0) {
      index--;
    } else {
      index = maxIndex; // loop to end
    }
    updateSlidePosition();
  });
  window.addEventListener("resize", updateSlidePosition);
}
function updatePortfolio() {
  const swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    initialSlide: 1,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 25,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: ".swiper-pagination",
    },
  });
}
updatePortfolio();
moveSlide();
AOS.init({
  duration: 800, 
  delay: 200,
  once: true,
  easing: "ease-out-cubic",
});
