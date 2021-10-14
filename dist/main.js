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
    let game = document.querySelector('#game')
    const grid = (name) => {        
        let grid = document.createElement('div')
        grid.setAttribute('id', `${name}-gameboard`)
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
    game.appendChild(grid)
    }
    const showShips = () => {
        let shipDiv = document.createElement('div')
        shipDiv.id = 'shipDiv'
        let carrier = document.createElement('div')
        let battleship = document.createElement('div')
        let submarine = document.createElement('div')
        let crusier = document.createElement('div')
        let destroyer = document.createElement('div')
        // carrier.style.background = 'url(./imgs/carrier.png) 50%'
        // battleship.style.background = 'url(./imgs/battleship.png)'
        // submarine.style.background = 'url(./imgs/submarine.png)'
        // crusier.style.background = 'url(./imgs/crusier.png)'
        // destroyer.style.background = 'url(./imgs/destroyer.png)'
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
        return ships
    }


    return {
        grid,
        showShips
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
    let shipId
    let shipPosition
    let square
    let direction = _index__WEBPACK_IMPORTED_MODULE_0__.player.gb.direction
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
        if(_index__WEBPACK_IMPORTED_MODULE_0__.player.gb.verifyShipPlacement('horizontal', _index__WEBPACK_IMPORTED_MODULE_0__.player.gb.allShips[shipId], x, y)) {
            _index__WEBPACK_IMPORTED_MODULE_0__.game.placeShips(_index__WEBPACK_IMPORTED_MODULE_0__.player, 'horizontal', x, y, false, shipId)
            ship.removeEventListener('mousedown', mouseDown)
            dropShip(x,y)
            ship.onmousedown = null
            console.log(_index__WEBPACK_IMPORTED_MODULE_0__.player.gb.allShips[shipId])
        } else console.log(_index__WEBPACK_IMPORTED_MODULE_0__.player.gb.allShips[shipPosition])
    }
    const dropShip = (x, y) => {
        for( let i = 0; i< _index__WEBPACK_IMPORTED_MODULE_0__.player.gb.allShips[shipId].length; i++){
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
    let sunkShips = []
    let missedAttacks = []
    let allAttacks = []
   
    const createShips = function() {
        const carrier = (0,_ships__WEBPACK_IMPORTED_MODULE_0__.shipFactory)('Carrier', 5)
        const battleship = (0,_ships__WEBPACK_IMPORTED_MODULE_0__.shipFactory)('Battleship', 4)
        const crusier = (0,_ships__WEBPACK_IMPORTED_MODULE_0__.shipFactory)('Crusier', 3)
        const submarine = (0,_ships__WEBPACK_IMPORTED_MODULE_0__.shipFactory)('Submarine', 3)
        const destroyer = (0,_ships__WEBPACK_IMPORTED_MODULE_0__.shipFactory)('Destroyer', 2)
        allShips.push(carrier, battleship, crusier, submarine, destroyer)
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
        } else {window.alert('gb.js:46' + board[x][y])
            return false
        }
    }
    //verify if the place was already attacked
    const verifyAttack = function(x, y) {
        allAttacks.forEach((item) => {
            if(item[0] === x && item[1] === y){
                false
            }
        })
        return true
    }
    //attack the enemy's gameboard
    const receiveAttack = function(x, y){  
        if(verifyAttack(x, y)){
            if( typeof board[x][y] === 'object'){
                board[x][y].ship.hit(board[x][y].position)
                board[x][y].ship.isSunk()
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
        allShips.forEach((ship) => {
            if(ship.isSunk()) sunkShips.push(ship)
        })
        if (sunkShips.length === 5) return 'lose'
        else return 'playing'
    }
    const resetAll = function(){
        allShips = []
        placedShips = []
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
/* harmony export */   "game": () => (/* binding */ game)
/* harmony export */ });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UI */ "./src/UI.js");
/* harmony import */ var _drag__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./drag */ "./src/drag.js");



const player = (0,_player__WEBPACK_IMPORTED_MODULE_0__.createPlayer)('luma')
const cpu = (0,_player__WEBPACK_IMPORTED_MODULE_0__.createPlayer)('pc')

const game = ((p1, p2) => {
    // Place ships on the board
    const placeShips = (player, dir, x1, y1, auto, shipIndex) => {
        if(auto === true){
            player.gb.allShips.forEach((ship) => {
                let x = Math.floor(Math.random() * 10)
                let y = Math.floor(Math.random() * 10)
            
                if (player.gb.verifyShipPlacement(dir, ship, x, y) === false ){
                    while(player.gb.verifyShipPlacement(dir, ship, x, y) === false){
                        x = Math.floor(Math.random() * 10)
                        y = Math.floor(Math.random() * 10)   
                    } 
                    player.gb.placeShip(dir ,ship, x, y)
            } else player.gb.placeShip(dir,ship, x, y)
            })
        } else {
            let ship = player.gb.allShips[shipIndex]
            if (player.gb.verifyShipPlacement(dir, ship, x1, y1) === false ){
                window.alert('Invalid position')
            } else {
                p1.gb.placeShip(dir,ship, x1, y1)
                console.table(p1.gb.board)
            }
        }
    } 
    //Play game turns, player x cpu
    const playTurn = function(player, auto) {
        if(auto === true){
            let x = Math.floor(Math.random() * 10)
            let y = Math.floor(Math.random() * 10)
            if(!player.gb.verifyAttack(x,y)){
                while(!player.gb.verifyAttack(x,y)){
                    x = Math.floor(Math.random() * 10)
                    y = Math.floor(Math.random() * 10)
                }
                player.gb.receiveAttack(x, y)
            } else player.gb.receiveAttack(x, y)
        console.table(player.gb.board)
           
        } else return 'to be implemented'
    }
    const play = function() {
        //placeShips(p2, 'horizontal', 0, 0, true, 0) 
    }
    const dragShip = function() {

    }
    return {
        placeShips, 
        playTurn,
        play
    }
})(player, cpu)



game.play(player, cpu)

_UI__WEBPACK_IMPORTED_MODULE_1__.render.grid('player')
// displayGameboard.grid('cpu')
_UI__WEBPACK_IMPORTED_MODULE_1__.render.showShips()


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
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");


const shipFactory = (name, len) => {
    const id = name
    const length = len
    let hitPosition = []
    let sunk = false
    const hit = function(pos) {
        this.hitPosition.push(pos)
        return hitPosition
    }
    const isSunk = function() {
        if(hitPosition.length === length) {
            this.sunk = true
        }
        return this.sunk
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDWndDO0FBQ3hDO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7Ozs7Ozs7VUNuQkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL1VJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZHJhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwbGF5ZXIgfSBmcm9tIFwiLi9pbmRleFwiXHJcbmltcG9ydCB7IGRyYWcgfSBmcm9tIFwiLi9kcmFnXCJcclxuZXhwb3J0IGNvbnN0IHJlbmRlciA9ICgoKSA9PiB7XHJcbiAgICBsZXQgZ2FtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNnYW1lJylcclxuICAgIGNvbnN0IGdyaWQgPSAobmFtZSkgPT4geyAgICAgICAgXHJcbiAgICAgICAgbGV0IGdyaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgICAgIGdyaWQuc2V0QXR0cmlidXRlKCdpZCcsIGAke25hbWV9LWdhbWVib2FyZGApXHJcbiAgICAgICAgZ3JpZC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2dhbWVib2FyZCcpXHJcbiAgICAgICAgbGV0IGkgPSAwXHJcbiAgICAgICAgd2hpbGUoaTwxMDApIHtcclxuICAgICAgICAgICAgaWYoaT49MCAmJiBpPDEwKXtcclxuICAgICAgICAgICAgICAgIGdyaWQuaW5uZXJIVE1MICs9IGA8ZGl2IGNsYXNzPVwiJHtuYW1lfSBzcXVhcmVcIiBkYXRhLXk9JyR7aX0nIGRhdGEteD0nJHswfSc+PC9kaXY+YFxyXG4gICAgICAgICAgICB9ZWxzZSBpZiAoaT49MTAgJiYgaTwyMCl7XHJcbiAgICAgICAgICAgICAgICBncmlkLmlubmVySFRNTCArPSBgPGRpdiBjbGFzcz1cIiR7bmFtZX0gc3F1YXJlXCIgZGF0YS15PScke2ktMTB9JyBkYXRhLXg9JyR7MX0nPjwvZGl2PmBcclxuICAgICAgICAgICAgfWVsc2UgaWYgKGk+PTIwICYmIGk8MzApe1xyXG4gICAgICAgICAgICAgICAgZ3JpZC5pbm5lckhUTUwgKz0gYDxkaXYgY2xhc3M9XCIke25hbWV9IHNxdWFyZVwiIGRhdGEteT0nJHtpLTIwfScgZGF0YS14PSckezJ9Jz48L2Rpdj5gXHJcbiAgICAgICAgICAgIH1lbHNlIGlmIChpPj0zMCAmJiBpPDQwKXtcclxuICAgICAgICAgICAgICAgIGdyaWQuaW5uZXJIVE1MICs9IGA8ZGl2IGNsYXNzPVwiJHtuYW1lfSBzcXVhcmVcIiBkYXRhLXk9JyR7aS0zMH0nIGRhdGEteD0nJHszfSc+PC9kaXY+YFxyXG4gICAgICAgICAgICB9ZWxzZSBpZiAoaT49NDAgJiYgaTw1MCl7XHJcbiAgICAgICAgICAgICAgICBncmlkLmlubmVySFRNTCArPSBgPGRpdiBjbGFzcz1cIiR7bmFtZX0gc3F1YXJlXCIgZGF0YS15PScke2ktNDB9JyBkYXRhLXg9JyR7NH0nPjwvZGl2PmBcclxuICAgICAgICAgICAgfWVsc2UgaWYgKGk+PTUwICYmIGk8NjApe1xyXG4gICAgICAgICAgICAgICAgZ3JpZC5pbm5lckhUTUwgKz0gYDxkaXYgY2xhc3M9XCIke25hbWV9IHNxdWFyZVwiIGRhdGEteT0nJHtpLTUwfScgZGF0YS14PSckezV9Jz48L2Rpdj5gXHJcbiAgICAgICAgICAgIH1lbHNlIGlmIChpPj02MCAmJiBpPDcwKXtcclxuICAgICAgICAgICAgICAgIGdyaWQuaW5uZXJIVE1MICs9IGA8ZGl2IGNsYXNzPVwiJHtuYW1lfSBzcXVhcmVcIiBkYXRhLXk9JyR7aS02MH0nIGRhdGEteD0nJHs2fSc+PC9kaXY+YFxyXG4gICAgICAgICAgICB9ZWxzZSBpZiAoaT49NzAgJiYgaTw4MCl7XHJcbiAgICAgICAgICAgICAgICBncmlkLmlubmVySFRNTCArPSBgPGRpdiBjbGFzcz1cIiR7bmFtZX0gc3F1YXJlXCIgZGF0YS15PScke2ktNzB9JyBkYXRhLXg9JyR7N30nPjwvZGl2PmBcclxuICAgICAgICAgICAgfWVsc2UgaWYgKGk+PTgwICYmIGk8OTApe1xyXG4gICAgICAgICAgICAgICAgZ3JpZC5pbm5lckhUTUwgKz0gYDxkaXYgY2xhc3M9XCIke25hbWV9IHNxdWFyZVwiIGRhdGEteT0nJHtpLTgwfScgZGF0YS14PSckezh9Jz48L2Rpdj5gXHJcbiAgICAgICAgICAgIH1lbHNlIGlmIChpPj05MCAmJiBpPDEwMCl7XHJcbiAgICAgICAgICAgICAgICBncmlkLmlubmVySFRNTCArPSBgPGRpdiBjbGFzcz1cIiR7bmFtZX0gc3F1YXJlXCIgZGF0YS15PScke2ktOTB9JyBkYXRhLXg9JyR7OX0nPjwvZGl2PmBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpKytcclxuICAgICAgICB9XHJcbiAgICBnYW1lLmFwcGVuZENoaWxkKGdyaWQpXHJcbiAgICB9XHJcbiAgICBjb25zdCBzaG93U2hpcHMgPSAoKSA9PiB7XHJcbiAgICAgICAgbGV0IHNoaXBEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgICAgIHNoaXBEaXYuaWQgPSAnc2hpcERpdidcclxuICAgICAgICBsZXQgY2FycmllciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgICAgbGV0IGJhdHRsZXNoaXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgICAgIGxldCBzdWJtYXJpbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgICAgIGxldCBjcnVzaWVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgICAgICBsZXQgZGVzdHJveWVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgICAgICAvLyBjYXJyaWVyLnN0eWxlLmJhY2tncm91bmQgPSAndXJsKC4vaW1ncy9jYXJyaWVyLnBuZykgNTAlJ1xyXG4gICAgICAgIC8vIGJhdHRsZXNoaXAuc3R5bGUuYmFja2dyb3VuZCA9ICd1cmwoLi9pbWdzL2JhdHRsZXNoaXAucG5nKSdcclxuICAgICAgICAvLyBzdWJtYXJpbmUuc3R5bGUuYmFja2dyb3VuZCA9ICd1cmwoLi9pbWdzL3N1Ym1hcmluZS5wbmcpJ1xyXG4gICAgICAgIC8vIGNydXNpZXIuc3R5bGUuYmFja2dyb3VuZCA9ICd1cmwoLi9pbWdzL2NydXNpZXIucG5nKSdcclxuICAgICAgICAvLyBkZXN0cm95ZXIuc3R5bGUuYmFja2dyb3VuZCA9ICd1cmwoLi9pbWdzL2Rlc3Ryb3llci5wbmcpJ1xyXG4gICAgICAgIGxldCBzaGlwcyA9IFtjYXJyaWVyLCBiYXR0bGVzaGlwLCBzdWJtYXJpbmUsIGNydXNpZXIsIGRlc3Ryb3llcl1cclxuICAgICAgICBsZXQgaWQgPSBbJ2NhcnJpZXInLCAnYmF0dGxlc2hpcCcsICdzdWJtYXJpbmUnLCAnY3J1c2llcicsICdkZXN0cm95ZXInXVxyXG4gICAgICAgIGdhbWUuYXBwZW5kQ2hpbGQoc2hpcERpdilcclxuICAgICAgICBmb3IobGV0IGkgaW4gc2hpcHMpIHtcclxuICAgICAgICAgICAgZm9yKCBsZXQgaj0wOyBqPCBwbGF5ZXIuZ2IuYWxsU2hpcHNbaV0ubGVuZ3RoOyBqKyspe1xyXG4gICAgICAgICAgICAgICAgc2hpcHNbaV0uaW5uZXJIVE1MICs9IGA8ZGl2IGRhdGEtaWQ9JyR7aX0nIGRhdGEtcG9zaXRpb249JyR7an0nIHN0eWxlPVwiYmFja2dyb3VuZDp1cmwoLi4vZGlzdC9pbWdzLyR7aWRbaV19LyR7aWRbaV19JHtqfS5wbmcpXCIgY2xhc3M9JyR7aWRbaV19IHNoaXBJbWcnPmBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzaGlwc1tpXS5zZXRBdHRyaWJ1dGUoJ2RyYWdnYWJsZScsIHRydWUpIFxyXG4gICAgICAgICAgICBzaGlwc1tpXS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgYCR7aWRbaV19IHNoaXBDb250YWluZXJgIClcclxuICAgICAgICAgICAgc2hpcHNbaV0uc2V0QXR0cmlidXRlKCdkYXRhLXNoaXAnLCBgJHtpfWApXHJcbiAgICAgICAgICAgIHNoaXBEaXYuYXBwZW5kQ2hpbGQoc2hpcHNbaV0pXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBkcmFnKHNoaXBzW2ldKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNoaXBzXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZ3JpZCxcclxuICAgICAgICBzaG93U2hpcHNcclxuICAgIH1cclxufSkoKVxyXG5cclxuIiwiaW1wb3J0IHtnYW1lLCBwbGF5ZXJ9IGZyb20gJy4vaW5kZXgnXHJcbmV4cG9ydCBjb25zdCBkcmFnID0gZnVuY3Rpb24oc2hpcCwgcDEpe1xyXG4gICAgbGV0IHNoaXBJZFxyXG4gICAgbGV0IHNoaXBQb3NpdGlvblxyXG4gICAgbGV0IHNxdWFyZVxyXG4gICAgbGV0IGRpcmVjdGlvbiA9IHBsYXllci5nYi5kaXJlY3Rpb25cclxuICAgIGNvbnN0IHZlcmlmeVBvc2l0aW9uID0gKGRpcikgPT4ge1xyXG4gICAgICAgIGlmKGRpciA9PT0gJ2hvcml6b250YWwnKSByZXR1cm4gdHJ1ZVxyXG4gICAgICAgIGVsc2UgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcbiAgICBjb25zdCBzcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNxdWFyZScpXHJcbiAgICBjb25zdCBtb3VzZURvd24gPSBmdW5jdGlvbihlKSB7IFxyXG4gICAgICAgIHNoaXBJZCA9IGUudGFyZ2V0LmRhdGFzZXQuaWRcclxuICAgICAgICBzaGlwUG9zaXRpb24gPSBlLnRhcmdldC5kYXRhc2V0LnBvc2l0aW9uXHJcbiAgICAgICAgY29uc29sZS5sb2coc2hpcFBvc2l0aW9uKVxyXG4gICAgICAgIGZvcihsZXQgcyBvZiBzcXVhcmVzKSBzLm9uZHJvcCA9IGRyb3AgICAgICBcclxuICAgIH1cclxuICAgIC8vIE1vdmluZyBzaGlwXHJcbiAgICBjb25zdCBkcmFnT3ZlciA9IGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgIHRoaXMuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNmNjMnICAgICBcclxuICAgIH1cclxuICAgIGNvbnN0IGRyYWdMZWF2ZSA9IGZ1bmN0aW9uKGUpe2UudGFyZ2V0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcnfVxyXG4gICAgY29uc3QgZHJhZ0VudGVyID0gKGUpID0+IGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGNvbnN0IGRyYWdFbmQgPSAoKSA9PiB7fTtcclxuICAgIC8vUmVzdG9yZSBkZWZhdWx0XHJcbiAgICBjb25zdCBkcm9wID0gZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKVxyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgIGUudGFyZ2V0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcnXHJcbiAgICAgICAgbGV0IHggPSBlLnRhcmdldC5kYXRhc2V0LnggPyBOdW1iZXIoZS50YXJnZXQuZGF0YXNldC54KSA6IG51bGxcclxuICAgICAgICBsZXQgeSA9IGUudGFyZ2V0LmRhdGFzZXQueCA/IE51bWJlcihlLnRhcmdldC5kYXRhc2V0LnkpIDogbnVsbFxyXG4gICAgICAgIHkgPSAodmVyaWZ5UG9zaXRpb24oZGlyZWN0aW9uKSA/IHkgLSBzaGlwUG9zaXRpb24gOiB5KVxyXG4gICAgICAgIHggPSAodmVyaWZ5UG9zaXRpb24oZGlyZWN0aW9uKSA/IHggOiB4IC0gc2hpcFBvc2l0aW9uKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFt4LHldKVxyXG4gICAgICAgIGlmKHBsYXllci5nYi52ZXJpZnlTaGlwUGxhY2VtZW50KCdob3Jpem9udGFsJywgcGxheWVyLmdiLmFsbFNoaXBzW3NoaXBJZF0sIHgsIHkpKSB7XHJcbiAgICAgICAgICAgIGdhbWUucGxhY2VTaGlwcyhwbGF5ZXIsICdob3Jpem9udGFsJywgeCwgeSwgZmFsc2UsIHNoaXBJZClcclxuICAgICAgICAgICAgc2hpcC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBtb3VzZURvd24pXHJcbiAgICAgICAgICAgIGRyb3BTaGlwKHgseSlcclxuICAgICAgICAgICAgc2hpcC5vbm1vdXNlZG93biA9IG51bGxcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocGxheWVyLmdiLmFsbFNoaXBzW3NoaXBJZF0pXHJcbiAgICAgICAgfSBlbHNlIGNvbnNvbGUubG9nKHBsYXllci5nYi5hbGxTaGlwc1tzaGlwUG9zaXRpb25dKVxyXG4gICAgfVxyXG4gICAgY29uc3QgZHJvcFNoaXAgPSAoeCwgeSkgPT4ge1xyXG4gICAgICAgIGZvciggbGV0IGkgPSAwOyBpPCBwbGF5ZXIuZ2IuYWxsU2hpcHNbc2hpcElkXS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGNvbnN0IHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS14PScke3h9J11bZGF0YS15PScke3kraX0nXWApXHJcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRTaGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtaWQ9JyR7c2hpcElkfSddW2RhdGEtcG9zaXRpb249JyR7aX0nXWApXHJcbiAgICAgICAgICAgIHMuYXBwZW5kQ2hpbGQoY3VycmVudFNoaXApXHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcbiAgICBjb25zdCBkcmFnTGlzdGVuZXJzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgc2hpcC5vbm1vdXNlZG93biA9IG1vdXNlRG93blxyXG4gICAgICAgIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VuZCcsIGRyYWdFbmQpXHJcblxyXG4gICAgICAgIGZvciAobGV0IHMgb2Ygc3F1YXJlcyl7XHJcbiAgICAgICAgICAgIHMuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJywgZHJhZ0VudGVyKVxyXG4gICAgICAgICAgICBzLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIGRyYWdMZWF2ZSlcclxuICAgICAgICAgICAgcy5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIGRyYWdPdmVyKVxyXG4gICAgICAgIH0gICAgIFxyXG4gICAgfVxyXG4gICAgZHJhZ0xpc3RlbmVycygpXHJcbn0iLCJpbXBvcnQgeyBzaGlwRmFjdG9yeSB9IGZyb20gXCIuL3NoaXBzXCJcclxuXHJcbmV4cG9ydCBjb25zdCBnYW1lYm9hcmQgPSAoKSA9PiB7XHJcbiAgICAvLyB4IGFuZCB5IGNvb3Jkc1xyXG4gICAgbGV0IGJvYXJkID0gQXJyYXkoMTApLmZpbGwodW5kZWZpbmVkKS5tYXAoKHgpID0+IEFycmF5KDEwKS5maWxsKHVuZGVmaW5lZCkpXHJcbiAgICBsZXQgZGlyZWN0aW9uID0gJ2hvcml6b250YWwnXHJcbiAgICBsZXQgcGxhY2VkU2hpcHMgPSBbXVxyXG4gICAgbGV0IGFsbFNoaXBzID0gW11cclxuICAgIGxldCBzdW5rU2hpcHMgPSBbXVxyXG4gICAgbGV0IG1pc3NlZEF0dGFja3MgPSBbXVxyXG4gICAgbGV0IGFsbEF0dGFja3MgPSBbXVxyXG4gICBcclxuICAgIGNvbnN0IGNyZWF0ZVNoaXBzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY29uc3QgY2FycmllciA9IHNoaXBGYWN0b3J5KCdDYXJyaWVyJywgNSlcclxuICAgICAgICBjb25zdCBiYXR0bGVzaGlwID0gc2hpcEZhY3RvcnkoJ0JhdHRsZXNoaXAnLCA0KVxyXG4gICAgICAgIGNvbnN0IGNydXNpZXIgPSBzaGlwRmFjdG9yeSgnQ3J1c2llcicsIDMpXHJcbiAgICAgICAgY29uc3Qgc3VibWFyaW5lID0gc2hpcEZhY3RvcnkoJ1N1Ym1hcmluZScsIDMpXHJcbiAgICAgICAgY29uc3QgZGVzdHJveWVyID0gc2hpcEZhY3RvcnkoJ0Rlc3Ryb3llcicsIDIpXHJcbiAgICAgICAgYWxsU2hpcHMucHVzaChjYXJyaWVyLCBiYXR0bGVzaGlwLCBjcnVzaWVyLCBzdWJtYXJpbmUsIGRlc3Ryb3llcilcclxuICAgICAgICByZXR1cm4gYWxsU2hpcHNcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwbGFjZVNoaXAgPSBmdW5jdGlvbiggZGlyZWMsIHNoaXAsIHgsIHkpIHtcclxuICAgICAgICAvL09ubHkgcGxhY2UgaWYgdGhlIHNwYWNlIGlzIGZyZWVcclxuICAgICAgICAvLyBjaGVjayBpZiB0aGUgc2hpcCBmaXRzIGludG8gdGhlIHNwb3RcclxuICAgICAgICBpZihkaXJlYyA9PT0gJ2hvcml6b250YWwnICYmIHZlcmlmeVNoaXBQbGFjZW1lbnQoZGlyZWMsIHNoaXAsIHgsIHkpKXtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8c2hpcC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJvYXJkW3hdW3kgKyBpXSA9IHtzaGlwLCBwb3NpdGlvbjogaX1cclxuICAgICAgICAgICAgICAgIGlmKHBsYWNlZFNoaXBzLmluZGV4T2Yoc2hpcCkgPT09IC0xKSBwbGFjZWRTaGlwcy5wdXNoKHNoaXApXHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgfSBlbHNlIGlmKGRpcmVjID09PSAndmVydGljYWwnICYmIHZlcmlmeVNoaXBQbGFjZW1lbnQoZGlyZWMsIHNoaXAsIHgsIHkpKXtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8c2hpcC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJvYXJkW3ggKyBpXVt5XSA9IHtzaGlwLCBwb3NpdGlvbjogaX1cclxuICAgICAgICAgICAgICAgIGlmKHBsYWNlZFNoaXBzLmluZGV4T2Yoc2hpcCkgPT09IC0xKSBwbGFjZWRTaGlwcy5wdXNoKHNoaXApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IFxyXG4gICAgfVxyXG4gICAgY29uc3QgdmVyaWZ5U2hpcFBsYWNlbWVudCA9IGZ1bmN0aW9uKGRpcmVjLCBzaGlwLCB4LCB5KSB7XHJcbiAgICAgICAgaWYoYm9hcmRbeF1beV0gPT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSBzaGlwIGZpdHMgaW50byB0aGUgc3BvdFxyXG4gICAgICAgICAgICBpZihkaXJlYyA9PT0gJ2hvcml6b250YWwnICYmICh5ICsgKHNoaXAubGVuZ3RoLTEpIDwgYm9hcmRbeF0ubGVuZ3RoKSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYoZGlyZWMgPT09ICd2ZXJ0aWNhbCcgJiYgKHggKyAoc2hpcC5sZW5ndGgtMSkgPCBib2FyZC5sZW5ndGgpKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgICAgIH0gZWxzZSByZXR1cm4gZmFsc2VcclxuICAgICAgICB9IGVsc2Uge3dpbmRvdy5hbGVydCgnZ2IuanM6NDYnICsgYm9hcmRbeF1beV0pXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vdmVyaWZ5IGlmIHRoZSBwbGFjZSB3YXMgYWxyZWFkeSBhdHRhY2tlZFxyXG4gICAgY29uc3QgdmVyaWZ5QXR0YWNrID0gZnVuY3Rpb24oeCwgeSkge1xyXG4gICAgICAgIGFsbEF0dGFja3MuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBpZihpdGVtWzBdID09PSB4ICYmIGl0ZW1bMV0gPT09IHkpe1xyXG4gICAgICAgICAgICAgICAgZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgIH1cclxuICAgIC8vYXR0YWNrIHRoZSBlbmVteSdzIGdhbWVib2FyZFxyXG4gICAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IGZ1bmN0aW9uKHgsIHkpeyAgXHJcbiAgICAgICAgaWYodmVyaWZ5QXR0YWNrKHgsIHkpKXtcclxuICAgICAgICAgICAgaWYoIHR5cGVvZiBib2FyZFt4XVt5XSA9PT0gJ29iamVjdCcpe1xyXG4gICAgICAgICAgICAgICAgYm9hcmRbeF1beV0uc2hpcC5oaXQoYm9hcmRbeF1beV0ucG9zaXRpb24pXHJcbiAgICAgICAgICAgICAgICBib2FyZFt4XVt5XS5zaGlwLmlzU3VuaygpXHJcbiAgICAgICAgICAgICAgICBib2FyZFt4XVt5XSA9ICdoaXQnXHJcbiAgICAgICAgICAgICAgICBhbGxBdHRhY2tzLnB1c2goW3gseV0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihib2FyZFt4XVt5XSA9PT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGJvYXJkW3hdW3ldID0gJ21pc3MnXHJcbiAgICAgICAgICAgICAgICBhbGxBdHRhY2tzLnB1c2goW3gseV0pXHJcbiAgICAgICAgICAgICAgICBtaXNzZWRBdHRhY2tzLnB1c2goW3gseV0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmVyaWZ5U2hpcHMoKVxyXG4gICAgICAgIH0gICAgXHJcbiAgICB9XHJcbiAgICAvL3ZlcmlmeSBpZiB0aGUgc2hpcCBpcyBzdW5rXHJcbiAgICBjb25zdCB2ZXJpZnlTaGlwcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGFsbFNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcclxuICAgICAgICAgICAgaWYoc2hpcC5pc1N1bmsoKSkgc3Vua1NoaXBzLnB1c2goc2hpcClcclxuICAgICAgICB9KVxyXG4gICAgICAgIGlmIChzdW5rU2hpcHMubGVuZ3RoID09PSA1KSByZXR1cm4gJ2xvc2UnXHJcbiAgICAgICAgZWxzZSByZXR1cm4gJ3BsYXlpbmcnXHJcbiAgICB9XHJcbiAgICBjb25zdCByZXNldEFsbCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgYWxsU2hpcHMgPSBbXVxyXG4gICAgICAgIHBsYWNlZFNoaXBzID0gW11cclxuICAgICAgICBsZXQgYm9hcmQgPSBBcnJheSgxMCkuZmlsbCh1bmRlZmluZWQpLm1hcCgoeCkgPT4gQXJyYXkoMTApLmZpbGwodW5kZWZpbmVkKSlcclxuICAgICAgICByZXR1cm4gYWxsU2hpcHMsIHBsYWNlZFNoaXBzLCBib2FyZFxyXG4gICAgfVxyXG4gICAgY3JlYXRlU2hpcHMoKVxyXG4gICAgcmV0dXJue1xyXG4gICAgICAgIGJvYXJkLFxyXG4gICAgICAgIGRpcmVjdGlvbixcclxuICAgICAgICBwbGFjZWRTaGlwcyxcclxuICAgICAgICBhbGxTaGlwcyxcclxuICAgICAgICBzdW5rU2hpcHMsXHJcbiAgICAgICAgbWlzc2VkQXR0YWNrcyxcclxuICAgICAgICBjcmVhdGVTaGlwcyxcclxuICAgICAgICBwbGFjZVNoaXAsXHJcbiAgICAgICAgdmVyaWZ5U2hpcFBsYWNlbWVudCxcclxuICAgICAgICB2ZXJpZnlBdHRhY2ssXHJcbiAgICAgICAgcmVjZWl2ZUF0dGFjayxcclxuICAgICAgICB2ZXJpZnlTaGlwcyxcclxuICAgICAgICByZXNldEFsbFxyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQge2NyZWF0ZVBsYXllciwgY29tcHV0ZXJQbGF5fSBmcm9tICcuL3BsYXllcidcclxuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSAnLi9VSSdcclxuaW1wb3J0IHsgZHJhZ1NoaXAgfSBmcm9tICcuL2RyYWcnXHJcbmV4cG9ydCBjb25zdCBwbGF5ZXIgPSBjcmVhdGVQbGF5ZXIoJ2x1bWEnKVxyXG5jb25zdCBjcHUgPSBjcmVhdGVQbGF5ZXIoJ3BjJylcclxuXHJcbmV4cG9ydCBjb25zdCBnYW1lID0gKChwMSwgcDIpID0+IHtcclxuICAgIC8vIFBsYWNlIHNoaXBzIG9uIHRoZSBib2FyZFxyXG4gICAgY29uc3QgcGxhY2VTaGlwcyA9IChwbGF5ZXIsIGRpciwgeDEsIHkxLCBhdXRvLCBzaGlwSW5kZXgpID0+IHtcclxuICAgICAgICBpZihhdXRvID09PSB0cnVlKXtcclxuICAgICAgICAgICAgcGxheWVyLmdiLmFsbFNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApXHJcbiAgICAgICAgICAgICAgICBsZXQgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXIuZ2IudmVyaWZ5U2hpcFBsYWNlbWVudChkaXIsIHNoaXAsIHgsIHkpID09PSBmYWxzZSApe1xyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlKHBsYXllci5nYi52ZXJpZnlTaGlwUGxhY2VtZW50KGRpciwgc2hpcCwgeCwgeSkgPT09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuZ2IucGxhY2VTaGlwKGRpciAsc2hpcCwgeCwgeSlcclxuICAgICAgICAgICAgfSBlbHNlIHBsYXllci5nYi5wbGFjZVNoaXAoZGlyLHNoaXAsIHgsIHkpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHNoaXAgPSBwbGF5ZXIuZ2IuYWxsU2hpcHNbc2hpcEluZGV4XVxyXG4gICAgICAgICAgICBpZiAocGxheWVyLmdiLnZlcmlmeVNoaXBQbGFjZW1lbnQoZGlyLCBzaGlwLCB4MSwgeTEpID09PSBmYWxzZSApe1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmFsZXJ0KCdJbnZhbGlkIHBvc2l0aW9uJylcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHAxLmdiLnBsYWNlU2hpcChkaXIsc2hpcCwgeDEsIHkxKVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS50YWJsZShwMS5nYi5ib2FyZClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0gXHJcbiAgICAvL1BsYXkgZ2FtZSB0dXJucywgcGxheWVyIHggY3B1XHJcbiAgICBjb25zdCBwbGF5VHVybiA9IGZ1bmN0aW9uKHBsYXllciwgYXV0bykge1xyXG4gICAgICAgIGlmKGF1dG8gPT09IHRydWUpe1xyXG4gICAgICAgICAgICBsZXQgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKVxyXG4gICAgICAgICAgICBsZXQgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKVxyXG4gICAgICAgICAgICBpZighcGxheWVyLmdiLnZlcmlmeUF0dGFjayh4LHkpKXtcclxuICAgICAgICAgICAgICAgIHdoaWxlKCFwbGF5ZXIuZ2IudmVyaWZ5QXR0YWNrKHgseSkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMClcclxuICAgICAgICAgICAgICAgICAgICB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIuZ2IucmVjZWl2ZUF0dGFjayh4LCB5KVxyXG4gICAgICAgICAgICB9IGVsc2UgcGxheWVyLmdiLnJlY2VpdmVBdHRhY2soeCwgeSlcclxuICAgICAgICBjb25zb2xlLnRhYmxlKHBsYXllci5nYi5ib2FyZClcclxuICAgICAgICAgICBcclxuICAgICAgICB9IGVsc2UgcmV0dXJuICd0byBiZSBpbXBsZW1lbnRlZCdcclxuICAgIH1cclxuICAgIGNvbnN0IHBsYXkgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAvL3BsYWNlU2hpcHMocDIsICdob3Jpem9udGFsJywgMCwgMCwgdHJ1ZSwgMCkgXHJcbiAgICB9XHJcbiAgICBjb25zdCBkcmFnU2hpcCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcGxhY2VTaGlwcywgXHJcbiAgICAgICAgcGxheVR1cm4sXHJcbiAgICAgICAgcGxheVxyXG4gICAgfVxyXG59KShwbGF5ZXIsIGNwdSlcclxuXHJcblxyXG5cclxuZ2FtZS5wbGF5KHBsYXllciwgY3B1KVxyXG5cclxucmVuZGVyLmdyaWQoJ3BsYXllcicpXHJcbi8vIGRpc3BsYXlHYW1lYm9hcmQuZ3JpZCgnY3B1JylcclxucmVuZGVyLnNob3dTaGlwcygpXHJcbiIsImltcG9ydCB7IGdhbWVib2FyZCB9IGZyb20gXCIuL2dhbWVib2FyZFwiXHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlUGxheWVyID0gKG5hbWUpID0+IHtcclxuICAgIGNvbnN0IGdiID0gZ2FtZWJvYXJkKClcclxuXHJcbiAgICByZXR1cm4ge25hbWUsIGdifVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgY29tcHV0ZXJQbGF5ID0gKCkgPT4ge1xyXG4gICAgbGV0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMClcclxuICAgIGxldCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApXHJcbiAgICByZXR1cm4gW3gseV1cclxufSIsImltcG9ydCB7IGdhbWVib2FyZCB9IGZyb20gXCIuL2dhbWVib2FyZFwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IHNoaXBGYWN0b3J5ID0gKG5hbWUsIGxlbikgPT4ge1xyXG4gICAgY29uc3QgaWQgPSBuYW1lXHJcbiAgICBjb25zdCBsZW5ndGggPSBsZW5cclxuICAgIGxldCBoaXRQb3NpdGlvbiA9IFtdXHJcbiAgICBsZXQgc3VuayA9IGZhbHNlXHJcbiAgICBjb25zdCBoaXQgPSBmdW5jdGlvbihwb3MpIHtcclxuICAgICAgICB0aGlzLmhpdFBvc2l0aW9uLnB1c2gocG9zKVxyXG4gICAgICAgIHJldHVybiBoaXRQb3NpdGlvblxyXG4gICAgfVxyXG4gICAgY29uc3QgaXNTdW5rID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYoaGl0UG9zaXRpb24ubGVuZ3RoID09PSBsZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5zdW5rID0gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5zdW5rXHJcbiAgICB9XHJcbiAgICByZXR1cm4ge2lkLCBsZW5ndGgsIGhpdFBvc2l0aW9uLCBzdW5rLCBoaXQsIGlzU3Vua31cclxufVxyXG5cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==