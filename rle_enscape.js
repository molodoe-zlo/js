function escape_encode(input){
    let result = '';
    let i = 0;
    
    while (i<input.length) {
        let currentSimbol = input[i];
        let length = 1;
        while ((currentSimbol == input[length+i]) && (length <= 255)){
            length++;
        }
        if (currentSimbol == '#'){
            result += '#' + length + currentSimbol;
        }
        else {
        if (length<=3){
            result += currentSimbol.repeat(length);
        } else{
            result += '#' + length + currentSimbol;
        } }
        i += length;
    }
    return result;
}

function escape_decode(input) {
	let result = '';
	let i = 0;
    let count = '';
    let numbers = "1234567890";

    while (i < input.length) {
		if (input[i] == '#') {
			while (numbers.indexOf(input[i+1]) >= 0) {
                count += input[i+1];
                i++;
            }
            if (count.length > 0) {
                let lengthcount = count.length;
                count = Number(count);
                result += input[i+1].repeat(count-3);
                i += lengthcount;
            }
            else { 
                result += input[i];
                i ++;
            }
        } else {
            result += input[i];
            i++;
        }
	}
	return result;
};

let fs = require('fs');
var encode = fs.readFileSync('input.txt');
var a = encode.toString();
encode_str = escape_encode(a);
fs.writeFileSync('code.txt', encode_str);
var decode = fs.readFileSync('code.txt');
var b = decode.toString();
decode_str = escape_decode(b);
fs.writeFileSync('decode.txt', decode_str);

console.log("Коэффициент сжатия = ", encode_str.length/a.length)