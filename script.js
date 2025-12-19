const mapCanvas = document.getElementById('mapCanvas');
const gridCanvas = document.getElementById('gridCanvas');
const mapCtx = mapCanvas.getContext('2d');
const gridCtx = gridCanvas.getContext('2d');

let currentTool = 'brush'; // 'brush' or 'stamp'
let activeStamp = 'tree';

// Asset Library
const stamps = {
    tree: 'https://cdn-icons-png.flaticon.com/512/489/489969.png',
    mountain: 'https://cdn-icons-png.flaticon.com/512/2932/2932130.png'
};

// 1. TOOL SWITCHING LOGIC
document.querySelectorAll('.tool-btn').forEach(btn => {
    btn.onclick = () => {
        currentTool = btn.dataset.tool;
        activeStamp = btn.dataset.type;
        document.querySelector('.active').classList.remove('active');
        btn.classList.add('active');
    };
});

// 2. UPDATED DRAW FUNCTION
function handleInput(e) {
    const x = e.clientX - 250;
    const y = e.clientY;

    if (currentTool === 'brush' && painting) {
        // Original texture brush logic here...
    } else if (currentTool === 'stamp' && e.type === 'mousedown') {
        // Stamp Logic: Place one image at click
        const img = new Image();
        img.src = stamps[activeStamp];
        img.onload = () => {
            const size = document.getElementById('brushSize').value;
            mapCtx.drawImage(img, x - size/2, y - size/2, size, size);
        };
    }
}

mapCanvas.addEventListener('mousedown', handleInput);
mapCanvas.addEventListener('mousemove', (e) => { if(painting) handleInput(e); });

// 3. HEX GRID LOGIC
function drawHex(ctx, x, y, radius) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
        ctx.lineTo(x + radius * Math.cos(a * i), y + radius * Math.sin(a * i));
    }
    ctx.closePath();
    ctx.stroke();
}

const a = 2 * Math.PI / 6;
const r = 30; // Radius of hexagons

function renderGrid() {
    gridCtx.clearRect(0, 0, gridCanvas.width, gridCanvas.height);
    if (!document.getElementById('gridToggle').checked) return;

    gridCtx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    for (let y = 0; y < gridCanvas.height + r; y += r * Math.sin(a) * 2) {
        for (let x = 0, j = 0; x < gridCanvas.width + r; x += r * (1 + Math.cos(a)), y += (-1) ** j++ * r * Math.sin(a)) {
            drawHex(gridCtx, x, y, r);
        }
    }
}

document.getElementById('gridToggle').onchange = renderGrid;