import * as PIXI from 'pixi.js'
import { GAME_SIZE as gameSize } from './constants'
import Rotator from './Rotator'

export default class Mino {
    constructor({
        stage,
        coordinates,
        color,
        tetrominoName,
        orientation,
        position,
    }) {
        const rotator = new Rotator()
        this.rotator = rotator
        this.stage = stage
        this.tetrominoName = tetrominoName
        this.orientation = orientation
        this.position = position
        this.coordinates = coordinates
        this.color = color
        this.makeShape({ render: true })
    }

    makeShape({ render }) {
        const [x, y] = this.coordinates

        const shape = new PIXI.Graphics()

        shape.beginFill(this.color)
        shape.lineStyle(1, 0x000000)

        // Draw a box to the scale of one unit of the game
        shape.moveTo(x * gameSize, y * gameSize)
        shape.lineTo((x + 1) * gameSize, y * gameSize)
        shape.lineTo((x + 1) * gameSize, (y + 1) * gameSize)
        shape.lineTo(x * gameSize, (y + 1) * gameSize)

        shape.closePath()
        shape.endFill()

        this.shape = shape

        if (render) {
            this.render()
        }
    }

    backOrientationChange(currentOrientation) {
        return currentOrientation === 0 ? 3 : currentOrientation - 1
    }

    forwardOrientationChange(currentOrientation) {
        return currentOrientation === 3 ? 0 : currentOrientation + 1
    }

    rotate(type) {
        console.log('in mino rotate', type)

        const { orientation } = this

        this.coordinates = this.rotator.getRotatedCoordinates({
            orientation,
            direction: type,
            name: this.tetrominoName,
            position: this.position,
            coordinates: this.coordinates,
        })

        this.orientation =
            type === -90
                ? this.backOrientationChange(orientation)
                : this.forwardOrientationChange(orientation)

        this.remove()
        this.makeShape({ render: true })
    }

    lateralMove(direction) {
        switch (direction) {
            case 'left':
                this.coordinates[0]--
                break
            case 'right':
                this.coordinates[0]++
                break
            default:
                console.warn(
                    `Uh oh, did not recognize direction in Mino lateral move direction received ${direction}`
                )
        }

        this.remove()
        this.makeShape({ render: true })
    }

    moveLeft() {
        this.lateralMove('left')
    }

    moveRight() {
        this.lateralMove('right')
    }

    moveDown() {
        this.coordinates[1]++

        this.remove()

        this.makeShape({ render: true })
    }

    remove() {
        this.stage.removeChild(this.shape)
    }

    render() {
        this.stage.addChild(this.shape)
    }
}
