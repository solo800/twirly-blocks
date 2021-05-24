import Rotator from '../src/Rotator';

let instance;
beforeEach(() => {
    instance = new Rotator();
});

describe('makeBackRotationTranslations', () => {
    it('should correctly map forward translation functions to back translation functions', () => {
        instance.forward = {
            I: [1, 2, 3, 4],
            J: [1, 2, 3, 4],
            L: [1, 2, 3, 4],
            O: [1, 2, 3, 4],
            S: [1, 2, 3, 4],
            T: [1, 2, 3, 4],
            Z: [1, 2, 3, 4],
        };

        const result = {
            I: [2, 3, 4, 1],
            J: [2, 3, 4, 1],
            L: [2, 3, 4, 1],
            O: [1, 2, 3, 4],
            S: [2, 3, 4, 1],
            T: [2, 3, 4, 1],
            Z: [2, 3, 4, 1],
        };

        expect(instance.makeBackRotationTranslations()).toEqual(result);
    });
});

const back = {
    I: [
        // Orientation 0
        [
            (coordinates) => rightTwo(downOne(coordinates)),
            (coordinates) => rightOne(coordinates),
            (coordinates) => upOne(coordinates),
            (coordinates) => leftOne(upTwo(coordinates)),
        ],
        // Orientation 3
        [
            (coordinates) => leftOne(downTwo(coordinates)),
            (coordinates) => downOne(coordinates),
            (coordinates) => rightOne(coordinates),
            (coordinates) => rightTwo(upOne(coordinates)),
        ],
        // Orientation 2
        [
            (coordinates) => leftTwo(upOne(coordinates)),
            (coordinates) => leftOne(coordinates),
            (coordinates) => downOne(coordinates),
            (coordinates) => rightOne(downTwo(coordinates)),
        ],
        // Orientation 1
        [
            (coordinates) => rightOne(upTwo(coordinates)),
            (coordinates) => upOne(coordinates),
            (coordinates) => leftOne(coordinates),
            (coordinates) => leftTwo(downOne(coordinates)),
        ],
    ],
    J: [
        // Orientation 0
        [
            (coordinates) => downTwo(coordinates),
            (coordinates) => rightDown(coordinates),
            (coordinates) => coordinates,
            (coordinates) => leftUp(coordinates),
        ],
        // Orientation 3
        [
            (coordinates) => leftTwo(coordinates),
            (coordinates) => leftDown(coordinates),
            (coordinates) => coordinates,
            (coordinates) => rightUp(coordinates),
        ],
        // Orientation 2
        [
            (coordinates) => upTwo(coordinates),
            (coordinates) => leftUp(coordinates),
            (coordinates) => coordinates,
            (coordinates) => rightDown(coordinates),
        ],
        // Orientation 1
        [
            (coordinates) => rightTwo(coordinates),
            (coordinates) => rightUp(coordinates),
            (coordinates) => coordinates,
            (coordinates) => leftDown(coordinates),
        ],
    ],
    L: [
        // Orientation 0
        [
            (coordinates) => rightDown(coordinates),
            (coordinates) => coordinates,
            (coordinates) => leftUp(coordinates),
            (coordinates) => leftTwo(coordinates),
        ],
        // Orientation 1
        [
            (coordinates) => leftDown(coordinates),
            (coordinates) => coordinates,
            (coordinates) => rightUp(coordinates),
            (coordinates) => upTwo(coordinates),
        ],
        // Orientation 2
        [
            (coordinates) => leftUp(coordinates),
            (coordinates) => coordinates,
            (coordinates) => rightDown(coordinates),
            (coordinates) => rightTwo(coordinates),
        ],
        // Orientation 3
        [
            (coordinates) => rightUp(coordinates),
            (coordinates) => coordinates,
            (coordinates) => leftDown(coordinates),
            (coordinates) => downTwo(coordinates),
        ],
    ],
    // O: OTranslations,
    S: [
        // Orientation 0
        [
            (coordinates) => rightDown(coordinates),
            (coordinates) => coordinates,
            (coordinates) => leftDown(coordinates),
            (coordinates) => leftTwo(coordinates),
        ],
        // Orientation 1
        [
            (coordinates) => leftDown(coordinates),
            (coordinates) => coordinates,
            (coordinates) => leftUp(coordinates),
            (coordinates) => upTwo(coordinates),
        ],
        // Orientation 2
        [
            (coordinates) => leftUp(coordinates),
            (coordinates) => coordinates,
            (coordinates) => rightUp(coordinates),
            (coordinates) => rightTwo(coordinates),
        ],
        // Orientation 3
        [
            (coordinates) => rightUp(coordinates),
            (coordinates) => coordinates,
            (coordinates) => rightDown(coordinates),
            (coordinates) => downTwo(coordinates),
        ],
    ],
    T: [
        // Orientation 0
        [
            (coordinates) => rightDown(coordinates),
            (coordinates) => coordinates,
            (coordinates) => leftDown(coordinates),
            (coordinates) => leftUp(coordinates),
        ],
        // Orientation 1
        [
            (coordinates) => leftDown(coordinates),
            (coordinates) => coordinates,
            (coordinates) => leftUp(coordinates),
            (coordinates) => rightUp(coordinates),
        ],
        // Orientation 2
        [
            (coordinates) => leftUp(coordinates),
            (coordinates) => coordinates,
            (coordinates) => rightUp(coordinates),
            (coordinates) => rightDown(coordinates),
        ],
        // Orientation 3
        [
            (coordinates) => rightUp(coordinates),
            (coordinates) => coordinates,
            (coordinates) => rightDown(coordinates),
            (coordinates) => leftDown(coordinates),
        ],
    ],
    Z: [
        // Orientation 0
        [
            (coordinates) => downTwo(coordinates),
            (coordinates) => leftDown(coordinates),
            (coordinates) => coordinates,
            (coordinates) => leftUp(coordinates),
        ],
        // Orientation 1
        [
            (coordinates) => leftTwo(coordinates),
            (coordinates) => leftUp(coordinates),
            (coordinates) => coordinates,
            (coordinates) => rightUp(coordinates),
        ],
        // Orientation 2
        [
            (coordinates) => upTwo(coordinates),
            (coordinates) => rightUp(coordinates),
            (coordinates) => coordinates,
            (coordinates) => rightDown(coordinates),
        ],
        // Orientation 3
        [
            (coordinates) => rightTwo(coordinates),
            (coordinates) => rightDown(coordinates),
            (coordinates) => coordinates,
            (coordinates) => leftDown(coordinates),
        ],
    ],
};
