const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const red = document.querySelector('#red-color');
const green = document.querySelector('#green-color');
const blue = document.querySelector('#blue-color');

canvas.width = canvas.scrollWidth;
canvas.height = canvas.scrollHeight;

let drawing = false;
let drawHistory = [];
let redoHistory = [];
let currentPath = [];
let sizePen = 5
let colorPen = 'black'
let penStyle = 'round'

red.addEventListener('input', function() {
    colorPen = `rgb(${red.value}, ${green.value}, ${blue.value})`;
    document.querySelector('.color-selected').style.backgroundColor = colorPen;
});

green.addEventListener('input', function() {
    colorPen = `rgb(${red.value}, ${green.value}, ${blue.value})`;
    document.querySelector('.color-selected').style.backgroundColor = colorPen;
})

blue.addEventListener('input', function() {
    colorPen = `rgb(${red.value}, ${green.value}, ${blue.value})`;
    document.querySelector('.color-selected').style.backgroundColor = colorPen;
})

document.querySelector('#size-pen').addEventListener('input', function() {
    sizePen = this.value;
    document.querySelector('.size-pen-value').textContent = sizePen;
});

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
        redoHistory = [];
    }
    drawing = false;
    ctx.beginPath(); 
}

function draw(event) {
    if (!drawing) return;

    ctx.lineWidth = sizePen;
    ctx.lineCap = penStyle; 
    ctx.strokeStyle = colorPen;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ctx.lineTo(x, y); 
    ctx.stroke(); 
    ctx.beginPath(); 
    ctx.moveTo(x, y); 

    currentPath.push({x, y, sizePen, colorPen, penStyle}); 
}

function undo() {
    if (drawHistory.length > 0) {
        const path = drawHistory.pop(); 
        redoHistory.push(path);
        redraw();
    }
}

function redo() {
    if (redoHistory.length > 0) {
        const path = redoHistory.pop(); 
        drawHistory.push(path); 
        redraw();
    }
}

function redraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    drawHistory.forEach(path => {
        ctx.beginPath();
        ctx.lineWidth = path[0].sizePen;
        ctx.lineCap = path[0].penStyle;
        ctx.strokeStyle = path[0].colorPen;
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
    redoHistory = [];
}


