export const shipFactory = (name, len) => {
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

