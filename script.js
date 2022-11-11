const track = document.querySelector('.carousel_track');
const slides = Array.from(track.children);
const nextbtn = document.querySelector('.carousel_btn--right');
const prevbtn = document.querySelector('.carousel_btn--left');
const dotsNav = document.querySelector('.carousel_nav');
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;
// console.log(slideWidth);

// arrange slides next to each other
const setSlidePostion = (slide, index) => {
    slide.style.left = slideWidth  * index + 'px';
}
slides.forEach(setSlidePostion);

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide')
}

const hideShowArrows = (track, slides, targetIndex) => {
    if (targetIndex == 0) {
        const currentSlide = slides[0];
        const targetSlide = slides[targetIndex];
        moveToSlide(track, currentSlide, targetSlide, currentSlide, targetSlide)
    } else if (targetIndex === slides.length -1) {
        const currentSlide = slides[targetIndex];
        const targetSlide = slides[0];
        moveToSlide(track, currentSlide, targetSlide)
    }

    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}


// when i click left move slide to the left
prevbtn.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide);

    // moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
    hideShowArrows(track, slides, prevIndex, currentSlide, prevSlide);
})

// when i click right move slide to the right
nextbtn.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide);

    // moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
    hideShowArrows(track, slides, nextIndex, currentSlide, nextSlide);
})


// when i click the nav indicators, move to that slide'

dotsNav.addEventListener('click', e => {
    // what indicator was clicked on
    const targetDot = e.target.closest('button');

    if (!targetDot) return;

    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];
    
    // moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    hideShowArrows(track, slides, targetIndex, currentSlide, targetSlide);
    
})
