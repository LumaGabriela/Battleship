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
                ships[i].innerHTML += `<div data-id='${i}' data-position='${j}' style="background:url(../dist/imgs/${id[i]}/${id[i]}${j}.png)" class='${id[i]} shipImg'>`
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQTRDO0FBQ2Y7QUFDdEI7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixLQUFLO0FBQzVCO0FBQ0E7QUFDQSxxQkFBcUIsS0FBSztBQUMxQixxQkFBcUIsS0FBSztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRCxNQUFNLGtCQUFrQixFQUFFLFlBQVksRUFBRTtBQUN6RixhQUFhO0FBQ2IsaURBQWlELE1BQU0sa0JBQWtCLEtBQUssWUFBWSxFQUFFO0FBQzVGLGFBQWE7QUFDYixpREFBaUQsTUFBTSxrQkFBa0IsS0FBSyxZQUFZLEVBQUU7QUFDNUYsYUFBYTtBQUNiLGlEQUFpRCxNQUFNLGtCQUFrQixLQUFLLFlBQVksRUFBRTtBQUM1RixhQUFhO0FBQ2IsaURBQWlELE1BQU0sa0JBQWtCLEtBQUssWUFBWSxFQUFFO0FBQzVGLGFBQWE7QUFDYixpREFBaUQsTUFBTSxrQkFBa0IsS0FBSyxZQUFZLEVBQUU7QUFDNUYsYUFBYTtBQUNiLGlEQUFpRCxNQUFNLGtCQUFrQixLQUFLLFlBQVksRUFBRTtBQUM1RixhQUFhO0FBQ2IsaURBQWlELE1BQU0sa0JBQWtCLEtBQUssWUFBWSxFQUFFO0FBQzVGLGFBQWE7QUFDYixpREFBaUQsTUFBTSxrQkFBa0IsS0FBSyxZQUFZLEVBQUU7QUFDNUYsYUFBYTtBQUNiLGlEQUFpRCxNQUFNLGtCQUFrQixLQUFLLFlBQVksRUFBRTtBQUM1RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLEdBQUcsc0RBQWtCLFlBQVk7QUFDM0QsdURBQXVELEVBQUUsbUJBQW1CLEVBQUUsdUNBQXVDLE1BQU0sR0FBRyxNQUFNLEVBQUUsRUFBRSxnQkFBZ0IsT0FBTztBQUMvSjtBQUNBO0FBQ0EsOENBQThDLE9BQU87QUFDckQsa0RBQWtELEVBQUU7QUFDcEQ7QUFDQSxZQUFZLDRDQUFJO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxPQUFPLFdBQVcsRUFBRSxhQUFhLEVBQUU7QUFDbkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLGlEQUFhLENBQUMsdUNBQUc7QUFDN0I7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGlEQUFhLENBQUMsMENBQU07QUFDcEM7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLEVBQUU7QUFDOUI7QUFDQTtBQUNBLHFEQUFxRCxJQUFJLDhEQUEwQixDQUFDO0FBQ3BGLGtEQUFrRCxJQUFJLDJEQUF1QixDQUFDO0FBQzlFLHFCQUFxQix1REFBbUIsRUFBRSxvREFBZ0I7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGlEQUFhO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixpREFBYTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxtREFBZTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1Sm9DO0FBQzdCO0FBQ1A7QUFDQTtBQUNBLG9CQUFvQix1REFBbUI7QUFDdkM7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MscUNBQXFDO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGlFQUE2QixZQUFZLHNEQUFrQjtBQUN0RSxZQUFZLG1EQUFlLENBQUMsMENBQU07QUFDbEM7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixHQUFHLHNEQUFrQixpQkFBaUI7QUFDbEUsNkRBQTZELEVBQUUsYUFBYSxJQUFJO0FBQ2hGLHdFQUF3RSxPQUFPLG9CQUFvQixFQUFFO0FBQ3JHO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsNEJBQTRCLEdBQUcsc0RBQWtCLGlCQUFpQjtBQUNsRSw2REFBNkQsSUFBSSxhQUFhLEVBQUU7QUFDaEYsd0VBQXdFLE9BQU8sb0JBQW9CLEVBQUU7QUFDckc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQWtCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixnQkFBZ0IsOENBQThDLFNBQVM7QUFDNUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsaUVBQTZCLElBQUksc0RBQWtCO0FBQ2xFO0FBQ0E7QUFDQSxnQkFBZ0IsbURBQWUsQ0FBQywwQ0FBTTtBQUN0QztBQUNBLGNBQWM7QUFDZCx1QkFBdUIsaUVBQTZCLElBQUksc0RBQWtCO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLG1EQUFlLENBQUMsMENBQU07QUFDdEM7QUFDQTtBQUNBLFNBQVM7QUFDVCxzQkFBc0IsbURBQWU7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNwSHFDO0FBQ3JDO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsbURBQVc7QUFDbkMsMkJBQTJCLG1EQUFXO0FBQ3RDLDBCQUEwQixtREFBVztBQUNyQyx3QkFBd0IsbURBQVc7QUFDbkMsMEJBQTBCLG1EQUFXO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLG1CQUFtQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2QsK0JBQStCLGlCQUFpQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2QsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsZUFBZTtBQUN4Qyx3Q0FBd0M7QUFDeEM7QUFDQTtBQUNBLFVBQVU7QUFDVix5QkFBeUIsZUFBZTtBQUN4Qyx3Q0FBd0M7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqSHVDO0FBQ1Y7QUFDN0I7QUFDTyxlQUFlLHFEQUFZO0FBQzNCLFlBQVkscURBQVk7QUFDeEI7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2QsYUFBYTtBQUNiLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0Isa0RBQWlCO0FBQ2pDLGNBQWMsTUFBTSx5QkFBeUIsa0RBQWlCO0FBQzlELFVBQVU7QUFDVjtBQUNBLFlBQVksa0RBQWlCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsZUFBZSxRQUFRLElBQUksVUFBVSxRQUFRO0FBQ3pGLGlEQUFpRCxlQUFlLFFBQVEsSUFBSSxVQUFVLFFBQVE7QUFDOUY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLDRDQUFXO0FBQ25CLFFBQVEsaURBQWdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBLFlBQVksNkNBQVk7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZGdUM7QUFDdkM7QUFDTztBQUNQLGVBQWUscURBQVM7QUFDeEI7QUFDQSxZQUFZO0FBQ1o7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDUE87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ3JCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvVUkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kcmFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHBsYXllciwgY3B1ICwgZ2FtZSB9IGZyb20gXCIuL2luZGV4XCJcclxuaW1wb3J0IHsgZHJhZyB9IGZyb20gXCIuL2RyYWdcIlxyXG5leHBvcnQgY29uc3QgcmVuZGVyID0gKCgpID0+IHtcclxuICAgIFxyXG4gICAgY29uc3QgZ3JpZCA9IChuYW1lKSA9PiB7XHJcbiAgICAgICAgbGV0IGdhbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZ2FtZScpXHJcbiAgICAgICAgbGV0IHBsYXllciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgICAgcGxheWVyLmlkID0gYCR7bmFtZX1gXHJcbiAgICAgICAgbGV0IGluZm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgICAgIGxldCBncmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgICAgICBpbmZvLmlkID0gYCR7bmFtZX0taW5mb2BcclxuICAgICAgICBncmlkLmlkID0gYCR7bmFtZX0tZ2FtZWJvYXJkYFxyXG4gICAgICAgIGdyaWQuc2V0QXR0cmlidXRlKCdjbGFzcycsICdnYW1lYm9hcmQnKVxyXG4gICAgICAgIGxldCBpID0gMFxyXG4gICAgICAgIHdoaWxlKGk8MTAwKSB7XHJcbiAgICAgICAgICAgIGlmKGk+PTAgJiYgaTwxMCl7XHJcbiAgICAgICAgICAgICAgICBncmlkLmlubmVySFRNTCArPSBgPGRpdiBjbGFzcz1cIiR7bmFtZX0gc3F1YXJlXCIgZGF0YS15PScke2l9JyBkYXRhLXg9JyR7MH0nPjwvZGl2PmBcclxuICAgICAgICAgICAgfWVsc2UgaWYgKGk+PTEwICYmIGk8MjApe1xyXG4gICAgICAgICAgICAgICAgZ3JpZC5pbm5lckhUTUwgKz0gYDxkaXYgY2xhc3M9XCIke25hbWV9IHNxdWFyZVwiIGRhdGEteT0nJHtpLTEwfScgZGF0YS14PSckezF9Jz48L2Rpdj5gXHJcbiAgICAgICAgICAgIH1lbHNlIGlmIChpPj0yMCAmJiBpPDMwKXtcclxuICAgICAgICAgICAgICAgIGdyaWQuaW5uZXJIVE1MICs9IGA8ZGl2IGNsYXNzPVwiJHtuYW1lfSBzcXVhcmVcIiBkYXRhLXk9JyR7aS0yMH0nIGRhdGEteD0nJHsyfSc+PC9kaXY+YFxyXG4gICAgICAgICAgICB9ZWxzZSBpZiAoaT49MzAgJiYgaTw0MCl7XHJcbiAgICAgICAgICAgICAgICBncmlkLmlubmVySFRNTCArPSBgPGRpdiBjbGFzcz1cIiR7bmFtZX0gc3F1YXJlXCIgZGF0YS15PScke2ktMzB9JyBkYXRhLXg9JyR7M30nPjwvZGl2PmBcclxuICAgICAgICAgICAgfWVsc2UgaWYgKGk+PTQwICYmIGk8NTApe1xyXG4gICAgICAgICAgICAgICAgZ3JpZC5pbm5lckhUTUwgKz0gYDxkaXYgY2xhc3M9XCIke25hbWV9IHNxdWFyZVwiIGRhdGEteT0nJHtpLTQwfScgZGF0YS14PSckezR9Jz48L2Rpdj5gXHJcbiAgICAgICAgICAgIH1lbHNlIGlmIChpPj01MCAmJiBpPDYwKXtcclxuICAgICAgICAgICAgICAgIGdyaWQuaW5uZXJIVE1MICs9IGA8ZGl2IGNsYXNzPVwiJHtuYW1lfSBzcXVhcmVcIiBkYXRhLXk9JyR7aS01MH0nIGRhdGEteD0nJHs1fSc+PC9kaXY+YFxyXG4gICAgICAgICAgICB9ZWxzZSBpZiAoaT49NjAgJiYgaTw3MCl7XHJcbiAgICAgICAgICAgICAgICBncmlkLmlubmVySFRNTCArPSBgPGRpdiBjbGFzcz1cIiR7bmFtZX0gc3F1YXJlXCIgZGF0YS15PScke2ktNjB9JyBkYXRhLXg9JyR7Nn0nPjwvZGl2PmBcclxuICAgICAgICAgICAgfWVsc2UgaWYgKGk+PTcwICYmIGk8ODApe1xyXG4gICAgICAgICAgICAgICAgZ3JpZC5pbm5lckhUTUwgKz0gYDxkaXYgY2xhc3M9XCIke25hbWV9IHNxdWFyZVwiIGRhdGEteT0nJHtpLTcwfScgZGF0YS14PSckezd9Jz48L2Rpdj5gXHJcbiAgICAgICAgICAgIH1lbHNlIGlmIChpPj04MCAmJiBpPDkwKXtcclxuICAgICAgICAgICAgICAgIGdyaWQuaW5uZXJIVE1MICs9IGA8ZGl2IGNsYXNzPVwiJHtuYW1lfSBzcXVhcmVcIiBkYXRhLXk9JyR7aS04MH0nIGRhdGEteD0nJHs4fSc+PC9kaXY+YFxyXG4gICAgICAgICAgICB9ZWxzZSBpZiAoaT49OTAgJiYgaTwxMDApe1xyXG4gICAgICAgICAgICAgICAgZ3JpZC5pbm5lckhUTUwgKz0gYDxkaXYgY2xhc3M9XCIke25hbWV9IHNxdWFyZVwiIGRhdGEteT0nJHtpLTkwfScgZGF0YS14PSckezl9Jz48L2Rpdj5gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaSsrXHJcbiAgICAgICAgfVxyXG4gICAgcGxheWVyLmFwcGVuZENoaWxkKGdyaWQpXHJcbiAgICBwbGF5ZXIuYXBwZW5kQ2hpbGQoaW5mbylcclxuICAgIGdhbWUuYXBwZW5kQ2hpbGQocGxheWVyKVxyXG4gICAgfVxyXG4gICAgY29uc3Qgc2hvd1NoaXBzID0gKCkgPT4ge1xyXG4gICAgICAgIGxldCBzaGlwRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgICAgICBsZXQgZ2FtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNnYW1lJylcclxuICAgICAgICBsZXQgcmFuZG9tQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcclxuICAgICAgICByYW5kb21CdG4uaWQgPSAncmFuZG9tLWJ0bidcclxuICAgICAgICByYW5kb21CdG4uaW5uZXJUZXh0ID0gJ1JBTkRPTSdcclxuICAgICAgICBzaGlwRGl2LmlkID0gJ3NoaXBEaXYnXHJcbiAgICAgICAgLy8gQ3JlYXRlcyBhIGluc3RydWN0aW9uIGRpdlxyXG4gICAgICAgIGxldCBpbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgICAgICBpbmZvLmlkID0gJ2luZm8tZGl2JyBcclxuICAgICAgICAvLyAgY3JlYXRlcyBzaGlwcyBkaXZzXHJcbiAgICAgICAgbGV0IGNhcnJpZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgICAgIGxldCBiYXR0bGVzaGlwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgICAgICBsZXQgc3VibWFyaW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgICAgICBsZXQgY3J1c2llciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgICAgbGV0IGRlc3Ryb3llciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgICAgLy8gcHV0cyBhcyBtYW55IGRpdnMgYXMgdGhlIHNoaXAncyBsZW5ndGggaW5zaWRlIHRoZW1cclxuICAgICAgICBsZXQgc2hpcHMgPSBbY2FycmllciwgYmF0dGxlc2hpcCwgc3VibWFyaW5lLCBjcnVzaWVyLCBkZXN0cm95ZXJdXHJcbiAgICAgICAgbGV0IGlkID0gWydjYXJyaWVyJywgJ2JhdHRsZXNoaXAnLCAnc3VibWFyaW5lJywgJ2NydXNpZXInLCAnZGVzdHJveWVyJ11cclxuICAgICAgICBzaGlwRGl2LmFwcGVuZENoaWxkKHJhbmRvbUJ0bilcclxuICAgICAgICBnYW1lLmFwcGVuZENoaWxkKHNoaXBEaXYpXHJcbiAgICAgICAgZm9yKGxldCBpIGluIHNoaXBzKSB7XHJcbiAgICAgICAgICAgIGZvciggbGV0IGo9MDsgajwgcGxheWVyLmdiLmFsbFNoaXBzW2ldLmxlbmd0aDsgaisrKXtcclxuICAgICAgICAgICAgICAgIHNoaXBzW2ldLmlubmVySFRNTCArPSBgPGRpdiBkYXRhLWlkPScke2l9JyBkYXRhLXBvc2l0aW9uPScke2p9JyBzdHlsZT1cImJhY2tncm91bmQ6dXJsKC4uL2Rpc3QvaW1ncy8ke2lkW2ldfS8ke2lkW2ldfSR7an0ucG5nKVwiIGNsYXNzPScke2lkW2ldfSBzaGlwSW1nJz5gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2hpcHNbaV0uc2V0QXR0cmlidXRlKCdkcmFnZ2FibGUnLCB0cnVlKSBcclxuICAgICAgICAgICAgc2hpcHNbaV0uc2V0QXR0cmlidXRlKCdjbGFzcycsIGAke2lkW2ldfSBzaGlwQ29udGFpbmVyYCApXHJcbiAgICAgICAgICAgIHNoaXBzW2ldLnNldEF0dHJpYnV0ZSgnZGF0YS1zaGlwJywgYCR7aX1gKVxyXG4gICAgICAgICAgICBzaGlwRGl2LmFwcGVuZENoaWxkKHNoaXBzW2ldKSAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGRyYWcoc2hpcHNbaV0pICAgICAgICAgXHJcbiAgICAgICAgfSAgICAgICBcclxuICAgIH1cclxuICAgIGNvbnN0IHVwZGF0ZUdyaWQgPSBmdW5jdGlvbihwLCB4LCB5KSB7XHJcbiAgICAgICAgbGV0IHNxdWFyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3AubmFtZX1bZGF0YS14PScke3h9J11bZGF0YS15PScke3l9J11gKVxyXG4gICAgICAgIGlmIChwLm5hbWUgPT09ICdjcHUnKWNvbnNvbGUudGFibGUocC5nYi5ib2FyZClcclxuICAgICAgICBpZihwLmdiLmJvYXJkW3hdW3ldID09PSAnaGl0Jyl7XHJcbiAgICAgICAgICAgIGlmKHNxdWFyZS5jaGlsZHJlblswXSkgc3F1YXJlLnJlbW92ZUNoaWxkKHNxdWFyZS5jaGlsZHJlblswXSlcclxuICAgICAgICAgICAgc3F1YXJlLnN0eWxlLmJhY2tncm91bmQgPSAndXJsKC4uL2Rpc3QvaW1ncy9ib29tLnBuZyknXHJcbiAgICAgICAgICAgIHNxdWFyZS5zdHlsZS5hbmltYXRpb24gPSAnYXR0YWNrIC41cyBlYXNlLWluJ1xyXG4gICAgICAgIH0gZWxzZSBpZihwLmdiLmJvYXJkW3hdW3ldID09PSAnbWlzcycpe1xyXG4gICAgICAgICAgICBzcXVhcmUuaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmFzIGZhLXRpbWVzXCI+PC9pPidcclxuICAgICAgICAgICAgc3F1YXJlLnN0eWxlLmFuaW1hdGlvbiA9ICdhdHRhY2sgLjVzIGVhc2UtaW4nXHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcbiAgICBjb25zdCBzdGFydCA9IGZ1bmN0aW9uKCl7ICAgICAgIFxyXG4gICAgICAgIGdyaWQoJ2NwdScpXHJcbiAgICAgICAgYXR0YWNrKClcclxuICAgIH1cclxuICAgIGNvbnN0IGF0dGFjayA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGV0IHNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuY3B1LnNxdWFyZWApXHJcbiAgICAgICAgZm9yIChsZXQgcyBvZiBzcXVhcmVzKSBzLm9uY2xpY2sgPSBudWxsXHJcbiAgICAgICAgZm9yIChsZXQgcyBvZiBzcXVhcmVzKSBzLm9uY2xpY2sgPSAoZSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY2VsbCA9IGUudGFyZ2V0XHJcbiAgICAgICAgICAgIGxldCB4ID0gTnVtYmVyKGNlbGwuZGF0YXNldC54KVxyXG4gICAgICAgICAgICBsZXQgeSA9IE51bWJlcihjZWxsLmRhdGFzZXQueSlcclxuICAgICAgICAgICAgZ2FtZS5wbGF5VHVybihjcHUsIHgsIHksIGZhbHNlKVxyXG4gICAgICAgICAgICB1cGRhdGVHYW1lKCdjcHUnKVxyXG4gICAgICAgICAgICBmb3IobGV0IGMgb2Ygc3F1YXJlcykgYy5vbmNsaWNrID0gbnVsbFxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGdhbWUucGxheVR1cm4ocGxheWVyLCAwLCAwLCB0cnVlKSAgXHJcbiAgICAgICAgICAgICAgICBhdHRhY2soKSAgICAgIFxyXG4gICAgICAgICAgICAgICAgcy5vbmNsaWNrID0gbnVsbCAgIFxyXG4gICAgICAgICAgICAgICAgdXBkYXRlR2FtZSgnUGxheWVyJykgICAgIFxyXG4gICAgICAgICAgICB9LDIwMCkgICAgICAgICAgICAgXHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcbiAgICBjb25zdCB1cGRhdGVHYW1lID0gZnVuY3Rpb24ocCl7ICAgICAgICBcclxuICAgICAgICBsZXQgaW5mbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNnYW1lLWluZm8nKVxyXG4gICAgICAgIGluZm8uaW5uZXJIVE1MID0gYCR7cH0ncyB0dXJuIGBcclxuICAgICAgICBsZXQgcEluZm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGxheWVyLWluZm8nKVxyXG4gICAgICAgIGxldCBjSW5mbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjcHUtaW5mbycpXHJcbiAgICAgICAgcEluZm8uaW5uZXJIVE1MID0gYFBsYXllciByZW1haW5pbmcgc2hpcHM6ICR7NSAtIHBsYXllci5nYi5zdW5rU2hpcHMubGVuZ3RofWBcclxuICAgICAgICBjSW5mby5pbm5lckhUTUwgPSBgQ1BVIHJlbWFpbmluZyBzaGlwczogJHs1IC0gY3B1LmdiLnN1bmtTaGlwcy5sZW5ndGh9YFxyXG4gICAgICAgIGNvbnNvbGUubG9nKFtwbGF5ZXIuZ2Iuc3Vua1NoaXBzLCBjcHUuZ2Iuc3Vua1NoaXBzXSlcclxuICAgICAgICB2ZXJpZnlWaWN0b3J5KClcclxuICAgIH1cclxuICAgIGNvbnN0IHZlcmlmeVZpY3RvcnkgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCBpbmZvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2dhbWUtaW5mbycpXHJcbiAgICAgICAgaWYoZ2FtZS5pc1dpbm5lcigpID09PSAnY3B1Jykge1xyXG4gICAgICAgICAgICBpbmZvLmlubmVySFRNTCA9IGBDUFUgd29uYFxyXG4gICAgICAgICAgICBzdG9wR2FtZSgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoZ2FtZS5pc1dpbm5lcigpID09PSAncGxheWVyJykge1xyXG4gICAgICAgICAgICBpbmZvLmlubmVySFRNTCA9IGBQbGF5ZXIgV29uYFxyXG4gICAgICAgICAgICBzdG9wR2FtZSgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc3Qgc3RvcEdhbWUgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCBzcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNxdWFyZScpICAgICAgICBcclxuICAgICAgICBmb3IgKCBsZXQgcyBvZiBzcXVhcmVzKSBzLm9uY2xpY2sgPSBudWxsXHJcbiAgICAgICAgbGV0IHJlc3RhcnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVzdGFydC1nYW1lJylcclxuICAgICAgICByZXN0YXJ0QnRuLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXHJcbiAgICAgICAgcmVzdGFydEJ0bi5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICByZXN0YXJ0KClcclxuICAgICAgICAgICAgcmVzdGFydEJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxyXG4gICAgICAgIH0gXHJcbiAgICAgICAgbGV0IGluZm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZ2FtZS1pbmZvJylcclxuICAgICAgICBpbmZvLmlubmVySFRNTCArPSBgPC9icj5QbGF5IGFnYWluP2AgICAgICAgIFxyXG4gICAgfSAgIFxyXG4gICAgY29uc3QgcmVzdGFydCA9IGZ1bmN0aW9uKCl7IFxyXG4gICAgICAgIGxldCBnYW1lRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWUnKSAgICAgICAgIFxyXG4gICAgICAgIGdhbWVEaXYucmVtb3ZlQ2hpbGQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllcicpKVxyXG4gICAgICAgIGdhbWVEaXYucmVtb3ZlQ2hpbGQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NwdScpKSAgICAgICAgXHJcbiAgICAgICAgZ2FtZS5yZXN0YXJ0QWxsKCkgICAgICAgIFxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBncmlkLFxyXG4gICAgICAgIHNob3dTaGlwcyxcclxuICAgICAgICB1cGRhdGVHcmlkLFxyXG4gICAgICAgIHN0YXJ0LFxyXG4gICAgICAgIHJlc3RhcnQsXHJcbiAgICAgICAgYXR0YWNrXHJcbiAgICB9XHJcbn0pKClcclxuXHJcbiIsImltcG9ydCB7Z2FtZSwgcGxheWVyfSBmcm9tICcuL2luZGV4J1xyXG5leHBvcnQgY29uc3QgZHJhZyA9IGZ1bmN0aW9uKHNoaXApe1xyXG4gICAgbGV0IHNoaXBJZCA9IHNoaXAuZGF0YXNldC5zaGlwICAgICAvLyBmcm9tIDAgdG8gNCwgY29ycmVzcG9uZCB0byBzaGlwIG5hbWVzXHJcbiAgICBsZXQgc2hpcFBvc2l0aW9uICAgIC8vIHRoZSBwb3NpdGlvbiB3aGVyZSB0aGUgcGxheWVyIHBvaW50cyB0aGUgbW91c2VcclxuICAgIGxldCBkaXJlY3Rpb24gPSBwbGF5ZXIuZ2IuZGlyZWN0aW9uICAgICAvLyBzaGlwIG9yaWVudGF0aW9uLCBjYW4gYmUgaG9yaXpvbnRhbCBvciB2ZXJ0aWNhbFxyXG4gICAgbGV0IHJhbmRvbUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyYW5kb20tYnRuJylcclxuICAgIFxyXG4gICAgY29uc3QgdmVyaWZ5UG9zaXRpb24gPSAoZGlyKSA9PiB7ICAvLyB2ZXJpZnkgd2hldGhlciB0aGUgcG9zaXRpb24gaXMgb3IgaXNuJ3QgaG9yaXpvbnRhbFxyXG4gICAgICAgIGlmKGRpciA9PT0gJ2hvcml6b250YWwnKSByZXR1cm4gdHJ1ZVxyXG4gICAgICAgIGVsc2UgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnN0IHNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc3F1YXJlJykgIC8vc3F1YXJlcyBvbiB0aGUgZ2FtZWJvYXJkJ3MgZ3JpZFxyXG4gICAgXHJcbiAgICBjb25zdCBtb3VzZURvd24gPSBmdW5jdGlvbihlKSB7IC8vY2FwdHVyZXMgdGhlIHNoaXBzIGlkIGFuZCBwb3NpdGlvblxyXG4gICAgICAgIHNoaXBQb3NpdGlvbiA9IGUudGFyZ2V0LmRhdGFzZXQucG9zaXRpb25cclxuICAgICAgICBmb3IobGV0IHMgb2Ygc3F1YXJlcykge1xyXG4gICAgICAgICAgICBzLm9uZHJvcCA9IGRyb3AvLyBpcyBvbiBtb3VzZWRvd24gYmVjYXVzZSB3aGVuIHRoZSBvbmRyb3AgZXZlbnQgaXMgb24gZHJhZ0xpc3RlbmVycygpIGl0IHJlcGVhdHMgYW5kIGNoYW5nZXMgdGhlIHNoaXBzIHZhcmlhYmxlICBcclxuICAgICAgICAgICAgcy5vbmRyYWdzdGFydCA9IGRyYWdTdGFydCAvLyBwcmV2ZW50cyBzaGlwIGZyb20gZ2V0dGluZyBkcmFnZ2VkIGZyb20gZ3JpZFxyXG4gICAgICAgIH0gIFxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgY29uc3QgZHJhZ092ZXIgPSBmdW5jdGlvbihlKXsgLy9hZGRzIGEgYmFja2dyb3VuZCBjb2xvciBhcyBlZmZlY3RcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICB0aGlzLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjZjYzJyAgIFxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgY29uc3QgZHJhZ0xlYXZlID0gZnVuY3Rpb24oZSl7ZS50YXJnZXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyd9IC8vIHNldCBjb2xvciBiYWNrIHRvIGRlZmF1bHRcclxuICAgIGNvbnN0IGRyYWdFbnRlciA9IChlKSA9PiBlLnByZXZlbnREZWZhdWx0KClcclxuICAgIGNvbnN0IGRyYWdTdGFydCA9IChlKSA9PiBlLnByZXZlbnREZWZhdWx0KClcclxuICAgIGNvbnN0IGRyYWdFbmQgPSAoZSkgPT4ge307XHJcbiAgICBjb25zdCByb3RhdGVTaGlwID0gZnVuY3Rpb24oKXtcclxuICAgICAgICBzaGlwLmNsYXNzTGlzdC50b2dnbGUoJ3ZlcnRpY2FsJylcclxuICAgICAgICBmb3IgKGxldCBhIG9mIHNoaXAuY2hpbGRyZW4pIGEuY2xhc3NMaXN0LnRvZ2dsZSgndmVyJylcclxuICAgICAgICBkaXJlY3Rpb24gPSAoc2hpcC5jbGFzc0xpc3RbMl0gPyAndmVydGljYWwnIDogJ2hvcml6b250YWwnKVxyXG4gICAgfVxyXG4gICAgY29uc3QgZHJvcCA9IGZ1bmN0aW9uKGUpeyAvLyBkcm9wIHRoZSBzaGlwJ3MgYmxvY2tzIG9uIHRoZSBncmlkXHJcbiAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKVxyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgIGUudGFyZ2V0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcnXHJcbiAgICAgICAgbGV0IHggPSBlLnRhcmdldC5kYXRhc2V0LnggPyBOdW1iZXIoZS50YXJnZXQuZGF0YXNldC54KSA6IG51bGxcclxuICAgICAgICBsZXQgeSA9IGUudGFyZ2V0LmRhdGFzZXQueCA/IE51bWJlcihlLnRhcmdldC5kYXRhc2V0LnkpIDogbnVsbFxyXG4gICAgICAgIHkgPSAodmVyaWZ5UG9zaXRpb24oZGlyZWN0aW9uKSA/IHkgLSBzaGlwUG9zaXRpb24gOiB5KVxyXG4gICAgICAgIHggPSAodmVyaWZ5UG9zaXRpb24oZGlyZWN0aW9uKSA/IHggOiB4IC0gc2hpcFBvc2l0aW9uKVxyXG4gICAgICAgIGlmKHBsYXllci5nYi52ZXJpZnlTaGlwUGxhY2VtZW50KGRpcmVjdGlvbiwgcGxheWVyLmdiLmFsbFNoaXBzW3NoaXBJZF0sIHgsIHkpKSB7XHJcbiAgICAgICAgICAgIGdhbWUucGxhY2VTaGlwcyhwbGF5ZXIsIGRpcmVjdGlvbiwgeCwgeSwgZmFsc2UsIHNoaXBJZClcclxuICAgICAgICAgICAgc2hpcC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBtb3VzZURvd24pXHJcbiAgICAgICAgICAgIGRyb3BTaGlwKHgseSwwLCB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHNoaXAuc3R5bGUuY3Vyc29yID0gJ2RlZmF1bHQnXHJcbiAgICAgICAgfSBlbHNlIHdpbmRvdy5hbGVydCgnSW52YWxpZCBwb3NpdGlvbicpXHJcbiAgICB9XHJcbiAgICBjb25zdCBkcm9wU2hpcCA9ICh4LCB5LGQsIGlkKSA9PiB7XHJcbiAgICAgICAgaWYoaWQgIT09IHVuZGVmaW5lZCkgc2hpcElkID0gaWRcclxuICAgICAgICBpZiAoZCA9PT0gJ2hvcml6b250YWwnKSBkaXJlY3Rpb24gPSAnaG9yaXpvbnRhbCdcclxuICAgICAgICBlbHNlIGlmIChkID09PSAndmVydGljYWwnKSBkaXJlY3Rpb24gPSAndmVydGljYWwnXHJcbiAgICAgICAgaWYoZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcpe1xyXG4gICAgICAgICAgICBmb3IoIGxldCBpID0gMDsgaTwgcGxheWVyLmdiLmFsbFNoaXBzW3NoaXBJZF0ubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXg9JyR7eH0nXVtkYXRhLXk9JyR7eStpfSddYClcclxuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRTaGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtaWQ9JyR7c2hpcElkfSddW2RhdGEtcG9zaXRpb249JyR7aX0nXWApXHJcbiAgICAgICAgICAgICAgICBzLmFwcGVuZENoaWxkKGN1cnJlbnRTaGlwKVxyXG4gICAgICAgICAgICB9ICAgICAgXHJcbiAgICAgICAgfSBlbHNlIGlmKGRpcmVjdGlvbiA9PT0gJ3ZlcnRpY2FsJyl7XHJcbiAgICAgICAgICAgIGZvciggbGV0IGkgPSAwOyBpPCBwbGF5ZXIuZ2IuYWxsU2hpcHNbc2hpcElkXS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEteD0nJHt4K2l9J11bZGF0YS15PScke3l9J11gKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFNoaXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1pZD0nJHtzaGlwSWR9J11bZGF0YS1wb3NpdGlvbj0nJHtpfSddYClcclxuICAgICAgICAgICAgICAgIHMuYXBwZW5kQ2hpbGQoY3VycmVudFNoaXApICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9ICAgICAgXHJcbiAgICAgICAgfSAgICAgICAgIFxyXG4gICAgfVxyXG4gICAgY29uc3QgcmFuZG9tUGxhY2UgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIHBsYXllci5nYi5yZXNldEFsbCgpICAgICAgICBcclxuICAgICAgICBsZXQgeCwgeSwgZFxyXG4gICAgICAgIGxldCBuYW1lcyA9IFsnY2FycmllcicsICdiYXR0bGVzaGlwJywnc3VibWFyaW5lJywnY3J1c2llcicgLCAnZGVzdHJveWVyJ11cclxuICAgICAgICBsZXQgc2hpcHMgPSBbXVxyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPG5hbWVzLmxlbmd0aDsgaSsrKSBzaGlwcy5wdXNoKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke25hbWVzW2ldfS5zaGlwSW1nYCkpXHJcbiAgICAgICAgc2hpcHMuZm9yRWFjaCgoc2hpcCwgaWQpID0+e1xyXG4gICAgICAgICAgICB4ID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSlcclxuICAgICAgICAgICAgeSA9IChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkpXHJcbiAgICAgICAgICAgIGQgPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMikpXHJcbiAgICAgICAgICAgIGQgPSAoZCA/ICdob3Jpem9udGFsJyA6ICd2ZXJ0aWNhbCcpICBcclxuICAgICAgICAgICAgaWYocGxheWVyLmdiLnZlcmlmeVNoaXBQbGFjZW1lbnQoZCwgcGxheWVyLmdiLmFsbFNoaXBzW2lkXSwgeCwgeSkpe1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgYSBvZiBzaGlwKSBhLmNsYXNzTGlzdC5yZW1vdmUoJ3ZlcicpXHJcbiAgICAgICAgICAgICAgICBpZihkID09PSAndmVydGljYWwnKSBmb3IgKGxldCBhIG9mIHNoaXApIGEuY2xhc3NMaXN0LmFkZCgndmVyJylcclxuICAgICAgICAgICAgICAgIGdhbWUucGxhY2VTaGlwcyhwbGF5ZXIsIGQsIHgsIHksIGZhbHNlLCBpZClcclxuICAgICAgICAgICAgICAgIGRyb3BTaGlwKHgseSxkLCBpZClcclxuICAgICAgICAgICAgfSBlbHNlICB7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB3aGlsZSghcGxheWVyLmdiLnZlcmlmeVNoaXBQbGFjZW1lbnQoZCwgcGxheWVyLmdiLmFsbFNoaXBzW2lkXSwgeCwgeSkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHggPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApKVxyXG4gICAgICAgICAgICAgICAgICAgIHkgPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApKVxyXG4gICAgICAgICAgICAgICAgICAgIGQgPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMikpXHJcbiAgICAgICAgICAgICAgICAgICAgZCA9IChkID8gJ2hvcml6b250YWwnIDogJ3ZlcnRpY2FsJylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGEgb2Ygc2hpcCkgYS5jbGFzc0xpc3QucmVtb3ZlKCd2ZXInKVxyXG4gICAgICAgICAgICAgICAgaWYoZCA9PT0gJ3ZlcnRpY2FsJykgZm9yIChsZXQgYSBvZiBzaGlwKSBhLmNsYXNzTGlzdC5hZGQoJ3ZlcicpXHJcbiAgICAgICAgICAgICAgICBnYW1lLnBsYWNlU2hpcHMocGxheWVyLCBkLCB4LCB5LCBmYWxzZSwgaWQpXHJcbiAgICAgICAgICAgICAgICBkcm9wU2hpcCh4LHksZCwgaWQpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSAgICBcclxuICAgICAgICBjb25zb2xlLnRhYmxlKHBsYXllci5nYi5ib2FyZClcclxuICAgIH1cclxuICAgIGNvbnN0IGRyYWdMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByYW5kb21CdG4ub25tb3VzZXVwID0gKGUpID0+IHtcclxuICAgICAgICAgICAgcmFuZG9tUGxhY2UoKVxyXG4gICAgICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIG1vdXNlRG93bilcclxuICAgICAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCBkcmFnRW5kKVxyXG4gICAgICAgIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcignZGJsY2xpY2snLCByb3RhdGVTaGlwKSAgICAgICAgXHJcbiAgICAgICAgZm9yIChsZXQgcyBvZiBzcXVhcmVzKXtcclxuICAgICAgICAgICAgcy5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCBkcmFnRW50ZXIpXHJcbiAgICAgICAgICAgIHMuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgZHJhZ0xlYXZlKVxyXG4gICAgICAgICAgICBzLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgZHJhZ092ZXIpXHJcbiAgICAgICAgfSAgICAgXHJcbiAgICB9XHJcbiAgICBkcmFnTGlzdGVuZXJzKClcclxuICAgIHJldHVybiByYW5kb21QbGFjZVxyXG59IiwiaW1wb3J0IHsgc2hpcEZhY3RvcnkgfSBmcm9tIFwiLi9zaGlwc1wiXHJcblxyXG5leHBvcnQgY29uc3QgZ2FtZWJvYXJkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAvLyB4IGFuZCB5IGNvb3Jkc1xyXG4gICAgbGV0IGJvYXJkID0gQXJyYXkoMTApLmZpbGwodW5kZWZpbmVkKS5tYXAoKHgpID0+IEFycmF5KDEwKS5maWxsKHVuZGVmaW5lZCkpXHJcbiAgICBjb25zdCBnZXRCb2FyZCA9ICgpID0+IEFycmF5KDEwKS5maWxsKHVuZGVmaW5lZCkubWFwKCh4KSA9PiBBcnJheSgxMCkuZmlsbCh1bmRlZmluZWQpKVxyXG4gICAgbGV0IGRpcmVjdGlvbiA9ICdob3Jpem9udGFsJ1xyXG4gICAgbGV0IHBsYWNlZFNoaXBzID0gW11cclxuICAgIGxldCBhbGxTaGlwcyA9IFtdXHJcbiAgICBsZXQgc3Vua1NoaXBzID0gW11cclxuICAgIGxldCBtaXNzZWRBdHRhY2tzID0gW11cclxuICAgIGxldCBhbGxBdHRhY2tzID0gW11cclxuIFxyXG4gICAgY29uc3QgY3JlYXRlU2hpcHMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBhbGxTaGlwcyA9IFtdXHJcbiAgICAgICAgY29uc3QgY2FycmllciA9IHNoaXBGYWN0b3J5KCdDYXJyaWVyJywgNSlcclxuICAgICAgICBjb25zdCBiYXR0bGVzaGlwID0gc2hpcEZhY3RvcnkoJ0JhdHRsZXNoaXAnLCA0KSAgICAgICAgXHJcbiAgICAgICAgY29uc3Qgc3VibWFyaW5lID0gc2hpcEZhY3RvcnkoJ1N1Ym1hcmluZScsIDMpXHJcbiAgICAgICAgY29uc3QgY3J1c2llciA9IHNoaXBGYWN0b3J5KCdDcnVzaWVyJywgMylcclxuICAgICAgICBjb25zdCBkZXN0cm95ZXIgPSBzaGlwRmFjdG9yeSgnRGVzdHJveWVyJywgMilcclxuICAgICAgICBhbGxTaGlwcy5wdXNoKGNhcnJpZXIsIGJhdHRsZXNoaXAsICBzdWJtYXJpbmUsIGNydXNpZXIsIGRlc3Ryb3llcilcclxuICAgICAgICByZXR1cm4gYWxsU2hpcHNcclxuICAgIH1cclxuICAgIGNvbnN0IHZlcmlmeVNoaXBQbGFjZW1lbnQgPSBmdW5jdGlvbihkaXJlYywgc2hpcCwgeCwgeSkge1xyXG4gICAgICAgIGlmKHRoaXMuYm9hcmRbeF1beV0gPT09IHVuZGVmaW5lZCl7ICBcclxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIHNoaXAgZml0cyBpbnRvIHRoZSBzcG90XHJcbiAgICAgICAgICAgIGlmKGRpcmVjID09PSAnaG9yaXpvbnRhbCcgJiYgKHkgKyAoc2hpcC5sZW5ndGgtMSkgPCAxMCkpe1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMTsgaSA8IChzaGlwLmxlbmd0aCk7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5ib2FyZFt4XVt5ICsgaV0gIT09IHVuZGVmaW5lZCkgcmV0dXJuIGZhbHNlICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZihkaXJlYyA9PT0gJ3ZlcnRpY2FsJyAmJiAoeCArIChzaGlwLmxlbmd0aC0xKSA8IDEwKSl7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAxOyBpPChzaGlwLmxlbmd0aCk7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5ib2FyZFt4ICsgaV1beV0gIT09IHVuZGVmaW5lZCkgcmV0dXJuIGZhbHNlICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9ICBcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSBlbHNlIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH0gZWxzZSByZXR1cm4gZmFsc2UgICAgICAgIFxyXG4gICAgfVxyXG4gICAgY29uc3QgcGxhY2VTaGlwID0gZnVuY3Rpb24oZGlyZWMsIHNoaXAsIHgsIHkpIHtcclxuICAgICAgICAvL09ubHkgcGxhY2UgaWYgdGhlIHNwYWNlIGlzIGZyZWVcclxuICAgICAgICAvLyBjaGVjayBpZiB0aGUgc2hpcCBmaXRzIGludG8gdGhlIHNwb3QgICAgICAgIFxyXG4gICAgICAgIGlmKGRpcmVjID09PSAnaG9yaXpvbnRhbCcgKXtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8c2hpcC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJvYXJkW3hdW3kgKyBpXSA9IHtzaGlwLCBwb3NpdGlvbjogaX1cclxuICAgICAgICAgICAgICAgIGlmKHRoaXMucGxhY2VkU2hpcHMuaW5kZXhPZihzaGlwKSA9PT0gLTEpIHRoaXMucGxhY2VkU2hpcHMucHVzaChzaGlwKVxyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH0gZWxzZSBpZihkaXJlYyA9PT0gJ3ZlcnRpY2FsJyApe1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxzaGlwLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmRbeCArIGldW3ldID0ge3NoaXAsIHBvc2l0aW9uOiBpfVxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5wbGFjZWRTaGlwcy5pbmRleE9mKHNoaXApID09PSAtMSkgdGhpcy5wbGFjZWRTaGlwcy5wdXNoKHNoaXApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IFxyXG4gICAgfSBcclxuICAgIC8vdmVyaWZ5IGlmIHRoZSBwbGFjZSB3YXMgYWxyZWFkeSBhdHRhY2tlZFxyXG4gICAgY29uc3QgdmVyaWZ5QXR0YWNrID0gZnVuY3Rpb24oeCwgeSkge1xyXG4gICAgICAgIGZvciAobGV0IGl0ZW0gb2YgYWxsQXR0YWNrcykgaWYoaXRlbVswXSA9PT0geCAmJiBpdGVtWzFdID09PSB5KSByZXR1cm4gZmFsc2UgICAgIFxyXG4gICAgICAgIHJldHVybiB0cnVlICAgIFxyXG4gICAgfVxyXG4gICAgLy9hdHRhY2sgdGhlIGVuZW15J3MgZ2FtZWJvYXJkXHJcbiAgICBjb25zdCByZWNlaXZlQXR0YWNrID0gZnVuY3Rpb24oeCwgeSl7ICBcclxuICAgICAgICBpZih2ZXJpZnlBdHRhY2soeCwgeSkpe1xyXG4gICAgICAgICAgICBpZiggdHlwZW9mIHRoaXMuYm9hcmRbeF1beV0gPT09ICdvYmplY3QnKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmRbeF1beV0uc2hpcC5oaXQodGhpcy5ib2FyZFt4XVt5XS5wb3NpdGlvbilcclxuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmRbeF1beV0gPSAnaGl0J1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hbGxBdHRhY2tzLnB1c2goW3gseV0pICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5ib2FyZFt4XVt5XSA9PT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmRbeF1beV0gPSAnbWlzcydcclxuICAgICAgICAgICAgICAgIHRoaXMuYWxsQXR0YWNrcy5wdXNoKFt4LHldKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5taXNzZWRBdHRhY2tzLnB1c2goW3gseV0pICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gdmVyaWZ5U2hpcHMoKVxyXG4gICAgICAgIH0gICAgXHJcbiAgICB9XHJcbiAgICAvL3ZlcmlmeSBpZiB0aGUgc2hpcCBpcyBzdW5rXHJcbiAgICBjb25zdCB2ZXJpZnlTaGlwcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGZvcihsZXQgc2hpcCBvZiB0aGlzLnBsYWNlZFNoaXBzKSB7XHJcbiAgICAgICAgICAgIGlmKHNoaXAuaXNTdW5rKCkgJiYgdGhpcy5zdW5rU2hpcHMuaW5kZXhPZihzaGlwKSA9PT0gLTEpIHRoaXMuc3Vua1NoaXBzLnB1c2goc2hpcClcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3Vua1NoaXBzLmxlbmd0aCA9PT0gNSkgcmV0dXJuICdsb3NlJ1xyXG4gICAgICAgIGVsc2UgcmV0dXJuICdwbGF5aW5nJ1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyByZXNldCBnYW1lXHJcbiAgICBjb25zdCByZXNldEFsbCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5wbGFjZWRTaGlwcyA9IFtdXHJcbiAgICAgICAgdGhpcy5zdW5rU2hpcHMgPSBbXVxyXG4gICAgICAgIGFsbEF0dGFja3MgPSBbXVxyXG4gICAgICAgIHRoaXMuYWxsQXR0YWNrcyA9IFtdXHJcbiAgICAgICAgdGhpcy5taXNzZWRBdHRhY2tzID0gW11cclxuICAgICAgICB0aGlzLmJvYXJkID0gZ2V0Qm9hcmQoKVxyXG4gICAgICAgIGFsbFNoaXBzLmZvckVhY2goc2hpcCA9PiBzaGlwLmhpdFBvc2l0aW9uID0gW10pICAgIFxyXG4gICAgICAgIGNvbnNvbGUubG9nKGFsbFNoaXBzLCB0aGlzLmFsbFNoaXBzKVxyXG4gICAgfVxyXG4gICAgY3JlYXRlU2hpcHMoKVxyXG4gICAgcmV0dXJue1xyXG4gICAgICAgIGJvYXJkLFxyXG4gICAgICAgIGRpcmVjdGlvbixcclxuICAgICAgICBwbGFjZWRTaGlwcyxcclxuICAgICAgICBhbGxTaGlwcyxcclxuICAgICAgICBhbGxBdHRhY2tzLFxyXG4gICAgICAgIHN1bmtTaGlwcyxcclxuICAgICAgICBtaXNzZWRBdHRhY2tzLFxyXG4gICAgICAgIGNyZWF0ZVNoaXBzLFxyXG4gICAgICAgIHBsYWNlU2hpcCxcclxuICAgICAgICB2ZXJpZnlTaGlwUGxhY2VtZW50LFxyXG4gICAgICAgIHZlcmlmeUF0dGFjayxcclxuICAgICAgICByZWNlaXZlQXR0YWNrLFxyXG4gICAgICAgIHZlcmlmeVNoaXBzLFxyXG4gICAgICAgIHJlc2V0QWxsXHJcbiAgICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCB7IGNyZWF0ZVBsYXllciB9IGZyb20gJy4vcGxheWVyJ1xyXG5pbXBvcnQgeyByZW5kZXIgfSBmcm9tICcuL1VJJ1xyXG5cclxuZXhwb3J0IGNvbnN0IHBsYXllciA9IGNyZWF0ZVBsYXllcigncGxheWVyJylcclxuZXhwb3J0IGNvbnN0IGNwdSA9IGNyZWF0ZVBsYXllcignY3B1JylcclxuZXhwb3J0IGNvbnN0IGdhbWUgPSAoKHAxLCBwMikgPT4ge1xyXG4gICAgLy8gUGxhY2Ugc2hpcHMgb24gdGhlIGJvYXJkXHJcbiAgICBjb25zdCBwbGFjZVNoaXBzID0gKHBsYXllciwgZGlyLCB4MSwgeTEsIGF1dG8sIHNoaXBJbmRleCkgPT4ge1xyXG4gICAgICAgIGlmKGF1dG8gPT09IHRydWUpe1xyXG4gICAgICAgICAgICBwbGF5ZXIuZ2IuYWxsU2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMClcclxuICAgICAgICAgICAgICAgIGxldCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApXHJcbiAgICAgICAgICAgICAgICBsZXQgZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpXHJcbiAgICAgICAgICAgICAgICBpZihkID09PSAxKSBkID0gJ2hvcml6b250YWwnXHJcbiAgICAgICAgICAgICAgICBlbHNlIGQgPSAndmVydGljYWwnXHJcbiAgICAgICAgICAgICAgICBpZiAocGxheWVyLmdiLnZlcmlmeVNoaXBQbGFjZW1lbnQoZCwgc2hpcCwgeCwgeSkgPT09IGZhbHNlICl7XHJcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUocGxheWVyLmdiLnZlcmlmeVNoaXBQbGFjZW1lbnQoZCwgc2hpcCwgeCwgeSkgPT09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuZ2IucGxhY2VTaGlwKGQsc2hpcCwgeCwgeSlcclxuICAgICAgICAgICAgfSBlbHNlIHBsYXllci5nYi5wbGFjZVNoaXAoZCxzaGlwLCB4LCB5KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBzaGlwID0gcGxheWVyLmdiLmFsbFNoaXBzW3NoaXBJbmRleF1cclxuICAgICAgICAgICAgaWYgKHBsYXllci5nYi52ZXJpZnlTaGlwUGxhY2VtZW50KGRpciwgc2hpcCwgeDEsIHkxKSA9PT0gZmFsc2UgKXtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5hbGVydCgnSW52YWxpZCBwb3NpdGlvbicpXHJcbiAgICAgICAgICAgIH0gZWxzZSBwMS5nYi5wbGFjZVNoaXAoZGlyLHNoaXAsIHgxLCB5MSkgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgfSBcclxuICAgIC8vUGxheSBnYW1lIHR1cm5zLCBwbGF5ZXIgeCBjcHVcclxuICAgIGNvbnN0IHBsYXlUdXJuID0gZnVuY3Rpb24ocCwgeDEsIHkxLCBhdXRvKSB7XHJcbiAgICAgICAgaWYoYXV0byA9PT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIGxldCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApXHJcbiAgICAgICAgICAgIGxldCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKCFwLmdiLnZlcmlmeUF0dGFjayh4LHkpKXtcclxuICAgICAgICAgICAgICAgIHdoaWxlKCFwLmdiLnZlcmlmeUF0dGFjayh4LHkpKXtcclxuICAgICAgICAgICAgICAgICAgICB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApXHJcbiAgICAgICAgICAgICAgICAgICAgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKVxyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHAuZ2IucmVjZWl2ZUF0dGFjayh4LCB5KVxyXG4gICAgICAgICAgICAgICAgcmVuZGVyLnVwZGF0ZUdyaWQocCwgeCwgeSlcclxuICAgICAgICAgICAgfSBlbHNlIHtwLmdiLnJlY2VpdmVBdHRhY2soeCwgeSk7cmVuZGVyLnVwZGF0ZUdyaWQocCwgeCwgeSl9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcC5nYi5yZWNlaXZlQXR0YWNrKHgxLCB5MSApXHJcbiAgICAgICAgICAgIHJlbmRlci51cGRhdGVHcmlkKHAsIHgxLCB5MSlcclxuICAgICAgICAgICAgY29uc29sZS5sb2coW3AxLmdiLmFsbEF0dGFja3MsIHAyLmdiLmFsbEF0dGFja3MsIHAyLmdiLnN1bmtTaGlwc10pXHJcbiAgICAgICAgfSAgICAgIFxyXG4gICAgICAgIGlzV2lubmVyKClcclxuICAgIH1cclxuICAgIGNvbnN0IGlzV2lubmVyID0gZnVuY3Rpb24oKXtcclxuICAgICAgICBpZihwMS5nYi52ZXJpZnlTaGlwcygpID09PSAnbG9zZScpIHtjb25zb2xlLmxvZyhgJHtwMi5uYW1lfWAgKTtyZXR1cm4gYCR7cDIubmFtZX1gfVxyXG4gICAgICAgIGVsc2UgaWYocDIuZ2IudmVyaWZ5U2hpcHMoKSA9PT0gJ2xvc2UnKSB7Y29uc29sZS5sb2coYCR7cDEubmFtZX1gICk7cmV0dXJuIGAke3AxLm5hbWV9YH1cclxuICAgICAgICBcclxuICAgIH1cclxuICAgIGNvbnN0IHBsYXkgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBwbGFjZVNoaXBzKHAyLCAnaG9yaXpvbnRhbCcsIDAsIDAsIHRydWUsIDApXHJcbiAgICAgICAgcmVuZGVyLmdyaWQoJ3BsYXllcicpXHJcbiAgICAgICAgcmVuZGVyLnNob3dTaGlwcygpICAgIFxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdGFydC1nYW1lJykuc3R5bGUuZGlzcGxheSA9ICdmbGV4J1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdGFydC1nYW1lJykub25jbGljayA9ICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHAxLmdiLnBsYWNlZFNoaXBzLmxlbmd0aCA9PT0gNSkge1xyXG4gICAgICAgICAgICByZW5kZXIuc3RhcnQoKVxyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmFuZG9tLWJ0bicpLnJlbW92ZSgpXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaGlwRGl2JykucmVtb3ZlKClcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N0YXJ0LWdhbWUnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdGFydC1nYW1lJykub25jbGljayA9IG51bGxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0IHJlc3RhcnRBbGwgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIHAxLmdiLnJlc2V0QWxsKClcclxuICAgICAgICBwMi5nYi5yZXNldEFsbCgpICBcclxuICAgICAgICAvLyBwMS5nYi5hbGxTaGlwcy5mb3JFYWNoKHNoaXAgPT4gc2hpcC5yZXNldEhpdHMoKSlcclxuICAgICAgICAvLyBwMi5nYi5hbGxTaGlwcy5mb3JFYWNoKHNoaXAgPT4gc2hpcC5yZXNldEhpdHMoKSlcclxuICAgICAgICBnYW1lLnBsYXkoKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFtwMi5nYi5hbGxTaGlwcywgcDIuZ2IucGxhY2VkU2hpcHNdKVxyXG4gICAgfSAgICBcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcGxhY2VTaGlwcywgXHJcbiAgICAgICAgcGxheVR1cm4sXHJcbiAgICAgICAgaXNXaW5uZXIsXHJcbiAgICAgICAgcGxheSxcclxuICAgICAgICByZXN0YXJ0QWxsXHJcbiAgICB9XHJcbn0pKHBsYXllciwgY3B1KVxyXG5cclxuZ2FtZS5wbGF5KClcclxuIiwiaW1wb3J0IHsgZ2FtZWJvYXJkIH0gZnJvbSBcIi4vZ2FtZWJvYXJkXCJcclxuXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVQbGF5ZXIgPSAobmFtZSkgPT4ge1xyXG4gICAgY29uc3QgZ2IgPSBnYW1lYm9hcmQoKVxyXG5cclxuICAgIHJldHVybiB7bmFtZSwgZ2J9XHJcbn1cclxuXHJcbiIsImV4cG9ydCBjb25zdCBzaGlwRmFjdG9yeSA9IChuYW1lLCBsZW4pID0+IHtcclxuICAgIGNvbnN0IGlkID0gbmFtZVxyXG4gICAgY29uc3QgbGVuZ3RoID0gbGVuXHJcbiAgICBsZXQgaGl0UG9zaXRpb24gPSBbXVxyXG4gICAgbGV0IHN1bmsgPSBmYWxzZVxyXG4gICAgY29uc3QgaGl0ID0gZnVuY3Rpb24ocG9zKSB7XHJcbiAgICAgICAgdGhpcy5oaXRQb3NpdGlvbi5wdXNoKHBvcylcclxuICAgIH1cclxuICAgIGNvbnN0IGlzU3VuayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmKHRoaXMuaGl0UG9zaXRpb24ubGVuZ3RoID09PSBsZW5ndGgpIHRoaXMuc3VuayA9IHRydWUgICAgICAgICAgICBcclxuICAgICAgICBlbHNlIHRoaXMuc3VuayA9IGZhbHNlXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3Vua1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtpZCwgXHJcbiAgICAgICAgbGVuZ3RoLCBcclxuICAgICAgICBoaXRQb3NpdGlvbiwgXHJcbiAgICAgICAgc3VuaywgXHJcbiAgICAgICAgaGl0LCBcclxuICAgICAgICBpc1N1bmssIFxyXG4gICAgICAgIH1cclxufVxyXG5cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==