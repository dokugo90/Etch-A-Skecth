//Query's
const start = document.querySelector(".start-btn")
const intro = document.querySelector(".title")
const animate = document.querySelector(".ani")
const grid =  document.querySelector("#grid")
const clearBtn = document.querySelector(".clear")
const eraseBtn = document.querySelector(".erase")
const colorBtn = document.querySelector(".color")
const rainbowBtn = document.querySelector(".rainbow")
const button = document.querySelector(".button")
const colorPicker = document.querySelector(".colorPicker")
const Slider = document.querySelector("#sizeSlider")
const sizeText = document.querySelector(".sizeValue")
const background = document.querySelector(".background")

function setSize(value) {
    differentSize = value;
}

//Event Bools
let mousedown = false;
let dblclick = false
let click = false

//Variables
const initialSize = 16;
let differentSize = initialSize;
let defaultColor = 'black';
let defaultMode = 'color';


document.onmousedown = () => (mousedown = true);
document.onmouseup = () => (mousedown = false);
document.ondblclick = () => (dblclick = true)
document.onclick = () => (click = true)


//Open Function
function Open() {
start.style.transform = 'scale(0)'
intro.style.transform = 'scale(0)'
animate.style.display = 'none'
grid.style.transform = 'scale(1)'
button.style.transform = 'scale(1)'
document.body.style.overflowY = 'scroll'
};

function setColor(color) {
checkButton(color)
defaultColor = color
}

function updateSizeValue(value) {
    sizeText.textContent  = `${value} x ${value}`
}

function ChangeSize(size) {
    setSize(size)
    resetGrid()
}

function resetGrid() {
    Clear()
    GridSize(differentSize)
}

function Clear() {
grid.innerHTML = ''
}

function setGridColor(value) {
    grid.style.backgroundColor = value
}

function GridSize(value) {
grid.style.gridTemplateColumns = `repeat(${value}, 1fr)`
grid.style.gridTemplateRows = `repeat(${value}, 1fr)`

for (let i = 0; i < value * value; i++) {
const gridElement = document.createElement('div')
gridElement.classList.add('gridcell')
gridElement.addEventListener('mouseover', ChangeColor)
gridElement.addEventListener("mousedown", ChangeColor)
grid.appendChild(gridElement)
};
}

function ChangeColor(e) {
    if (e.type === 'mouseover' && !mousedown) return;
    if (e.type === 'mouseup' && dblclick) return;
    if (e.type === 'mouseover' && mousedown || click) {
    e.target.style.backgroundColor = defaultColor 
    }
    if (defaultColor == 'erase') {
    e.target.style.backgroundColor = background.value
    }
    if (defaultColor == 'color') {
    e.target.style.backgroundColor = colorPicker.value
    }
    if (defaultColor == 'rainbow') {
    const randomR = Math.floor(Math.random() * 256)
    const randomG = Math.floor(Math.random() * 256)
    const randomB = Math.floor(Math.random() * 256)
    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    }
    if (defaultColor == 'pick') {
        e.target.style.backgroundColor = colorPicker.value
    }
    }

    function checkButton(mode) {
        if (defaultColor === 'rainbow') {
            rainbowBtn.classList.remove("selected")
        } else if (defaultColor === 'color') {
            colorBtn.classList.remove("selected")
        } else if (defaultColor === 'erase') {
            eraseBtn.classList.remove("selected")
        }
        
        if (mode === 'rainbow') {
            rainbowBtn.classList.add("selected")
        } else if (mode === 'color') {
            colorBtn.classList.add("selected")
        } else if (mode === 'erase') {
            eraseBtn.classList.add("selected")
        }
    }

background.oninput = (e) => setGridColor(e.target.value)
Slider.onmousemove = (e) => updateSizeValue(e.target.value)
Slider.onchange = (e) => ChangeSize(e.target.value)
colorPicker.onclick = () => setColor('pick')
rainbowBtn.onclick = () => setColor('rainbow')
colorBtn.onclick = () => setColor('color')
eraseBtn.onclick = () => setColor('erase');
clearBtn.addEventListener("click", resetGrid)
start.addEventListener("click", Open)
window.addEventListener("load", () => {
    GridSize(initialSize)
    checkButton()
})



