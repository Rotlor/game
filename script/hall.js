window.onload = function(){
    document.getElementsByClassName("text-center")[0].innerHTML = "Выберите игру, " + localStorage.getItem('name');
}