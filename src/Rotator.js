/**
 * This module is a mapping of Tetromino name, rotational position, and mino position to the
 * function that will translate that mino's coordinates to the desired position
 */
export default class {
    constructor() {
        const none = (coordinates) => coordinates
        const downOne = ([x, y]) => [x, y + 1]
        const downTwo = ([x, y]) => [x, y + 2]
        const rightOne = ([x, y]) => [x + 1, y]
        const rightTwo = ([x, y]) => [x + 2, y]
        const leftOne = ([x, y]) => [x - 1, y]
        const leftTwo = ([x, y]) => [x - 2, y]
        const upOne = ([x, y]) => [x, y - 1]
        const upTwo = ([x, y]) => [x, y - 2]
        const rightDown = (coordinates) => rightOne(downOne(coordinates))
        const rightUp = (coordinates) => rightOne(upOne(coordinates))
        const leftDown = (coordinates) => leftOne(downOne(coordinates))
        const leftUp = (coordinates) => leftOne(upOne(coordinates))

        this.tetrominoNames = ['I', 'J', 'L', 'O', 'S', 'T', 'Z']

        const OTranslations = []

        let i = 0
        while (OTranslations.length < 4) {
            OTranslations.push([none, none, none, none])
        }

        this.forward = {
            I: [
                // Orientation 0
                [
                    (coordinates) => rightOne(upTwo(coordinates)),
                    (coordinates) => upOne(coordinates),
                    (coordinates) => leftOne(coordinates),
                    (coordinates) => leftTwo(downOne(coordinates)),
                ],
                // Orientation 1
                [
                    (coordinates) => rightTwo(downOne(coordinates)),
                    (coordinates) => rightOne(coordinates),
                    (coordinates) => upOne(coordinates),
                    (coordinates) => leftOne(upTwo(coordinates)),
                ],
                // Orientation 2
                [
                    (coordinates) => leftOne(downTwo(coordinates)),
                    (coordinates) => downOne(coordinates),
                    (coordinates) => rightOne(coordinates),
                    (coordinates) => rightTwo(upOne(coordinates)),
                ],
                // Orientation 3
                [
                    (coordinates) => leftTwo(upOne(coordinates)),
                    (coordinates) => leftOne(coordinates),
                    (coordinates) => downOne(coordinates),
                    (coordinates) => rightOne(downTwo(coordinates)),
                ],
            ],
            J: [
                // Orientation 0
                [
                    (coordinates) => rightTwo(coordinates),
                    (coordinates) => rightUp(coordinates),
                    (coordinates) => coordinates,
                    (coordinates) => leftDown(coordinates),
                ],
                // Orientation 1
                [
                    (coordinates) => downTwo(coordinates),
                    (coordinates) => rightDown(coordinates),
                    (coordinates) => coordinates,
                    (coordinates) => leftUp(coordinates),
                ],
                // Orientation 2
                [
                    (coordinates) => leftTwo(coordinates),
                    (coordinates) => leftDown(coordinates),
                    (coordinates) => coordinates,
                    (coordinates) => rightUp(coordinates),
                ],
                // Orientation 3
                [
                    (coordinates) => upTwo(coordinates),
                    (coordinates) => leftUp(coordinates),
                    (coordinates) => coordinates,
                    (coordinates) => rightDown(coordinates),
                ],
            ],
            L: [
                // Orientation 0
                [
                    (coordinates) => rightUp(coordinates),
                    (coordinates) => coordinates,
                    (coordinates) => leftDown(coordinates),
                    (coordinates) => downTwo(coordinates),
                ],
                // Orientation 1
                [
                    (coordinates) => rightDown(coordinates),
                    (coordinates) => coordinates,
                    (coordinates) => leftUp(coordinates),
                    (coordinates) => leftTwo(coordinates),
                ],
                // Orientation 2
                [
                    (coordinates) => leftDown(coordinates),
                    (coordinates) => coordinates,
                    (coordinates) => rightUp(coordinates),
                    (coordinates) => upTwo(coordinates),
                ],
                // Orientation 3
                [
                    (coordinates) => leftUp(coordinates),
                    (coordinates) => coordinates,
                    (coordinates) => rightDown(coordinates),
                    (coordinates) => rightTwo(coordinates),
                ],
            ],
            O: OTranslations,
            S: [
                // Orientation 0
                [
                    (coordinates) => rightUp(coordinates),
                    (coordinates) => coordinates,
                    (coordinates) => rightDown(coordinates),
                    (coordinates) => downTwo(coordinates),
                ],
                // Orientation 1
                [
                    (coordinates) => rightDown(coordinates),
                    (coordinates) => coordinates,
                    (coordinates) => leftDown(coordinates),
                    (coordinates) => leftTwo(coordinates),
                ],
                // Orientation 2
                [
                    (coordinates) => leftDown(coordinates),
                    (coordinates) => coordinates,
                    (coordinates) => leftUp(coordinates),
                    (coordinates) => upTwo(coordinates),
                ],
                // Orientation 3
                [
                    (coordinates) => leftUp(coordinates),
                    (coordinates) => coordinates,
                    (coordinates) => rightUp(coordinates),
                    (coordinates) => rightTwo(coordinates),
                ],
            ],
            T: [
                // Orientation 0
                [
                    (coordinates) => rightUp(coordinates),
                    (coordinates) => coordinates,
                    (coordinates) => rightDown(coordinates),
                    (coordinates) => leftDown(coordinates),
                ],
                // Orientation 1
                [
                    (coordinates) => rightDown(coordinates),
                    (coordinates) => coordinates,
                    (coordinates) => leftDown(coordinates),
                    (coordinates) => leftUp(coordinates),
                ],
                // Orientation 2
                [
                    (coordinates) => leftDown(coordinates),
                    (coordinates) => coordinates,
                    (coordinates) => leftUp(coordinates),
                    (coordinates) => rightUp(coordinates),
                ],
                // Orientation 3
                [
                    (coordinates) => leftUp(coordinates),
                    (coordinates) => coordinates,
                    (coordinates) => rightUp(coordinates),
                    (coordinates) => rightDown(coordinates),
                ],
            ],
            Z: [
                // Orientation 0
                [
                    (coordinates) => rightTwo(coordinates),
                    (coordinates) => rightDown(coordinates),
                    (coordinates) => coordinates,
                    (coordinates) => leftDown(coordinates),
                ],
                // Orientation 1
                [
                    (coordinates) => downTwo(coordinates),
                    (coordinates) => leftDown(coordinates),
                    (coordinates) => coordinates,
                    (coordinates) => leftUp(coordinates),
                ],
                // Orientation 2
                [
                    (coordinates) => leftTwo(coordinates),
                    (coordinates) => leftUp(coordinates),
                    (coordinates) => coordinates,
                    (coordinates) => rightUp(coordinates),
                ],
                // Orientation 3
                [
                    (coordinates) => upTwo(coordinates),
                    (coordinates) => rightUp(coordinates),
                    (coordinates) => coordinates,
                    (coordinates) => rightDown(coordinates),
                ],
            ],
        }

        this.translations = {
            forward: this.forward,
            back: this.makeBackRotationTranslations(),
        }
    }

    makeBackRotationTranslations() {
        const { forward } = this

        return this.tetrominoNames.reduce((back, name) => {
            if (name === 'O') {
                // back[name] = forward[name]
                return Object.assign(back, { [name]: forward[name] })
            }

            return Object.assign(back, {
                [name]: [...forward[name].slice(1), forward[name][0]],
            })
        }, {})
    }

    translateDirection(direction) {
        const backStr = 'back'
        const forwardStr = 'forward'

        switch (direction) {
            case -90:
            case 'back':
                return backStr
            case 90:
            case 'forward':
                return forwardStr
        }
    }

    getRotatedCoordinates({
        direction,
        name,
        orientation,
        position,
        coordinates,
    }) {
        let translationFn

        try {
            translationFn =
                this.translations[this.translateDirection(direction)][name][
                    orientation
                ][position]
        } catch (err) {
            console.warn(
                'error getting translation dir:',
                direction,
                'name:',
                name,
                'orient:',
                orientation,
                'pos:',
                position
            )

            return coordinates
        }

        return translationFn(coordinates)
    }
}
