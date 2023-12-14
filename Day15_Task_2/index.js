function display(value){
document.getElementById("result").value += value;
}
function validate(){
    let input = document.getElementById("result")
    input.value = input.value.replace(/[^0-9.]/g,'');
}
function clearAll(){
    document.getElementById("result").value = "";
}
function del(){
    let del = document.getElementById("result");
    let del_value = document.getElementById("result").value;
    del.value = del_value.substr(0,del_value.length-1);
}
function giveAnswer(){
    let a = document.getElementById("result").value;
    let b = eval(a);
    document.getElementById("result").value = b;
}