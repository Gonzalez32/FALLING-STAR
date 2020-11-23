// user story:
// move the ball using left key and right key threw the gaps within the bars as they go upwards.
// random Bars with Gaps will render as you keep playing.
// once the ball hits the top bar DIV it stops the game.
// render Game-Over with score to the user.
// user will be able to 'click' Reset button to play again. 
// real Time will render to the user as they play.

/*-------------------------------- Constants --------------------------------*/
const timer = setInterval(myWatch, 1000)

/*---------------------------- Variables (state) ----------------------------*/
let control
let bothKeys = 0
// keeps track setInterval function
var tracker = 0
var currentBars = []
let starAudio = new Audio('audio/beep.mp3')
let gameOverAudio = new Audio('audio/gameover.mp3')
/*------------------------ Cached Element References ------------------------*/
const ball = document.getElementById('ball')
const gameBox = document.getElementById('gamebox')
const message = document.getElementById('message')

/*----------------------------- Event Listeners -----------------------------*/

// E-L on keybored but only when user is pressing left arrow or right arrow
document.addEventListener('keydown', (e) => {
    if (bothKeys == 0) {
        bothKeys++
        // use keyCode: 37 = ArrowLeft
        if (e.keyCode === 37) {
            starAudio.play()
            control = setInterval(left, 1)
        }
        // use keyCode: 39 = ArrowRight
        if (e.keyCode === 39) {
            starAudio.play()
            control = setInterval(right, 1)
        }
    }
})

// add E-L so when keys are not in use or both keys are press in the sametime it stops the ball
document.addEventListener('keyup', (e) => {
    clearInterval(control)
    bothKeys=0
})

/*-------------------------------- Functions --------------------------------*/

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
    if (left < 360) {
        ball.style.left = left + 2 + 'px'
    }
}

// need to create an element div for the bar to render on the page.
// S-I function to render bar and gap continuously
let play = setInterval(function() {
    var lastBar = document.getElementById('bar' + (tracker - 1))
    var lastGap = document.getElementById('gap' + (tracker - 1))
    if (tracker > 0) {
        var topBar = parseInt(window.getComputedStyle(lastBar).getPropertyValue('top'))
        var topGap = parseInt(window.getComputedStyle(lastGap).getPropertyValue('top'))
    }
    if (topBar < 400 || tracker == 0 ) {
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
        gameOverAudio.play()
        message.innerHTML = `GAME OVER SCORE: ${tracker-9}`
        clearInterval(play)
    }
    // need to render the bars upward to the div gamebox with forloop
    for (let i = 0; i < currentBars.length; i++) {
        let current = currentBars[i]
        let ibar = document.getElementById('bar' + current)
        let igap = document.getElementById('gap' + current)
        let ibarTop = parseFloat(window.getComputedStyle(ibar).getPropertyValue('top'))
        let igapLeft = parseFloat(window.getComputedStyle(igap).getPropertyValue('left'))
        // render upward pace by px
        ibar.style.top = ibarTop - 0.6 + 'px'
        igap.style.top = ibarTop - 0.6 + 'px'
        if (ibarTop < -20) {
            currentBars.shift()
            ibar.remove()
            igap.remove()
        }
        // ball is on top then drop back to 0 
        if (ibarTop - 20 < ballTop && ibarTop > ballTop) {
            drop++
            if (igapLeft <= ballLeft && igapLeft + 20 >= ballLeft) {
                drop = 0
            }
        }
    }
    // if drop = 0 then it drops if not then it goes upward
    if (drop == 0) {
        // this prevents the ball to drop downward
        if (ballTop < 480) {
            ball.style.top = ballTop + 2 + 'px'
        }
    } else {
        ball.style.top = ballTop - 0.5 + 'px'
    }
}, 1)

// set my Interval for myTimer function for every 1 second.
// this is my time fucntion that renders on the page for the user. 
function myWatch() {
    let d = new Date()
    let t = d.toLocaleTimeString()
    document.getElementById('time').innerHTML = t
}

// hard reset button
function resetButton() {
    location.reload()
}