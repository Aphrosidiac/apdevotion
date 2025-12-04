import './style.css'
import Lenis from 'lenis'
import { gsap } from 'gsap'

// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// Scroll Reveal Animation
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
}

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible')
      observer.unobserve(entry.target) // Only animate once
    }
  })
}, observerOptions)

document.querySelectorAll('[data-scroll]').forEach(el => {
  observer.observe(el)
})

// Parallax Effect for Hero
const heroBg = document.querySelector('.hero-bg img')
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY
  if (scrollY < window.innerHeight) {
    gsap.to(heroBg, {
      y: scrollY * 0.5,
      ease: 'none',
      duration: 0
    })
  }
})

// Header Scroll Effect
const header = document.querySelector('header')
let lastScroll = 0

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY
  
  if (currentScroll > 50) {
    header.style.background = 'rgba(5, 5, 5, 0.8)'
    header.style.backdropFilter = 'blur(10px)'
  } else {
    header.style.background = 'transparent'
    header.style.backdropFilter = 'none'
  }
  
  lastScroll = currentScroll
})

console.log('Automation Lab Initialized')
