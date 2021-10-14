import {game, player} from './index'
export const drag = function(ship, p1){
    let shipIndex
    let square
    const dragOver = (e) => e.preventDefault();
    const dragEnter = (e) => e.preventDefault();
    const dragLeave = () => {};
    const dragEnd = () => {};
    const squares = document.querySelectorAll('.square')
    const dragMousedown = function(e){ 
        shipIndex = e.target.dataset.ship
        ship.style.cursor = 'grabbing'
        document.onmouseup = closeDragElement
        document.dragOver = elementDrag
    }
    // Moving ship
    const elementDrag = function(e){
        
    }
    //Restore default
    const closeDragElement = function(e){
        document.onmouseup = null
        document.onmousemove = null
        ship.style.cursor = 'grab'
        square = [
            e.target.dataset.x ? Number(e.target.dataset.x) : null, 
            e.target.dataset.x ? Number(e.target.dataset.y) : null
        ]
        console.log(square)
        if(square[0]) {
            game.placeShips(player, 'horizontal', square[0], square[1], false, shipIndex)

        }
    }
    if(ship) {
        ship.addEventListener('mousedown', dragMousedown)
        

    }
}