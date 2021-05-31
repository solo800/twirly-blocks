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
        this.coordinates = this.getRotationCoordinates(type)

        this.orientation =
            type === -90
                ? this.backOrientationChange(this.orientation)
                : this.forwardOrientationChange(this.orientation)

        this.place()
    }

    getRotationCoordinates(type) {
        return this.rotator.getRotatedCoordinates({
            orientation: this.orientation,
            direction: type,
            name: this.tetrominoName,
            position: this.position,
            coordinates: this.coordinates,
        })
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
        this.place()
    }

    place(yOffset) {
        if (yOffset !== undefined) {
            const [x, y] = this.coordinates
            this.coordinates = [x, y + yOffset]
        }

        this.remove()
        this.makeShape({ render: true })
    }

    remove() {
        this.stage.removeChild(this.shape)
    }

    clear(gameSpeed) {
        const interval = setInterval(() => {
            const [x] = this.coordinates

            if (x > 4) {
                this.moveRight()
            } else {
                this.moveLeft()
            }

            if (x > 9 || x < 0) {
                clearInterval(interval)
                this.remove()
            }
        }, gameSpeed / 10)
    }

    render() {
        this.stage.addChild(this.shape)
    }
}
