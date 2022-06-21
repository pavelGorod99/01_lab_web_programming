var UserService = {

    init: function() {

        var token = localStorage.getItem("token");
    
        if (token) {
            window.location.replace("user_home.html");
        }

        $('#login_form').validate({

            errorPlacement: function(error, element) {
                if (element.attr("name") == "email")
                    error.appendTo($('#messBox1'))

                if (element.attr("name") == "pass")
                    error.appendTo($('#messBox2'))
            },
            rules: {
                email: {
                    required: true,
                    email: true
                },
                pass: {
                    required: true
                }
            },
            messages: {
                email: {
                    required: "Email field have to be completed",
                    email: "Your email address must be in the format of name@domain.com"
                },
                pass: {
                    required: "Password field have to be completed"
                }
            },
            submitHandler: function() {

                $form = document.getElementById("login_form")
                var fd = new FormData($form);

                // $rememberMe = document.getElementById("exampleCheck1").checked;

                // fd.append('rememberMe', $rememberMe)
                UserService.login(fd);
            }
        })
    },
    
    login: function(fd) {

        $.ajax({
            url: "/rest/login",
            type: 'POST',
            data: fd,
            success: function (response) {
                
                console.log(response);

                if (response.admin == 1) {
                    localStorage.setItem('token', response['token']);
                    window.location.replace("admin_panel.html");
                } else if (response[0]['id_user'] != undefined) {

                    document.getElementById('exampleInputEmail').value = ''
                    document.getElementById('exampleInputPassword1').value = ''

                    localStorage.setItem('id_user', response[0]['id_user'])
                    localStorage.setItem('user_name', response[0]['user_name']);
                    localStorage.setItem('token', response['token']);
                    window.location.replace("user_home.html");

                } else {
                    document.getElementById('messB').innerHTML = response
                }
                
            }, error: function (err) {
                console.log(err)
            },
            processData: false,
            contentType: false
        })
    },

    logout: function() {
        localStorage.clear();
        window.location.replace("login.html");
    } 
}