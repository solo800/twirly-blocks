const TETROMINO_MAP = [
    {
        name: 'I',
        coordinates: [
            [0, 0],
            [1, 0],
            [2, 0],
            [3, 0],
        ],
        color: 0x01f0f1,
    },
    {
        name: 'J',
        coordinates: [
            [0, 0],
            [0, 1],
            [1, 1],
            [2, 1],
        ],
        color: 0x2200ee,
    },
    {
        name: 'L',
        coordinates: [
            [0, 1],
            [1, 1],
            [2, 1],
            [2, 0],
        ],
        color: 0xefa000,
    },
    {
        name: 'O',
        coordinates: [
            [0, 0],
            [0, 1],
            [1, 0],
            [1, 1],
        ],
        color: 0xf0f000,
    },
    {
        name: 'S',
        coordinates: [
            [0, 1],
            [1, 1],
            [1, 0],
            [2, 0],
        ],
        color: 0x02f004,
    },
    {
        name: 'T',
        coordinates: [
            [0, 1],
            [1, 1],
            [1, 0],
            [2, 1],
        ],
        color: 0xa000f2,
    },
    {
        name: 'Z',
        coordinates: [
            [0, 0],
            [1, 0],
            [1, 1],
            [2, 1],
        ],
        color: 0xf01a00,
    },
]

const TETROMINO_COLORS = [
    0x01f0f1, // aqua
    0x2200ee, // blue
    0xefa000, // orange
    0xf0f000, // yellow
    0x02f004, // green
    0xa000f2, // purple
    0xf01a00, // red
]

const GAME_SIZE = 20

// const GAME_LEVELS = [1000, 750, 500, 350, 250, 200, 175, 150, 125, 100]
const GAME_LEVELS = [800]

let i = 1
while (i < 9) {
    GAME_LEVELS.push(parseInt(GAME_LEVELS.slice(-1)[0] * 0.75))
    i++
}

export { TETROMINO_MAP, TETROMINO_COLORS, GAME_SIZE, GAME_LEVELS }
