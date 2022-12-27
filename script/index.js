function next_step(){
/*     var author_menu = document.getElementsByClassName("menu_author");
    author_menu.style.display = "none"; */
    var name = document.getElementById("pole").value;
    if (name == ""){
        alert("Введите пожалуйста имя");
    }
    else{
        localStorage.setItem('name',name);
        if (localStorage.getItem('count_record')==null)
        {
            localStorage.setItem('count_record',1);
    }
    }
}