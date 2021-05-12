import Mino from './components/Mino'

export default ({ AppElem, gameSize, tetrominos }) => {
    tetrominos.forEach((mino) => {
        AppElem.appendChild(Mino(gameSize, mino, false))
    })
}
