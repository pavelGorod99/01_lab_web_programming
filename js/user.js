function init() {
    
    if (localStorage.getItem('id_user') != undefined) {

        console.log(localStorage.getItem('id_user'));
        console.log(localStorage.getItem('user_name'));
        
        document.getElementById('welcome_user').innerHTML = 'Welcome ' + localStorage.getItem('user_name')
        document.getElementById('spanUserName').innerHTML = localStorage.getItem('user_name')

        $.ajax({
            url: '/01_lab_web_programming/rest/get_user',
            type: 'POST',
            data:  {
                id: localStorage.getItem('id_user')
            },
            success: function (result) {

                console.log(result);

                document.getElementById("spanUserEmail").innerHTML = result[0].email

            }, error: function (err) {
                console.log(err)
            }
        });
    }
}

$(document).ready(function() {
    init()
});