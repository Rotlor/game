
var stat_numbers = [null,null];
var stat_alpha = [null,null];
var stat_picture = [null,null];
var mas_all = [];
var local_numbers=0;
var local_alpha=0;
var local_picture=0;
var count_rec;
window.onload = function(){
    count_rec=localStorage.getItem('count_record');
    for (let i=1;i<count_rec;i++)
    {
        mas_all[i] = JSON.parse(localStorage.getItem(i));
    }
    mas_all.sort((a,b) => a.points - b.points );
    mas_all.reverse();
    for (let i=1;i<count_rec;i++)
    {
        if (mas_all[i].game=="Числа")
        {
            let data = document.createElement('div');
            data.style.width="100%";
            data.style.height="100%";
            data.style.backgroundColor = "aqua";
            data.style.border = "2px double black";
            data.style.textAlign = "center";
            document.getElementById("number_wrapper").appendChild(data);
            data.innerHTML = "Имя: "+ mas_all[i].name + " Очки: "+ mas_all[i].points; 
        }
        else if (mas_all[i].game=="Алфавит")
        {
            let data = document.createElement('div');
            data.style.width="100%";
            data.style.height="100%";
            data.style.backgroundColor = "aqua";
            data.style.border = "2px double black";
            data.style.textAlign = "center";
            document.getElementById("alpha_wrapper").appendChild(data);
            data.innerHTML = "Имя: "+ mas_all[i].name + " Очки: "+ mas_all[i].points; 
        } else{
            let data = document.createElement('div');
            data.style.width="100%";
            data.style.height="100%";
            data.style.backgroundColor = "aqua";
            data.style.border = "2px double black";
            data.style.textAlign = "center";
            document.getElementById("picture_wrapper").appendChild(data);
            data.innerHTML = "Имя: "+ mas[i].name + " Очки: "+ mas_all[i].points;
        } 
    }

}
       /*  let full_data = JSON.parse(localStorage.getItem(i));
        if (full_data.game=="Числа"){
            stat_numbers[local_numbers][0] = local_numbers+1;
            stat_numbers[local_numbers][1] = full_data.name;
            stat_numbers[local_numbers][2] = full_data.points;
            local_numbers++;
        }
        if (full_data.game=="Алфавит"){
            stat_numbers[local_alpha][0] = (local_alpha+1);
            stat_numbers[local_alpha][1] = full_data.name;
            stat_numbers[local_alpha][2] = full_data.points;
            local_aplha++;
        }
        if (full_data.game=="Картинки"){
            stat_numbers[local_picture][0] = (local_numbers+1);
            stat_numbers[local_picture][1] = full_data.name;
            stat_numbers[local_picture][2] = full_data.points;
            local_numbers++;
        } */