export default (gameSpaceMap, tetromino) => {
    console.log('to validate', gameSpaceMap, 'tetro', tetromino)
    if (Array.isArray(tetromino)) {
        return true
    } else {
        console.log('calling every in create on', tetromino)
    }

    return tetromino.every((mino) => {
        if (!gameSpaceMap.has(mino)) {
            console.warn(
                'Error in valid placement',
                mino,
                'is not in the gameSpaceMap',
                gameSpaceMap
            )
        }

        return gameSpaceMap.get(mino) === false
    })
}
