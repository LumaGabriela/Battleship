import {game, player} from './index'
export const drag = function(ship, p1){
    let shipId
    let shipPosition
    let square
    let direction = player.gb.direction
    const verifyPosition = (dir) => {
        if(dir === 'horizontal') return true
        else return false
    }
    const squares = document.querySelectorAll('.square')
    const mouseDown = function(e) { 
        shipId = e.target.dataset.id
        shipPosition = e.target.dataset.position
        console.log(shipPosition)
        for(let s of squares) s.ondrop = drop      
    }
    // Moving ship
    const dragOver = function(e){
        e.preventDefault()
        this.style.backgroundColor = '#f63'     
    }
    const dragLeave = function(e){e.target.style.backgroundColor = ''}
    const dragEnter = (e) => e.preventDefault();
    const dragEnd = () => {};
    //Restore default
    const drop = function(e){
        e.stopImmediatePropagation()
        e.preventDefault()
        e.target.style.backgroundColor = ''
        let x = e.target.dataset.x ? Number(e.target.dataset.x) : null
        let y = e.target.dataset.x ? Number(e.target.dataset.y) : null
        y = (verifyPosition(direction) ? y - shipPosition : y)
        x = (verifyPosition(direction) ? x : x - shipPosition)
        console.log([x,y])
        if(player.gb.verifyShipPlacement('horizontal', player.gb.allShips[shipId], x, y)) {
            game.placeShips(player, 'horizontal', x, y, false, shipId)
            ship.removeEventListener('mousedown', mouseDown)
            dropShip(x,y)
            ship.onmousedown = null
            console.log(player.gb.allShips[shipId])
        } else console.log(player.gb.allShips[shipPosition])
    }
    const dropShip = (x, y) => {
        for( let i = 0; i< player.gb.allShips[shipId].length; i++){
            const s = document.querySelector(`[data-x='${x}'][data-y='${y+i}']`)
            const currentShip = document.querySelector(`[data-id='${shipId}'][data-position='${i}']`)
            s.appendChild(currentShip)
        }        
    }
    const dragListeners = function() {
        ship.onmousedown = mouseDown
        ship.addEventListener('dragend', dragEnd)

        for (let s of squares){
            s.addEventListener('dragenter', dragEnter)
            s.addEventListener('dragleave', dragLeave)
            s.addEventListener('dragover', dragOver)
        }     
    }
    dragListeners()
}