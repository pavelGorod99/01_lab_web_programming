function init() {

    var token = localStorage.getItem("token");
    
    if (token == null) {
        window.location.href = "login.html";
    }
    
    if (localStorage.getItem('id_user') != undefined) {

        console.log(localStorage.getItem('id_user'));
        console.log(localStorage.getItem('user_name'));
        
        document.getElementById('welcome_user').innerHTML = 'Welcome ' + localStorage.getItem('user_name')
    }
}

$(document).ready(function() {
    init()
});