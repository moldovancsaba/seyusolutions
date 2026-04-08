const canvas = document.getElementById('worldMap');
if (canvas) {
    const ctx = canvas.getContext('2d');

    // Dimensions
    const width = 1000;
    const height = 400;

    // Fetch Design System Tokens
    const getThemeColor = (prop) => getComputedStyle(document.documentElement).getPropertyValue(prop).trim();

    // Function to convert Lat/Lon to X/Y pixels on a 1000x400 canvas
    function getCoordinates(lat, lon) {
        const x = (lon + 180) * (width / 360);
        const y = (90 - lat) * (height / 180);
        return { x, y };
    }

    // ==========================================
    // SECTION 1: BACKGROUND CITIES (ULTRA-DENSE)
    // ==========================================
    const backgroundCities = [
        // North America (High Density)
        { lat: 47.60, lon: -122.33 }, { lat: 34.05, lon: -118.24 }, { lat: 37.77, lon: -122.41 }, { lat: 32.71, lon: -117.16 },
        { lat: 45.52, lon: -122.67 }, { lat: 36.16, lon: -115.13 }, { lat: 33.44, lon: -112.07 }, { lat: 39.73, lon: -104.99 },
        { lat: 29.76, lon: -95.36 }, { lat: 30.26, lon: -97.74 }, { lat: 32.77, lon: -96.79 }, { lat: 35.22, lon: -80.84 },
        { lat: 33.74, lon: -84.38 }, { lat: 25.76, lon: -80.19 }, { lat: 28.53, lon: -81.37 }, { lat: 38.90, lon: -77.03 },
        { lat: 39.95, lon: -75.16 }, { lat: 40.71, lon: -74.00 }, { lat: 42.36, lon: -71.05 }, { lat: 43.65, lon: -79.38 },
        { lat: 45.50, lon: -73.56 }, { lat: 45.42, lon: -75.69 }, { lat: 41.87, lon: -87.62 }, { lat: 44.97, lon: -93.26 },
        { lat: 42.33, lon: -83.04 }, { lat: 39.10, lon: -84.51 }, { lat: 35.46, lon: -97.51 }, { lat: 51.04, lon: -114.07 },
        { lat: 53.54, lon: -113.49 }, { lat: 49.28, lon: -123.12 }, { lat: 19.43, lon: -99.13 }, { lat: 20.65, lon: -103.34 },
        { lat: 18.46, lon: -66.10 }, { lat: 14.59, lon: -90.50 }, { lat: 9.92, lon: -84.09 }, { lat: 17.96, lon: -76.79 },
        { lat: 61.21, lon: -149.90 }, { lat: 21.30, lon: -157.85 }, { lat: 64.83, lon: -147.71 }, { lat: 36.72, lon: -4.42 },
        // South America (High Density)
        { lat: -23.55, lon: -46.63 }, { lat: -22.90, lon: -43.17 }, { lat: -15.79, lon: -47.88 }, { lat: -12.97, lon: -38.50 },
        { lat: -8.05, lon: -34.88 }, { lat: -1.45, lon: -48.49 }, { lat: -3.73, lon: -38.52 }, { lat: -3.11, lon: -60.02 },
        { lat: -34.60, lon: -58.38 }, { lat: -31.42, lon: -64.18 }, { lat: -32.94, lon: -60.63 }, { lat: -33.44, lon: -70.66 },
        { lat: -12.04, lon: -77.04 }, { lat: 4.71, lon: -74.07 }, { lat: -0.18, lon: -78.46 }, { lat: 10.48, lon: -66.90 },
        { lat: -16.50, lon: -68.11 }, { lat: -25.26, lon: -57.57 }, { lat: -34.83, lon: -56.16 }, { lat: -41.46, lon: -72.93 },
        { lat: -54.80, lon: -68.30 }, { lat: -9.64, lon: -35.70 }, { lat: -18.91, lon: -48.28 }, { lat: -20.31, lon: -40.31 },
        // Europe (High Density)
        { lat: 51.50, lon: -0.12 }, { lat: 52.48, lon: -1.89 }, { lat: 53.48, lon: -2.24 }, { lat: 55.86, lon: -4.25 },
        { lat: 53.34, lon: -6.26 }, { lat: 48.85, lon: 2.35 }, { lat: 45.76, lon: 4.83 }, { lat: 43.29, lon: 5.36 },
        { lat: 44.83, lon: -0.57 }, { lat: 50.85, lon: 4.35 }, { lat: 52.36, lon: 4.90 }, { lat: 51.92, lon: 4.47 },
        { lat: 52.52, lon: 13.40 }, { lat: 48.13, lon: 11.58 }, { lat: 53.55, lon: 9.99 }, { lat: 50.11, lon: 8.68 },
        { lat: 48.20, lon: 16.37 }, { lat: 47.37, lon: 8.54 }, { lat: 41.90, lon: 12.49 }, { lat: 45.46, lon: 9.18 },
        { lat: 44.49, lon: 11.34 }, { lat: 40.85, lon: 14.26 }, { lat: 41.38, lon: 2.17 }, { lat: 40.41, lon: -3.70 },
        { lat: 39.46, lon: -0.37 }, { lat: 38.72, lon: -9.13 }, { lat: 41.15, lon: -8.62 }, { lat: 59.32, lon: 18.06 },
        { lat: 59.91, lon: 10.75 }, { lat: 55.67, lon: 12.56 }, { lat: 60.16, lon: 24.93 }, { lat: 55.75, lon: 37.61 },
        { lat: 59.93, lon: 30.33 }, { lat: 52.22, lon: 21.01 }, { lat: 50.06, lon: 19.94 }, { lat: 50.45, lon: 30.52 },
        { lat: 44.42, lon: 26.10 }, { lat: 42.69, lon: 23.32 }, { lat: 37.98, lon: 23.72 }, { lat: 41.00, lon: 28.97 },
        { lat: 35.16, lon: 33.36 }, { lat: 47.49, lon: 19.04 }, { lat: 64.13, lon: -21.93 },
        // Africa (High Density)
        { lat: 30.04, lon: 31.23 }, { lat: 31.20, lon: 29.91 }, { lat: 33.57, lon: -7.58 }, { lat: 36.75, lon: 3.05 },
        { lat: 35.75, lon: -5.83 }, { lat: 34.02, lon: -6.83 }, { lat: 33.88, lon: 35.50 }, { lat: 6.52, lon: 3.37 },
        { lat: 9.07, lon: 7.39 }, { lat: 14.71, lon: -17.46 }, { lat: 12.63, lon: -8.00 }, { lat: 12.37, lon: -1.51 },
        { lat: 4.33, lon: 18.55 }, { lat: 0.34, lon: 32.58 }, { lat: -1.29, lon: 36.82 }, { lat: -4.03, lon: 39.66 },
        { lat: -17.82, lon: 31.05 }, { lat: -26.20, lon: 28.04 }, { lat: -33.92, lon: 18.42 }, { lat: -29.85, lon: 31.02 },
        { lat: -15.78, lon: 35.00 }, { lat: -15.41, lon: 28.28 }, { lat: -4.32, lon: 15.32 }, { lat: -8.83, lon: 13.23 },
        { lat: -18.87, lon: 47.50 }, { lat: 20.16, lon: 57.50 }, { lat: 11.57, lon: 43.14 },
        // Asia (High Density)
        { lat: 39.90, lon: 116.40 }, { lat: 31.23, lon: 121.47 }, { lat: 23.12, lon: 113.26 }, { lat: 22.54, lon: 114.05 },
        { lat: 22.31, lon: 114.16 }, { lat: 25.03, lon: 121.56 }, { lat: 35.67, lon: 139.65 }, { lat: 34.69, lon: 135.50 },
        { lat: 33.59, lon: 130.40 }, { lat: 43.06, lon: 141.35 }, { lat: 37.56, lon: 126.97 }, { lat: 35.17, lon: 129.07 },
        { lat: 19.07, lon: 72.87 }, { lat: 28.61, lon: 77.20 }, { lat: 12.97, lon: 77.59 }, { lat: 13.08, lon: 80.27 },
        { lat: 22.57, lon: 88.36 }, { lat: 17.38, lon: 78.48 }, { lat: 23.71, lon: 90.41 }, { lat: 13.75, lon: 100.50 },
        { lat: 10.82, lon: 106.62 }, { lat: 21.02, lon: 105.83 }, { lat: 14.59, lon: 120.98 }, { lat: -6.20, lon: 106.84 },
        { lat: -7.25, lon: 112.75 }, { lat: 1.35, lon: 103.81 }, { lat: 3.13, lon: 101.68 }, { lat: 35.68, lon: 51.38 },
        { lat: 33.31, lon: 44.36 }, { lat: 34.55, lon: 69.17 }, { lat: 31.52, lon: 74.35 }, { lat: 24.86, lon: 67.00 },
        { lat: 25.20, lon: 55.27 }, { lat: 24.71, lon: 46.67 }, { lat: 32.08, lon: 34.78 }, { lat: 33.51, lon: 36.27 },
        // Oceania (High Density)
        { lat: -33.86, lon: 151.20 }, { lat: -37.81, lon: 144.96 }, { lat: -27.46, lon: 153.02 }, { lat: -31.95, lon: 115.86 },
        { lat: -34.92, lon: 138.60 }, { lat: -12.46, lon: 130.84 }, { lat: -19.25, lon: 146.81 }, { lat: -23.69, lon: 133.88 },
        { lat: -36.84, lon: 174.76 }, { lat: -41.28, lon: 174.77 }, { lat: -43.53, lon: 172.63 }, { lat: -9.44, lon: 147.18 },
        { lat: -18.14, lon: 178.44 }, { lat: -13.83, lon: -171.75 }, { lat: -21.13, lon: -175.20 }
    ];

    const cyanCities = [
        { lat: 47.4979, lon: 19.0402 }, // Budapest
        { lat: 39.4699, lon: -0.3774 }, // Valencia
        { lat: 40.7128, lon: -74.0060 }, // New York
        { lat: 1.3521,  lon: 103.8198 }, // Singapore
        { lat: 25.2048, lon: 55.2708 },  // Dubai
        { lat: 35.6762, lon: 139.6503 }  // Tokyo
    ];

    const pinkCities = [
        { lat: 51.5074, lon: -0.1278 }, // London
        { lat: 48.8566, lon: 2.3522 },  // Paris
        { lat: -33.8688, lon: 151.2093 }, // Sydney
        { lat: 19.0760, lon: 72.8777 }   // Mumbai
    ];

    // Render Function
    function render() {
        ctx.clearRect(0, 0, width, height);

        // Synchronize with Theme CSS Tokens
        const colPrimary = getThemeColor('--primary') || '#00e5ff';
        const colSecondary = getThemeColor('--secondary') || '#ff2d7a';
        const colWhite = getThemeColor('--text') || '#ffffff';

        // Draw Background Cities
        ctx.fillStyle = colWhite;
        backgroundCities.forEach(city => {
            const pos = getCoordinates(city.lat, city.lon);
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, 1.5, 0, Math.PI * 2);
            ctx.fill();
        });

        // Setup Highlights (ULTRA BULLSEYE)
        const drawHighlight = (cities, color) => {
            ctx.fillStyle = color;
            ctx.shadowBlur = 25;
            ctx.shadowColor = color;
            cities.forEach(city => {
                const pos = getCoordinates(city.lat, city.lon);
                ctx.beginPath();
                ctx.arc(pos.x, pos.y, 8.5, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.shadowBlur = 0; 
        };

        drawHighlight(cyanCities, colPrimary);
        drawHighlight(pinkCities, colSecondary);
    }

    render();
}
