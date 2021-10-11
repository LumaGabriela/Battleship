import { gameboard } from "./gameboard"
import {createPlayer} from './player'



const player = createPlayer('luma')
const computer = createPlayer('pc')
player.gb.createShips()
computer.gb.createShips()
// player.gb.placeShip( player.gb.allShips[0], 0, 0)
// player.gb.placeShip( player.gb.allShips[1], 0, 5)
// player.gb.placeShip( player.gb.allShips[2], 1, 0)
// player.gb.placeShip( player.gb.allShips[3], 1, 3)
// player.gb.placeShip( player.gb.allShips[4], 1, 6)
// player.gb.receiveAttack(1,3)
// player.gb.receiveAttack(1,4)
// player.gb.receiveAttack(1,5)

console.log(player.gb)
console.log(player.gb.board)
// console.log(player.gb.verifyShips())


const newGame = (p1, p2) => {
    let turn = 0
    const placeShips = (player) => {
        player.gb.allShips.forEach((ship, i) => {
            let x = Math.floor(Math.random() * 10)
            let y = Math.floor(Math.random() * 10)
            player.gb.placeShip(ship, x, y)
        });
        console.log( player.gb.board)
    }
    const playTurns = () => {
        do {
            let x1 = Math.floor(Math.random() * 10)
            let y1 =  Math.floor(Math.random() * 10)
            p1.gb.receiveAttack(x1, y1)
            let x2 = Math.floor(Math.random() * 10)
            let y2 =  Math.floor(Math.random() * 10)
            p2.gb.receiveAttack(x2, y2)
        } while(p1.gb.verifyShips() !== 'sunk')
        console.log(p1.gb.verifyShips())
    }
    return {
        placeShips, 
        playTurns
    }
}

const currentGame = newGame(player, computer)
currentGame.placeShips(player)
