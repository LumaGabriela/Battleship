import { shipFactory } from "./ships"

export const gameboard = () => {
    // x and y coords
    let board = Array(10).fill(undefined).map((x) => Array(10).fill(undefined))
    let direction = 'horizontal'
    let placedShips = []
    let allShips = []
    let sunkShips = []
    const createShips = function() {
        const carrier = shipFactory('Carrier', 5)
        const battleship = shipFactory('Battleship', 4)
        const crusier = shipFactory('Crusier', 3)
        const submarine = shipFactory('Submarine', 3)
        const destroyer = shipFactory('Destroyer', 2)
        allShips.push(carrier, battleship, crusier, submarine, destroyer)
        console.log(allShips)
        return allShips
    }

    const placeShip = function(ship, x, y) {
        if(board[x][y] === undefined){
            if(direction === 'horizontal' && (y + (ship.length-1) < board[x].length)){
                for(let i=0; i<ship.length; i++){
                    this.board[x][y + i] = {ship, position: i}
                    if(placedShips.indexOf(ship) === -1) placedShips.push(ship)
                } 
            } else if(direction === 'vertical' && (x + (ship.length-1) < board.length)){
                for(let i=0; i<ship.length; i++){
                    this.board[x + i][y] = {ship, position: i}
                    if(placedShips.indexOf(ship) === -1) placedShips.push(ship)
                    allShips.push(ship)
                }
            } 
        } else console.error('cannot put ship here')   
    }
    const receiveAttack = function(x, y){  
        if( typeof board[x][y] === 'object'){
            board[x][y].ship.hit(board[x][y].position)
            board[x][y].ship.isSunk()
            board[x][y] = 'hit'
        }
        else if(board[x][y] === undefined){
            board[x][y] = 'miss'
        }
        verifyShips()
    }
    const verifyShips = function() {
        allShips.forEach((ship) => {
            if(ship.isSunk()) sunkShips.push(ship)
        })
        if (sunkShips.length === 5) return 'sunk'
        else return 'not sunk'
    }
    const resetAll = function(){
        allShips = []
        placedShips = []
        let board = Array(10).fill(undefined).map((x) => Array(10).fill(undefined))
        return allShips, placedShips, board
    }
    return{
        board,
        direction,
        placedShips,
        allShips,
        createShips,
        placeShip,
        receiveAttack,
        verifyShips,
        resetAll
    }
}

