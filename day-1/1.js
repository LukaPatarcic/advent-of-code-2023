const fs = require('fs');
const path = require('path')

const data = fs.readFileSync(path.join(__dirname,'data.txt'), 'utf8');
const stringNumbers = data.split('\n').map((item) => item.replace(/\D/g,''));
const numbers = stringNumbers.map((stringNumber) => Number(`${stringNumber[0]}${stringNumber[stringNumber.length-1]}`));
const sum = numbers.reduce((sum, current) => sum + current, 0);

console.log('sum', sum);
