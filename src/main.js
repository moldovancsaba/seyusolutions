import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    animateHero()
    animateProcess()
    animateSections()
})

function animateHero() {
    const tl = gsap.timeline()
    
    tl.from('.hero h1', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power4.out'
    })
    .from('.hero p', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.6')
    .from('.hero .glass-card', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    }, '-=0.4')
    .from('.hero .tag', {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.7)'
    }, '-=0.4')
}

function animateProcess() {
    // Animate user icons floating
    gsap.to('.user-icon', {
        y: -10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        stagger: 0.2,
        ease: 'sine.inOut'
    })

    // Animate flow arrows
    gsap.from('.arrow-vertical', {
        height: 0,
        duration: 1.5,
        scrollTrigger: {
            trigger: '#process',
            start: 'top 70%',
        }
    })

    // Float the core boxes
    gsap.to('.core-box, .business-box', {
        y: -5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    })
}

function animateSections() {
    // Stagger logo appearance
    gsap.from('.logo-placeholder', {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
            trigger: '.logo-grid',
            start: 'top 85%'
        }
    })

    // Fade in sections
    gsap.utils.toArray('section').forEach(section => {
        if (section.classList.contains('hero')) return
        
        gsap.from(section.querySelectorAll('.glass-card'), {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            scrollTrigger: {
                trigger: section,
                start: 'top 80%'
            }
        })
    })
}

// Hover effects for logo placeholders (micro-interactions)
document.querySelectorAll('.logo-placeholder').forEach(logo => {
    logo.addEventListener('mouseenter', () => {
        gsap.to(logo, { scale: 1.1, backgroundColor: 'rgba(57, 255, 20, 0.1)', duration: 0.3 })
    })
    logo.addEventListener('mouseleave', () => {
        gsap.to(logo, { scale: 1, backgroundColor: 'rgba(255, 255, 255, 0.03)', duration: 0.3 })
    })
})
