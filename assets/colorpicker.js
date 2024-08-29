const red = document.querySelector('#red-color');
const green = document.querySelector('#green-color');
const blue = document.querySelector('#blue-color');


red.addEventListener('input', function() {
    colorPen = `rgb(${red.value}, ${green.value}, ${blue.value})`;
});

green.addEventListener('input', function() {
    colorPen = `rgb(${red.value}, ${green.value}, ${blue.value})`;
})

blue.addEventListener('input', function() {
    colorPen = `rgb(${red.value}, ${green.value}, ${blue.value})`;
})