function init() {
    
    if (localStorage.getItem('id_user') != undefined) {

        console.log(localStorage.getItem('id_user'));
        console.log(localStorage.getItem('user_name'));
        
        document.getElementById('welcome_user').innerHTML = 'Welcome ' + localStorage.getItem('user_name')
    }
}

$(document).ready(function() {
    init()
});