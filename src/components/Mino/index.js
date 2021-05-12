import makeStyles from '../../makeStyles'

const calculateMinoLeft = ({ gameSize, space }) => {
    return ((space - 1) % 10) * gameSize
}

const calculateMinoTop = ({ gameSize, space }) => {
    return parseInt((space - 1) / 10) * gameSize
}

export default function ({ gameSize, space, occupied }) {
    const elem = document.createElement('div')

    let backgroundColor

    if (occupied) {
        backgroundColor = 'red'
        elem.className = 'space full'
    } else {
        backgroundColor = 'green'
        elem.className = 'space empty'
    }

    const elemStyle = {
        top: `${calculateMinoTop({ gameSize, space })}px`,
        left: `${calculateMinoLeft({ gameSize, space })}px`,
    }

    elem.setAttribute('style', makeStyles(elemStyle))

    elem.innerText = space

    return elem
}
