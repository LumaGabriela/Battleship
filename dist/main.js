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
            _index__WEBPACK_IMPORTED_MODULE_0__.game.playTurn(_index__WEBPACK_IMPORTED_MODULE_0__.cpu, x, y, false)
            updateGame()
            for(let c of squares) c.onclick = null
            setTimeout(() => {
                _index__WEBPACK_IMPORTED_MODULE_0__.game.playTurn(_index__WEBPACK_IMPORTED_MODULE_0__.player, 0, 0, true)  
                attack()      
                s.onclick = null        
            },100)           
            updateGame()
        }        
    }
    const updateGame = function(){        
        let pInfo = document.querySelector('#player-info')
        let cInfo = document.querySelector('#cpu-info')
        pInfo.innerHTML = `Player remaining ships: ${_index__WEBPACK_IMPORTED_MODULE_0__.player.gb.remainingShips.length}`
        cInfo.innerHTML = `CPU remaining ships: ${_index__WEBPACK_IMPORTED_MODULE_0__.cpu.gb.remainingShips.length}`
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
        console.log(_index__WEBPACK_IMPORTED_MODULE_0__.game.isWinner())
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
        _index__WEBPACK_IMPORTED_MODULE_0__.game.restartAll()
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

const drag = function(ship, p1){
    let shipId      // from 0 to 4, correspond to ship names
    let shipPosition    // the position where the player points the mouse
    let direction = _index__WEBPACK_IMPORTED_MODULE_0__.player.gb.direction     // ship orientation, can be horizontal or vertical
    
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
        if(_index__WEBPACK_IMPORTED_MODULE_0__.player.gb.verifyShipPlacement(direction, _index__WEBPACK_IMPORTED_MODULE_0__.player.gb.allShips[shipId], x, y)) {
            _index__WEBPACK_IMPORTED_MODULE_0__.game.placeShips(_index__WEBPACK_IMPORTED_MODULE_0__.player, direction, x, y, false, shipId)
            ship.removeEventListener('mousedown', mouseDown)
            dropShip(x,y)
            ship.style.cursor = 'default'
        } else window.alert('Invalid position')
    }
    const dropShip = (x, y) => {
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


const gameboard = () => {
    // x and y coords
    let board = Array(10).fill(undefined).map((x) => Array(10).fill(undefined))
    let direction = 'horizontal'
    let placedShips = []
    let allShips = []
    let remainingShips = []
    let sunkShips = []
    let missedAttacks = []
    let allAttacks = []
   
    const createShips = function() {
        allShips = []
        const carrier = (0,_ships__WEBPACK_IMPORTED_MODULE_0__.shipFactory)('Carrier', 5)
        const battleship = (0,_ships__WEBPACK_IMPORTED_MODULE_0__.shipFactory)('Battleship', 4)
        const crusier = (0,_ships__WEBPACK_IMPORTED_MODULE_0__.shipFactory)('Crusier', 3)
        const submarine = (0,_ships__WEBPACK_IMPORTED_MODULE_0__.shipFactory)('Submarine', 3)
        const destroyer = (0,_ships__WEBPACK_IMPORTED_MODULE_0__.shipFactory)('Destroyer', 2)
        allShips.push(carrier, battleship, crusier, submarine, destroyer)
        remainingShips.push(carrier, battleship, crusier, submarine, destroyer)
        return allShips
    }

    const placeShip = function( direc, ship, x, y) {
        //Only place if the space is free
        // check if the ship fits into the spot
        if(direc === 'horizontal' && verifyShipPlacement(direc, ship, x, y)){
            for(let i=0; i<ship.length; i++){
                this.board[x][y + i] = {ship, position: i}
                if(placedShips.indexOf(ship) === -1) placedShips.push(ship)
            } 
        } else if(direc === 'vertical' && verifyShipPlacement(direc, ship, x, y)){
            for(let i=0; i<ship.length; i++){
                this.board[x + i][y] = {ship, position: i}
                if(placedShips.indexOf(ship) === -1) placedShips.push(ship)
            }
        } 
    }
    const verifyShipPlacement = function(direc, ship, x, y) {
        if(board[x][y] === undefined){
            // check if the ship fits into the spot
            if(direc === 'horizontal' && (y + (ship.length-1) < board[x].length)){
                return true
            } else if(direc === 'vertical' && (x + (ship.length-1) < board.length)){
                return true
            } else return false
        } else return false        
    }
    //verify if the place was already attacked
    const verifyAttack = function(x, y) {
        for (let item of allAttacks) {
            if(item[0] === x && item[1] === y) return false                        
        }
    return true    
    }
    //attack the enemy's gameboard
    const receiveAttack = function(x, y){  
        if(verifyAttack(x, y)){
            if( typeof board[x][y] === 'object'){
                board[x][y].ship.hit(board[x][y].position)
                board[x][y] = 'hit'
                allAttacks.push([x,y])
            }
            else if(board[x][y] === undefined){
                board[x][y] = 'miss'
                allAttacks.push([x,y])
                missedAttacks.push([x,y])
            }
            verifyShips()
        }    
    }
    //verify if the ship is sunk
    const verifyShips = function() {
        for(let ship of placedShips) {
            if(ship.isSunk() && sunkShips.indexOf(ship) === -1) {console.log(ship.isSunk()) ;sunkShips.push(ship)}
        }
        getRemainingShips()
        console.log(sunkShips)
        if (sunkShips.length === 5) return 'lose'
        else return 'playing'
    }
    const getRemainingShips = function(){
        for (let s of remainingShips){
            for (let sunk of sunkShips) {
                if(sunk === s) { remainingShips.splice(remainingShips.indexOf(s),1)}          
            }
        }
    }
    // reset game
    const resetAll = function(){
        allShips = []
        placedShips = []
        remainingShips = []
        sunkShips = []
        let board = Array(10).fill(undefined).map((x) => Array(10).fill(undefined))
        return allShips, placedShips, board
    }
    createShips()
    return{
        board,
        direction,
        placedShips,
        allShips,
        sunkShips,
        remainingShips,
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
        if(p1.gb.placedShips.length === 5)_UI__WEBPACK_IMPORTED_MODULE_1__.render.start()                        
        console.table(player.gb.board)
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
            console.log(p2.gb)
        }        
    }
    const isWinner = function(){
        if(p1.gb.verifyShips() === 'lose') return `${p2.name}`
        else if(p2.gb.verifyShips() === 'lose') return `${p1.name}`
    }
    const play = function() {
         _UI__WEBPACK_IMPORTED_MODULE_1__.render.attack()
    }
    const restartAll = function(){
        p1.gb.resetAll()
        p2.gb.resetAll()
        _UI__WEBPACK_IMPORTED_MODULE_1__.render.grid('player')
        _UI__WEBPACK_IMPORTED_MODULE_1__.render.showShips()
        game.play()
    }
    placeShips(p2, 'horizontal', 0, 0, true, 0)
    return {
        placeShips, 
        playTurn,
        isWinner,
        play,
        restartAll
    }
})(player, cpu)

_UI__WEBPACK_IMPORTED_MODULE_1__.render.grid('player')
_UI__WEBPACK_IMPORTED_MODULE_1__.render.showShips()
game.play()


/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createPlayer": () => (/* binding */ createPlayer),
/* harmony export */   "computerPlay": () => (/* binding */ computerPlay)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");


const createPlayer = (name) => {
    const gb = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.gameboard)()

    return {name, gb}
}

const computerPlay = () => {
    let x = Math.floor(Math.random() * 10)
    let y = Math.floor(Math.random() * 10)
    return [x,y]
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
        hitPosition.push(pos)
        isSunk()
        return hitPosition
    }
    const isSunk = function() {
        if(hitPosition.length === length) {
            sunk = true
        } else sunk = false
        return sunk
    }
    return {id, length, hitPosition, sunk, hit, isSunk}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBLDRDQUFXO0FBQ1gsaURBQWdCO0FBQ2hCOzs7Ozs7Ozs7Ozs7Ozs7OztBQzlFdUM7QUFDdkM7QUFDTztBQUNQLGVBQWUscURBQVM7QUFDeEI7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDWk87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBOzs7Ozs7O1VDbEJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9VSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RyYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcGxheWVyLCBjcHUgLCBnYW1lIH0gZnJvbSBcIi4vaW5kZXhcIlxyXG5pbXBvcnQgeyBkcmFnIH0gZnJvbSBcIi4vZHJhZ1wiXHJcbmV4cG9ydCBjb25zdCByZW5kZXIgPSAoKCkgPT4ge1xyXG4gICAgXHJcbiAgICBjb25zdCBncmlkID0gKG5hbWUpID0+IHsgICAgIFxyXG4gICAgICAgIGxldCBnYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2dhbWUnKVxyXG4gICAgICAgIGxldCBwbGF5ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgICAgIHBsYXllci5pZCA9IGAke25hbWV9YFxyXG4gICAgICAgIGxldCBpbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgICAgICBsZXQgZ3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgICAgaW5mby5pZCA9IGAke25hbWV9LWluZm9gXHJcbiAgICAgICAgZ3JpZC5pZCA9IGAke25hbWV9LWdhbWVib2FyZGBcclxuICAgICAgICBncmlkLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZ2FtZWJvYXJkJylcclxuICAgICAgICBsZXQgaSA9IDBcclxuICAgICAgICB3aGlsZShpPDEwMCkge1xyXG4gICAgICAgICAgICBpZihpPj0wICYmIGk8MTApe1xyXG4gICAgICAgICAgICAgICAgZ3JpZC5pbm5lckhUTUwgKz0gYDxkaXYgY2xhc3M9XCIke25hbWV9IHNxdWFyZVwiIGRhdGEteT0nJHtpfScgZGF0YS14PSckezB9Jz48L2Rpdj5gXHJcbiAgICAgICAgICAgIH1lbHNlIGlmIChpPj0xMCAmJiBpPDIwKXtcclxuICAgICAgICAgICAgICAgIGdyaWQuaW5uZXJIVE1MICs9IGA8ZGl2IGNsYXNzPVwiJHtuYW1lfSBzcXVhcmVcIiBkYXRhLXk9JyR7aS0xMH0nIGRhdGEteD0nJHsxfSc+PC9kaXY+YFxyXG4gICAgICAgICAgICB9ZWxzZSBpZiAoaT49MjAgJiYgaTwzMCl7XHJcbiAgICAgICAgICAgICAgICBncmlkLmlubmVySFRNTCArPSBgPGRpdiBjbGFzcz1cIiR7bmFtZX0gc3F1YXJlXCIgZGF0YS15PScke2ktMjB9JyBkYXRhLXg9JyR7Mn0nPjwvZGl2PmBcclxuICAgICAgICAgICAgfWVsc2UgaWYgKGk+PTMwICYmIGk8NDApe1xyXG4gICAgICAgICAgICAgICAgZ3JpZC5pbm5lckhUTUwgKz0gYDxkaXYgY2xhc3M9XCIke25hbWV9IHNxdWFyZVwiIGRhdGEteT0nJHtpLTMwfScgZGF0YS14PSckezN9Jz48L2Rpdj5gXHJcbiAgICAgICAgICAgIH1lbHNlIGlmIChpPj00MCAmJiBpPDUwKXtcclxuICAgICAgICAgICAgICAgIGdyaWQuaW5uZXJIVE1MICs9IGA8ZGl2IGNsYXNzPVwiJHtuYW1lfSBzcXVhcmVcIiBkYXRhLXk9JyR7aS00MH0nIGRhdGEteD0nJHs0fSc+PC9kaXY+YFxyXG4gICAgICAgICAgICB9ZWxzZSBpZiAoaT49NTAgJiYgaTw2MCl7XHJcbiAgICAgICAgICAgICAgICBncmlkLmlubmVySFRNTCArPSBgPGRpdiBjbGFzcz1cIiR7bmFtZX0gc3F1YXJlXCIgZGF0YS15PScke2ktNTB9JyBkYXRhLXg9JyR7NX0nPjwvZGl2PmBcclxuICAgICAgICAgICAgfWVsc2UgaWYgKGk+PTYwICYmIGk8NzApe1xyXG4gICAgICAgICAgICAgICAgZ3JpZC5pbm5lckhUTUwgKz0gYDxkaXYgY2xhc3M9XCIke25hbWV9IHNxdWFyZVwiIGRhdGEteT0nJHtpLTYwfScgZGF0YS14PSckezZ9Jz48L2Rpdj5gXHJcbiAgICAgICAgICAgIH1lbHNlIGlmIChpPj03MCAmJiBpPDgwKXtcclxuICAgICAgICAgICAgICAgIGdyaWQuaW5uZXJIVE1MICs9IGA8ZGl2IGNsYXNzPVwiJHtuYW1lfSBzcXVhcmVcIiBkYXRhLXk9JyR7aS03MH0nIGRhdGEteD0nJHs3fSc+PC9kaXY+YFxyXG4gICAgICAgICAgICB9ZWxzZSBpZiAoaT49ODAgJiYgaTw5MCl7XHJcbiAgICAgICAgICAgICAgICBncmlkLmlubmVySFRNTCArPSBgPGRpdiBjbGFzcz1cIiR7bmFtZX0gc3F1YXJlXCIgZGF0YS15PScke2ktODB9JyBkYXRhLXg9JyR7OH0nPjwvZGl2PmBcclxuICAgICAgICAgICAgfWVsc2UgaWYgKGk+PTkwICYmIGk8MTAwKXtcclxuICAgICAgICAgICAgICAgIGdyaWQuaW5uZXJIVE1MICs9IGA8ZGl2IGNsYXNzPVwiJHtuYW1lfSBzcXVhcmVcIiBkYXRhLXk9JyR7aS05MH0nIGRhdGEteD0nJHs5fSc+PC9kaXY+YFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGkrK1xyXG4gICAgICAgIH1cclxuICAgIHBsYXllci5hcHBlbmRDaGlsZChncmlkKVxyXG4gICAgcGxheWVyLmFwcGVuZENoaWxkKGluZm8pXHJcbiAgICBnYW1lLmFwcGVuZENoaWxkKHBsYXllcilcclxuICAgIH1cclxuICAgIGNvbnN0IHNob3dTaGlwcyA9ICgpID0+IHtcclxuICAgICAgICBsZXQgc2hpcERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgICAgbGV0IGdhbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZ2FtZScpXHJcbiAgICAgICAgc2hpcERpdi5pZCA9ICdzaGlwRGl2J1xyXG4gICAgICAgIC8vIENyZWF0ZXMgYSBpbnN0cnVjdGlvbiBkaXZcclxuICAgICAgICBsZXQgaW5mbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgICAgaW5mby5pZCA9ICdpbmZvLWRpdicgXHJcbiAgICAgICAgLy8gIGNyZWF0ZXMgc2hpcHMgZGl2c1xyXG4gICAgICAgIGxldCBjYXJyaWVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgICAgICBsZXQgYmF0dGxlc2hpcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgICAgbGV0IHN1Ym1hcmluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgICAgbGV0IGNydXNpZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgICAgIGxldCBkZXN0cm95ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgICAgIC8vIHB1dHMgYXMgbWFueSBkaXZzIGFzIHRoZSBzaGlwJ3MgbGVuZ3RoIGluc2lkZSB0aGVtXHJcbiAgICAgICAgbGV0IHNoaXBzID0gW2NhcnJpZXIsIGJhdHRsZXNoaXAsIHN1Ym1hcmluZSwgY3J1c2llciwgZGVzdHJveWVyXVxyXG4gICAgICAgIGxldCBpZCA9IFsnY2FycmllcicsICdiYXR0bGVzaGlwJywgJ3N1Ym1hcmluZScsICdjcnVzaWVyJywgJ2Rlc3Ryb3llciddXHJcbiAgICAgICAgZ2FtZS5hcHBlbmRDaGlsZChzaGlwRGl2KVxyXG4gICAgICAgIGZvcihsZXQgaSBpbiBzaGlwcykge1xyXG4gICAgICAgICAgICBmb3IoIGxldCBqPTA7IGo8IHBsYXllci5nYi5hbGxTaGlwc1tpXS5sZW5ndGg7IGorKyl7XHJcbiAgICAgICAgICAgICAgICBzaGlwc1tpXS5pbm5lckhUTUwgKz0gYDxkaXYgZGF0YS1pZD0nJHtpfScgZGF0YS1wb3NpdGlvbj0nJHtqfScgc3R5bGU9XCJiYWNrZ3JvdW5kOnVybCguLi9kaXN0L2ltZ3MvJHtpZFtpXX0vJHtpZFtpXX0ke2p9LnBuZylcIiBjbGFzcz0nJHtpZFtpXX0gc2hpcEltZyc+YFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNoaXBzW2ldLnNldEF0dHJpYnV0ZSgnZHJhZ2dhYmxlJywgdHJ1ZSkgXHJcbiAgICAgICAgICAgIHNoaXBzW2ldLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBgJHtpZFtpXX0gc2hpcENvbnRhaW5lcmAgKVxyXG4gICAgICAgICAgICBzaGlwc1tpXS5zZXRBdHRyaWJ1dGUoJ2RhdGEtc2hpcCcsIGAke2l9YClcclxuICAgICAgICAgICAgc2hpcERpdi5hcHBlbmRDaGlsZChzaGlwc1tpXSkgICAgICAgICAgIFxyXG4gICAgICAgICAgICBkcmFnKHNoaXBzW2ldKSAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc3QgdXBkYXRlR3JpZCA9IGZ1bmN0aW9uKHAsIHgsIHkpIHtcclxuICAgICAgICBsZXQgc3F1YXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7cC5uYW1lfVtkYXRhLXg9JyR7eH0nXVtkYXRhLXk9JyR7eX0nXWApXHJcbiAgICAgICAgaWYocC5nYi5ib2FyZFt4XVt5XSA9PT0gJ2hpdCcpe1xyXG4gICAgICAgICAgICBpZihzcXVhcmUuY2hpbGRyZW5bMF0pIHNxdWFyZS5yZW1vdmVDaGlsZChzcXVhcmUuY2hpbGRyZW5bMF0pXHJcbiAgICAgICAgICAgIHNxdWFyZS5zdHlsZS5iYWNrZ3JvdW5kID0gJ3VybCguLi9kaXN0L2ltZ3MvYm9vbS5wbmcpJ1xyXG4gICAgICAgIH0gZWxzZSBpZihwLmdiLmJvYXJkW3hdW3ldID09PSAnbWlzcycpe1xyXG4gICAgICAgICAgICBzcXVhcmUuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gJ3VybCguLi9kaXN0L2ltZ3MvdGltZXMucG5nKSdcclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxuICAgIGNvbnN0IHN0YXJ0ID0gZnVuY3Rpb24oKXtcclxuICAgICAgICByZW5kZXIuZ3JpZCgnY3B1JylcclxuICAgICAgICBhdHRhY2soKVxyXG4gICAgfVxyXG4gICAgY29uc3QgYXR0YWNrID0gZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgc3F1YXJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5jcHUuc3F1YXJlYClcclxuICAgICAgICBsZXQgaW5mbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNnYW1lLWluZm8nKVxyXG4gICAgICAgIGZvciAobGV0IHMgb2Ygc3F1YXJlcykgcy5vbmNsaWNrID0gKGUpID0+IHtcclxuICAgICAgICAgICAgbGV0IGNlbGwgPSBlLnRhcmdldFxyXG4gICAgICAgICAgICBsZXQgeCA9IE51bWJlcihjZWxsLmRhdGFzZXQueClcclxuICAgICAgICAgICAgbGV0IHkgPSBOdW1iZXIoY2VsbC5kYXRhc2V0LnkpXHJcbiAgICAgICAgICAgIGdhbWUucGxheVR1cm4oY3B1LCB4LCB5LCBmYWxzZSlcclxuICAgICAgICAgICAgdXBkYXRlR2FtZSgpXHJcbiAgICAgICAgICAgIGZvcihsZXQgYyBvZiBzcXVhcmVzKSBjLm9uY2xpY2sgPSBudWxsXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZ2FtZS5wbGF5VHVybihwbGF5ZXIsIDAsIDAsIHRydWUpICBcclxuICAgICAgICAgICAgICAgIGF0dGFjaygpICAgICAgXHJcbiAgICAgICAgICAgICAgICBzLm9uY2xpY2sgPSBudWxsICAgICAgICBcclxuICAgICAgICAgICAgfSwxMDApICAgICAgICAgICBcclxuICAgICAgICAgICAgdXBkYXRlR2FtZSgpXHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcbiAgICBjb25zdCB1cGRhdGVHYW1lID0gZnVuY3Rpb24oKXsgICAgICAgIFxyXG4gICAgICAgIGxldCBwSW5mbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwbGF5ZXItaW5mbycpXHJcbiAgICAgICAgbGV0IGNJbmZvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NwdS1pbmZvJylcclxuICAgICAgICBwSW5mby5pbm5lckhUTUwgPSBgUGxheWVyIHJlbWFpbmluZyBzaGlwczogJHtwbGF5ZXIuZ2IucmVtYWluaW5nU2hpcHMubGVuZ3RofWBcclxuICAgICAgICBjSW5mby5pbm5lckhUTUwgPSBgQ1BVIHJlbWFpbmluZyBzaGlwczogJHtjcHUuZ2IucmVtYWluaW5nU2hpcHMubGVuZ3RofWBcclxuICAgICAgICB2ZXJpZnlWaWN0b3J5KClcclxuICAgIH1cclxuICAgIGNvbnN0IHZlcmlmeVZpY3RvcnkgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCBpbmZvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2dhbWUtaW5mbycpXHJcbiAgICAgICAgaWYoZ2FtZS5pc1dpbm5lcigpID09PSAnY3B1Jykge1xyXG4gICAgICAgICAgICBpbmZvLmlubmVySFRNTCA9IGBDUFUgd29uYFxyXG4gICAgICAgICAgICBzdG9wR2FtZSgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoZ2FtZS5pc1dpbm5lcigpID09PSAncGxheWVyJykge1xyXG4gICAgICAgICAgICBpbmZvLmlubmVySFRNTCA9IGBQbGF5ZXIgV29uYFxyXG4gICAgICAgICAgICBzdG9wR2FtZSgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGdhbWUuaXNXaW5uZXIoKSlcclxuICAgIH1cclxuICAgIGNvbnN0IHN0b3BHYW1lID0gZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgcmVzdGFydEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZXN0YXJ0LWdhbWUnKVxyXG4gICAgICAgIHJlc3RhcnRCdG4uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcclxuICAgICAgICByZXN0YXJ0QnRuLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJlc3RhcnRcclxuICAgICAgICAgICAgcmVzdGFydEJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxyXG4gICAgICAgIH0gXHJcbiAgICAgICAgbGV0IGluZm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZ2FtZS1pbmZvJylcclxuICAgICAgICBpbmZvLmlubmVySFRNTCArPSBgUGxheSBhZ2Fpbj9gXHJcbiAgICAgICAgXHJcbiAgICB9ICAgXHJcbiAgICBjb25zdCByZXN0YXJ0ID0gZnVuY3Rpb24oKXsgXHJcbiAgICAgICAgbGV0IHNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3F1YXJlJylcclxuICAgICAgICBmb3IgKCBsZXQgcyBvZiBzcXVhcmVzKXtcclxuICAgICAgICAgICAgcy5iYWNrZ3JvdW5kID0gJydcclxuICAgICAgICAgICAgaWYocy5jaGlsZHJlblswXSkgcy5yZW1vdmVDaGlsZChzLmNoaWxkcmVuWzBdKVxyXG4gICAgICAgIH1cclxuICAgICAgICAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2dhbWUnKSkucmVtb3ZlQ2hpbGQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NwdScpKVxyXG4gICAgICAgIGdhbWUucmVzdGFydEFsbCgpXHJcbiAgICAgICAgc3RhcnQoKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBncmlkLFxyXG4gICAgICAgIHNob3dTaGlwcyxcclxuICAgICAgICB1cGRhdGVHcmlkLFxyXG4gICAgICAgIHN0YXJ0LFxyXG4gICAgICAgIGF0dGFja1xyXG4gICAgfVxyXG59KSgpXHJcblxyXG4iLCJpbXBvcnQge2dhbWUsIHBsYXllcn0gZnJvbSAnLi9pbmRleCdcclxuZXhwb3J0IGNvbnN0IGRyYWcgPSBmdW5jdGlvbihzaGlwLCBwMSl7XHJcbiAgICBsZXQgc2hpcElkICAgICAgLy8gZnJvbSAwIHRvIDQsIGNvcnJlc3BvbmQgdG8gc2hpcCBuYW1lc1xyXG4gICAgbGV0IHNoaXBQb3NpdGlvbiAgICAvLyB0aGUgcG9zaXRpb24gd2hlcmUgdGhlIHBsYXllciBwb2ludHMgdGhlIG1vdXNlXHJcbiAgICBsZXQgZGlyZWN0aW9uID0gcGxheWVyLmdiLmRpcmVjdGlvbiAgICAgLy8gc2hpcCBvcmllbnRhdGlvbiwgY2FuIGJlIGhvcml6b250YWwgb3IgdmVydGljYWxcclxuICAgIFxyXG4gICAgY29uc3QgdmVyaWZ5UG9zaXRpb24gPSAoZGlyKSA9PiB7ICAvLyB2ZXJpZnkgd2hldGhlciB0aGUgcG9zaXRpb24gaXMgb3IgaXNuJ3QgaG9yaXpvbnRhbFxyXG4gICAgICAgIGlmKGRpciA9PT0gJ2hvcml6b250YWwnKSByZXR1cm4gdHJ1ZVxyXG4gICAgICAgIGVsc2UgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnN0IHNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc3F1YXJlJykgIC8vc3F1YXJlcyBvbiB0aGUgZ2FtZWJvYXJkJ3MgZ3JpZFxyXG4gICAgXHJcbiAgICBjb25zdCBtb3VzZURvd24gPSBmdW5jdGlvbihlKSB7IC8vY2FwdHVyZXMgdGhlIHNoaXBzIGlkIGFuZCBwb3NpdGlvblxyXG4gICAgICAgIHNoaXBJZCA9IGUudGFyZ2V0LmRhdGFzZXQuaWRcclxuICAgICAgICBzaGlwUG9zaXRpb24gPSBlLnRhcmdldC5kYXRhc2V0LnBvc2l0aW9uXHJcbiAgICAgICAgZm9yKGxldCBzIG9mIHNxdWFyZXMpIHtcclxuICAgICAgICAgICAgcy5vbmRyb3AgPSBkcm9wXHJcbiAgICAgICAgICAgIHMub25kcmFnc3RhcnQgPSBkcmFnU3RhcnQgLy8gcHJldmVudHMgc2hpcCBmcm9tIGdldHRpbmcgZHJhZ2dlZCBmcm9tIGdyaWRcclxuICAgICAgICB9ICBcclxuICAgICAgICAvLyBpcyBvbiBtb3VzZWRvd24gYmVjYXVzZSB3aGVuIHRoZSBvbmRyb3AgZXZlbnQgaXMgb24gZHJhZ0xpc3RlbmVycygpIGl0IHJlcGVhdHMgYW5kIGNoYW5nZXMgdGhlIHNoaXBzIHZhcmlhYmxlICBcclxuICAgIH1cclxuICAgIGNvbnN0IGRyYWdPdmVyID0gZnVuY3Rpb24oZSl7IC8vYWRkcyBhIGJhY2tncm91bmQgY29sb3IgYXMgZWZmZWN0XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgdGhpcy5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2Y2MycgICBcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIGNvbnN0IGRyYWdMZWF2ZSA9IGZ1bmN0aW9uKGUpe2UudGFyZ2V0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcnfSAvLyBzZXQgY29sb3IgYmFjayB0byBkZWZhdWx0XHJcbiAgICBjb25zdCBkcmFnRW50ZXIgPSAoZSkgPT4gZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICBjb25zdCBkcmFnU3RhcnQgPSAoZSkgPT4gZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICBjb25zdCBkcmFnRW5kID0gKGUpID0+IHt9O1xyXG4gICAgY29uc3Qgcm90YXRlU2hpcCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgc2hpcC5jbGFzc0xpc3QudG9nZ2xlKCd2ZXJ0aWNhbCcpXHJcbiAgICAgICAgY29uc29sZS5sb2coc2hpcC5jaGlsZHJlbilcclxuICAgICAgICBmb3IgKGxldCBhIG9mIHNoaXAuY2hpbGRyZW4pIGEuY2xhc3NMaXN0LnRvZ2dsZSgndmVyJylcclxuICAgICAgICBkaXJlY3Rpb24gPSAoc2hpcC5jbGFzc0xpc3RbMl0gPyAndmVydGljYWwnIDogJ2hvcml6b250YWwnKVxyXG4gICAgfVxyXG4gICAgY29uc3QgZHJvcCA9IGZ1bmN0aW9uKGUpeyAvLyBkcm9wIHRoZSBzaGlwJ3MgYmxvY2tzIG9uIHRoZSBncmlkXHJcbiAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKVxyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgIGUudGFyZ2V0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcnXHJcbiAgICAgICAgbGV0IHggPSBlLnRhcmdldC5kYXRhc2V0LnggPyBOdW1iZXIoZS50YXJnZXQuZGF0YXNldC54KSA6IG51bGxcclxuICAgICAgICBsZXQgeSA9IGUudGFyZ2V0LmRhdGFzZXQueCA/IE51bWJlcihlLnRhcmdldC5kYXRhc2V0LnkpIDogbnVsbFxyXG4gICAgICAgIHkgPSAodmVyaWZ5UG9zaXRpb24oZGlyZWN0aW9uKSA/IHkgLSBzaGlwUG9zaXRpb24gOiB5KVxyXG4gICAgICAgIHggPSAodmVyaWZ5UG9zaXRpb24oZGlyZWN0aW9uKSA/IHggOiB4IC0gc2hpcFBvc2l0aW9uKVxyXG4gICAgICAgIGlmKHBsYXllci5nYi52ZXJpZnlTaGlwUGxhY2VtZW50KGRpcmVjdGlvbiwgcGxheWVyLmdiLmFsbFNoaXBzW3NoaXBJZF0sIHgsIHkpKSB7XHJcbiAgICAgICAgICAgIGdhbWUucGxhY2VTaGlwcyhwbGF5ZXIsIGRpcmVjdGlvbiwgeCwgeSwgZmFsc2UsIHNoaXBJZClcclxuICAgICAgICAgICAgc2hpcC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBtb3VzZURvd24pXHJcbiAgICAgICAgICAgIGRyb3BTaGlwKHgseSlcclxuICAgICAgICAgICAgc2hpcC5zdHlsZS5jdXJzb3IgPSAnZGVmYXVsdCdcclxuICAgICAgICB9IGVsc2Ugd2luZG93LmFsZXJ0KCdJbnZhbGlkIHBvc2l0aW9uJylcclxuICAgIH1cclxuICAgIGNvbnN0IGRyb3BTaGlwID0gKHgsIHkpID0+IHtcclxuICAgICAgICBpZihkaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJyl7XHJcbiAgICAgICAgICAgIGZvciggbGV0IGkgPSAwOyBpPCBwbGF5ZXIuZ2IuYWxsU2hpcHNbc2hpcElkXS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEteD0nJHt4fSddW2RhdGEteT0nJHt5K2l9J11gKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFNoaXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1pZD0nJHtzaGlwSWR9J11bZGF0YS1wb3NpdGlvbj0nJHtpfSddYClcclxuICAgICAgICAgICAgICAgIHMuYXBwZW5kQ2hpbGQoY3VycmVudFNoaXApXHJcbiAgICAgICAgICAgIH0gICAgICBcclxuICAgICAgICB9IGVsc2UgaWYoZGlyZWN0aW9uID09PSAndmVydGljYWwnKXtcclxuICAgICAgICAgICAgZm9yKCBsZXQgaSA9IDA7IGk8IHBsYXllci5nYi5hbGxTaGlwc1tzaGlwSWRdLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS14PScke3graX0nXVtkYXRhLXk9JyR7eX0nXWApXHJcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50U2hpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWlkPScke3NoaXBJZH0nXVtkYXRhLXBvc2l0aW9uPScke2l9J11gKVxyXG4gICAgICAgICAgICAgICAgcy5hcHBlbmRDaGlsZChjdXJyZW50U2hpcClcclxuICAgICAgICAgICAgfSAgICAgIFxyXG4gICAgICAgIH0gICAgICAgICBcclxuICAgIH1cclxuICAgIGNvbnN0IGRyYWdMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIG1vdXNlRG93bilcclxuICAgICAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCBkcmFnRW5kKVxyXG4gICAgICAgIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcignZGJsY2xpY2snLCByb3RhdGVTaGlwKVxyXG4gICAgICAgIFxyXG4gICAgICAgIGZvciAobGV0IHMgb2Ygc3F1YXJlcyl7XHJcbiAgICAgICAgICAgIHMuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJywgZHJhZ0VudGVyKVxyXG4gICAgICAgICAgICBzLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIGRyYWdMZWF2ZSlcclxuICAgICAgICAgICAgcy5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIGRyYWdPdmVyKVxyXG4gICAgICAgIH0gICAgIFxyXG4gICAgfVxyXG4gICAgZHJhZ0xpc3RlbmVycygpXHJcbn0iLCJpbXBvcnQgeyBzaGlwRmFjdG9yeSB9IGZyb20gXCIuL3NoaXBzXCJcclxuXHJcbmV4cG9ydCBjb25zdCBnYW1lYm9hcmQgPSAoKSA9PiB7XHJcbiAgICAvLyB4IGFuZCB5IGNvb3Jkc1xyXG4gICAgbGV0IGJvYXJkID0gQXJyYXkoMTApLmZpbGwodW5kZWZpbmVkKS5tYXAoKHgpID0+IEFycmF5KDEwKS5maWxsKHVuZGVmaW5lZCkpXHJcbiAgICBsZXQgZGlyZWN0aW9uID0gJ2hvcml6b250YWwnXHJcbiAgICBsZXQgcGxhY2VkU2hpcHMgPSBbXVxyXG4gICAgbGV0IGFsbFNoaXBzID0gW11cclxuICAgIGxldCByZW1haW5pbmdTaGlwcyA9IFtdXHJcbiAgICBsZXQgc3Vua1NoaXBzID0gW11cclxuICAgIGxldCBtaXNzZWRBdHRhY2tzID0gW11cclxuICAgIGxldCBhbGxBdHRhY2tzID0gW11cclxuICAgXHJcbiAgICBjb25zdCBjcmVhdGVTaGlwcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGFsbFNoaXBzID0gW11cclxuICAgICAgICBjb25zdCBjYXJyaWVyID0gc2hpcEZhY3RvcnkoJ0NhcnJpZXInLCA1KVxyXG4gICAgICAgIGNvbnN0IGJhdHRsZXNoaXAgPSBzaGlwRmFjdG9yeSgnQmF0dGxlc2hpcCcsIDQpXHJcbiAgICAgICAgY29uc3QgY3J1c2llciA9IHNoaXBGYWN0b3J5KCdDcnVzaWVyJywgMylcclxuICAgICAgICBjb25zdCBzdWJtYXJpbmUgPSBzaGlwRmFjdG9yeSgnU3VibWFyaW5lJywgMylcclxuICAgICAgICBjb25zdCBkZXN0cm95ZXIgPSBzaGlwRmFjdG9yeSgnRGVzdHJveWVyJywgMilcclxuICAgICAgICBhbGxTaGlwcy5wdXNoKGNhcnJpZXIsIGJhdHRsZXNoaXAsIGNydXNpZXIsIHN1Ym1hcmluZSwgZGVzdHJveWVyKVxyXG4gICAgICAgIHJlbWFpbmluZ1NoaXBzLnB1c2goY2FycmllciwgYmF0dGxlc2hpcCwgY3J1c2llciwgc3VibWFyaW5lLCBkZXN0cm95ZXIpXHJcbiAgICAgICAgcmV0dXJuIGFsbFNoaXBzXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcGxhY2VTaGlwID0gZnVuY3Rpb24oIGRpcmVjLCBzaGlwLCB4LCB5KSB7XHJcbiAgICAgICAgLy9Pbmx5IHBsYWNlIGlmIHRoZSBzcGFjZSBpcyBmcmVlXHJcbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlIHNoaXAgZml0cyBpbnRvIHRoZSBzcG90XHJcbiAgICAgICAgaWYoZGlyZWMgPT09ICdob3Jpem9udGFsJyAmJiB2ZXJpZnlTaGlwUGxhY2VtZW50KGRpcmVjLCBzaGlwLCB4LCB5KSl7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPHNoaXAubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ib2FyZFt4XVt5ICsgaV0gPSB7c2hpcCwgcG9zaXRpb246IGl9XHJcbiAgICAgICAgICAgICAgICBpZihwbGFjZWRTaGlwcy5pbmRleE9mKHNoaXApID09PSAtMSkgcGxhY2VkU2hpcHMucHVzaChzaGlwKVxyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH0gZWxzZSBpZihkaXJlYyA9PT0gJ3ZlcnRpY2FsJyAmJiB2ZXJpZnlTaGlwUGxhY2VtZW50KGRpcmVjLCBzaGlwLCB4LCB5KSl7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPHNoaXAubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ib2FyZFt4ICsgaV1beV0gPSB7c2hpcCwgcG9zaXRpb246IGl9XHJcbiAgICAgICAgICAgICAgICBpZihwbGFjZWRTaGlwcy5pbmRleE9mKHNoaXApID09PSAtMSkgcGxhY2VkU2hpcHMucHVzaChzaGlwKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBcclxuICAgIH1cclxuICAgIGNvbnN0IHZlcmlmeVNoaXBQbGFjZW1lbnQgPSBmdW5jdGlvbihkaXJlYywgc2hpcCwgeCwgeSkge1xyXG4gICAgICAgIGlmKGJvYXJkW3hdW3ldID09PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgc2hpcCBmaXRzIGludG8gdGhlIHNwb3RcclxuICAgICAgICAgICAgaWYoZGlyZWMgPT09ICdob3Jpem9udGFsJyAmJiAoeSArIChzaGlwLmxlbmd0aC0xKSA8IGJvYXJkW3hdLmxlbmd0aCkpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICAgICAgfSBlbHNlIGlmKGRpcmVjID09PSAndmVydGljYWwnICYmICh4ICsgKHNoaXAubGVuZ3RoLTEpIDwgYm9hcmQubGVuZ3RoKSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgICAgICB9IGVsc2UgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfSBlbHNlIHJldHVybiBmYWxzZSAgICAgICAgXHJcbiAgICB9XHJcbiAgICAvL3ZlcmlmeSBpZiB0aGUgcGxhY2Ugd2FzIGFscmVhZHkgYXR0YWNrZWRcclxuICAgIGNvbnN0IHZlcmlmeUF0dGFjayA9IGZ1bmN0aW9uKHgsIHkpIHtcclxuICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGFsbEF0dGFja3MpIHtcclxuICAgICAgICAgICAgaWYoaXRlbVswXSA9PT0geCAmJiBpdGVtWzFdID09PSB5KSByZXR1cm4gZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZSAgICBcclxuICAgIH1cclxuICAgIC8vYXR0YWNrIHRoZSBlbmVteSdzIGdhbWVib2FyZFxyXG4gICAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IGZ1bmN0aW9uKHgsIHkpeyAgXHJcbiAgICAgICAgaWYodmVyaWZ5QXR0YWNrKHgsIHkpKXtcclxuICAgICAgICAgICAgaWYoIHR5cGVvZiBib2FyZFt4XVt5XSA9PT0gJ29iamVjdCcpe1xyXG4gICAgICAgICAgICAgICAgYm9hcmRbeF1beV0uc2hpcC5oaXQoYm9hcmRbeF1beV0ucG9zaXRpb24pXHJcbiAgICAgICAgICAgICAgICBib2FyZFt4XVt5XSA9ICdoaXQnXHJcbiAgICAgICAgICAgICAgICBhbGxBdHRhY2tzLnB1c2goW3gseV0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihib2FyZFt4XVt5XSA9PT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGJvYXJkW3hdW3ldID0gJ21pc3MnXHJcbiAgICAgICAgICAgICAgICBhbGxBdHRhY2tzLnB1c2goW3gseV0pXHJcbiAgICAgICAgICAgICAgICBtaXNzZWRBdHRhY2tzLnB1c2goW3gseV0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmVyaWZ5U2hpcHMoKVxyXG4gICAgICAgIH0gICAgXHJcbiAgICB9XHJcbiAgICAvL3ZlcmlmeSBpZiB0aGUgc2hpcCBpcyBzdW5rXHJcbiAgICBjb25zdCB2ZXJpZnlTaGlwcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGZvcihsZXQgc2hpcCBvZiBwbGFjZWRTaGlwcykge1xyXG4gICAgICAgICAgICBpZihzaGlwLmlzU3VuaygpICYmIHN1bmtTaGlwcy5pbmRleE9mKHNoaXApID09PSAtMSkge2NvbnNvbGUubG9nKHNoaXAuaXNTdW5rKCkpIDtzdW5rU2hpcHMucHVzaChzaGlwKX1cclxuICAgICAgICB9XHJcbiAgICAgICAgZ2V0UmVtYWluaW5nU2hpcHMoKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKHN1bmtTaGlwcylcclxuICAgICAgICBpZiAoc3Vua1NoaXBzLmxlbmd0aCA9PT0gNSkgcmV0dXJuICdsb3NlJ1xyXG4gICAgICAgIGVsc2UgcmV0dXJuICdwbGF5aW5nJ1xyXG4gICAgfVxyXG4gICAgY29uc3QgZ2V0UmVtYWluaW5nU2hpcHMgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIGZvciAobGV0IHMgb2YgcmVtYWluaW5nU2hpcHMpe1xyXG4gICAgICAgICAgICBmb3IgKGxldCBzdW5rIG9mIHN1bmtTaGlwcykge1xyXG4gICAgICAgICAgICAgICAgaWYoc3VuayA9PT0gcykgeyByZW1haW5pbmdTaGlwcy5zcGxpY2UocmVtYWluaW5nU2hpcHMuaW5kZXhPZihzKSwxKX0gICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyByZXNldCBnYW1lXHJcbiAgICBjb25zdCByZXNldEFsbCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgYWxsU2hpcHMgPSBbXVxyXG4gICAgICAgIHBsYWNlZFNoaXBzID0gW11cclxuICAgICAgICByZW1haW5pbmdTaGlwcyA9IFtdXHJcbiAgICAgICAgc3Vua1NoaXBzID0gW11cclxuICAgICAgICBsZXQgYm9hcmQgPSBBcnJheSgxMCkuZmlsbCh1bmRlZmluZWQpLm1hcCgoeCkgPT4gQXJyYXkoMTApLmZpbGwodW5kZWZpbmVkKSlcclxuICAgICAgICByZXR1cm4gYWxsU2hpcHMsIHBsYWNlZFNoaXBzLCBib2FyZFxyXG4gICAgfVxyXG4gICAgY3JlYXRlU2hpcHMoKVxyXG4gICAgcmV0dXJue1xyXG4gICAgICAgIGJvYXJkLFxyXG4gICAgICAgIGRpcmVjdGlvbixcclxuICAgICAgICBwbGFjZWRTaGlwcyxcclxuICAgICAgICBhbGxTaGlwcyxcclxuICAgICAgICBzdW5rU2hpcHMsXHJcbiAgICAgICAgcmVtYWluaW5nU2hpcHMsXHJcbiAgICAgICAgbWlzc2VkQXR0YWNrcyxcclxuICAgICAgICBjcmVhdGVTaGlwcyxcclxuICAgICAgICBwbGFjZVNoaXAsXHJcbiAgICAgICAgdmVyaWZ5U2hpcFBsYWNlbWVudCxcclxuICAgICAgICB2ZXJpZnlBdHRhY2ssXHJcbiAgICAgICAgcmVjZWl2ZUF0dGFjayxcclxuICAgICAgICB2ZXJpZnlTaGlwcyxcclxuICAgICAgICByZXNldEFsbFxyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBjcmVhdGVQbGF5ZXIgfSBmcm9tICcuL3BsYXllcidcclxuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSAnLi9VSSdcclxuXHJcbmV4cG9ydCBjb25zdCBwbGF5ZXIgPSBjcmVhdGVQbGF5ZXIoJ3BsYXllcicpXHJcbmV4cG9ydCBjb25zdCBjcHUgPSBjcmVhdGVQbGF5ZXIoJ2NwdScpXHJcblxyXG5leHBvcnQgY29uc3QgZ2FtZSA9ICgocDEsIHAyKSA9PiB7XHJcbiAgICAvLyBQbGFjZSBzaGlwcyBvbiB0aGUgYm9hcmRcclxuICAgIGNvbnN0IHBsYWNlU2hpcHMgPSAocGxheWVyLCBkaXIsIHgxLCB5MSwgYXV0bywgc2hpcEluZGV4KSA9PiB7XHJcbiAgICAgICAgaWYoYXV0byA9PT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIHBsYXllci5nYi5hbGxTaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKVxyXG4gICAgICAgICAgICAgICAgbGV0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMClcclxuICAgICAgICAgICAgICAgIGxldCBkID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMilcclxuICAgICAgICAgICAgICAgIGlmKGQgPT09IDEpIGQgPSAnaG9yaXpvbnRhbCdcclxuICAgICAgICAgICAgICAgIGVsc2UgZCA9ICd2ZXJ0aWNhbCdcclxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXIuZ2IudmVyaWZ5U2hpcFBsYWNlbWVudChkLCBzaGlwLCB4LCB5KSA9PT0gZmFsc2UgKXtcclxuICAgICAgICAgICAgICAgICAgICB3aGlsZShwbGF5ZXIuZ2IudmVyaWZ5U2hpcFBsYWNlbWVudChkLCBzaGlwLCB4LCB5KSA9PT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgICBcclxuICAgICAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAgICAgICAgIHBsYXllci5nYi5wbGFjZVNoaXAoZCxzaGlwLCB4LCB5KVxyXG4gICAgICAgICAgICB9IGVsc2UgcGxheWVyLmdiLnBsYWNlU2hpcChkLHNoaXAsIHgsIHkpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHNoaXAgPSBwbGF5ZXIuZ2IuYWxsU2hpcHNbc2hpcEluZGV4XVxyXG4gICAgICAgICAgICBpZiAocGxheWVyLmdiLnZlcmlmeVNoaXBQbGFjZW1lbnQoZGlyLCBzaGlwLCB4MSwgeTEpID09PSBmYWxzZSApe1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmFsZXJ0KCdJbnZhbGlkIHBvc2l0aW9uJylcclxuICAgICAgICAgICAgfSBlbHNlIHAxLmdiLnBsYWNlU2hpcChkaXIsc2hpcCwgeDEsIHkxKSAgICAgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYocDEuZ2IucGxhY2VkU2hpcHMubGVuZ3RoID09PSA1KXJlbmRlci5zdGFydCgpICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgY29uc29sZS50YWJsZShwbGF5ZXIuZ2IuYm9hcmQpXHJcbiAgICB9IFxyXG4gICAgLy9QbGF5IGdhbWUgdHVybnMsIHBsYXllciB4IGNwdVxyXG4gICAgY29uc3QgcGxheVR1cm4gPSBmdW5jdGlvbihwLCB4MSwgeTEsIGF1dG8pIHtcclxuICAgICAgICBpZihhdXRvID09PSB0cnVlKXtcclxuICAgICAgICAgICAgbGV0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMClcclxuICAgICAgICAgICAgbGV0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMClcclxuICAgICAgICAgICAgaWYoIXAuZ2IudmVyaWZ5QXR0YWNrKHgseSkpe1xyXG4gICAgICAgICAgICAgICAgd2hpbGUoIXAuZ2IudmVyaWZ5QXR0YWNrKHgseSkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMClcclxuICAgICAgICAgICAgICAgICAgICB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwLmdiLnJlY2VpdmVBdHRhY2soeCwgeSlcclxuICAgICAgICAgICAgICAgIHJlbmRlci51cGRhdGVHcmlkKHAsIHgsIHkpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7cC5nYi5yZWNlaXZlQXR0YWNrKHgsIHkpO3JlbmRlci51cGRhdGVHcmlkKHAsIHgsIHkpfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHAuZ2IucmVjZWl2ZUF0dGFjayh4MSwgeTEgKVxyXG4gICAgICAgICAgICByZW5kZXIudXBkYXRlR3JpZChwLCB4MSwgeTEpXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHAyLmdiKVxyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG4gICAgY29uc3QgaXNXaW5uZXIgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKHAxLmdiLnZlcmlmeVNoaXBzKCkgPT09ICdsb3NlJykgcmV0dXJuIGAke3AyLm5hbWV9YFxyXG4gICAgICAgIGVsc2UgaWYocDIuZ2IudmVyaWZ5U2hpcHMoKSA9PT0gJ2xvc2UnKSByZXR1cm4gYCR7cDEubmFtZX1gXHJcbiAgICB9XHJcbiAgICBjb25zdCBwbGF5ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgIHJlbmRlci5hdHRhY2soKVxyXG4gICAgfVxyXG4gICAgY29uc3QgcmVzdGFydEFsbCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcDEuZ2IucmVzZXRBbGwoKVxyXG4gICAgICAgIHAyLmdiLnJlc2V0QWxsKClcclxuICAgICAgICByZW5kZXIuZ3JpZCgncGxheWVyJylcclxuICAgICAgICByZW5kZXIuc2hvd1NoaXBzKClcclxuICAgICAgICBnYW1lLnBsYXkoKVxyXG4gICAgfVxyXG4gICAgcGxhY2VTaGlwcyhwMiwgJ2hvcml6b250YWwnLCAwLCAwLCB0cnVlLCAwKVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBwbGFjZVNoaXBzLCBcclxuICAgICAgICBwbGF5VHVybixcclxuICAgICAgICBpc1dpbm5lcixcclxuICAgICAgICBwbGF5LFxyXG4gICAgICAgIHJlc3RhcnRBbGxcclxuICAgIH1cclxufSkocGxheWVyLCBjcHUpXHJcblxyXG5yZW5kZXIuZ3JpZCgncGxheWVyJylcclxucmVuZGVyLnNob3dTaGlwcygpXHJcbmdhbWUucGxheSgpXHJcbiIsImltcG9ydCB7IGdhbWVib2FyZCB9IGZyb20gXCIuL2dhbWVib2FyZFwiXHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlUGxheWVyID0gKG5hbWUpID0+IHtcclxuICAgIGNvbnN0IGdiID0gZ2FtZWJvYXJkKClcclxuXHJcbiAgICByZXR1cm4ge25hbWUsIGdifVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgY29tcHV0ZXJQbGF5ID0gKCkgPT4ge1xyXG4gICAgbGV0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMClcclxuICAgIGxldCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApXHJcbiAgICByZXR1cm4gW3gseV1cclxufSIsImV4cG9ydCBjb25zdCBzaGlwRmFjdG9yeSA9IChuYW1lLCBsZW4pID0+IHtcclxuICAgIGNvbnN0IGlkID0gbmFtZVxyXG4gICAgY29uc3QgbGVuZ3RoID0gbGVuXHJcbiAgICBsZXQgaGl0UG9zaXRpb24gPSBbXVxyXG4gICAgbGV0IHN1bmsgPSBmYWxzZVxyXG4gICAgY29uc3QgaGl0ID0gZnVuY3Rpb24ocG9zKSB7XHJcbiAgICAgICAgaGl0UG9zaXRpb24ucHVzaChwb3MpXHJcbiAgICAgICAgaXNTdW5rKClcclxuICAgICAgICByZXR1cm4gaGl0UG9zaXRpb25cclxuICAgIH1cclxuICAgIGNvbnN0IGlzU3VuayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmKGhpdFBvc2l0aW9uLmxlbmd0aCA9PT0gbGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHN1bmsgPSB0cnVlXHJcbiAgICAgICAgfSBlbHNlIHN1bmsgPSBmYWxzZVxyXG4gICAgICAgIHJldHVybiBzdW5rXHJcbiAgICB9XHJcbiAgICByZXR1cm4ge2lkLCBsZW5ndGgsIGhpdFBvc2l0aW9uLCBzdW5rLCBoaXQsIGlzU3Vua31cclxufVxyXG5cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==