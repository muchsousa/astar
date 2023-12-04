const readline = require('node:readline');
const { readFileSync } = require('node:fs');
const path = require('node:path');

const A_Star = require('./A-star');

const filename = path.resolve(__dirname, process.argv[2]);
const fileData = readFileSync(filename, 'utf8');

const [gridSize, _initialPosition, ...gridRows] = fileData
    .split(/\r?\n/) // split lines
    .map(lines => lines.split(' ').filter(line => line));

// ----------------------------------------------------------------

const a_star = new A_Star(gridSize, gridRows);

a_star.setInitialPosition({
    x: _initialPosition[0],
    y: _initialPosition[1],
});


const rl = readline.createInterface({ 
    input: process.stdin,
    output: process.stdout
});

rl.question('Which position do you want to go? ', position => {
    
    const _finalPosition = position.split(' ').filter(position => position);
    a_star.setFinalPosition({
        x: _finalPosition[0],
        y: _finalPosition[1]
    });

    const result = a_star.execute();

    const PRINT_GRID = true;
    if (PRINT_GRID) {
        const grid = a_star.prettyGrid(result.paths);
        console.log(grid);
    }

    const paths = result.paths.map(path => `${path.x},${path.y}`).join(' ');
    console.log(`${result.cost} ${paths}`);

    rl.close();
});
