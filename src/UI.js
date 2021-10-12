export const displayGameboard = (() => {
    let game = document.querySelector('#game')
    const grid = (name) => {
        
        let grid = document.createElement('div')
        grid.setAttribute('id', `${name}-gameboard`)
        grid.setAttribute('class', 'gameboard')
        let i = 0
        while(i<100) {
            grid.innerHTML += `<div class="${name} square" >`
            i++
        }
    game.appendChild(grid)
    }
    const renderShips = () => {
        let shipDiv = document.createElement('div')
        shipDiv.id = 'shipDiv'
        let carrier = document.createElement('img')
        let battleship = document.createElement('img')
        let submarine = document.createElement('img')
        let crusier = document.createElement('img')
        let destroyer = document.createElement('img')
        carrier.src = './imgs/carrier.png'
        battleship.src = './imgs/battleship.png'
        submarine.src = './imgs/submarine.png'
        crusier.src = './imgs/crusier.png'
        destroyer.src = './imgs/destroyer.png'
        let ships = [carrier, battleship, submarine, crusier, destroyer]
        let id = ['carrier', 'battleship', 'submarine', 'crusier', 'destroyer']
        game.appendChild(shipDiv)
        ships.forEach((ship,i) => {
            ship.setAttribute('class', `${id[i]} shipImg` )
            shipDiv.appendChild(ship)
        })
    }
    return {
        grid,
        renderShips
    }
})()

