
function addNewItem () {

    let $_URL = '/01_lab_web_programming/add_book/' +  document.getElementById('title_new_book').value + "/" +
                                document.getElementById('nb_publish_house').value + "/" +
                                document.getElementById('nb_authors').value + "/" +
                                document.getElementById('nb_year').value + "/" +
                                document.getElementById('nb_page_nr_book').value + "/" +
                                document.getElementById('nb_price').value

    $.ajax({
        url: $_URL,
        type: 'POST',
        success: function () {
            insertDataIntoTable()
        }, error: function (err) {
            console.log('error: ' + err)
        }
    })
}

function editDeleteItem ($_ACTION, $_URL, result) {

    if ($_ACTION == "PUT") {

        $book_title = document.getElementById("title_book_" + result['Id_Book']).value;
        $book_publishing_house = document.getElementById("publish_house_" + result['Id_Book']).value;
        $book_author = document.getElementById("authors_" + result['Id_Book']).value;
        $book_year = document.getElementById("year_" + result['Id_Book']).value;
        $book_nr_of_pages = document.getElementById("page_nr_" + result['Id_Book']).value;
        $book_price = document.getElementById("price_" + result['Id_Book']).value;

        $_URL += "/" + $book_title + "/" + 
                                    $book_publishing_house + "/" + 
                                    $book_author + "/" + 
                                    $book_year + "/" + 
                                    $book_nr_of_pages + "/" +
                                    $book_price + "/some_path";
    } 

    $.ajax({
        url: $_URL,
        type: $_ACTION,
        success: function (result) {
            
            if ($_ACTION == "DELETE")
                console.log("The record was successfully deleted");
            else console.log("The record was updated successfully");

            insertDataIntoTable();
        },
        error: function (err) {
            console.log('error : ' + err);
        }
    });
}

function insertDataIntoTable() {
    getItems('publishing_house').then(function(ph) {

        let $_publishing_house;

        getItems('author').then(function(author) {

            let $_authors;

            getItems('book').then(function(result) {

                let $_rows = "";

                let $_year_option = "";

                let $_years = new Array();

                for (let j = 0, i = new Date().getFullYear(); i >= 1950; i--, j++)
                    $_years[j] = i;
                
                for (let i = 0; i < result.length; i++) {
                    $_rows +=  "<tr><td><input type='text' value='" + result[i]['Title'] + "' id='title_book_" + result[i]['Id_Book'] + "'></td>";

                    $_publishing_house = "<td><select name='publish_house' id='publish_house_" + result[i]['Id_Book'] + "'>";

                    for (let j = 0; j < ph.length; j++)
                        if (ph[j]['Id_publishing_house'] == result[i]['Id_publishing_house'])
                            $_publishing_house += "<option value='" + ph[j]['Id_publishing_house'] + "' selected>" + ph[j]['Name'] + "</option>";
                        else $_publishing_house += "<option value='" + ph[j]['Id_publishing_house'] + "'>" + ph[j]['Name'] + "</option>";

                    $_publishing_house += "</select></td>";

                    $_authors = "<td><select name='authors' id='authors_" + result[i]['Id_Book'] + "'>";

                    for (let j = 0; j < author.length; j++)
                        if (author[j]['Id_Author'] == result[i]['Id_Author'])
                            $_authors += "<option value='" + author[j]['Id_Author'] +"' selected>" + author[j]['Name']  + "</option>";
                        else $_authors += "<option value='" + author[j]['Id_Author'] +"'>" + author[j]['Name']  + "</option>";

                    $_authors += "</select></td>";

                    $_year_option = "<td><select name='year' id='year_" + result[i]['Id_Book'] + "'>";

                    for (let j = 0; j < $_years.length; j++)
                        if ($_years[j] == result[i]['Year'])
                            $_year_option += "<option value='" + $_years[j] + "' selected>" + $_years[j] + "</option>";
                        else $_year_option += "<option value='" + $_years[j] + "'>" + $_years[j] + "</option>";

                    $_year_option += "</selection></td>";

                    $delete_option = "DELETE";

                    $url1 = "/01_lab_web_programming/delete_from_table_by_id/book/" + result[i]['Id_Book'];

                    $edit_option = "PUT";

                    $url2 = "/01_lab_web_programming/update_book/" + result[i]['Id_Book']

                    $_rows +=   $_publishing_house + $_authors + $_year_option +
                                "<td><input type='number' value='" + result[i]['Nr_Pages'] + "' id='page_nr_" + result[i]['Id_Book'] + "'></td>" +
                                "<td><input type='number' value='" + result[i]['Price'] + "' id='price_" + result[i]['Id_Book'] + "'></td></td>" +
                                "<td>" + 
                                    "<button onclick='editDeleteItem(\"" + $edit_option + "\", \"" + $url2 + "\", " + JSON.stringify(result[i]) + ")'>Edit</button>" + 
                                    "<button onclick='editDeleteItem(\"" + $delete_option + "\", \"" + $url1 + "\")'>Delete</button>" + 
                                "</td></tr>";
                }

                document.getElementById('book_table').innerHTML = '<table id="book_table"><tr><th>Title</th><th>Publishing house</th><th>Author</th><th>Year</th><th>Nr of pages</th><th>Price</th><th>Actions</th></tr></table>'
                $("#book_table").append($_rows);
                
                if (document.getElementById('new_book').checked) {

                    let add_row =   "<tr><td>" +
                                    "<input type='text' id='title_new_book'>" + 
                                "</td>" +
                                "<td><select name='nb_publish_house' id='nb_publish_house'>";

                    $_ph_options1 = "";

                    for (let i = 0; i < ph.length; i++)
                        $_ph_options1 += "<option value=" + ph[i]['Id_publishing_house'] + ">" + ph[i]['Name'] + "</option>";

                    $_ph_options1 += "</select></td>";

                    $_authors1 = "<td><select name='nb_authors' id='nb_authors'>";

                    for (let i = 0; i < author.length; i++)
                        $_authors1 += "<option value='" + author[i]['Id_Author'] +"' selected>" + author[i]['Name']  + "</option>";

                    $_authors1 += "</select></td>"

                    $_year_option = "<td><select name='nb_year' id='nb_year'>";

                    for (let i = 0; i < $_years.length; i++)
                        $_year_option += "<option value='" + $_years[i] + "'>" + $_years[i] + "</option>";

                    $_year_option += "</selection></td>";

                    add_row += $_ph_options1 + $_authors1 + $_year_option + 
                            "<td><input type='number' id='nb_page_nr_book'></td>" +
                            "<td><input type='number' id='nb_price'></td></td>" +
                            "<td>" + 
                                "<button onclick='addNewItem()'>Add new book</button>" + 
                            "</td></tr>";

                    $("#book_table").append(add_row);
                }

            }).catch(function(err) {
                console.log(err)
            })

        }).catch(function(err) {
            console.log(err);
        });

        
    }).catch(function(err) {
        console.log(err);
    });
}

$( document ).ready(function() {
    insertDataIntoTable()
});