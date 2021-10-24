import { shipFactory } from "./ships"

export const gameboard = function() {
    // x and y coords
    let board = Array(10).fill(undefined).map((x) => Array(10).fill(undefined))
    const getBoard = () => Array(10).fill(undefined).map((x) => Array(10).fill(undefined))
    let direction = 'horizontal'
    let placedShips = []
    let allShips = []
    let sunkShips = []
    let missedAttacks = []
    let allAttacks = []
 
    const createShips = function() {
        allShips = []
        const carrier = shipFactory('Carrier', 5)
        const battleship = shipFactory('Battleship', 4)        
        const submarine = shipFactory('Submarine', 3)
        const crusier = shipFactory('Crusier', 3)
        const destroyer = shipFactory('Destroyer', 2)
        allShips.push(carrier, battleship,  submarine, crusier, destroyer)
        return allShips
    }
    const verifyShipPlacement = function(direc, ship, x, y) {
        if(this.board[x][y] === undefined){  
            // check if the ship fits into the spot
            if(direc === 'horizontal' && (y + (ship.length-1) < 10)){
                for(let i = 1; i < (ship.length); i++){
                    if(this.board[x][y + i] !== undefined) return false           
                }
                return true
            } else if(direc === 'vertical' && (x + (ship.length-1) < 10)){
                for(let i = 1; i<(ship.length); i++){
                    if(this.board[x + i][y] !== undefined) return false                     
                }  
                return true              
            } else return false
        } else return false        
    }
    const placeShip = function(direc, ship, x, y) {
        //Only place if the space is free
        // check if the ship fits into the spot        
        if(direc === 'horizontal' ){
            for(let i=0; i<ship.length; i++){
                this.board[x][y + i] = {ship, position: i}
                if(this.placedShips.indexOf(ship) === -1) this.placedShips.push(ship)
            } 
        } else if(direc === 'vertical' ){
            for(let i=0; i<ship.length; i++){
                this.board[x + i][y] = {ship, position: i}
                if(this.placedShips.indexOf(ship) === -1) this.placedShips.push(ship)
            }
        } 
    } 
    //verify if the place was already attacked
    const verifyAttack = function(x, y) {
        for (let item of allAttacks) if(item[0] === x && item[1] === y) return false     
        return true    
    }
    //attack the enemy's gameboard
    const receiveAttack = function(x, y){  
        if(verifyAttack(x, y)){
            if( typeof this.board[x][y] === 'object'){
                this.board[x][y].ship.hit(this.board[x][y].position)
                this.board[x][y] = 'hit'
                this.allAttacks.push([x,y])                
            }
            else if(this.board[x][y] === undefined){
                this.board[x][y] = 'miss'
                this.allAttacks.push([x,y])
                this.missedAttacks.push([x,y])               
            }
            // verifyShips()
        }    
    }
    //verify if the ship is sunk
    const verifyShips = function() {
        for(let ship of this.placedShips) {
            if(ship.isSunk() && this.sunkShips.indexOf(ship) === -1) this.sunkShips.push(ship)
        }
        if (this.sunkShips.length === 5) return 'lose'
        else return 'playing'
    }
    
    // reset game
    const resetAll = function(){
        this.placedShips = []
        this.sunkShips = []
        allAttacks = []
        this.allAttacks = []
        this.missedAttacks = []
        this.board = getBoard()
        allShips.forEach(ship => ship.hitPosition = [])    
    }
    createShips()
    return{
        board,
        direction,
        placedShips,
        allShips,
        allAttacks,
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

