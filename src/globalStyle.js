export default ({ gameSize }) => {
    const globalStyles = document.createElement('style')

    globalStyles.innerText = `
        .gameSpace {
            position: absolute;
            background-color: blue;
            height: ${gameSize * 40}px;
            width: ${gameSize * 10}px;
        }

        .space {
            position: absolute;
            border: 1px solid black;
            height: ${gameSize}px;
            width: ${gameSize}px;
            font-size: 10px;
        }

        .space.empty {
            background-color: green;
        }

        .space.full {
            background-color: red;
        }
    `

    return globalStyles
}
