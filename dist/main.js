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
                ships[i].innerHTML += `<div data-id='${i}' data-position='${j}' style="background:url(./imgs/${id[i]}/${id[i]}${j}.png)" class='${id[i]} shipImg'>`
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
        if(p.gb.board[x][y] === 'hit'){
            if(square.children[0]) square.removeChild(square.children[0])
            square.style.background = 'url(./imgs/boom.png)'
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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d2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZHJhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwbGF5ZXIsIGNwdSAsIGdhbWUgfSBmcm9tIFwiLi9pbmRleFwiXHJcbmltcG9ydCB7IGRyYWcgfSBmcm9tIFwiLi9kcmFnXCJcclxuZXhwb3J0IGNvbnN0IHJlbmRlciA9ICgoKSA9PiB7XHJcbiAgICBcclxuICAgIGNvbnN0IGdyaWQgPSAobmFtZSkgPT4ge1xyXG4gICAgICAgIGxldCBnYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2dhbWUnKVxyXG4gICAgICAgIGxldCBwbGF5ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgICAgIHBsYXllci5pZCA9IGAke25hbWV9YFxyXG4gICAgICAgIGxldCBpbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgICAgICBsZXQgZ3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgICAgaW5mby5pZCA9IGAke25hbWV9LWluZm9gXHJcbiAgICAgICAgZ3JpZC5pZCA9IGAke25hbWV9LWdhbWVib2FyZGBcclxuICAgICAgICBncmlkLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZ2FtZWJvYXJkJylcclxuICAgICAgICBsZXQgaSA9IDBcclxuICAgICAgICB3aGlsZShpPDEwMCkge1xyXG4gICAgICAgICAgICBpZihpPj0wICYmIGk8MTApe1xyXG4gICAgICAgICAgICAgICAgZ3JpZC5pbm5lckhUTUwgKz0gYDxkaXYgY2xhc3M9XCIke25hbWV9IHNxdWFyZVwiIGRhdGEteT0nJHtpfScgZGF0YS14PSckezB9Jz48L2Rpdj5gXHJcbiAgICAgICAgICAgIH1lbHNlIGlmIChpPj0xMCAmJiBpPDIwKXtcclxuICAgICAgICAgICAgICAgIGdyaWQuaW5uZXJIVE1MICs9IGA8ZGl2IGNsYXNzPVwiJHtuYW1lfSBzcXVhcmVcIiBkYXRhLXk9JyR7aS0xMH0nIGRhdGEteD0nJHsxfSc+PC9kaXY+YFxyXG4gICAgICAgICAgICB9ZWxzZSBpZiAoaT49MjAgJiYgaTwzMCl7XHJcbiAgICAgICAgICAgICAgICBncmlkLmlubmVySFRNTCArPSBgPGRpdiBjbGFzcz1cIiR7bmFtZX0gc3F1YXJlXCIgZGF0YS15PScke2ktMjB9JyBkYXRhLXg9JyR7Mn0nPjwvZGl2PmBcclxuICAgICAgICAgICAgfWVsc2UgaWYgKGk+PTMwICYmIGk8NDApe1xyXG4gICAgICAgICAgICAgICAgZ3JpZC5pbm5lckhUTUwgKz0gYDxkaXYgY2xhc3M9XCIke25hbWV9IHNxdWFyZVwiIGRhdGEteT0nJHtpLTMwfScgZGF0YS14PSckezN9Jz48L2Rpdj5gXHJcbiAgICAgICAgICAgIH1lbHNlIGlmIChpPj00MCAmJiBpPDUwKXtcclxuICAgICAgICAgICAgICAgIGdyaWQuaW5uZXJIVE1MICs9IGA8ZGl2IGNsYXNzPVwiJHtuYW1lfSBzcXVhcmVcIiBkYXRhLXk9JyR7aS00MH0nIGRhdGEteD0nJHs0fSc+PC9kaXY+YFxyXG4gICAgICAgICAgICB9ZWxzZSBpZiAoaT49NTAgJiYgaTw2MCl7XHJcbiAgICAgICAgICAgICAgICBncmlkLmlubmVySFRNTCArPSBgPGRpdiBjbGFzcz1cIiR7bmFtZX0gc3F1YXJlXCIgZGF0YS15PScke2ktNTB9JyBkYXRhLXg9JyR7NX0nPjwvZGl2PmBcclxuICAgICAgICAgICAgfWVsc2UgaWYgKGk+PTYwICYmIGk8NzApe1xyXG4gICAgICAgICAgICAgICAgZ3JpZC5pbm5lckhUTUwgKz0gYDxkaXYgY2xhc3M9XCIke25hbWV9IHNxdWFyZVwiIGRhdGEteT0nJHtpLTYwfScgZGF0YS14PSckezZ9Jz48L2Rpdj5gXHJcbiAgICAgICAgICAgIH1lbHNlIGlmIChpPj03MCAmJiBpPDgwKXtcclxuICAgICAgICAgICAgICAgIGdyaWQuaW5uZXJIVE1MICs9IGA8ZGl2IGNsYXNzPVwiJHtuYW1lfSBzcXVhcmVcIiBkYXRhLXk9JyR7aS03MH0nIGRhdGEteD0nJHs3fSc+PC9kaXY+YFxyXG4gICAgICAgICAgICB9ZWxzZSBpZiAoaT49ODAgJiYgaTw5MCl7XHJcbiAgICAgICAgICAgICAgICBncmlkLmlubmVySFRNTCArPSBgPGRpdiBjbGFzcz1cIiR7bmFtZX0gc3F1YXJlXCIgZGF0YS15PScke2ktODB9JyBkYXRhLXg9JyR7OH0nPjwvZGl2PmBcclxuICAgICAgICAgICAgfWVsc2UgaWYgKGk+PTkwICYmIGk8MTAwKXtcclxuICAgICAgICAgICAgICAgIGdyaWQuaW5uZXJIVE1MICs9IGA8ZGl2IGNsYXNzPVwiJHtuYW1lfSBzcXVhcmVcIiBkYXRhLXk9JyR7aS05MH0nIGRhdGEteD0nJHs5fSc+PC9kaXY+YFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGkrK1xyXG4gICAgICAgIH1cclxuICAgIHBsYXllci5hcHBlbmRDaGlsZChncmlkKVxyXG4gICAgcGxheWVyLmFwcGVuZENoaWxkKGluZm8pXHJcbiAgICBnYW1lLmFwcGVuZENoaWxkKHBsYXllcilcclxuICAgIH1cclxuICAgIGNvbnN0IHNob3dTaGlwcyA9ICgpID0+IHtcclxuICAgICAgICBsZXQgc2hpcERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgICAgbGV0IGdhbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZ2FtZScpXHJcbiAgICAgICAgbGV0IHJhbmRvbUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXHJcbiAgICAgICAgcmFuZG9tQnRuLmlkID0gJ3JhbmRvbS1idG4nXHJcbiAgICAgICAgcmFuZG9tQnRuLmlubmVyVGV4dCA9ICdSQU5ET00nXHJcbiAgICAgICAgc2hpcERpdi5pZCA9ICdzaGlwRGl2J1xyXG4gICAgICAgIC8vIENyZWF0ZXMgYSBpbnN0cnVjdGlvbiBkaXZcclxuICAgICAgICBsZXQgaW5mbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgICAgaW5mby5pZCA9ICdpbmZvLWRpdicgXHJcbiAgICAgICAgLy8gIGNyZWF0ZXMgc2hpcHMgZGl2c1xyXG4gICAgICAgIGxldCBjYXJyaWVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgICAgICBsZXQgYmF0dGxlc2hpcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgICAgbGV0IHN1Ym1hcmluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgICAgbGV0IGNydXNpZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgICAgIGxldCBkZXN0cm95ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgICAgIC8vIHB1dHMgYXMgbWFueSBkaXZzIGFzIHRoZSBzaGlwJ3MgbGVuZ3RoIGluc2lkZSB0aGVtXHJcbiAgICAgICAgbGV0IHNoaXBzID0gW2NhcnJpZXIsIGJhdHRsZXNoaXAsIHN1Ym1hcmluZSwgY3J1c2llciwgZGVzdHJveWVyXVxyXG4gICAgICAgIGxldCBpZCA9IFsnY2FycmllcicsICdiYXR0bGVzaGlwJywgJ3N1Ym1hcmluZScsICdjcnVzaWVyJywgJ2Rlc3Ryb3llciddXHJcbiAgICAgICAgc2hpcERpdi5hcHBlbmRDaGlsZChyYW5kb21CdG4pXHJcbiAgICAgICAgZ2FtZS5hcHBlbmRDaGlsZChzaGlwRGl2KVxyXG4gICAgICAgIGZvcihsZXQgaSBpbiBzaGlwcykge1xyXG4gICAgICAgICAgICBmb3IoIGxldCBqPTA7IGo8IHBsYXllci5nYi5hbGxTaGlwc1tpXS5sZW5ndGg7IGorKyl7XHJcbiAgICAgICAgICAgICAgICBzaGlwc1tpXS5pbm5lckhUTUwgKz0gYDxkaXYgZGF0YS1pZD0nJHtpfScgZGF0YS1wb3NpdGlvbj0nJHtqfScgc3R5bGU9XCJiYWNrZ3JvdW5kOnVybCguL2ltZ3MvJHtpZFtpXX0vJHtpZFtpXX0ke2p9LnBuZylcIiBjbGFzcz0nJHtpZFtpXX0gc2hpcEltZyc+YFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNoaXBzW2ldLnNldEF0dHJpYnV0ZSgnZHJhZ2dhYmxlJywgdHJ1ZSkgXHJcbiAgICAgICAgICAgIHNoaXBzW2ldLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBgJHtpZFtpXX0gc2hpcENvbnRhaW5lcmAgKVxyXG4gICAgICAgICAgICBzaGlwc1tpXS5zZXRBdHRyaWJ1dGUoJ2RhdGEtc2hpcCcsIGAke2l9YClcclxuICAgICAgICAgICAgc2hpcERpdi5hcHBlbmRDaGlsZChzaGlwc1tpXSkgICAgICAgICAgIFxyXG4gICAgICAgICAgICBkcmFnKHNoaXBzW2ldKSAgICAgICAgIFxyXG4gICAgICAgIH0gICAgICAgXHJcbiAgICB9XHJcbiAgICBjb25zdCB1cGRhdGVHcmlkID0gZnVuY3Rpb24ocCwgeCwgeSkge1xyXG4gICAgICAgIGxldCBzcXVhcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtwLm5hbWV9W2RhdGEteD0nJHt4fSddW2RhdGEteT0nJHt5fSddYClcclxuICAgICAgICBpZihwLmdiLmJvYXJkW3hdW3ldID09PSAnaGl0Jyl7XHJcbiAgICAgICAgICAgIGlmKHNxdWFyZS5jaGlsZHJlblswXSkgc3F1YXJlLnJlbW92ZUNoaWxkKHNxdWFyZS5jaGlsZHJlblswXSlcclxuICAgICAgICAgICAgc3F1YXJlLnN0eWxlLmJhY2tncm91bmQgPSAndXJsKC4vaW1ncy9ib29tLnBuZyknXHJcbiAgICAgICAgICAgIHNxdWFyZS5zdHlsZS5hbmltYXRpb24gPSAnYXR0YWNrIC41cyBlYXNlLWluJ1xyXG4gICAgICAgIH0gZWxzZSBpZihwLmdiLmJvYXJkW3hdW3ldID09PSAnbWlzcycpe1xyXG4gICAgICAgICAgICBzcXVhcmUuaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmFzIGZhLXRpbWVzXCI+PC9pPidcclxuICAgICAgICAgICAgc3F1YXJlLnN0eWxlLmFuaW1hdGlvbiA9ICdhdHRhY2sgLjVzIGVhc2UtaW4nXHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcbiAgICBjb25zdCBzdGFydCA9IGZ1bmN0aW9uKCl7ICAgICAgIFxyXG4gICAgICAgIGdyaWQoJ2NwdScpXHJcbiAgICAgICAgYXR0YWNrKClcclxuICAgIH1cclxuICAgIGNvbnN0IGF0dGFjayA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGV0IHNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuY3B1LnNxdWFyZWApXHJcbiAgICAgICAgZm9yIChsZXQgcyBvZiBzcXVhcmVzKSBzLm9uY2xpY2sgPSBudWxsXHJcbiAgICAgICAgZm9yIChsZXQgcyBvZiBzcXVhcmVzKSBzLm9uY2xpY2sgPSAoZSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY2VsbCA9IGUudGFyZ2V0XHJcbiAgICAgICAgICAgIGxldCB4ID0gTnVtYmVyKGNlbGwuZGF0YXNldC54KVxyXG4gICAgICAgICAgICBsZXQgeSA9IE51bWJlcihjZWxsLmRhdGFzZXQueSlcclxuICAgICAgICAgICAgZ2FtZS5wbGF5VHVybihjcHUsIHgsIHksIGZhbHNlKVxyXG4gICAgICAgICAgICB1cGRhdGVHYW1lKCdjcHUnKVxyXG4gICAgICAgICAgICBmb3IobGV0IGMgb2Ygc3F1YXJlcykgYy5vbmNsaWNrID0gbnVsbFxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGdhbWUucGxheVR1cm4ocGxheWVyLCAwLCAwLCB0cnVlKSAgXHJcbiAgICAgICAgICAgICAgICBhdHRhY2soKSAgICAgIFxyXG4gICAgICAgICAgICAgICAgcy5vbmNsaWNrID0gbnVsbCAgIFxyXG4gICAgICAgICAgICAgICAgdXBkYXRlR2FtZSgnUGxheWVyJykgICAgIFxyXG4gICAgICAgICAgICB9LDIwMCkgICAgICAgICAgICAgXHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcbiAgICBjb25zdCB1cGRhdGVHYW1lID0gZnVuY3Rpb24ocCl7ICAgICAgICBcclxuICAgICAgICBsZXQgaW5mbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNnYW1lLWluZm8nKVxyXG4gICAgICAgIGluZm8uaW5uZXJIVE1MID0gYCR7cH0ncyB0dXJuIGBcclxuICAgICAgICBsZXQgcEluZm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGxheWVyLWluZm8nKVxyXG4gICAgICAgIGxldCBjSW5mbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjcHUtaW5mbycpXHJcbiAgICAgICAgcEluZm8uaW5uZXJIVE1MID0gYFBsYXllciByZW1haW5pbmcgc2hpcHM6ICR7NSAtIHBsYXllci5nYi5zdW5rU2hpcHMubGVuZ3RofWBcclxuICAgICAgICBjSW5mby5pbm5lckhUTUwgPSBgQ1BVIHJlbWFpbmluZyBzaGlwczogJHs1IC0gY3B1LmdiLnN1bmtTaGlwcy5sZW5ndGh9YFxyXG4gICAgICAgIHZlcmlmeVZpY3RvcnkoKVxyXG4gICAgfVxyXG4gICAgY29uc3QgdmVyaWZ5VmljdG9yeSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGV0IGluZm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZ2FtZS1pbmZvJylcclxuICAgICAgICBpZihnYW1lLmlzV2lubmVyKCkgPT09ICdjcHUnKSB7XHJcbiAgICAgICAgICAgIGluZm8uaW5uZXJIVE1MID0gYENQVSB3b25gXHJcbiAgICAgICAgICAgIHN0b3BHYW1lKClcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihnYW1lLmlzV2lubmVyKCkgPT09ICdwbGF5ZXInKSB7XHJcbiAgICAgICAgICAgIGluZm8uaW5uZXJIVE1MID0gYFBsYXllciBXb25gXHJcbiAgICAgICAgICAgIHN0b3BHYW1lKClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zdCBzdG9wR2FtZSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGV0IHNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc3F1YXJlJykgICAgICAgIFxyXG4gICAgICAgIGZvciAoIGxldCBzIG9mIHNxdWFyZXMpIHMub25jbGljayA9IG51bGxcclxuICAgICAgICBsZXQgcmVzdGFydEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZXN0YXJ0LWdhbWUnKVxyXG4gICAgICAgIHJlc3RhcnRCdG4uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcclxuICAgICAgICByZXN0YXJ0QnRuLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJlc3RhcnQoKVxyXG4gICAgICAgICAgICByZXN0YXJ0QnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXHJcbiAgICAgICAgfSBcclxuICAgICAgICBsZXQgaW5mbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNnYW1lLWluZm8nKVxyXG4gICAgICAgIGluZm8uaW5uZXJIVE1MICs9IGA8L2JyPlBsYXkgYWdhaW4/YCAgICAgICAgXHJcbiAgICB9ICAgXHJcbiAgICBjb25zdCByZXN0YXJ0ID0gZnVuY3Rpb24oKXsgXHJcbiAgICAgICAgbGV0IGdhbWVEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZScpICAgICAgICAgXHJcbiAgICAgICAgZ2FtZURpdi5yZW1vdmVDaGlsZChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyJykpXHJcbiAgICAgICAgZ2FtZURpdi5yZW1vdmVDaGlsZChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3B1JykpICAgICAgICBcclxuICAgICAgICBnYW1lLnJlc3RhcnRBbGwoKSAgICAgICAgXHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdyaWQsXHJcbiAgICAgICAgc2hvd1NoaXBzLFxyXG4gICAgICAgIHVwZGF0ZUdyaWQsXHJcbiAgICAgICAgc3RhcnQsXHJcbiAgICAgICAgcmVzdGFydCxcclxuICAgICAgICBhdHRhY2tcclxuICAgIH1cclxufSkoKVxyXG5cclxuIiwiaW1wb3J0IHtnYW1lLCBwbGF5ZXJ9IGZyb20gJy4vaW5kZXgnXHJcbmV4cG9ydCBjb25zdCBkcmFnID0gZnVuY3Rpb24oc2hpcCl7XHJcbiAgICBsZXQgc2hpcElkID0gc2hpcC5kYXRhc2V0LnNoaXAgICAgIC8vIGZyb20gMCB0byA0LCBjb3JyZXNwb25kIHRvIHNoaXAgbmFtZXNcclxuICAgIGxldCBzaGlwUG9zaXRpb24gICAgLy8gdGhlIHBvc2l0aW9uIHdoZXJlIHRoZSBwbGF5ZXIgcG9pbnRzIHRoZSBtb3VzZVxyXG4gICAgbGV0IGRpcmVjdGlvbiA9IHBsYXllci5nYi5kaXJlY3Rpb24gICAgIC8vIHNoaXAgb3JpZW50YXRpb24sIGNhbiBiZSBob3Jpem9udGFsIG9yIHZlcnRpY2FsXHJcbiAgICBsZXQgcmFuZG9tQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3JhbmRvbS1idG4nKVxyXG4gICAgXHJcbiAgICBjb25zdCB2ZXJpZnlQb3NpdGlvbiA9IChkaXIpID0+IHsgIC8vIHZlcmlmeSB3aGV0aGVyIHRoZSBwb3NpdGlvbiBpcyBvciBpc24ndCBob3Jpem9udGFsXHJcbiAgICAgICAgaWYoZGlyID09PSAnaG9yaXpvbnRhbCcpIHJldHVybiB0cnVlXHJcbiAgICAgICAgZWxzZSByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuICAgIFxyXG4gICAgY29uc3Qgc3F1YXJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zcXVhcmUnKSAgLy9zcXVhcmVzIG9uIHRoZSBnYW1lYm9hcmQncyBncmlkXHJcbiAgICBcclxuICAgIGNvbnN0IG1vdXNlRG93biA9IGZ1bmN0aW9uKGUpIHsgLy9jYXB0dXJlcyB0aGUgc2hpcHMgaWQgYW5kIHBvc2l0aW9uXHJcbiAgICAgICAgc2hpcFBvc2l0aW9uID0gZS50YXJnZXQuZGF0YXNldC5wb3NpdGlvblxyXG4gICAgICAgIGZvcihsZXQgcyBvZiBzcXVhcmVzKSB7XHJcbiAgICAgICAgICAgIHMub25kcm9wID0gZHJvcC8vIGlzIG9uIG1vdXNlZG93biBiZWNhdXNlIHdoZW4gdGhlIG9uZHJvcCBldmVudCBpcyBvbiBkcmFnTGlzdGVuZXJzKCkgaXQgcmVwZWF0cyBhbmQgY2hhbmdlcyB0aGUgc2hpcHMgdmFyaWFibGUgIFxyXG4gICAgICAgICAgICBzLm9uZHJhZ3N0YXJ0ID0gZHJhZ1N0YXJ0IC8vIHByZXZlbnRzIHNoaXAgZnJvbSBnZXR0aW5nIGRyYWdnZWQgZnJvbSBncmlkXHJcbiAgICAgICAgfSAgXHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBjb25zdCBkcmFnT3ZlciA9IGZ1bmN0aW9uKGUpeyAvL2FkZHMgYSBiYWNrZ3JvdW5kIGNvbG9yIGFzIGVmZmVjdFxyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgIHRoaXMuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNmNjMnICAgXHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBjb25zdCBkcmFnTGVhdmUgPSBmdW5jdGlvbihlKXtlLnRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnJ30gLy8gc2V0IGNvbG9yIGJhY2sgdG8gZGVmYXVsdFxyXG4gICAgY29uc3QgZHJhZ0VudGVyID0gKGUpID0+IGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgY29uc3QgZHJhZ1N0YXJ0ID0gKGUpID0+IGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgY29uc3QgZHJhZ0VuZCA9IChlKSA9PiB7fTtcclxuICAgIGNvbnN0IHJvdGF0ZVNoaXAgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIHNoaXAuY2xhc3NMaXN0LnRvZ2dsZSgndmVydGljYWwnKVxyXG4gICAgICAgIGZvciAobGV0IGEgb2Ygc2hpcC5jaGlsZHJlbikgYS5jbGFzc0xpc3QudG9nZ2xlKCd2ZXInKVxyXG4gICAgICAgIGRpcmVjdGlvbiA9IChzaGlwLmNsYXNzTGlzdFsyXSA/ICd2ZXJ0aWNhbCcgOiAnaG9yaXpvbnRhbCcpXHJcbiAgICB9XHJcbiAgICBjb25zdCBkcm9wID0gZnVuY3Rpb24oZSl7IC8vIGRyb3AgdGhlIHNoaXAncyBibG9ja3Mgb24gdGhlIGdyaWRcclxuICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpXHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgZS50YXJnZXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJydcclxuICAgICAgICBsZXQgeCA9IGUudGFyZ2V0LmRhdGFzZXQueCA/IE51bWJlcihlLnRhcmdldC5kYXRhc2V0LngpIDogbnVsbFxyXG4gICAgICAgIGxldCB5ID0gZS50YXJnZXQuZGF0YXNldC54ID8gTnVtYmVyKGUudGFyZ2V0LmRhdGFzZXQueSkgOiBudWxsXHJcbiAgICAgICAgeSA9ICh2ZXJpZnlQb3NpdGlvbihkaXJlY3Rpb24pID8geSAtIHNoaXBQb3NpdGlvbiA6IHkpXHJcbiAgICAgICAgeCA9ICh2ZXJpZnlQb3NpdGlvbihkaXJlY3Rpb24pID8geCA6IHggLSBzaGlwUG9zaXRpb24pXHJcbiAgICAgICAgaWYocGxheWVyLmdiLnZlcmlmeVNoaXBQbGFjZW1lbnQoZGlyZWN0aW9uLCBwbGF5ZXIuZ2IuYWxsU2hpcHNbc2hpcElkXSwgeCwgeSkpIHtcclxuICAgICAgICAgICAgZ2FtZS5wbGFjZVNoaXBzKHBsYXllciwgZGlyZWN0aW9uLCB4LCB5LCBmYWxzZSwgc2hpcElkKVxyXG4gICAgICAgICAgICBzaGlwLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIG1vdXNlRG93bilcclxuICAgICAgICAgICAgZHJvcFNoaXAoeCx5LDAsIHVuZGVmaW5lZClcclxuICAgICAgICAgICAgc2hpcC5zdHlsZS5jdXJzb3IgPSAnZGVmYXVsdCdcclxuICAgICAgICB9IGVsc2Ugd2luZG93LmFsZXJ0KCdJbnZhbGlkIHBvc2l0aW9uJylcclxuICAgIH1cclxuICAgIGNvbnN0IGRyb3BTaGlwID0gKHgsIHksZCwgaWQpID0+IHtcclxuICAgICAgICBpZihpZCAhPT0gdW5kZWZpbmVkKSBzaGlwSWQgPSBpZFxyXG4gICAgICAgIGlmIChkID09PSAnaG9yaXpvbnRhbCcpIGRpcmVjdGlvbiA9ICdob3Jpem9udGFsJ1xyXG4gICAgICAgIGVsc2UgaWYgKGQgPT09ICd2ZXJ0aWNhbCcpIGRpcmVjdGlvbiA9ICd2ZXJ0aWNhbCdcclxuICAgICAgICBpZihkaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJyl7XHJcbiAgICAgICAgICAgIGZvciggbGV0IGkgPSAwOyBpPCBwbGF5ZXIuZ2IuYWxsU2hpcHNbc2hpcElkXS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEteD0nJHt4fSddW2RhdGEteT0nJHt5K2l9J11gKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFNoaXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1pZD0nJHtzaGlwSWR9J11bZGF0YS1wb3NpdGlvbj0nJHtpfSddYClcclxuICAgICAgICAgICAgICAgIHMuYXBwZW5kQ2hpbGQoY3VycmVudFNoaXApXHJcbiAgICAgICAgICAgIH0gICAgICBcclxuICAgICAgICB9IGVsc2UgaWYoZGlyZWN0aW9uID09PSAndmVydGljYWwnKXtcclxuICAgICAgICAgICAgZm9yKCBsZXQgaSA9IDA7IGk8IHBsYXllci5nYi5hbGxTaGlwc1tzaGlwSWRdLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS14PScke3graX0nXVtkYXRhLXk9JyR7eX0nXWApXHJcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50U2hpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWlkPScke3NoaXBJZH0nXVtkYXRhLXBvc2l0aW9uPScke2l9J11gKVxyXG4gICAgICAgICAgICAgICAgcy5hcHBlbmRDaGlsZChjdXJyZW50U2hpcCkgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0gICAgICBcclxuICAgICAgICB9ICAgICAgICAgXHJcbiAgICB9XHJcbiAgICBjb25zdCByYW5kb21QbGFjZSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcGxheWVyLmdiLnJlc2V0QWxsKCkgICAgICAgIFxyXG4gICAgICAgIGxldCB4LCB5LCBkXHJcbiAgICAgICAgbGV0IG5hbWVzID0gWydjYXJyaWVyJywgJ2JhdHRsZXNoaXAnLCdzdWJtYXJpbmUnLCdjcnVzaWVyJyAsICdkZXN0cm95ZXInXVxyXG4gICAgICAgIGxldCBzaGlwcyA9IFtdXHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8bmFtZXMubGVuZ3RoOyBpKyspIHNoaXBzLnB1c2goZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLiR7bmFtZXNbaV19LnNoaXBJbWdgKSlcclxuICAgICAgICBzaGlwcy5mb3JFYWNoKChzaGlwLCBpZCkgPT57XHJcbiAgICAgICAgICAgIHggPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApKVxyXG4gICAgICAgICAgICB5ID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSlcclxuICAgICAgICAgICAgZCA9IChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKSlcclxuICAgICAgICAgICAgZCA9IChkID8gJ2hvcml6b250YWwnIDogJ3ZlcnRpY2FsJykgIFxyXG4gICAgICAgICAgICBpZihwbGF5ZXIuZ2IudmVyaWZ5U2hpcFBsYWNlbWVudChkLCBwbGF5ZXIuZ2IuYWxsU2hpcHNbaWRdLCB4LCB5KSl7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBhIG9mIHNoaXApIGEuY2xhc3NMaXN0LnJlbW92ZSgndmVyJylcclxuICAgICAgICAgICAgICAgIGlmKGQgPT09ICd2ZXJ0aWNhbCcpIGZvciAobGV0IGEgb2Ygc2hpcCkgYS5jbGFzc0xpc3QuYWRkKCd2ZXInKVxyXG4gICAgICAgICAgICAgICAgZ2FtZS5wbGFjZVNoaXBzKHBsYXllciwgZCwgeCwgeSwgZmFsc2UsIGlkKVxyXG4gICAgICAgICAgICAgICAgZHJvcFNoaXAoeCx5LGQsIGlkKVxyXG4gICAgICAgICAgICB9IGVsc2UgIHsgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHdoaWxlKCFwbGF5ZXIuZ2IudmVyaWZ5U2hpcFBsYWNlbWVudChkLCBwbGF5ZXIuZ2IuYWxsU2hpcHNbaWRdLCB4LCB5KSl7XHJcbiAgICAgICAgICAgICAgICAgICAgeCA9IChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkpXHJcbiAgICAgICAgICAgICAgICAgICAgeSA9IChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkpXHJcbiAgICAgICAgICAgICAgICAgICAgZCA9IChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKSlcclxuICAgICAgICAgICAgICAgICAgICBkID0gKGQgPyAnaG9yaXpvbnRhbCcgOiAndmVydGljYWwnKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgYSBvZiBzaGlwKSBhLmNsYXNzTGlzdC5yZW1vdmUoJ3ZlcicpXHJcbiAgICAgICAgICAgICAgICBpZihkID09PSAndmVydGljYWwnKSBmb3IgKGxldCBhIG9mIHNoaXApIGEuY2xhc3NMaXN0LmFkZCgndmVyJylcclxuICAgICAgICAgICAgICAgIGdhbWUucGxhY2VTaGlwcyhwbGF5ZXIsIGQsIHgsIHksIGZhbHNlLCBpZClcclxuICAgICAgICAgICAgICAgIGRyb3BTaGlwKHgseSxkLCBpZClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pICAgIFxyXG4gICAgfVxyXG4gICAgY29uc3QgZHJhZ0xpc3RlbmVycyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJhbmRvbUJ0bi5vbm1vdXNldXAgPSAoZSkgPT4ge1xyXG4gICAgICAgICAgICByYW5kb21QbGFjZSgpXHJcbiAgICAgICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgbW91c2VEb3duKVxyXG4gICAgICAgIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VuZCcsIGRyYWdFbmQpXHJcbiAgICAgICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKCdkYmxjbGljaycsIHJvdGF0ZVNoaXApICAgICAgICBcclxuICAgICAgICBmb3IgKGxldCBzIG9mIHNxdWFyZXMpe1xyXG4gICAgICAgICAgICBzLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicsIGRyYWdFbnRlcilcclxuICAgICAgICAgICAgcy5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCBkcmFnTGVhdmUpXHJcbiAgICAgICAgICAgIHMuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCBkcmFnT3ZlcilcclxuICAgICAgICB9ICAgICBcclxuICAgIH1cclxuICAgIGRyYWdMaXN0ZW5lcnMoKVxyXG4gICAgcmV0dXJuIHJhbmRvbVBsYWNlXHJcbn0iLCJpbXBvcnQgeyBzaGlwRmFjdG9yeSB9IGZyb20gXCIuL3NoaXBzXCJcclxuXHJcbmV4cG9ydCBjb25zdCBnYW1lYm9hcmQgPSBmdW5jdGlvbigpIHtcclxuICAgIC8vIHggYW5kIHkgY29vcmRzXHJcbiAgICBsZXQgYm9hcmQgPSBBcnJheSgxMCkuZmlsbCh1bmRlZmluZWQpLm1hcCgoeCkgPT4gQXJyYXkoMTApLmZpbGwodW5kZWZpbmVkKSlcclxuICAgIGNvbnN0IGdldEJvYXJkID0gKCkgPT4gQXJyYXkoMTApLmZpbGwodW5kZWZpbmVkKS5tYXAoKHgpID0+IEFycmF5KDEwKS5maWxsKHVuZGVmaW5lZCkpXHJcbiAgICBsZXQgZGlyZWN0aW9uID0gJ2hvcml6b250YWwnXHJcbiAgICBsZXQgcGxhY2VkU2hpcHMgPSBbXVxyXG4gICAgbGV0IGFsbFNoaXBzID0gW11cclxuICAgIGxldCBzdW5rU2hpcHMgPSBbXVxyXG4gICAgbGV0IG1pc3NlZEF0dGFja3MgPSBbXVxyXG4gICAgbGV0IGFsbEF0dGFja3MgPSBbXVxyXG4gXHJcbiAgICBjb25zdCBjcmVhdGVTaGlwcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGFsbFNoaXBzID0gW11cclxuICAgICAgICBjb25zdCBjYXJyaWVyID0gc2hpcEZhY3RvcnkoJ0NhcnJpZXInLCA1KVxyXG4gICAgICAgIGNvbnN0IGJhdHRsZXNoaXAgPSBzaGlwRmFjdG9yeSgnQmF0dGxlc2hpcCcsIDQpICAgICAgICBcclxuICAgICAgICBjb25zdCBzdWJtYXJpbmUgPSBzaGlwRmFjdG9yeSgnU3VibWFyaW5lJywgMylcclxuICAgICAgICBjb25zdCBjcnVzaWVyID0gc2hpcEZhY3RvcnkoJ0NydXNpZXInLCAzKVxyXG4gICAgICAgIGNvbnN0IGRlc3Ryb3llciA9IHNoaXBGYWN0b3J5KCdEZXN0cm95ZXInLCAyKVxyXG4gICAgICAgIGFsbFNoaXBzLnB1c2goY2FycmllciwgYmF0dGxlc2hpcCwgIHN1Ym1hcmluZSwgY3J1c2llciwgZGVzdHJveWVyKVxyXG4gICAgICAgIHJldHVybiBhbGxTaGlwc1xyXG4gICAgfVxyXG4gICAgY29uc3QgdmVyaWZ5U2hpcFBsYWNlbWVudCA9IGZ1bmN0aW9uKGRpcmVjLCBzaGlwLCB4LCB5KSB7XHJcbiAgICAgICAgaWYodGhpcy5ib2FyZFt4XVt5XSA9PT0gdW5kZWZpbmVkKXsgIFxyXG4gICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgc2hpcCBmaXRzIGludG8gdGhlIHNwb3RcclxuICAgICAgICAgICAgaWYoZGlyZWMgPT09ICdob3Jpem9udGFsJyAmJiAoeSArIChzaGlwLmxlbmd0aC0xKSA8IDEwKSl7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAxOyBpIDwgKHNoaXAubGVuZ3RoKTsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmJvYXJkW3hdW3kgKyBpXSAhPT0gdW5kZWZpbmVkKSByZXR1cm4gZmFsc2UgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICAgICAgfSBlbHNlIGlmKGRpcmVjID09PSAndmVydGljYWwnICYmICh4ICsgKHNoaXAubGVuZ3RoLTEpIDwgMTApKXtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDE7IGk8KHNoaXAubGVuZ3RoKTsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmJvYXJkW3ggKyBpXVt5XSAhPT0gdW5kZWZpbmVkKSByZXR1cm4gZmFsc2UgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0gIFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWUgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9IGVsc2UgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfSBlbHNlIHJldHVybiBmYWxzZSAgICAgICAgXHJcbiAgICB9XHJcbiAgICBjb25zdCBwbGFjZVNoaXAgPSBmdW5jdGlvbihkaXJlYywgc2hpcCwgeCwgeSkge1xyXG4gICAgICAgIC8vT25seSBwbGFjZSBpZiB0aGUgc3BhY2UgaXMgZnJlZVxyXG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZSBzaGlwIGZpdHMgaW50byB0aGUgc3BvdCAgICAgICAgXHJcbiAgICAgICAgaWYoZGlyZWMgPT09ICdob3Jpem9udGFsJyApe1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxzaGlwLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmRbeF1beSArIGldID0ge3NoaXAsIHBvc2l0aW9uOiBpfVxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5wbGFjZWRTaGlwcy5pbmRleE9mKHNoaXApID09PSAtMSkgdGhpcy5wbGFjZWRTaGlwcy5wdXNoKHNoaXApXHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgfSBlbHNlIGlmKGRpcmVjID09PSAndmVydGljYWwnICl7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPHNoaXAubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ib2FyZFt4ICsgaV1beV0gPSB7c2hpcCwgcG9zaXRpb246IGl9XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnBsYWNlZFNoaXBzLmluZGV4T2Yoc2hpcCkgPT09IC0xKSB0aGlzLnBsYWNlZFNoaXBzLnB1c2goc2hpcClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gXHJcbiAgICB9IFxyXG4gICAgLy92ZXJpZnkgaWYgdGhlIHBsYWNlIHdhcyBhbHJlYWR5IGF0dGFja2VkXHJcbiAgICBjb25zdCB2ZXJpZnlBdHRhY2sgPSBmdW5jdGlvbih4LCB5KSB7XHJcbiAgICAgICAgZm9yIChsZXQgaXRlbSBvZiBhbGxBdHRhY2tzKSBpZihpdGVtWzBdID09PSB4ICYmIGl0ZW1bMV0gPT09IHkpIHJldHVybiBmYWxzZSAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRydWUgICAgXHJcbiAgICB9XHJcbiAgICAvL2F0dGFjayB0aGUgZW5lbXkncyBnYW1lYm9hcmRcclxuICAgIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSBmdW5jdGlvbih4LCB5KXsgIFxyXG4gICAgICAgIGlmKHZlcmlmeUF0dGFjayh4LCB5KSl7XHJcbiAgICAgICAgICAgIGlmKCB0eXBlb2YgdGhpcy5ib2FyZFt4XVt5XSA9PT0gJ29iamVjdCcpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ib2FyZFt4XVt5XS5zaGlwLmhpdCh0aGlzLmJvYXJkW3hdW3ldLnBvc2l0aW9uKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5ib2FyZFt4XVt5XSA9ICdoaXQnXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFsbEF0dGFja3MucHVzaChbeCx5XSkgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLmJvYXJkW3hdW3ldID09PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ib2FyZFt4XVt5XSA9ICdtaXNzJ1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hbGxBdHRhY2tzLnB1c2goW3gseV0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1pc3NlZEF0dGFja3MucHVzaChbeCx5XSkgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyB2ZXJpZnlTaGlwcygpXHJcbiAgICAgICAgfSAgICBcclxuICAgIH1cclxuICAgIC8vdmVyaWZ5IGlmIHRoZSBzaGlwIGlzIHN1bmtcclxuICAgIGNvbnN0IHZlcmlmeVNoaXBzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZm9yKGxldCBzaGlwIG9mIHRoaXMucGxhY2VkU2hpcHMpIHtcclxuICAgICAgICAgICAgaWYoc2hpcC5pc1N1bmsoKSAmJiB0aGlzLnN1bmtTaGlwcy5pbmRleE9mKHNoaXApID09PSAtMSkgdGhpcy5zdW5rU2hpcHMucHVzaChzaGlwKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5zdW5rU2hpcHMubGVuZ3RoID09PSA1KSByZXR1cm4gJ2xvc2UnXHJcbiAgICAgICAgZWxzZSByZXR1cm4gJ3BsYXlpbmcnXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIHJlc2V0IGdhbWVcclxuICAgIGNvbnN0IHJlc2V0QWxsID0gZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLnBsYWNlZFNoaXBzID0gW11cclxuICAgICAgICB0aGlzLnN1bmtTaGlwcyA9IFtdXHJcbiAgICAgICAgYWxsQXR0YWNrcyA9IFtdXHJcbiAgICAgICAgdGhpcy5hbGxBdHRhY2tzID0gW11cclxuICAgICAgICB0aGlzLm1pc3NlZEF0dGFja3MgPSBbXVxyXG4gICAgICAgIHRoaXMuYm9hcmQgPSBnZXRCb2FyZCgpXHJcbiAgICAgICAgYWxsU2hpcHMuZm9yRWFjaChzaGlwID0+IHNoaXAuaGl0UG9zaXRpb24gPSBbXSkgICAgXHJcbiAgICB9XHJcbiAgICBjcmVhdGVTaGlwcygpXHJcbiAgICByZXR1cm57XHJcbiAgICAgICAgYm9hcmQsXHJcbiAgICAgICAgZGlyZWN0aW9uLFxyXG4gICAgICAgIHBsYWNlZFNoaXBzLFxyXG4gICAgICAgIGFsbFNoaXBzLFxyXG4gICAgICAgIGFsbEF0dGFja3MsXHJcbiAgICAgICAgc3Vua1NoaXBzLFxyXG4gICAgICAgIG1pc3NlZEF0dGFja3MsXHJcbiAgICAgICAgY3JlYXRlU2hpcHMsXHJcbiAgICAgICAgcGxhY2VTaGlwLFxyXG4gICAgICAgIHZlcmlmeVNoaXBQbGFjZW1lbnQsXHJcbiAgICAgICAgdmVyaWZ5QXR0YWNrLFxyXG4gICAgICAgIHJlY2VpdmVBdHRhY2ssXHJcbiAgICAgICAgdmVyaWZ5U2hpcHMsXHJcbiAgICAgICAgcmVzZXRBbGxcclxuICAgIH1cclxufVxyXG5cclxuIiwiaW1wb3J0IHsgY3JlYXRlUGxheWVyIH0gZnJvbSAnLi9wbGF5ZXInXHJcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gJy4vVUknXHJcblxyXG5leHBvcnQgY29uc3QgcGxheWVyID0gY3JlYXRlUGxheWVyKCdwbGF5ZXInKVxyXG5leHBvcnQgY29uc3QgY3B1ID0gY3JlYXRlUGxheWVyKCdjcHUnKVxyXG5leHBvcnQgY29uc3QgZ2FtZSA9ICgocDEsIHAyKSA9PiB7XHJcbiAgICAvLyBQbGFjZSBzaGlwcyBvbiB0aGUgYm9hcmRcclxuICAgIGNvbnN0IHBsYWNlU2hpcHMgPSAocGxheWVyLCBkaXIsIHgxLCB5MSwgYXV0bywgc2hpcEluZGV4KSA9PiB7XHJcbiAgICAgICAgaWYoYXV0byA9PT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIHBsYXllci5nYi5hbGxTaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKVxyXG4gICAgICAgICAgICAgICAgbGV0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMClcclxuICAgICAgICAgICAgICAgIGxldCBkID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMilcclxuICAgICAgICAgICAgICAgIGlmKGQgPT09IDEpIGQgPSAnaG9yaXpvbnRhbCdcclxuICAgICAgICAgICAgICAgIGVsc2UgZCA9ICd2ZXJ0aWNhbCdcclxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXIuZ2IudmVyaWZ5U2hpcFBsYWNlbWVudChkLCBzaGlwLCB4LCB5KSA9PT0gZmFsc2UgKXtcclxuICAgICAgICAgICAgICAgICAgICB3aGlsZShwbGF5ZXIuZ2IudmVyaWZ5U2hpcFBsYWNlbWVudChkLCBzaGlwLCB4LCB5KSA9PT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgICBcclxuICAgICAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAgICAgICAgIHBsYXllci5nYi5wbGFjZVNoaXAoZCxzaGlwLCB4LCB5KVxyXG4gICAgICAgICAgICB9IGVsc2UgcGxheWVyLmdiLnBsYWNlU2hpcChkLHNoaXAsIHgsIHkpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHNoaXAgPSBwbGF5ZXIuZ2IuYWxsU2hpcHNbc2hpcEluZGV4XVxyXG4gICAgICAgICAgICBpZiAocGxheWVyLmdiLnZlcmlmeVNoaXBQbGFjZW1lbnQoZGlyLCBzaGlwLCB4MSwgeTEpID09PSBmYWxzZSApe1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmFsZXJ0KCdJbnZhbGlkIHBvc2l0aW9uJylcclxuICAgICAgICAgICAgfSBlbHNlIHAxLmdiLnBsYWNlU2hpcChkaXIsc2hpcCwgeDEsIHkxKSAgICAgICAgICAgICAgICBcclxuICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICB9IFxyXG4gICAgLy9QbGF5IGdhbWUgdHVybnMsIHBsYXllciB4IGNwdVxyXG4gICAgY29uc3QgcGxheVR1cm4gPSBmdW5jdGlvbihwLCB4MSwgeTEsIGF1dG8pIHtcclxuICAgICAgICBpZihhdXRvID09PSB0cnVlKXtcclxuICAgICAgICAgICAgbGV0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMClcclxuICAgICAgICAgICAgbGV0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoIXAuZ2IudmVyaWZ5QXR0YWNrKHgseSkpe1xyXG4gICAgICAgICAgICAgICAgd2hpbGUoIXAuZ2IudmVyaWZ5QXR0YWNrKHgseSkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMClcclxuICAgICAgICAgICAgICAgICAgICB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApXHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgcC5nYi5yZWNlaXZlQXR0YWNrKHgsIHkpXHJcbiAgICAgICAgICAgICAgICByZW5kZXIudXBkYXRlR3JpZChwLCB4LCB5KVxyXG4gICAgICAgICAgICB9IGVsc2Uge3AuZ2IucmVjZWl2ZUF0dGFjayh4LCB5KTtyZW5kZXIudXBkYXRlR3JpZChwLCB4LCB5KX1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwLmdiLnJlY2VpdmVBdHRhY2soeDEsIHkxIClcclxuICAgICAgICAgICAgcmVuZGVyLnVwZGF0ZUdyaWQocCwgeDEsIHkxKVxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLnRhYmxlKHBsYXllci5nYi5ib2FyZClcclxuICAgICAgICB9ICAgICAgXHJcbiAgICAgICAgaXNXaW5uZXIoKVxyXG4gICAgfVxyXG4gICAgY29uc3QgaXNXaW5uZXIgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKHAxLmdiLnZlcmlmeVNoaXBzKCkgPT09ICdsb3NlJykgcmV0dXJuIGAke3AyLm5hbWV9YFxyXG4gICAgICAgIGVsc2UgaWYocDIuZ2IudmVyaWZ5U2hpcHMoKSA9PT0gJ2xvc2UnKSByZXR1cm4gYCR7cDEubmFtZX1gXHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBjb25zdCBwbGF5ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcGxhY2VTaGlwcyhwMiwgJ2hvcml6b250YWwnLCAwLCAwLCB0cnVlLCAwKVxyXG4gICAgICAgIHJlbmRlci5ncmlkKCdwbGF5ZXInKVxyXG4gICAgICAgIHJlbmRlci5zaG93U2hpcHMoKSAgICBcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RhcnQtZ2FtZScpLnN0eWxlLmRpc3BsYXkgPSAnZmxleCdcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RhcnQtZ2FtZScpLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChwMS5nYi5wbGFjZWRTaGlwcy5sZW5ndGggPT09IDUpIHtcclxuICAgICAgICAgICAgcmVuZGVyLnN0YXJ0KClcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3JhbmRvbS1idG4nKS5yZW1vdmUoKVxyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2hpcERpdicpLnJlbW92ZSgpXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdGFydC1nYW1lJykuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RhcnQtZ2FtZScpLm9uY2xpY2sgPSBudWxsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zdCByZXN0YXJ0QWxsID0gZnVuY3Rpb24oKXtcclxuICAgICAgICBwMS5nYi5yZXNldEFsbCgpXHJcbiAgICAgICAgcDIuZ2IucmVzZXRBbGwoKSAgXHJcbiAgICAgICAgZ2FtZS5wbGF5KClcclxuICAgIH0gICAgXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHBsYWNlU2hpcHMsIFxyXG4gICAgICAgIHBsYXlUdXJuLFxyXG4gICAgICAgIGlzV2lubmVyLFxyXG4gICAgICAgIHBsYXksXHJcbiAgICAgICAgcmVzdGFydEFsbFxyXG4gICAgfVxyXG59KShwbGF5ZXIsIGNwdSlcclxuXHJcbmdhbWUucGxheSgpXHJcbiIsImltcG9ydCB7IGdhbWVib2FyZCB9IGZyb20gXCIuL2dhbWVib2FyZFwiXHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlUGxheWVyID0gKG5hbWUpID0+IHtcclxuICAgIGNvbnN0IGdiID0gZ2FtZWJvYXJkKClcclxuXHJcbiAgICByZXR1cm4ge25hbWUsIGdifVxyXG59XHJcblxyXG4iLCJleHBvcnQgY29uc3Qgc2hpcEZhY3RvcnkgPSAobmFtZSwgbGVuKSA9PiB7XHJcbiAgICBjb25zdCBpZCA9IG5hbWVcclxuICAgIGNvbnN0IGxlbmd0aCA9IGxlblxyXG4gICAgbGV0IGhpdFBvc2l0aW9uID0gW11cclxuICAgIGxldCBzdW5rID0gZmFsc2VcclxuICAgIGNvbnN0IGhpdCA9IGZ1bmN0aW9uKHBvcykge1xyXG4gICAgICAgIHRoaXMuaGl0UG9zaXRpb24ucHVzaChwb3MpXHJcbiAgICB9XHJcbiAgICBjb25zdCBpc1N1bmsgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZih0aGlzLmhpdFBvc2l0aW9uLmxlbmd0aCA9PT0gbGVuZ3RoKSB0aGlzLnN1bmsgPSB0cnVlICAgICAgICAgICAgXHJcbiAgICAgICAgZWxzZSB0aGlzLnN1bmsgPSBmYWxzZVxyXG4gICAgICAgIHJldHVybiB0aGlzLnN1bmtcclxuICAgIH1cclxuICAgIHJldHVybiB7aWQsIFxyXG4gICAgICAgIGxlbmd0aCwgXHJcbiAgICAgICAgaGl0UG9zaXRpb24sIFxyXG4gICAgICAgIHN1bmssIFxyXG4gICAgICAgIGhpdCwgXHJcbiAgICAgICAgaXNTdW5rLCBcclxuICAgICAgICB9XHJcbn1cclxuXHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=