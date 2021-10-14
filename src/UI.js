import { drag } from "./drag"
export const render = (() => {
    let game = document.querySelector('#game')
    const grid = (name) => {        
        let grid = document.createElement('div')
        grid.setAttribute('id', `${name}-gameboard`)
        grid.setAttribute('class', 'gameboard')
        let i = 0
        while(i<100) {
            if(i>=0 && i<10){
                grid.innerHTML += `<div class="${name} square" data-y='${i}' data-x='${0}'>`
            }else if (i>=10 && i<20){
                grid.innerHTML += `<div class="${name} square" data-y='${i-10}' data-x='${1}'>`
            }else if (i>=20 && i<30){
                grid.innerHTML += `<div class="${name} square" data-y='${i-20}' data-x='${2}'>`
            }else if (i>=30 && i<40){
                grid.innerHTML += `<div class="${name} square" data-y='${i-30}' data-x='${3}'>`
            }else if (i>=40 && i<50){
                grid.innerHTML += `<div class="${name} square" data-y='${i-40}' data-x='${4}'>`
            }else if (i>=50 && i<60){
                grid.innerHTML += `<div class="${name} square" data-y='${i-50}' data-x='${5}'>`
            }else if (i>=60 && i<70){
                grid.innerHTML += `<div class="${name} square" data-y='${i-60}' data-x='${6}'>`
            }else if (i>=70 && i<80){
                grid.innerHTML += `<div class="${name} square" data-y='${i-70}' data-x='${7}'>`
            }else if (i>=80 && i<90){
                grid.innerHTML += `<div class="${name} square" data-y='${i-80}' data-x='${8}'>`
            }else if (i>=90 && i<100){
                grid.innerHTML += `<div class="${name} square" data-y='${i-90}' data-x='${9}'>`
            }
            i++
        }
    game.appendChild(grid)
    }
    const showShips = () => {
        let shipDiv = document.createElement('div')
        shipDiv.id = 'shipDiv'
        shipDiv.draggable = true
        let carrier = document.createElement('div')
        let battleship = document.createElement('div')
        let submarine = document.createElement('div')
        let crusier = document.createElement('div')
        let destroyer = document.createElement('div')
        carrier.style.background = 'url(./imgs/carrier.png) 50%'
        battleship.style.background = 'url(./imgs/battleship.png)'
        submarine.style.background = 'url(./imgs/submarine.png)'
        crusier.style.background = 'url(./imgs/crusier.png)'
        destroyer.style.background = 'url(./imgs/destroyer.png)'
        let ships = [carrier, battleship, submarine, crusier, destroyer]
        let id = ['carrier', 'battleship', 'submarine', 'crusier', 'destroyer']
        game.appendChild(shipDiv)
        for(let i in ships) {
            ships[i].setAttribute('draggable', true) 
            ships[i].setAttribute('class', `${id[i]}  shipImg` )
            ships[i].setAttribute('data-ship', `${i}`)
            shipDiv.appendChild(ships[i])
            drag(ships[i])
            
        }
        return ships
    }


    return {
        grid,
        showShips
    }
})()

