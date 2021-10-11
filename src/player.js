import { gameboard } from "./gameboard"

export const createPlayer = (name) => {
    const gb = gameboard()

    return {name, gb}
}

export const computerPlay = () => {
    let x = Math.floor(Math.random() * 10)
    let y = Math.floor(Math.random() * 10)
    return [x,y]
}