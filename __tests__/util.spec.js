import {
    reduceTetrominoCoordinates,
    isValidDownMove,
    isValidLeftMove,
    isValidRightMove,
} from '../src/util';

describe('util', () => {
    describe('reduceTetrominoCoordinates', () => {
        it('should correctly extrace all mino coordinates into array', () => {
            expect(
                reduceTetrominoCoordinates({
                    minos: [{ coordinates: [1, 2] }, { coordinates: [7, 11] }],
                })
            ).toEqual([
                [1, 2],
                [7, 11],
            ]);
        });
    });

    describe('isValidDownMove', () => {
        it('should correctly check all active coordinate sets do not collide with inactive coordinate sets if all active coordinates move down one on the y axis', () => {
            expect(
                isValidDownMove(
                    [
                        [1, 1],
                        [2, 1],
                        [3, 1],
                        [4, 1],
                    ],
                    [
                        [1, 3],
                        [2, 3],
                        [3, 3],
                        [4, 3],
                    ]
                )
            ).toBe(true);

            expect(
                isValidDownMove(
                    [
                        [1, 1],
                        [2, 1],
                        [3, 1],
                        [4, 1],
                    ],
                    [
                        [1, 3],
                        // This coordinate should fail
                        [2, 2],
                        [3, 3],
                        [4, 3],
                    ]
                )
            ).toBe(false);
        });
    });

    describe('isValidLeftMove', () => {
        it('should correctly check all active coordinate sets do not collide with inactive coordinate sets if all active coordinates move left one on the x axis', () => {
            expect(
                isValidLeftMove(
                    [
                        [5, 1],
                        [6, 1],
                        [7, 1],
                        [8, 1],
                    ],
                    [
                        [0, 1],
                        [1, 1],
                        [2, 1],
                        [3, 1],
                    ]
                )
            ).toBe(true);

            expect(
                isValidLeftMove(
                    [
                        // This coordinate should fail
                        [4, 1],
                        [5, 1],
                        [6, 1],
                        [7, 1],
                    ],
                    [
                        [1, 1],
                        [2, 1],
                        [3, 1],
                        [4, 1],
                    ]
                )
            ).toBe(false);
        });
    });

    describe('isValidRightMove', () => {
        it('should correctly check all active coordinate sets do not collide with inactive coordinate sets if all active coordinates move right one on the x axis', () => {
            expect(
                isValidRightMove(
                    [
                        [0, 1],
                        [1, 1],
                        [2, 1],
                        [3, 1],
                    ],
                    [
                        [5, 1],
                        [6, 1],
                        [7, 1],
                        [8, 1],
                    ]
                )
            ).toBe(true);

            expect(
                isValidRightMove(
                    [
                        [1, 1],
                        [2, 1],
                        [3, 1],
                        // This coordinate should fail
                        [4, 1],
                    ],
                    [
                        [5, 1],
                        [6, 1],
                        [7, 1],
                        [8, 1],
                    ]
                )
            ).toBe(false);
        });
    });
});
