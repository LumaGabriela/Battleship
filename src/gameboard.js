import { shipFactory } from "./ships"

export const gameboard = () => {
    // x and y coords
    let board = Array(10).fill(undefined).map((x) => Array(10).fill(undefined))
    let direction = 'horizontal'
    let placedShips = []
    let allShips = []
    let sunkShips = []
    let missedAttacks = []
    let allAttacks = []
   
    const createShips = function() {
        const carrier = shipFactory('Carrier', 5)
        const battleship = shipFactory('Battleship', 4)
        const crusier = shipFactory('Crusier', 3)
        const submarine = shipFactory('Submarine', 3)
        const destroyer = shipFactory('Destroyer', 2)
        allShips.push(carrier, battleship, crusier, submarine, destroyer)
        return allShips
    }

    const placeShip = function( direc, ship, x, y) {
        //Only place if the space is free
        // check if the ship fits into the spot
        console.log({direc, ship, x, y})
        if(direc === 'horizontal' && verifyShipPlacement(direc, ship, x, y)){
            for(let i=0; i<ship.length; i++){
                this.board[x][y + i] = {ship, position: i}
                if(placedShips.indexOf(ship) === -1) placedShips.push(ship)
            } 
        } else if(direc === 'vertical' && verifyShipPlacement(direc, ship, x, y)){
            for(let i=0; i<ship.length; i++){
                this.board[x + i][y] = {ship, position: i}
                if(placedShips.indexOf(ship) === -1) placedShips.push(ship)
            }
        } 
    }
    const verifyShipPlacement = function(direc, ship, x, y) {
        if(board[x][y] === undefined){
            // check if the ship fits into the spot
            if(direc === 'horizontal' && (y + (ship.length-1) < board[x].length)){
                return true
            } else if(direc === 'vertical' && (x + (ship.length-1) < board.length)){
                return true
            } else return false
        } else {
            return false
        }
    }
    //verify if the place was already attacked
    const verifyAttack = function(x, y) {
        allAttacks.forEach((item) => {
            if(item[0] === x && item[1] === y){
                false
            }
        })
        return true
    }
    //attack the enemy's gameboard
    const receiveAttack = function(x, y){  
        if(verifyAttack(x, y)){
            if( typeof board[x][y] === 'object'){
                board[x][y].ship.hit(board[x][y].position)
                board[x][y].ship.isSunk()
                board[x][y] = 'hit'
                allAttacks.push([x,y])
            }
            else if(board[x][y] === undefined){
                board[x][y] = 'miss'
                allAttacks.push([x,y])
                missedAttacks.push([x,y])
            }
            verifyShips()
        }    
    }
    //verify if the ship is sunk
    const verifyShips = function() {
        allShips.forEach((ship) => {
            if(ship.isSunk()) sunkShips.push(ship)
        })
        if (sunkShips.length === 5) return 'lose'
        else return 'playing'
    }
    const resetAll = function(){
        allShips = []
        placedShips = []
        let board = Array(10).fill(undefined).map((x) => Array(10).fill(undefined))
        return allShips, placedShips, board
    }
    createShips()
    return{
        board,
        direction,
        placedShips,
        allShips,
        sunkShips,
        missedAttacks,
        createShips,
        placeShip,
        verifyShipPlacement,
        verifyAttack,
        receiveAttack,
        verifyShips,
        resetAll
    }
}

