let fs = require('fs')
let data = fs.readFileSync("dka.txt", "utf8")
let line = data.split('\n')
let S = line[0]
let T = line[1]

    if ((S == 0) || (T == 0)) {
        console.log ("Невозможно обработать пустую строку")
        return 0
    }
    if (S.length < T.length) {
        console.log ("А там точно не наоборот, м???")
        return 0
    }

let ST = T + '&' + S

let tLen = T.length
let stLen = ST.length
let n = stLen - tLen - 1

// делаем массивчики
let litera = new Array()
for (i = 0; i < tLen; i++)
    litera[T.charAt(i)]=0
array = new Array(tLen + 1)
for (j = 0; j <= tLen; j++)
    array[j] = new Array()
for (c in litera)
    array[0][c] = 0

// таблица переходов
for (j = 0; j < tLen; j++) {
    prev = array[j][T.charAt(j)]
    array[j][T.charAt(j)] = j + 1 
    for(c in litera)
        array[j+1][c] = array[prev][c]
}

// считаем, выводим
prev = 0
let count = 0
for (i= 0; i < n; i++) {
    if (T.indexOf(S.charAt(i)) !== -1) { 
        prev = array[prev][S.charAt(i)]
    } else prev = 0

    if (prev == tLen) {
        count++
        console.log("Найдено вхождение с символа: ", i - tLen + 1) 
    }
}
console.log ("Всего вхождений: ", count)
