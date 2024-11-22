const slideImages = document.querySelectorAll(".slide-image");
const thumbnailWrapper = document.getElementById("thumbnail-wrapper");
let currentIndex = 0;

function changeSlide(direction) {
    slideImages[currentIndex].classList.remove("active");
    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = slideImages.length - 1;
    } else if (currentIndex >= slideImages.length) {
        currentIndex = 0;
    }

    slideImages[currentIndex].classList.add("active");

    // Cuộn thumbnail chỉ hiện 1 thumbnail
    const offset = currentIndex; // Chỉ hiện 1 thumbnail
    thumbnailWrapper.style.transform = `translateX(-${offset * 110}px)`; // 110px = 100px width + 10px gap
}

function selectSlide(selectedIndex) {
    slideImages[currentIndex].classList.remove("active");
    currentIndex = selectedIndex;
    slideImages[currentIndex].classList.add("active");

    // Cuộn thumbnail chỉ hiện 1 thumbnail
    const offset = currentIndex; // Chỉ hiện 1 thumbnail
    thumbnailWrapper.style.transform = `translateX(-${offset * 110}px)`; // 110px = 100px width + 10px gap
}