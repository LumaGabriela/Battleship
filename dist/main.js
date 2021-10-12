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
/* harmony export */   "displayGameboard": () => (/* binding */ displayGameboard)
/* harmony export */ });
const displayGameboard = (() => {
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
        } else {
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UI */ "./src/UI.js");


const player = (0,_player__WEBPACK_IMPORTED_MODULE_0__.createPlayer)('luma')
const cpu = (0,_player__WEBPACK_IMPORTED_MODULE_0__.createPlayer)('pc')
player.gb.createShips()
cpu.gb.createShips()


const newGame = (p1, p2) => {
    let turn = 0
    // Place ships on the board
    const placeShips = (player, dir, auto) => {
        if(auto === true){
            player.gb.allShips.forEach((ship) => {
                let coords = (0,_player__WEBPACK_IMPORTED_MODULE_0__.computerPlay)()
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
            player.gb.allShips.forEach((ship) => {
                let coords = (0,_player__WEBPACK_IMPORTED_MODULE_0__.computerPlay)()
                let x = prompt(`X value, ship: ${ship.id}`)
                let y = prompt(`Y value, ship: ${ship.id}`)
            
                if (player.gb.verifyShipPlacement(dir, ship, x, y) === false ){
                    while(player.gb.verifyShipPlacement(dir, ship, x, y) === false){
                        x = prompt(`X value, ship: ${ship.id}`)
                        y = prompt(`Y value, ship: ${ship.id}`)   
                    } 
                    player.gb.placeShip(dir ,ship, x, y)
                } else player.gb.placeShip(dir,ship, x, y)
            })
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
    const play = function(p1, p2) {
        placeShips(p1, 'horizontal', true)
        placeShips(p2, 'horizontal', true) 
        
        // console.table(p1.gb.board)
        // console.table(p2.gb.board)
         
        
    }
    return {
        placeShips, 
        playTurn,
        play
    }
}

const currentGame = newGame(player, cpu)
// currentGame.placeShips(player, 'horizontal', true)
// currentGame.placeShips(cpu, 'horizontal', true)
currentGame.play(player, cpu)

currentGame.playTurn(cpu, true)


_UI__WEBPACK_IMPORTED_MODULE_1__.displayGameboard.grid('player')
// displayGameboard.grid('cpu')
_UI__WEBPACK_IMPORTED_MODULE_1__.displayGameboard.renderShips()
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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a0I7QUFDbEIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBcUI7QUFDckI7QUFDQSw2REFBNEIsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvVUkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgZGlzcGxheUdhbWVib2FyZCA9ICgoKSA9PiB7XHJcbiAgICBsZXQgZ2FtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNnYW1lJylcclxuICAgIGNvbnN0IGdyaWQgPSAobmFtZSkgPT4ge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBncmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgICAgICBncmlkLnNldEF0dHJpYnV0ZSgnaWQnLCBgJHtuYW1lfS1nYW1lYm9hcmRgKVxyXG4gICAgICAgIGdyaWQuc2V0QXR0cmlidXRlKCdjbGFzcycsICdnYW1lYm9hcmQnKVxyXG4gICAgICAgIGxldCBpID0gMFxyXG4gICAgICAgIHdoaWxlKGk8MTAwKSB7XHJcbiAgICAgICAgICAgIGdyaWQuaW5uZXJIVE1MICs9IGA8ZGl2IGNsYXNzPVwiJHtuYW1lfSBzcXVhcmVcIiA+YFxyXG4gICAgICAgICAgICBpKytcclxuICAgICAgICB9XHJcbiAgICBnYW1lLmFwcGVuZENoaWxkKGdyaWQpXHJcbiAgICB9XHJcbiAgICBjb25zdCByZW5kZXJTaGlwcyA9ICgpID0+IHtcclxuICAgICAgICBsZXQgc2hpcERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgICAgc2hpcERpdi5pZCA9ICdzaGlwRGl2J1xyXG4gICAgICAgIGxldCBjYXJyaWVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcclxuICAgICAgICBsZXQgYmF0dGxlc2hpcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXHJcbiAgICAgICAgbGV0IHN1Ym1hcmluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXHJcbiAgICAgICAgbGV0IGNydXNpZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxyXG4gICAgICAgIGxldCBkZXN0cm95ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxyXG4gICAgICAgIGNhcnJpZXIuc3JjID0gJy4vaW1ncy9jYXJyaWVyLnBuZydcclxuICAgICAgICBiYXR0bGVzaGlwLnNyYyA9ICcuL2ltZ3MvYmF0dGxlc2hpcC5wbmcnXHJcbiAgICAgICAgc3VibWFyaW5lLnNyYyA9ICcuL2ltZ3Mvc3VibWFyaW5lLnBuZydcclxuICAgICAgICBjcnVzaWVyLnNyYyA9ICcuL2ltZ3MvY3J1c2llci5wbmcnXHJcbiAgICAgICAgZGVzdHJveWVyLnNyYyA9ICcuL2ltZ3MvZGVzdHJveWVyLnBuZydcclxuICAgICAgICBsZXQgc2hpcHMgPSBbY2FycmllciwgYmF0dGxlc2hpcCwgc3VibWFyaW5lLCBjcnVzaWVyLCBkZXN0cm95ZXJdXHJcbiAgICAgICAgbGV0IGlkID0gWydjYXJyaWVyJywgJ2JhdHRsZXNoaXAnLCAnc3VibWFyaW5lJywgJ2NydXNpZXInLCAnZGVzdHJveWVyJ11cclxuICAgICAgICBnYW1lLmFwcGVuZENoaWxkKHNoaXBEaXYpXHJcbiAgICAgICAgc2hpcHMuZm9yRWFjaCgoc2hpcCxpKSA9PiB7XHJcbiAgICAgICAgICAgIHNoaXAuc2V0QXR0cmlidXRlKCdjbGFzcycsIGAke2lkW2ldfSBzaGlwSW1nYCApXHJcbiAgICAgICAgICAgIHNoaXBEaXYuYXBwZW5kQ2hpbGQoc2hpcClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBncmlkLFxyXG4gICAgICAgIHJlbmRlclNoaXBzXHJcbiAgICB9XHJcbn0pKClcclxuXHJcbiIsImltcG9ydCB7IHNoaXBGYWN0b3J5IH0gZnJvbSBcIi4vc2hpcHNcIlxyXG5cclxuZXhwb3J0IGNvbnN0IGdhbWVib2FyZCA9ICgpID0+IHtcclxuICAgIC8vIHggYW5kIHkgY29vcmRzXHJcbiAgICBsZXQgYm9hcmQgPSBBcnJheSgxMCkuZmlsbCh1bmRlZmluZWQpLm1hcCgoeCkgPT4gQXJyYXkoMTApLmZpbGwodW5kZWZpbmVkKSlcclxuICAgIGxldCBkaXJlY3Rpb24gPSAnaG9yaXpvbnRhbCdcclxuICAgIGxldCBwbGFjZWRTaGlwcyA9IFtdXHJcbiAgICBsZXQgYWxsU2hpcHMgPSBbXVxyXG4gICAgbGV0IHN1bmtTaGlwcyA9IFtdXHJcbiAgICBsZXQgbWlzc2VkQXR0YWNrcyA9IFtdXHJcbiAgICBsZXQgYWxsQXR0YWNrcyA9IFtdXHJcblxyXG4gICAgY29uc3QgY3JlYXRlU2hpcHMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBjb25zdCBjYXJyaWVyID0gc2hpcEZhY3RvcnkoJ0NhcnJpZXInLCA1KVxyXG4gICAgICAgIGNvbnN0IGJhdHRsZXNoaXAgPSBzaGlwRmFjdG9yeSgnQmF0dGxlc2hpcCcsIDQpXHJcbiAgICAgICAgY29uc3QgY3J1c2llciA9IHNoaXBGYWN0b3J5KCdDcnVzaWVyJywgMylcclxuICAgICAgICBjb25zdCBzdWJtYXJpbmUgPSBzaGlwRmFjdG9yeSgnU3VibWFyaW5lJywgMylcclxuICAgICAgICBjb25zdCBkZXN0cm95ZXIgPSBzaGlwRmFjdG9yeSgnRGVzdHJveWVyJywgMilcclxuICAgICAgICBhbGxTaGlwcy5wdXNoKGNhcnJpZXIsIGJhdHRsZXNoaXAsIGNydXNpZXIsIHN1Ym1hcmluZSwgZGVzdHJveWVyKVxyXG4gICAgICAgIHJldHVybiBhbGxTaGlwc1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHBsYWNlU2hpcCA9IGZ1bmN0aW9uKCBkaXJlYywgc2hpcCwgeCwgeSkge1xyXG4gICAgICAgIC8vT25seSBwbGFjZSBpZiB0aGUgc3BhY2UgaXMgZnJlZVxyXG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZSBzaGlwIGZpdHMgaW50byB0aGUgc3BvdFxyXG4gICAgICAgIGlmKGRpcmVjID09PSAnaG9yaXpvbnRhbCcgJiYgdmVyaWZ5U2hpcFBsYWNlbWVudChkaXJlYywgc2hpcCwgeCwgeSkpe1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxzaGlwLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmRbeF1beSArIGldID0ge3NoaXAsIHBvc2l0aW9uOiBpfVxyXG4gICAgICAgICAgICAgICAgaWYocGxhY2VkU2hpcHMuaW5kZXhPZihzaGlwKSA9PT0gLTEpIHBsYWNlZFNoaXBzLnB1c2goc2hpcClcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9IGVsc2UgaWYoZGlyZWMgPT09ICd2ZXJ0aWNhbCcgJiYgdmVyaWZ5U2hpcFBsYWNlbWVudChkaXJlYywgc2hpcCwgeCwgeSkpe1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxzaGlwLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmRbeCArIGldW3ldID0ge3NoaXAsIHBvc2l0aW9uOiBpfVxyXG4gICAgICAgICAgICAgICAgaWYocGxhY2VkU2hpcHMuaW5kZXhPZihzaGlwKSA9PT0gLTEpIHBsYWNlZFNoaXBzLnB1c2goc2hpcClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gICAgIFxyXG4gICAgfVxyXG4gICAgY29uc3QgdmVyaWZ5U2hpcFBsYWNlbWVudCA9IGZ1bmN0aW9uKGRpcmVjLCBzaGlwLCB4LCB5KSB7XHJcbiAgICAgICAgaWYoYm9hcmRbeF1beV0gPT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSBzaGlwIGZpdHMgaW50byB0aGUgc3BvdFxyXG4gICAgICAgICAgICBpZihkaXJlYyA9PT0gJ2hvcml6b250YWwnICYmICh5ICsgKHNoaXAubGVuZ3RoLTEpIDwgYm9hcmRbeF0ubGVuZ3RoKSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYoZGlyZWMgPT09ICd2ZXJ0aWNhbCcgJiYgKHggKyAoc2hpcC5sZW5ndGgtMSkgPCBib2FyZC5sZW5ndGgpKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgICAgIH0gZWxzZSByZXR1cm4gZmFsc2VcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL3ZlcmlmeSBpZiB0aGUgcGxhY2Ugd2FzIGFscmVhZHkgYXR0YWNrZWRcclxuICAgIGNvbnN0IHZlcmlmeUF0dGFjayA9IGZ1bmN0aW9uKHgsIHkpIHtcclxuICAgICAgICBhbGxBdHRhY2tzLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgaWYoaXRlbVswXSA9PT0geCAmJiBpdGVtWzFdID09PSB5KXtcclxuICAgICAgICAgICAgICAgIGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9XHJcbiAgICAvL2F0dGFjayB0aGUgZW5lbXkncyBnYW1lYm9hcmRcclxuICAgIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSBmdW5jdGlvbih4LCB5KXsgIFxyXG4gICAgICAgIGlmKHZlcmlmeUF0dGFjayh4LCB5KSl7XHJcbiAgICAgICAgICAgIGlmKCB0eXBlb2YgYm9hcmRbeF1beV0gPT09ICdvYmplY3QnKXtcclxuICAgICAgICAgICAgICAgIGJvYXJkW3hdW3ldLnNoaXAuaGl0KGJvYXJkW3hdW3ldLnBvc2l0aW9uKVxyXG4gICAgICAgICAgICAgICAgYm9hcmRbeF1beV0uc2hpcC5pc1N1bmsoKVxyXG4gICAgICAgICAgICAgICAgYm9hcmRbeF1beV0gPSAnaGl0J1xyXG4gICAgICAgICAgICAgICAgYWxsQXR0YWNrcy5wdXNoKFt4LHldKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYoYm9hcmRbeF1beV0gPT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBib2FyZFt4XVt5XSA9ICdtaXNzJ1xyXG4gICAgICAgICAgICAgICAgYWxsQXR0YWNrcy5wdXNoKFt4LHldKVxyXG4gICAgICAgICAgICAgICAgbWlzc2VkQXR0YWNrcy5wdXNoKFt4LHldKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZlcmlmeVNoaXBzKClcclxuICAgICAgICB9ICAgIFxyXG4gICAgfVxyXG4gICAgLy92ZXJpZnkgaWYgdGhlIHNoaXAgaXMgc3Vua1xyXG4gICAgY29uc3QgdmVyaWZ5U2hpcHMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBhbGxTaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHNoaXAuaXNTdW5rKCkpIHN1bmtTaGlwcy5wdXNoKHNoaXApXHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZiAoc3Vua1NoaXBzLmxlbmd0aCA9PT0gNSkgcmV0dXJuICdsb3NlJ1xyXG4gICAgICAgIGVsc2UgcmV0dXJuICdwbGF5aW5nJ1xyXG4gICAgfVxyXG4gICAgY29uc3QgcmVzZXRBbGwgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIGFsbFNoaXBzID0gW11cclxuICAgICAgICBwbGFjZWRTaGlwcyA9IFtdXHJcbiAgICAgICAgbGV0IGJvYXJkID0gQXJyYXkoMTApLmZpbGwodW5kZWZpbmVkKS5tYXAoKHgpID0+IEFycmF5KDEwKS5maWxsKHVuZGVmaW5lZCkpXHJcbiAgICAgICAgcmV0dXJuIGFsbFNoaXBzLCBwbGFjZWRTaGlwcywgYm9hcmRcclxuICAgIH1cclxuICAgIHJldHVybntcclxuICAgICAgICBib2FyZCxcclxuICAgICAgICBkaXJlY3Rpb24sXHJcbiAgICAgICAgcGxhY2VkU2hpcHMsXHJcbiAgICAgICAgYWxsU2hpcHMsXHJcbiAgICAgICAgc3Vua1NoaXBzLFxyXG4gICAgICAgIG1pc3NlZEF0dGFja3MsXHJcbiAgICAgICAgY3JlYXRlU2hpcHMsXHJcbiAgICAgICAgcGxhY2VTaGlwLFxyXG4gICAgICAgIHZlcmlmeVNoaXBQbGFjZW1lbnQsXHJcbiAgICAgICAgdmVyaWZ5QXR0YWNrLFxyXG4gICAgICAgIHJlY2VpdmVBdHRhY2ssXHJcbiAgICAgICAgdmVyaWZ5U2hpcHMsXHJcbiAgICAgICAgcmVzZXRBbGxcclxuICAgIH1cclxufVxyXG5cclxuIiwiaW1wb3J0IHsgZ2FtZWJvYXJkIH0gZnJvbSBcIi4vZ2FtZWJvYXJkXCJcclxuXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVQbGF5ZXIgPSAobmFtZSkgPT4ge1xyXG4gICAgY29uc3QgZ2IgPSBnYW1lYm9hcmQoKVxyXG5cclxuICAgIHJldHVybiB7bmFtZSwgZ2J9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBjb21wdXRlclBsYXkgPSAoKSA9PiB7XHJcbiAgICBsZXQgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKVxyXG4gICAgbGV0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMClcclxuICAgIHJldHVybiBbeCx5XVxyXG59IiwiaW1wb3J0IHsgZ2FtZWJvYXJkIH0gZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XHJcblxyXG5leHBvcnQgY29uc3Qgc2hpcEZhY3RvcnkgPSAobmFtZSwgbGVuKSA9PiB7XHJcbiAgICBjb25zdCBpZCA9IG5hbWVcclxuICAgIGNvbnN0IGxlbmd0aCA9IGxlblxyXG4gICAgbGV0IGhpdFBvc2l0aW9uID0gW11cclxuICAgIGxldCBzdW5rID0gZmFsc2VcclxuICAgIGNvbnN0IGhpdCA9IGZ1bmN0aW9uKHBvcykge1xyXG4gICAgICAgIHRoaXMuaGl0UG9zaXRpb24ucHVzaChwb3MpXHJcbiAgICAgICAgcmV0dXJuIGhpdFBvc2l0aW9uXHJcbiAgICB9XHJcbiAgICBjb25zdCBpc1N1bmsgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZihoaXRQb3NpdGlvbi5sZW5ndGggPT09IGxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLnN1bmsgPSB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLnN1bmtcclxuICAgIH1cclxuICAgIHJldHVybiB7aWQsIGxlbmd0aCwgaGl0UG9zaXRpb24sIHN1bmssIGhpdCwgaXNTdW5rfVxyXG59XHJcblxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7Y3JlYXRlUGxheWVyLCBjb21wdXRlclBsYXl9IGZyb20gJy4vcGxheWVyJ1xyXG5pbXBvcnQgeyBkaXNwbGF5R2FtZWJvYXJkIH0gZnJvbSAnLi9VSSdcclxuY29uc3QgcGxheWVyID0gY3JlYXRlUGxheWVyKCdsdW1hJylcclxuY29uc3QgY3B1ID0gY3JlYXRlUGxheWVyKCdwYycpXHJcbnBsYXllci5nYi5jcmVhdGVTaGlwcygpXHJcbmNwdS5nYi5jcmVhdGVTaGlwcygpXHJcblxyXG5cclxuY29uc3QgbmV3R2FtZSA9IChwMSwgcDIpID0+IHtcclxuICAgIGxldCB0dXJuID0gMFxyXG4gICAgLy8gUGxhY2Ugc2hpcHMgb24gdGhlIGJvYXJkXHJcbiAgICBjb25zdCBwbGFjZVNoaXBzID0gKHBsYXllciwgZGlyLCBhdXRvKSA9PiB7XHJcbiAgICAgICAgaWYoYXV0byA9PT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIHBsYXllci5nYi5hbGxTaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29vcmRzID0gY29tcHV0ZXJQbGF5KClcclxuICAgICAgICAgICAgICAgIGxldCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApXHJcbiAgICAgICAgICAgICAgICBsZXQgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXIuZ2IudmVyaWZ5U2hpcFBsYWNlbWVudChkaXIsIHNoaXAsIHgsIHkpID09PSBmYWxzZSApe1xyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlKHBsYXllci5nYi52ZXJpZnlTaGlwUGxhY2VtZW50KGRpciwgc2hpcCwgeCwgeSkgPT09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuZ2IucGxhY2VTaGlwKGRpciAsc2hpcCwgeCwgeSlcclxuICAgICAgICAgICAgfSBlbHNlIHBsYXllci5nYi5wbGFjZVNoaXAoZGlyLHNoaXAsIHgsIHkpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcGxheWVyLmdiLmFsbFNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBjb29yZHMgPSBjb21wdXRlclBsYXkoKVxyXG4gICAgICAgICAgICAgICAgbGV0IHggPSBwcm9tcHQoYFggdmFsdWUsIHNoaXA6ICR7c2hpcC5pZH1gKVxyXG4gICAgICAgICAgICAgICAgbGV0IHkgPSBwcm9tcHQoYFkgdmFsdWUsIHNoaXA6ICR7c2hpcC5pZH1gKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXIuZ2IudmVyaWZ5U2hpcFBsYWNlbWVudChkaXIsIHNoaXAsIHgsIHkpID09PSBmYWxzZSApe1xyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlKHBsYXllci5nYi52ZXJpZnlTaGlwUGxhY2VtZW50KGRpciwgc2hpcCwgeCwgeSkgPT09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeCA9IHByb21wdChgWCB2YWx1ZSwgc2hpcDogJHtzaGlwLmlkfWApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHkgPSBwcm9tcHQoYFkgdmFsdWUsIHNoaXA6ICR7c2hpcC5pZH1gKSAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLmdiLnBsYWNlU2hpcChkaXIgLHNoaXAsIHgsIHkpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgcGxheWVyLmdiLnBsYWNlU2hpcChkaXIsc2hpcCwgeCwgeSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9IFxyXG4gICAgLy9QbGF5IGdhbWUgdHVybnMsIHBsYXllciB4IGNwdVxyXG4gICAgY29uc3QgcGxheVR1cm4gPSBmdW5jdGlvbihwbGF5ZXIsIGF1dG8pIHtcclxuICAgICAgICBpZihhdXRvID09PSB0cnVlKXtcclxuICAgICAgICAgICAgbGV0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMClcclxuICAgICAgICAgICAgbGV0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMClcclxuICAgICAgICAgICAgaWYoIXBsYXllci5nYi52ZXJpZnlBdHRhY2soeCx5KSl7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSghcGxheWVyLmdiLnZlcmlmeUF0dGFjayh4LHkpKXtcclxuICAgICAgICAgICAgICAgICAgICB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApXHJcbiAgICAgICAgICAgICAgICAgICAgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcGxheWVyLmdiLnJlY2VpdmVBdHRhY2soeCwgeSlcclxuICAgICAgICAgICAgfSBlbHNlIHBsYXllci5nYi5yZWNlaXZlQXR0YWNrKHgsIHkpXHJcbiAgICAgICAgY29uc29sZS50YWJsZShwbGF5ZXIuZ2IuYm9hcmQpXHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIHJldHVybiAndG8gYmUgaW1wbGVtZW50ZWQnXHJcbiAgICB9XHJcbiAgICBjb25zdCBwbGF5ID0gZnVuY3Rpb24ocDEsIHAyKSB7XHJcbiAgICAgICAgcGxhY2VTaGlwcyhwMSwgJ2hvcml6b250YWwnLCB0cnVlKVxyXG4gICAgICAgIHBsYWNlU2hpcHMocDIsICdob3Jpem9udGFsJywgdHJ1ZSkgXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gY29uc29sZS50YWJsZShwMS5nYi5ib2FyZClcclxuICAgICAgICAvLyBjb25zb2xlLnRhYmxlKHAyLmdiLmJvYXJkKVxyXG4gICAgICAgICBcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcGxhY2VTaGlwcywgXHJcbiAgICAgICAgcGxheVR1cm4sXHJcbiAgICAgICAgcGxheVxyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBjdXJyZW50R2FtZSA9IG5ld0dhbWUocGxheWVyLCBjcHUpXHJcbi8vIGN1cnJlbnRHYW1lLnBsYWNlU2hpcHMocGxheWVyLCAnaG9yaXpvbnRhbCcsIHRydWUpXHJcbi8vIGN1cnJlbnRHYW1lLnBsYWNlU2hpcHMoY3B1LCAnaG9yaXpvbnRhbCcsIHRydWUpXHJcbmN1cnJlbnRHYW1lLnBsYXkocGxheWVyLCBjcHUpXHJcblxyXG5jdXJyZW50R2FtZS5wbGF5VHVybihjcHUsIHRydWUpXHJcblxyXG5cclxuZGlzcGxheUdhbWVib2FyZC5ncmlkKCdwbGF5ZXInKVxyXG4vLyBkaXNwbGF5R2FtZWJvYXJkLmdyaWQoJ2NwdScpXHJcbmRpc3BsYXlHYW1lYm9hcmQucmVuZGVyU2hpcHMoKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==