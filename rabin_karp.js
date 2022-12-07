function RK (S, T) {
let N = S.length
let M = T.length
let result = [] // массив для ответов
let alphabet = 256 // мощность алфавита
let prnum = 9973 // простое число чтоб считать
let indexHash = 1 // первый индекс хэша

// посчитали хэш для первого эл-та
let sHash = S.charCodeAt(0) % prnum //строки
let pHash = T.charCodeAt(0) % prnum // и подстроки

// посчитали хэш для каждого эл-та
for (let i = 1; i < M; i++) {
    sHash = ((sHash * alphabet + S.charCodeAt(i)) % prnum)
    pHash = ((pHash * alphabet + T.charCodeAt(i)) % prnum)
    indexHash = (indexHash * alphabet % prnum)
}

let count = 0
let P = N - M

for (let i = 0; i <= P; i++) {
    // если хэши равны и тексты равны, запишем в массив для ответа
    if ((pHash === sHash) && (check (S, i, T))) {
        result.push (i)
        console.log ("Найдено вхождение начиная с символа: ", i)
        count++
    }
    // посчитаем хэш для следующей строки
    sHash = (sHash - (S.charCodeAt(i) * indexHash % prnum))
    sHash = (((sHash + prnum) * alphabet + S.charCodeAt(i + T.length)) % prnum)
}
console.log ("Всего вхождений: ", count)
return result
}

//функция для поэлементного сравнения строк с одинаковыми хэшами
function check(S, index, T) {
    for (let i = 0; i < T.lenght; i++) {
        if (T[i] != S[index + i]) return false
    }
    return true
}

let readlineNew = require('readline')
let fs = require('fs');
let S = fs.readFileSync('stroka.txt', 'utf8');
let T = fs.readFileSync('podstroka.txt', 'utf8');
if ((S == 0) || (T == 0) || (S.length < T.length)) {
    console.log ("Проверьте корректность строк")
    return 0
}
else RK(S, T)