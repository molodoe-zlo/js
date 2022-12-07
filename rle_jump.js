function jump_encode(input){
    let result = '';
    let i = 0;

    while (i < input.length) {
        let currentSymbol = input[i];
        let length = 1;
        if (currentSymbol == input[i+1]) {
            while ((currentSymbol == input[i+length]) && (length < 127)) {
                length++;
            }
            result += '(' + length + ')' + currentSymbol;
            i += length;
        } else {
            let buffer = "";
            while (currentSymbol != input[i+1]){
                buffer+=currentSymbol;
                currentSymbol = input[++i];
                length++;
            }
            result += '(' + (buffer.length + 127) + ')' + buffer;
        }
    }
    return result;
}

function jump_decode(input) {
    let i = 0;
    let result = "";
    if (input[0] != "(") {
        console.log ("Друг, так быть не должно")
        return 0
    }

    while (i < input.length) {
        let num = "";
        if (input[i] == "(") i++
        while (input[i] != ")"){
            num += input[i];
            i++;
        }
        if (!(!!Number(num))) {
            console.log ("Друг, так быть не должно")
            return 0
        }
        i++;
        if (parseInt(num) < 128){
            result += (input[i]).repeat(parseInt(num));
            i++;
        }
        else{
            let sequence = "";
            let j = i;
            for (j = i; j<((parseInt(num) - 127) +i); j++ ){
                sequence += input[j];
            }
            result+=sequence;
            i += parseInt(num) - 127;
        }
    }
return result;
}

let fs = require('fs');
var encode = fs.readFileSync('input.txt');
var a = encode.toString();
encode_str = jump_encode(a);
fs.writeFileSync('code.txt', encode_str);
var decode = fs.readFileSync('code.txt');
var b = decode.toString();
decode_str = jump_decode(b);
fs.writeFileSync('decode.txt', decode_str);

console.log("Коэффициент сжатия = ", encode_str.length/a.length)