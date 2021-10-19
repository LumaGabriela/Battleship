import {game, player} from './index'
export const drag = function(ship, p1){
    let shipId      // from 0 to 4, correspond to ship names
    let shipPosition    // the position where the player points the mouse
    let direction = player.gb.direction     // ship orientation, can be horizontal or vertical
    
    const verifyPosition = (dir) => {  // verify whether the position is or isn't horizontal
        if(dir === 'horizontal') return true
        else return false
    }
    
    const squares = document.querySelectorAll('.square')  //squares on the gameboard's grid
    
    const mouseDown = function(e) { //captures the ships id and position
        shipId = e.target.dataset.id
        shipPosition = e.target.dataset.position
        for(let s of squares) {
            s.ondrop = drop
            s.ondragstart = dragStart // prevents ship from getting dragged from grid
        }  
        // is on mousedown because when the ondrop event is on dragListeners() it repeats and changes the ships variable  
    }
    const dragOver = function(e){ //adds a background color as effect
        e.preventDefault()
        this.style.backgroundColor = '#f63'   
        
    }
    const dragLeave = function(e){e.target.style.backgroundColor = ''} // set color back to default
    const dragEnter = (e) => e.preventDefault()
    const dragStart = (e) => e.preventDefault()
    const dragEnd = (e) => {};
    const rotateShip = function(){
        ship.classList.toggle('vertical')
        console.log(ship.children)
        for (let a of ship.children) a.classList.toggle('ver')
        direction = (ship.classList[2] ? 'vertical' : 'horizontal')
    }
    const drop = function(e){ // drop the ship's blocks on the grid
        e.stopImmediatePropagation()
        e.preventDefault()
        e.target.style.backgroundColor = ''
        let x = e.target.dataset.x ? Number(e.target.dataset.x) : null
        let y = e.target.dataset.x ? Number(e.target.dataset.y) : null
        y = (verifyPosition(direction) ? y - shipPosition : y)
        x = (verifyPosition(direction) ? x : x - shipPosition)
        if(player.gb.verifyShipPlacement(direction, player.gb.allShips[shipId], x, y)) {
            game.placeShips(player, direction, x, y, false, shipId)
            ship.removeEventListener('mousedown', mouseDown)
            dropShip(x,y)
            ship.style.cursor = 'default'
        } else window.alert('Invalid position')
    }
    const dropShip = (x, y) => {
        if(direction === 'horizontal'){
            for( let i = 0; i< player.gb.allShips[shipId].length; i++){
                const s = document.querySelector(`[data-x='${x}'][data-y='${y+i}']`)
                const currentShip = document.querySelector(`[data-id='${shipId}'][data-position='${i}']`)
                s.appendChild(currentShip)
            }      
        } else if(direction === 'vertical'){
            for( let i = 0; i< player.gb.allShips[shipId].length; i++){
                const s = document.querySelector(`[data-x='${x+i}'][data-y='${y}']`)
                const currentShip = document.querySelector(`[data-id='${shipId}'][data-position='${i}']`)
                s.appendChild(currentShip)
            }      
        }         
    }
    const dragListeners = function() {
        ship.addEventListener('mousedown', mouseDown)
        ship.addEventListener('dragend', dragEnd)
        ship.addEventListener('dblclick', rotateShip)
        
        for (let s of squares){
            s.addEventListener('dragenter', dragEnter)
            s.addEventListener('dragleave', dragLeave)
            s.addEventListener('dragover', dragOver)
        }     
    }
    dragListeners()
}