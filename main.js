/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/UI.js":
/*!*******************!*\
  !*** ./src/UI.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/index.js");
/* harmony import */ var _drag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./drag */ "./src/drag.js");


const render = (() => {
    
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
        let randomBtn = document.createElement('button')
        randomBtn.id = 'random-btn'
        randomBtn.innerText = 'RANDOM'
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
        shipDiv.appendChild(randomBtn)
        game.appendChild(shipDiv)
        for(let i in ships) {
            for( let j=0; j< _index__WEBPACK_IMPORTED_MODULE_0__.player.gb.allShips[i].length; j++){
                ships[i].innerHTML += `<div data-id='${i}' data-position='${j}' style="background:url(/dist/imgs/${id[i]}/${id[i]}${j}.png)" class='${id[i]} shipImg'>`
            }
            ships[i].setAttribute('draggable', true) 
            ships[i].setAttribute('class', `${id[i]} shipContainer` )
            ships[i].setAttribute('data-ship', `${i}`)
            shipDiv.appendChild(ships[i])           
            ;(0,_drag__WEBPACK_IMPORTED_MODULE_1__.drag)(ships[i])         
        }       
    }
    const updateGrid = function(p, x, y) {
        let square = document.querySelector(`.${p.name}[data-x='${x}'][data-y='${y}']`)
        if (p.name === 'cpu')console.table(p.gb.board)
        if(p.gb.board[x][y] === 'hit'){
            if(square.children[0]) square.removeChild(square.children[0])
            square.style.background = 'url(../dist/imgs/boom.png)'
            square.style.animation = 'attack .5s ease-in'
        } else if(p.gb.board[x][y] === 'miss'){
            square.innerHTML = '<i class="fas fa-times"></i>'
            square.style.animation = 'attack .5s ease-in'
        }        
    }
    const start = function(){       
        grid('cpu')
        attack()
    }
    const attack = function(){
        let squares = document.querySelectorAll(`.cpu.square`)
        for (let s of squares) s.onclick = null
        for (let s of squares) s.onclick = (e) => {
            let cell = e.target
            let x = Number(cell.dataset.x)
            let y = Number(cell.dataset.y)
            _index__WEBPACK_IMPORTED_MODULE_0__.game.playTurn(_index__WEBPACK_IMPORTED_MODULE_0__.cpu, x, y, false)
            updateGame('cpu')
            for(let c of squares) c.onclick = null
            setTimeout(() => {
                _index__WEBPACK_IMPORTED_MODULE_0__.game.playTurn(_index__WEBPACK_IMPORTED_MODULE_0__.player, 0, 0, true)  
                attack()      
                s.onclick = null   
                updateGame('Player')     
            },200)             
        }        
    }
    const updateGame = function(p){        
        let info = document.querySelector('#game-info')
        info.innerHTML = `${p}'s turn `
        let pInfo = document.querySelector('#player-info')
        let cInfo = document.querySelector('#cpu-info')
        pInfo.innerHTML = `Player remaining ships: ${5 - _index__WEBPACK_IMPORTED_MODULE_0__.player.gb.sunkShips.length}`
        cInfo.innerHTML = `CPU remaining ships: ${5 - _index__WEBPACK_IMPORTED_MODULE_0__.cpu.gb.sunkShips.length}`
        console.log([_index__WEBPACK_IMPORTED_MODULE_0__.player.gb.sunkShips, _index__WEBPACK_IMPORTED_MODULE_0__.cpu.gb.sunkShips])
        verifyVictory()
    }
    const verifyVictory = function(){
        let info = document.querySelector('#game-info')
        if(_index__WEBPACK_IMPORTED_MODULE_0__.game.isWinner() === 'cpu') {
            info.innerHTML = `CPU won`
            stopGame()
        }
        else if(_index__WEBPACK_IMPORTED_MODULE_0__.game.isWinner() === 'player') {
            info.innerHTML = `Player Won`
            stopGame()
        }
    }
    const stopGame = function(){
        let squares = document.querySelectorAll('.square')        
        for ( let s of squares) s.onclick = null
        let restartBtn = document.querySelector('#restart-game')
        restartBtn.classList.add('active')
        restartBtn.onclick = () => {
            restart()
            restartBtn.classList.remove('active')
        } 
        let info = document.querySelector('#game-info')
        info.innerHTML += `</br>Play again?`        
    }   
    const restart = function(){ 
        let gameDiv = document.getElementById('game')         
        gameDiv.removeChild(document.getElementById('player'))
        gameDiv.removeChild(document.getElementById('cpu'))        
        _index__WEBPACK_IMPORTED_MODULE_0__.game.restartAll()        
    }
    return {
        grid,
        showShips,
        updateGrid,
        start,
        restart,
        attack
    }
})()



/***/ }),

/***/ "./src/drag.js":
/*!*********************!*\
  !*** ./src/drag.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "drag": () => (/* binding */ drag)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/index.js");

const drag = function(ship){
    let shipId = ship.dataset.ship     // from 0 to 4, correspond to ship names
    let shipPosition    // the position where the player points the mouse
    let direction = _index__WEBPACK_IMPORTED_MODULE_0__.player.gb.direction     // ship orientation, can be horizontal or vertical
    let randomBtn = document.querySelector('#random-btn')
    
    const verifyPosition = (dir) => {  // verify whether the position is or isn't horizontal
        if(dir === 'horizontal') return true
        else return false
    }
    
    const squares = document.querySelectorAll('.square')  //squares on the gameboard's grid
    
    const mouseDown = function(e) { //captures the ships id and position
        shipPosition = e.target.dataset.position
        for(let s of squares) {
            s.ondrop = drop// is on mousedown because when the ondrop event is on dragListeners() it repeats and changes the ships variable  
            s.ondragstart = dragStart // prevents ship from getting dragged from grid
        }  
        
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
        if(_index__WEBPACK_IMPORTED_MODULE_0__.player.gb.verifyShipPlacement(direction, _index__WEBPACK_IMPORTED_MODULE_0__.player.gb.allShips[shipId], x, y)) {
            _index__WEBPACK_IMPORTED_MODULE_0__.game.placeShips(_index__WEBPACK_IMPORTED_MODULE_0__.player, direction, x, y, false, shipId)
            ship.removeEventListener('mousedown', mouseDown)
            dropShip(x,y,0, undefined)
            ship.style.cursor = 'default'
        } else window.alert('Invalid position')
    }
    const dropShip = (x, y,d, id) => {
        if(id !== undefined) shipId = id
        if (d === 'horizontal') direction = 'horizontal'
        else if (d === 'vertical') direction = 'vertical'
        if(direction === 'horizontal'){
            for( let i = 0; i< _index__WEBPACK_IMPORTED_MODULE_0__.player.gb.allShips[shipId].length; i++){
                const s = document.querySelector(`[data-x='${x}'][data-y='${y+i}']`)
                const currentShip = document.querySelector(`[data-id='${shipId}'][data-position='${i}']`)
                s.appendChild(currentShip)
            }      
        } else if(direction === 'vertical'){
            for( let i = 0; i< _index__WEBPACK_IMPORTED_MODULE_0__.player.gb.allShips[shipId].length; i++){
                const s = document.querySelector(`[data-x='${x+i}'][data-y='${y}']`)
                const currentShip = document.querySelector(`[data-id='${shipId}'][data-position='${i}']`)
                s.appendChild(currentShip)             
            }      
        }         
    }
    const randomPlace = function(){
        _index__WEBPACK_IMPORTED_MODULE_0__.player.gb.resetAll()        
        let x, y, d
        let names = ['carrier', 'battleship','submarine','crusier' , 'destroyer']
        let ships = []
        for(let i=0; i<names.length; i++) ships.push(document.querySelectorAll(`.${names[i]}.shipImg`))
        ships.forEach((ship, id) =>{
            x = (Math.floor(Math.random() * 10))
            y = (Math.floor(Math.random() * 10))
            d = (Math.floor(Math.random() * 2))
            d = (d ? 'horizontal' : 'vertical')  
            if(_index__WEBPACK_IMPORTED_MODULE_0__.player.gb.verifyShipPlacement(d, _index__WEBPACK_IMPORTED_MODULE_0__.player.gb.allShips[id], x, y)){
                for (let a of ship) a.classList.remove('ver')
                if(d === 'vertical') for (let a of ship) a.classList.add('ver')
                _index__WEBPACK_IMPORTED_MODULE_0__.game.placeShips(_index__WEBPACK_IMPORTED_MODULE_0__.player, d, x, y, false, id)
                dropShip(x,y,d, id)
            } else  {            
                while(!_index__WEBPACK_IMPORTED_MODULE_0__.player.gb.verifyShipPlacement(d, _index__WEBPACK_IMPORTED_MODULE_0__.player.gb.allShips[id], x, y)){
                    x = (Math.floor(Math.random() * 10))
                    y = (Math.floor(Math.random() * 10))
                    d = (Math.floor(Math.random() * 2))
                    d = (d ? 'horizontal' : 'vertical')
                }
                for (let a of ship) a.classList.remove('ver')
                if(d === 'vertical') for (let a of ship) a.classList.add('ver')
                _index__WEBPACK_IMPORTED_MODULE_0__.game.placeShips(_index__WEBPACK_IMPORTED_MODULE_0__.player, d, x, y, false, id)
                dropShip(x,y,d, id)
            }
        })    
        console.table(_index__WEBPACK_IMPORTED_MODULE_0__.player.gb.board)
    }
    const dragListeners = function() {
        randomBtn.onmouseup = (e) => {
            randomPlace()
            e.stopImmediatePropagation()
            }
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
    return randomPlace
}

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gameboard": () => (/* binding */ gameboard)
/* harmony export */ });
/* harmony import */ var _ships__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ships */ "./src/ships.js");


const gameboard = function() {
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
        const carrier = (0,_ships__WEBPACK_IMPORTED_MODULE_0__.shipFactory)('Carrier', 5)
        const battleship = (0,_ships__WEBPACK_IMPORTED_MODULE_0__.shipFactory)('Battleship', 4)        
        const submarine = (0,_ships__WEBPACK_IMPORTED_MODULE_0__.shipFactory)('Submarine', 3)
        const crusier = (0,_ships__WEBPACK_IMPORTED_MODULE_0__.shipFactory)('Crusier', 3)
        const destroyer = (0,_ships__WEBPACK_IMPORTED_MODULE_0__.shipFactory)('Destroyer', 2)
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
        console.log(allShips, this.allShips)
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



/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "player": () => (/* binding */ player),
/* harmony export */   "cpu": () => (/* binding */ cpu),
/* harmony export */   "game": () => (/* binding */ game)
/* harmony export */ });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UI */ "./src/UI.js");



const player = (0,_player__WEBPACK_IMPORTED_MODULE_0__.createPlayer)('player')
const cpu = (0,_player__WEBPACK_IMPORTED_MODULE_0__.createPlayer)('cpu')
const game = ((p1, p2) => {
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
                _UI__WEBPACK_IMPORTED_MODULE_1__.render.updateGrid(p, x, y)
            } else {p.gb.receiveAttack(x, y);_UI__WEBPACK_IMPORTED_MODULE_1__.render.updateGrid(p, x, y)}
        } else {
            p.gb.receiveAttack(x1, y1 )
            _UI__WEBPACK_IMPORTED_MODULE_1__.render.updateGrid(p, x1, y1)
            console.log([p1.gb.allAttacks, p2.gb.allAttacks, p2.gb.sunkShips])
        }      
        isWinner()
    }
    const isWinner = function(){
        if(p1.gb.verifyShips() === 'lose') {console.log(`${p2.name}` );return `${p2.name}`}
        else if(p2.gb.verifyShips() === 'lose') {console.log(`${p1.name}` );return `${p1.name}`}
        
    }
    const play = function() {
        placeShips(p2, 'horizontal', 0, 0, true, 0)
        _UI__WEBPACK_IMPORTED_MODULE_1__.render.grid('player')
        _UI__WEBPACK_IMPORTED_MODULE_1__.render.showShips()    
        document.querySelector('#start-game').style.display = 'flex'
        document.querySelector('#start-game').onclick = () => {
            if (p1.gb.placedShips.length === 5) {
            _UI__WEBPACK_IMPORTED_MODULE_1__.render.start()
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
        // p1.gb.allShips.forEach(ship => ship.resetHits())
        // p2.gb.allShips.forEach(ship => ship.resetHits())
        game.play()
        console.log([p2.gb.allShips, p2.gb.placedShips])
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


/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createPlayer": () => (/* binding */ createPlayer)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");


const createPlayer = (name) => {
    const gb = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.gameboard)()

    return {name, gb}
}



/***/ }),

/***/ "./src/ships.js":
/*!**********************!*\
  !*** ./src/ships.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "shipFactory": () => (/* binding */ shipFactory)
/* harmony export */ });
const shipFactory = (name, len) => {
    const id = name
    const length = len
    let hitPosition = []
    let sunk = false
    const hit = function(pos) {
        this.hitPosition.push(pos)
    }
    const isSunk = function() {
        if(this.hitPosition.length === length) this.sunk = true            
        else this.sunk = false
        return this.sunk
    }
    return {id, 
        length, 
        hitPosition, 
        sunk, 
        hit, 
        isSunk, 
        }
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvVUkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kcmFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHBsYXllciwgY3B1ICwgZ2FtZSB9IGZyb20gXCIuL2luZGV4XCJcclxuaW1wb3J0IHsgZHJhZyB9IGZyb20gXCIuL2RyYWdcIlxyXG5leHBvcnQgY29uc3QgcmVuZGVyID0gKCgpID0+IHtcclxuICAgIFxyXG4gICAgY29uc3QgZ3JpZCA9IChuYW1lKSA9PiB7XHJcbiAgICAgICAgbGV0IGdhbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZ2FtZScpXHJcbiAgICAgICAgbGV0IHBsYXllciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgICAgcGxheWVyLmlkID0gYCR7bmFtZX1gXHJcbiAgICAgICAgbGV0IGluZm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgICAgIGxldCBncmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgICAgICBpbmZvLmlkID0gYCR7bmFtZX0taW5mb2BcclxuICAgICAgICBncmlkLmlkID0gYCR7bmFtZX0tZ2FtZWJvYXJkYFxyXG4gICAgICAgIGdyaWQuc2V0QXR0cmlidXRlKCdjbGFzcycsICdnYW1lYm9hcmQnKVxyXG4gICAgICAgIGxldCBpID0gMFxyXG4gICAgICAgIHdoaWxlKGk8MTAwKSB7XHJcbiAgICAgICAgICAgIGlmKGk+PTAgJiYgaTwxMCl7XHJcbiAgICAgICAgICAgICAgICBncmlkLmlubmVySFRNTCArPSBgPGRpdiBjbGFzcz1cIiR7bmFtZX0gc3F1YXJlXCIgZGF0YS15PScke2l9JyBkYXRhLXg9JyR7MH0nPjwvZGl2PmBcclxuICAgICAgICAgICAgfWVsc2UgaWYgKGk+PTEwICYmIGk8MjApe1xyXG4gICAgICAgICAgICAgICAgZ3JpZC5pbm5lckhUTUwgKz0gYDxkaXYgY2xhc3M9XCIke25hbWV9IHNxdWFyZVwiIGRhdGEteT0nJHtpLTEwfScgZGF0YS14PSckezF9Jz48L2Rpdj5gXHJcbiAgICAgICAgICAgIH1lbHNlIGlmIChpPj0yMCAmJiBpPDMwKXtcclxuICAgICAgICAgICAgICAgIGdyaWQuaW5uZXJIVE1MICs9IGA8ZGl2IGNsYXNzPVwiJHtuYW1lfSBzcXVhcmVcIiBkYXRhLXk9JyR7aS0yMH0nIGRhdGEteD0nJHsyfSc+PC9kaXY+YFxyXG4gICAgICAgICAgICB9ZWxzZSBpZiAoaT49MzAgJiYgaTw0MCl7XHJcbiAgICAgICAgICAgICAgICBncmlkLmlubmVySFRNTCArPSBgPGRpdiBjbGFzcz1cIiR7bmFtZX0gc3F1YXJlXCIgZGF0YS15PScke2ktMzB9JyBkYXRhLXg9JyR7M30nPjwvZGl2PmBcclxuICAgICAgICAgICAgfWVsc2UgaWYgKGk+PTQwICYmIGk8NTApe1xyXG4gICAgICAgICAgICAgICAgZ3JpZC5pbm5lckhUTUwgKz0gYDxkaXYgY2xhc3M9XCIke25hbWV9IHNxdWFyZVwiIGRhdGEteT0nJHtpLTQwfScgZGF0YS14PSckezR9Jz48L2Rpdj5gXHJcbiAgICAgICAgICAgIH1lbHNlIGlmIChpPj01MCAmJiBpPDYwKXtcclxuICAgICAgICAgICAgICAgIGdyaWQuaW5uZXJIVE1MICs9IGA8ZGl2IGNsYXNzPVwiJHtuYW1lfSBzcXVhcmVcIiBkYXRhLXk9JyR7aS01MH0nIGRhdGEteD0nJHs1fSc+PC9kaXY+YFxyXG4gICAgICAgICAgICB9ZWxzZSBpZiAoaT49NjAgJiYgaTw3MCl7XHJcbiAgICAgICAgICAgICAgICBncmlkLmlubmVySFRNTCArPSBgPGRpdiBjbGFzcz1cIiR7bmFtZX0gc3F1YXJlXCIgZGF0YS15PScke2ktNjB9JyBkYXRhLXg9JyR7Nn0nPjwvZGl2PmBcclxuICAgICAgICAgICAgfWVsc2UgaWYgKGk+PTcwICYmIGk8ODApe1xyXG4gICAgICAgICAgICAgICAgZ3JpZC5pbm5lckhUTUwgKz0gYDxkaXYgY2xhc3M9XCIke25hbWV9IHNxdWFyZVwiIGRhdGEteT0nJHtpLTcwfScgZGF0YS14PSckezd9Jz48L2Rpdj5gXHJcbiAgICAgICAgICAgIH1lbHNlIGlmIChpPj04MCAmJiBpPDkwKXtcclxuICAgICAgICAgICAgICAgIGdyaWQuaW5uZXJIVE1MICs9IGA8ZGl2IGNsYXNzPVwiJHtuYW1lfSBzcXVhcmVcIiBkYXRhLXk9JyR7aS04MH0nIGRhdGEteD0nJHs4fSc+PC9kaXY+YFxyXG4gICAgICAgICAgICB9ZWxzZSBpZiAoaT49OTAgJiYgaTwxMDApe1xyXG4gICAgICAgICAgICAgICAgZ3JpZC5pbm5lckhUTUwgKz0gYDxkaXYgY2xhc3M9XCIke25hbWV9IHNxdWFyZVwiIGRhdGEteT0nJHtpLTkwfScgZGF0YS14PSckezl9Jz48L2Rpdj5gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaSsrXHJcbiAgICAgICAgfVxyXG4gICAgcGxheWVyLmFwcGVuZENoaWxkKGdyaWQpXHJcbiAgICBwbGF5ZXIuYXBwZW5kQ2hpbGQoaW5mbylcclxuICAgIGdhbWUuYXBwZW5kQ2hpbGQocGxheWVyKVxyXG4gICAgfVxyXG4gICAgY29uc3Qgc2hvd1NoaXBzID0gKCkgPT4ge1xyXG4gICAgICAgIGxldCBzaGlwRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgICAgICBsZXQgZ2FtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNnYW1lJylcclxuICAgICAgICBsZXQgcmFuZG9tQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcclxuICAgICAgICByYW5kb21CdG4uaWQgPSAncmFuZG9tLWJ0bidcclxuICAgICAgICByYW5kb21CdG4uaW5uZXJUZXh0ID0gJ1JBTkRPTSdcclxuICAgICAgICBzaGlwRGl2LmlkID0gJ3NoaXBEaXYnXHJcbiAgICAgICAgLy8gQ3JlYXRlcyBhIGluc3RydWN0aW9uIGRpdlxyXG4gICAgICAgIGxldCBpbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgICAgICBpbmZvLmlkID0gJ2luZm8tZGl2JyBcclxuICAgICAgICAvLyAgY3JlYXRlcyBzaGlwcyBkaXZzXHJcbiAgICAgICAgbGV0IGNhcnJpZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgICAgIGxldCBiYXR0bGVzaGlwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgICAgICBsZXQgc3VibWFyaW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgICAgICBsZXQgY3J1c2llciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgICAgbGV0IGRlc3Ryb3llciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgICAgLy8gcHV0cyBhcyBtYW55IGRpdnMgYXMgdGhlIHNoaXAncyBsZW5ndGggaW5zaWRlIHRoZW1cclxuICAgICAgICBsZXQgc2hpcHMgPSBbY2FycmllciwgYmF0dGxlc2hpcCwgc3VibWFyaW5lLCBjcnVzaWVyLCBkZXN0cm95ZXJdXHJcbiAgICAgICAgbGV0IGlkID0gWydjYXJyaWVyJywgJ2JhdHRsZXNoaXAnLCAnc3VibWFyaW5lJywgJ2NydXNpZXInLCAnZGVzdHJveWVyJ11cclxuICAgICAgICBzaGlwRGl2LmFwcGVuZENoaWxkKHJhbmRvbUJ0bilcclxuICAgICAgICBnYW1lLmFwcGVuZENoaWxkKHNoaXBEaXYpXHJcbiAgICAgICAgZm9yKGxldCBpIGluIHNoaXBzKSB7XHJcbiAgICAgICAgICAgIGZvciggbGV0IGo9MDsgajwgcGxheWVyLmdiLmFsbFNoaXBzW2ldLmxlbmd0aDsgaisrKXtcclxuICAgICAgICAgICAgICAgIHNoaXBzW2ldLmlubmVySFRNTCArPSBgPGRpdiBkYXRhLWlkPScke2l9JyBkYXRhLXBvc2l0aW9uPScke2p9JyBzdHlsZT1cImJhY2tncm91bmQ6dXJsKC9kaXN0L2ltZ3MvJHtpZFtpXX0vJHtpZFtpXX0ke2p9LnBuZylcIiBjbGFzcz0nJHtpZFtpXX0gc2hpcEltZyc+YFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNoaXBzW2ldLnNldEF0dHJpYnV0ZSgnZHJhZ2dhYmxlJywgdHJ1ZSkgXHJcbiAgICAgICAgICAgIHNoaXBzW2ldLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBgJHtpZFtpXX0gc2hpcENvbnRhaW5lcmAgKVxyXG4gICAgICAgICAgICBzaGlwc1tpXS5zZXRBdHRyaWJ1dGUoJ2RhdGEtc2hpcCcsIGAke2l9YClcclxuICAgICAgICAgICAgc2hpcERpdi5hcHBlbmRDaGlsZChzaGlwc1tpXSkgICAgICAgICAgIFxyXG4gICAgICAgICAgICBkcmFnKHNoaXBzW2ldKSAgICAgICAgIFxyXG4gICAgICAgIH0gICAgICAgXHJcbiAgICB9XHJcbiAgICBjb25zdCB1cGRhdGVHcmlkID0gZnVuY3Rpb24ocCwgeCwgeSkge1xyXG4gICAgICAgIGxldCBzcXVhcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtwLm5hbWV9W2RhdGEteD0nJHt4fSddW2RhdGEteT0nJHt5fSddYClcclxuICAgICAgICBpZiAocC5uYW1lID09PSAnY3B1Jyljb25zb2xlLnRhYmxlKHAuZ2IuYm9hcmQpXHJcbiAgICAgICAgaWYocC5nYi5ib2FyZFt4XVt5XSA9PT0gJ2hpdCcpe1xyXG4gICAgICAgICAgICBpZihzcXVhcmUuY2hpbGRyZW5bMF0pIHNxdWFyZS5yZW1vdmVDaGlsZChzcXVhcmUuY2hpbGRyZW5bMF0pXHJcbiAgICAgICAgICAgIHNxdWFyZS5zdHlsZS5iYWNrZ3JvdW5kID0gJ3VybCguLi9kaXN0L2ltZ3MvYm9vbS5wbmcpJ1xyXG4gICAgICAgICAgICBzcXVhcmUuc3R5bGUuYW5pbWF0aW9uID0gJ2F0dGFjayAuNXMgZWFzZS1pbidcclxuICAgICAgICB9IGVsc2UgaWYocC5nYi5ib2FyZFt4XVt5XSA9PT0gJ21pc3MnKXtcclxuICAgICAgICAgICAgc3F1YXJlLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhcyBmYS10aW1lc1wiPjwvaT4nXHJcbiAgICAgICAgICAgIHNxdWFyZS5zdHlsZS5hbmltYXRpb24gPSAnYXR0YWNrIC41cyBlYXNlLWluJ1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG4gICAgY29uc3Qgc3RhcnQgPSBmdW5jdGlvbigpeyAgICAgICBcclxuICAgICAgICBncmlkKCdjcHUnKVxyXG4gICAgICAgIGF0dGFjaygpXHJcbiAgICB9XHJcbiAgICBjb25zdCBhdHRhY2sgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCBzcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLmNwdS5zcXVhcmVgKVxyXG4gICAgICAgIGZvciAobGV0IHMgb2Ygc3F1YXJlcykgcy5vbmNsaWNrID0gbnVsbFxyXG4gICAgICAgIGZvciAobGV0IHMgb2Ygc3F1YXJlcykgcy5vbmNsaWNrID0gKGUpID0+IHtcclxuICAgICAgICAgICAgbGV0IGNlbGwgPSBlLnRhcmdldFxyXG4gICAgICAgICAgICBsZXQgeCA9IE51bWJlcihjZWxsLmRhdGFzZXQueClcclxuICAgICAgICAgICAgbGV0IHkgPSBOdW1iZXIoY2VsbC5kYXRhc2V0LnkpXHJcbiAgICAgICAgICAgIGdhbWUucGxheVR1cm4oY3B1LCB4LCB5LCBmYWxzZSlcclxuICAgICAgICAgICAgdXBkYXRlR2FtZSgnY3B1JylcclxuICAgICAgICAgICAgZm9yKGxldCBjIG9mIHNxdWFyZXMpIGMub25jbGljayA9IG51bGxcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBnYW1lLnBsYXlUdXJuKHBsYXllciwgMCwgMCwgdHJ1ZSkgIFxyXG4gICAgICAgICAgICAgICAgYXR0YWNrKCkgICAgICBcclxuICAgICAgICAgICAgICAgIHMub25jbGljayA9IG51bGwgICBcclxuICAgICAgICAgICAgICAgIHVwZGF0ZUdhbWUoJ1BsYXllcicpICAgICBcclxuICAgICAgICAgICAgfSwyMDApICAgICAgICAgICAgIFxyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG4gICAgY29uc3QgdXBkYXRlR2FtZSA9IGZ1bmN0aW9uKHApeyAgICAgICAgXHJcbiAgICAgICAgbGV0IGluZm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZ2FtZS1pbmZvJylcclxuICAgICAgICBpbmZvLmlubmVySFRNTCA9IGAke3B9J3MgdHVybiBgXHJcbiAgICAgICAgbGV0IHBJbmZvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BsYXllci1pbmZvJylcclxuICAgICAgICBsZXQgY0luZm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY3B1LWluZm8nKVxyXG4gICAgICAgIHBJbmZvLmlubmVySFRNTCA9IGBQbGF5ZXIgcmVtYWluaW5nIHNoaXBzOiAkezUgLSBwbGF5ZXIuZ2Iuc3Vua1NoaXBzLmxlbmd0aH1gXHJcbiAgICAgICAgY0luZm8uaW5uZXJIVE1MID0gYENQVSByZW1haW5pbmcgc2hpcHM6ICR7NSAtIGNwdS5nYi5zdW5rU2hpcHMubGVuZ3RofWBcclxuICAgICAgICBjb25zb2xlLmxvZyhbcGxheWVyLmdiLnN1bmtTaGlwcywgY3B1LmdiLnN1bmtTaGlwc10pXHJcbiAgICAgICAgdmVyaWZ5VmljdG9yeSgpXHJcbiAgICB9XHJcbiAgICBjb25zdCB2ZXJpZnlWaWN0b3J5ID0gZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgaW5mbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNnYW1lLWluZm8nKVxyXG4gICAgICAgIGlmKGdhbWUuaXNXaW5uZXIoKSA9PT0gJ2NwdScpIHtcclxuICAgICAgICAgICAgaW5mby5pbm5lckhUTUwgPSBgQ1BVIHdvbmBcclxuICAgICAgICAgICAgc3RvcEdhbWUoKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGdhbWUuaXNXaW5uZXIoKSA9PT0gJ3BsYXllcicpIHtcclxuICAgICAgICAgICAgaW5mby5pbm5lckhUTUwgPSBgUGxheWVyIFdvbmBcclxuICAgICAgICAgICAgc3RvcEdhbWUoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0IHN0b3BHYW1lID0gZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgc3F1YXJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zcXVhcmUnKSAgICAgICAgXHJcbiAgICAgICAgZm9yICggbGV0IHMgb2Ygc3F1YXJlcykgcy5vbmNsaWNrID0gbnVsbFxyXG4gICAgICAgIGxldCByZXN0YXJ0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Jlc3RhcnQtZ2FtZScpXHJcbiAgICAgICAgcmVzdGFydEJ0bi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxyXG4gICAgICAgIHJlc3RhcnRCdG4ub25jbGljayA9ICgpID0+IHtcclxuICAgICAgICAgICAgcmVzdGFydCgpXHJcbiAgICAgICAgICAgIHJlc3RhcnRCdG4uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcclxuICAgICAgICB9IFxyXG4gICAgICAgIGxldCBpbmZvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2dhbWUtaW5mbycpXHJcbiAgICAgICAgaW5mby5pbm5lckhUTUwgKz0gYDwvYnI+UGxheSBhZ2Fpbj9gICAgICAgICBcclxuICAgIH0gICBcclxuICAgIGNvbnN0IHJlc3RhcnQgPSBmdW5jdGlvbigpeyBcclxuICAgICAgICBsZXQgZ2FtZURpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lJykgICAgICAgICBcclxuICAgICAgICBnYW1lRGl2LnJlbW92ZUNoaWxkKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXInKSlcclxuICAgICAgICBnYW1lRGl2LnJlbW92ZUNoaWxkKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjcHUnKSkgICAgICAgIFxyXG4gICAgICAgIGdhbWUucmVzdGFydEFsbCgpICAgICAgICBcclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZ3JpZCxcclxuICAgICAgICBzaG93U2hpcHMsXHJcbiAgICAgICAgdXBkYXRlR3JpZCxcclxuICAgICAgICBzdGFydCxcclxuICAgICAgICByZXN0YXJ0LFxyXG4gICAgICAgIGF0dGFja1xyXG4gICAgfVxyXG59KSgpXHJcblxyXG4iLCJpbXBvcnQge2dhbWUsIHBsYXllcn0gZnJvbSAnLi9pbmRleCdcclxuZXhwb3J0IGNvbnN0IGRyYWcgPSBmdW5jdGlvbihzaGlwKXtcclxuICAgIGxldCBzaGlwSWQgPSBzaGlwLmRhdGFzZXQuc2hpcCAgICAgLy8gZnJvbSAwIHRvIDQsIGNvcnJlc3BvbmQgdG8gc2hpcCBuYW1lc1xyXG4gICAgbGV0IHNoaXBQb3NpdGlvbiAgICAvLyB0aGUgcG9zaXRpb24gd2hlcmUgdGhlIHBsYXllciBwb2ludHMgdGhlIG1vdXNlXHJcbiAgICBsZXQgZGlyZWN0aW9uID0gcGxheWVyLmdiLmRpcmVjdGlvbiAgICAgLy8gc2hpcCBvcmllbnRhdGlvbiwgY2FuIGJlIGhvcml6b250YWwgb3IgdmVydGljYWxcclxuICAgIGxldCByYW5kb21CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmFuZG9tLWJ0bicpXHJcbiAgICBcclxuICAgIGNvbnN0IHZlcmlmeVBvc2l0aW9uID0gKGRpcikgPT4geyAgLy8gdmVyaWZ5IHdoZXRoZXIgdGhlIHBvc2l0aW9uIGlzIG9yIGlzbid0IGhvcml6b250YWxcclxuICAgICAgICBpZihkaXIgPT09ICdob3Jpem9udGFsJykgcmV0dXJuIHRydWVcclxuICAgICAgICBlbHNlIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjb25zdCBzcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNxdWFyZScpICAvL3NxdWFyZXMgb24gdGhlIGdhbWVib2FyZCdzIGdyaWRcclxuICAgIFxyXG4gICAgY29uc3QgbW91c2VEb3duID0gZnVuY3Rpb24oZSkgeyAvL2NhcHR1cmVzIHRoZSBzaGlwcyBpZCBhbmQgcG9zaXRpb25cclxuICAgICAgICBzaGlwUG9zaXRpb24gPSBlLnRhcmdldC5kYXRhc2V0LnBvc2l0aW9uXHJcbiAgICAgICAgZm9yKGxldCBzIG9mIHNxdWFyZXMpIHtcclxuICAgICAgICAgICAgcy5vbmRyb3AgPSBkcm9wLy8gaXMgb24gbW91c2Vkb3duIGJlY2F1c2Ugd2hlbiB0aGUgb25kcm9wIGV2ZW50IGlzIG9uIGRyYWdMaXN0ZW5lcnMoKSBpdCByZXBlYXRzIGFuZCBjaGFuZ2VzIHRoZSBzaGlwcyB2YXJpYWJsZSAgXHJcbiAgICAgICAgICAgIHMub25kcmFnc3RhcnQgPSBkcmFnU3RhcnQgLy8gcHJldmVudHMgc2hpcCBmcm9tIGdldHRpbmcgZHJhZ2dlZCBmcm9tIGdyaWRcclxuICAgICAgICB9ICBcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIGNvbnN0IGRyYWdPdmVyID0gZnVuY3Rpb24oZSl7IC8vYWRkcyBhIGJhY2tncm91bmQgY29sb3IgYXMgZWZmZWN0XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgdGhpcy5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2Y2MycgICBcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIGNvbnN0IGRyYWdMZWF2ZSA9IGZ1bmN0aW9uKGUpe2UudGFyZ2V0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcnfSAvLyBzZXQgY29sb3IgYmFjayB0byBkZWZhdWx0XHJcbiAgICBjb25zdCBkcmFnRW50ZXIgPSAoZSkgPT4gZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICBjb25zdCBkcmFnU3RhcnQgPSAoZSkgPT4gZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICBjb25zdCBkcmFnRW5kID0gKGUpID0+IHt9O1xyXG4gICAgY29uc3Qgcm90YXRlU2hpcCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgc2hpcC5jbGFzc0xpc3QudG9nZ2xlKCd2ZXJ0aWNhbCcpXHJcbiAgICAgICAgZm9yIChsZXQgYSBvZiBzaGlwLmNoaWxkcmVuKSBhLmNsYXNzTGlzdC50b2dnbGUoJ3ZlcicpXHJcbiAgICAgICAgZGlyZWN0aW9uID0gKHNoaXAuY2xhc3NMaXN0WzJdID8gJ3ZlcnRpY2FsJyA6ICdob3Jpem9udGFsJylcclxuICAgIH1cclxuICAgIGNvbnN0IGRyb3AgPSBmdW5jdGlvbihlKXsgLy8gZHJvcCB0aGUgc2hpcCdzIGJsb2NrcyBvbiB0aGUgZ3JpZFxyXG4gICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKClcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICBlLnRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnJ1xyXG4gICAgICAgIGxldCB4ID0gZS50YXJnZXQuZGF0YXNldC54ID8gTnVtYmVyKGUudGFyZ2V0LmRhdGFzZXQueCkgOiBudWxsXHJcbiAgICAgICAgbGV0IHkgPSBlLnRhcmdldC5kYXRhc2V0LnggPyBOdW1iZXIoZS50YXJnZXQuZGF0YXNldC55KSA6IG51bGxcclxuICAgICAgICB5ID0gKHZlcmlmeVBvc2l0aW9uKGRpcmVjdGlvbikgPyB5IC0gc2hpcFBvc2l0aW9uIDogeSlcclxuICAgICAgICB4ID0gKHZlcmlmeVBvc2l0aW9uKGRpcmVjdGlvbikgPyB4IDogeCAtIHNoaXBQb3NpdGlvbilcclxuICAgICAgICBpZihwbGF5ZXIuZ2IudmVyaWZ5U2hpcFBsYWNlbWVudChkaXJlY3Rpb24sIHBsYXllci5nYi5hbGxTaGlwc1tzaGlwSWRdLCB4LCB5KSkge1xyXG4gICAgICAgICAgICBnYW1lLnBsYWNlU2hpcHMocGxheWVyLCBkaXJlY3Rpb24sIHgsIHksIGZhbHNlLCBzaGlwSWQpXHJcbiAgICAgICAgICAgIHNoaXAucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgbW91c2VEb3duKVxyXG4gICAgICAgICAgICBkcm9wU2hpcCh4LHksMCwgdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICBzaGlwLnN0eWxlLmN1cnNvciA9ICdkZWZhdWx0J1xyXG4gICAgICAgIH0gZWxzZSB3aW5kb3cuYWxlcnQoJ0ludmFsaWQgcG9zaXRpb24nKVxyXG4gICAgfVxyXG4gICAgY29uc3QgZHJvcFNoaXAgPSAoeCwgeSxkLCBpZCkgPT4ge1xyXG4gICAgICAgIGlmKGlkICE9PSB1bmRlZmluZWQpIHNoaXBJZCA9IGlkXHJcbiAgICAgICAgaWYgKGQgPT09ICdob3Jpem9udGFsJykgZGlyZWN0aW9uID0gJ2hvcml6b250YWwnXHJcbiAgICAgICAgZWxzZSBpZiAoZCA9PT0gJ3ZlcnRpY2FsJykgZGlyZWN0aW9uID0gJ3ZlcnRpY2FsJ1xyXG4gICAgICAgIGlmKGRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnKXtcclxuICAgICAgICAgICAgZm9yKCBsZXQgaSA9IDA7IGk8IHBsYXllci5nYi5hbGxTaGlwc1tzaGlwSWRdLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS14PScke3h9J11bZGF0YS15PScke3kraX0nXWApXHJcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50U2hpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWlkPScke3NoaXBJZH0nXVtkYXRhLXBvc2l0aW9uPScke2l9J11gKVxyXG4gICAgICAgICAgICAgICAgcy5hcHBlbmRDaGlsZChjdXJyZW50U2hpcClcclxuICAgICAgICAgICAgfSAgICAgIFxyXG4gICAgICAgIH0gZWxzZSBpZihkaXJlY3Rpb24gPT09ICd2ZXJ0aWNhbCcpe1xyXG4gICAgICAgICAgICBmb3IoIGxldCBpID0gMDsgaTwgcGxheWVyLmdiLmFsbFNoaXBzW3NoaXBJZF0ubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXg9JyR7eCtpfSddW2RhdGEteT0nJHt5fSddYClcclxuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRTaGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtaWQ9JyR7c2hpcElkfSddW2RhdGEtcG9zaXRpb249JyR7aX0nXWApXHJcbiAgICAgICAgICAgICAgICBzLmFwcGVuZENoaWxkKGN1cnJlbnRTaGlwKSAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSAgICAgIFxyXG4gICAgICAgIH0gICAgICAgICBcclxuICAgIH1cclxuICAgIGNvbnN0IHJhbmRvbVBsYWNlID0gZnVuY3Rpb24oKXtcclxuICAgICAgICBwbGF5ZXIuZ2IucmVzZXRBbGwoKSAgICAgICAgXHJcbiAgICAgICAgbGV0IHgsIHksIGRcclxuICAgICAgICBsZXQgbmFtZXMgPSBbJ2NhcnJpZXInLCAnYmF0dGxlc2hpcCcsJ3N1Ym1hcmluZScsJ2NydXNpZXInICwgJ2Rlc3Ryb3llciddXHJcbiAgICAgICAgbGV0IHNoaXBzID0gW11cclxuICAgICAgICBmb3IobGV0IGk9MDsgaTxuYW1lcy5sZW5ndGg7IGkrKykgc2hpcHMucHVzaChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuJHtuYW1lc1tpXX0uc2hpcEltZ2ApKVxyXG4gICAgICAgIHNoaXBzLmZvckVhY2goKHNoaXAsIGlkKSA9PntcclxuICAgICAgICAgICAgeCA9IChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkpXHJcbiAgICAgICAgICAgIHkgPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApKVxyXG4gICAgICAgICAgICBkID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpKVxyXG4gICAgICAgICAgICBkID0gKGQgPyAnaG9yaXpvbnRhbCcgOiAndmVydGljYWwnKSAgXHJcbiAgICAgICAgICAgIGlmKHBsYXllci5nYi52ZXJpZnlTaGlwUGxhY2VtZW50KGQsIHBsYXllci5nYi5hbGxTaGlwc1tpZF0sIHgsIHkpKXtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGEgb2Ygc2hpcCkgYS5jbGFzc0xpc3QucmVtb3ZlKCd2ZXInKVxyXG4gICAgICAgICAgICAgICAgaWYoZCA9PT0gJ3ZlcnRpY2FsJykgZm9yIChsZXQgYSBvZiBzaGlwKSBhLmNsYXNzTGlzdC5hZGQoJ3ZlcicpXHJcbiAgICAgICAgICAgICAgICBnYW1lLnBsYWNlU2hpcHMocGxheWVyLCBkLCB4LCB5LCBmYWxzZSwgaWQpXHJcbiAgICAgICAgICAgICAgICBkcm9wU2hpcCh4LHksZCwgaWQpXHJcbiAgICAgICAgICAgIH0gZWxzZSAgeyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgd2hpbGUoIXBsYXllci5nYi52ZXJpZnlTaGlwUGxhY2VtZW50KGQsIHBsYXllci5nYi5hbGxTaGlwc1tpZF0sIHgsIHkpKXtcclxuICAgICAgICAgICAgICAgICAgICB4ID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSlcclxuICAgICAgICAgICAgICAgICAgICB5ID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSlcclxuICAgICAgICAgICAgICAgICAgICBkID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpKVxyXG4gICAgICAgICAgICAgICAgICAgIGQgPSAoZCA/ICdob3Jpem9udGFsJyA6ICd2ZXJ0aWNhbCcpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBhIG9mIHNoaXApIGEuY2xhc3NMaXN0LnJlbW92ZSgndmVyJylcclxuICAgICAgICAgICAgICAgIGlmKGQgPT09ICd2ZXJ0aWNhbCcpIGZvciAobGV0IGEgb2Ygc2hpcCkgYS5jbGFzc0xpc3QuYWRkKCd2ZXInKVxyXG4gICAgICAgICAgICAgICAgZ2FtZS5wbGFjZVNoaXBzKHBsYXllciwgZCwgeCwgeSwgZmFsc2UsIGlkKVxyXG4gICAgICAgICAgICAgICAgZHJvcFNoaXAoeCx5LGQsIGlkKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkgICAgXHJcbiAgICAgICAgY29uc29sZS50YWJsZShwbGF5ZXIuZ2IuYm9hcmQpXHJcbiAgICB9XHJcbiAgICBjb25zdCBkcmFnTGlzdGVuZXJzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmFuZG9tQnRuLm9ubW91c2V1cCA9IChlKSA9PiB7XHJcbiAgICAgICAgICAgIHJhbmRvbVBsYWNlKClcclxuICAgICAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBtb3VzZURvd24pXHJcbiAgICAgICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW5kJywgZHJhZ0VuZClcclxuICAgICAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoJ2RibGNsaWNrJywgcm90YXRlU2hpcCkgICAgICAgIFxyXG4gICAgICAgIGZvciAobGV0IHMgb2Ygc3F1YXJlcyl7XHJcbiAgICAgICAgICAgIHMuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJywgZHJhZ0VudGVyKVxyXG4gICAgICAgICAgICBzLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIGRyYWdMZWF2ZSlcclxuICAgICAgICAgICAgcy5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIGRyYWdPdmVyKVxyXG4gICAgICAgIH0gICAgIFxyXG4gICAgfVxyXG4gICAgZHJhZ0xpc3RlbmVycygpXHJcbiAgICByZXR1cm4gcmFuZG9tUGxhY2VcclxufSIsImltcG9ydCB7IHNoaXBGYWN0b3J5IH0gZnJvbSBcIi4vc2hpcHNcIlxyXG5cclxuZXhwb3J0IGNvbnN0IGdhbWVib2FyZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgLy8geCBhbmQgeSBjb29yZHNcclxuICAgIGxldCBib2FyZCA9IEFycmF5KDEwKS5maWxsKHVuZGVmaW5lZCkubWFwKCh4KSA9PiBBcnJheSgxMCkuZmlsbCh1bmRlZmluZWQpKVxyXG4gICAgY29uc3QgZ2V0Qm9hcmQgPSAoKSA9PiBBcnJheSgxMCkuZmlsbCh1bmRlZmluZWQpLm1hcCgoeCkgPT4gQXJyYXkoMTApLmZpbGwodW5kZWZpbmVkKSlcclxuICAgIGxldCBkaXJlY3Rpb24gPSAnaG9yaXpvbnRhbCdcclxuICAgIGxldCBwbGFjZWRTaGlwcyA9IFtdXHJcbiAgICBsZXQgYWxsU2hpcHMgPSBbXVxyXG4gICAgbGV0IHN1bmtTaGlwcyA9IFtdXHJcbiAgICBsZXQgbWlzc2VkQXR0YWNrcyA9IFtdXHJcbiAgICBsZXQgYWxsQXR0YWNrcyA9IFtdXHJcbiBcclxuICAgIGNvbnN0IGNyZWF0ZVNoaXBzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgYWxsU2hpcHMgPSBbXVxyXG4gICAgICAgIGNvbnN0IGNhcnJpZXIgPSBzaGlwRmFjdG9yeSgnQ2FycmllcicsIDUpXHJcbiAgICAgICAgY29uc3QgYmF0dGxlc2hpcCA9IHNoaXBGYWN0b3J5KCdCYXR0bGVzaGlwJywgNCkgICAgICAgIFxyXG4gICAgICAgIGNvbnN0IHN1Ym1hcmluZSA9IHNoaXBGYWN0b3J5KCdTdWJtYXJpbmUnLCAzKVxyXG4gICAgICAgIGNvbnN0IGNydXNpZXIgPSBzaGlwRmFjdG9yeSgnQ3J1c2llcicsIDMpXHJcbiAgICAgICAgY29uc3QgZGVzdHJveWVyID0gc2hpcEZhY3RvcnkoJ0Rlc3Ryb3llcicsIDIpXHJcbiAgICAgICAgYWxsU2hpcHMucHVzaChjYXJyaWVyLCBiYXR0bGVzaGlwLCAgc3VibWFyaW5lLCBjcnVzaWVyLCBkZXN0cm95ZXIpXHJcbiAgICAgICAgcmV0dXJuIGFsbFNoaXBzXHJcbiAgICB9XHJcbiAgICBjb25zdCB2ZXJpZnlTaGlwUGxhY2VtZW50ID0gZnVuY3Rpb24oZGlyZWMsIHNoaXAsIHgsIHkpIHtcclxuICAgICAgICBpZih0aGlzLmJvYXJkW3hdW3ldID09PSB1bmRlZmluZWQpeyAgXHJcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSBzaGlwIGZpdHMgaW50byB0aGUgc3BvdFxyXG4gICAgICAgICAgICBpZihkaXJlYyA9PT0gJ2hvcml6b250YWwnICYmICh5ICsgKHNoaXAubGVuZ3RoLTEpIDwgMTApKXtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDE7IGkgPCAoc2hpcC5sZW5ndGgpOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuYm9hcmRbeF1beSArIGldICE9PSB1bmRlZmluZWQpIHJldHVybiBmYWxzZSAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYoZGlyZWMgPT09ICd2ZXJ0aWNhbCcgJiYgKHggKyAoc2hpcC5sZW5ndGgtMSkgPCAxMCkpe1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMTsgaTwoc2hpcC5sZW5ndGgpOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuYm9hcmRbeCArIGldW3ldICE9PSB1bmRlZmluZWQpIHJldHVybiBmYWxzZSAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSAgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZSAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0gZWxzZSByZXR1cm4gZmFsc2VcclxuICAgICAgICB9IGVsc2UgcmV0dXJuIGZhbHNlICAgICAgICBcclxuICAgIH1cclxuICAgIGNvbnN0IHBsYWNlU2hpcCA9IGZ1bmN0aW9uKGRpcmVjLCBzaGlwLCB4LCB5KSB7XHJcbiAgICAgICAgLy9Pbmx5IHBsYWNlIGlmIHRoZSBzcGFjZSBpcyBmcmVlXHJcbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlIHNoaXAgZml0cyBpbnRvIHRoZSBzcG90ICAgICAgICBcclxuICAgICAgICBpZihkaXJlYyA9PT0gJ2hvcml6b250YWwnICl7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPHNoaXAubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ib2FyZFt4XVt5ICsgaV0gPSB7c2hpcCwgcG9zaXRpb246IGl9XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnBsYWNlZFNoaXBzLmluZGV4T2Yoc2hpcCkgPT09IC0xKSB0aGlzLnBsYWNlZFNoaXBzLnB1c2goc2hpcClcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9IGVsc2UgaWYoZGlyZWMgPT09ICd2ZXJ0aWNhbCcgKXtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8c2hpcC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJvYXJkW3ggKyBpXVt5XSA9IHtzaGlwLCBwb3NpdGlvbjogaX1cclxuICAgICAgICAgICAgICAgIGlmKHRoaXMucGxhY2VkU2hpcHMuaW5kZXhPZihzaGlwKSA9PT0gLTEpIHRoaXMucGxhY2VkU2hpcHMucHVzaChzaGlwKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBcclxuICAgIH0gXHJcbiAgICAvL3ZlcmlmeSBpZiB0aGUgcGxhY2Ugd2FzIGFscmVhZHkgYXR0YWNrZWRcclxuICAgIGNvbnN0IHZlcmlmeUF0dGFjayA9IGZ1bmN0aW9uKHgsIHkpIHtcclxuICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGFsbEF0dGFja3MpIGlmKGl0ZW1bMF0gPT09IHggJiYgaXRlbVsxXSA9PT0geSkgcmV0dXJuIGZhbHNlICAgICBcclxuICAgICAgICByZXR1cm4gdHJ1ZSAgICBcclxuICAgIH1cclxuICAgIC8vYXR0YWNrIHRoZSBlbmVteSdzIGdhbWVib2FyZFxyXG4gICAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IGZ1bmN0aW9uKHgsIHkpeyAgXHJcbiAgICAgICAgaWYodmVyaWZ5QXR0YWNrKHgsIHkpKXtcclxuICAgICAgICAgICAgaWYoIHR5cGVvZiB0aGlzLmJvYXJkW3hdW3ldID09PSAnb2JqZWN0Jyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJvYXJkW3hdW3ldLnNoaXAuaGl0KHRoaXMuYm9hcmRbeF1beV0ucG9zaXRpb24pXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJvYXJkW3hdW3ldID0gJ2hpdCdcclxuICAgICAgICAgICAgICAgIHRoaXMuYWxsQXR0YWNrcy5wdXNoKFt4LHldKSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuYm9hcmRbeF1beV0gPT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJvYXJkW3hdW3ldID0gJ21pc3MnXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFsbEF0dGFja3MucHVzaChbeCx5XSlcclxuICAgICAgICAgICAgICAgIHRoaXMubWlzc2VkQXR0YWNrcy5wdXNoKFt4LHldKSAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHZlcmlmeVNoaXBzKClcclxuICAgICAgICB9ICAgIFxyXG4gICAgfVxyXG4gICAgLy92ZXJpZnkgaWYgdGhlIHNoaXAgaXMgc3Vua1xyXG4gICAgY29uc3QgdmVyaWZ5U2hpcHMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBmb3IobGV0IHNoaXAgb2YgdGhpcy5wbGFjZWRTaGlwcykge1xyXG4gICAgICAgICAgICBpZihzaGlwLmlzU3VuaygpICYmIHRoaXMuc3Vua1NoaXBzLmluZGV4T2Yoc2hpcCkgPT09IC0xKSB0aGlzLnN1bmtTaGlwcy5wdXNoKHNoaXApXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnN1bmtTaGlwcy5sZW5ndGggPT09IDUpIHJldHVybiAnbG9zZSdcclxuICAgICAgICBlbHNlIHJldHVybiAncGxheWluZydcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gcmVzZXQgZ2FtZVxyXG4gICAgY29uc3QgcmVzZXRBbGwgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMucGxhY2VkU2hpcHMgPSBbXVxyXG4gICAgICAgIHRoaXMuc3Vua1NoaXBzID0gW11cclxuICAgICAgICBhbGxBdHRhY2tzID0gW11cclxuICAgICAgICB0aGlzLmFsbEF0dGFja3MgPSBbXVxyXG4gICAgICAgIHRoaXMubWlzc2VkQXR0YWNrcyA9IFtdXHJcbiAgICAgICAgdGhpcy5ib2FyZCA9IGdldEJvYXJkKClcclxuICAgICAgICBhbGxTaGlwcy5mb3JFYWNoKHNoaXAgPT4gc2hpcC5oaXRQb3NpdGlvbiA9IFtdKSAgICBcclxuICAgICAgICBjb25zb2xlLmxvZyhhbGxTaGlwcywgdGhpcy5hbGxTaGlwcylcclxuICAgIH1cclxuICAgIGNyZWF0ZVNoaXBzKClcclxuICAgIHJldHVybntcclxuICAgICAgICBib2FyZCxcclxuICAgICAgICBkaXJlY3Rpb24sXHJcbiAgICAgICAgcGxhY2VkU2hpcHMsXHJcbiAgICAgICAgYWxsU2hpcHMsXHJcbiAgICAgICAgYWxsQXR0YWNrcyxcclxuICAgICAgICBzdW5rU2hpcHMsXHJcbiAgICAgICAgbWlzc2VkQXR0YWNrcyxcclxuICAgICAgICBjcmVhdGVTaGlwcyxcclxuICAgICAgICBwbGFjZVNoaXAsXHJcbiAgICAgICAgdmVyaWZ5U2hpcFBsYWNlbWVudCxcclxuICAgICAgICB2ZXJpZnlBdHRhY2ssXHJcbiAgICAgICAgcmVjZWl2ZUF0dGFjayxcclxuICAgICAgICB2ZXJpZnlTaGlwcyxcclxuICAgICAgICByZXNldEFsbFxyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBjcmVhdGVQbGF5ZXIgfSBmcm9tICcuL3BsYXllcidcclxuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSAnLi9VSSdcclxuXHJcbmV4cG9ydCBjb25zdCBwbGF5ZXIgPSBjcmVhdGVQbGF5ZXIoJ3BsYXllcicpXHJcbmV4cG9ydCBjb25zdCBjcHUgPSBjcmVhdGVQbGF5ZXIoJ2NwdScpXHJcbmV4cG9ydCBjb25zdCBnYW1lID0gKChwMSwgcDIpID0+IHtcclxuICAgIC8vIFBsYWNlIHNoaXBzIG9uIHRoZSBib2FyZFxyXG4gICAgY29uc3QgcGxhY2VTaGlwcyA9IChwbGF5ZXIsIGRpciwgeDEsIHkxLCBhdXRvLCBzaGlwSW5kZXgpID0+IHtcclxuICAgICAgICBpZihhdXRvID09PSB0cnVlKXtcclxuICAgICAgICAgICAgcGxheWVyLmdiLmFsbFNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApXHJcbiAgICAgICAgICAgICAgICBsZXQgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKVxyXG4gICAgICAgICAgICAgICAgbGV0IGQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKVxyXG4gICAgICAgICAgICAgICAgaWYoZCA9PT0gMSkgZCA9ICdob3Jpem9udGFsJ1xyXG4gICAgICAgICAgICAgICAgZWxzZSBkID0gJ3ZlcnRpY2FsJ1xyXG4gICAgICAgICAgICAgICAgaWYgKHBsYXllci5nYi52ZXJpZnlTaGlwUGxhY2VtZW50KGQsIHNoaXAsIHgsIHkpID09PSBmYWxzZSApe1xyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlKHBsYXllci5nYi52ZXJpZnlTaGlwUGxhY2VtZW50KGQsIHNoaXAsIHgsIHkpID09PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLmdiLnBsYWNlU2hpcChkLHNoaXAsIHgsIHkpXHJcbiAgICAgICAgICAgIH0gZWxzZSBwbGF5ZXIuZ2IucGxhY2VTaGlwKGQsc2hpcCwgeCwgeSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgc2hpcCA9IHBsYXllci5nYi5hbGxTaGlwc1tzaGlwSW5kZXhdXHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXIuZ2IudmVyaWZ5U2hpcFBsYWNlbWVudChkaXIsIHNoaXAsIHgxLCB5MSkgPT09IGZhbHNlICl7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuYWxlcnQoJ0ludmFsaWQgcG9zaXRpb24nKVxyXG4gICAgICAgICAgICB9IGVsc2UgcDEuZ2IucGxhY2VTaGlwKGRpcixzaGlwLCB4MSwgeTEpICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgIH0gXHJcbiAgICAvL1BsYXkgZ2FtZSB0dXJucywgcGxheWVyIHggY3B1XHJcbiAgICBjb25zdCBwbGF5VHVybiA9IGZ1bmN0aW9uKHAsIHgxLCB5MSwgYXV0bykge1xyXG4gICAgICAgIGlmKGF1dG8gPT09IHRydWUpe1xyXG4gICAgICAgICAgICBsZXQgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKVxyXG4gICAgICAgICAgICBsZXQgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZighcC5nYi52ZXJpZnlBdHRhY2soeCx5KSl7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSghcC5nYi52ZXJpZnlBdHRhY2soeCx5KSl7XHJcbiAgICAgICAgICAgICAgICAgICAgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKVxyXG4gICAgICAgICAgICAgICAgICAgIHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMClcclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBwLmdiLnJlY2VpdmVBdHRhY2soeCwgeSlcclxuICAgICAgICAgICAgICAgIHJlbmRlci51cGRhdGVHcmlkKHAsIHgsIHkpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7cC5nYi5yZWNlaXZlQXR0YWNrKHgsIHkpO3JlbmRlci51cGRhdGVHcmlkKHAsIHgsIHkpfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHAuZ2IucmVjZWl2ZUF0dGFjayh4MSwgeTEgKVxyXG4gICAgICAgICAgICByZW5kZXIudXBkYXRlR3JpZChwLCB4MSwgeTEpXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFtwMS5nYi5hbGxBdHRhY2tzLCBwMi5nYi5hbGxBdHRhY2tzLCBwMi5nYi5zdW5rU2hpcHNdKVxyXG4gICAgICAgIH0gICAgICBcclxuICAgICAgICBpc1dpbm5lcigpXHJcbiAgICB9XHJcbiAgICBjb25zdCBpc1dpbm5lciA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgaWYocDEuZ2IudmVyaWZ5U2hpcHMoKSA9PT0gJ2xvc2UnKSB7Y29uc29sZS5sb2coYCR7cDIubmFtZX1gICk7cmV0dXJuIGAke3AyLm5hbWV9YH1cclxuICAgICAgICBlbHNlIGlmKHAyLmdiLnZlcmlmeVNoaXBzKCkgPT09ICdsb3NlJykge2NvbnNvbGUubG9nKGAke3AxLm5hbWV9YCApO3JldHVybiBgJHtwMS5uYW1lfWB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBjb25zdCBwbGF5ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcGxhY2VTaGlwcyhwMiwgJ2hvcml6b250YWwnLCAwLCAwLCB0cnVlLCAwKVxyXG4gICAgICAgIHJlbmRlci5ncmlkKCdwbGF5ZXInKVxyXG4gICAgICAgIHJlbmRlci5zaG93U2hpcHMoKSAgICBcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RhcnQtZ2FtZScpLnN0eWxlLmRpc3BsYXkgPSAnZmxleCdcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RhcnQtZ2FtZScpLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChwMS5nYi5wbGFjZWRTaGlwcy5sZW5ndGggPT09IDUpIHtcclxuICAgICAgICAgICAgcmVuZGVyLnN0YXJ0KClcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3JhbmRvbS1idG4nKS5yZW1vdmUoKVxyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2hpcERpdicpLnJlbW92ZSgpXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdGFydC1nYW1lJykuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RhcnQtZ2FtZScpLm9uY2xpY2sgPSBudWxsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zdCByZXN0YXJ0QWxsID0gZnVuY3Rpb24oKXtcclxuICAgICAgICBwMS5nYi5yZXNldEFsbCgpXHJcbiAgICAgICAgcDIuZ2IucmVzZXRBbGwoKSAgXHJcbiAgICAgICAgLy8gcDEuZ2IuYWxsU2hpcHMuZm9yRWFjaChzaGlwID0+IHNoaXAucmVzZXRIaXRzKCkpXHJcbiAgICAgICAgLy8gcDIuZ2IuYWxsU2hpcHMuZm9yRWFjaChzaGlwID0+IHNoaXAucmVzZXRIaXRzKCkpXHJcbiAgICAgICAgZ2FtZS5wbGF5KClcclxuICAgICAgICBjb25zb2xlLmxvZyhbcDIuZ2IuYWxsU2hpcHMsIHAyLmdiLnBsYWNlZFNoaXBzXSlcclxuICAgIH0gICAgXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHBsYWNlU2hpcHMsIFxyXG4gICAgICAgIHBsYXlUdXJuLFxyXG4gICAgICAgIGlzV2lubmVyLFxyXG4gICAgICAgIHBsYXksXHJcbiAgICAgICAgcmVzdGFydEFsbFxyXG4gICAgfVxyXG59KShwbGF5ZXIsIGNwdSlcclxuXHJcbmdhbWUucGxheSgpXHJcbiIsImltcG9ydCB7IGdhbWVib2FyZCB9IGZyb20gXCIuL2dhbWVib2FyZFwiXHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlUGxheWVyID0gKG5hbWUpID0+IHtcclxuICAgIGNvbnN0IGdiID0gZ2FtZWJvYXJkKClcclxuXHJcbiAgICByZXR1cm4ge25hbWUsIGdifVxyXG59XHJcblxyXG4iLCJleHBvcnQgY29uc3Qgc2hpcEZhY3RvcnkgPSAobmFtZSwgbGVuKSA9PiB7XHJcbiAgICBjb25zdCBpZCA9IG5hbWVcclxuICAgIGNvbnN0IGxlbmd0aCA9IGxlblxyXG4gICAgbGV0IGhpdFBvc2l0aW9uID0gW11cclxuICAgIGxldCBzdW5rID0gZmFsc2VcclxuICAgIGNvbnN0IGhpdCA9IGZ1bmN0aW9uKHBvcykge1xyXG4gICAgICAgIHRoaXMuaGl0UG9zaXRpb24ucHVzaChwb3MpXHJcbiAgICB9XHJcbiAgICBjb25zdCBpc1N1bmsgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZih0aGlzLmhpdFBvc2l0aW9uLmxlbmd0aCA9PT0gbGVuZ3RoKSB0aGlzLnN1bmsgPSB0cnVlICAgICAgICAgICAgXHJcbiAgICAgICAgZWxzZSB0aGlzLnN1bmsgPSBmYWxzZVxyXG4gICAgICAgIHJldHVybiB0aGlzLnN1bmtcclxuICAgIH1cclxuICAgIHJldHVybiB7aWQsIFxyXG4gICAgICAgIGxlbmd0aCwgXHJcbiAgICAgICAgaGl0UG9zaXRpb24sIFxyXG4gICAgICAgIHN1bmssIFxyXG4gICAgICAgIGhpdCwgXHJcbiAgICAgICAgaXNTdW5rLCBcclxuICAgICAgICB9XHJcbn1cclxuXHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=