import styled from 'styled-components'

const calculateMinoLeft = ({ gameSize, space }) => {
    return ((space - 1) % 10) * gameSize
}

const calculateMinoTop = ({ gameSize, space }) => {
    return parseInt((space - 1) / 10) * gameSize
}

export default styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: ${({ gameSize }) => {
        return gameSize * 40
    }}px;
    width: ${({ gameSize }) => {
        return gameSize * 10
    }}px;
    background-color: blue;

    .space {
        position: absolute;
        border: 1px solid black;
        height: ${({ gameSize }) => gameSize}px;
        width: ${({ gameSize }) => gameSize}px;

        &.empty {
            background-color: green;
            &:after {
                font-size: 8px;
                content: '${({ space }) => space}';
                position: relative;
                top: -8px;
            }
        }

        &.full {
            background-color: red;
        }
    }
`

export { calculateMinoLeft, calculateMinoTop }
