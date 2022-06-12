function registration() {

    $('#registration_form').validate({
        errorPlacement: function(error, element) {

            if (element.attr("name") == "input_username")
                error.appendTo($('#messBox1'))

            if (element.attr("name") == "input_email")
                error.appendTo($('#messBox2'))

            if (element.attr("name") == "input_password")
                error.appendTo($('#messBox4'))
        },
        rules: {
            input_username: {
                required: true,
                minlength: 3
            },
            input_email: {
                required: true,
                email: true
            },
            input_password: {
                required: true
            }
        },
        messages: {
            input_username: {
                required: "Please specify your username!",
                minlength: jQuery.validator.format("Must have more than {0} characters!")
            },
            input_email: {
                required: "Please specify your email!",
                email: "Your email address must be in the format of name@domain.com"
            },
            input_password: {
                required: "Fill out password field!"
            }
        },
        submitHandler: function() {

            $form = document.getElementById("registration_form")
            var fd = new FormData($form);

            $.ajax({
                url: "/01_lab_web_programming/rest/registration",
                type: 'POST',
                data: fd,
                success: function (response) {
                    console.log(response);

                    if (response == null) {

                        document.getElementById('exampleInputUsername').value = ''
                        document.getElementById('exampleInputEmail').value = ''
                        document.getElementById('exampleInputPassword1').value = ''
                        document.getElementById('messB').innerHTML = ''

                        $form = document.getElementById('registration_form')
                        $form.setAttribute('style', 'display:none!important');

                        $div_log_success = document.getElementById('success_log')
                        $div_log_success.setAttribute('style', 'display:block!important');

                        $("#liveToast1").toast('show');
                    } else {
                        document.getElementById('messB').innerHTML = response
                    }
                    
                }, error: function (err) {
                    console.log(err)
                },
                processData: false,
                contentType: false
            })
        }
    })
}

$(document).ready(function() {
    registration()
});
