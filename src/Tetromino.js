import { debounce } from 'debounce'
import Mino from './Mino'
import Rotator from './Rotator'

export default class Tetromino {
    constructor({
        stage,
        tetromino,
        active = true,
        startingCoordinatesTranslation,
    }) {
        const rotator = new Rotator()
        this.rotator = rotator
        const { name, color, coordinates } = tetromino

        this.orientation = 0
        this.name = name
        this.active = active
        this.stage = stage

        const colors = [
            0xe51b67, 0xe6fca6, 0x26dd66, 0xf8f50f,
            // `0x${Math.floor(Math.random() * 16777215).toString(16)}`,
            // `0x${Math.floor(Math.random() * 16777215).toString(16)}`,
            // `0x${Math.floor(Math.random() * 16777215).toString(16)}`,
            // `0x${Math.floor(Math.random() * 16777215).toString(16)}`,
        ]

        const translation =
            typeof startingCoordinatesTranslation === 'function'
                ? startingCoordinatesTranslation
                : ([x, y]) => [x + 3, y]

        const minos = []
        coordinates.forEach((coordinates, i) => {
            minos.push(
                new Mino({
                    stage,
                    coordinates: coordinates,
                    coordinates: translation(coordinates),
                    color,
                    // color: colors[i],
                    orientation: this.orientation,
                    tetrominoName: this.name,
                    position: i,
                })
            )
        })

        this.minos = minos
    }

    _validationRules(coords, moveType) {
        const [x, y] = coords

        switch (moveType) {
            case 'down':
                return y < 39
            case 'left':
                // The left border is perfectly divisible by 10
                return x > 0
            case 'right':
                // The right border is perfectly divisible by 9
                return x < 9
            case -90:
                const m = this.minos[0]

                const newCoords = this.rotator.getRotatedCoordinates({
                    direction: moveType,
                    name: m.tetrominoName,
                    orientation: m.orientation,
                    position: m.position,
                    coordinates: m.coordinates,
                })
                return true
            case 90:
                return true
            default:
                console.log('_validationRules move type is', moveType)
                return true
        }
    }

    validMove(moveType) {
        return this.minos.every((mino) => {
            return this._validationRules(mino.coordinates, moveType)
        })
    }

    move(type) {
        debounce(this.debouncedMove.call(this, type), true)
    }

    debouncedMove(type) {
        const valid = this.validMove(type)

        if (!valid && type === 'down') {
            this.active = false
        }

        if (valid) {
            switch (type) {
                case 'down':
                    console.log('moving down')
                    this.minos.forEach((m) => m.moveDown())
                    break
                case 'left':
                    console.log('moving left')
                    this.minos.forEach((m) => m.moveLeft())
                    break
                case 'right':
                    console.log('moving right')
                    this.minos.forEach((m) => m.moveRight())
                    break
                case -90:
                case 90:
                    console.log('rotating', type)
                    this.minos.forEach((m) => m.rotate(type))
                    break
                default:
                    console.log('do nothing')
            }
        } else {
            console.log(
                'invalid move',
                type,
                'minos',
                this.minos.map(({ coordinates }) => coordinates).join(', ')
            )
        }
    }

    place() {
        console.log('placing')
    }

    render() {
        this.minos.forEach((m) => m.render(this.stage))
    }
}
