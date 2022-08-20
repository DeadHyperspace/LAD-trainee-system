/*Бой идет по ходам. Каждый ход компьютер (Лютый) случайно выбирает одно из доступных действий и сообщает, 
что он собирается делать. 
В ответ на это игрок (Евстафий) должен выбрать свое действие.
После происходит взаимное нанесение урона. Магическая броня блокирует магический урон, 
физическая броня блокирует физический урон.
После совершения действия, оно не может быть повторно выбрано в течение cooldown ходов
Бой идет до победы одного из противников.
Перед началом боя игрок выбирает сложность (начальное здоровье Евстафия).
*/

//Создаём объекты героя и монстра
const monsterCharModel = {
    maxHealth: 10,
    name: 'Лютый',
    moves: [
        {
            'name': 'Удар когтистой лапой',
            'physicalDmg': 3, // физический урон
            'magicDmg': 0,    // магический урон
            'physicArmorPercents': 20, // физическая броня
            'magicArmorPercents': 20,  // магическая броня
            'cooldown': 0     // ходов на восстановление
        },
        {
            'name': 'Огненное дыхание',
            'physicalDmg': 0,
            'magicDmg': 4,
            'physicArmorPercents': 0,
            'magicArmorPercents': 0,
            'cooldown': 3
        },
        {
            'name': 'Удар хвостом',
            'physicalDmg': 2,
            'magicDmg': 0,
            'physicArmorPercents': 50,
            'magicArmorPercents': 0,
            'cooldown': 2
        }
    ]
};

const heroCharModel = {
    maxHealth: 10,
    name: 'Евстафий',
    moves: [
        {
            'name': 'Удар боевым кадилом',
            'physicalDmg': 2,
            'magicDmg': 0,
            'physicArmorPercents': 0,
            'magicArmorPercents': 50,
            'cooldown': 0
        },
        {
            'name': 'Вертушка левой пяткой',
            'physicalDmg': 4,
            'magicDmg': 0,
            'physicArmorPercents': 0,
            'magicArmorPercents': 0,
            'cooldown': 4
        },
        {
            'name': 'Каноничный фаербол',
            'physicalDmg': 0,
            'magicDmg': 5,
            'physicArmorPercents': 0,
            'magicArmorPercents': 0,
            'cooldown': 3
        },
        {
            'name': 'Магический блок',
            'physicalDmg': 0,
            'magicDmg': 0,
            'physicArmorPercents': 100,
            'magicArmorPercents': 100,
            'cooldown': 4
        }
    ]
};

//Глубокое клонирование объектов
let monsterJSON = JSON.parse(JSON.stringify(monsterCharModel));
let heroJSON = JSON.parse(JSON.stringify(heroCharModel));

//Объявляем переменные 
let diffHPBar;
let turn;

//Выключаем нажатие кнопки
document.getElementById('start').disabled = true;

//Функция, блокируем выбор сложности после его выбора и нажатия кнопки старт
function fight() {
    const button = document.getElementById('start');
    button.disabled = true;
    let form = document.getElementById('difficultBar');
    for (let i = 0; i < form.length; i++) {
        form.elements[i].setAttribute('disabled', 'disabled');
    }
    resetTurn();
    turn = 0;
    doTurn();
}

//Функция изменения хп в зависимости от сложности выбранной игроком
function hpSwitch(radiobutton) {
    diffHPBar = radiobutton.value;
    heroJSON.maxHealth *= diffHPBar;
    document.getElementById('start').disabled = false;
}

//Функция хода
function doTurn() {
    pain();
    turn++;
    redCD();
    monsterMoveTurn();
    heroMovesList();

}

//Функция обновления
function resetTurn() {
    monsterJSON = JSON.parse(JSON.stringify(monsterCharModel));
    heroJSON = JSON.parse(JSON.stringify(heroCharModel));
    heroJSON.maxHealth *= diffHPBar;
}

//ХП и ход
function pain() {
    let turns = document.getElementById('turns');
    let monster_hp = document.getElementById('monsterJSON-hp');
    let hero_hp = document.getElementById('heroJSON-hp');
    monster_hp.innerText = monsterJSON.maxHealth.toFixed(2);
    hero_hp.innerText = heroJSON.maxHealth.toFixed(2);
    turns.innerText = 'Ход: ' + turn;
}

//CD скиллов
function redCD() {
    for (let i = 0; i < monsterJSON.moves.length; i++) {
        if (monsterJSON.moves[i].cooldown > 0) {
            monsterJSON.moves[i].cooldown--;
        }
    }
    for (let i = 0; i < heroJSON.moves.length; i++) {
        if (heroJSON.moves[i].cooldown > 0) {
            heroJSON.moves[i].cooldown--;
        }
    }
}

//Действия героя
function heroMovesList() {
    let selectedMove = document.getElementById('heroJSON-moves');
    if (selectedMove.hasChildNodes()) {
        selectedMove.innerText = '';
    }
    for (let i = 0; i < heroJSON.moves.length; i++) {
        if (heroJSON.moves[i].cooldown == 0) {
            let opt = heroJSON.moves[i].name;
            let elem = document.createElement('option');
            let str = 'Magic damage: ' + heroJSON.moves[i].magicDmg + '\n'    + 'Magic armor percents: ' + heroJSON.moves[i].magicArmorPercents + '\n'    + 'Physical damage: ' + heroJSON.moves[i].physicalDmg + '\n' + 'Physical armor percents: ' + heroJSON.moves[i].physicArmorPercents + '\n'+ 'Cooldown: ' + heroJSON.moves[i].cooldown + '\n';
            elem.textContent = opt;
            elem.value = opt;
            elem.title = str;
            selectedMove.appendChild(elem);
        }

    }


}

//Действие монстра
function monsterMoveTurn() {
    let move = Math.floor((Math.random() * 100_0) % 3);
    let moveM = monsterJSON.moves[move];
    let str ='Magic damage: ' + monsterJSON.moves[move].magicDmg + '\n'+ 'Magic armor percents: ' + monsterJSON.moves[move].magicArmorPercents + '\n'+ 'Physical damage: ' + monsterJSON.moves[move].physicalDmg + '\n'+ 'Physical armor percents: ' + monsterJSON.moves[move].physicArmorPercents + '\n'+ 'Cooldown: ' + monsterJSON.moves[move].cooldown + '\n';
    let curMove = document.getElementById('monsterJSON-move');
    curMove.innerText = moveM.name;
    curMove.title = str;
}

//Конец хода
function endTurn() {
    if (monsterJSON.maxHealth <= 0 || heroJSON.maxHealth <= 0) {
        let elem = document.getElementById('start');
        elem.disabled = false;
        let form = document.getElementById('difficultBar');
        for (let i = 0; i < form.length; i++) {
            form.elements[i].removeAttribute('disabled');
        }
        pain();
        return 0;
    }
    let selectedMove = document.getElementById('heroJSON-moves');
    let heroesMove = selectedMove.value;
    let monsterMoveName = document.getElementById('monsterJSON-move').innerText;
    let moveH;
    let moveM;
    for (let i = 0; i < heroJSON.moves.length; i++) {
        if (heroJSON.moves[i].name == heroesMove) {
            moveH = heroJSON.moves[i];
            heroJSON.moves[i].cooldown = heroCharModel.moves[i].cooldown;
        }
    }
    for (let i = 0; i < monsterJSON.moves.length; i++) {
        if (monsterJSON.moves[i].name == monsterMoveName) {
            moveM = monsterJSON.moves[i];
            monsterJSON.moves[i].cooldown = monsterCharModel.moves[i].cooldown;
        }
    }
    let damageHero = 0;
    let damageMonster = 0;
    if (moveM.physicArmorPercents > 0) {
        damageHero += (moveH.physicalDmg - (moveH.physicalDmg * (moveM.physicArmorPercents / 100)));
    } else {
        damageHero += moveH.physicalDmg;
    }
    if (moveM.magicArmorPercents > 0) {
        damageHero += (moveH.magicDmg - (moveH.magicDmg * (moveM.magicArmorPercents / 100)));
    } else {
        damageHero += moveH.magicDmg;
    }
    if (moveH.physicArmorPercents > 0) {
        damageMonster += (moveM.physicalDmg - (moveM.physicalDmg * (moveH.physicArmorPercents / 100)));
    } else {
        damageMonster += moveM.physicalDmg;
    }
    if (moveH.magicArmorPercents > 0) {
        damageMonster += (moveM.magicDmg - (moveM.magicDmg * (moveH.magicArmorPercents / 100)));
    } else {
        damageMonster += moveM.magicDmg;
    }
    heroJSON.maxHealth -= damageMonster;
    monsterJSON.maxHealth -= damageHero;
    doTurn();
}