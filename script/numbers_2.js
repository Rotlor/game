var info_timer = document.getElementById("tracker_timer");
var info_point = document.getElementById("tracker_point")
var info_level = document.getElementById("tracker_level")
var numbers = [];
let pictures = document.getElementById("pictures");
var list_properties = document.getElementById("properties");
var count_record;

var level=1;
var points=0;
var add_point=1;
var timer_tick_start=15;

var kol_properties=5;
var count_numbers=3;


var max=20;

function start_game() {
    document.getElementById("rule").style.display = "none";
    document.getElementById("game").style.display = "flex";
    game(timer_tick_start,count_numbers,kol_properties);
    info_level.innerHTML = "Уровень: "+level;
    info_point.innerHTML = "Очки: " + points;
}

function game(timer_tick_start,count_numbers,kol_properties){
 /*    timer(timer_tick_start); */
    create_objects(count_numbers,kol_properties);
}
function timer(timer_tick_start){
    timer_tick = timer_tick_start;
    timerId = setInterval(function() {
        info_timer.innerHTML= "Осталось времени: " + timer_tick;
        if (timer_tick==0){
            clearTimeout(timerId);
            count_record = localStorage.getItem('count_record');
            let player = {
                name: localStorage.getItem('name'),
                game: "Числа",
                points: points
            }
            localStorage.setItem(count_record, JSON.stringify(player));
            count_record++;
            localStorage.setItem('count_record',count_record);
            if (window.confirm("Время вышло! Вы желаете продолжить?")){
                game_space.replaceChildren();
                level=1;
                points=0;
                add_point=1;
                timer_tick_start=15;
                count_numbers=10;
                game(timer_tick_start,count_numbers);
            }else window.location.href = 'hall.html';
        }
        timer_tick--;
    },
    1000);   
}
function create_objects(count_numbers,kol_properties){ 
    for(let i=0;i<count_numbers;i++)
    {
        let number = document.createElement('div');
        let rand = getRandomInt(max);

        number.style.marginTop = "auto";
        number.style.marginBottom ="auto";
        number.style.marginLeft ="auto";
        number.style.width = "20%";
        number.style.height = "20%";
        number.style.fontSize = "400%";
        number.style.backgroundColor = "white";
        number.innerHTML = rand;
        number.style.marginRight = "10px";

        pictures.appendChild(number);

        let properties = {
            Prime:isPrime(rand),
            Sum:getSumDigits(rand),
            Mul:getMulDigits(rand),
            Square:Math.pow(rand,2)
        }
        numbers.push([number,properties]);

        for (let j=0;i<kol_properties;j++)
        {
        let property = document.createElement('div');
        property.className = "property";
        property.innerHTML = "АБОБА";
        list_properties.appendChild(property);
        }
    }
}
function isPrime(x) {
    if (x < 2) return false;

    for (var i = x-1; i > 1; i--) {
        if (x%i == 0) {
            return false;
        }
    }

    return true;
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function getSumDigits(value){
    let sum = 0;
    while (value) {
        sum += value % 10;
        value = Math.floor(value / 10);
    }
    return sum;
}
function getMulDigits(value){
    let sum = 1;
    while (value) {
        sum *= value % 10;
        value = Math.floor(value / 10);
    }
    return sum;
}
