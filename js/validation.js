$("#new_book_form").validate({
    focusClean: true,
    errorElement: "em",
    rules: {
        book_name: 'required'
    },
    messages: {
        book_name:  'Please specify book name'
    },
    errorPlacement: function(error, element) {
        error.appendTo($('"#messageBox1"'))
    }
})