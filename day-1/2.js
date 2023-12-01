const fs = require('fs');
const path = require('path')

const lookup = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
};

const data = fs.readFileSync(path.join(__dirname,'data.txt'), 'utf8');
const keys = Object.keys(lookup);

const stringNumbers = data.split('\n').map((str) => {
    let string = str;
    let indexes = [];

    for (const key of keys) {
        const matches = [...string.matchAll(new RegExp(key, 'g'))].map(one => one.index);
        for(const index of matches) {
            if(index !== -1) {
                indexes = [...indexes, { index, key, value: lookup[key]}]
            }
        }
    }

    indexes.sort((a,b) => a.index - b.index);

    for(const index of indexes) {
        const { key, value } = index;
        string = string.replace(index.key, key[0] + value + key[key.length-1])
    }

    const stringNumber = string.replaceAll(/\D/g,'');

    return stringNumber;
});

const numbers = stringNumbers.map((stringNumber) => {
    const firstNumber = stringNumber[0];
    const lastNumber = stringNumber[stringNumber.length-1];
    const number = Number(`${firstNumber}${lastNumber}`)
    return number;
});

const sum = numbers.reduce((sum, current) => sum + current, 0);

console.log('sum', sum);
