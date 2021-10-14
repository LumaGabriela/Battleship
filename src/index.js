import {createPlayer, computerPlay} from './player'
import { render } from './UI'
import { dragShip } from './drag'
export const player = createPlayer('luma')
const cpu = createPlayer('pc')

export const game = ((p1, p2) => {
    // Place ships on the board
    const placeShips = (player, dir, x1, y1, auto, shipIndex) => {
        if(auto === true){
            player.gb.allShips.forEach((ship) => {
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
            let ship = player.gb.allShips[shipIndex]
            if (player.gb.verifyShipPlacement(dir, ship, x1, y1) === false ){
                window.alert('Invalid position')
            } else {
                p1.gb.placeShip(dir,ship, x1, y1)
                console.table(p1.gb.board)
            }
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
    const play = function() {
        //placeShips(p2, 'horizontal', 0, 0, true, 0) 
    }
    const dragShip = function() {

    }
    return {
        placeShips, 
        playTurn,
        play
    }
})(player, cpu)



game.play(player, cpu)

render.grid('player')
// displayGameboard.grid('cpu')
render.showShips()
