var info_timer = document.getElementById("tracker_timer");
var info_point = document.getElementById("tracker_point")
var info_level = document.getElementById("tracker_level")
var alpha = [];
var box_alpha_mas = [];
var words = ['Арбуз','Дыня','Хлеб','Алфавит','Букварь','Кант','Меланж','Корова','Дюна','Аллигатор', 'Яблоко']
let game_space = document.getElementById("game_space");
var count_record;

var level=1;
var points=0;
var add_point=1;
var timer_tick_start=15;
var count_alpha=10;

function start_game() {
    document.getElementById("rule").style.display = "none";
    document.getElementById("game").style.display = "flex";
    game(timer_tick_start,count_alpha);
    info_level.innerHTML = "Уровень: "+level;
    info_point.innerHTML = "Очки: " + points;
}

function game(timer_tick_start,count_alpha){
    timer(timer_tick_start);
    create_objects(count_alpha,massive(count_alpha));
}
function timer(timer_tick_start){
    timer_tick=timer_tick_start;
    timerId = setInterval(function() {
        info_timer.innerHTML= "Осталось времени: " + timer_tick;
        if (timer_tick==0){
            clearTimeout(timerId);
            count_record = localStorage.getItem('count_record');
            let player = {
                name: localStorage.getItem('name'),
                game: "Алфавит",
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
                count_alpha=10;
                game(timer_tick_start,count_numbers);
            }else window.location.href = 'hall.html';
        }
        timer_tick--;
    },
    1000);
    
}
function create_objects(){
    for (let i=0;i<count_alpha;i++)
    {
        game_space.style.position = "relative";
        let box_alpha = document.createElement("div");
        box_alpha.className = "box_alpha";
        box_alpha_mas[i] = box_alpha;
        let width = window.innerWidth;
        box_alpha.style.width = "auto";
        box_alpha.style.height = "5%";
        box_alpha.style.backgroundColor = "grey";
        box_alpha.style.border = "2px double black";
        box_alpha.style.textAlign = "center";
        box_alpha.innerHTML = alpha[i];
        box_alpha.style.borderRadius = "10px";
        box_alpha.style.color = "white";
        box_alpha.style.position = "absolute";
        box_alpha.style.top = String((getRandomInt(30)))+"vw";
        box_alpha.style.left = String((getRandomInt(30)))+"vw";
        game_space.appendChild(box_alpha);
        box_alpha.onclick = function check(){
            if (box_alpha.innerHTML==alpha[0])
            {
                game_space.removeChild(box_alpha);
                alpha.shift();
                info_point.innerHTML = "Очки: " + (points+=add_point)
                if (alpha[0]==null){
                    alert("Уровень пройден!");
                    info_level.innerHTML = "Уровень: "+ ++level;
                    clearTimeout(timerId);
                    game(timer_tick_start-=2,count_alpha+=1)
                    add_point++;
                }
                
            }
        }

    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function massive(count_alpha){
    for (let i=0;i<count_alpha;i++)
    {
        alpha[i]= words[getRandomInt(11)];
    }
    alpha.sort();
}