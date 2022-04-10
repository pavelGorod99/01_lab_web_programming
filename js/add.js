

function addNewItem() {

    $('#new_book_form').validate({
        errorPlacement: function(error, element) {
            error.appendTo($('#messageBox1'));
        },
        rules: {
            book_name: {
                book_name: true
            }
        },
        messages: {
            book_name: {
                book_name: 'Please specify book name'
            }
        },
        submitHandler: function() {

          
            
            var datastring = $('#new_book_form').serialize();
            alert(datastring);
            return false;
        }
    })
}

function getData() {

    getItems('publishing_house').then(function(ph) {

        $_form_content =    "<div>Book name</div>" +
                            "<input type='text' class='inputs' id='book_name' name='book_name' required/>" +
                            "<div id='messageBox1'></div><br>" + 
                            "<div>Publishing house</div>" +
                            "<select class='inputs' id='book_publish_house' name='book_publish_house'>";
            
        $_ph_options = "";

        for (let i = 0; i < ph.length; i++)
            $_ph_options += "<option value=" + ph[i]['Id_publishing_house'] + ">" + ph[i]['Name'] + "</option>";

        $_ph_options += "</select>";

        $_form_content += $_ph_options;

        getItems('author').then(function(author) {

            $_authors = "<div>Author</div>" + 
                        "<select class='inputs' id='book_author' name='book_author'>";
                        
            for (let i = 0; i < author.length; i++)
                $_authors += "<option value=" + author[i]['Id_Author'] + ">" + author[i]['Name'] + "</option>"

            $_authors += "</select>"

            $_form_content += $_authors

            let $_year_option = "<div>Year</div>" + 
                                "<select class='inputs' id='book_year' name='book_year'>";

            for (let i = new Date().getFullYear(); i >= 1950; i--)
                $_year_option += "<option value=" + i + ">" + i + "</option>"
                
            $_year_option += "</select>"

            $_form_content += $_year_option +   "<div>Number of pages</div>" + 
                                                "<input type='number' class='inputs' id='book_nr_of_pages' name='book_nr_of_pages'>" +
                                                "<div>Price</div>" +
                                                "<input type='number' class='inputs' id='book_price' name='book_price'>" +
                                                "<input id='forum_btn_submit' type='submit' onclick='addNewItem()' value='Add new book'>"

            $("#new_book_form").append($_form_content);
        })
    })
}

$(document).ready(function() {
    getData()
});