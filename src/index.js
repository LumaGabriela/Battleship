import {createPlayer, computerPlay} from './player'
import { displayGameboard } from './UI'
const player = createPlayer('luma')
const cpu = createPlayer('pc')
player.gb.createShips()
cpu.gb.createShips()


const newGame = (p1, p2) => {
    let turn = 0
    // Place ships on the board
    const placeShips = (player, dir, auto) => {
        if(auto === true){
            player.gb.allShips.forEach((ship) => {
                let coords = computerPlay()
                let x = Math.floor(Math.random() * 10)
                let y = Math.floor(Math.random() * 10)
            
                if (player.gb.verifyShipPlacement(dir, ship, x, y) === false ){
                    while(player.gb.verifyShipPlacement(dir, ship, x, y) === false){
                        x = Math.floor(Math.random() * 10)
                        y = Math.floor(Math.random() * 10)   
                    } 
                    player.gb.placeShip(dir ,ship, x, y)
            } else player.gb.placeShip(dir,ship, x, y)
            })
        } else {
            player.gb.allShips.forEach((ship) => {
                let coords = computerPlay()
                let x = prompt(`X value, ship: ${ship.id}`)
                let y = prompt(`Y value, ship: ${ship.id}`)
            
                if (player.gb.verifyShipPlacement(dir, ship, x, y) === false ){
                    while(player.gb.verifyShipPlacement(dir, ship, x, y) === false){
                        x = prompt(`X value, ship: ${ship.id}`)
                        y = prompt(`Y value, ship: ${ship.id}`)   
                    } 
                    player.gb.placeShip(dir ,ship, x, y)
                } else player.gb.placeShip(dir,ship, x, y)
            })
        }
    } 
    //Play game turns, player x cpu
    const playTurn = function(player, auto) {
        if(auto === true){
            let x = Math.floor(Math.random() * 10)
            let y = Math.floor(Math.random() * 10)
            if(!player.gb.verifyAttack(x,y)){
                while(!player.gb.verifyAttack(x,y)){
                    x = Math.floor(Math.random() * 10)
                    y = Math.floor(Math.random() * 10)
                }
                player.gb.receiveAttack(x, y)
            } else player.gb.receiveAttack(x, y)
        console.table(player.gb.board)
           
        } else return 'to be implemented'
    }
    const play = function(p1, p2) {
        placeShips(p1, 'horizontal', true)
        placeShips(p2, 'horizontal', true) 
        
        // console.table(p1.gb.board)
        // console.table(p2.gb.board)
         
        
    }
    return {
        placeShips, 
        playTurn,
        play
    }
}

const currentGame = newGame(player, cpu)
// currentGame.placeShips(player, 'horizontal', true)
// currentGame.placeShips(cpu, 'horizontal', true)
currentGame.play(player, cpu)

currentGame.playTurn(cpu, true)


displayGameboard.grid('player')
// displayGameboard.grid('cpu')
displayGameboard.renderShips()