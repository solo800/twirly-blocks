import * as PIXI from 'pixi.js'
import { debounce } from 'debounce'
import { GAME_SIZE as gameSize, GAME_LEVELS as gameLevels } from './constants'
import Game from './Game'

const app = new PIXI.Application({
    width: gameSize * 10,
    height: gameSize * 40,
})

// function t(arg) {
//     console.log('arg', arg, 'called', performance.now())
// }

// const deb = debounce(t, 200)

// setInterval(() => {
//     console.log('interval')
//     deb()
// }, 100)

document.body.appendChild(app.view)

const game = new Game({ stage: app.stage })

game.render()
console.log('gameLevels', gameLevels)

let level = 1

const levelStr = 'Level: '
const levelElem = document.createElement('h1')
levelElem.innerHTML = `${levelStr}${level}`
document.body.appendChild(levelElem)

let pause = false
let gameActive = false
let lastMove
function render(time) {
    // if (!gameActive) {
    //     return
    // } else {

    // }

    if (!game.tetrominos[0].active) {
        if (!game.getInactiveTetrominoCoords().some(([x, y]) => y <= 1)) {
            game.activateNewTetromino()
        } else {
            gameActive = false
        }
    }

    if (
        parseInt(levelElem.innerHTML.replace(levelStr, '')) !== level &&
        gameLevels[level] !== undefined
    ) {
        levelElem.innerHTML = `${levelStr}${level}`
    } else if (gameLevels.length <= level) {
        console.log('need to reset levels')
        level--
    }

    if (
        gameActive &&
        (lastMove === undefined || time - lastMove > gameLevels[level])
    ) {
        lastMove = time
        moveGame('down', game)
    }

    requestAnimationFrame(render)
}

function startGame() {
    gameActive = true
    requestAnimationFrame(render)
}

// Main purpose of this function is so that when we're testing non-realistic game scenarios where
// multiple games have been rendered a move can be applied to each one.
let pauseTimeout
function moveGame(moveType, game) {
    if (Array.isArray(game)) {
        game.forEach((g) => g.move(moveType))
    } else {
        game.move(moveType)
    }

    const lineClearSpeed = gameLevels[level] > 250 ? gameLevels[level] : 250

    pause = game.checkLineClear(lineClearSpeed)

    if (pause && pauseTimeout === undefined) {
        gameActive = false
        pauseTimeout = setTimeout(() => {
            console.log('pause end')
            pauseTimeout = undefined
            pause = false
            gameActive = true
        }, lineClearSpeed)
    }
}

document.onkeydown = debounce((event) => {
    switch (event.code) {
        case 'KeyA':
            level--
            console.log('down new level', level)
            break
        case 'KeyQ':
            level++
            console.log('up new level', level)
            break
        case 'KeyS':
            moveGame('left', game)
            break
        case 'KeyE':
            moveGame(-90, game)
            break
        case 'KeyR':
            moveGame(90, game)
            break
        case 'KeyF':
            moveGame('right', game)
            break
        case 'KeyD':
            moveGame('down', game)
            break
        case 'KeyC':
            moveGame('place', game)
            break
        case 'Space':
            console.log('space pressed', gameActive)
            if (!gameActive) {
                console.log('starting game')
                startGame()
            } else {
                console.log('end game')
                gameActive = false
            }
            break
        default:
            console.log('key', event.code)
        // do nothing
    }
}, 20)
