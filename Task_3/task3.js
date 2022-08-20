/*
Компьютер загадывает число из нескольких различающихся цифр (от 3 до 6). 
Игроку дается несколько попыток на то, чтобы угадать это число.
После каждой попытки компьютер сообщает количество совпавших цифр стоящих не на своих местах, 
а также количество правильных цифр на своих местах.
Например загаданное число: 56478 предположение игрока: 52976
ответ: совпавших цифр не на своих местах - 1 (6), цифр на своих местах - 2 (5 и 7)
игра ведется до окончания количества ходов либо до отгадывания
*/

//Количество попыток
let tryCount = 5;
let randomNumber;
document.getElementById('try').hidden = true;
//Генерируем рандомное число в необходиом нам интервале 
function generateRandomNumber() {
    min = Math.ceil(99);
    max = Math.floor(1000);
    document.getElementById('start').hidden = true;
    document.getElementById('try').hidden = false;
    randomNumber = Math.floor(Math.random() * (max - min) + min);
    console.log(randomNumber);
}
//Функция в которой будет считывается ввод пользователя, и сравниваться с рандомным числом
function guessTheNumber() {
    if (tryCount >= 0) {
        let numbUser = Number(document.getElementById("UserNumb").value);
        if ((numbUser >= 100) && (numbUser <= 999)) {
            console.log(numbUser);
            let str = document.getElementById("tryCount");
            str.innerText = "Количество попыток:" + tryCount;
            let numbUserString = numbUser.toString().split('');
            let randNumbString = randomNumber.toString().split('');
            let correctPlaceHolder = [];
            let matchNumberHolder = [];
            for (let i = 0; i < numbUserString.length; i++) {
                if (numbUserString[i] === randNumbString[i]) {
                    correctPlaceHolder.push(numbUserString[i]);
                }
            }
            for (let i = 0; i < randNumbString.length; i++) {
                for (let j = 0; j < numbUserString.length; j++) {
                    if (numbUserString[j] === randNumbString[i]
                        && i != j
                        && !matchNumberHolder.includes(numbUserString[j])) {
                        matchNumberHolder.push(numbUserString[j]);
                    }
                }
            }
            if (numbUser === randomNumber) {
                console.log("Правильное число -", randomNumber);
                alert("Вы угадали - правильное число -", randomNumber)
            } else {
                console.log("Совпавшие числа на своих местах: ", correctPlaceHolder.join(", "));
                console.log("Совпавшие числа не на свох местах: ", matchNumberHolder.join(", "));
            }
            tryCount--;
            if (tryCount < 0) {
                alert('Вы не отгадали число')
            }
        } else {
            alert('Пожалуйста введите трёхзначное число')
        }
    }
}






