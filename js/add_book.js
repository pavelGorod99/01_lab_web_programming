function addNewItem() {


    // let image = document.getElementById('bookImage').getAttribute("src")
    // image = image.split("/");
    $form = document.getElementById("new_book_form")
    var fd = new FormData($form);

    // let image = document.getElementById('bookImage').files[0]

    // console.log(image);
    // alert(image)


    // let $_URL = '/01_lab_web_programming/add_book/' +  document.getElementById('bookNameInput').value + "/" + 
    //     document.getElementById('bookPublishHouse').value + "/" +
    //     document.getElementById('bookAuthorInput').value + "/" +
    //     document.getElementById('bookYearInput').value + "/" +
    //     document.getElementById('bookNrOfPages').value + "/" +
    //     document.getElementById('bookPrice').value + "/" + image[1]

    // alert($_URL)

    $.ajax({
        url: '/01_lab_web_programming/add_book',
        type: 'POST',
        data:  fd,
        success: function (result) {

            console.log(result);

            document.getElementById("bookNameInput").value = ""
            document.getElementById("bookPublishHouse").value = "Select publish house"
            document.getElementById('bookAuthorInput').value = "Select author"
            document.getElementById('bookYearInput').value = "Select year"
            document.getElementById('bookCategoryInput').value = "Select category"
            document.getElementById('bookDescriptionInput').value = ""
            document.getElementById('bookImage').value = ""
            document.getElementById("bookNrOfPages").value = ""
            document.getElementById("bookPrice").value = ""
            $("#liveToast1").toast('show');

        }, error: function (err) {
            console.log(err)
        },
        processData: false,
        contentType: false
    })
}

function getData() {

    getItems('publishing_house', -1).then(function(ph) {

        $_ph_options = "";

        for (let i = 0; i < ph.length; i++)
            $_ph_options += "<option value=" + ph[i]['Id_publishing_house'] + ">" + ph[i]['Name'] + "</option>";

        $("#bookPublishHouse").append($_ph_options);

        getItems('author', -1).then(function(author) {

            $_authors = ""
                        
            for (let i = 0; i < author.length; i++)
                $_authors += "<option value=" + author[i]['Id_author'] + ">" + author[i]['Name'] + "</option>"

            $("#bookAuthorInput").append($_authors);

            getItems('category', -1).then(function(category) {

                $category = ""

                for (let i = 0; i < category.length; i++)
                    $category += "<option value=" + category[i]['Id_category'] + ">" + category[i]['Name_category'] + "</option>"

                $("#bookCategoryInput").append($category);

                let $yearOption = ""

                for (let i = new Date().getFullYear(); i >= 1950; i--)
                    $yearOption += "<option value=" + i + ">" + i + "</option>"
                    
                $("#bookYearInput").append($yearOption);

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

                        if (element.attr("name") == "book_image" )
                            error.appendTo($('#messageBox7'));

                        if (element.attr("name") == "book_description" )
                            error.appendTo($('#messageBox8'));

                        if (element.attr("name") == "book_category" )
                            error.appendTo($('#messageBox9'));
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
                        },
                        book_image: {
                            required: true
                        },
                        book_description: {
                            required: true
                        },
                        book_category: {
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
                        },
                        book_image: {
                            required: "Please choose book image"
                        },
                        book_description :{
                            required: "Please complete description field"
                        },
                        book_category: {
                            required: "Please select category"
                        }
                    },
                    submitHandler: function() {
                        addNewItem()
                    }
                })
            })
        })
    })
}

$(document).ready(function() {
    getData()
    // $("#liveToast1").toast('show');
});