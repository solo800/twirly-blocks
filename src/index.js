import * as PIXI from 'pixi.js'
import { GAME_SIZE as gameSize } from './constants'
import Game from './Game'

// Render each tetromino so that we can test them
let game = []
// let i = 0
// while (i < 7) {
//     const testApp = new PIXI.Application({
//         width: gameSize * 8,
//         height: gameSize * 8,
//     })

//     document.body.appendChild(testApp.view)

//     const testGame = new Game({ stage: testApp.stage, startingTetromino: i })

//     game.push(testGame)

//     i++
// }

const app = new PIXI.Application({
    width: gameSize * 10,
    height: gameSize * 40,
})

document.body.appendChild(app.view)

game = new Game({ stage: app.stage })

game.render()

let level = 8
let lastMove
function render(time) {
    if (!game.tetrominos[0].active) {
        game.activateNewTetromino()
    }

    if (lastMove === undefined || time - lastMove >= 1000 / level) {
        lastMove = time
        moveGame('down', game)
    }

    requestAnimationFrame(render)
}

function startGame() {
    requestAnimationFrame(render)
}

function moveGame(moveType, game) {
    if (Array.isArray(game)) {
        game.forEach((g) => g.move(moveType))
    } else {
        game.move(moveType)
    }
}

document.onkeypress = (event) => {
    switch (event.code) {
        case 'KeyA':
            level++
            break
        case 'KeyS':
            // tetrominos[0].move('left')
            moveGame('left', game)
            break
        case 'KeyE':
            // tetrominos[0].rotate(-90)
            moveGame(-90, game)
            break
        case 'KeyR':
            // tetrominos[0].rotate(90)
            moveGame(90, game)
            break
        case 'KeyF':
            // tetrominos[0].move('right')
            moveGame('right', game)
            break
        case 'KeyD':
            // tetrominos[0].place()
            moveGame('place', game)
            break
        case 'Space':
            startGame()
            break
        default:
            console.log('key', event.code)
        // do nothing
    }
}
