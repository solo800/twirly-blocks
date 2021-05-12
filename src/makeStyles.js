export default (styles) => {
    return Object.keys(styles).reduce((styleString, prop) => {
        return `${styleString}${prop}:${styles[prop]};`
    }, '')
}
