// user story: move the ball threw the gaps within the blocks as they go upwards.

// G-L: create an eventlistener on the key's left & right. Wirte out a function where the ball hit's up they lose/break the game as an error.

// const ball = document.getElementById('ball').addEventListener('keydown', event => {
//     if (both==0) {
//         both++
//         if (event.key==="ArrowLeft") {
//             interval = setInterval(moveleft, 1)
//         }
//         if (event.key==="AroowRight") {
//             interval = setInterval(moveright, 1)
//         }
//     }
// })

// function moveleft() {
//     let left = parseInt(window.getComputedStyle(ball).getPropertyValue('left'))
//     if (left > 0) {
//         ball.style.left = left - 2 + "px"
//     }
// }

// first get the element by id and then create an E-L 
const ball = document.getElementById('ball')
const gameBox = document.getElementById('gamebox')

const currentBlocks = []
// set my Interval for myTimer function for every 1 second.
const time = setInterval(myTimer, 1000);
// this is my time fucntion that renders on the page for the user. 
function myTimer() {
    let d = new Date()
    let t = d.toLocaleTimeString()
    document.getElementById('time').innerHTML = t
}

// console.log('this should be here', ball)

ball.addEventListener('keydown', e => {
    console.log('right', e)
})



