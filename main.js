/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
    const createShips = function() {
        const carrier = (0,_ships__WEBPACK_IMPORTED_MODULE_0__.shipFactory)('Carrier', 5)
        const battleship = (0,_ships__WEBPACK_IMPORTED_MODULE_0__.shipFactory)('Battleship', 4)
        const crusier = (0,_ships__WEBPACK_IMPORTED_MODULE_0__.shipFactory)('Crusier', 3)
        const submarine = (0,_ships__WEBPACK_IMPORTED_MODULE_0__.shipFactory)('Submarine', 3)
        const destroyer = (0,_ships__WEBPACK_IMPORTED_MODULE_0__.shipFactory)('Destroyer', 2)
        allShips.push(carrier, battleship, crusier, submarine, destroyer)
        return allShips
    }

    const placeShip = function(ship, x, y) {
        if(board[x][y] === undefined){
            if(direction === 'horizontal' && (y + (ship.length-1) < board[x].length)){
                for(let i=0; i<ship.length; i++){
                    this.board[x][y + i] = {ship, position: i}
                    if(placedShips.indexOf(ship) === -1) placedShips.push(ship)
                } 
            } else if(direction === 'vertical' && (x + (ship.length-1) < board.length)){
                for(let i=0; i<ship.length; i++){
                    this.board[x + i][y] = {ship, position: i}
                    if(placedShips.indexOf(ship) === -1) placedShips.push(ship)
                }
            } 
            return 'happy'
        } else {
            return 'invalid position'
        }  
    }
    const receiveAttack = function(x, y){  
        if( typeof board[x][y] === 'object'){
            board[x][y].ship.hit(board[x][y].position)
            board[x][y].ship.isSunk()
            board[x][y] = 'hit'
        }
        else if(board[x][y] === undefined){
            board[x][y] = 'miss'
        }
        verifyShips()
    }
    const verifyShips = function() {
        allShips.forEach((ship) => {
            if(ship.isSunk()) sunkShips.push(ship)
        })
        if (sunkShips.length === 5) return 'sunk'
        else return 'not sunk'
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
        createShips,
        placeShip,
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
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/player.js");





const player = (0,_player__WEBPACK_IMPORTED_MODULE_1__.createPlayer)('luma')
const computer = (0,_player__WEBPACK_IMPORTED_MODULE_1__.createPlayer)('pc')
player.gb.createShips()
computer.gb.createShips()


const newGame = (p1, p2) => {
    let turn = 0
    const placeShips = (player) => {
        player.gb.allShips.forEach((ship, i) => {
            let x = Math.floor(Math.random() * 10)
            let y = Math.floor(Math.random() * 10)
            
            
            if (player.gb.placeShip(ship, x, y) === 'invalid position'){console.error(ship)
                do{
                    x = Math.floor(Math.random() * 10)
                    y = Math.floor(Math.random() * 10)
                    player.gb.placeShip(ship, x, y)
                    console.log(player.gb.placeShip(ship, x, y), ship)
                }while(player.gb.placeShip(ship, x, y) === 'invalid position')
           } else player.gb.placeShip(ship, x, y)
           console.log(ship)
        })
        console.log( player.gb.board, player.gb.placedShips )
    } 
    const playTurns = () => {
        do {
            let coords = (0,_player__WEBPACK_IMPORTED_MODULE_1__.computerPlay)()
            p1.gb.receiveAttack(coords[0], coords[1])
            let coords1 = (0,_player__WEBPACK_IMPORTED_MODULE_1__.computerPlay)()
            p2.gb.receiveAttack(coords1[0], coords1[1])
        } while(p1.gb.verifyShips() !== 'sunk')
        console.log(p1.gb.verifyShips(), p1.gb.board, p2.gb.board)
    }
    return {
        placeShips, 
        playTurns
    }
}

const currentGame = newGame(player, computer)
currentGame.placeShips(player)
// console.log(player.gb.placedShips)
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBcUM7QUFDckM7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLG1EQUFXO0FBQ25DLDJCQUEyQixtREFBVztBQUN0Qyx3QkFBd0IsbURBQVc7QUFDbkMsMEJBQTBCLG1EQUFXO0FBQ3JDLDBCQUEwQixtREFBVztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixlQUFlO0FBQzVDLDRDQUE0QztBQUM1QztBQUNBO0FBQ0EsY0FBYztBQUNkLDZCQUE2QixlQUFlO0FBQzVDLDRDQUE0QztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3pFdUM7QUFDdkM7QUFDTztBQUNQLGVBQWUscURBQVM7QUFDeEI7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ1p3QztBQUN4QztBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBOzs7Ozs7O1VDbkJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTnVDO0FBQ1k7QUFDbkQ7QUFDQTtBQUNBO0FBQ0EsZUFBZSxxREFBWTtBQUMzQixpQkFBaUIscURBQVk7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0VBQXdFO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLHFEQUFZO0FBQ3JDO0FBQ0EsMEJBQTBCLHFEQUFZO0FBQ3RDO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNoaXBGYWN0b3J5IH0gZnJvbSBcIi4vc2hpcHNcIlxyXG5cclxuZXhwb3J0IGNvbnN0IGdhbWVib2FyZCA9ICgpID0+IHtcclxuICAgIC8vIHggYW5kIHkgY29vcmRzXHJcbiAgICBsZXQgYm9hcmQgPSBBcnJheSgxMCkuZmlsbCh1bmRlZmluZWQpLm1hcCgoeCkgPT4gQXJyYXkoMTApLmZpbGwodW5kZWZpbmVkKSlcclxuICAgIGxldCBkaXJlY3Rpb24gPSAnaG9yaXpvbnRhbCdcclxuICAgIGxldCBwbGFjZWRTaGlwcyA9IFtdXHJcbiAgICBsZXQgYWxsU2hpcHMgPSBbXVxyXG4gICAgbGV0IHN1bmtTaGlwcyA9IFtdXHJcbiAgICBjb25zdCBjcmVhdGVTaGlwcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbnN0IGNhcnJpZXIgPSBzaGlwRmFjdG9yeSgnQ2FycmllcicsIDUpXHJcbiAgICAgICAgY29uc3QgYmF0dGxlc2hpcCA9IHNoaXBGYWN0b3J5KCdCYXR0bGVzaGlwJywgNClcclxuICAgICAgICBjb25zdCBjcnVzaWVyID0gc2hpcEZhY3RvcnkoJ0NydXNpZXInLCAzKVxyXG4gICAgICAgIGNvbnN0IHN1Ym1hcmluZSA9IHNoaXBGYWN0b3J5KCdTdWJtYXJpbmUnLCAzKVxyXG4gICAgICAgIGNvbnN0IGRlc3Ryb3llciA9IHNoaXBGYWN0b3J5KCdEZXN0cm95ZXInLCAyKVxyXG4gICAgICAgIGFsbFNoaXBzLnB1c2goY2FycmllciwgYmF0dGxlc2hpcCwgY3J1c2llciwgc3VibWFyaW5lLCBkZXN0cm95ZXIpXHJcbiAgICAgICAgcmV0dXJuIGFsbFNoaXBzXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcGxhY2VTaGlwID0gZnVuY3Rpb24oc2hpcCwgeCwgeSkge1xyXG4gICAgICAgIGlmKGJvYXJkW3hdW3ldID09PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBpZihkaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJyAmJiAoeSArIChzaGlwLmxlbmd0aC0xKSA8IGJvYXJkW3hdLmxlbmd0aCkpe1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8c2hpcC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib2FyZFt4XVt5ICsgaV0gPSB7c2hpcCwgcG9zaXRpb246IGl9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocGxhY2VkU2hpcHMuaW5kZXhPZihzaGlwKSA9PT0gLTEpIHBsYWNlZFNoaXBzLnB1c2goc2hpcClcclxuICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZihkaXJlY3Rpb24gPT09ICd2ZXJ0aWNhbCcgJiYgKHggKyAoc2hpcC5sZW5ndGgtMSkgPCBib2FyZC5sZW5ndGgpKXtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPHNoaXAubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm9hcmRbeCArIGldW3ldID0ge3NoaXAsIHBvc2l0aW9uOiBpfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHBsYWNlZFNoaXBzLmluZGV4T2Yoc2hpcCkgPT09IC0xKSBwbGFjZWRTaGlwcy5wdXNoKHNoaXApXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIHJldHVybiAnaGFwcHknXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuICdpbnZhbGlkIHBvc2l0aW9uJ1xyXG4gICAgICAgIH0gIFxyXG4gICAgfVxyXG4gICAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IGZ1bmN0aW9uKHgsIHkpeyAgXHJcbiAgICAgICAgaWYoIHR5cGVvZiBib2FyZFt4XVt5XSA9PT0gJ29iamVjdCcpe1xyXG4gICAgICAgICAgICBib2FyZFt4XVt5XS5zaGlwLmhpdChib2FyZFt4XVt5XS5wb3NpdGlvbilcclxuICAgICAgICAgICAgYm9hcmRbeF1beV0uc2hpcC5pc1N1bmsoKVxyXG4gICAgICAgICAgICBib2FyZFt4XVt5XSA9ICdoaXQnXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoYm9hcmRbeF1beV0gPT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGJvYXJkW3hdW3ldID0gJ21pc3MnXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZlcmlmeVNoaXBzKClcclxuICAgIH1cclxuICAgIGNvbnN0IHZlcmlmeVNoaXBzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgYWxsU2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xyXG4gICAgICAgICAgICBpZihzaGlwLmlzU3VuaygpKSBzdW5rU2hpcHMucHVzaChzaGlwKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaWYgKHN1bmtTaGlwcy5sZW5ndGggPT09IDUpIHJldHVybiAnc3VuaydcclxuICAgICAgICBlbHNlIHJldHVybiAnbm90IHN1bmsnXHJcbiAgICB9XHJcbiAgICBjb25zdCByZXNldEFsbCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgYWxsU2hpcHMgPSBbXVxyXG4gICAgICAgIHBsYWNlZFNoaXBzID0gW11cclxuICAgICAgICBsZXQgYm9hcmQgPSBBcnJheSgxMCkuZmlsbCh1bmRlZmluZWQpLm1hcCgoeCkgPT4gQXJyYXkoMTApLmZpbGwodW5kZWZpbmVkKSlcclxuICAgICAgICByZXR1cm4gYWxsU2hpcHMsIHBsYWNlZFNoaXBzLCBib2FyZFxyXG4gICAgfVxyXG4gICAgcmV0dXJue1xyXG4gICAgICAgIGJvYXJkLFxyXG4gICAgICAgIGRpcmVjdGlvbixcclxuICAgICAgICBwbGFjZWRTaGlwcyxcclxuICAgICAgICBhbGxTaGlwcyxcclxuICAgICAgICBjcmVhdGVTaGlwcyxcclxuICAgICAgICBwbGFjZVNoaXAsXHJcbiAgICAgICAgcmVjZWl2ZUF0dGFjayxcclxuICAgICAgICB2ZXJpZnlTaGlwcyxcclxuICAgICAgICByZXNldEFsbFxyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBnYW1lYm9hcmQgfSBmcm9tIFwiLi9nYW1lYm9hcmRcIlxyXG5cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZVBsYXllciA9IChuYW1lKSA9PiB7XHJcbiAgICBjb25zdCBnYiA9IGdhbWVib2FyZCgpXHJcblxyXG4gICAgcmV0dXJuIHtuYW1lLCBnYn1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGNvbXB1dGVyUGxheSA9ICgpID0+IHtcclxuICAgIGxldCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApXHJcbiAgICBsZXQgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKVxyXG4gICAgcmV0dXJuIFt4LHldXHJcbn0iLCJpbXBvcnQgeyBnYW1lYm9hcmQgfSBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBzaGlwRmFjdG9yeSA9IChuYW1lLCBsZW4pID0+IHtcclxuICAgIGNvbnN0IGlkID0gbmFtZVxyXG4gICAgY29uc3QgbGVuZ3RoID0gbGVuXHJcbiAgICBsZXQgaGl0UG9zaXRpb24gPSBbXVxyXG4gICAgbGV0IHN1bmsgPSBmYWxzZVxyXG4gICAgY29uc3QgaGl0ID0gZnVuY3Rpb24ocG9zKSB7XHJcbiAgICAgICAgdGhpcy5oaXRQb3NpdGlvbi5wdXNoKHBvcylcclxuICAgICAgICByZXR1cm4gaGl0UG9zaXRpb25cclxuICAgIH1cclxuICAgIGNvbnN0IGlzU3VuayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmKGhpdFBvc2l0aW9uLmxlbmd0aCA9PT0gbGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3VuayA9IHRydWVcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3Vua1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtpZCwgbGVuZ3RoLCBoaXRQb3NpdGlvbiwgc3VuaywgaGl0LCBpc1N1bmt9XHJcbn1cclxuXHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZ2FtZWJvYXJkIH0gZnJvbSBcIi4vZ2FtZWJvYXJkXCJcclxuaW1wb3J0IHtjcmVhdGVQbGF5ZXIsIGNvbXB1dGVyUGxheX0gZnJvbSAnLi9wbGF5ZXInXHJcblxyXG5cclxuXHJcbmNvbnN0IHBsYXllciA9IGNyZWF0ZVBsYXllcignbHVtYScpXHJcbmNvbnN0IGNvbXB1dGVyID0gY3JlYXRlUGxheWVyKCdwYycpXHJcbnBsYXllci5nYi5jcmVhdGVTaGlwcygpXHJcbmNvbXB1dGVyLmdiLmNyZWF0ZVNoaXBzKClcclxuXHJcblxyXG5jb25zdCBuZXdHYW1lID0gKHAxLCBwMikgPT4ge1xyXG4gICAgbGV0IHR1cm4gPSAwXHJcbiAgICBjb25zdCBwbGFjZVNoaXBzID0gKHBsYXllcikgPT4ge1xyXG4gICAgICAgIHBsYXllci5nYi5hbGxTaGlwcy5mb3JFYWNoKChzaGlwLCBpKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApXHJcbiAgICAgICAgICAgIGxldCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHBsYXllci5nYi5wbGFjZVNoaXAoc2hpcCwgeCwgeSkgPT09ICdpbnZhbGlkIHBvc2l0aW9uJyl7Y29uc29sZS5lcnJvcihzaGlwKVxyXG4gICAgICAgICAgICAgICAgZG97XHJcbiAgICAgICAgICAgICAgICAgICAgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKVxyXG4gICAgICAgICAgICAgICAgICAgIHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMClcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuZ2IucGxhY2VTaGlwKHNoaXAsIHgsIHkpXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocGxheWVyLmdiLnBsYWNlU2hpcChzaGlwLCB4LCB5KSwgc2hpcClcclxuICAgICAgICAgICAgICAgIH13aGlsZShwbGF5ZXIuZ2IucGxhY2VTaGlwKHNoaXAsIHgsIHkpID09PSAnaW52YWxpZCBwb3NpdGlvbicpXHJcbiAgICAgICAgICAgfSBlbHNlIHBsYXllci5nYi5wbGFjZVNoaXAoc2hpcCwgeCwgeSlcclxuICAgICAgICAgICBjb25zb2xlLmxvZyhzaGlwKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgY29uc29sZS5sb2coIHBsYXllci5nYi5ib2FyZCwgcGxheWVyLmdiLnBsYWNlZFNoaXBzIClcclxuICAgIH0gXHJcbiAgICBjb25zdCBwbGF5VHVybnMgPSAoKSA9PiB7XHJcbiAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICBsZXQgY29vcmRzID0gY29tcHV0ZXJQbGF5KClcclxuICAgICAgICAgICAgcDEuZ2IucmVjZWl2ZUF0dGFjayhjb29yZHNbMF0sIGNvb3Jkc1sxXSlcclxuICAgICAgICAgICAgbGV0IGNvb3JkczEgPSBjb21wdXRlclBsYXkoKVxyXG4gICAgICAgICAgICBwMi5nYi5yZWNlaXZlQXR0YWNrKGNvb3JkczFbMF0sIGNvb3JkczFbMV0pXHJcbiAgICAgICAgfSB3aGlsZShwMS5nYi52ZXJpZnlTaGlwcygpICE9PSAnc3VuaycpXHJcbiAgICAgICAgY29uc29sZS5sb2cocDEuZ2IudmVyaWZ5U2hpcHMoKSwgcDEuZ2IuYm9hcmQsIHAyLmdiLmJvYXJkKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBwbGFjZVNoaXBzLCBcclxuICAgICAgICBwbGF5VHVybnNcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgY3VycmVudEdhbWUgPSBuZXdHYW1lKHBsYXllciwgY29tcHV0ZXIpXHJcbmN1cnJlbnRHYW1lLnBsYWNlU2hpcHMocGxheWVyKVxyXG4vLyBjb25zb2xlLmxvZyhwbGF5ZXIuZ2IucGxhY2VkU2hpcHMpIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9