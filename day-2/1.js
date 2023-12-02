const fs = require('fs');
const path = require('path');

let sum = 0;
const mapping = {
    'red': 12,
    'green': 13,
    'blue': 14
}

const data = fs.readFileSync(path.join(__dirname,'data.txt'), 'utf8');

data.split('\n').forEach((row) => {
    const [strId, strGame] = row.split(':')
    const id= Number(strId?.replaceAll(/\D/g,''));
    const games = strGame?.split(';');
    let gamesInRowValidity = [];
    for(const game of games) {
        const colors = game.split(',');
        let gamesValidity = [];
        for(const numberColor of colors) {
            const [number, color] = numberColor.trim().split(' ');
            gamesValidity.push(Number(number) <= mapping[color]);
        }
        gamesInRowValidity.push(gamesValidity.every((game) => game));
    }
    const areAllGamesValid = gamesInRowValidity.every((game) => game);
    if(areAllGamesValid) {
        sum += id
    }
});

console.log('sum', sum)
