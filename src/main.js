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
    
    // Set initial states for elements hidden in CSS
    // This allows them to stay hidden until this exact moment
    tl.to('.hero h1', {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power4.out',
        startAt: { y: 60 }
    })
    .to('.hero p', {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        startAt: { y: 30 }
    }, '-=0.8')
    .to('.hero .glass-card', {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        startAt: { y: 40 }
    }, '-=0.6')
    .to('.hero .tag-cloud .tag', {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        startAt: { scale: 0.8 }
    }, '-=0.6')
}

function animateProcess() {
    // Floating animations (Looping)
    gsap.to('.user-icon', {
        y: -15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        stagger: 0.3,
        ease: 'sine.inOut'
    })

    // Scroll-triggered flow lines
    gsap.utils.toArray('.flow-line').forEach(line => {
        gsap.from(line, {
            height: 0,
            duration: 1.5,
            ease: 'power1.inOut',
            scrollTrigger: {
                trigger: line,
                start: 'top 80%',
            }
        })
    })

    // Float the core containers
    gsap.to('.core-box, .business-box', {
        y: -8,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    })
}

function animateSections() {
    // Fade in sections with staggered children
    gsap.utils.toArray('section').forEach(section => {
        if (section.classList.contains('hero')) return
        
        const content = section.querySelectorAll('.glass-card, .logo-placeholder, h2')
        
        gsap.from(content, {
            y: 40,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: section,
                start: 'top 75%'
            }
        })
    })
}

function initMap() {
    // MAP FREEZING: Disabling all interactions to serve as a high-fidelity visual
    const map = L.map('map', {
        center: [25, 15],
        zoom: 2.5,
        dragging: false,           // Freeze panning
        zoomControl: false,        // Freeze zooming (UI)
        scrollWheelZoom: false,    // Freeze zooming (Mouse)
        doubleClickZoom: false,    // Freeze zooming (Interaction)
        boxZoom: false,
        touchZoom: false,
        keyboard: false,
        attributionControl: true
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map)

    // Global Network Data Points
    const networkNodes = [
        [51.505, -0.09],   // London
        [40.7128, -74.006], // NYC
        [25.2048, 55.2708], // Dubai
        [35.6762, 139.6503], // Tokyo
        [-23.5505, -46.6333], // São Paulo
        [-33.8688, 151.2093], // Sydney
        [1.3521, 103.8198], // Singapore
        [48.8566, 2.3522]   // Paris
    ]

    const nodeIcon = L.divIcon({
        className: 'network-node',
        html: `<div style="
            background: var(--secondary);
            width: 12px;
            height: 12px;
            border-radius: 50%;
            box-shadow: 0 0 15px var(--secondary-glow);
            animation: pulse 2s infinite ease-in-out;
        "></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6]
    })

    networkNodes.forEach(coords => {
        L.marker(coords, { icon: nodeIcon }).addTo(map)
    })
}

// Global Micro-interactions
document.querySelectorAll('.logo-placeholder, .glass-card, .tag').forEach(el => {
    el.addEventListener('mouseenter', () => {
        gsap.to(el, { scale: 1.02, duration: 0.3, ease: 'power2.out' })
    })
    el.addEventListener('mouseleave', () => {
        gsap.to(el, { scale: 1, duration: 0.3, ease: 'power2.out' })
    })
})
