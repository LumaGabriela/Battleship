import { gameboard } from "./gameboard"

export const createPlayer = (name) => {
    const gb = gameboard()

    return {name, gb}
}

