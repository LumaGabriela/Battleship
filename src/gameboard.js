import { shipFactory } from "./ships"

const battleship = shipFactory('Battleship', 5)
export const submarine = shipFactory('Submarine', 3)

export const gameboard = (() => {
    // x and y coords
    let board = Array(10).fill(null).map((x) => Array(10).fill(null))
    const direction = 'horizontal'
    console.log(board)
    const placeShip = function(ship, x, y) {
        if(direction === 'vertical' && (y + (ship.length-1) < board[x].length)){
            for(let i=0; i<ship.length; i++){
                this.board[x][y + i] = ship
            } 
        } else if(direction === 'horizontal' && (x + (ship.length-1) < board.length)){
            for(let i=0; i<ship.length; i++){
                this.board[x + i][y] = ship
            }
        }
        
    }
    const reveiveAttack = function(x, y){
        
    }
    return{
        board,
        placeShip,
        reveiveAttack
    }
})()

