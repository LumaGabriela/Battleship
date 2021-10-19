import { player, cpu , game } from "./index"
import { drag } from "./drag"
export const render = (() => {
    
    const grid = (name) => {     
        let game = document.querySelector('#game')
        let player = document.createElement('div')
        player.id = `${name}`
        let info = document.createElement('div')
        let grid = document.createElement('div')
        info.id = `${name}-info`
        grid.id = `${name}-gameboard`
        grid.setAttribute('class', 'gameboard')
        let i = 0
        while(i<100) {
            if(i>=0 && i<10){
                grid.innerHTML += `<div class="${name} square" data-y='${i}' data-x='${0}'></div>`
            }else if (i>=10 && i<20){
                grid.innerHTML += `<div class="${name} square" data-y='${i-10}' data-x='${1}'></div>`
            }else if (i>=20 && i<30){
                grid.innerHTML += `<div class="${name} square" data-y='${i-20}' data-x='${2}'></div>`
            }else if (i>=30 && i<40){
                grid.innerHTML += `<div class="${name} square" data-y='${i-30}' data-x='${3}'></div>`
            }else if (i>=40 && i<50){
                grid.innerHTML += `<div class="${name} square" data-y='${i-40}' data-x='${4}'></div>`
            }else if (i>=50 && i<60){
                grid.innerHTML += `<div class="${name} square" data-y='${i-50}' data-x='${5}'></div>`
            }else if (i>=60 && i<70){
                grid.innerHTML += `<div class="${name} square" data-y='${i-60}' data-x='${6}'></div>`
            }else if (i>=70 && i<80){
                grid.innerHTML += `<div class="${name} square" data-y='${i-70}' data-x='${7}'></div>`
            }else if (i>=80 && i<90){
                grid.innerHTML += `<div class="${name} square" data-y='${i-80}' data-x='${8}'></div>`
            }else if (i>=90 && i<100){
                grid.innerHTML += `<div class="${name} square" data-y='${i-90}' data-x='${9}'></div>`
            }
            i++
        }
    player.appendChild(grid)
    player.appendChild(info)
    game.appendChild(player)
    }
    const showShips = () => {
        let shipDiv = document.createElement('div')
        let game = document.querySelector('#game')
        shipDiv.id = 'shipDiv'
        // Creates a instruction div
        let info = document.createElement('div')
        info.id = 'info-div' 
        //  creates ships divs
        let carrier = document.createElement('div')
        let battleship = document.createElement('div')
        let submarine = document.createElement('div')
        let crusier = document.createElement('div')
        let destroyer = document.createElement('div')
        // puts as many divs as the ship's length inside them
        let ships = [carrier, battleship, submarine, crusier, destroyer]
        let id = ['carrier', 'battleship', 'submarine', 'crusier', 'destroyer']
        game.appendChild(shipDiv)
        for(let i in ships) {
            for( let j=0; j< player.gb.allShips[i].length; j++){
                ships[i].innerHTML += `<div data-id='${i}' data-position='${j}' style="background:url(../dist/imgs/${id[i]}/${id[i]}${j}.png)" class='${id[i]} shipImg'>`
            }
            ships[i].setAttribute('draggable', true) 
            ships[i].setAttribute('class', `${id[i]} shipContainer` )
            ships[i].setAttribute('data-ship', `${i}`)
            shipDiv.appendChild(ships[i])           
            drag(ships[i])           
        }
    }
    const updateGrid = function(p, x, y) {
        let square = document.querySelector(`.${p.name}[data-x='${x}'][data-y='${y}']`)
        if(p.gb.board[x][y] === 'hit'){
            if(square.children[0]) square.removeChild(square.children[0])
            square.style.background = 'url(../dist/imgs/boom.png)'
        } else if(p.gb.board[x][y] === 'miss'){
            square.style.backgroundImage = 'url(../dist/imgs/times.png)'
        }        
    }
    const start = function(){
        render.grid('cpu')
        attack()
    }
    const attack = function(){
        let squares = document.querySelectorAll(`.cpu.square`)
        let info = document.querySelector('#game-info')
        for (let s of squares) s.onclick = (e) => {
            let cell = e.target
            let x = Number(cell.dataset.x)
            let y = Number(cell.dataset.y)
            game.playTurn(cpu, x, y, false)
            updateGame()
            for(let c of squares) c.onclick = null
            setTimeout(() => {
                game.playTurn(player, 0, 0, true)  
                attack()      
                s.onclick = null        
            },100)           
            updateGame()
        }        
    }
    const updateGame = function(){        
        let pInfo = document.querySelector('#player-info')
        let cInfo = document.querySelector('#cpu-info')
        pInfo.innerHTML = `Player remaining ships: ${player.gb.remainingShips.length}`
        cInfo.innerHTML = `CPU remaining ships: ${cpu.gb.remainingShips.length}`
        verifyVictory()
    }
    const verifyVictory = function(){
        let info = document.querySelector('#game-info')
        if(game.isWinner() === 'cpu') {
            info.innerHTML = `CPU won`
            stopGame()
        }
        else if(game.isWinner() === 'player') {
            info.innerHTML = `Player Won`
            stopGame()
        }
        console.log(game.isWinner())
    }
    const stopGame = function(){
        let restartBtn = document.querySelector('#restart-game')
        restartBtn.classList.add('active')
        restartBtn.onclick = () => {
            restart
            restartBtn.classList.remove('active')
        } 
        let info = document.querySelector('#game-info')
        info.innerHTML += `Play again?`
        
    }   
    const restart = function(){ 
        let squares = document.querySelector('.square')
        for ( let s of squares){
            s.background = ''
            if(s.children[0]) s.removeChild(s.children[0])
        }
        (document.querySelector('#game')).removeChild(document.querySelector('#cpu'))
        game.restartAll()
        start()
    }
    return {
        grid,
        showShips,
        updateGrid,
        start,
        attack
    }
})()

