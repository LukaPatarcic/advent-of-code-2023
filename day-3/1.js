const fs = require('fs');
const path = require('path');
const data = fs.readFileSync(path.join(__dirname,'data.txt'), 'utf8');
const rows = data.split('\n');
let sum = 0;
const symbolIndexes = [];
const numberIndexRows = [];

rows.forEach((row, index) => {
    const numbers = [...row.matchAll(/[0-9]+/g)];
    const symbols = [...row.matchAll(/[^\.0-9\s]/g)]
    symbolIndexes.push(symbols.map((symbol) => symbol.index));
    numberIndexRows.push(numbers.map((number) => ({ index: number.index, number: number[0]})))
})

numberIndexRows.forEach((numberIndexRow, i) => {
    const previousSymbolRow = symbolIndexes[i - 1];
    const currentSymbolRow = symbolIndexes[i];
    const nextSymbolRow = symbolIndexes[i + 1];

    numberIndexRow.forEach((numberIndex) => {
        const { index, number } = numberIndex;
        const startIndex = index - 1;
        const endIndex = index + number.toString().length;

        const hasSymbol =
            !!previousSymbolRow?.find((num) => startIndex <= num && endIndex >= num)
            || !!currentSymbolRow?.find((num) => startIndex <= num && endIndex >= num)
            || !!nextSymbolRow?.find((num) => startIndex <= num && endIndex >= num);

        if(hasSymbol) {
            sum += Number(number);
        }
    })

});

console.log('sum', sum);
