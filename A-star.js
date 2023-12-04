const PriorityQueue = require('./PriorityQueue');

class A_Star {

    constructor(gridSize, grid) {
        const [width, height] = gridSize;
        this.width = Number(width);
        this.height = Number(height);

        this.grid = grid;
    
        this.initialPosition = {};
        this.finalPosition = {};
    }

    _validatePosition(position) {
        if (typeof position.x === "undefined" || typeof position.y === "undefined")
            throw Error('expected X and Y positions');

        if (position.x < 0 || position.x > (this.width - 1))
            throw Error('position X invalid');

        if (position.y < 0 || position.y > (this.height - 1))
            throw Error('position y invalid');

        if (this.grid && this.grid[position.y][position.x] === '-1')
            throw Error('invalid position');       
    }

    setFinalPosition(position) {
        this._validatePosition(position);
        this.finalPosition = { x: Number(position.x), y: Number(position.y) };
    }

    setInitialPosition(position) {
        this._validatePosition(position);
        this.initialPosition = { x: Number(position.x), y: Number(position.y) };
    }

    prettyGrid(paths = []) {
        return '\n' + this.grid.map((row, y) => {
            return row.map((column, x) => {
                let columnChar = column;

                const isBlock = columnChar === '-1';
                if (isBlock)
                    columnChar = '\x1B[31m' + '#' + '\x1B[0m';

                const isInitialPosition = x == this.initialPosition.x && y == this.initialPosition.y;
                if (isInitialPosition)
                    columnChar = '\x1B[32m' + 'X' + '\x1B[0m';

                const isFinalPosition = x == this.finalPosition.x && y == this.finalPosition.y;
                if (isFinalPosition)
                    columnChar = '\x1B[33m' + 'Y' + '\x1B[0m';

                const isPath = paths.some(path => path.x === x && path.y === y)
                if (isPath && !isInitialPosition && !isFinalPosition)
                    columnChar = '\x1B[34m' + '*' + '\x1B[0m';

                return ` ${columnChar} `
            }).join('')
            
        }).join('\n') + '\n';
    }

    _getNeighbors(current) {
        const x = Number(current.x);
        const y = Number(current.y);

        const neighbors = [];

        // top
        if (y > 0 && this.grid[y - 1][x] !== '-1')
            neighbors.push({ x: x, y: y - 1  });

        // bottom
        if (y < (this.height - 1) && this.grid[y + 1][x] !== '-1')
            neighbors.push({ x: x, y: y + 1  });

        // left
        if (x > 0 && this.grid[y][x - 1] !== '-1')
            neighbors.push({ x: x - 1, y: y });

        // right
        if (x < (this.width - 1) && this.grid[y][x + 1] !== '-1')
            neighbors.push({ x: x + 1, y: y });

        return neighbors;
    }

    _isFinal(position) {
        return position.x === this.finalPosition.x && position.y === this.finalPosition.y
    }

    _getCost(position) {
        const MININUM_COST = 1;

        return Number(this.grid[position.y][position.x]) || MININUM_COST;
    }

    execute() {
        const priorityQueue = new PriorityQueue();

        let paths = new Map();
        const totalCost = new Map();

        priorityQueue.enqueue(this.initialPosition, 0);

        paths.set(0, this.initialPosition);
        totalCost.set(`${this.initialPosition.x}_${this.initialPosition.y}`, 0); // initial cost


        while (!priorityQueue.isEmpty()) {
            const current = priorityQueue.dequeue();

            if (this._isFinal(current)) {
                break; // end
            }

            const neighbors = this._getNeighbors(current.element);
            for (const next of neighbors) {
                const currentCost = Number(totalCost.get(`${current.element.x}_${current.element.y}`) || 0);
                const newCost = currentCost + this._getCost(next); 

                const nextCost = totalCost.get(`${next.x}_${next.y}`);
                if (!nextCost || newCost < nextCost) {
                    totalCost.set(`${next.x}_${next.y}`, newCost);

                    priorityQueue.enqueue(next, newCost); // priority is the cost

                    if (!paths.has(current.priority))
                        paths.set(current.priority, current.element);

                }
            }
        }

        paths = [...paths.values(), this.finalPosition];

        return { 
            cost: totalCost.get(`${this.finalPosition.x}_${this.finalPosition.y}`),
            paths: paths
        }
    }

}

module.exports = A_Star;