import App from './components/App'
import Mino from './components/Mino'
import createNextGameSpace from './createNextGameSpace'
import makeGlobalStyle from './globalStyle'

const GAME_SIZE = 20
const TETROMINO_MAP = [
    ['I', [4, 5, 6, 7]],
    ['O', [5, 6, 15, 16]],
    ['T', [4, 5, 6, 15]],
    ['S', [5, 6, 14, 15]],
    ['Z', [4, 5, 15, 16]],
    ['J', [5, 15, 25, 24]],
    ['L', [5, 15, 25, 26]],
]

document.head.appendChild(makeGlobalStyle({ gameSize: GAME_SIZE }))

const root = document.getElementById('root')

const AppElem = App({ gameSize: GAME_SIZE })

root.appendChild(AppElem)

const tetrominos = []
let mino = 1
while (mino <= 400) {
    tetrominos.push(mino)
}

const i = setInterval(() => {
    // if (count++ === 1) {
    //     clearInterval(i)
    // }
    // console.log('setting', gameSpace.size)

    console.log('tetrominos', tetrominos)
    placeMinos({ AppElem, gameSize: GAME_SIZE, tetrominos })
}, 3000)
