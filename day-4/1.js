const fs = require('fs');
const path = require('path');
const data = fs.readFileSync(path.join(__dirname,'data.txt'), 'utf8');
const rows = data.split('\n');
let sum = 0;

for(const row of rows) {
    const [firstNumberList, secondNumberList] = row.split('|');
    const cardNumbers = firstNumberList.split(':')[1].trim().split(' ').filter((num) => !!num).map((num) => Number(num));
    let myNumbers = secondNumberList.trim().split(' ').filter((num) => !!num).map((num) => Number(num));
    const compare = cardNumbers.reduce((a, c) => {
        const includes = myNumbers.includes(c);
        return a + includes;
    }, 0);

    if(compare > 0) {
        const addition = 2 ** (compare - 1);
        sum += addition;
    }

}

console.log('sum', sum)
