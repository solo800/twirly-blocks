export default function ({ gameSize }) {
    const gameSpaceStyle = `
        position: absolute;
        background-color: blue;
        height: ${gameSize * 40}px;
        width: ${gameSize * 10}px;
    `
    const App = document.createElement('div')
    App.setAttribute('style', gameSpaceStyle)

    return App
}
