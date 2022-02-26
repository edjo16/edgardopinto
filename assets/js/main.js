/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(){
    const header = document.getElementById('header')
    if(this.scrollY >=50) header.classList.add('scroll-header')
}
window.addEventListener('scroll', scrollHeader)


/*=============== SERVICES MODAL ===============*/
const modalViews = document.querySelectorAll('.services__modal'),
modalBtns = document.querySelectorAll('.services__button'),
modalClose = document.querySelectorAll('.services__modal-close');

let modal = function(modalClick){
    modalViews[modalClick].classList.add('active-modal')
}

modalBtns.forEach((mb, i)=>{
mb.addEventListener('click',()=>{
    modal(i)
})
})

modalClose.forEach((mc)=>{
    mc.addEventListener('click', ()=>{
        modalViews.forEach((mv)=>{
            mv.classList.remove('active-modal')
        })
    })
})
/*=============== MIXITUP FILTER PORTFOLIO ===============*/
let mixer = mixitup('.work__container', {
    selectors: {
        target: '.work__card'
    },
    animation: {
        duration: 300
    }
});

/* Link active work */ 

const linkWork = document.querySelectorAll('.work__item')

function activeWork(){
    linkWork.forEach(l => l.classList.remove('active-work'))
    this.classList.add('active-work')
}

linkWork.forEach(l=> l.addEventListener('click', activeWork))

/*=============== SWIPER EDUCATION ===============*/
var swiper = new Swiper(".education__container", {
    spaceBetween: 24,
    grabCursor:true,
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    
  });
/*=============== SWIPER EDUCATION ===============*/
const acLink = document.querySelectorAll('.nav__link')

function activeLink(){
    acLink.forEach(l => l.classList.remove('active-link'))
    this.classList.add('active-link')
}

acLink.forEach(l=> l.addEventListener('click', activeLink))

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/


/*=============== LIGHT DARK THEME ===============*/ 
const themeButton = document.getElementById('theme-button')
const lightTheme = 'light-theme'
const iconTheme= 'bx-sun'

const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

const getCurrentTheme = () => document.body.classList.contains(lightTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun'

if(selectedTheme){
    document.body.classList[selectedTheme === 'dark' ? 'add': 'remove'](lightTheme)
    themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add': 'remove'](iconTheme)
    
}

themeButton.addEventListener('click', ()=>{
    document.body.classList.toggle(lightTheme)
    themeButton.classList.toggle(iconTheme)
   localStorage.setItem('selected-theme', getCurrentTheme)
    LocalStorage.setItem('selected-icon', getCurrentIcon)
})


/* FORM  */
const $form = document.getElementById('form')

$form.addEventListener('submit', handleSubmit)


async function handleSubmit(event){
    event.preventDefault()
    const form = new FormData(this)
    const response= await fetch(this.action,{
    method: this.method,
    body:form,
    headers:{
        'Accept': 'application/json'
    }
})

if(response.ok){
    this.reset()
    alert('Gracias por tu interés, pronto te estaré respondiendo.')
}
}
/*=============== SCROLL REVEAL ANIMATION ===============*/