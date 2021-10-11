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
        console.log(allShips)
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
                    allShips.push(ship)
                }
            } 
        } else console.error('cannot put ship here')   
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

const computerPlay = (computer) => {

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
// player.gb.placeShip( player.gb.allShips[0], 0, 0)
// player.gb.placeShip( player.gb.allShips[1], 0, 5)
// player.gb.placeShip( player.gb.allShips[2], 1, 0)
// player.gb.placeShip( player.gb.allShips[3], 1, 3)
// player.gb.placeShip( player.gb.allShips[4], 1, 6)
// player.gb.receiveAttack(1,3)
// player.gb.receiveAttack(1,4)
// player.gb.receiveAttack(1,5)

console.log(player.gb)
console.log(player.gb.board)
// console.log(player.gb.verifyShips())


const newGame = (p1, p2) => {
    let turn = 0
    const placeShips = (player) => {
        player.gb.allShips.forEach((ship, i) => {
            let x = Math.floor(Math.random() * 10)
            let y = Math.floor(Math.random() * 10)
            player.gb.placeShip(ship, x, y)
        });
        console.log( player.gb.board)
    }
    const playTurns = () => {
        do {
            let x1 = Math.floor(Math.random() * 10)
            let y1 =  Math.floor(Math.random() * 10)
            p1.gb.receiveAttack(x1, y1)
            let x2 = Math.floor(Math.random() * 10)
            let y2 =  Math.floor(Math.random() * 10)
            p2.gb.receiveAttack(x2, y2)
        } while(p1.gb.verifyShips() !== 'sunk')
        console.log(p1.gb.verifyShips())
    }
    return {
        placeShips, 
        playTurns
    }
}

const currentGame = newGame(player, computer)
currentGame.placeShips(player)

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBcUM7QUFDckM7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLG1EQUFXO0FBQ25DLDJCQUEyQixtREFBVztBQUN0Qyx3QkFBd0IsbURBQVc7QUFDbkMsMEJBQTBCLG1EQUFXO0FBQ3JDLDBCQUEwQixtREFBVztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLGVBQWU7QUFDNUMsNENBQTRDO0FBQzVDO0FBQ0E7QUFDQSxjQUFjO0FBQ2QsNkJBQTZCLGVBQWU7QUFDNUMsNENBQTRDO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4RXVDO0FBQ3ZDO0FBQ087QUFDUCxlQUFlLHFEQUFTO0FBQ3hCO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDTztBQUNQO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ1Z3QztBQUN4QztBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBOzs7Ozs7O1VDbkJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTnVDO0FBQ0Y7QUFDckM7QUFDQTtBQUNBO0FBQ0EsZUFBZSxxREFBWTtBQUMzQixpQkFBaUIscURBQVk7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc2hpcEZhY3RvcnkgfSBmcm9tIFwiLi9zaGlwc1wiXHJcblxyXG5leHBvcnQgY29uc3QgZ2FtZWJvYXJkID0gKCkgPT4ge1xyXG4gICAgLy8geCBhbmQgeSBjb29yZHNcclxuICAgIGxldCBib2FyZCA9IEFycmF5KDEwKS5maWxsKHVuZGVmaW5lZCkubWFwKCh4KSA9PiBBcnJheSgxMCkuZmlsbCh1bmRlZmluZWQpKVxyXG4gICAgbGV0IGRpcmVjdGlvbiA9ICdob3Jpem9udGFsJ1xyXG4gICAgbGV0IHBsYWNlZFNoaXBzID0gW11cclxuICAgIGxldCBhbGxTaGlwcyA9IFtdXHJcbiAgICBsZXQgc3Vua1NoaXBzID0gW11cclxuICAgIGNvbnN0IGNyZWF0ZVNoaXBzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY29uc3QgY2FycmllciA9IHNoaXBGYWN0b3J5KCdDYXJyaWVyJywgNSlcclxuICAgICAgICBjb25zdCBiYXR0bGVzaGlwID0gc2hpcEZhY3RvcnkoJ0JhdHRsZXNoaXAnLCA0KVxyXG4gICAgICAgIGNvbnN0IGNydXNpZXIgPSBzaGlwRmFjdG9yeSgnQ3J1c2llcicsIDMpXHJcbiAgICAgICAgY29uc3Qgc3VibWFyaW5lID0gc2hpcEZhY3RvcnkoJ1N1Ym1hcmluZScsIDMpXHJcbiAgICAgICAgY29uc3QgZGVzdHJveWVyID0gc2hpcEZhY3RvcnkoJ0Rlc3Ryb3llcicsIDIpXHJcbiAgICAgICAgYWxsU2hpcHMucHVzaChjYXJyaWVyLCBiYXR0bGVzaGlwLCBjcnVzaWVyLCBzdWJtYXJpbmUsIGRlc3Ryb3llcilcclxuICAgICAgICBjb25zb2xlLmxvZyhhbGxTaGlwcylcclxuICAgICAgICByZXR1cm4gYWxsU2hpcHNcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwbGFjZVNoaXAgPSBmdW5jdGlvbihzaGlwLCB4LCB5KSB7XHJcbiAgICAgICAgaWYoYm9hcmRbeF1beV0gPT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGlmKGRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnICYmICh5ICsgKHNoaXAubGVuZ3RoLTEpIDwgYm9hcmRbeF0ubGVuZ3RoKSl7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxzaGlwLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJvYXJkW3hdW3kgKyBpXSA9IHtzaGlwLCBwb3NpdGlvbjogaX1cclxuICAgICAgICAgICAgICAgICAgICBpZihwbGFjZWRTaGlwcy5pbmRleE9mKHNoaXApID09PSAtMSkgcGxhY2VkU2hpcHMucHVzaChzaGlwKVxyXG4gICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgfSBlbHNlIGlmKGRpcmVjdGlvbiA9PT0gJ3ZlcnRpY2FsJyAmJiAoeCArIChzaGlwLmxlbmd0aC0xKSA8IGJvYXJkLmxlbmd0aCkpe1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8c2hpcC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib2FyZFt4ICsgaV1beV0gPSB7c2hpcCwgcG9zaXRpb246IGl9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocGxhY2VkU2hpcHMuaW5kZXhPZihzaGlwKSA9PT0gLTEpIHBsYWNlZFNoaXBzLnB1c2goc2hpcClcclxuICAgICAgICAgICAgICAgICAgICBhbGxTaGlwcy5wdXNoKHNoaXApXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgfSBlbHNlIGNvbnNvbGUuZXJyb3IoJ2Nhbm5vdCBwdXQgc2hpcCBoZXJlJykgICBcclxuICAgIH1cclxuICAgIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSBmdW5jdGlvbih4LCB5KXsgIFxyXG4gICAgICAgIGlmKCB0eXBlb2YgYm9hcmRbeF1beV0gPT09ICdvYmplY3QnKXtcclxuICAgICAgICAgICAgYm9hcmRbeF1beV0uc2hpcC5oaXQoYm9hcmRbeF1beV0ucG9zaXRpb24pXHJcbiAgICAgICAgICAgIGJvYXJkW3hdW3ldLnNoaXAuaXNTdW5rKClcclxuICAgICAgICAgICAgYm9hcmRbeF1beV0gPSAnaGl0J1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGJvYXJkW3hdW3ldID09PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBib2FyZFt4XVt5XSA9ICdtaXNzJ1xyXG4gICAgICAgIH1cclxuICAgICAgICB2ZXJpZnlTaGlwcygpXHJcbiAgICB9XHJcbiAgICBjb25zdCB2ZXJpZnlTaGlwcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGFsbFNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcclxuICAgICAgICAgICAgaWYoc2hpcC5pc1N1bmsoKSkgc3Vua1NoaXBzLnB1c2goc2hpcClcclxuICAgICAgICB9KVxyXG4gICAgICAgIGlmIChzdW5rU2hpcHMubGVuZ3RoID09PSA1KSByZXR1cm4gJ3N1bmsnXHJcbiAgICAgICAgZWxzZSByZXR1cm4gJ25vdCBzdW5rJ1xyXG4gICAgfVxyXG4gICAgY29uc3QgcmVzZXRBbGwgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIGFsbFNoaXBzID0gW11cclxuICAgICAgICBwbGFjZWRTaGlwcyA9IFtdXHJcbiAgICAgICAgbGV0IGJvYXJkID0gQXJyYXkoMTApLmZpbGwodW5kZWZpbmVkKS5tYXAoKHgpID0+IEFycmF5KDEwKS5maWxsKHVuZGVmaW5lZCkpXHJcbiAgICAgICAgcmV0dXJuIGFsbFNoaXBzLCBwbGFjZWRTaGlwcywgYm9hcmRcclxuICAgIH1cclxuICAgIHJldHVybntcclxuICAgICAgICBib2FyZCxcclxuICAgICAgICBkaXJlY3Rpb24sXHJcbiAgICAgICAgcGxhY2VkU2hpcHMsXHJcbiAgICAgICAgYWxsU2hpcHMsXHJcbiAgICAgICAgY3JlYXRlU2hpcHMsXHJcbiAgICAgICAgcGxhY2VTaGlwLFxyXG4gICAgICAgIHJlY2VpdmVBdHRhY2ssXHJcbiAgICAgICAgdmVyaWZ5U2hpcHMsXHJcbiAgICAgICAgcmVzZXRBbGxcclxuICAgIH1cclxufVxyXG5cclxuIiwiaW1wb3J0IHsgZ2FtZWJvYXJkIH0gZnJvbSBcIi4vZ2FtZWJvYXJkXCJcclxuXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVQbGF5ZXIgPSAobmFtZSkgPT4ge1xyXG4gICAgY29uc3QgZ2IgPSBnYW1lYm9hcmQoKVxyXG5cclxuICAgIHJldHVybiB7bmFtZSwgZ2J9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBjb21wdXRlclBsYXkgPSAoY29tcHV0ZXIpID0+IHtcclxuXHJcbn0iLCJpbXBvcnQgeyBnYW1lYm9hcmQgfSBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBzaGlwRmFjdG9yeSA9IChuYW1lLCBsZW4pID0+IHtcclxuICAgIGNvbnN0IGlkID0gbmFtZVxyXG4gICAgY29uc3QgbGVuZ3RoID0gbGVuXHJcbiAgICBsZXQgaGl0UG9zaXRpb24gPSBbXVxyXG4gICAgbGV0IHN1bmsgPSBmYWxzZVxyXG4gICAgY29uc3QgaGl0ID0gZnVuY3Rpb24ocG9zKSB7XHJcbiAgICAgICAgdGhpcy5oaXRQb3NpdGlvbi5wdXNoKHBvcylcclxuICAgICAgICByZXR1cm4gaGl0UG9zaXRpb25cclxuICAgIH1cclxuICAgIGNvbnN0IGlzU3VuayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmKGhpdFBvc2l0aW9uLmxlbmd0aCA9PT0gbGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3VuayA9IHRydWVcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3Vua1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtpZCwgbGVuZ3RoLCBoaXRQb3NpdGlvbiwgc3VuaywgaGl0LCBpc1N1bmt9XHJcbn1cclxuXHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZ2FtZWJvYXJkIH0gZnJvbSBcIi4vZ2FtZWJvYXJkXCJcclxuaW1wb3J0IHtjcmVhdGVQbGF5ZXJ9IGZyb20gJy4vcGxheWVyJ1xyXG5cclxuXHJcblxyXG5jb25zdCBwbGF5ZXIgPSBjcmVhdGVQbGF5ZXIoJ2x1bWEnKVxyXG5jb25zdCBjb21wdXRlciA9IGNyZWF0ZVBsYXllcigncGMnKVxyXG5wbGF5ZXIuZ2IuY3JlYXRlU2hpcHMoKVxyXG5jb21wdXRlci5nYi5jcmVhdGVTaGlwcygpXHJcbi8vIHBsYXllci5nYi5wbGFjZVNoaXAoIHBsYXllci5nYi5hbGxTaGlwc1swXSwgMCwgMClcclxuLy8gcGxheWVyLmdiLnBsYWNlU2hpcCggcGxheWVyLmdiLmFsbFNoaXBzWzFdLCAwLCA1KVxyXG4vLyBwbGF5ZXIuZ2IucGxhY2VTaGlwKCBwbGF5ZXIuZ2IuYWxsU2hpcHNbMl0sIDEsIDApXHJcbi8vIHBsYXllci5nYi5wbGFjZVNoaXAoIHBsYXllci5nYi5hbGxTaGlwc1szXSwgMSwgMylcclxuLy8gcGxheWVyLmdiLnBsYWNlU2hpcCggcGxheWVyLmdiLmFsbFNoaXBzWzRdLCAxLCA2KVxyXG4vLyBwbGF5ZXIuZ2IucmVjZWl2ZUF0dGFjaygxLDMpXHJcbi8vIHBsYXllci5nYi5yZWNlaXZlQXR0YWNrKDEsNClcclxuLy8gcGxheWVyLmdiLnJlY2VpdmVBdHRhY2soMSw1KVxyXG5cclxuY29uc29sZS5sb2cocGxheWVyLmdiKVxyXG5jb25zb2xlLmxvZyhwbGF5ZXIuZ2IuYm9hcmQpXHJcbi8vIGNvbnNvbGUubG9nKHBsYXllci5nYi52ZXJpZnlTaGlwcygpKVxyXG5cclxuXHJcbmNvbnN0IG5ld0dhbWUgPSAocDEsIHAyKSA9PiB7XHJcbiAgICBsZXQgdHVybiA9IDBcclxuICAgIGNvbnN0IHBsYWNlU2hpcHMgPSAocGxheWVyKSA9PiB7XHJcbiAgICAgICAgcGxheWVyLmdiLmFsbFNoaXBzLmZvckVhY2goKHNoaXAsIGkpID0+IHtcclxuICAgICAgICAgICAgbGV0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMClcclxuICAgICAgICAgICAgbGV0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMClcclxuICAgICAgICAgICAgcGxheWVyLmdiLnBsYWNlU2hpcChzaGlwLCB4LCB5KVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCBwbGF5ZXIuZ2IuYm9hcmQpXHJcbiAgICB9XHJcbiAgICBjb25zdCBwbGF5VHVybnMgPSAoKSA9PiB7XHJcbiAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICBsZXQgeDEgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMClcclxuICAgICAgICAgICAgbGV0IHkxID0gIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKVxyXG4gICAgICAgICAgICBwMS5nYi5yZWNlaXZlQXR0YWNrKHgxLCB5MSlcclxuICAgICAgICAgICAgbGV0IHgyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApXHJcbiAgICAgICAgICAgIGxldCB5MiA9ICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMClcclxuICAgICAgICAgICAgcDIuZ2IucmVjZWl2ZUF0dGFjayh4MiwgeTIpXHJcbiAgICAgICAgfSB3aGlsZShwMS5nYi52ZXJpZnlTaGlwcygpICE9PSAnc3VuaycpXHJcbiAgICAgICAgY29uc29sZS5sb2cocDEuZ2IudmVyaWZ5U2hpcHMoKSlcclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcGxhY2VTaGlwcywgXHJcbiAgICAgICAgcGxheVR1cm5zXHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IGN1cnJlbnRHYW1lID0gbmV3R2FtZShwbGF5ZXIsIGNvbXB1dGVyKVxyXG5jdXJyZW50R2FtZS5wbGFjZVNoaXBzKHBsYXllcilcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9