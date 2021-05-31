import { debounce } from 'debounce'
import {
    isValidDownMove,
    reduceTetrominoCoordinates,
    isValidLeftMove,
    isValidRightMove,
    coordinateMatchesExist,
} from './util'
import { TETROMINO_MAP as tetrominoMap } from './constants'
import Tetromino from './Tetromino'
import Rotator from './Rotator'

export default class {
    constructor({ stage, startingTetromino }) {
        this.rotator = new Rotator()
        this.stage = stage

        this.inactiveMinos = []
        this.startingTetromino = startingTetromino
        this.tetrominos = [this.getTetromino()]

        this.tetrominos.push(
            new Tetromino({
                stage,
                active: false,
                tetromino: tetrominoMap[0],
                startingCoordinatesTranslation: ([x, y]) => [x, y + 39],
            }),
            new Tetromino({
                stage,
                active: false,
                tetromino: tetrominoMap[0],
                startingCoordinatesTranslation: ([x, y]) => [x + 4, y + 39],
            }),
            new Tetromino({
                stage,
                active: false,
                tetromino: tetrominoMap[3],
                startingCoordinatesTranslation: ([x, y]) => [x, y + 37],
            }),
            new Tetromino({
                stage,
                active: false,
                tetromino: tetrominoMap[2],
                startingCoordinatesTranslation: ([x, y]) => [x + 2, y + 37],
            }),
            new Tetromino({
                stage,
                active: false,
                tetromino: tetrominoMap[3],
                startingCoordinatesTranslation: ([x, y]) => [x + 5, y + 37],
            }),
            new Tetromino({
                stage,
                active: false,
                tetromino: tetrominoMap[3],
                startingCoordinatesTranslation: ([x, y]) => [x + 8, y + 38],
            })
            // new Tetromino({
            //     stage,
            //     active: false,
            //     tetromino: tetrominoMap[0],
            //     startingCoordinatesTranslation: ([x, y]) => [x + 8, y + 38],
            // }),
        )

        const vertBlue = new Tetromino({
            stage,
            active: false,
            tetromino: tetrominoMap[0],
            startingCoordinatesTranslation: ([x, y]) => [x + 6, y + 37],
        })
        vertBlue.move(90)

        this.tetrominos.push(vertBlue)
    }

    getTetromino() {
        const tetro =
            undefined !== this.startingTetromino
                ? tetrominoMap[this.startingTetromino]
                : tetrominoMap[parseInt(Math.random() * tetrominoMap.length)]

        return new Tetromino({
            stage: this.stage,
            tetromino: tetro,
        })
    }

    activateNewTetromino() {
        this.inactiveMinos.push(...this.tetrominos[0].minos)
        this.tetrominos[0].active = false
        this.tetrominos.unshift(this.getTetromino())
    }

    getInactiveTetrominoCoords() {
        return this.tetrominos.slice(1).reduce((all, tetromino) => {
            return all.concat(reduceTetrominoCoordinates(tetromino))
        }, [])
    }

    isValidMove(type) {
        const [activeTetromino] = this.tetrominos
        const activeTetrominoCoords =
            reduceTetrominoCoordinates(activeTetromino)

        const inactiveTetrominoCoords = this.getInactiveTetrominoCoords()

        switch (type) {
            case 'down':
                return (
                    activeTetrominoCoords.every(([x, y]) => y < 39) &&
                    isValidDownMove(
                        activeTetrominoCoords,
                        inactiveTetrominoCoords
                    )
                )
            case 'left':
                return (
                    activeTetrominoCoords.every(([x]) => x > 0) &&
                    isValidLeftMove(
                        activeTetrominoCoords,
                        inactiveTetrominoCoords
                    )
                )
            case 'right':
                return (
                    activeTetrominoCoords.every(([x]) => x < 9) &&
                    isValidRightMove(
                        activeTetrominoCoords,
                        inactiveTetrominoCoords
                    )
                )
            case -90:
            case 90:
                return coordinateMatchesExist(
                    activeTetromino.getRotationCoordinates(type),
                    inactiveTetrominoCoords
                )
            case 'place':
            default:
                console.warn('unknown move', type)
                return true
        }
    }

    placeActiveTetromino() {
        const activeTetrominoCoords = reduceTetrominoCoordinates(
            this.tetrominos[0]
        )

        const activeColumnsOccupied = activeTetrominoCoords.map(([x]) => x)

        const inactiveTetrominoCoords =
            this.getInactiveTetrominoCoords().filter(([x]) => {
                // Only get spaces filled that are in the same column
                return activeColumnsOccupied.includes(x)
            })

        if (inactiveTetrominoCoords.length === 0) {
            // Get the largest y value
            const bottomMinoY = activeTetrominoCoords.reduce(
                (largestY, [x, y]) => {
                    return largestY > y ? largestY : y
                },
                0
            )

            this.tetrominos[0].place(39 - bottomMinoY)
            return
        }

        // Move down the y axes for all minos until we hit an occupied space
        let spacesDown = 0
        let isValid = true
        while (isValid && spacesDown < 40) {
            isValid = activeTetrominoCoords.every(([x, y]) => {
                return inactiveTetrominoCoords.every(([inactX, inactY]) => {
                    return !(x === inactX && y + spacesDown >= inactY)
                })
            })

            spacesDown++
        }

        this.tetrominos[0].place(spacesDown - 2)
    }

    move(type) {
        const valid = this.isValidMove(type)

        if (!valid && type === 'down') {
            this.tetrominos[0].active = false
        } else if (valid && type === 'place') {
            this.placeActiveTetromino()
        } else if (valid) {
            this.tetrominos[0].move(type)
        } else {
            console.log('invalid move', valid)
        }
    }

    moveMinosAfterLineClear(lineClears) {
        // console.log('calling move')
        let iters = 0
        this.tetrominos.forEach(({ minos }) => {
            lineClears.forEach((lineNumber) => {
                minos.forEach((mino) => {
                    iters++
                    if (lineNumber <= mino.coordinates[1]) {
                        // console.log('moving down', mino.coordinates)
                        mino.moveDown()
                    }
                })
            })
        })
        // console.log('iters', iters)
    }

    checkLineClear(gameSpeed) {
        // Sort by y coordinates
        const lineClears = []
        const yMap = new Map()
        this.tetrominos.forEach(({ minos }) => {
            minos.forEach(({ coordinates }) => {
                const [x, y] = coordinates
                if (yMap.has(y)) {
                    yMap.get(y).push(coordinates)
                } else {
                    yMap.set(y, [coordinates])
                }
                if (yMap.get(y).length >= 10) {
                    lineClears.push(y)
                }
            })
        })

        lineClears.sort()

        // Rebuild tetrominos with references to minos to be cleared in one array and minos to be
        // moved down in another
        if (lineClears.length > 0) {
            const toClear = []
            const toMoveDown = []

            this.tetrominos = this.tetrominos.map((tetromino) => {
                // Remove minos to clear
                tetromino.minos = tetromino.minos.filter((mino) => {
                    const { coordinates } = mino
                    const [x, y] = coordinates

                    if (lineClears.includes(y)) {
                        toClear.push(mino)
                        return false
                    } else if (
                        y < lineClears.slice(-1)[0] &&
                        !tetromino.active
                    ) {
                        // This mino is above at least one line clear
                        toMoveDown.push(mino)
                    }

                    return true
                })

                return tetromino
            })

            toClear.forEach((m) => m.clear(gameSpeed))
            toMoveDown.forEach((m) => m.place(lineClears.length))

            return true
        }
        return false
    }

    render() {
        this.tetrominos[0].render()
    }
}
