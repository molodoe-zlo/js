function createHuffmanTable(input) {
    let tree1 = []
    let nodes = []
    nodes = getNodes(input);
    let tree = createHuffmanTree(nodes);
    const table = [];
    coding(tree, '', table);
    writeTree(tree1);
    return table;

    function coding(node, code, table) {
        node.code = code;            
        tree1.push({
            name: node.letter,
            code: node.code
        });
        if (node.letter.length == 1){
            table[node.letter] = node.code;
        }
        if (node.leftSon){
            node.leftSon = coding(node.leftSon, node.code+'0', table);
        }
        if (node.rightSon){
            node.rightSon = coding(node.rightSon, node.code+'1', table);
        }
        return node;
    }

    function writeTree(tree){
        let str = "\n";
        let len = 0;
        let flags = [];
        for(let i in tree){
            const node = tree[i];
            if (node.code.length == 0){
                str+=node.name+"  ("+node.code+")\n";
                continue;
            }
            if (node.code.length > len) {
                len = node.code.length;
            }
            else if (node.code.length < len){
                len = node.code.length;
            }
            if(!flags[len]){
                str+=" ".repeat((len-1)*3)+"├──"+node.name+"  ("+node.code+")\n";
                flags[len]=!flags[len];
            }
            else{
                str+=" ".repeat((len-1)*3)+"└──"+node.name+"  ("+node.code+")\n";
                flags[len]=!flags[len];
            }
        }
        str+="\n"
        return;
    }
}

function createHuffmanTree(nodes) {
    while (nodes.length > 1) {
        nodes.sort((a, b) => {
        if (a.weight < b.weight) return 1
        else if (a.weight > b.weight) return -1
        else return 0;
        });
        const a = nodes.pop();
        const b = nodes.pop();
        const parent = {
            letter: a.letter + b.letter,
            leftSon: a,
            rightSon: b,
            code: '',
            weight: a.weight + b.weight
        }      
        nodes.push(parent);
        main = parent.letter;
    }
    return nodes.shift();
}

function getNodes(input) {
    const table = [];
    for (let i = 0; i < input.length; i++) {
        const letter = input[i];
        if (table[letter] == undefined) {
            table[letter] = 0;
        }
        table[letter]++;
    }
    const result = [];
    for (let letter in table) {
        const node = {
            letter: letter,
            leftSon: undefined,
            rightSon: undefined,
            code: '',
            weight: table[letter]
        };
        result.push(node);
    }
    return result;
}

function encode(message) {
    let tableOfNodes = createHuffmanTable(message);
    let result = '';
    let i = 0;
    for (node in tableOfNodes){
        if (i++==0)
            result+="\n" + node + ':' + tableOfNodes[node] + "\n";
        else
            result+=node+':'+tableOfNodes[node]+'\n';
    }
    for (let i = 0; i < message.length; i++){
        let letter = message[i];
        result += tableOfNodes[letter];
    }
    return result;
}
 
function decode(message) {
    let work = message; 
    let result = '';
    for (let i = 0; i < message.length; i++) {
        if (message[i] == '1') {
            work = work.rightSon;
        } else {
            work = work.leftSon;
        }
        if (work.letter.length == 1) {
            result += work.letter;
            work = tree;
        }
    } return result;
}

let fs = require('fs')
let a = fs.readFileSync('input.txt', 'utf-8')
let input = a.toString();
let encoded = encode(input)
//console.log (encoded)
encoded = encoded.toString();
fs.writeFileSync('code.txt', encoded)
const str = fs.readFileSync('code.txt', 'utf8');
const line = alert(value.match(/([^\r\n]*)\s*$/)[1] )
console.log (line)
let decoded = decode(encoded)
fs.writeFileSync('decode.txt', decoded)