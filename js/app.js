// user story: move the ball threw the gaps within the blocks as they go upwards.

// G-L: create an eventlistener on the key's left & right. Wirte out a function where the ball hit's up they lose/break the game as an error.


// first get the element by id and then create an E-L 
const ball = document.getElementById('ball')
let interval;
const gameBox = document.getElementById('gamebox')
const bothKeys = 0
const currentBlocks = []
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

// E-L when user is pressing left arrow or right arrow
document.addEventListener('keydown', e => {
    if (bothKeys == 0) {
        // bothKeys++
        if (e.key === 'ArrowLeft') {
            interval = setInterval(left, 1)
        }
        if (e.key === 'ArrowRight') {
            interval = setInterval(right, 1)
        }
    }
})

function left() {
    let left = parseInt(window.getComputedStyle(ball).getPropertyValue("left"))
    if (left > 0) {
        ball.style.left = left - 2 + 'px'
    }
}

function right() {
    let left = parseInt(window.getComputedStyle(ball).getPropertyValue("left"))
    if (left < 475) {
        ball.style.left = left + 2 + 'px'
    }
}

document.addEventListener('keyup', (e) => {
    clearInterval(interval)
    bothKeys=0
})





