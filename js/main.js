import '../scss/main.scss'

// mobile menu

//// variables

let overlayContainer = document.getElementById("overlay"),
  navList = document.querySelector(".nav__list"),
  listCloseBtn = document.getElementById("close-icon"),
  listHamburgerIcon = document.getElementById("hamburger-icon");

//// handel opening the menu

const handleListActive = () =>{
  overlayContainer.classList.add("overlay")
  navList.classList.add("active")
  listCloseBtn.classList.remove("hidden")
  listHamburgerIcon.classList.add("hidden")
};

//// handel closeing the menu

const handleListClose = () =>{
  overlayContainer.classList.remove("overlay")
  navList.classList.remove("active")
  listCloseBtn.classList.add("hidden")
  listHamburgerIcon.classList.remove("hidden")
};


listHamburgerIcon.addEventListener("click" , handleListActive);
listCloseBtn.addEventListener("click" , handleListClose);

// testimonials slider

//// variables

let sliderCard = document.querySelectorAll(".testimonials__slider-card"),
  sliderCardCount = sliderCard.length,
  testimonialsSlider = document.querySelector(".testimonials__slider"),
  sliderPagination = document.querySelector(".testimonials__pagination"),
  paginationElement = [],
  cardIndex = 1,
  currentIndex = 1,
  intervalId;

//// create the pagination element and add it to the dom

for (let i = 0; i < sliderCardCount; i++) {
  i == 1 ? paginationElement.push('<li class="testimonials__pagination-btn testimonials__pagination-btn__sel" data-index="' + i + '"></li>'): paginationElement.push('<li class="testimonials__pagination-btn" data-index="' + i + '"></li>');
}
sliderPagination.innerHTML = paginationElement.join("");

//// slide card

const slideCard = () =>{
  cardIndex = cardIndex === sliderCardCount ? 0 : cardIndex < 0 ? sliderCardCount - 1 : cardIndex;
  for (let i = 0; i < sliderCardCount; i++) {
    sliderCard[i].style.setProperty('transform', `translate(calc(-${cardIndex *100}% - ${cardIndex *30}px))`);
  }
  sliderPagination.childNodes[currentIndex].classList.remove('testimonials__pagination-btn__sel');
  sliderPagination.childNodes[cardIndex].classList.add('testimonials__pagination-btn__sel');
  currentIndex = cardIndex;
};

//// auto slide

const autoSlide = () =>{
  intervalId = setInterval(() => slideCard(++cardIndex) , 6000);
};

autoSlide();

//// activate slider pagination

const paginationClickHandler = (e) =>{
  let target = e.target;
  if (target.classList.contains("testimonials__pagination-btn")) {
    cardIndex = Number(target.getAttribute("data-index"));
    slideCard();
  }
}

sliderPagination.addEventListener("click", paginationClickHandler);

//// stop the auto slide when the mouse on the slider

testimonialsSlider.addEventListener("mouseover" , () => clearInterval(intervalId));
testimonialsSlider.addEventListener("mouseleave", autoSlide);

