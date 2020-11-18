// user story: move the ball threw the gaps within the blocks as they go upwards.

// G-L: create an eventlistener on the key's left & right. Wirte out a function where the ball hit's up they lose/break the game as an error.


// first get the element by id and then create an E-L 
const ball = document.getElementById('ball')
const gameBox = document.getElementById('gamebox')
let control;
let bothKeys = 0
// const currentBlocks = []


// set my Interval for myTimer function for every 1 second.
const timer = setInterval(myTimer, 1000);
// this is my time fucntion that renders on the page for the user. 
function myTimer() {
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

// within setInterval function right for my right-key set to 475 at the right div-box
function right() {
    let left = parseInt(window.getComputedStyle(ball).getPropertyValue("left"))
    if (left < 475) {
        ball.style.left = left + 2 + 'px'
    }
}

// add E-L so when keys are not in use or both keys are press in the sametime it stops the ball
document.addEventListener('keyup', (e) => {
    clearInterval(control)
    bothKeys=0
})

// need to create an element div for the blocks to render on the page. Within the blocks there should be gaps as well

// create an element div for bar and gap
let bar = document.createElement("div")
let gap = document.createElement("div")
// S-A for class and id for bar and gap
bar.setAttribute('class', 'bar')
gap.setAttribute('class', 'gap')
bar.setAttribute('id', 'bar')
gap.setAttribute('id', 'gap')

gameBox.appendChild(bar)
gameBox.appendChild(gap)






