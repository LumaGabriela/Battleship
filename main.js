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
/* harmony export */   "submarine": () => (/* binding */ submarine),
/* harmony export */   "gameboard": () => (/* binding */ gameboard)
/* harmony export */ });
/* harmony import */ var _ships__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ships */ "./src/ships.js");


const battleship = (0,_ships__WEBPACK_IMPORTED_MODULE_0__.shipFactory)('Battleship', 5)
const submarine = (0,_ships__WEBPACK_IMPORTED_MODULE_0__.shipFactory)('Submarine', 3)

const gameboard = (() => {
    // x and y coords
    let board = Array(10).fill(null).map((x) => Array(10).fill(null))
    const direction = 'horizontal'
    console.log(board)
    const placeShip = function(ship, x, y) {
        if(direction === 'vertical' && (y + (ship.length-1) < board[x].length)){
            for(let i=0; i<ship.length; i++){
                this.board[x][y + i] = ship
            } 
        } else if(direction === 'horizontal' && (x + (ship.length-1) < board.length)){
            for(let i=0; i<ship.length; i++){
                this.board[x + i][y] = ship
            }
        }
        
    }
    const reveiveAttack = function(x, y){
        
    }
    return{
        board,
        placeShip,
        reveiveAttack
    }
})()



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

_gameboard__WEBPACK_IMPORTED_MODULE_0__.gameboard.placeShip( _gameboard__WEBPACK_IMPORTED_MODULE_0__.submarine, 0, 7)

console.log(_gameboard__WEBPACK_IMPORTED_MODULE_0__.gameboard.board)
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQXFDO0FBQ3JDO0FBQ0EsbUJBQW1CLG1EQUFXO0FBQ3ZCLGtCQUFrQixtREFBVztBQUNwQztBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLGVBQWU7QUFDeEM7QUFDQTtBQUNBLFVBQVU7QUFDVix5QkFBeUIsZUFBZTtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7Ozs7Ozs7Ozs7Ozs7OztBQy9Cd0M7QUFDeEM7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTs7Ozs7OztVQ25CQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTmtEO0FBQ2xELDJEQUFtQixFQUFFLGlEQUFTO0FBQzlCO0FBQ0EsWUFBWSx1REFBZSxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzaGlwRmFjdG9yeSB9IGZyb20gXCIuL3NoaXBzXCJcclxuXHJcbmNvbnN0IGJhdHRsZXNoaXAgPSBzaGlwRmFjdG9yeSgnQmF0dGxlc2hpcCcsIDUpXHJcbmV4cG9ydCBjb25zdCBzdWJtYXJpbmUgPSBzaGlwRmFjdG9yeSgnU3VibWFyaW5lJywgMylcclxuXHJcbmV4cG9ydCBjb25zdCBnYW1lYm9hcmQgPSAoKCkgPT4ge1xyXG4gICAgLy8geCBhbmQgeSBjb29yZHNcclxuICAgIGxldCBib2FyZCA9IEFycmF5KDEwKS5maWxsKG51bGwpLm1hcCgoeCkgPT4gQXJyYXkoMTApLmZpbGwobnVsbCkpXHJcbiAgICBjb25zdCBkaXJlY3Rpb24gPSAnaG9yaXpvbnRhbCdcclxuICAgIGNvbnNvbGUubG9nKGJvYXJkKVxyXG4gICAgY29uc3QgcGxhY2VTaGlwID0gZnVuY3Rpb24oc2hpcCwgeCwgeSkge1xyXG4gICAgICAgIGlmKGRpcmVjdGlvbiA9PT0gJ3ZlcnRpY2FsJyAmJiAoeSArIChzaGlwLmxlbmd0aC0xKSA8IGJvYXJkW3hdLmxlbmd0aCkpe1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxzaGlwLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmRbeF1beSArIGldID0gc2hpcFxyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH0gZWxzZSBpZihkaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJyAmJiAoeCArIChzaGlwLmxlbmd0aC0xKSA8IGJvYXJkLmxlbmd0aCkpe1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxzaGlwLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmRbeCArIGldW3ldID0gc2hpcFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgY29uc3QgcmV2ZWl2ZUF0dGFjayA9IGZ1bmN0aW9uKHgsIHkpe1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgcmV0dXJue1xyXG4gICAgICAgIGJvYXJkLFxyXG4gICAgICAgIHBsYWNlU2hpcCxcclxuICAgICAgICByZXZlaXZlQXR0YWNrXHJcbiAgICB9XHJcbn0pKClcclxuXHJcbiIsImltcG9ydCB7IGdhbWVib2FyZCB9IGZyb20gXCIuL2dhbWVib2FyZFwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IHNoaXBGYWN0b3J5ID0gKG5hbWUsIGxlbikgPT4ge1xyXG4gICAgY29uc3QgaWQgPSBuYW1lXHJcbiAgICBjb25zdCBsZW5ndGggPSBsZW5cclxuICAgIGxldCBoaXRQb3NpdGlvbiA9IFtdXHJcbiAgICBsZXQgc3VuayA9IGZhbHNlXHJcbiAgICBjb25zdCBoaXQgPSBmdW5jdGlvbihwb3MpIHtcclxuICAgICAgICB0aGlzLmhpdFBvc2l0aW9uLnB1c2gocG9zKVxyXG4gICAgICAgIHJldHVybiBoaXRQb3NpdGlvblxyXG4gICAgfVxyXG4gICAgY29uc3QgaXNTdW5rID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYoaGl0UG9zaXRpb24ubGVuZ3RoID09PSBsZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5zdW5rID0gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5zdW5rXHJcbiAgICB9XHJcbiAgICByZXR1cm4ge2lkLCBsZW5ndGgsIGhpdFBvc2l0aW9uLCBzdW5rLCBoaXQsIGlzU3Vua31cclxufVxyXG5cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBnYW1lYm9hcmQgLCBzdWJtYXJpbmV9IGZyb20gXCIuL2dhbWVib2FyZFwiXHJcbmdhbWVib2FyZC5wbGFjZVNoaXAoIHN1Ym1hcmluZSwgMCwgNylcclxuXHJcbmNvbnNvbGUubG9nKGdhbWVib2FyZC5ib2FyZCkiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=