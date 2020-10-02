// 
// form js
// 
var img_input = document.getElementById('img_input');
var img_btn = document.getElementById('img_btn');
var img_btn_lbl = document.getElementById('img_btn_lbl');
img_btn.addEventListener('click', function(){
    img_input.click();
});
img_input.addEventListener('change', (e)=>{
    if(img_input.files[0].name.length > 25){
        img_btn_lbl.innerHTML = img_input.files[0].name.slice(0, 22) + "... ." + img_input.files[0].name.slice(-3,);
    }else{
        img_btn_lbl.innerHTML = img_input.files[0].name;
    }
});


function ch_out(event){
    var path = event.target.getAttribute('data-arg');
    document.querySelector(".shw_out img").src = path;
    document.querySelector("#btn_save a").href = path;
}