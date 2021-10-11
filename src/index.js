import { gameboard } from "./gameboard"
import {createPlayer, computerPlay} from './player'



const player = createPlayer('luma')
const computer = createPlayer('pc')
player.gb.createShips()
computer.gb.createShips()


const newGame = (p1, p2) => {
    let turn = 0
    const placeShips = (player) => {
        player.gb.allShips.forEach((ship, i) => {
            let x = Math.floor(Math.random() * 10)
            let y = Math.floor(Math.random() * 10)
            
            
            if (player.gb.placeShip(ship, x, y) === 'invalid position'){console.error(ship)
                do{
                    x = Math.floor(Math.random() * 10)
                    y = Math.floor(Math.random() * 10)
                    player.gb.placeShip(ship, x, y)
                    console.log(player.gb.placeShip(ship, x, y), ship)
                }while(player.gb.placeShip(ship, x, y) === 'invalid position')
           } else player.gb.placeShip(ship, x, y)
           console.log(ship)
        })
        console.log( player.gb.board, player.gb.placedShips )
    } 
    const playTurns = () => {
        do {
            let coords = computerPlay()
            p1.gb.receiveAttack(coords[0], coords[1])
            let coords1 = computerPlay()
            p2.gb.receiveAttack(coords1[0], coords1[1])
        } while(p1.gb.verifyShips() !== 'sunk')
        console.log(p1.gb.verifyShips(), p1.gb.board, p2.gb.board)
    }
    return {
        placeShips, 
        playTurns
    }
}

const currentGame = newGame(player, computer)
currentGame.placeShips(player)
// console.log(player.gb.placedShips)