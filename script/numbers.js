var info_timer = document.getElementById("tracker_timer");
var info_point = document.getElementById("tracker_point")
var info_level = document.getElementById("tracker_level")
var numbers = [];
let game_space = document.getElementById("game_space");
var count_record;

var level=1;
var points=0;
var add_point=1;
var timer_tick=10;
var count_numbers=10;

function start_game() {
    document.getElementById("rule").style.display = "none";
    document.getElementById("game").style.display = "flex";
    game(timer_tick,count_numbers);
    info_level.innerHTML = "Уровень: "+level;
    info_point.innerHTML = "Очки: " + points;
}

function game(timer_tick,count_numbers){
    timer(timer_tick);
    create_objects(count_numbers,massive(count_numbers));
}
function timer(timer_tick){
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
                timer_tick=10;
                count_numbers=10;
                start_game();
            }else window.location.href = 'hall.html';
        }
        timer_tick--;
    },
    1000);
    
}
function create_objects(){
    for (let i=0;i<count_numbers;i++)
    {
        let number = document.createElement("div");
        let width = window.innerWidth;
        number.style.width = "3%";
        number.style.height = "2%";
        number.style.backgroundColor = "aqua";
        number.style.border = "2px double black";
        number.style.textAlign = "center";
        number.innerHTML = numbers[i];
        number.style.position = "absolute";
        number.style.marginTop = String((getRandomInt(width/4)))+"px";
        number.style.marginLeft = String((getRandomInt(width/4)))+"px";
        /* number.style.marginRight = String((getRandomInt(width/3)))+"px";
        number.style.marginBottom = String((getRandomInt(width/3)))+"px"; */
        game_space.appendChild(number);
        number.onclick = function check(){
            if (number.innerHTML==numbers[0])
            {
                game_space.removeChild(number);
                numbers.shift();
                info_point.innerHTML = "Очки: " + (points+=add_point)
                if (numbers[0]==null){
                    alert("Уровень пройден!");
                    info_level.innerHTML = "Уровень: "+ ++level;
                    clearTimeout(timerId);
                    game(--timer_tick,count_numbers+=2)
                    add_point++;
                }
                
            }
        }

    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function massive(count_numbers){
    for (let i=0;i<count_numbers;i++)
    {
        numbers[i]=getRandomInt(10);
    }
    numbers.sort( (a, b) => a - b );
}