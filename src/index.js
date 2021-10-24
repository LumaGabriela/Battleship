import { createPlayer } from './player'
import { render } from './UI'

export const player = createPlayer('player')
export const cpu = createPlayer('cpu')
export const game = ((p1, p2) => {
    // Place ships on the board
    const placeShips = (player, dir, x1, y1, auto, shipIndex) => {
        if(auto === true){
            player.gb.allShips.forEach((ship) => {
                let x = Math.floor(Math.random() * 10)
                let y = Math.floor(Math.random() * 10)
                let d = Math.floor(Math.random() * 2)
                if(d === 1) d = 'horizontal'
                else d = 'vertical'
                if (player.gb.verifyShipPlacement(d, ship, x, y) === false ){
                    while(player.gb.verifyShipPlacement(d, ship, x, y) === false){
                        x = Math.floor(Math.random() * 10)
                        y = Math.floor(Math.random() * 10)   
                    } 
                    player.gb.placeShip(d,ship, x, y)
            } else player.gb.placeShip(d,ship, x, y)
            })
        } else {
            let ship = player.gb.allShips[shipIndex]
            if (player.gb.verifyShipPlacement(dir, ship, x1, y1) === false ){
                window.alert('Invalid position')
            } else p1.gb.placeShip(dir,ship, x1, y1)                
        }                        
    } 
    //Play game turns, player x cpu
    const playTurn = function(p, x1, y1, auto) {
        if(auto === true){
            let x = Math.floor(Math.random() * 10)
            let y = Math.floor(Math.random() * 10)            
            if(!p.gb.verifyAttack(x,y)){
                while(!p.gb.verifyAttack(x,y)){
                    x = Math.floor(Math.random() * 10)
                    y = Math.floor(Math.random() * 10)
                }                
                p.gb.receiveAttack(x, y)
                render.updateGrid(p, x, y)
            } else {p.gb.receiveAttack(x, y);render.updateGrid(p, x, y)}
        } else {
            p.gb.receiveAttack(x1, y1 )
            render.updateGrid(p, x1, y1)
            // console.table(player.gb.board)
        }      
        isWinner()
    }
    const isWinner = function(){
        if(p1.gb.verifyShips() === 'lose') return `${p2.name}`
        else if(p2.gb.verifyShips() === 'lose') return `${p1.name}`
        
    }
    const play = function() {
        placeShips(p2, 'horizontal', 0, 0, true, 0)
        render.grid('player')
        render.showShips()    
        document.querySelector('#start-game').style.display = 'flex'
        document.querySelector('#start-game').onclick = () => {
            if (p1.gb.placedShips.length === 5) {
            render.start()
            document.querySelector('#random-btn').remove()
            document.querySelector('#shipDiv').remove()
            document.querySelector('#start-game').style.display = 'none'
            document.querySelector('#start-game').onclick = null
            }
        }
    }
    const restartAll = function(){
        p1.gb.resetAll()
        p2.gb.resetAll()  
        game.play()
    }    
    return {
        placeShips, 
        playTurn,
        isWinner,
        play,
        restartAll
    }
})(player, cpu)

game.play()
