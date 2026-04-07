import './style.css'
import L from 'leaflet'

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initReveals()
    initMap()
})

/**
 * Native IntersectionObserver for Performant HTML5 Animations
 */
function initReveals() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed')
                // Optional: stop observing once revealed
                // observer.unobserve(entry.target)
            }
        })
    }, observerOptions)

    // Select all elements tagged for reveal
    const revealElements = document.querySelectorAll('.reveal, .reveal-up, .reveal-scale')
    revealElements.forEach(el => observer.observe(el))
    
    // Immediate reveal for hero elements to avoid delay
    setTimeout(() => {
        document.querySelectorAll('.hero .reveal, .hero .reveal-up').forEach(el => {
            el.classList.add('revealed')
        })
    }, 100)
}

function initMap() {
    const mapContainer = document.getElementById('map')
    if (!mapContainer) return

    // MAP FREEZING: Disabling all interactions to serve as a high-fidelity visual
    const map = L.map('map', {
        center: [25, 15],
        zoom: 2.5,
        dragging: false,
        zoomControl: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        touchZoom: false,
        keyboard: false,
        attributionControl: true
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map)

    const networkNodes = [
        [51.505, -0.09], [40.7128, -74.006], [25.2048, 55.2708], [35.6762, 139.6503],
        [-23.5505, -46.6333], [-33.8688, 151.2093], [1.3521, 103.8198], [48.8566, 2.3522]
    ]

    const nodeIcon = L.divIcon({
        className: 'network-node',
        html: `<div style="
            background: var(--secondary);
            width: 12px; height: 12px;
            border-radius: 50%;
            box-shadow: 0 0 15px var(--secondary-glow);
        "></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6]
    })

    networkNodes.forEach(coords => {
        L.marker(coords, { icon: nodeIcon }).addTo(map)
    })
}
