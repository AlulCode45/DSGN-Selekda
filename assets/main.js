const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = canvas.scrollWidth
canvas.height = canvas.scrollHeight

let drawing = false;
let drawHistory = [];

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);

function startDrawing(event) {
    drawing = true;
    draw(event); 
}

function stopDrawing() {
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
    drawHistory.push({x, y})
}
function undo() {
    for (let i = 0; i < 10; i++) {
        drawHistory.pop();
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawHistory.forEach((point) => {
        ctx.lineWidth = 5;
        ctx.lineCap = 'round'; 
        ctx.strokeStyle = 'black';
        ctx.lineTo(point.x, point.y); 
        ctx.stroke(); 
        ctx.beginPath(); 
        ctx.moveTo(point.x, point.y); 
    });
}