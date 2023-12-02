const fs = require('fs');
const path = require('path');

let sum = 0;

const data = fs.readFileSync(path.join(__dirname,'data.txt'), 'utf8');

data.split('\n').forEach((row) => {
    const [strId, strGame] = row.split(':')
    const id= Number(strId?.replaceAll(/\D/g,''));
    const games = strGame?.split(';');
    const colorMapping = {
        'red': 1,
        'green': 1,
        'blue': 1
    }
    for(const game of games) {
        const colors = game.split(',');

        for(const numberColor of colors) {
            const [number, color] = numberColor.trim().split(' ');
            if(colorMapping[color] < Number(number)) {
                colorMapping[color] = Number(number);
            }
        }
    }
    const multipliedSum = Object.values(colorMapping).reduce((a, b)=> a*b, 1);
    console.log(multipliedSum);
    sum += multipliedSum;
    // if(areAllGamesValid) {
    //     sum += id
    // }
});

console.log('sum', sum)
