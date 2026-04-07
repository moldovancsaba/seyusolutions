import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import L from 'leaflet'

gsap.registerPlugin(ScrollTrigger)

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    animateHero()
    animateProcess()
    animateSections()
    initMap()
})

function animateHero() {
    const tl = gsap.timeline()
    
    // Set initial opacity to 0 just in case CSS hasn't loaded
    gsap.set('.hero h1, .hero p, .hero .glass-card, .hero .tag', { opacity: 0 })

    tl.to('.hero h1', {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power4.out',
        startAt: { y: 50 }
    })
    .to('.hero p', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        startAt: { y: 20 }
    }, '-=0.6')
    .to('.hero .glass-card', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        startAt: { y: 40 }
    }, '-=0.4')
    .to('.hero .tag', {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        startAt: { scale: 0.8 }
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
    gsap.from('.arrow-vertical, .flow-line', {
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

function initMap() {
    const map = L.map('map', {
        center: [20, 10],
        zoom: 2,
        zoomControl: true,
        attributionControl: true
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map)

    // Sample data points matching the "network"
    const points = [
        [51.5, -0.09], // London
        [40.71, -74.00], // NYC
        [25.20, 55.27], // Dubai
        [35.67, 139.65], // Tokyo
        [-23.55, -46.63] // Brazil
    ]

    const customIcon = L.divIcon({
        className: 'custom-div-icon',
        html: "<div style='background-color:var(--secondary); width: 10px; height: 10px; border-radius: 50%; box-shadow: 0 0 10px var(--secondary);'></div>",
        iconSize: [10, 10],
        iconAnchor: [5, 5]
    })

    points.forEach(p => {
        L.marker(p, { icon: customIcon }).addTo(map)
    })
}

// Hover effects for logo placeholders
document.querySelectorAll('.logo-placeholder').forEach(logo => {
    logo.addEventListener('mouseenter', () => {
        gsap.to(logo, { scale: 1.1, backgroundColor: 'rgba(57, 255, 20, 0.1)', duration: 0.3 })
    })
    logo.addEventListener('mouseleave', () => {
        gsap.to(logo, { scale: 1, backgroundColor: 'rgba(255, 255, 255, 0.03)', duration: 0.3 })
    })
})
