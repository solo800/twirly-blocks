import Mino from './Mino'
// import Rotator from './Rotator'

export default class Tetromino {
    constructor({
        stage,
        tetromino,
        active = true,
        startingCoordinatesTranslation,
    }) {
        const { name, color, coordinates } = tetromino

        this.orientation = 0
        this.name = name
        this.active = active
        this.stage = stage

        const translation =
            typeof startingCoordinatesTranslation === 'function'
                ? startingCoordinatesTranslation
                : ([x, y]) => [x + 3, y]

        const minos = []
        coordinates.forEach((coordinates, i) => {
            minos.push(
                new Mino({
                    stage,
                    color,
                    coordinates: coordinates,
                    coordinates: translation(coordinates),
                    orientation: this.orientation,
                    tetrominoName: this.name,
                    position: i,
                })
            )
        })

        this.minos = minos
    }

    move(type) {
        // debounce(this.debouncedMove.call(this, type), true)
        switch (type) {
            case 'down':
                // console.log('moving down')
                this.minos.forEach((m) => m.moveDown())
                break
            case 'left':
                // console.log('moving left')
                this.minos.forEach((m) => m.moveLeft())
                break
            case 'right':
                // console.log('moving right')
                this.minos.forEach((m) => m.moveRight())
                break
            case -90:
            case 90:
                // console.log('rotating', type)
                this.minos.forEach((m) => m.rotate(type))
                break
            default:
                console.log('do nothing')
        }
    }

    getRotationCoordinates(type) {
        return this.minos.map((m) => m.getRotationCoordinates(type))
    }

    place(yOffset) {
        this.minos.forEach((m) => m.place(yOffset))
    }

    render() {
        this.minos.forEach((m) => m.render(this.stage))
    }
}
