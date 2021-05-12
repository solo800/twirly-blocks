import { calculateMinoLeft, calculateMinoTop } from "../src/components/App/Style";

describe("App Style", () => {
    const calcLeftMock = [
        [{ space: 1, gameSize: 10 }, 0],
        [{ space: 2, gameSize: 10 }, 10],
        [{ space: 11, gameSize: 10 }, 0],
        [{ space: 12, gameSize: 10 }, 10],
        [{ space: 399, gameSize: 10 }, 80],
        [{ space: 400, gameSize: 10 }, 90],
        [{ space: 1, gameSize: 20 }, 0],
        [{ space: 2, gameSize: 20 }, 20],
        [{ space: 11, gameSize: 20 }, 0],
        [{ space: 12, gameSize: 20 }, 20],
        [{ space: 399, gameSize: 20 }, 160],
        [{ space: 400, gameSize: 20 }, 180],
    ];
    describe("calculateMinoLeft", () => {
        it("should calculate the left property of minos correctly", () => {
            calcLeftMock.forEach(([testCase, result]) =>
                expect(calculateMinoLeft(testCase)).toBe(result)
            );
        });
    });

    describe("calculateMinoTop", () => {
        const calcTopMock = [
            [{ space: 1, gameSize: 10 }, 0],
            [{ space: 2, gameSize: 10 }, 0],
            [{ space: 11, gameSize: 10 }, 10],
            [{ space: 12, gameSize: 10 }, 10],
            [{ space: 399, gameSize: 10 }, 390],
            [{ space: 400, gameSize: 10 }, 390],
            [{ space: 1, gameSize: 20 }, 0],
            [{ space: 2, gameSize: 20 }, 0],
            [{ space: 11, gameSize: 20 }, 20],
            [{ space: 12, gameSize: 20 }, 20],
            [{ space: 399, gameSize: 20 }, 780],
            [{ space: 400, gameSize: 20 }, 780],
        ];

        it("should calculate the top property of minos correctly", () => {
            calcTopMock.forEach(([testCase, result]) =>
                expect(calculateMinoTop(testCase)).toBe(result)
            );
        });
    });
});
