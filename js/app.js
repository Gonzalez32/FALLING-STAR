// user story: move the ball threw the gaps within the blocks as they go upwards.

// G-L: create an eventlistener on the key's left & right. Wirte out a function where the ball hit's up they lose/break the game as an error.


// first get the element by id and then create an E-L 
const ball = document.getElementById('ball')
const gameBox = document.getElementById('gamebox')
let control;
let bothKeys = 0
// keeps track setInterval function
var tracker = 0

// set my Interval for myTimer function for every 1 second.
// const timer = setInterval(myTimer, 1000);
// this is my time fucntion that renders on the page for the user. 
// function myTimer() {
//     let d = new Date()
//     let t = d.toLocaleTimeString()
//     document.getElementById('time').innerHTML = t
// }

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

// need to create an element div for the bar to render on the page. Within the bar there should be gaps as well


// S-I function to render bar and gap continuously
setInterval(function(){
    var lastBar = document.getElementById('bar' + (tracker - 1))
    var lastGap = document.getElementById('gap' + (tracker - 1))
    if (tracker > 0) {
        var topBar = parseInt(window.getComputedStyle(lastBar).getPropertyValue('top'))
        var topGap = parseInt(window.getComputedStyle(lastGap).getPropertyValue('top'))
    }
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
    tracker++
},1)




