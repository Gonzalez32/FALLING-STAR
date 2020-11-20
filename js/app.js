// user story: move the ball threw the gaps within the blocks as they go upwards.

// G-L: create an eventlistener on the key's left & right. Wirte out a function where the ball hit's up they lose/break the game as an error.


// first get the element by id and then create an E-L 
const ball = document.getElementById('ball')
const gameBox = document.getElementById('gamebox')
const message = document.getElementById('message')
const play = document.getElementById('amazing')
let control;
let bothKeys = 0
// keeps track setInterval function
var tracker = 0
var currentBars = []

// set my Interval for myTimer function for every 1 second.
const timer = setInterval(myWatch, 1000);
// this is my time fucntion that renders on the page for the user. 
function myWatch() {
    let d = new Date()
    let t = d.toLocaleTimeString()
    document.getElementById('time').innerHTML = t
}

// this allows me to see which key is bring selective with console.log ---just for testing---
// window.addEventListener('keydown', (e) => {
//     console.log(e)
// }) 

// E-L on keybored but only when user is pressing left arrow or right arrow
document.addEventListener('keydown', (e) => {
    if (bothKeys == 0) {
        bothKeys++
        // use keyCode: 37 = ArrowLeft
        if (e.keyCode === 37) {
            control = setInterval(left, 1)
        }
        // use keyCode: 39 = ArrowRight
        if (e.keyCode === 39) {
            control = setInterval(right, 1)
        }
    }
})

// within setInterval function left for my left-key set to 0 at left div-box 
function left() {
    let left = parseInt(window.getComputedStyle(ball).getPropertyValue("left"))
    if (left > 0) {
        ball.style.left = left - 2 + 'px'
    }
}

// within setInterval function right for my right-key set to 380 at the right div-box
function right() {
    let left = parseInt(window.getComputedStyle(ball).getPropertyValue("left"))
    if (left < 380) {
        ball.style.left = left + 2 + 'px'
    }
}

// add E-L so when keys are not in use or both keys are press in the sametime it stops the ball
document.addEventListener('keyup', (e) => {
    clearInterval(control)
    bothKeys=0
})

// resetBtn = document.getElementById('resetBtn').addEventListener('click', (e) => {
//     console.log(e.target, e.value)
//     // tracker = null
//     // play = null 

// })
// hard reset button at the moment
function resetButton() {
    location.reload()
}
// need to create an element div for the bar to render on the page. Within the bar there should be gaps as well


// S-I function to render bar and gap continuously
let bars = setInterval(function(){
    var lastBar = document.getElementById('bar' + (tracker - 1))
    var lastGap = document.getElementById('gap' + (tracker - 1))
    if (tracker > 0) {
        var topBar = parseInt(window.getComputedStyle(lastBar).getPropertyValue('top'))
        var topGap = parseInt(window.getComputedStyle(lastGap).getPropertyValue('top'))
    }
    if (topBar < 400 || tracker == 0) {
        // create an element div for bar and gap
        let bar = document.createElement("div")
        let gap = document.createElement("div")
        // S-A for class and id for bar and gap
        bar.setAttribute('class', 'bar')
        gap.setAttribute('class', 'gap')
        bar.setAttribute('id', 'bar' + tracker)
        gap.setAttribute('id', 'gap' + tracker)
        bar.style.top = topBar + 100 + 'px'
        gap.style.top = topGap + 100 + 'px'
        // random the gap everytime it's rendering on the page
        let random = Math.floor(Math.random() * 360) 
        gap.style.left = random + 'px'
        // append the bar and gap within the gamebox div 
        gameBox.appendChild(bar)
        gameBox.appendChild(gap)
        currentBars.push(tracker)
        tracker++
    }
    
    var ballTop = parseInt(window.getComputedStyle(ball).getPropertyValue('top'))
    var ballLeft = parseInt(window.getComputedStyle(ball).getPropertyValue('left'))
    let drop = 0
    if (ballTop <= 0) {
        message.innerHTML = `GAME OVER SCORE: ${tracker-9}`
        clearInterval(bars)
    }
    // need to render the bars upward to the div gamebox 
    for (var i = 0; i < currentBars.length; i++) {
        let current = currentBars[i]
        let ibar = document.getElementById('bar' + current)
        let igap = document.getElementById('gap' + current)
        let ibarTop = parseFloat(window.getComputedStyle(ibar).getPropertyValue('top'))
        let igapLeft = parseFloat(window.getComputedStyle(igap).getPropertyValue('left'))
        ibar.style.top = ibarTop - 0.5 + 'px';
        igap.style.top = ibarTop - 0.5 + 'px';
        if (ibarTop < -20) {
            currentBars.shift();
            ibar.remove();
            igap.remove();
        }
        if (ibarTop - 20 < ballTop && ibarTop > ballTop) {
            drop++;
            if (igapLeft <= ballLeft && igapLeft + 20 >= ballLeft) {
                drop = 0;
            }
        }
    }
    if (drop == 0) {
        if (ballTop < 480) {
            ball.style.top = ballTop + 2 + 'px'
        }
    } else {
        ball.style.top = ballTop - 0.5 + 'px'
    }
},1)

