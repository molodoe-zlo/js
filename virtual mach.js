let arg=process.argv;
let fs = require ('fs');
let ram = new Array();

let progText = fs.readFileSync(arg[2]).toString();

ram = progText.split(/\s+/);

for (let i = 0; i < ram.length; i++) {
    let firstIndex = Number(ram[i+1]); 
    let secondIndex = Number(ram[i+2]); 
    let thirdIndex = Number(ram[i+3]); 
    switch (ram[i]) {
        case 'output':                                             
            if (Number(ram[i+1]) == ram[i+1]) {
                let index = Number(ram[i+1]);
                console.log(ram[index]);
                i++;
                break;
            }
            console.log(ram[i+1]);
            i++;
            break;
        case 'cmp':                                     
            if (ram[firstIndex] == ram[secondIndex]) {
                ram[1000] = 0; 
            } else if (ram[firstIndex] < ram[secondIndex]) {
                ram[1000] = -1;
            } 
            i += 2;
            break;
        case 'jz':                                    
            if (ram[1000] == 0) {
                i = ram.indexOf(`:${ram[i+1]}`);
            }
            break;
        case 'jm':        
            if (ram[1000] == -1) {
                i = ram.indexOf(`:${ram[i+1]}`);
            }
            break;
        case 'jump':
            i = ram.indexOf(`:${ram[i+1]}`);
            break;
        case 'sub':
            ram[thirdIndex] = ram[firstIndex] - ram[secondIndex];
            i += 3;
            break;
        case 'add':
            ram[thirdIndex] = ram[firstIndex] + ram[secondIndex];
            i += 3;
            break;            
        case 'mul':
            ram[thirdIndex] = ram[firstIndex] * ram[secondIndex];
            i += 3;
            break;
        case 'div':
            ram[thirdIndex] = Math.floor(ram[firstIndex] / ram[secondIndex]);
            i += 3;
            break;
        case 'mod':
            ram[thirdIndex] = ram[firstIndex] % ram[secondIndex];
            i += 3;
            break;
        case 'put':
            ram[firstIndex] = Number(ram[i+2]);
            i += 2;
            break;
        case 'random':
            ram[firstIndex] = Math.floor(Math.random() * ram[secondIndex]) + 1;
            i++;
            break;
        case 'mov':
            ram[firstIndex] = ram[secondIndex];
            i += 2;
            break;

    }
}