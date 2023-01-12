var info_timer = document.getElementById("tracker_timer");
var info_point = document.getElementById("tracker_point")
var info_level = document.getElementById("tracker_level")
var numbers = [];
var mas_rand = [];/*  */
var mas_rand_num = [];
var mas_prop = [];
let pictures = document.getElementById("pictures");
var list_properties = document.getElementById("properties");
var choosen_properties = document.getElementById("choosen_properties");
var count_record;


var level=1;
var points=0;
var add_point=1;
var timer_tick_start=15;
var max=30;
var min=3;

var count_numbers=3;


function start_game() {
    document.getElementById("rule").style.display = "none";
    document.getElementById("game").style.display = "flex";
    info_level.innerHTML = "Уровень: "+level;
    info_point.innerHTML = "Очки: " + points;
    /*    timer(timer_tick_start); */
    create_objects();
}
function create_objects(){
    for(let i=0;i<count_numbers;i++)
    {
        let number = document.createElement('div');
        /* let rand = getRandomInt(max); */
        number.style.marginTop = "auto";
        number.style.marginBottom ="auto";
        number.style.marginLeft ="auto";
        number.style.width = "20%";
        number.style.height = "20%";
        number.style.fontSize = "400%";
        number.style.backgroundColor = "white";
        number.innerHTML = randomInteger(min,max);
        if (i>0)
        {
            while (check_rand(number.innerHTML,mas_rand_num)==true  )
            {
                number.innerHTML = randomInteger(min,max);
            }
            mas_rand_num[i]=number.innerHTML;
        } else mas_rand_num[i]=number.innerHTML;
        number.style.marginRight = "10px";

        pictures.appendChild(number);

        let properties = {
            Prime:isPrime(number.innerHTML),
            Sum:getSumDigits(number.innerHTML),
            Mul:getMulDigits(number.innerHTML),
            Square:Math.pow(number.innerHTML,2),
            Roman:convertToRoman(number.innerHTML)
        }
        numbers.push([number,properties]);
        
        /* for(let i=0;i<numbers.length;i++){
          for (let j=1;j<numbers.length;j++)
          {
            if (numbers[i][1]==numbers[j][1])
            {
                pictures.replaceChildren();
                numbers.slice(0,numbers.length);
                create_objects();
            }
          }
        } */
        let mas_rand = [];
        for (let j=0;j<2;j++)
        {
        let property = document.createElement('div');
        property.className = "property";

        mas_rand[j]=getRandomInt(4);
        if (j==1)
        while (mas_rand[j]==mas_rand[j-1])
        {
            mas_rand[j]=getRandomInt(5);
        }
        switch(mas_rand[j])
        {
            case 0:
                if (properties.Prime==true)
                {
                property.innerHTML = "Простое";}
                else property.innerHTML ="Составное";
                break;
            case 1:
                property.innerHTML = "Сумма цифр числа: " + properties.Sum;
                break;
            case 2:
                property.innerHTML = "Произведение цифр числа: " + properties.Mul;
                break;
            case 3:
                property.innerHTML = "Квадрат числа равен: " + properties.Square;
                break;
            case 4:
                property.innerHTML = "В Римской с.с число = " + properties.Roman;
        }
        mas_prop.push([property,number]);
        }
    }

    shuffle(mas_prop);

    for (let i=0;i<mas_prop.length;i++)
    {
        for(let j=i+1;j<mas_prop.length;j++)
        {
            if (mas_prop[i][0].innerHTML!==mas_prop[j][0].innerHTML)
            list_properties.appendChild(mas_prop[i][0]);
        }

    }

    let choosen_element = pictures.childNodes[getRandomInt(count_numbers)];
    choosen_element.style.backgroundColor = "red";

    for (let i=0;i<mas_prop.length;i++)
    {
        let num_mas_prop = mas_prop[i][1];
        let pro_mas_prop = mas_prop[i][0];
        for (let j=0;j<numbers.length;j++)
        {
            let num_numbers= numbers[j][0];
            let pro_mas_numbers = numbers[j][1];
            if (num_mas_prop==num_numbers)
            {
                mas_prop[i][0].onclick = function(){
                    if (choosen_element.innerHTML == num_mas_prop.innerHTML/*  || check(pro_mas_numbers,pro_mas_prop)==true  */)
                    {
                        choosen_properties.appendChild(mas_prop[i][0]);
                        if (choosen_properties.childElementCount == 2)
                        {
                            choosen_properties.replaceChildren();
                            info_point.innerHTML ="Очки: "+ ++points;
                            pictures.removeChild(choosen_element);
                            count_numbers--;

                            choosen_element = pictures.childNodes[getRandomInt(count_numbers)];
                            choosen_element.style.backgroundColor = "red";
                        }
                    }
                   /*  else if (mas_prop[i][0]){

                    } */
                    else 
                    {
                        mas_prop[i][0].style.backgroundColor ="red";
                        setInterval(function(){
                            mas_prop[i][0].style.backgroundColor ="wheat"; 
                        },500);
                        info_point.innerHTML ="Очки: "+ --points;
                    }
                } 
            }
        }
    }
}
function check_rand(number,mas_rand_num) {
    for(let i=0;i<mas_rand_num.length;i++){
        if (number==mas_rand_num[i])
        {
            return true;
        }
    }
    return false;
}

function check(pro_mas_numbers,pro_mas_prop){
    let property_1 = Object.entries(pro_mas_numbers);
    let property_2 = Object.entries(pro_mas_prop);

    for (let i=0;i<property_1.length;i++)
    {

        for(let j=1;j<property_2.length;j++)
        {
            if (property_1[i][i]=property_2[j][j])
            {
                return true;
            }
        }
    }
    return false;

}
function wrong(object)
{
    object.style.backgroundColor ="wheat";
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
                create_objects();
            }else window.location.href = 'hall.html';
        }
        timer_tick--;
    },
    1000);   
}
function isPrime(n) {
    if (n <= 2 ) {
      return true }
  
    let i = 2;
    const limit = Math.sqrt(n);
    while (i <= limit) {
      if (n % i === 0) {
        return false;
      }
      i +=1;
    }
    
    return true;
  }
  function convertToRoman(number) {
    return [
        { value: 1000, char: 'M' },
        { value: 900, char: 'CM' },
        { value: 500, char: 'D' },
        { value: 400, char: 'CD' },
        { value: 100, char: 'C' },
        { value: 90, char: 'XC' },
        { value: 50, char: 'L' },
        { value: 40, char: 'XL' },
        { value: 10, char: 'X' },
        { value: 9, char: 'IX' },
        { value: 5, char: 'V' },
        { value: 4, char: 'IV' },
        { value: 1, char: 'I' }
    ].reduce((result, currentValue) => {
        while (number >= currentValue.value) {
            result += currentValue.char;
            number -= currentValue.value;
        }

        return result;
    }, '');
}

  function randomInteger(min, max) {
    // получить случайное число от (min-0.5) до (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
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
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }