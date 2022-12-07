let fs = require('fs');
let s = fs.readFileSync("input.txt", "utf8");
let str = s;
let input = s.toString().split(' ');
let rpn = [];
let stek = [];

let priority = 
{
    '(' : 0,
    ')' : 0,
    '+' : 1,
    '-' : 1,
    '*' : 2,
    '/' : 2
};

if (input[0] == '(') stek.push('(');
else rpn.push(input[0]); 

for (let i = 1; i < input.length; i++) {
    if ("()*/+-".includes(input[i]) == false) {
        rpn.push(input[i]);
    } else if (input[i] == '(') {
        stek.push('(');
    } else if (input[i] == ')') { 
        while (stek[stek.length - 1] != '(') {
            rpn.push(stek[stek.length - 1]);
            stek.pop();
        }
        stek.pop();
    } else if (stek.length == 0 || priority[input[i]] > priority[stek[stek.length - 1]]) {
        stek.push(input[i])
    } else {
        while (stek[stek.length - 1] != '(' && stek.length)  {
            rpn.push(stek[stek.length - 1]);
            stek.pop();
        }
        stek.push(input[i]);
    }
}
while (stek.length) {
    rpn.push(stek[stek.length - 1]);
    stek.pop()
}
let output = '';

console.log("Обратная польская нотация:")
for (i = 0; i < rpn.length - 1; i++) output += rpn[i] + ', ';
console.log(output + rpn[i])

let temp = [];
let sub;
for (let i = 0; i < rpn.length - 1; i++) {
    if ("-+*/".includes(rpn[i]) == false) {
        temp.push(rpn[i])
    } else {
        sub = eval(`${temp[temp.length - 2]} ${rpn[i]} ${temp[temp.length-1]}`)
        temp.pop();
        temp.pop();
        temp.push(sub);
    }
}
console.log("Разультат:")
console.log(eval(`${temp[0]} ${rpn[rpn.length-1]} ${temp[1]}`).toFixed(3));

//( 8 + 2 * 5 ) / ( 1 + 3 * 2 - 4 ) - 5 + ( 9 / ( 1 + 2 ) + 1 ) * 3
//( 6 + 10 - 4 ) / ( 1 + 1 * 2 ) + 1
//( ( 7 - 6.35 ) / 6.5 + 9.9 ) / ( ( 1.2 / 36 + 1.2 / 0.25 - 21 / 16 ) / ( 169 / 24 ) )