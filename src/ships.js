export const shipFactory = (name, len) => {
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

