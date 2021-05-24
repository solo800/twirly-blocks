import { TETROMINO_MAP as tetrominoMap } from './constants'
import Tetromino from './Tetromino'

export default class {
    constructor({ stage, startingTetromino }) {
        this.stage = stage

        this.startingTetromino = startingTetromino
        this.tetrominos = [this.getTetromino()]
    }

    getTetromino() {
        console.log('getting', this.startingTetromino)
        const tetro =
            undefined !== this.startingTetromino
                ? tetrominoMap[this.startingTetromino]
                : tetrominoMap[parseInt(Math.random() * tetrominoMap.length)]

        return new Tetromino({
            stage: this.stage,
            tetromino: tetro,
            // tetrominoMap[parseInt(Math.random() * tetrominoMap.length)],
            // startingCoordinatesTranslation: ([x, y]) => [x + 2, y + 2],
            // tetrominoMap[1],
        })
    }

    activateNewTetromino() {
        this.tetrominos.unshift(this.getTetromino())
    }

    move(type) {
        this.tetrominos[0].move(type)
    }

    render() {
        this.tetrominos[0].render()
    }
}
