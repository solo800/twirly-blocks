const reduceTetrominoCoordinates = ({ minos }) => {
    return minos.reduce((all, mino) => {
        return all.concat([mino.coordinates])
    }, [])
}

const coordinateMatchesExist = (activeCoords, inactiveCoords) => {
    return inactiveCoords.every(([x, y]) => {
        return activeCoords.every(([newX, newY]) => {
            return !(newX === x && newY === y)
        })
    })
}

const isValidDownMove = (activeCoords, inactiveCoords) => {
    // Translate all active coords down one on y axis
    const newActiveCoords = activeCoords.map(([x, y]) => [x, y + 1])
    return coordinateMatchesExist(newActiveCoords, inactiveCoords)
}

const isValidLeftMove = (activeCoords, inactiveCoords) => {
    // Translate all active coords left one
    const newActiveCoords = activeCoords.map(([x, y]) => [x - 1, y])
    return coordinateMatchesExist(newActiveCoords, inactiveCoords)
}

const isValidRightMove = (activeCoords, inactiveCoords) => {
    // Translate all active coords right one
    const newActiveCoords = activeCoords.map(([x, y]) => [x + 1, y])
    return coordinateMatchesExist(newActiveCoords, inactiveCoords)
}

export {
    reduceTetrominoCoordinates,
    isValidDownMove,
    isValidLeftMove,
    isValidRightMove,
    coordinateMatchesExist,
}
