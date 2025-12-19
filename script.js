const canvas = document.getElementById('mapCanvas');
const ctx = canvas.getContext('2d');
const brushSizeInput = document.getElementById('brushSize');
const opacityInput = document.getElementById('opacity');

// Canvas Setup
canvas.width = window.innerWidth - 250;
canvas.height = window.innerHeight;

let painting = false;
let currentTexture = new Image();
currentTexture.src = 'https://www.transparenttextures.com/patterns/grass.png'; // Placeholder

// Texture Library
const textures = {
    grass: 'https://www.transparenttextures.com/patterns/grass.png',
    stone: 'https://www.transparenttextures.com/patterns/dark-matter.png',
    sand: 'https://www.transparenttextures.com/patterns/sandpaper.png'
};

// Handle Texture Switching
document.querySelectorAll('.tex-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelector('.active').classList.remove('active');
        btn.classList.add('active');
        currentTexture.src = textures[btn.dataset.tex];
    });
});

function draw(e) {
    if (!painting) return;

    const size = brushSizeInput.value;
    ctx.globalAlpha = opacityInput.value;
    
    // Draw the texture stamp
    ctx.drawImage(currentTexture, e.clientX - 250 - size/2, e.clientY - size/2, size, size);
}

canvas.addEventListener('mousedown', () => painting = true);
window.addEventListener('mouseup', () => painting = false);
canvas.addEventListener('mousemove', draw);

// Clear & Download
document.getElementById('clearBtn').onclick = () => ctx.clearRect(0, 0, canvas.width, canvas.height);
document.getElementById('downloadBtn').onclick = () => {
    const link = document.createElement('a');
    link.download = 'my-map.png';
    link.href = canvas.toDataURL();
    link.click();
};