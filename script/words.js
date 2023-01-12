var info_timer = document.getElementById("tracker_timer");
var info_point = document.getElementById("tracker_point")
var info_level = document.getElementById("tracker_level")
var list_words = document.getElementById("list_words");
var mas_sentences = ['Одно кольцо, чтоб править всеми', 'А роза упала на лапу Азора!', 'Если долго смотреть в бездну, то бездна будет смотреть в тебя', 'Боже, как грустна наша Россия!'];
var mas_hidden_children = [];
var counter_for_mas_hidden = 0;
var counter_id = 0;
var step_to_win = 0;
var copy_childerns = []
var mas_word = [];
var save_clic_hidden;
var save_click_copy;
var timerId;

var level = 1;
var points = 0;
var add_point = 1;
var timer_tick_start = 15;

var count_sentence = 1;
var count_words = 2;


function start_game() {
    document.getElementById("rule").style.display = "none";
    document.getElementById("game").style.display = "flex";
    info_level.innerHTML = "Уровень: " + level;
    info_point.innerHTML = "Очки: " + points;
    /* timer(timer_tick_start); */
    create_objects();
}
/* function game_settings (count_sentence,count_words) */
function create_objects() {
    timer(timer_tick_start);
    for (let i = 0; i < count_sentence; i++) {
        let sentence = document.createElement('div');

        sentence.style.marginTop = "auto";
        sentence.style.marginBottom = "auto";
        sentence.style.marginLeft = "auto";
        sentence.style.marginRight = "auto";
        sentence.style.width = "auto";
        sentence.style.height = "auto";
        sentence.style.fontSize = "120%";
        sentence.style.display = "flex";
        sentence.style.flexWrap = "wrap";
        sentence.style.flexDirection = "row";
        sentence.style.blockSize = "fit-content";
        sentence.style.backgroundColor = "white";

        let choosen_sentence = mas_sentences[getRandomInt(mas_sentences.length)];
        let split_sentence = choosen_sentence.split(" ");
        var word_count = word_counter(choosen_sentence);
        console.log(word_count);

        for (let i = 0; i < word_count; i++) {
            let word = document.createElement('div');
            word.innerHTML = split_sentence[i];
            word.style.padding = "4px";
            sentence.appendChild(word);
            word.id = counter_id++;
            word.classList = "unclicked"
            mas_word[i] = word;
        }
        for (let i = 0; i < count_words; i++) {
            let child = sentence.childNodes[getRandomInt(word_count)];

            while (check_child(child, mas_hidden_children) == true) {
                child = sentence.childNodes[getRandomInt(word_count)];
            }
            mas_hidden_children[counter_for_mas_hidden] = child;
            counter_for_mas_hidden++;
            pictures.appendChild(sentence);

            let child_id = child.id.toString();
            let choosen_child = document.getElementById(child_id);
            let copy_child = choosen_child.cloneNode(true);
            copy_child.id = child_id;
            list_words.appendChild(copy_child);
            copy_child.classList = "unclicked"
            copy_childerns[counter_for_mas_hidden] = copy_child;
            copy_child.onclick = function () {
                delete_click(copy_childerns, copy_child);
                if (copy_child.classList == "unclicked") {
                    save_click_copy = copy_child;
                    copy_child.classList = "click";
                    copy_child.style.backgroundColor = "red";

                    if (save_clic_hidden != null && save_click_copy != null) {
                        if (save_clic_hidden.id == save_click_copy.id) {
                            step_to_win++;
                            save_clic_hidden.innerHTML = save_click_copy.innerHTML;
                            save_clic_hidden.style.backgroundColor = "white";
                            list_words.removeChild(save_click_copy);
                            save_clic_hidden.style.padding = "4px";
                            save_clic_hidden.style.width = "auto";
                            save_clic_hidden.style.height = "auto";
                            save_clic_hidden.onclick = function () { }
                            if (step_to_win == count_sentence * count_words) {
                                alert("Вы победили");
                                if (count_words == 4) {
                                    count_words = 2;
                                    count_sentence++;
                                } else count_words++;
                                clear_data();
                                pictures.replaceChildren();
                                info_level.innerHTML = "Уровень: " + ++level;
                                clearInterval(timerId);
                                timer(timer_tick_start);
                                create_objects();
                            }
                        } else {
                            info_point.innerHTML = "Очки: " + --points;
                            delete_click(copy_childerns, copy_child);
                            delete_click(mas_hidden_children, child);
                        }
                    }
                } else {
                    copy_child.classList = "unclicked";
                    child.classList = "unclicked";
                    save_click_copy = null;
                    copy_child.style.backgroundColor = "white";
                }
            }
            child.style.width = "40px";
            child.innerHTML = "";
            child.style.margin = "2px";
            child.style.backgroundColor = "yellow";
            child.classList = "unclicked";
            child.onclick = function () {
                delete_click(mas_hidden_children, child);
                if (child.classList == "unclicked") {
                    child.classList = "click";
                    child.style.backgroundColor = "red";
                    save_clic_hidden = child;

                    if (save_clic_hidden != null && save_click_copy != null) {
                        if (save_clic_hidden.id == save_click_copy.id) {
                            info_point.innerHTML = "Очки: " + (++points*level);
                            step_to_win++;
                            save_clic_hidden.innerHTML = save_click_copy.innerHTML;
                            save_clic_hidden.style.backgroundColor = "white";
                            list_words.removeChild(save_click_copy);
                            save_clic_hidden.style.padding = "4px";
                            save_clic_hidden.style.width = "auto";
                            save_clic_hidden.style.height = "auto";
                            save_clic_hidden.onclick = function () { }
                            if (step_to_win == count_sentence * count_words) {
                                alert("Вы победили");
                                if (count_words == 4) {
                                    count_words = 2;
                                    count_sentence++;
                                } else count_words++;
                                clear_data();
                                pictures.replaceChildren();
                                info_level.innerHTML = "Уровень: " + ++level;
                                clearInterval(timerId);
                                timer(timer_tick_start);
                                create_objects();
                                
                            }
                        } else {
                            info_point.innerHTML = "Очки: " + --points;
                            delete_click(copy_childerns, copy_child);
                            delete_click(mas_hidden_children, child);
                        }
                    }
                } else {
                    child.classList = "unclicked";
                    copy_child.classList = "unclicked";
                    child.style.backgroundColor = "yellow";
                    save_clic_hidden = null;
                }

            }

        }
        pictures.appendChild(sentence);

    }
}
function clear_data()
{
mas_hidden_children = [];
counter_for_mas_hidden = 0;
counter_id = 0;
step_to_win = 0;
copy_childerns = []
mas_word = [];
save_clic_hidden=null;
save_click_copy=null
}
function check_click(mas) {
    for (let i = 1; i < mas.length; i++) {
        if (mas[i].classList == "click") {
            return i;
        }

    }
}
function delete_click(mas, child) {
    for (let i = 1; i < mas.length; i++) {
        if (mas[i] == child) {

        } else
            if (mas[i].style.backgroundColor == "red" || mas[i].classList == "click") {
                mas[i].style.backgroundColor = "white";
                mas[i].classList = "unclicked";
            }

    }
}

function check_child(child, mas_hidden_children) {
    for (let i = 0; i < mas_hidden_children.length; i++) {
        if (child == mas_hidden_children[i]) {
            return true;
        }
    }
    return false;
}
function word_counter(string) {
    return string.split(/\s+/).length;

}

function timer(timer_tick_start) {
    timer_tick = timer_tick_start;
    timerId = setInterval(function () {
        info_timer.innerHTML = "Осталось времени: " + timer_tick;
        if (timer_tick == 0) {
            clearTimeout(timerId);
            count_record = localStorage.getItem('count_record');
            let player = {
                name: localStorage.getItem('name'),
                game: "Числа",
                points: points
            }
            localStorage.setItem(count_record, JSON.stringify(player));
            count_record++;
            localStorage.setItem('count_record', count_record);
            if (window.confirm("Время вышло! Вы желаете продолжить?")) {
                level = 1;
                count_words =2;
                count_sentence=1;
                points = 0;
                timer_tick_start = 15;
                create_objects();
            } else window.location.href = 'hall.html';
        }
        timer_tick--;
    },
        2000);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}