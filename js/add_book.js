function addNewItem() {

    let $_URL = '/01_lab_web_programming/add_book/' +  document.getElementById('bookNameInput').value + "/" + 
        document.getElementById('bookPublishHouse').value + "/" +
        document.getElementById('bookAuthorInput').value + "/" +
        document.getElementById('bookYearInput').value + "/" +
        document.getElementById('bookNrOfPages').value + "/" +
        document.getElementById('bookPrice').value

    console.log($_URL)

    $.ajax({
        url: $_URL,
        type: 'POST',
        success: function () {

            document.getElementById("bookNameInput").value = ""
            document.getElementById("bookPublishHouse").value = "Select publish house"
            document.getElementById('bookAuthorInput').value = "Select author"
            document.getElementById('bookYearInput').value = "Select year"
            document.getElementById("bookNrOfPages").value = ""
            document.getElementById("bookPrice").value = ""

        }, error: function (err) {
            console.log('error: ' + err)
        }
    })
}

function getData() {

    getItems('publishing_house').then(function(ph) {

        $_ph_options = "";

        for (let i = 0; i < ph.length; i++)
            $_ph_options += "<option value=" + ph[i]['Id_publishing_house'] + ">" + ph[i]['Name'] + "</option>";

        $("#bookPublishHouse").append($_ph_options);

        getItems('author').then(function(author) {

            $_authors = ""
                        
            for (let i = 0; i < author.length; i++)
                $_authors += "<option value=" + author[i]['Id_Author'] + ">" + author[i]['Name'] + "</option>"

            $("#bookAuthorInput").append($_authors);

            let $_year_option = ""

            for (let i = new Date().getFullYear(); i >= 1950; i--)
                $_year_option += "<option value=" + i + ">" + i + "</option>"
                
            $("#bookYearInput").append($_year_option);

            $('#new_book_form').validate({
                errorPlacement: function(error, element) {
                    if (element.attr("name") == "book_name" )
                        error.appendTo($('#messageBox1'));

                    if (element.attr("name") == "book_publish_house" )
                        error.appendTo($('#messageBox2'));

                    if (element.attr("name") == "book_author" )
                        error.appendTo($('#messageBox3'));

                    if (element.attr("name") == "book_year" )
                        error.appendTo($('#messageBox4'));

                    if (element.attr("name") == "book_nr_of_pages" )
                        error.appendTo($('#messageBox5'));

                    if (element.attr("name") == "book_price" )
                        error.appendTo($('#messageBox6'));
                },
                rules: {
                    book_name: {
                        required: true
                    },
                    book_publish_house : {
                        required: true
                    },
                    book_author: {
                        required: true
                    },
                    book_year: {
                        required: true
                    },
                    book_nr_of_pages: {
                        required: true
                    },
                    book_price: {
                        required: true
                    }
                },
                messages: {
                    book_name: {
                        required: "Please enter book name"
                    },
                    book_publish_house: {
                        required: "Please select book publish house"
                    },
                    book_author: {
                        required: "Please select book author"
                    },
                    book_year: {
                        required: "Please select book year"
                    },
                    book_nr_of_pages: {
                        required: "Please complete book number of pages"
                    },
                    book_price: {
                        required: "Please complete book price"
                    }
                },
                submitHandler: function() {
                    addNewItem()
                }
            })
        })
    })
}

$(document).ready(function() {
    getData()
});