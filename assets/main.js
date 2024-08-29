const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = canvas.scrollWidth;
canvas.height = canvas.scrollHeight;

let drawing = false;
let drawHistory = [];
let redoHistory = [];
let currentPath = [];

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);

function startDrawing(event) {
    drawing = true;
    currentPath = []; 
    draw(event); 
}
            
function stopDrawing() {
    if (drawing) {
        drawHistory.push([...currentPath]); 
        redoHistory = []; // Kosongkan redoHistory setelah menggambar baru
    }
    drawing = false;
    ctx.beginPath(); 
}

function draw(event) {
    if (!drawing) return;

    ctx.lineWidth = 5;
    ctx.lineCap = 'round'; 
    ctx.strokeStyle = 'black';

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ctx.lineTo(x, y); 
    ctx.stroke(); 
    ctx.beginPath(); 
    ctx.moveTo(x, y); 

    currentPath.push({x, y}); 
}

function undo() {
    if (drawHistory.length > 0) {
        const path = drawHistory.pop(); 
        redoHistory.push(path); // Simpan jalur yang dihapus ke redoHistory
        redraw();
    }
}

function redo() {
    if (redoHistory.length > 0) {
        const path = redoHistory.pop(); 
        drawHistory.push(path); // Tambahkan jalur kembali ke drawHistory
        redraw();
    }
}

function redraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    drawHistory.forEach(path => {
        ctx.beginPath();
        path.forEach((point, index) => {
            if (index === 0) {
                ctx.moveTo(point.x, point.y);
            } else {
                ctx.lineTo(point.x, point.y);
                ctx.stroke();
            }
        });
        ctx.closePath();
    });
}

function save(){
    const data = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = data;
    a.download = 'image.png';
    a.click();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawHistory = [];
    redoHistory = []; // Kosongkan redoHistory saat canvas di-clear
}
