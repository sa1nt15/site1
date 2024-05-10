const btnScrollTo = document.querySelector(".btn__scroll-to");
const section1 = document.querySelector("#section-1");
const navLinksEL = document.querySelector(".nav__links");
const header = document.querySelector(".header")
const headerParams = header.getBoundingClientRect();
const nav = document.querySelector(".nav");

const btnsOpenModalWindow = document.querySelectorAll(".btn__show_modal");
const modalWindow = document.querySelector(".modal-window");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn__close");

const servicesImgs = document.querySelectorAll(".services__img");

const sections = document.querySelectorAll(".section");

const tabContainer = document.querySelector(".operations__tab-container")

// console.log(btnScrollTo, section1);
btnScrollTo.addEventListener("click", function (){
    section1.scrollIntoView({behavior: "smooth"});
    
    
});

navLinksEL.addEventListener("click", function (event) {
    // console.log(event.target.href);
    event.preventDefault();
    const href = event.target.href;
    if (href !== undefined){
        document.querySelector("#" + href.split("#")[1]).scrollIntoView({
            behavior: "smooth", 
        })
    }
});


// window.addEventListener("scroll", function () {
//     // console.log(headerParams);
//     if (window.scrollY > headerParams.height) {
//         nav.classList.add("fixed")
//     }
//     else {
//         nav.classList.remove("fixed")
//     }
// });

nav.addEventListener("mouseover", function (event) {
    // linksHoverAnimation(0.5);
    if (event.target.classList.contains("nav__link-item")) {
        const link = event.target;
        const sibling = link
        .closest(".nav__links")
        .querySelectorAll(".nav__link-item");
        // const logo = link.closest(".nav").querySelector("img");
        // const logoText = link.closest(".nav").querySelector(".nav__text");

        sibling.forEach(function (currentLink) {
            if (link !== currentLink && currentLink.tagName !== "BUTTON") currentLink.style.opacity = 0.5;
        });
        // logo.style.opacity = 0.5;
        // logoText.style.opacity = 0.5;

    }
});
nav.addEventListener("mouseout", function (event) {
    if (event.target.classList.contains("nav__link-item")) {
        const link = event.target;
        const sibling = link
        .closest(".nav__links")
        .querySelectorAll(".nav__link-item");
        // const logo = link.closest(".nav").querySelector("img");
        // const logoText = link.closest(".nav").querySelector(".nav__text");

        sibling.forEach(function (currentLink) {
            if (link !== currentLink && currentLink.tagName !== "BUTTON") currentLink.style.opacity = 1;
        });
        // logo.style.opacity = 1;
        // logoText.style.opacity = 1;
        

    }
});

for (const btn of btnsOpenModalWindow) {
    btn.addEventListener("click", function (){
        modalWindow.classList.remove("hidden");
        overlay.classList.remove("hidden");
        document.body.style.overflow = "hidden";
    });
}

function closeModalWindow() {
    modalWindow.classList.add("hidden");
    overlay.classList.add("hidden");
    document.body.style.overflow = "auto";

}

btnCloseModal.addEventListener("click", closeModalWindow);
overlay.addEventListener("cick", closeModalWindow);

const imgObServer = new IntersectionObserver(imageLoading, {});

function imageLoading(entries) {
    for (const entry of entries) {
        if (entry.isIntersecting === true) {
            entry.target.src = entry.target.dataset.src;
            entry.target.addEventListener("load", function () {
                entry.target.classList.remove("lazy-img");
            });
            imgObServer.unobserve(entry.target);
            
        }
    }
}

for (const img of servicesImgs) {
    imgObServer.observe(img);
}

const sectionObserver = new IntersectionObserver(sectionShow, {threshold: 0.2});
 function sectionShow(entries) {
    for (const entry of entries) {
        if (entry.isIntersecting === true) {
            entry.target.classList.remove("section-hidden");
            sectionObserver.unobserve(entry.target);
        }
    }
 }

 for (const section of sections) {
    section.classList.add("section-hidden");
    sectionObserver.observe(section);
 }

 tabContainer.addEventListener("click", function(event) {
    if (event.target.classList.contains("btn")) {
        const tabContents = document.querySelectorAll(".operations__content");
        for (const content of tabContents) {
            content.classList.remove("operations__content_active")
        }
        const tabButtons = document.querySelectorAll(".operations__tab");
        for (const button of tabButtons) {
            button.classList.remove("operations__tab_active");
        }
        if (event.target.classList.contains("operations__tab-1")) {
            event.target.classList.add("operations__tab_active");
            document.querySelector(".operations__content-1").classList.add("operations__content_active");
        }
        if (event.target.classList.contains("operations__tab-2")) {
            event.target.classList.add("operations__tab_active");
            document.querySelector(".operations__content-2").classList.add("operations__content_active");
        }
        if (event.target.classList.contains("operations__tab-3")) {
            event.target.classList.add("operations__tab_active");
            document.querySelector(".operations__content-3").classList.add("operations__content_active");
        }
    }
    
 });

 let currentSlide = 0;
 const slider = document.querySelector(".slider");
 const slides = document.querySelectorAll(".slide");
 const sliderBtnLeft = document.querySelector(".slider__btn_left");
 const sliderBtnRight = document.querySelector(".slider__btn_right");
 const dotsContainer = document.querySelector(".dots"); 

function moveSlide(slideNum) {
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.transform = "translateX(" + 100 * (i - currentSlide) + "%"; 
    }

    const dots = document.querySelectorAll(".dots__dot");
    for (const dot of dots) {
        dot.classList.remove("dots__dot_active");
    }
    dots[currentSlide].classList.add("dots__dot_active");

}


sliderBtnRight.addEventListener("click", function() {
    currentSlide++;
    if (currentSlide === slides.length) currentSlide = 0;
    moveSlide(currentSlide);
});

sliderBtnLeft.addEventListener("click", function() {
    currentSlide--;
    if (currentSlide < 0) currentSlide = slides.length -1;
    moveSlide(currentSlide);
});

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft"){
        currentSlide--;
        if (currentSlide < 0) currentSlide = slides.length -1;
        moveSlide(currentSlide);
    }
    else if (event.key === "ArrowRight"){
        currentSlide++;
        if (currentSlide === slides.length) currentSlide = 0;
        moveSlide(currentSlide);
    }
});

for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement ("div");
    dot.classList.add("dots__dot");
    if (i === 0) dot.classList.add("dots__dot_active");
    dot.setAttribute("data-slide", i);
    dotsContainer.appendChild(dot);
};

dotsContainer.addEventListener("click", function(event) {
    const el = event.target;
    if (el.classList.contains("dots__dot")) {
        const slide = el.dataset.slide;
        currentSlide = slide;
        moveSlide(slide);
    }

    // const dots = document.querySelectorAll("dots__dot");
    // for (const dot of dots) {
    //     dot.classList.remove("dots__dot_active");
    // }
    // dots[currentSlide].classList.add("dots__dot_active");

});

moveSlide(currentSlide);