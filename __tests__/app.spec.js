import { validPlacement, createNextGameSpace } from '../src/createNextGameSpace';

function makeGameSpaceMapMock(rows, columns) {
    const spaceMap = new Map();

    let row = 0;
    let column = 0;
    while (row < rows) {
        while (column < columns) {
            spaceMap.set(row * 10 + (1 + column), false);
            column++;
        }

        column = 0;
        row++;
    }

    return spaceMap;
}

describe('makeGameSpaceMapMock', () => {
    it('should make a single row game space correctly', () => {
        expect(makeGameSpaceMapMock(1, 3)).toEqual(
            new Map([
                [1, false],
                [2, false],
                [3, false],
            ])
        );
    });

    it('should make a multi-row game space correctly', () => {
        expect(makeGameSpaceMapMock(3, 3)).toEqual(
            new Map([
                [1, false],
                [2, false],
                [3, false],
                [11, false],
                [12, false],
                [13, false],
                [21, false],
                [22, false],
                [23, false],
            ])
        );
    });

    it('should make a single-column game space correctly', () => {
        expect(makeGameSpaceMapMock(3, 1)).toEqual(
            new Map([
                [1, false],
                [11, false],
                [21, false],
            ])
        );
    });
});

describe('validPlacement', () => {
    let gameSpaceMapMock;

    beforeEach(() => {
        gameSpaceMapMock = new Map([
            [1, false],
            [2, false],
            [3, false],
            [4, false],
            [5, false],
            [6, false],
            [7, false],
            [8, false],
        ]);
    });
    it('should correctly identify a valid move.', () => {
        expect(validPlacement(gameSpaceMapMock, [3, 4, 5, 6])).toBe(true);

        gameSpaceMapMock.set(1, true);
        gameSpaceMapMock.set(7, true);

        expect(validPlacement(gameSpaceMapMock, [3, 4, 5, 6])).toBe(true);
        expect(validPlacement(gameSpaceMapMock, [2, 8])).toBe(true);

        gameSpaceMapMock.set(17, true);
        gameSpaceMapMock.set(27, true);

        expect(validPlacement(gameSpaceMapMock, [2, 8])).toBe(true);
    });

    it('should correctly identify an invalid move.', () => {
        gameSpaceMapMock.set(4, true);
        expect(validPlacement(gameSpaceMapMock, [3, 4, 5, 6])).toBe(false);

        gameSpaceMapMock.set(14, true);
        expect(validPlacement(gameSpaceMapMock, [3, 14, 5, 6])).toBe(false);
    });

    it("should log a warning when the game space map doesn't have the space the mino is trying to move to and return false.", () => {
        const consoleMock = jest.spyOn(console, 'warn').mockImplementation(() => {});

        expect(validPlacement(gameSpaceMapMock, [9])).toBe(false);
        expect(consoleMock).toHaveBeenCalledWith(
            'Error in valid placement',
            9,
            'is not in the gameSpaceMap',
            gameSpaceMapMock
        );
    });
});

describe('createNextGameSpace', () => {
    let gameSpaceMapMock;
    let resultSpaceMapMock;

    beforeEach(() => {
        gameSpaceMapMock = makeGameSpaceMapMock(2, 10);
        resultSpaceMapMock = new Map(Array.from(gameSpaceMapMock));
    });

    it('should add tetrominos to the board', () => {
        resultSpaceMapMock.set(3, true);
        resultSpaceMapMock.set(4, true);
        resultSpaceMapMock.set(5, true);
        resultSpaceMapMock.set(6, true);
        expect(createNextGameSpace(gameSpaceMapMock, [3, 4, 5, 6])).toEqual(resultSpaceMapMock);
    });

    it('should move tetrominos "down" the board one space.', () => {
        gameSpaceMapMock.set(3, true);
        gameSpaceMapMock.set(4, true);
        gameSpaceMapMock.set(5, true);
        gameSpaceMapMock.set(6, true);

        resultSpaceMapMock.set(13, true);
        resultSpaceMapMock.set(14, true);
        resultSpaceMapMock.set(15, true);
        resultSpaceMapMock.set(16, true);
        expect(createNextGameSpace(gameSpaceMapMock, [])).toEqual(resultSpaceMapMock);

        // Use a more narrow game space mock so that we can easily track the movement in our mocks.
        const narrowGSMock = makeGameSpaceMapMock(4, 4);
        const resultNarrowGSMock = new Map(Array.from(narrowGSMock));

        resultNarrowGSMock.set(1, true);
        resultNarrowGSMock.set(2, true);
        resultNarrowGSMock.set(13, true);
        resultNarrowGSMock.set(14, true);
        resultNarrowGSMock.set(33, true);
        resultNarrowGSMock.set(34, true);

        let nextSpaceMap = createNextGameSpace(narrowGSMock, [3, 4]);
        nextSpaceMap = createNextGameSpace(nextSpaceMap, []);
        nextSpaceMap = createNextGameSpace(nextSpaceMap, [3, 4]);
        nextSpaceMap = createNextGameSpace(nextSpaceMap, [1, 2]);

        expect(nextSpaceMap).toEqual(resultNarrowGSMock);
    });
});
